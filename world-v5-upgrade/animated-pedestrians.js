import * as THREE from 'three';
// Articulated human-shaped characters and animated pedestrian NPCs.
// No branded or copyrighted characters; geometry is original.
export function createPedestrians(scene,{count=16,groundHeightAt=()=>0}={}){
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
 const footBounds=new THREE.Box3();
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
   a.human.root.position.set(a.baseX+Math.sin(time*.37+a.phase)*.65,.055,a.z);
   a.human.root.rotation.y=a.direction>0?0:Math.PI;
   a.human.animate(time+a.phase,a.speed);
   // Plant the lowest animated shoe on the actual pavement surface.
   a.human.root.updateMatrixWorld(true);
   let sole=Infinity;
   for(const leg of a.human.legs)sole=Math.min(sole,footBounds.setFromObject(leg.foot).min.y);
   a.human.root.position.y+=groundHeightAt(a.human.root.position.x,a.z)-sole;

  }
 }
 return {root,createHuman,update,count:agents.length};
}
