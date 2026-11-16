import * as THREE from 'three';
// Original city prop geometry. Instanced meshes keep the draw-call count low.
export function addUrbanStreetDetail(scene,{roadLines=[-96,0,96],extent=215}={}){
 const root=new THREE.Group();root.name='Zerconda realistic street detailing';scene.add(root);
 const white=new THREE.MeshStandardMaterial({color:0xd4d2c9,roughness:.95});
 const yellow=new THREE.MeshStandardMaterial({color:0xd9b755,roughness:.94});
 const iron=new THREE.MeshStandardMaterial({color:0x3b4348,metalness:.7,roughness:.47});
 const dark=new THREE.MeshStandardMaterial({color:0x242a2c,roughness:.86});
 const stone=new THREE.MeshStandardMaterial({color:0x92928b,roughness:.92});
 const glass=new THREE.MeshPhysicalMaterial({color:0x8ca3a9,metalness:.1,roughness:.2,transparent:true,opacity:.72});
 const boxGeo=new THREE.BoxGeometry(1,1,1);
 function batch(material,parts){
  const mesh=new THREE.InstancedMesh(boxGeo,material,parts.length);
  const obj=new THREE.Object3D();
  parts.forEach((p,i)=>{obj.position.set(p[0],p[1],p[2]);obj.scale.set(p[3],p[4],p[5]);obj.rotation.set(0,p[6]||0,0);obj.updateMatrix();mesh.setMatrixAt(i,obj.matrix)});
  mesh.instanceMatrix.needsUpdate=true;mesh.receiveShadow=true;root.add(mesh);return mesh;
 }
 const lines=[],center=[],curbs=[],cross=[],drains=[];
 for(const c of roadLines){
  for(let a=-extent;a<=extent;a+=8){
   // Dashed yellow centerline, avoiding intersections.
   if(!roadLines.some(v=>Math.abs(a-v)<15)){
    center.push([c,.048,a,0.13,.014,3.8,0]);
    center.push([a,.048,c,3.8,.014,.13,0]);
   }
  }
  for(const side of [-1,1]){
   for(let a=-extent;a<=extent;a+=13){
    if(roadLines.some(v=>Math.abs(a-v)<14))continue;
    curbs.push([c+side*10.05,.18,a,.25,.32,12.5,0]);
    curbs.push([a,.18,c+side*10.05,12.5,.32,.25,0]);
   }
  }
  for(const intersection of roadLines){
   for(let i=-4;i<=4;i++){
    cross.push([c+i*1.85,.055,intersection-12.7,1.1,.018,2.5,0]);
    cross.push([c+i*1.85,.055,intersection+12.7,1.1,.018,2.5,0]);
    cross.push([intersection-12.7,.055,c+i*1.85,2.5,.018,1.1,0]);
    cross.push([intersection+12.7,.055,c+i*1.85,2.5,.018,1.1,0]);
   }
  }
  for(let a=-extent;a<=extent;a+=40){
   if(roadLines.some(v=>Math.abs(a-v)<18))continue;
   drains.push([c+9.3,.035,a,1.1,.05,.65,0]);
   drains.push([a,.035,c+9.3,.65,.05,1.1,0]);
  }
 }
 batch(yellow,center);batch(stone,curbs);batch(white,cross);batch(iron,drains);
 // Raised curb edge and small rooftop/road details add silhouette and material depth.
 return {root,dispose(){scene.remove(root);root.traverse(o=>{if(o.isMesh)o.geometry.dispose()})}};
}
