import test from 'node:test';
import assert from 'node:assert/strict';
import { durationFor, cleanCriteria, isPlayable, poolFor } from '../src/game-rules.js';

const custom = (n) => ({ source:'custom', criteria:Array.from({length:n}, (_,i)=>`Détail ${i}`) });
test('custom durations scale with usable criteria, classics keep their original timer', () => {
  assert.equal(durationFor(custom(3)),30);
  assert.equal(durationFor(custom(5)),45);
  assert.equal(durationFor(custom(10)),90);
  assert.equal(durationFor({source:'classic',criteria:['a','b','c','d','e']}),90);
  let previous=0;
  for(let i=3;i<=10;i++) { const duration=durationFor(custom(i)); assert.ok(duration>previous); previous=duration; }
});
test('drafts and duplicate criteria never inflate the score or enter the draw', () => {
  assert.deepEqual(cleanCriteria([' A ','A',null,'','B']),['A','B']);
  assert.equal(isPlayable(custom(2)),false);
  assert.equal(isPlayable(custom(5)),true);
  const classics=[{source:'classic'}], ready=custom(5),draft=custom(1);
  assert.deepEqual(poolFor('custom',classics,[ready,draft]),[ready]);
  assert.deepEqual(poolFor('mixed',classics,[ready,draft]),[...classics,ready]);
  assert.deepEqual(poolFor('classic',classics,[ready,draft]),classics);
});
