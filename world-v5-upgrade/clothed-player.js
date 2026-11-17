import * as THREE from 'three';
// Original Zerconda character, made from independent clothing/body meshes.
// No texture-based clothing recoloring or dependency on the old humanoid GLB.
export function createClothedPlayer(){
 const root=new THREE.Group();
 const skin=new THREE.MeshStandardMaterial({color:0xc48c6b,roughness:.9});
 const blue=new THREE.MeshStandardMaterial({color:0x397c9e,roughness:.82});
 const seam=new THREE.MeshStandardMaterial({color:0x22546f,roughness:.86});
 const tan=new THREE.MeshStandardMaterial({color:0xa78b67,roughness:.91});
 const dark=new THREE.MeshStandardMaterial({color:0x343c42,roughness:.85});
 const hair=new THREE.MeshStandardMaterial({color:0x332a26,roughness:1});
 const white=new THREE.MeshStandardMaterial({color:0xd5d9d9,roughness:.75});
 function mesh(parent,geo,mat,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const ell=(p,r,m,x,y,z)=>mesh(p,new THREE.SphereGeometry(1,16,12),m,x,y,z).scale.set(...r);
 const cyl=(p,r1,r2,h,m,x,y,z)=>mesh(p,new THREE.CylinderGeometry(r1,r2,h,12),m,x,y,z);
 // Adult human proportions: ~1.85 m total height, shoulders narrower than leg length.
 ell(root,[.215,.295,.125],blue,0,1.32,0);
 cyl(root,.225,.185,.42,blue,0,1.31,0);
 // Visible shirt collar, button placket, and separate short sleeves.
 cyl(root,.095,.11,.07,white,0,1.565,0);
 mesh(root,new THREE.BoxGeometry(.015,.31,.012),seam,0,1.38,.129);
 for(let i=0;i<4;i++)ell(root,[.009,.009,.007],dark,0,1.49-i*.075,.14);
 // Waist, belt, and tailored trousers.
 cyl(root,.18,.18,.12,tan,0,1.045,0);
 cyl(root,.185,.185,.035,dark,0,1.09,0);
 const head=ell(root,[.105,.145,.105],skin,0,1.72,0);
 ell(root,[.108,.055,.106],hair,0,1.832,-.008);
 ell(root,[.018,.035,.016],skin,-.105,1.72,0);
 ell(root,[.018,.035,.016],skin,.105,1.72,0);
 // Small facial features on the forward (+Z) side.
 for(const x of [-.041,.041])ell(root,[.008,.007,.005],dark,x,1.74,.102);
 ell(root,[.018,.012,.016],skin,0,1.699,.105);
 const arms=[],legs=[];
 for(const side of [-1,1]){
  const shoulder=new THREE.Group();shoulder.position.set(side*.245,1.49,0);root.add(shoulder);
  ell(shoulder,[.085,.10,.10],blue,0,-.04,0);
  cyl(shoulder,.077,.067,.23,blue,side*.025,-.13,0).rotation.z=side*.16;
  const elbow=new THREE.Group();elbow.position.set(side*.045,-.245,0);shoulder.add(elbow);
  cyl(elbow,.055,.041,.25,skin,0,-.125,0);
  ell(elbow,[.047,.071,.036],skin,0,-.285,0);
  shoulder.rotation.z=side*.12;
  arms.push({shoulder,elbow,side});
  const hip=new THREE.Group();hip.position.set(side*.105,1.025,0);root.add(hip);
  cyl(hip,.104,.085,.43,tan,0,-.21,0);
  const knee=new THREE.Group();knee.position.y=-.425;hip.add(knee);
  cyl(knee,.085,.062,.43,tan,0,-.21,0);
  ell(knee,[.092,.065,.16],dark,0,-.435,.055);
  legs.push({hip,knee,side});
 }
 return {root,update(time,speed){
  const intensity=Math.min(1,speed/2.5),phase=Math.sin(time*8.2);
  for(const a of arms){a.shoulder.rotation.x=-a.side*phase*.40*intensity;a.elbow.rotation.x=-.08-Math.max(0,a.side*phase)*.12*intensity;}
  for(const l of legs){l.hip.rotation.x=l.side*phase*.48*intensity;l.knee.rotation.x=Math.max(0,-l.side*phase)*.54*intensity;}
  root.position.y=.014*Math.abs(phase)*intensity;
 }};
}
