import {optimizeStaticModel} from './static-model-batching.js?v=20261119-performance-v147';
import {addRealisticBeachPalms} from './realistic-beach-palms.js';
import * as THREE from 'three';
import {createRealisticOcean} from './realistic-ocean.js?v=20261118-wall-mystery-v111';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Zerconda South Beach, reachable on foot from the southern city edge at z=168.
// Tiled sand PBR, animated layered water, foam, dunes, boardwalk, umbrellas and palms.
export function createZercondaBeach(scene,{base='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/',prepareModel=async()=>{}}={}){
 const root=new THREE.Group();root.name='Zerconda South Beach';scene.add(root);
 // Original grain-scale sand texture; avoids using green grass photography as sand.
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;
 const ctx=canvas.getContext('2d');const image=ctx.createImageData(512,512);
 let seed=18357;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 for(let y=0;y<512;y++)for(let x=0;x<512;x++){const i=(y*512+x)*4,noise=(random()-.5)*47,ripple=Math.sin(y*.085+Math.sin(x*.024)*1.5)*7;image.data[i]=Math.max(0,Math.min(255,218+noise+ripple));image.data[i+1]=Math.max(0,Math.min(255,194+noise+ripple));image.data[i+2]=Math.max(0,Math.min(255,151+noise+ripple));image.data[i+3]=255;}
 ctx.putImageData(image,0,0);
 const sandMap=new THREE.CanvasTexture(canvas);sandMap.colorSpace=THREE.SRGBColorSpace;sandMap.wrapS=sandMap.wrapT=THREE.RepeatWrapping;sandMap.repeat.set(18,8);sandMap.anisotropy=8;
 const sand=new THREE.MeshStandardMaterial({color:0xe5ceaa,roughness:1,map:sandMap});
 const wood=new THREE.MeshStandardMaterial({color:0x927055,roughness:.87});
 const fabric=[0xf5f2e8,0x237aaf,0xe79a60,0xe7d2a2].map(color=>new THREE.MeshStandardMaterial({color,roughness:.82,side:THREE.DoubleSide}));
 function mesh(geo,mat,x,y,z){const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.receiveShadow=true;root.add(o);return o;}
 const land=mesh(new THREE.PlaneGeometry(1014,91),sand,63,.085,199.5);land.rotation.x=-Math.PI/2;
 // Road connection across the former boundary to the promenade.
 const asphalt=new THREE.MeshStandardMaterial({color:0x45474a,roughness:.96});
 const access=mesh(new THREE.PlaneGeometry(19,38),asphalt,0,.14,171);access.rotation.x=-Math.PI/2;
 // A single instanced deck spans the interior faces of both perimeter walls.
 const boardwalkBounds={minX:-443.1,maxX:569.1,minZ:181,maxZ:191,y:.215};
 const boardwalk=mesh(new THREE.PlaneGeometry(1012.2,10),wood,63,.17,186);boardwalk.name='Wall-to-wall beach boardwalk';boardwalk.rotation.x=-Math.PI/2;
 const planks=new THREE.InstancedMesh(new THREE.BoxGeometry(2.06,.05,9.5),wood,482),plankMatrix=new THREE.Matrix4();
 planks.name='Continuous boardwalk planks';planks.receiveShadow=true;
 for(let i=0;i<482;i++){plankMatrix.makeTranslation(-443.1+(i+.5)*2.1,.19,186);planks.setMatrixAt(i,plankMatrix);}root.add(planks);
 const oceanSystem=createRealisticOcean(root);
 // Sand ripples and dune clusters.
 const duneMat=new THREE.MeshStandardMaterial({color:0xd7bb88,roughness:1});
 for(let i=0;i<90;i++){const x=((i*73)%317)-158,z=192+((i*31)%39);if(Math.abs(x)<13)continue;const o=mesh(new THREE.SphereGeometry(1,10,6),duneMat,x,.1,z);o.scale.set(1.3+(i%4),.1+(i%3)*.04,.6+(i%5)*.3);}
 // Lounge chairs with real-scale wooden frames and stretched canvas.
 for(let i=0;i<34;i++){
  const x=-145+(i%17)*18,z=207+Math.floor(i/17)*17;
  if(Math.abs(x)<13)continue;
  const a=(i%3-1)*.22;
  const chair=new THREE.Group();chair.position.set(x,.2,z);chair.rotation.y=a;root.add(chair);
  const leg=new THREE.MeshStandardMaterial({color:0x8c745e,roughness:.8});
  function beam(w,h,d,px,py,pz,material){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);o.position.set(px,py,pz);chair.add(o);return o;}
  beam(.85,.09,1.8,0,.24,0,leg);beam(.78,.055,1.65,0,.31,0,fabric[i%4]);
  const back=beam(.79,.06,.88,0,.64,-.65,fabric[i%4]);back.rotation.x=-.68;
  for(const side of [-.36,.36])for(const zz of [-.62,.62])beam(.075,.32,.075,side,.12,zz,leg);
  // Fabric beach umbrella, conical canopy and central pole.
  const pole=mesh(new THREE.CylinderGeometry(.045,.055,2.7,10),leg,x+2,1.45,z);
  const canopy=mesh(new THREE.ConeGeometry(1.65,.68,12),fabric[(i+1)%4],x+2,2.9,z);
 }
 // Detailed coconut palms with individual curved fronds, no low-poly cone foliage.
 // Load an actual CC0 GLB palm model. Geometry fallback only on failed download.
 const palmUrl=base+'realistic-assets/palms/palm-detailed.glb';
 new GLTFLoader().load(palmUrl,async gltf=>{
   const template=gltf.scene;optimizeStaticModel(template,'beach-palm-source');await prepareModel(template);
   template.updateMatrixWorld(true);
   const bounds=new THREE.Box3().setFromObject(template);
   const size=bounds.getSize(new THREE.Vector3());
   const center=bounds.getCenter(new THREE.Vector3());
   const scale=8.9/Math.max(.01,size.y);
   for(let i=0;i<24;i++){
     const x=-150+(i*67)%300,z=192+(i*29)%36;
     if(Math.abs(x)<14)continue;
     const palm=template.clone(true);
     palm.position.set(x-center.x*scale,-bounds.min.y*scale,z-center.z*scale);
     palm.scale.setScalar(scale*(.86+(i%5)*.055));
     palm.rotation.y=i*2.39996;
     palm.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
     root.add(palm);optimizeStaticModel(palm,'beach-palm');
   }
   console.info('Zerconda: loaded real CC0 GLB beach palms',palmUrl);
 },undefined,error=>{
   console.error('Detailed palm GLB missing; using fallback palm geometry',error);
   addRealisticBeachPalms(root,{count:24});
 });
 return {root,boardwalkBounds,ocean:oceanSystem,heightAt(x,z){
  // Match the visible planks (.19 centre + .025 half thickness), not sea level.
  if(x>=boardwalkBounds.minX&&x<=boardwalkBounds.maxX&&z>=181&&z<=191)return .215;
  if(Math.abs(x)<=9.5&&z>=152&&z<=190)return .14;
  if(x>=-444&&x<=570&&z>=154&&z<=245)return .085;
  return null;
 },update(dt){oceanSystem.update(dt);},bounds:{minX:-165,maxX:165,minZ:168,maxZ:248},center:{x:0,z:212}};
}
