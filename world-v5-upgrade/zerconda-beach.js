import {createBeachSandMaterial} from './beach-sand-material.js?v=20261119-sand-mountains-v157';
import {advanceCoastalBreeze} from './coastal-breeze.js?v=20261119-coastal-breeze-v154';
import {createReferenceBeachPalm} from './reference-beach-palm.js?v=20261119-coastal-breeze-v154';
import {createBeachLounge3D} from './beach-lounge-3d.js?v=20261119-coastal-breeze-v154';
import * as THREE from 'three';
import {createRealisticOcean} from './realistic-ocean.js?v=20261118-wall-mystery-v111';
// Zerconda South Beach, reachable on foot from the southern city edge at z=168.
// Tiled sand PBR, animated layered water, foam, dunes, boardwalk, umbrellas and palms.
export function createZercondaBeach(scene,{base='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/',prepareModel=async()=>{}}={}){
 const root=new THREE.Group();root.name='Zerconda South Beach';scene.add(root);
 const sand=createBeachSandMaterial();
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
 // Sand relief is shaded continuously; no flat oval dune props.
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
 return {root,sandMaterial:sand,boardwalkBounds,lounges,palms,nearestSeat(x,z,max=2.5){let best=null,d=max;for(const l of lounges){const distance=Math.hypot(x-l.seat.x,z-l.seat.z);if(distance<d){best=l.seat;d=distance;}}return best;},blocks(x,z){return lounges.some(l=>l.blocks(x,z))||palms.some(p=>Math.hypot(x-p.x,z-p.z)<.48);},ocean:oceanSystem,heightAt(x,z){
  // Match the visible planks (.19 centre + .025 half thickness), not sea level.
  if(x>=boardwalkBounds.minX&&x<=boardwalkBounds.maxX&&z>=181&&z<=191)return .215;
  if(Math.abs(x)<=9.5&&z>=152&&z<=190)return .14;
  if(x>=-444&&x<=570&&z>=154&&z<=245)return .085;
  return null;
 },update(dt){advanceCoastalBreeze(dt);oceanSystem.update(dt);},bounds:{minX:-165,maxX:165,minZ:168,maxZ:248},center:{x:0,z:212}};
}
