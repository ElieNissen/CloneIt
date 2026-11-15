import test from 'node:test';
import assert from 'node:assert/strict';
import { configuredGeminiKey, handleSetup } from '../worker/setup.mjs';
import { createWorker } from '../worker/index.mjs';

const origin='https://cloneit.test';
const token='a'.repeat(64);
const fakeKey='a-not-real-google-api-key-for-automated-testing';
const hash=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))).toString('hex');
function environment(){
 const values=new Map();
 return {SETUP_TOKEN_HASH:hash,KEY_VAULT_SECRET:'b'.repeat(64),BUCKET:{
  async head(key){return values.has(key)?{}:null},
  async put(key,value){values.set(key,value)},
  async get(key){return values.has(key)?{json:async()=>JSON.parse(values.get(key))}:null},
  values
 }};
}
function request(data,overrides={}) {
 return new Request(origin+'/api/setup',{method:data?'POST':'GET',headers:{Authorization:'Bearer '+token,Origin:origin,'Content-Type':'application/json',...overrides},...(data?{body:JSON.stringify(data)}:{})});
}
test('private setup rejects invalid access and requires free-tier confirmation before contacting Google',async()=>{
 const env=environment();let calls=0;
 const upstream=async()=>{calls++;return Response.json({})};
 assert.equal((await handleSetup(request(null,{Authorization:'Bearer invalid'}),env,upstream)).status,403);
 assert.equal((await handleSetup(request({apiKey:fakeKey,freeTierConfirmed:false}),env,upstream)).status,400);
 assert.equal((await handleSetup(request({apiKey:fakeKey,freeTierConfirmed:true},{Origin:'https://other.test'}),env,upstream)).status,403);
 assert.equal(calls,0);
 const res=await handleSetup(request(),env,upstream);assert.deepEqual(await res.json(),{configured:false});
});
test('key is verified by read-only model lookup, encrypted, then setup locks without returning the key',async()=>{
 const env=environment();let calls=0;
 const upstream=async(url,options)=>{
  calls++;assert.equal(url,'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite');
  assert.equal(options.method,undefined);assert.equal(options.headers['x-goog-api-key'],fakeKey);
  return Response.json({name:'models/gemini-3.5-flash-lite'});
 };
 const saved=await handleSetup(request({apiKey:fakeKey,freeTierConfirmed:true}),env,upstream);
 assert.equal(saved.status,200);assert.deepEqual(await saved.json(),{configured:true,locked:true});
 assert.ok(!JSON.stringify([...env.BUCKET.values.values()]).includes(fakeKey));
 assert.equal(await configuredGeminiKey(env),fakeKey);
 assert.equal(await configuredGeminiKey({...env,KEY_VAULT_SECRET:'c'.repeat(64)}),null);
 const replay=await handleSetup(request({apiKey:'replacement'.repeat(4),freeTierConfirmed:true}),env,upstream);
 assert.deepEqual(await replay.json(),{configured:true,locked:true});assert.equal(calls,1);
 assert.equal(await configuredGeminiKey(env),fakeKey);
 const config=await createWorker().fetch(new Request(origin+'/api/config'),env);
 assert.equal((await config.json()).aiAvailable,true);assert.ok(config.headers.get('Set-Cookie'));
});
test('rejected provider key is not saved and the setup remains retryable',async()=>{
 const env=environment();
 const res=await handleSetup(request({apiKey:fakeKey,freeTierConfirmed:true}),env,async()=>new Response('',{status:403}));
 assert.equal(res.status,422);assert.equal(env.BUCKET.values.size,0);
});
