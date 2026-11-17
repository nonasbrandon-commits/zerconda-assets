import * as THREE from 'three';
// Original Zerconda character, made from independent clothing/body meshes.
// No texture-based clothing recoloring or dependency on the old humanoid GLB.
export function createClothedPlayer(){
 const root=new THREE.Group();
 const skin=new THREE.MeshStandardMaterial({color:0xc48c6b,roughness:.9});
 const blue=new THREE.MeshStandardMaterial({color:0x397c9e,roughness:.96});
 const seam=new THREE.MeshStandardMaterial({color:0x22546f,roughness:.86});
 const tan=new THREE.MeshStandardMaterial({color:0xa78b67,roughness:.91});
 const dark=new THREE.MeshStandardMaterial({color:0x343c42,roughness:.85});
 const hair=new THREE.MeshStandardMaterial({color:0x332a26,roughness:1});
 const white=new THREE.MeshStandardMaterial({color:0xd5d9d9,roughness:.75});
 function mesh(parent,geo,mat,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const ell=(p,r,m,x,y,z)=>{const obj=mesh(p,new THREE.SphereGeometry(1,16,12),m,x,y,z);obj.scale.set(...r);return obj;};
 const cyl=(p,r1,r2,h,m,x,y,z)=>mesh(p,new THREE.CylinderGeometry(r1,r2,h,12),m,x,y,z);
 // Adult human proportions: ~1.85 m total height, shoulders narrower than leg length.
 // Contoured torso: taper at the waist, natural shoulders, no spherical chest.
 const torso=mesh(root,new THREE.CylinderGeometry(.205,.165,.52,32,5),blue,0,1.33,0);
 torso.scale.z=.82;
 ell(root,[.202,.048,.13],blue,0,1.545,0);
 // Shirt hem and side seams
 const hem=new THREE.MeshStandardMaterial({color:0x276b89,roughness:.96});
 const shirtHem=mesh(root,new THREE.CylinderGeometry(.178,.176,.025,20),hem,0,1.085,0);shirtHem.scale.z=.7;
 // Visible shirt collar, button placket, and separate short sleeves.
 const neck=mesh(root,new THREE.CylinderGeometry(.073,.078,.105,16),skin,0,1.616,0);
 const collar=mesh(root,new THREE.CylinderGeometry(.096,.098,.038,16),white,0,1.574,0);collar.scale.z=.78;
 mesh(root,new THREE.BoxGeometry(.015,.31,.012),seam,0,1.38,.129);
 for(let i=0;i<4;i++)ell(root,[.009,.009,.007],dark,0,1.49-i*.075,.14);
 // Waist, belt, and tailored trousers.
 cyl(root,.18,.18,.12,tan,0,1.045,0);
 cyl(root,.185,.185,.035,dark,0,1.09,0);
 // Taller cranium with narrower jaw and ears, replacing the featureless ball.
 const head=ell(root,[.092,.135,.095],skin,0,1.747,0);
 const jaw=ell(root,[.073,.057,.076],skin,0,1.679,.016);
 for(const side of [-1,1])ell(root,[.016,.033,.020],skin,side*.101,1.732,0);
 // Anatomically shaped rear hairline instead of a flat brown cap.
 const hairBack=ell(root,[.096,.064,.094],hair,0,1.825,-.025);
 hairBack.rotation.x=-.12;
 // Short tapered nape, blended sideburns and small irregular locks.
 ell(root,[.067,.020,.014],hair,0,1.788,-.093);
 for(const side of [-1,1]){
   const temple=ell(root,[.028,.071,.051],hair,side*.082,1.818,-.015);
   temple.rotation.z=side*.18;
 }
 // Fine overlapping strands give the haircut shape from the default rear camera.
 const hairShades=[0x30231f,0x423027,0x513b2d,0x382923].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.96}));
 for(let i=0;i<160;i++){
   const theta=i*2.3999632297;
   const rr=Math.sqrt((i+.5)/160);
   const xx=Math.cos(theta)*rr*.096,zz=Math.sin(theta)*rr*.078-.037;
   const yy=1.869+.024*(1-rr*rr)+Math.sin(i*3.1)*.003;
   const lock=ell(root,[.006,.011,.008],hairShades[i%4],xx,yy,zz);
   lock.rotation.z=Math.sin(theta)*.28;
 }
 // Rear shirt: yoke seam, placket stitching, cuffs and natural fabric creases.
 const stitch=new THREE.MeshStandardMaterial({color:0x75a6bc,roughness:.95});
 mesh(root,new THREE.BoxGeometry(.335,.008,.009),stitch,0,1.485,-.123);
 mesh(root,new THREE.BoxGeometry(.008,.36,.009),seam,0,1.275,-.129);
 for(const side of [-1,1]){
   const crease=mesh(root,new THREE.BoxGeometry(.008,.23,.008),stitch,side*.14,1.285,-.117);
   crease.rotation.z=side*.19;
 }
 ell(root,[.018,.035,.016],skin,-.105,1.72,0);
 ell(root,[.018,.035,.016],skin,.105,1.72,0);
 // Small facial features on the forward (+Z) side.
 for(const x of [-.041,.041])ell(root,[.008,.007,.005],dark,x,1.74,.102);
 ell(root,[.018,.012,.016],skin,0,1.699,.105);
 const arms=[],legs=[];
 for(const side of [-1,1]){
  const shoulder=new THREE.Group();shoulder.position.set(side*.245,1.49,0);root.add(shoulder);
  ell(shoulder,[.068,.068,.071],blue,0,-.035,0);
  cyl(shoulder,.068,.058,.23,blue,side*.025,-.13,0).rotation.z=side*.12;
  const elbow=new THREE.Group();elbow.position.set(side*.045,-.245,0);shoulder.add(elbow);
  cyl(elbow,.048,.034,.25,skin,0,-.125,0);
  const palm=ell(elbow,[.039,.066,.028],skin,0,-.279,0);
  for(let finger=0;finger<4;finger++)ell(elbow,[.007,.035,.009],skin,(finger-1.5)*.017,-.326,.004);
  shoulder.rotation.z=side*.12;
  arms.push({shoulder,elbow,side});
  const hip=new THREE.Group();hip.position.set(side*.105,1.025,0);root.add(hip);
  cyl(hip,.091,.076,.43,tan,0,-.21,0);
  const knee=new THREE.Group();knee.position.y=-.425;hip.add(knee);
  cyl(knee,.077,.060,.43,tan,0,-.21,0);
  ell(knee,[.079,.055,.145],dark,0,-.435,.055);
  legs.push({hip,knee,side});
 }
 return {root,update(time,speed){
  const intensity=Math.min(1,speed/2.5),phase=Math.sin(time*8.2);
  for(const a of arms){a.shoulder.rotation.x=-a.side*phase*.40*intensity;a.elbow.rotation.x=-.08-Math.max(0,a.side*phase)*.12*intensity;}
  for(const l of legs){l.hip.rotation.x=l.side*phase*.48*intensity;l.knee.rotation.x=Math.max(0,-l.side*phase)*.54*intensity;}
  root.position.y=.014*Math.abs(phase)*intensity;
 }};
}
