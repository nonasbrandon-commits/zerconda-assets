import * as THREE from 'three';
// Three animated inflatable air dancers in the dealership forecourt, no third-party logos.
export function addAirDancers(scene,{x=-72,z=-48}={}){
 const group=new THREE.Group();group.position.set(x,0,z);scene.add(group);
 const dancers=[];
 for(let i=0;i<3;i++){
  const root=new THREE.Group();root.position.set(8.5,0,-18-i*4.2);group.add(root);
  const orange=new THREE.MeshStandardMaterial({color:i===1?0xff8126:i===2?0xf35b21:0xffa02c,roughness:.86,side:THREE.DoubleSide});
  const black=new THREE.MeshStandardMaterial({color:0x14191c,roughness:.8});
  const white=new THREE.MeshBasicMaterial({color:0xfafafa});
  const make=(geo,mat,px,py,pz,parent=root)=>{const o=new THREE.Mesh(geo,mat);o.position.set(px,py,pz);parent.add(o);return o};
  make(new THREE.CylinderGeometry(.62,.72,.75,18),black,0,.38,0);
  const torso=new THREE.Group();torso.position.y=.7;root.add(torso);
  make(new THREE.CylinderGeometry(.37,.43,4.8,14,8),orange,0,2.4,0,torso);
  make(new THREE.SphereGeometry(.36,16,12),orange,0,4.8,0,torso);
  const arms=[];
  for(let side of [-1,1]){
   const arm=new THREE.Group();arm.position.set(side*.3,3.7,0);torso.add(arm);
   const m=make(new THREE.CylinderGeometry(.2,.22,2.5,12),orange,side*.93,.85,0,arm);m.rotation.z=-side*.72;
   const fringe=make(new THREE.ConeGeometry(.23,.5,8),black,side*1.75,1.65,0,arm);
   arms.push({arm,side});
  }
  for(let k=0;k<2;k++){make(new THREE.SphereGeometry(.075,12,8),white,(k?1:-1)*.14,4.3,.35,torso);make(new THREE.SphereGeometry(.028,8,6),black,(k?1:-1)*.14,4.3,.41,torso);}
  const smile=make(new THREE.TorusGeometry(.16,.035,8,16,Math.PI),white,0,4.05,.36,torso);smile.rotation.z=Math.PI;
  for(let k=0;k<5;k++){const hair=make(new THREE.ConeGeometry(.055,.55,6),black,(k-2)*.12,5.12,0,torso);hair.rotation.z=(k-2)*.25;}
  dancers.push({torso,arms,phase:i*1.8});
 }
 return {root:group,update(t){for(const d of dancers){const a=t*2.6+d.phase;d.torso.rotation.z=Math.sin(a)*.21;d.torso.rotation.x=Math.sin(a*.7)*.11;d.torso.scale.y=1+Math.sin(a*1.7)*.055;for(const arm of d.arms)arm.arm.rotation.z=Math.sin(a*1.8+arm.side)*.42;}}};
}
