import {advanceCoastalBreeze} from './coastal-breeze.js?v=20261119-coastal-breeze-v154';
import {createReferenceBeachPalm} from './reference-beach-palm.js?v=20261119-coastal-breeze-v154';
import {createBeachLounge3D} from './beach-lounge-3d.js?v=20261119-coastal-breeze-v154';
import * as THREE from 'three';
import {createRealisticOcean} from './realistic-ocean.js?v=20261118-wall-mystery-v111';
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
 for(let i=0;i<90;i++){const x=((i*73)%317)-158,z=192+((i*31)%39);if(Math.abs(x)<13||[207,224].some(row=>Math.abs(z-row)<3.5))continue;const o=mesh(new THREE.SphereGeometry(1,10,6),duneMat,x,.1,z);o.scale.set(1.3+(i%4),.1+(i%3)*.04,.6+(i%5)*.3);}
 // User reference beach sets: navy parasol, cream chaise, table and plant.
 const lounges=[];
 for(let i=0;i<34;i++){
  const x=-145+(i%17)*18+Math.sin(i*2.31)*1.1,z=207+Math.floor(i/17)*17+Math.sin(i*1.71)*1.5;
  if(Math.abs(x)<13)continue;
  const lounge=createBeachLounge3D(root,{x,y:.085,z,index:i});lounges.push(lounge);
 }
 // Reference palms replace only the palms owned by this beach module.
 const palms=[];
 for(let i=0;i<24;i++){
  const x=-150+(i*67)%300,z=192+(i*29)%36;
  if(Math.abs(x)<14)continue;
  palms.push(createReferenceBeachPalm(root,{x,y:.085,z,height:8.9*(.86+(i%5)*.055)}));
 }
 return {root,boardwalkBounds,lounges,palms,nearestSeat(x,z,max=2.5){let best=null,d=max;for(const l of lounges){const distance=Math.hypot(x-l.seat.x,z-l.seat.z);if(distance<d){best=l.seat;d=distance;}}return best;},blocks(x,z){return lounges.some(l=>l.blocks(x,z))||palms.some(p=>Math.hypot(x-p.x,z-p.z)<.48);},ocean:oceanSystem,heightAt(x,z){
  // Match the visible planks (.19 centre + .025 half thickness), not sea level.
  if(x>=boardwalkBounds.minX&&x<=boardwalkBounds.maxX&&z>=181&&z<=191)return .215;
  if(Math.abs(x)<=9.5&&z>=152&&z<=190)return .14;
  if(x>=-444&&x<=570&&z>=154&&z<=245)return .085;
  return null;
 },update(dt){advanceCoastalBreeze(dt);oceanSystem.update(dt);},bounds:{minX:-165,maxX:165,minZ:168,maxZ:248},center:{x:0,z:212}};
}
