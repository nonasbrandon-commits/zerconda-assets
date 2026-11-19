import {createShowroomVehicle} from './showroom-vehicles.js?v=20261119-showroom-v124';
import {addShowroomSales} from './showroom-sales.js?v=20261119-showroom-v124';
import {GROUND_LEVEL} from './ground-level.js?v=20261119-level-ground-v117';
import * as THREE from 'three';
import {createDetailedCar} from './detailed-fictional-cars.js?v=20261117-commerce-restore-v69';
import {createNaturalShrub} from './realistic-landscape-assets.js?v=20261117-commerce-restore-v69';
// Zerconda Motors: two detailed display cars and staffed sales consultation desks.
export function createDealership(scene,{x=-31,z=-48,rotation=0,getPlayer=()=>null}={}){
 const root=new THREE.Group();root.position.set(x,0,z);root.rotation.y=rotation;root.name='Zerconda Motors - walk-in dealership';root.userData.customInterior=true;scene.add(root);
 const cosine=Math.cos(rotation),sine=Math.sin(rotation);
 const world=(px,pz)=>({x:x+px*cosine+pz*sine,z:z-px*sine+pz*cosine});
 const local=(px,pz)=>({x:(px-x)*cosine-(pz-z)*sine,z:(px-x)*sine+(pz-z)*cosine});
 const mat=(color,roughness=.65,metalness=.05)=>new THREE.MeshStandardMaterial({color,roughness,metalness,side:THREE.DoubleSide});
 const steel=mat(0x273746,.34,.62),silver=mat(0xb4c3cd,.28,.6),floor=mat(0x929da3,.33,.14),glass=new THREE.MeshPhysicalMaterial({color:0x8ac5e2,roughness:.075,metalness:.06,transparent:true,opacity:.64,depthWrite:false,side:THREE.DoubleSide,clearcoat:1}),white=mat(0xf1f4f5),dark=mat(0x182733),wood=mat(0x82614b);
 const cube=new THREE.BoxGeometry(1,1,1);
 function box(parent,w,h,d,px,py,pz,m){const o=new THREE.Mesh(cube,m);o.position.set(px,py,pz);o.scale.set(w,h,d);o.receiveShadow=true;parent.add(o);return o;}
 // 30m frontage x 23m depth. The front faces EAST toward the cafe and tower.
 box(root,24,.25,28,0,-.1,0,floor);box(root,24,.28,28,0,8.8,0,dark);
 box(root,.32,8.7,28,-12,4.35,0,white);
 for(const zz of [-14,14])box(root,24,8.7,.3,0,4.35,zz,white);
 // Glass curtain wall with aluminum mullions and dark facade cladding.
 for(const zz of [-14,-10.5,-7,-3.5,0,3.5,7,10.5,14])box(root,.22,6.2,.14,12.12,3.15,zz,steel);
 for(const yy of [1.2,3.5,5.8])box(root,.22,.13,28,12.12,yy,0,silver);
 box(root,.4,2.35,28,12.14,7.62,0,dark);
 box(root,.17,.12,28,12.39,6.36,0,new THREE.MeshBasicMaterial({color:0x138eea}));
 // Transparent front glazing with a 4.8m-wide unobstructed pedestrian entry.
 for(const zz of [-10.5,-7,-3.5,3.5,7,10.5]){
  box(root,.1,5.8,3.3,11.95,3.1,zz,glass);
  box(root,.18,8.3,.12,12,4.2,zz+1.7,steel);
 }
 box(root,.28,8.5,2.1,12,4.25,-12.9,steel);box(root,.28,8.5,2.1,12,4.25,12.9,steel);
 box(root,.35,.25,28,12,8.45,0,steel);
 // Glass entrance doors with metal framing.
 for(const zz of [-1,1]){box(root,.09,3.35,1.4,12,1.75,zz*.75,glass);box(root,.14,3.45,.08,12.15,1.75,zz*1.5,steel);box(root,.2,.65,.09,12.2,1.55,zz*.22,silver);}
 // Entrance threshold, planters, and canopy.
 box(root,3.3,.14,5,13.1,.04,0,white);
 box(root,3.4,.25,8,12.5,7.7,0,steel);
 for(const zz of [-12.2,12.2]){box(root,1.1,1,1.1,13,.5,zz,wood);
  const p=createNaturalShrub({width:1.05,height:1.4,seed:83+Math.round(zz*3)});p.position.set(13,.8,zz);root.add(p);}
 // Architectural facade upgrade: layered graphite cladding, bright storefront,
 // illuminated brand fascia and metal details, all real 3D scene geometry.
 const fascia=mat(0x17252e,.27,.62),reveal=mat(0x0a151b,.38,.5);
 const blueGlow=new THREE.MeshBasicMaterial({color:0x21a9f7});
 // The west side previously appeared as a huge featureless white wall.
 box(root,.09,7.7,27.6,-12.24,4.4,0,fascia);
 for(const zz of [-12,-8,-4,0,4,8,12]){
  box(root,.16,7.7,.10,-12.36,4.4,zz,silver);
 }
 for(const yy of [1.3,4.6,7.8]){
  box(root,.16,.10,27.5,-12.37,yy,0,reveal);
 }
 // Full-height corner columns and a deep roof parapet create a readable silhouette.
 for(const zz of [-13.8,13.8]){
  box(root,.85,9.6,.85,12.25,4.8,zz,fascia);
  box(root,.12,8.5,.16,12.76,4.25,zz,blueGlow);
 }
 box(root,.72,3.6,29.6,12.35,9.8,0,fascia);
 box(root,.12,.10,29.4,12.82,7.99,0,blueGlow);
 box(root,.12,.10,29.4,12.82,11.61,0,silver);
 // Raised canopy with thin luminous front edge.
 box(root,3.8,.34,10,13.35,7.42,0,fascia);
 box(root,.12,.09,10,15.29,7.29,0,blueGlow);
 // One opaque sign face sits ahead of every fascia rail, with generous margins.
 const brandCanvas=document.createElement('canvas');brandCanvas.width=2304;brandCanvas.height=288;
 const brandCtx=brandCanvas.getContext('2d');brandCtx.fillStyle='#10232d';brandCtx.fillRect(0,0,2304,288);
 brandCtx.textAlign='center';brandCtx.textBaseline='middle';brandCtx.fillStyle='#f7fafb';
 let fontSize=180;do{brandCtx.font='bold '+fontSize+'px Arial';if(brandCtx.measureText('ZERCONDA MOTORS').width<=2060)break;fontSize-=2;}while(fontSize>100);
 brandCtx.fillText('ZERCONDA MOTORS',1152,105);
 brandCtx.fillStyle='#67d3ff';brandCtx.font='bold 70px Arial';brandCtx.fillText('AUTO CENTER',1152,232);
 const brandTex=new THREE.CanvasTexture(brandCanvas);brandTex.colorSpace=THREE.SRGBColorSpace;brandTex.anisotropy=8;
 const brandPanel=new THREE.Mesh(new THREE.PlaneGeometry(25,3.125),new THREE.MeshBasicMaterial({map:brandTex,side:THREE.FrontSide,toneMapped:false}));
 brandPanel.name='Zerconda Motors · clear illuminated sign';brandPanel.rotation.y=Math.PI/2;brandPanel.position.set(13.02,9.8,0);root.add(brandPanel);
 // Vertical glass bays and mullion trim add depth to the transparent frontage.
 for(const zz of [-11,-7.5,-4,4,7.5,11]){
  box(root,.09,5.7,3.3,12.04,3.05,zz,glass);
  box(root,.17,5.9,.09,12.21,3.05,zz+1.65,silver);
 }
 for(const yy of [1.2,3.4,5.85])box(root,.12,.07,27.5,12.28,yy,0,silver);
 // Exterior concrete pavers and planters are authored as scene meshes.
 const paver=mat(0xb5b8b3,.93),planterDark=mat(0x343d3c,.78),leaf=mat(0x3d784c,.88);
 for(let k=0;k<10;k++){
  box(root,4.4,.035,2.2,15.8,.012,-12.1+k*2.7,paver);
 }
 for(const zz of [-11,11]){
  box(root,1.8,.8,1.8,16.1,.4,zz,planterDark);
  const plant=createNaturalShrub({width:1.55,height:1.35,seed:300+Math.round(zz*5)});
  plant.position.set(16.1,.8,zz);root.add(plant);
 }
 // Two full-sized premium display cars; the central entry aisle remains open.
 const cars=[],displaySolids=[];
 for(const [name,type,color,z]of[['Zerconda Vela GT','coupe','#8d1631',-6.5],['Zerconda Atlas Touring','suv','#547584',6.5]]){
 const vehicle=createShowroomVehicle({type,color});vehicle.position.set(1,.08,z);vehicle.rotation.y=-Math.PI/2;root.add(vehicle);
 const podium=new THREE.Mesh(new THREE.CylinderGeometry(3.25,3.25,.08,64),mat(0xaeb2b1,.32,.2));podium.position.set(1,.04,z);podium.name=name+' display plinth';root.add(podium);
 cars.push({name,position:world(1,z),model:vehicle});displaySolids.push({x:1,z,w:5.2,d:2.3});
 const placard=box(root,.08,.70,1.0,4.1,.66,z,steel);const cv=document.createElement('canvas');cv.width=768;cv.height=320;const c=cv.getContext('2d');c.fillStyle='#1e3541';c.fillRect(0,0,768,320);c.fillStyle='#f2eadc';c.textAlign='center';c.font='bold 50px Arial';c.fillText(name,384,110,710);c.fillStyle='#8ccbd8';c.font='32px Arial';c.fillText(type==='coupe'?'GRAND TOURING COUPE':'PREMIUM CROSSOVER',384,190);c.font='25px Arial';c.fillText('Speak with a sales consultant',384,260);const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;const face=new THREE.Mesh(new THREE.PlaneGeometry(1.45,.60),new THREE.MeshBasicMaterial({map:tex}));face.rotation.y=Math.PI/2;face.position.set(4.15,.70,z);root.add(face);}
 const sales=addShowroomSales(root);
 // Reception, lounge, illuminated ceiling fixtures, offices and showroom plants.
 for(const zz of [-9,0,9]){const light=new THREE.PointLight(0xf1f6ff,2.1,14);light.position.set(0,7.8,zz);root.add(light);box(root,1.6,.08,5.4,0,8.25,zz,new THREE.MeshBasicMaterial({color:0xe8f5ff}));}
 // Level stone forecourt with painted parking bays and landscape islands.
 const asphalt=mat(0xb8b9b3,.85),stripe=mat(0xe8e7df,.8),curb=mat(0xbfc4c3,.9);
 const pavingCanvas=document.createElement('canvas');pavingCanvas.width=pavingCanvas.height=256;const pc=pavingCanvas.getContext('2d');pc.fillStyle='#b9bab3';pc.fillRect(0,0,256,256);pc.strokeStyle='#888c8680';pc.lineWidth=2;pc.strokeRect(0,0,256,256);pc.beginPath();pc.moveTo(128,0);pc.lineTo(128,256);pc.stroke();const pt=new THREE.CanvasTexture(pavingCanvas);pt.colorSpace=THREE.SRGBColorSpace;pt.wrapS=pt.wrapT=THREE.RepeatWrapping;pt.repeat.set(5,14);asphalt.map=pt;asphalt.polygonOffset=true;asphalt.polygonOffsetFactor=-1;asphalt.polygonOffsetUnits=-2;
 const forecourt=box(root,10.5,.09,28,18.75,GROUND_LEVEL-.045,0,asphalt);forecourt.name='Zerconda Motors · level stone parking';
 stripe.polygonOffset=true;stripe.polygonOffsetFactor=-2;stripe.polygonOffsetUnits=-4;
 for(const zz of [-11,-5.5,0,5.5,11])box(root,7,.004,.11,19,GROUND_LEVEL+.003,zz,stripe);
 box(root,.8,.26,28,24,GROUND_LEVEL-.13,0,curb);
 for(const zz of [-12,12]){
  box(root,2.4,.4,2.4,23.5,.2,zz,curb);
  const bush=createNaturalShrub({width:1.8,height:1.65,seed:500+Math.round(zz*4)});bush.position.set(23.5,.4,zz);root.add(bush);
  box(root,.2,7,.2,23,3.5,zz,steel);box(root,1.7,.2,.8,23,7.1,zz,new THREE.MeshBasicMaterial({color:0xfff2db}));
 }
 function displayCar(px,pz,color,type='sedan'){const g=createDetailedCar({color,type});g.position.set(px,.02,pz);root.add(g);}
 displayCar(19,-7,0x9d2433);displayCar(19,7,0x34597a,'suv');
 // Exterior road-facing banner.
 const banner=box(root,.2,4.5,1.5,15,2.35,12.7,steel);
 const entrance=world(14,0),insidePoint=world(9,0),exitPoint=world(16,0);
 return {root,x,z,cars,sales,entrance,insidePoint,exitPoint,
 update(dt){const p=getPlayer();sales.update(dt,!!p&&Math.hypot(p.x-x,p.z-z)<55);},
 isNear(px,pz,r=4.5){return Math.hypot(px-entrance.x,pz-entrance.z)<r;},
 blocks(px,pz){const p=local(px,pz);return Math.abs(p.z)<14.5&&p.x>-12.5&&p.x<12.6;},
 inside(px,pz){const p=local(px,pz);return p.x>-11.4&&p.x<11.7&&Math.abs(p.z)<13.6&&![...displaySolids,...sales.solids].some(s=>Math.abs(p.x-s.x)<s.w/2+.28&&Math.abs(p.z-s.z)<s.d/2+.28);},
 nearestCar(px,pz,max=4.5){let best=null,d=max;for(const c of cars){const dist=Math.hypot(px-c.position.x,pz-c.position.z);if(dist<d){d=dist;best=c;}}return best;}};
}

