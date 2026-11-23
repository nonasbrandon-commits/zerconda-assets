import * as THREE from 'three';
import {vehicleDescriptor,vehiclePoseBlocked} from './vehicle-collision.js?v=20261121-town-v191';
import {peoplePoseBlocked} from './traffic-people.js?v=20261122-traffic-v258';
// Back up slowly only into a fully clear swept corridor, then let the route planner retry.
export function recoverCabGridlock(v,{dt,time,waiting,people,obstacles,replan,onReverse=()=>{}}){
 const pos=v.root.position,last=v.gridlockPosition;if(!last||Math.hypot(pos.x-last.x,pos.z-last.z)>.12){v.gridlockPosition={x:pos.x,z:pos.z};v.gridlockSince=time;}
 if(waiting){v.gridlockSince=time;v.reversing=0;return false;}
 if(v.reversing>0){const own=vehicleDescriptor(THREE,v.root),distance=Math.min(v.reversing,dt*.8),steps=Math.max(1,Math.ceil(distance/.06));for(let i=1;i<=steps;i++){const d=distance*i/steps,x=pos.x-Math.sin(v.heading)*d,z=pos.z-Math.cos(v.heading)*d;if(vehiclePoseBlocked(own,x,z,v.heading,obstacles)||peoplePoseBlocked(own,x,z,v.heading,people)){v.reversing=0;v.nextRecovery=time+4;replan();return false;}}pos.x-=Math.sin(v.heading)*distance;pos.z-=Math.cos(v.heading)*distance;v.reversing-=distance;v.speed=0;onReverse(-distance);if(v.reversing<=.001){v.reversing=0;v.nextRecovery=time+5;v.gridlockSince=time;replan();}return true;}
 if(time-(v.gridlockSince??time)<4||time<(v.nextRecovery||0))return false;
 v.nextRecovery=time+4;const own=vehicleDescriptor(THREE,v.root);for(let d=.10;d<=1.61;d+=.10){const x=pos.x-Math.sin(v.heading)*d,z=pos.z-Math.cos(v.heading)*d;if(vehiclePoseBlocked(own,x,z,v.heading,obstacles)||peoplePoseBlocked(own,x,z,v.heading,people))return false;}v.reversing=1.5;return true;
}
