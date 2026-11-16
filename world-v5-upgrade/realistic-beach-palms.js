import * as THREE from 'three';
// Original 3D coconut palms: curved ringed trunks, hundreds of narrow leaflets,
// drooping rachises, crown spears and coconuts. No image billboards or cone leaves.
export function addRealisticBeachPalms(root,{count=25}={}){
 const bark=new THREE.MeshStandardMaterial({color:0x88684b,roughness:1,flatShading:false});
 const rings=new THREE.MeshStandardMaterial({color:0x59432e,roughness:1});
 const green=[0x3d782d,0x488d32,0x629b36,0x7da940,0x2c672d,0x9ba747].map(color=>new THREE.MeshStandardMaterial({color,roughness:.86,side:THREE.DoubleSide}));
 const midrib=new THREE.MeshStandardMaterial({color:0x697b36,roughness:.92});
 const coconut=new THREE.MeshStandardMaterial({color:0x716043,roughness:1});
 const unit=new THREE.Group();unit.name='Detailed coconut palm';root.add(unit);
 const taper=(t)=>.34*(1-t)+.115*t;
 const height=7.8;
 const center=t=>new THREE.Vector3(.55*t*t,height*t,.28*Math.sin(t*Math.PI));
 // Segmented curved trunk built as tapered cylindrical rings.
 for(let i=0;i<22;i++){
  const a=i/22,b=(i+1)/22,p=center(a),q=center(b),delta=q.clone().sub(p);
  const piece=new THREE.Mesh(new THREE.CylinderGeometry(taper(b),taper(a),delta.length(),12),bark);
  piece.position.copy(p).add(q).multiplyScalar(.5);piece.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());
  piece.castShadow=true;unit.add(piece);
  const scar=new THREE.Mesh(new THREE.TorusGeometry(taper(b)*1.005,.012,4,12),rings);
  scar.position.copy(q);scar.rotation.x=Math.PI/2;unit.add(scar);
 }
 const top=center(1);
 // Fronds curve outward, then bend down under their own weight.
 const bladeCount=12;
 for(let f=0;f<bladeCount;f++){
  const angle=f*Math.PI*2/bladeCount+.2*Math.sin(f*7);
  const dir=new THREE.Vector3(Math.sin(angle),0,Math.cos(angle));
  const side=new THREE.Vector3(dir.z,0,-dir.x);
  const length=4.1+(f%4)*.35;
  const points=[];
  for(let j=0;j<=18;j++){
   const t=j/18;
   const p=top.clone().addScaledVector(dir,length*t);
   p.y+=.7*Math.sin(t*Math.PI)-2.5*t*t;
   points.push(p);
  }
  const spine=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),18,.026,4,false),midrib);
  unit.add(spine);
  const vertices=[],indices=[],colors=[];
  const color=green[f%green.length].color;
  // Long, individual narrow leaflets on both sides of each frond.
  for(let j=1;j<18;j++){
   const t=j/19,p=points[Math.min(18,j)];
   const width=(.28+.88*Math.sin(Math.PI*t))* (1-.25*t);
   for(const sign of [-1,1]){
    const base=vertices.length/3;
    const tip=p.clone().addScaledVector(side,sign*width);
    tip.addScaledVector(dir,.12+ .12*t);tip.y-=.12+.48*t;
    const half=p.clone().lerp(tip,.5);half.y+=.08;
    const end=p.clone().addScaledVector(dir,.15);
    for(const v of [p,half,tip,end])vertices.push(v.x,v.y,v.z);
    indices.push(base,base+1,base+2,base,base+2,base+3);
   }
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
  geometry.setIndex(indices);geometry.computeVertexNormals();
  const leaf=new THREE.Mesh(geometry,green[f%green.length]);leaf.castShadow=true;leaf.receiveShadow=true;unit.add(leaf);
 }
 for(let k=0;k<5;k++){
  const a=k*Math.PI*2/5;
  const nut=new THREE.Mesh(new THREE.SphereGeometry(.14,8,6),coconut);
  nut.position.copy(top).add(new THREE.Vector3(Math.sin(a)*.2,-.3,Math.cos(a)*.2));unit.add(nut);
 }
 // Replicate the detailed geometry with deterministic size and lean variation.
 const palms=[];
 for(let i=0;i<count;i++){
  const x=-155+(i*67)%310,z=188+(i*29)%32;
  if(Math.abs(x)<13&&z<203)continue;
  const palm=unit.clone(true);
  palm.position.set(x,0,z);
  palm.scale.setScalar(.76+(i%6)*.085);
  palm.rotation.y=i*2.39996;
  root.add(palm);palms.push(palm);
 }
 root.remove(unit);
 return palms;
}
