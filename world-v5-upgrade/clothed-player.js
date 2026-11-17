import * as THREE from 'three';
// Original Zerconda character, made from independent clothing/body meshes.
// No texture-based clothing recoloring or dependency on the old humanoid GLB.
export function createClothedPlayer(){
 const root=new THREE.Group();
 const skin=new THREE.MeshStandardMaterial({color:0xc99778,roughness:.93});
 const blue=new THREE.MeshStandardMaterial({color:0x317c9d,roughness:.92});
 const seam=new THREE.MeshStandardMaterial({color:0x22546f,roughness:.86});
 const tan=new THREE.MeshStandardMaterial({color:0xa78765,roughness:.91});
 const dark=new THREE.MeshStandardMaterial({color:0x343c42,roughness:.85});
 const hair=new THREE.MeshStandardMaterial({color:0x332a26,roughness:1});
 const white=new THREE.MeshStandardMaterial({color:0xd5d9d9,roughness:.75});
 function mesh(parent,geo,mat,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const ell=(p,r,m,x,y,z)=>{const obj=mesh(p,new THREE.SphereGeometry(1,16,12),m,x,y,z);obj.scale.set(...r);return obj;};
 const cyl=(p,r1,r2,h,m,x,y,z)=>mesh(p,new THREE.CylinderGeometry(r1,r2,h,12),m,x,y,z);
 // Adult anatomy in meters: realistic silhouette, sloped shoulders and tapered limbs.
 // Local +Z faces forward, -Z is the player's back.
 const fabric=new THREE.MeshStandardMaterial({color:0x357fa1,roughness:.97,side:THREE.DoubleSide});
 const skinShade=new THREE.MeshStandardMaterial({color:0xb88468,roughness:.94});
 function shaped(parent,levels,depth,material){
  const verts=[],indices=[],N=24;
  for(const [y,rx,rz,cx=0,cz=0] of levels)
   for(let j=0;j<N;j++){const t=j*Math.PI*2/N;verts.push(cx+rx*Math.cos(t),y,cz+rz*Math.sin(t));}
  for(let k=0;k<levels.length-1;k++)for(let j=0;j<N;j++){
   const n=k*N+j,m=k*N+(j+1)%N;
   indices.push(n,m,n+N,m,m+N,n+N);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(indices);g.computeVertexNormals();
  return mesh(parent,g,material,0,0,0);
 }
 shaped(root,[[1.075,.158,.108],[1.15,.161,.112],[1.30,.175,.116],[1.43,.206,.119],[1.51,.205,.114],[1.555,.126,.093],[1.57,.085,.075]],0,blue);
 // Shoulder contour and natural shirt collar, without a white floating ring.
 const collarBlue=new THREE.MeshStandardMaterial({color:0x235d7c,roughness:.94});
 const collar=mesh(root,new THREE.TorusGeometry(.083,.014,8,28),collarBlue,0,1.562,0);collar.rotation.x=Math.PI/2;
 cyl(root,.068,.069,.093,skin,0,1.603,0);
 // Cloth seam and pocket stitching, subtle rather than thick painted stripes.
 const stitch=new THREE.MeshStandardMaterial({color:0x4c91ad,roughness:.98});
 const backSeam=mesh(root,new THREE.BoxGeometry(.22,.003,.003),stitch,0,1.472,-.113);
 for(const side of [-1,1]){
  const seamLine=mesh(root,new THREE.BoxGeometry(.002,.18,.003),stitch,side*.155,1.27,-.106);
  seamLine.rotation.z=side*.12;
 }
 // Natural head: narrower skull and neck, brown cropped hair following scalp.
 ell(root,[.087,.119,.091],skin,0,1.741,.008);
 ell(root,[.070,.047,.073],skin,0,1.672,.019);
 for(const side of [-1,1])ell(root,[.013,.027,.014],skin,side*.086,1.726,.002);
 // Fitted scalp, not a separate spherical cap.
 const scalp=ell(root,[.089,.067,.091],hair,0,1.808,-.005);
 scalp.rotation.x=-.12;
 const nape=ell(root,[.070,.023,.012],hair,0,1.777,-.084);
 for(const side of [-1,1]){
  const taper=ell(root,[.019,.035,.036],hair,side*.072,1.788,-.024);
  taper.rotation.z=side*.16;
 }
 // Fine, low-profile strands; no spikes or oversized tufts.
 const shades=[0x30231e,0x403028,0x382821].map(color=>new THREE.MeshStandardMaterial({color,roughness:1}));
 for(let i=0;i<210;i++){
  const t=i*2.39996323,r=Math.sqrt((i+.5)/210),x=Math.cos(t)*r*.085,z=Math.sin(t)*r*.082-.006;
  const yy=1.810+.061*Math.sqrt(Math.max(0,1-r*r));
  const strand=ell(root,[.0035,.003,.008],shades[i%3],x,yy,z);
  strand.rotation.y=t*.3;
 }
 // Eyes and nose are kept on front side, with understated features.
 for(const x of [-.034,.034])ell(root,[.006,.006,.003],dark,x,1.745,.098);
 ell(root,[.014,.014,.013],skin,0,1.705,.101);
 // Waist and tapered trousers, avoiding squared-off pant tubes.
 shaped(root,[[.98,.149,.105],[1.05,.155,.108],[1.10,.16,.108]],0,tan);
 const belt=mesh(root,new THREE.CylinderGeometry(.157,.158,.024,28),dark,0,1.074,0);belt.scale.z=.73;
 const arms=[],legs=[];
 for(const side of [-1,1]){
  const shoulder=new THREE.Group();shoulder.position.set(side*.195,1.475,0);root.add(shoulder);
  // Upper arm flows out of shoulder rather than starting with a ball joint.
  const sleeve=shaped(shoulder,[[ -.235,.056,.060,side*.036],[ -.17,.064,.065,side*.029],[-.045,.082,.078,side*.012],[.018,.066,.067,0]],0,fabric);
  const cuff=mesh(shoulder,new THREE.CylinderGeometry(.057,.057,.016,20),collarBlue,side*.036,-.238,0);
  const elbow=new THREE.Group();elbow.position.set(side*.038,-.245,0);shoulder.add(elbow);
  shaped(elbow,[[-.260,.032,.032],[-.17,.038,.040],[-.045,.047,.046],[.005,.051,.051]],0,skin);
  const hand=ell(elbow,[.036,.069,.026],skin,0,-.297,.005);
  for(let k=0;k<4;k++)ell(elbow,[.006,.021,.007],skin,(k-1.5)*.014,-.351,.010);
  shoulder.rotation.z=side*.075;
  arms.push({shoulder,elbow,side});
  const hip=new THREE.Group();hip.position.set(side*.082,1.008,0);root.add(hip);
  shaped(hip,[[-.43,.065,.067],[-.25,.075,.077],[-.04,.084,.083],[.02,.082,.084]],0,tan);
  const knee=new THREE.Group();knee.position.y=-.425;hip.add(knee);
  shaped(knee,[[-.435,.046,.052],[-.36,.056,.059],[-.16,.060,.066],[.018,.069,.071]],0,tan);
  // Shoe has a shaped toe and heel, not a dark spherical blob.
  const shoe=ell(knee,[.069,.052,.118],dark,0,-.455,.038);
  const sole=ell(knee,[.071,.014,.123],new THREE.MeshStandardMaterial({color:0x272a2c,roughness:.9}),0,-.49,.04);
  legs.push({hip,knee,side});
 }
 return {root,update(time,speed){
  const intensity=Math.min(1,speed/2.5),phase=Math.sin(time*8.2);
  for(const a of arms){a.shoulder.rotation.x=-a.side*phase*.40*intensity;a.elbow.rotation.x=-.08-Math.max(0,a.side*phase)*.12*intensity;}
  for(const l of legs){l.hip.rotation.x=l.side*phase*.48*intensity;l.knee.rotation.x=Math.max(0,-l.side*phase)*.54*intensity;}
  root.position.y=.014*Math.abs(phase)*intensity;
 }};
}
