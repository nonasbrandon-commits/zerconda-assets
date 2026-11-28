import {createBeachSeagulls} from './beach-seagulls.js?v=471';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {createOffshoreSharks} from './offshore-sharks.js?v=20261120-coastal-v166';
import {createBoardwalkAccess} from './boardwalk-access.js?v=20261123-waterfront-v271';
import {createBoardwalkFurniture} from './boardwalk-furniture.js?v=20261123-waterfront-v271';
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
 // The road approaches own their footprint: no sand surface is left beneath
 // them to win a depth-offset fight at shallow camera angles.
 const centers=roadCenters||[-418,-96,0,96],parts=[],cuts=[...new Set([-444,-443.1,-7,7,188,227,235,274,569.1,570,...centers.flatMap(x=>[x-9.5,x+9.5]).filter(x=>x>-444&&x<570)])].sort((a,b)=>a-b);
 for(let i=1;i<cuts.length;i++)for(const[a,b]of[[154,174],[174,181],[181,190.5],[190.5,191],[191,194],[194,220],[220,245]]){const x=(cuts[i-1]+cuts[i])/2,z=(a+b)/2;const paved=x>=-7&&x<=7&&z>=190.5&&z<220||z<181&&centers.some(c=>Math.abs(x-c)<9.5)||x>=188&&x<=274&&z<174||x>=227&&x<=235&&z>=174&&z<181||x>=-443.1&&x<=569.1&&z>=181&&z<191;if(paved)continue;const geo=new THREE.PlaneGeometry(cuts[i]-cuts[i-1],b-a);geo.rotateX(-Math.PI/2);geo.translate(x,.085,z);const p=geo.attributes.position,u=geo.attributes.uv;for(let j=0;j<p.count;j++)u.setXY(j,(p.getX(j)+444)/1014,(245-p.getZ(j))/91);parts.push(geo);}const land=mesh(mergeGeometries(parts),sand,0,0,0);land.name='Beach sand clear of waterfront roads';parts.forEach(g=>g.dispose());

 // Road connection across the former boundary to the promenade.
 const access=createBoardwalkAccess(root,{roadMaterial,roadCenters});
 // A single instanced deck spans the interior faces of both perimeter walls.
 const boardwalkBounds={minX:-443.1,maxX:569.1,minZ:181,maxZ:191,y:.095};
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
 const westBeachSets=[];
 for(const [i,x] of [-332,-310,-288,-266,-244,-222,-200,-178].entries()){
  for(const z of [202,220]){const lounge=createBeachLounge3D(root,{x,y:.085,z,index:40+i});lounges.push(lounge);westBeachSets.push(lounge);}
  palms.push(createReferenceBeachPalm(root,{x:x-6,y:.085,z:198,height:8.2+(i%3)*.6}));
  if(i%2===0)palms.push(createReferenceBeachPalm(root,{x:x+7,y:.085,z:229,height:8.8}));
 }
 const eastBeachSets=[],eastPalmSites=[];
 for(const [i,x]of [178,200,222,244,266,288,310,332,354].entries()){
  for(const z of[202,220]){const lounge=createBeachLounge3D(root,{x,y:.085,z,index:70+i});lounges.push(lounge);eastBeachSets.push(lounge);}
  for(const z of i%2===0?[198,230]:[198]){const p={x:x+(z===198?-6:7),z};palms.push(createReferenceBeachPalm(root,{...p,y:.085,height:8.3+(i%3)*.55}));eastPalmSites.push(p);}
 }
 const seagulls=createBeachSeagulls(root,{palms});
 const allBeachSeats=[...lounges.map(l=>l.seat),...boardwalkFurniture.seats];
 return {root,seagulls,eastBeachSets,eastPalmSites,seats:allBeachSeats,westBeachSets,offshoreSharks,access,blocksVehicle:access.blocksVehicle,sandMaterial:sand,boardwalkBounds,lounges,palms,boardwalkFurniture,nearestSeat(x,z,max=2.5){let best=null,d=max;for(const seat of allBeachSeats){if(seat.npcOccupant)continue;const distance=Math.hypot(x-seat.x,z-seat.z);if(distance<d){best=seat;d=distance;}}return best;},blocks(x,z){return access.blocks(x,z)||boardwalkFurniture.blocks(x,z)||lounges.some(l=>l.blocks(x,z))||palms.some(p=>Math.hypot(x-p.x,z-p.z)<.48);},ocean:oceanSystem,heightAt(x,z){
  // Match the visible planks (.19 centre + .025 half thickness), not sea level.
  if(x>=boardwalkBounds.minX&&x<=boardwalkBounds.maxX&&z>=181&&z<=191)return .095;
  const roadY=access.heightAt(x,z);if(roadY!==null)return roadY;
  if(x>=-444&&x<=570&&z>=154&&z<=245)return .085;
  return null;
 },update(dt){seagulls.update(dt);advanceCoastalBreeze(dt);oceanSystem.update(dt);offshoreSharks.update(oceanSystem.time);},bounds:{minX:-165,maxX:165,minZ:168,maxZ:248},center:{x:0,z:212}};
}
