import * as T from 'three';
import {createApartmentReviewWomen} from './apartment-review-women.js?v=490';
import {createHouseMidnight} from './house-midnight.js?v=490';

export function createHouseholdResidents(home,{getPlayer=()=>({x:0,z:0}),walker,route,isFree}){
 const redSpot=new T.Group(),midnightSpot=new T.Group();redSpot.name='Red satin house routine';midnightSpot.name='Midnight Lace house routine';home.group.add(redSpot,midnightSpot);
 const red=createApartmentReviewWomen(redSpot,{characterIndices:[2],roam:false,placement:{x:0,z:0},label:'House resident · red satin'}),midnight=createHouseMidnight(midnightSpot);
 let owner=null,queue=[],time=0;
 function acquire(id){if(owner===id)return true;if(!queue.includes(id))queue.push(id);if(!owner&&queue[0]===id){owner=queue.shift();return true;}return false;}
 function release(id){if(owner===id)owner=null;}
 const stair=[];for(let i=0;i<=24;i++){const z=5.2-8*i/24;stair.push({x:6.4,y:.16+Math.min(20,Math.max(0,Math.ceil((4.5-z)/.3)))*.18,z});}
 function make(id,view,spot,start,seatX,upFirst,delay){
   const steps=[];let current=start,floor=0;
   const wait=s=>steps.push({kind:'idle',seconds:s});
   const go=(p,s=0)=>{steps.push({kind:'walk',points:route(home,current,p,floor)});current=p;if(s)wait(s);};
   const sit=()=>{go({x:seatX,z:4.4});steps.push({kind:'sit',seconds:24,from:{...current},seat:{x:seatX,z:id==='midnight'?4.0:3.65}});};
   const upstairs=()=>{go({x:6.4,z:5.2});steps.push({kind:'walk',points:stair});floor=1;current={x:6.4,z:-2.8};go({x:id==='red'?2.1:3.8,z:-2.6},12);go(id==='red'?{x:2.3,z:6.0}:{x:-4.8,z:1.4},16);go({x:6.4,z:-2.8});steps.push({kind:'walk',points:[...stair].reverse()});floor=0;current={x:6.4,z:5.2};};
   if(upFirst){upstairs();sit();}else{sit();upstairs();}go(start,10);
   spot.position.set(start.x,.16,start.z);
   return{id,view,spot,steps,index:0,segment:0,pause:0,delay,cycles:0,travelled:0,stages:new Set(),loaded:()=>id==='red'?view.stats().loaded===1:view.stats().loaded};
 }
 const agents=[make('red',red,redSpot,{x:0,z:-5.3},-5.45,false,12),make('midnight',midnight,midnightSpot,{x:0,z:-3.5},-3.35,true,28)];
 function advance(a){a.index=(a.index+1)%a.steps.length;if(a.steps[a.index].kind!=='walk')release(a.id);a.segment=0;a.pause=0;if(a.index===0)a.cycles++;}
 function updateAgent(a,dt){
   if(!a.loaded())return;
   let moved=0,mode='idle';
   if(a.delay>0)a.delay=Math.max(0,a.delay-dt);
   else{const step=a.steps[a.index];a.stages.add(step.kind);
     if(step.kind==='walk'){
       if(acquire(a.id)){mode='walk';let remaining=dt*.52;while(remaining>0){const target=step.points[a.segment];if(!target){advance(a);mode='idle';break;}const dx=target.x-a.spot.position.x,dy=target.y-a.spot.position.y,dz=target.z-a.spot.position.z,d=Math.hypot(dx,dy,dz);if(d<.001){a.segment++;continue;}const amount=Math.min(d,remaining);a.spot.position.addScaledVector(new T.Vector3(dx,dy,dz),amount/d);moved+=Math.hypot(dx,dz)*amount/d;a.travelled+=amount;if(dx||dz)a.spot.rotation.y=Math.atan2(dx,dz);remaining-=amount;if(amount>=d-.0001)a.segment++;}}
     }else{release(a.id);a.pause+=dt;if(step.kind==='sit'){mode=a.pause>step.seconds-1?'idle':'sit';a.spot.rotation.y=0;const t=T.MathUtils.smoothstep(a.pause,0,1)*T.MathUtils.smoothstep(step.seconds-a.pause,0,1);a.spot.position.x=T.MathUtils.lerp(step.from.x,step.seat.x,t);a.spot.position.z=T.MathUtils.lerp(step.from.z,step.seat.z,t);}if(a.pause>=step.seconds)advance(a);}
   }
   a.view.setMotion(mode);a.view.update(dt,moved);
 }
 function update(dt){dt=Math.min(.1,Math.max(0,dt));time+=dt;const p=getPlayer(),near=Math.hypot(p.x-home.x,p.z-home.z)<80;
   red.setActive(near);midnight.setActive(near);
   walker.update(dt);if(walker.stats().state!=='walk')release('original');
   if(near)for(const a of agents)updateAgent(a,dt);
   const people=[walker.root,...agents.map(a=>a.spot)];for(const d of home.doors)if(d.sliding)d.open=people.some(p=>p.position.y>3.5&&Math.hypot(p.position.x-d.x,p.position.z-d.z)<2);
 }
 return{acquire,update,red,midnight,agents,stats:()=>({walking:owner,time,actors:agents.map(a=>({id:a.id,loaded:a.loaded(),kind:a.delay>0?'waiting':a.steps[a.index].kind,queued:queue.includes(a.id),position:a.spot.position.toArray(),cycles:a.cycles,travelled:a.travelled,stages:[...a.stages]}))}),dispose(){red.dispose();redSpot.removeFromParent();midnight.setActive(false);midnightSpot.removeFromParent();}};
}
