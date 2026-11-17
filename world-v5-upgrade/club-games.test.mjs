import test from 'node:test';
import assert from 'node:assert/strict';
import {DART_SECTORS,dartScore,createDarts,throwDart,rackPool,shootPool,stepPool,POOL} from './club-games.js';

test('dartboard has the correct twenty sectors, doubles, triples, bulls and misses',()=>{
 for(let i=0;i<20;i++){const a=i*Math.PI/10;for(const [radius,multiplier] of [[.3,1],[.6,3],[.97,2]])assert.equal(dartScore(Math.sin(a)*radius,-Math.cos(a)*radius).points,DART_SECTORS[i]*multiplier);}
 assert.equal(dartScore(0,0).points,50);assert.equal(dartScore(.06,0).points,25);assert.equal(dartScore(2,0).points,0);
});
test('301 alternates after three throws, restores busts, and requires a double finish',()=>{
 const d=createDarts();for(let i=0;i<3;i++)throwDart(d,0,-.6);assert.deepEqual(d.scores,[121,301]);assert.equal(d.turn,1);
 d.scores[1]=40;d.start=40;throwDart(d,0,-.6);assert.equal(d.scores[1],40);assert.equal(d.turn,0);
 d.turn=1;d.start=40;throwDart(d,0,-.97);assert.equal(d.winner,1);
});
test('pool has sixteen numbered balls and transfers break energy through the rack',()=>{
 const p=rackPool();assert.equal(new Set(p.balls.map(b=>b.id)).size,16);assert(shootPool(p,0,3));assert(!shootPool(p,0,3));
 let hit=false;for(let i=0;i<6000&&p.moving;i++){stepPool(p,1/120);hit ||= p.balls.some(b=>b.id&&Math.hypot(b.vx,b.vz)>.01);}
 assert(hit);assert(!p.moving);for(const b of p.balls)if(!b.pocketed){assert(Math.abs(b.x)<=POOL.halfX+.02);assert(Math.abs(b.z)<=POOL.halfZ+.02);}
 assert(!shootPool(p,NaN,1));
});
test('six pockets capture balls and a scratch returns the cue ball and passes the turn',()=>{
 const p=rackPool();p.balls.forEach(b=>b.pocketed=b.id!==0);Object.assign(p.balls[0],{x:1.30,z:.63,vx:.2,vz:.2});p.moving=true;stepPool(p,.05);
 assert(!p.balls[0].pocketed);assert.equal(p.turn,1);assert.equal(p.balls[0].x,-.82);assert.match(p.last,/Scratch/);
});
test('8-ball wins only after the player clears their assigned group',()=>{
 for(const cleared of [false,true]){
  const p=rackPool();p.groups=['solids','stripes'];p.potted=[8];p.moving=true;
  for(const b of p.balls)if(b.id===8||(cleared&&b.id>0&&b.id<8))b.pocketed=true;
  stepPool(p,.01);assert.equal(p.winner,cleared?0:1);
 }
});
