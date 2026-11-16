import * as THREE from 'three';
import {createDetailedCar} from './detailed-fictional-cars.js';
// Zerconda Motors: original interactive 3D showroom with three fictional unbranded cars.
export function createDealership(scene,{x=-62,z=-48}={}){
 const root=new THREE.Group();root.position.set(x,0,z);root.name='Zerconda Motors - walk-in dealership';scene.add(root);
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
  const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.85,2),mat(0x347747));p.position.set(13,1.5,zz);root.add(p);}
 // Realistic dealership sign as authored image asset loaded from GitHub.
 const sign=new THREE.Mesh(new THREE.PlaneGeometry(19,3.4),new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}));
 sign.position.set(12.22,7.15,0);sign.rotation.y=Math.PI/2;root.add(sign);
 const url='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/dealership/zerconda-auto-center-sign.svg';
 new THREE.TextureLoader().load(url,t=>{t.colorSpace=THREE.SRGBColorSpace;sign.material.map=t;sign.material.needsUpdate=true;},undefined,()=>{sign.material.color.set(0x0b314f);});
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
 box(root,.72,1.65,29.6,12.35,8.95,0,fascia);
 box(root,.12,.10,29.4,12.82,7.99,0,blueGlow);
 box(root,.12,.10,29.4,12.82,9.65,0,silver);
 // Raised canopy with thin luminous front edge.
 box(root,3.8,.34,10,13.35,7.42,0,fascia);
 box(root,.12,.09,10,15.29,7.29,0,blueGlow);
 // Lit sign as a procedural canvas texture: no remote image or SVG loader dependency.
 const brandCanvas=document.createElement('canvas');brandCanvas.width=2048;brandCanvas.height=512;
 const brandCtx=brandCanvas.getContext('2d');
 brandCtx.fillStyle='#15252e';brandCtx.fillRect(0,0,2048,512);
 brandCtx.textAlign='center';brandCtx.fillStyle='#f7fafb';
 brandCtx.font='bold 170px Arial';brandCtx.fillText('ZERCONDA MOTORS',1024,245);
 brandCtx.fillStyle='#42baff';brandCtx.font='bold 91px Arial';brandCtx.fillText('AUTO CENTER',1024,375);
 const brandTex=new THREE.CanvasTexture(brandCanvas);brandTex.colorSpace=THREE.SRGBColorSpace;brandTex.anisotropy=8;
 // Facade faces +X: text plane normal is rotated to point out toward the street.
 const brandPanel=new THREE.Mesh(new THREE.PlaneGeometry(20,4.2),new THREE.MeshBasicMaterial({map:brandTex,side:THREE.DoubleSide,depthTest:true}));
 brandPanel.rotation.y=Math.PI/2;brandPanel.position.set(12.84,8.78,0);root.add(brandPanel);
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
  const plant=new THREE.Mesh(new THREE.IcosahedronGeometry(1.05,2),leaf);
  plant.position.set(16.1,1.65,zz);root.add(plant);
 }
 // Three cars, each a distinctly styled fictional model (no real logos).
 const cars=[];const worldZ=z;
 function car({name,color,z,type='sedan'}){
  const vehicle=createDetailedCar({color,type});vehicle.position.set(-2.5,.12,z);vehicle.rotation.y=-Math.PI/2;root.add(vehicle);
  const podium=new THREE.Mesh(new THREE.CylinderGeometry(3.15,3.15,.12,64),mat(0x939da3,.35,.25));podium.position.set(-2.5,.03,z);root.add(podium);
  const placard=box(root,1.7,.72,.11,2.5,.74,z,steel);
  cars.push({name,position:{x:x-2.5,z:worldZ+z}});
 }
 car({name:'Zerconda City Sedan',color:0xbec6cc,z:-8,type:'sedan'});
 car({name:'Zerconda Sport Coupe',color:0x155f9f,z:0,type:'coupe'});
 car({name:'Zerconda Touring SUV',color:0x9b2733,z:8,type:'suv'});
 // Reception, lounge, illuminated ceiling fixtures, offices and showroom plants.
 box(root,5,1.15,1.6,-8, .6,0,wood);box(root,5.4,.16,1.85,-8,1.25,0,white);
 for(const zz of [-10,10]){box(root,2.6,.65,1.25,-8,.45,zz,mat(0x526779));box(root,2.6,.7,.24,-8,.96,zz-.65,mat(0x526779));box(root,1.4,.38,1.1,-5.2,.4,zz,wood);}
 for(const zz of [-9,0,9]){const light=new THREE.PointLight(0xf1f6ff,2.1,14);light.position.set(0,7.8,zz);root.add(light);box(root,1.6,.08,5.4,0,8.25,zz,new THREE.MeshBasicMaterial({color:0xe8f5ff}));}
 // Asphalt forecourt with parking bays, concrete curbs, lighting and landscape islands.
 const asphalt=mat(0x353b40,.95),stripe=mat(0xe8e7df,.8),curb=mat(0xbfc4c3,.9);
 box(root,10.5,.09,28,18.75,-.12,0,asphalt);
 for(const zz of [-11,-5.5,0,5.5,11])box(root,7,.014,.11,19,.01,zz,stripe);
 box(root,.8,.26,28,24,.03,0,curb);
 for(const zz of [-12,12]){
  box(root,2.4,.4,2.4,23.5,.2,zz,curb);
  const bush=new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),mat(0x3c754a));bush.position.set(23.5,1.35,zz);root.add(bush);
  box(root,.2,7,.2,23,3.5,zz,steel);box(root,1.7,.2,.8,23,7.1,zz,new THREE.MeshBasicMaterial({color:0xfff2db}));
 }
 function displayCar(px,pz,color,type='sedan'){const g=createDetailedCar({color,type});g.position.set(px,.02,pz);root.add(g);}
 displayCar(19,-7,0x9d2433);displayCar(19,7,0x34597a,'suv');
 // Exterior road-facing banner.
 const banner=box(root,.2,4.5,1.5,15,2.35,12.7,steel);
 return {root,x,z,cars,entrance:{x:x+14,z},isNear(px,pz,r=4.5){return Math.hypot(px-(x+14),pz-z)<r;},inside(px,pz){return px>x-11.4&&px<x+11.7&&Math.abs(pz-z)<13.6},nearestCar(px,pz,max=4.5){let best=null,d=max;for(const c of cars){const dist=Math.hypot(px-c.position.x,pz-c.position.z);if(dist<d){d=dist;best=c;}}return best;}};
}
