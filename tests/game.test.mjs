import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import * as rules from '../src/game-rules.js';

test('personal-card duration is announced, cannot reveal correction early, and survives background time',async()=>{
 let now=1000;
 const handlers={};
 const readout={textContent:''},bar={style:{},animate(frames,options){this.frames=frames;this.options=options;return{cancel(){}};}},ending={innerHTML:''};
 const stage={className:'',innerHTML:'',classList:{add(){}},querySelector(){return {disabled:false}}};
 const app={innerHTML:'',addEventListener(name,fn){handlers[name]=fn;}};
 const context=vm.createContext({
  ...rules,
  guestRoom:null,hostRoom:null,
  listPersonalCards:async()=>[],
  document:{querySelector(selector){return {'#app':app,'#stage':stage,'.timer-readout':readout,'.timer-progress':bar,'.round-ending':ending}[selector]},addEventListener(name,fn){handlers[name]=fn},visibilityState:'visible'},
  window:{scrollTo(){},setInterval(){return 1},addEventListener(){}},
  fetch:async()=>Response.json({aiAvailable:false,sharingAvailable:true}),
  localStorage:{getItem(){return null}},Date:{now:()=>now},navigator:{},clearInterval(){},Image:class{async decode(){}},console
 });
 const source=fs.readFileSync('src/app.js','utf8').replace(/^import .*;\n/gm,'');
 vm.runInContext(source,context);
 await new Promise(resolve=>setImmediate(resolve));
 vm.runInContext(`state.mode='custom';state.personal=[{id:'photo',source:'custom',image:'data:image/png;base64,test',criteria:['A','B','C','D','E']}];invalidateDeck();renderReady();`,context);
 assert.match(stage.innerHTML,/5 critères/);assert.match(stage.innerHTML,/45 secondes/);
 await vm.runInContext('startRound()',context);
 assert.equal(bar.options.duration,45000);assert.equal(bar.options.easing,'linear');
 assert.doesNotMatch(stage.innerHTML,/data-action="correct"/);
 vm.runInContext('renderCorrection()',context);assert.equal(vm.runInContext('state.stage',context),'draw');
 now+=44999;vm.runInContext('tick()',context);assert.equal(readout.textContent,'00:01');
 now+=1;handlers.visibilitychange();assert.equal(vm.runInContext('state.stage',context),'finished');
 assert.match(ending.innerHTML,/Voir la correction/);
 vm.runInContext('renderCorrection()',context);assert.equal((stage.innerHTML.match(/criterion-row/g)||[]).length,5);
 assert.match(stage.innerHTML,/Manche suivante/);
});
