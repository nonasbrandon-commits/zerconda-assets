import {clearSegment} from './pedestrian-detour.js?v=20261122-hitch-v252';
import {poseSeatedResident} from './seated-resident.js?v=20261124-routines-v347';
import {pedestrianStaticEscapeStep,beachPassingStep} from './beach-passing.js?v=467';
// Reservations are shared across populations; player seating always takes precedence.
const reservations=new Map();
const key=s=>s.x.toFixed(2)+','+s.z.toFixed(2);
export function createResidentBreaks({getSeats,getOccupiedSeat,canWalk,getHeight,getPeople,getPlayer}){
 function clearLine(a,b){return clearSegment(a,b,canWalk,.32);}
 return{update(a,dt,time){const p=a.group.position,id=a.profile?.id??a.id??0;let r=a.breakRoutine;
 if(!r)r=a.breakRoutine={due:time+18+(id%7)*7,state:'walking',memory:{}};
 if(r.state==='walking'){
  if(time<r.due)return false;
  const playerSeat=getOccupiedSeat(),available=getSeats().filter(s=>!s.npcOccupant&&![...reservations.values()].some(a=>a.seat&&Math.hypot(a.seat.x-s.x,a.seat.z-s.z)<1.3)&&!(playerSeat&&Math.hypot(s.x-playerSeat.x,s.z-playerSeat.z)<1.3)&&Math.hypot(s.x-p.x,s.z-p.z)<32).sort((s,t)=>Math.hypot(s.x-p.x,s.z-p.z)-Math.hypot(t.x-p.x,t.z-p.z));
  for(const seat of available){const facing=seat.facing??0,approach={x:seat.x+Math.sin(facing)*1.3,z:seat.z+Math.cos(facing)*1.3};if(!clearLine(p,approach))continue;r.seat=seat;r.approach=approach;r.origin={x:p.x,z:p.z};r.state='approaching';r.timeout=0;reservations.set(key(seat),a);seat.npcOccupant=a;a.seat=seat;break;}
  if(r.state==='walking'){r.due=time+12;return false;}
 }
 const release=()=>{if(r.seat){reservations.delete(key(r.seat));if(r.seat.npcOccupant===a)delete r.seat.npcOccupant;}a.seat=null;};
 if(r.state==='sitting'){
  a.walking=false;a.group.userData.walking=false;a.human.update(dt,0);poseSeatedResident(a.human,{...r.seat,restHands:true},time);
  const playerSeat=getOccupiedSeat();if(time>=r.until||playerSeat&&Math.hypot(playerSeat.x-r.seat.x,playerSeat.z-r.seat.z)<1.3){a.human.root.position.y=0;p.set(r.approach.x,getHeight(r.approach.x,r.approach.z),r.approach.z);release();r.state='returning';r.timeout=0;}
  return true;
 }
 const escape=pedestrianStaticEscapeStep({id,here:p,canWalk,speed:Math.min(a.speed||1,1.2),dt,people:getPeople().filter(q=>q!==p).map((q,i)=>({x:q.x,z:q.z,id:10000+i})),player:getPlayer(),memory:r.escape||(r.escape={}),radius:.32});
 if(escape.active){if(escape.point){const q=escape.point;a.group.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);p.set(q.x,getHeight(q.x,q.z),q.z);a.walking=true;a.group.userData.walking=true;a.human.update(dt,Math.min(a.speed||1,1.2));r.timeout=0;}else{a.human.update(dt,0);r.timeout+=dt;if(r.timeout>2){release();r.state='walking';r.due=time+20;return false;}}return true;}
 const target=r.state==='returning'?r.origin:r.approach,d=Math.hypot(target.x-p.x,target.z-p.z);
 if(d<.13){if(r.state==='approaching'){p.set(r.seat.x,getHeight(r.seat.x,r.seat.z),r.seat.z);a.group.rotation.y=r.seat.facing??0;r.state='sitting';r.until=time+24+(id%5)*6;}else{release();r.state='walking';r.due=time+55+(id%7)*9;}return true;}
 const point=beachPassingStep({id,here:p,target,speed:Math.min(a.speed||1,1.2),dt,people:getPeople().filter(q=>q!==p).map((q,i)=>({x:q.x,z:q.z,id:10000+i})),player:getPlayer(),staticClear:clearLine,memory:r.memory});
 if(point){a.group.rotation.y=Math.atan2(point.x-p.x,point.z-p.z);p.set(point.x,getHeight(point.x,point.z),point.z);a.walking=true;a.group.userData.walking=true;a.human.update(dt,Math.min(a.speed||1,1.2));r.timeout=0;}else{a.human.update(dt,0);a.walking=false;r.timeout+=dt;if(r.timeout>8){release();r.state='walking';r.due=time+20;}}
 return true;
 }};
}
