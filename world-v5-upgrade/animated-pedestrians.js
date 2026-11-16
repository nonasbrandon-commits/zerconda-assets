import * as THREE from 'three';
// Articulated human-shaped characters and animated pedestrian NPCs.
// No branded or copyrighted characters; geometry is original.
export function createPedestrians(scene,{count=16}={}){
 const root=new THREE.Group();root.name='Animated Zerconda pedestrians';scene.add(root);
 const skin=[0xe7b58d,0x9d6345,0xc78d68,0xf0c9a6,0x69432f].map(color=>new THREE.MeshStandardMaterial({color,roughness:.88}));
 const shirts=[0x28475b,0x9a5348,0x52705c,0xd0c7b8,0x444b64,0x9b8665].map(color=>new THREE.MeshStandardMaterial({color,roughness:.91}));
 const pants=[0x202b35,0x363a40,0x465263,0x75695b].map(color=>new THREE.MeshStandardMaterial({color,roughness:.95}));
 const hair=[0x242020,0x593e30,0x171819,0x9e7144].map(color=>new THREE.MeshStandardMaterial({color,roughness:.95}));
 const shoes=new THREE.MeshStandardMaterial({color:0x23272a,roughness:.85});
 function part(parent,geo,mat,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
 function createHuman(i=0){
  const root=new THREE.Group();root.name='Animated human '+i;
  const shirt=shirts[i%shirts.length],trousers=pants[i%pants.length],face=skin[i%skin.length];
  const torso=new THREE.Group();root.add(torso);
  part(torso,new THREE.CapsuleGeometry(.255,.56,6,12),shirt,0,1.24,0);
  part(torso,new THREE.SphereGeometry(.19,14,10),face,0,1.88,0);
  part(torso,new THREE.SphereGeometry(.194,14,10,0,Math.PI*2,0,Math.PI*.47),hair[i%hair.length],0,1.92,0);
  part(torso,new THREE.CylinderGeometry(.085,.10,.19,10),face,0,1.65,0);
  // Face points along local +Z, same as walking forward.
  for(const side of [-1,1]){
   part(torso,new THREE.SphereGeometry(.017,8,6),hair[2],side*.075,1.89,.179);
   part(torso,new THREE.SphereGeometry(.055,8,6),face,side*.196,1.85,0);
  }
  const arms=[],legs=[];
  for(const side of [-1,1]){
   const shoulder=new THREE.Group();shoulder.position.set(side*.31,1.52,0);torso.add(shoulder);
   part(shoulder,new THREE.CapsuleGeometry(.091,.36,5,10),shirt,0,-.28,0);
   part(shoulder,new THREE.CapsuleGeometry(.068,.19,4,8),face,0,-.65,0);
   arms.push(shoulder);
   const hip=new THREE.Group();hip.position.set(side*.15,.91,0);root.add(hip);
   part(hip,new THREE.CapsuleGeometry(.119,.39,5,10),trousers,0,-.29,0);
   const knee=new THREE.Group();knee.position.y=-.55;hip.add(knee);
   part(knee,new THREE.CapsuleGeometry(.10,.31,5,10),trousers,0,-.19,0);
   part(knee,new THREE.BoxGeometry(.21,.13,.39),shoes,0,-.43,.1);
   legs.push({hip,knee});
  }
  return {root,torso,arms,legs,animate(t,speed=0){
   const intensity=THREE.MathUtils.clamp(speed/2.5,0,1.3);
   const cycle=t*8.4;
   arms.forEach((a,n)=>a.rotation.x=Math.sin(cycle+n*Math.PI)*.46*intensity);
   legs.forEach((leg,n)=>{const phase=Math.sin(cycle+n*Math.PI);
    leg.hip.rotation.x=phase*.58*intensity;
    leg.knee.rotation.x=Math.max(0,-phase)*.64*intensity;});
   torso.position.y=Math.abs(Math.sin(cycle))*.037*intensity;
   torso.rotation.z=Math.sin(cycle)*.025*intensity;
  }};
 }
 const agents=[];
 for(let i=0;i<count;i++){
  const human=createHuman(i+1);
  const side=i%2===0?-1:1, lane=(i%4)*7;
  const x=side*(106+lane),z=-145+((i*31)%255);
  human.root.position.set(x,0,z);
  root.add(human.root);
  agents.push({human,x,z,baseX:x,direction:i%3===0?-1:1,speed:.75+(i%5)*.19,phase:i*1.17});
 }
 function update(dt,time){
  for(const a of agents){
   a.z+=a.direction*a.speed*dt;
   if(a.z>115){a.z=115;a.direction=-1;}
   if(a.z< -150){a.z=-150;a.direction=1;}
   a.human.root.position.set(a.baseX+Math.sin(time*.37+a.phase)*.65,0,a.z);
   a.human.root.rotation.y=a.direction>0?0:Math.PI;
   a.human.animate(time+a.phase,a.speed);
  }
 }
 return {root,createHuman,update,count:agents.length};
}
