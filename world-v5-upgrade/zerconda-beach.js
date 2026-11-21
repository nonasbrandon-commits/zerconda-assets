import {createOffshoreSharks} from './offshore-sharks.js?v=20261120-coastal-v166';
import {createBoardwalkAccess} from './boardwalk-access.js?v=20261120-beach-guests-v168';
import {createBoardwalkFurniture} from './boardwalk-furniture.js?v=20261120-standing-attendant-v167';
import {createBeachSandMaterial} from './beach-sand-material.js?v=20261119-sand-mountains-v157';
import {advanceCoastalBreeze} from './coastal-breeze.js?v=20261119-coastal-breeze-v154';
import {createReferenceBeachPalm} from './reference-beach-palm.js?v=20261120-date-palms-v184';
import {createBeachLounge3D} from './beach-lounge-3d.js?v=20261120-flat-loungers-v178';
import * as THREE from 'three';
import {createRealisticOcean} from './realistic-ocean.js?v=20261118-wall-mystery-v111';
// Zerconda South Beach, reachable on foot from the southern city edge at z=168.
// Tiled sand PBR, animated layered water, foam, dunes, boardwalk, umbrellas and palms.
export function createZercondaBeach(scene,{base='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/',prepareModel=async()=>{},roadMaterial=null,roadCenters=undefined}={}){
 const root=new THREE.Group();root.name='Zerconda South Beach';scene.add(root);
 const sand=createBeachSandMaterial();
 const wood=new THREE.MeshStandardMaterial({color:0x927055,roughness:.87});
 function mesh(geo,mat,x,y,z){const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.receiveShadow=true;root.add(o);return o;}
 function sandHeight(x,z){const distance=Math.max(188-x,0,x-274,z-174);return .02+.065*THREE.MathUtils.clamp(distance/2,0,1);}
 const xs=[-444,186,188,227,235,274,276,570],zs=[154,174,176,181,245],positions=[],uvs=[],indices=[];
 for(let ix=1;ix<xs.length;ix++)for(let iz=1;iz<zs.length;iz++){const x0=xs[ix-1],x1=xs[ix],z0=zs[iz-1],z1=zs[iz];if(x0>=188&&x1<=274&&z0===154&&z1===174||x0===227&&x1===235&&z0>=174&&z1<=181)continue;const n=positions.length/3;for(const[x,z]of[[x0,z0],[x1,z0],[x0,z1],[x1,z1]]){positions.push(x,sandHeight(x,z),z);uvs.push((x+444)/1014,(z-154)/91);}indices.push(n,n+2,n+1,n+1,n+2,n+3);}
 const groundGeometry=new THREE.BufferGeometry();groundGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));groundGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));groundGeometry.setIndex(indices);groundGeometry.computeVertexNormals();const land=mesh(groundGeometry,sand,0,0,0);land.name='Beach sand with flush carnival opening';
 // Road connection across the former boundary to the promenade.
 const access=createBoardwalkAccess(root,{roadMaterial,roadCenters});
 // A single instanced deck spans the interior faces of both perimeter walls.
 const boardwalkBounds={minX:-443.1,maxX:569.1,minZ:181,maxZ:191,y:.215};
 const boardwalkFurniture=createBoardwalkFurniture(root);
 const oceanSystem=createRealisticOcean(root),offshoreSharks=createOffshoreSharks(root);
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
 const allBeachSeats=[...lounges.map(l=>l.seat),...boardwalkFurniture.seats];
 return {root,offshoreSharks,access,blocksVehicle:access.blocksVehicle,sandMaterial:sand,boardwalkBounds,lounges,palms,boardwalkFurniture,nearestSeat(x,z,max=2.5){let best=null,d=max;for(const seat of allBeachSeats){if(seat.npcOccupant)continue;const distance=Math.hypot(x-seat.x,z-seat.z);if(distance<d){best=seat;d=distance;}}return best;},blocks(x,z){return access.blocks(x,z)||boardwalkFurniture.blocks(x,z)||lounges.some(l=>l.blocks(x,z))||palms.some(p=>Math.hypot(x-p.x,z-p.z)<.48);},ocean:oceanSystem,heightAt(x,z){
  // Match the visible planks (.19 centre + .025 half thickness), not sea level.
  if(x>=boardwalkBounds.minX&&x<=boardwalkBounds.maxX&&z>=181&&z<=191)return .215;
  const roadY=access.heightAt(x,z);if(roadY!==null)return roadY;
  if(x>=-444&&x<=570&&z>=154&&z<=245)return sandHeight(x,z);
  return null;
 },update(dt){advanceCoastalBreeze(dt);oceanSystem.update(dt);offshoreSharks.update(oceanSystem.time);},bounds:{minX:-165,maxX:165,minZ:168,maxZ:248},center:{x:0,z:212}};
}
