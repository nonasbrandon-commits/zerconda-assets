import {clearSegment,findPedestrianDetour} from './pedestrian-detour.js?v=20261119-beach-v149';
import * as THREE from 'three';
import {createResidentHuman} from './resident-human.js?v=20261118-faster-town-v106';
import {residentProfiles} from './resident-profiles.js?v=20261118-residents-v97';
import {createResidentVehicle} from './resident-vehicles.js?v=20261118-residents-v97';
// Articulated human-shaped characters and animated pedestrian NPCs.
// Adult resident meshes are adapted from the MIT-licensed Microsoft Rocketbox collection.
export function createPedestrians(scene,{count=20,groundHeightAt=()=>0,canWalk=()=>true,getPlayer=()=>null}={}){
 const root=new THREE.Group();root.name='Animated Zerconda pedestrians';scene.add(root);
 const skin=[0xe7b58d,0x9d6345,0xc78d68,0xf0c9a6,0x69432f].map(color=>new THREE.MeshStandardMaterial({color,roughness:.88}));
 const shirts=[0x7731a1,0x171d23,0x52705c,0xd0c7b8,0x444b64,0x9b8665,0x9b3652,0x336d96].map(color=>new THREE.MeshStandardMaterial({color,roughness:.91}));
 const pants=[0x244e82,0x2e5a87,0x465263,0x75695b,0x27344c].map(color=>new THREE.MeshStandardMaterial({color,roughness:.95}));
 const hair=[0x242020,0x593e30,0x171819,0x9e7144].map(color=>new THREE.MeshStandardMaterial({color,roughness:.95}));
 const shoes=[0xf2f2ed,0x25282b,0xeeeeee,0x413f40].map(color=>new THREE.MeshStandardMaterial({color,roughness:.85}));
 function part(parent,geo,mat,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
 function createHuman(i=0){
  const root=new THREE.Group();root.name='Animated human '+i;
  const shirt=shirts[i%shirts.length],trousers=pants[i%pants.length],face=skin[i%skin.length];
  const torso=new THREE.Group();root.add(torso);
  const female=i%3!==0;
  const chest=part(torso,new THREE.SphereGeometry(1,18,12),shirt,0,1.32,0);chest.scale.set(female?.235:.27,.37,.155);
  const waist=part(torso,new THREE.CylinderGeometry(female?.18:.23,.21,.39,14),shirt,0,1.01,0);waist.scale.z=.78;
  const hips=part(torso,new THREE.SphereGeometry(1,16,10),trousers,0,.89,0);hips.scale.set(female?.235:.24,.17,.16);
  const head=part(torso,new THREE.SphereGeometry(1,18,14),face,0,1.78,0);head.scale.set(.145,.205,.155);
  const hairCap=part(torso,new THREE.SphereGeometry(.151,18,10,0,Math.PI*2,0,Math.PI*.53),hair[i%hair.length],0,1.835,0);
  if(female){const pony=part(torso,new THREE.CapsuleGeometry(.075,.28,5,9),hair[i%hair.length],0,1.57,-.12);pony.rotation.x=-.15;}
  part(torso,new THREE.CylinderGeometry(.085,.10,.19,10),face,0,1.65,0);
  // Face points along local +Z, same as walking forward.
  for(const side of [-1,1]){
   part(torso,new THREE.SphereGeometry(.017,8,6),hair[2],side*.064,1.79,.147);
   part(torso,new THREE.SphereGeometry(.055,8,6),face,side*.145,1.75,0);
  }
  const arms=[],legs=[];
  for(const side of [-1,1]){
   const shoulder=new THREE.Group();shoulder.position.set(side*.24,1.51,0);torso.add(shoulder);
   part(shoulder,new THREE.CapsuleGeometry(.07,.28,5,10),shirt,0,-.22,0);
   part(shoulder,new THREE.CapsuleGeometry(.052,.22,4,8),face,0,-.56,0);
   arms.push(shoulder);
   const hip=new THREE.Group();hip.position.set(side*.125,.84,0);root.add(hip);
   part(hip,new THREE.CapsuleGeometry(.105,.29,6,10),trousers,0,-.20,0);
   const knee=new THREE.Group();knee.position.y=-.41;hip.add(knee);
   part(knee,new THREE.CapsuleGeometry(.088,.27,5,10),trousers,0,-.19,0);
   const foot=part(knee,new THREE.BoxGeometry(.19,.105,.34),shoes[i%shoes.length],0,-.395,.09);
   legs.push({hip,knee,foot});

  }
  return {root,torso,arms,legs,animate(t,speed=0){
   const intensity=THREE.MathUtils.clamp(speed/2.5,0,1.3);
   const cycle=t*7.2;
   arms.forEach((a,n)=>a.rotation.x=-Math.sin(cycle+n*Math.PI)*.42*intensity);
   legs.forEach((leg,n)=>{const phase=Math.sin(cycle+n*Math.PI);
    leg.hip.rotation.x=phase*.44*intensity;
    leg.knee.rotation.x=Math.max(0,-phase)*.72*intensity;
    leg.foot.rotation.x=-leg.hip.rotation.x-leg.knee.rotation.x*.65;});
   torso.position.y=Math.abs(Math.sin(cycle))*.017*intensity;
   torso.rotation.z=Math.sin(cycle)*.025*intensity;
  }};
 }
 const mobile=matchMedia('(pointer:coarse)').matches;let loading=false;
 const agents=[];let runIndex=0,walkIndex=0,bikeIndex=0,scooterIndex=0;
 function ellipse(cx,cz,rx,rz){return new THREE.CatmullRomCurve3(Array.from({length:64},(_,i)=>{const a=i*Math.PI/32;return new THREE.Vector3(cx+Math.cos(a)*rx,0,cz+Math.sin(a)*rz)}),true,'centripetal');}
 for(const profile of residentProfiles){const group=new THREE.Group();group.name=profile.name+' · '+profile.activity;group.userData.dynamicScenery=true;group.visible=false;root.add(group);const human=createResidentHuman(profile,{defer:mobile});group.add(human.root);let vehicle=null,route=null,position=0,direction=1,speed=2.15+(profile.id%4)*.10;
  if(profile.activity==='run'){position=runIndex*190;route={kind:'boardwalk',z:183+runIndex*2};runIndex++;speed=5.1+(profile.id%3)*.16;}
  else if(profile.activity==='walk'){const lanes=[-109.2,109.2,-13.1,13.1];route={kind:'sidewalk',x:lanes[walkIndex%4]};position=-76+(walkIndex%2)*130;direction=walkIndex%2?-1:1;walkIndex++;}
  else{vehicle=createResidentVehicle(profile.activity,0x547c88+(profile.id%3)*0x191306);group.add(vehicle.root);if(profile.activity==='bike'){route=ellipse(bikeIndex%2?96:-96,0,4,76);position=(bikeIndex<2?0:.5)*route.getLength();bikeIndex++;speed=6.2;}else{route=scooterIndex<2?ellipse(0,0,4,77):ellipse(65,0,132,4);position=(scooterIndex%2)*route.getLength()/2;scooterIndex++;speed=5.2;}}
  const a={profile,group,human,realistic:human,vehicle,route,position,direction,speed,distance:0,phase:profile.id*.31,waiting:false};agents.push(a);if(route.kind==='sidewalk')group.position.set(route.x,groundHeightAt(route.x,position),position);else if(route.kind==='boardwalk')group.position.set(-266+position,groundHeightAt(-266+position,route.z),route.z);else{const p=route.getPointAt(position/route.getLength());group.position.set(p.x,groundHeightAt(p.x,p.z),p.z);}if(!mobile)human.readyPromise.then(()=>group.visible=true);
 }
 function routePoint(a,advance){
  if(a.route.kind==='boardwalk'){const position=(a.position+advance)%1648,t=position<=824?position:1648-position;return{x:-266+t,z:a.route.z,position};}
  if(a.route.kind==='sidewalk')return{x:a.route.x,z:THREE.MathUtils.clamp(a.position+a.direction*advance,-80,80),position:THREE.MathUtils.clamp(a.position+a.direction*advance,-80,80)};
  const length=a.route.getLength(),position=(a.position+advance)%length,p=a.route.getPointAt(position/length);return{x:p.x,z:p.z,position};
 }
 function update(dt,time){const player=getPlayer();if(mobile&&player){const near=[...agents].sort((a,b)=>Math.hypot(a.group.position.x-player.x,a.group.position.z-player.z)-Math.hypot(b.group.position.x-player.x,b.group.position.z-player.z)).filter(a=>Math.hypot(a.group.position.x-player.x,a.group.position.z-player.z)<210).slice(0,6);for(const a of agents){if(!near.includes(a)&&a.human.ready){a.human.dispose();a.group.visible=false;}}if(!loading){const a=near.find(a=>!a.human.ready);if(a){loading=true;a.human.load().then(()=>{a.group.visible=true}).catch(console.warn).finally(()=>loading=false);}}}for(const a of agents){if(!a.human.ready)continue;const old=a.group.position.clone(),advance=Math.min(dt,.15)*a.speed;a.waiting=false;
  if(a.route.kind==='sidewalk'&&(a.position>=79.99&&a.direction>0||a.position<=-79.99&&a.direction<0))a.direction*=-1;
  const radius=a.vehicle?.48:.28;
  const clear=(x,z)=>canWalk(x,z)&&!(player&&Math.hypot(x-player.x,z-player.z)<(a.vehicle?1.5:.6))&&!agents.some(other=>other!==a&&other.human.ready&&Math.hypot(x-other.group.position.x,z-other.group.position.z)<.55);
  let next=routePoint(a,advance);a.retry=Math.max(0,(a.retry||0)-dt);
  if(!a.detour&&(Math.hypot(next.x-old.x,next.z-old.z)>advance+.02||!clearSegment(old,next,clear,radius))&&!a.retry){
   for(const distance of[7,12,18]){const goal=routePoint(a,distance),path=findPedestrianDetour(old,goal,clear,{radius});if(path){a.detour={path,position:goal.position};break;}}
   a.retry=.65;
  }
  if(a.detour){const waypoint=a.detour.path[0],d=Math.hypot(waypoint.x-old.x,waypoint.z-old.z),step=Math.min(advance,d);next={x:old.x+(waypoint.x-old.x)*step/(d||1),z:old.z+(waypoint.z-old.z)*step/(d||1)};
   if(clearSegment(old,next,clear,radius)){a.group.position.set(next.x,groundHeightAt(next.x,next.z),next.z);if(d<=advance+.001){a.detour.path.shift();if(!a.detour.path.length){a.position=a.detour.position;a.detour=null;}}}
   else{a.detour=null;a.retry=0;a.waiting=true;}
  }else if(clearSegment(old,next,clear,radius)){a.group.position.set(next.x,groundHeightAt(next.x,next.z),next.z);a.position=next.position;}
  else a.waiting=true;
  const moved=a.group.position.distanceTo(old);a.waiting=moved<.0001;if(!a.waiting){a.group.rotation.y=Math.atan2(a.group.position.x-old.x,a.group.position.z-old.z);a.distance+=moved;}
  const moving=!a.waiting;a.phase+=moving?dt*(a.profile.activity==='bike'?7.4:1):0;a.human.update(dt,moving?a.speed:0,{vehicle:a.vehicle?a.profile.activity:null,phase:a.phase});a.vehicle?.update(a.distance,a.phase);
 }}
 return{root,createHuman,update,agents,count:20,profiles:residentProfiles,readyPromise:Promise.all(agents.map(a=>a.human.readyPromise))};
}
