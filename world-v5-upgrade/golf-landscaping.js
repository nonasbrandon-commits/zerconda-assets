import {upgradePineMeshes} from './realistic-forest-pines.js?v=20261121-forest-airfield-v193';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Shared original GLB geometry is instanced across the grove, keeping draw calls low.
export function addGolfGroves(course,{origin,holes,pathCurves}){
 const root=new THREE.Group();root.name='Tall mixed golf course groves';course.add(root);const trees=[];let seed=8619;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 const pathPoints=pathCurves.flatMap(p=>p.curve.getSpacedPoints(Math.ceil(p.curve.getLength()/2)).map(q=>({x:q.x+origin.x,z:q.z+origin.z,r:p.width/2+4.2})));
 function segmentDistance(x,z,a,b){const dx=b[0]-a[0],dz=b[1]-a[1],t=THREE.MathUtils.clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(x-a[0]-t*dx,z-a[1]-t*dz);}
 for(let tries=0;tries<6000&&trees.length<100;tries++){
  const x=[258,337,433,535][tries%4]+(rnd()-.5)*15,z=-258+rnd()*418;
  if([-96,0,96].some(v=>Math.abs(z-v)<22)||Math.hypot(x-360,z-145)<28||x<244||x>550)continue;
  if(x<282&&z>106&&z<184)continue; // Keep the entire seaside carnival and its views clear.
  if(pathPoints.some(p=>Math.hypot(x-p.x,z-p.z)<p.r))continue;
  if(holes.some(h=>segmentDistance(x,z,h.tee,h.pin)<24||Math.hypot(x-h.pin[0],z-h.pin[1])<24))continue;
  if(trees.some(t=>Math.hypot(x-t.x,z-t.z)<12))continue;
  trees.push({x,z,height:18+rnd()*13,angle:rnd()*Math.PI*2,species:trees.length%3});
 }
 const loader=new GLTFLoader(),base=new URL('../realistic-assets/trees-and-vehicles/trees/',import.meta.url).href;
 function leafy(file,species){return new Promise(resolve=>loader.load(base+file,gltf=>{
  const source=gltf.scene;source.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(source),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());const batch=trees.filter(t=>t.species===species),norm=new THREE.Matrix4().makeTranslation(-center.x,-bounds.min.y,-center.z),dummy=new THREE.Object3D(),m=new THREE.Matrix4(),shade=new THREE.Color();
  source.traverse(o=>{if(!o.isMesh||!batch.length)return;const inst=new THREE.InstancedMesh(o.geometry,o.material,batch.length);inst.name=species?'Tall spreading broadleaf trees':'Tall slender broadleaf trees';inst.receiveShadow=true;inst.castShadow=false;batch.forEach((t,i)=>{dummy.position.set(t.x-origin.x,.02,t.z-origin.z);dummy.rotation.set(0,t.angle,0);const scale=t.height/size.y;dummy.scale.set(scale*(species?1.05:.8),scale,scale*(species?1.05:.8));dummy.updateMatrix();m.copy(dummy.matrix).multiply(norm).multiply(o.matrixWorld);inst.setMatrixAt(i,m);shade.setRGB(.8+rnd()*.17,.88+rnd()*.12,.74+rnd()*.16);inst.setColorAt(i,shade);});root.add(inst);});resolve(true);
 },undefined,()=>resolve(false)));}
 // Tall 3D evergreen boughs provide a contrasting silhouette to the broadleaf groves.
 const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.strokeStyle='#577544';ctx.lineWidth=3;for(let j=0;j<22;j++){const y=20+j*10,w=9+j*4;for(const side of[-1,1]){ctx.beginPath();ctx.moveTo(128,y);ctx.lineTo(128+side*w,y+22);ctx.stroke();}}const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;const img=new Image();img.onload=()=>{ctx.clearRect(0,0,256,256);for(let j=0;j<13;j++)for(const side of[-1,1]){ctx.save();ctx.translate(128+side*j*3,20+j*17);ctx.rotate(side*.6);ctx.drawImage(img,-22,-50,44,90);ctx.restore();}texture.needsUpdate=true;};img.src=new URL('../realistic-assets/wilderness/pine-sprig.webp',import.meta.url).href;
 const pos=[],uv=[],ids=[];for(let j=0;j<20;j++){const t=j/20,y=.31+t*.67,r=(1-t)*.17+.01;for(let b=0;b<6;b++){const a=b*Math.PI/3+j*2.4,s=Math.sin(a),c=Math.cos(a),n=pos.length/3;for(const[u,v]of[[-1,0],[1,0],[-1,1],[1,1]]){const d=v*r;pos.push(c*d-s*u*r*.6*(1-v*.5),y-d*.25,s*d+c*u*r*.6*(1-v*.5));uv.push((u+1)/2,v);}ids.push(n,n+1,n+2,n+1,n+3,n+2);}}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(ids);geo.computeVertexNormals();const pine=trees.filter(t=>t.species===2),crowns=new THREE.InstancedMesh(geo,new THREE.MeshStandardMaterial({map:texture,alphaTest:.22,side:THREE.DoubleSide,roughness:1}),pine.length),trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.005,.012,1,8),new THREE.MeshStandardMaterial({color:0x73634d,roughness:1}),pine.length),dummy=new THREE.Object3D();pine.forEach((t,i)=>{dummy.position.set(t.x-origin.x,.02,t.z-origin.z);dummy.rotation.set(0,t.angle,0);dummy.scale.setScalar(t.height);dummy.updateMatrix();crowns.setMatrixAt(i,dummy.matrix);dummy.position.y=t.height*.5;dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);});upgradePineMeshes(crowns,trunks);root.add(crowns,trunks);
 const ready=Promise.all([leafy('leafy-small-tree.glb',0),leafy('leafy-island-tree.glb',1)]);return{root,trees,ready,pathPoints};
}
