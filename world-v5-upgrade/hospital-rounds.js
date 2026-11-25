import * as THREE from 'three';
import {createNeighborhoodHuman} from './neighborhood-human.js?v=20261124-routines-v347';
// One detailed, rigged Rocketbox clinician; existing shared idle/walk animations.
export function createHospitalRounds(parent,{getLocalPlayer,canWalk}){
 const root=new THREE.Group();root.name='Dr Lin · hospital room-to-room rounds';root.userData.dynamicScenery=true;root.position.set(-18,0,-6);root.visible=false;parent.add(root);
 const human=createNeighborhoodHuman({name:'Dr Lin',height:1.70,model:new URL('./assets/hospital-rounds-doctor-v410.glb',import.meta.url).href});root.add(human.root);
 const route=[];for(const [name,z]of[['EXAM 1',-14],['EXAM 2',-6],['EXAM 3',2]])route.push({x:-18,z},{x:-20,z},{x:-22,z,room:name,pause:8},{x:-20,z},{x:-18,z});route.push({x:-18,z:-8},{x:-12,z:-8},{x:-12,z:-10},{x:-12,z:-12,room:'EXAM 4',pause:10},{x:-12,z:-10},{x:-12,z:-8},{x:-18,z:-8});
 let ready=false,pending=null,retry=0,target=0,rest=0,walking=false,time=0;const visited=new Set();
 function load(){if(ready||pending||time<retry)return pending;pending=human.load().then(()=>{ready=human.ready;root.userData.loaded=ready;}).catch(error=>{root.userData.loadError=String(error);retry=time+15;}).finally(()=>pending=null);return pending;}
 function update(dt){dt=Math.max(0,Math.min(.1,dt));time+=dt;const p=getLocalPlayer(),near=Math.hypot(p.x-root.position.x,p.z-root.position.z)<65;root.visible=ready&&near;if(!near)return;if(!ready){load();return;}walking=false;
  if(rest>0)rest-=dt;else{const goal=route[target],pos=root.position,dx=goal.x-pos.x,dz=goal.z-pos.z,d=Math.hypot(dx,dz);
   if(d<.035){pos.x=goal.x;pos.z=goal.z;rest=goal.pause||0;if(goal.room){visited.add(goal.room);root.userData.currentRoom=goal.room;}target=(target+1)%route.length;}
   else{const step=Math.min(d,.85*dt),x=pos.x+dx/d*step,z=pos.z+dz/d*step;if(Math.hypot(x-p.x,z-p.z)>.85&&canWalk(x,z)){pos.x=x;pos.z=z;const yaw=Math.atan2(dx,dz);root.rotation.y+=Math.atan2(Math.sin(yaw-root.rotation.y),Math.cos(yaw-root.rotation.y))*(1-Math.exp(-9*dt));walking=true;}}
  }human.update(dt,walking?.85:0);
 }
 return{root,human,route,visited,load,update,get ready(){return ready},get walking(){return walking},get position(){return{x:root.position.x,z:root.position.z}},get openers(){return ready?[this.position]:[]}};
}
