import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorker } from '../worker/index.mjs';

const origin='https://cloneit.test';
const image='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aN7sAAAAASUVORK5CYII=';
const criteria=['Il y a un chien.','Le chien porte un chapeau.','Une tasse est sur la table.','Il y a des flammes.','La table est à droite.'];
const env={GEMINI_API_KEY:'test-secret-not-a-real-key',GEMINI_FREE_TIER_CONFIRMED:'true'};
const post=(path,data,headers={})=>new Request(origin+path,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...headers},body:JSON.stringify(data)});
async function session(worker) {
 const config=await worker.fetch(new Request(origin+'/api/config'),env);
 const cookie=config.headers.get('Set-Cookie').split(';')[0];
 assert.ok(!JSON.stringify(await config.json()).includes(env.GEMINI_API_KEY));
 return cookie;
}
test('anonymous setup exposes availability only, and refuses missing/forged sessions',async()=>{
 const w=createWorker();
 assert.equal((await w.fetch(post('/api/analyze',{image}),env)).status,401);
 assert.equal((await w.fetch(post('/api/analyze',{image},{Cookie:'cloneit_session=forged'}),env)).status,401);
 assert.equal((await w.fetch(post('/api/analyze',{image}),{})).status,503);
 const res=await w.fetch(new Request(origin+'/api/config'),{});
 assert.deepEqual(await res.json(),{aiAvailable:false,sharingAvailable:false});
});
test('provider receives image + strict schema and the server computes the duration',async()=>{
 let calls=0;
 const w=createWorker({},async(url,options)=>{
   calls++; assert.equal(url,'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent');
   const body=JSON.parse(options.body);
   assert.equal(body.generationConfig.responseMimeType,'application/json');
   assert.ok(body.generationConfig.responseJsonSchema);
   assert.equal(body.contents[0].parts[1].inlineData.data,image.split(',')[1]);
   return Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify({title:'Le chien',playable:true,reason:'',criteria})}]}}]});
 });
 const cookie=await session(w);
 const bad=await w.fetch(post('/api/analyze',{image:'https://internal.invalid/secret'},{Cookie:cookie}),env);
 assert.equal(bad.status,400);assert.equal(calls,0);
 const foreign=new Request(origin+'/api/analyze',{method:'POST',headers:{Origin:'https://other.test','Content-Type':'application/json',Cookie:cookie},body:JSON.stringify({image})});
 assert.equal((await w.fetch(foreign,env)).status,403);
 const res=await w.fetch(post('/api/analyze',{image},{Cookie:cookie}),env);
 assert.equal(res.status,200);assert.equal((await res.json()).durationSeconds,45);
});
test('refusals, inadequate cards and incomplete generations never become playable',async()=>{
 for(const output of [
   {candidates:[{finishReason:'SAFETY',content:{parts:[]}}]},
   {candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify({playable:true,criteria:['same','same','same']})}]}}]},
   {candidates:[{finishReason:'MAX_TOKENS',content:{parts:[]}}]}
 ]) {
   const w=createWorker({},async()=>Response.json(output));const cookie=await session(w);
   assert.notEqual((await w.fetch(post('/api/analyze',{image},{Cookie:cookie}),env)).status,200);
 }
});
class Bucket {
 values=new Map();
 async put(key,value,opts={}){this.values.set(key,{value,opts});}
 async get(key){const entry=this.values.get(key);return entry?{json:async()=>JSON.parse(entry.value),body:entry.value,httpMetadata:entry.opts.httpMetadata}:null;}
 async head(key){return this.values.has(key)?{}:null;}
 async list({prefix,limit}){return {objects:[...this.values.keys()].filter(k=>k.startsWith(prefix)).slice(0,limit).map(key=>({key}))};}
 async delete(key){this.values.delete(key);}
}
test('invite permits uploads, owner lists them, guests cannot read or edit others',async()=>{
 const w=createWorker(),sharedEnv={BUCKET:new Bucket()};
 const made=await w.fetch(post('/api/rooms',{}),sharedEnv);assert.equal(made.status,201);
 const room=await made.json(),path='/api/rooms/'+room.id;
 const denied=await w.fetch(new Request(origin+path,{headers:{Authorization:'Bearer '+room.inviteToken}}),sharedEnv);
 assert.equal(denied.status,403);
 const id=crypto.randomUUID();
 const upload=await w.fetch(post(path+'/cards',{id,title:'Photo test',image,criteria},{Authorization:'Bearer '+room.inviteToken}),sharedEnv);
 assert.equal(upload.status,201);const edit=await upload.json();
 const list=await w.fetch(new Request(origin+path,{headers:{Authorization:'Bearer '+room.ownerToken}}),sharedEnv);
 const cards=(await list.json()).cards;assert.equal(cards.length,1);assert.equal(cards[0].criteria.length,5);
 assert.equal('editHash' in cards[0],false);assert.equal('editToken' in cards[0],false);
 const media=await w.fetch(new Request(origin+cards[0].image),sharedEnv);assert.equal(media.status,200);
 const update=(token)=>new Request(origin+path+'/cards/'+id,{method:'PATCH',headers:{Origin:origin,Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({title:'Renommée',criteria:criteria.slice(0,3)})});
 assert.equal((await w.fetch(update(room.inviteToken),sharedEnv)).status,403);
 assert.equal((await w.fetch(update(edit.editToken),sharedEnv)).status,200);
 const deleted=await w.fetch(new Request(origin+path+'/cards/'+id,{method:'DELETE',headers:{Origin:origin,Authorization:'Bearer '+room.ownerToken}}),sharedEnv);
 assert.equal(deleted.status,200);assert.equal((await w.fetch(new Request(origin+cards[0].image),sharedEnv)).status,404);
});

test('no analysis is sent before free-tier confirmation; exhausted quota never falls back',async()=>{
 let calls=0;
 const w=createWorker({},async()=>{calls++;return Response.json({error:{}},{status:429});});
 assert.equal((await w.fetch(post('/api/analyze',{image}),{GEMINI_API_KEY:'test'})).status,503);
 assert.equal(calls,0);
 const cookie=await session(w);
 const res=await w.fetch(post('/api/analyze',{image},{Cookie:cookie}),env);
 assert.equal(res.status,502);assert.match((await res.json()).error,/quota gratuit/);
 assert.equal(calls,1);
});
