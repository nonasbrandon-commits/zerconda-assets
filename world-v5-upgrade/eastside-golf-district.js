import {addGolfGroves} from './golf-landscaping.js?v=20261118-pedestrian-footing-v94';
import * as THREE from 'three';
import {trimGolfGround} from './golf-road-clearance.js?v=20261117-ground-golf-v86';
import {createNineHoleGolf} from './nine-hole-golf.js?v=20261118-pedestrian-footing-v94';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Zerconda Eastside: residential approach and compact nine-hole public golf course.
// Located about three 96m blocks east of the Needle at (48,-48).
export function createEastsideGolfDistrict(scene,{x=425,z=-48,getPlayer}={}){
 const root=new THREE.Group();root.name='Zerconda Nine-Hole Golf Club';scene.add(root);
 const mat=(color,roughness=.94)=>new THREE.MeshStandardMaterial({color,roughness});
 const assetBase='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/pbr/';
 const textureLoader=new THREE.TextureLoader();
 function pbrGround(folder,repeat,tint){
  const prefix=assetBase+folder+'/'+folder+'_1K-JPG_';
  function load(suffix,srgb=false){const t=textureLoader.load(prefix+suffix+'.jpg',undefined,undefined,()=>{});t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.anisotropy=8;if(srgb)t.colorSpace=THREE.SRGBColorSpace;return t;}
  return new THREE.MeshStandardMaterial({color:tint,map:load('Color',true),normalMap:load('NormalGL'),roughnessMap:load('Roughness'),roughness:1});
 }
 const grass=pbrGround('Ground037',18,0x83a876),fairway=pbrGround('Ground037',16,0x91b77d),rough=pbrGround('Ground037',19,0x68865d),green=pbrGround('Ground037',12,0xa3c78b),sand=pbrGround('Ground037',12,0xe3d1a7);
 const road=mat(0x41484b),walk=mat(0xb8b5a7),brick=mat(0x9c6452),brick2=mat(0xb48a70);
 const glass=new THREE.MeshPhysicalMaterial({color:0x6b9db2,roughness:.19,metalness:.24,transparent:true,opacity:.83});
 const trim=mat(0xd9d0bf),roof=mat(0x39464b),wood=mat(0x80664d),bark=mat(0x70503a);
 const treeInstances=[];
 const leaf=[0x3e6f39,0x4e8640,0x648d49,0x2f6339].map(c=>mat(c));
 const water=new THREE.MeshPhysicalMaterial({color:0x248c98,metalness:.1,roughness:.16,clearcoat:1});
 const flag=[mat(0xe5e6e4),mat(0xd44432),mat(0x306ca2)];
 const boxGeo=new THREE.BoxGeometry(1,1,1);
 function box(parent,x,y,z,w,h,d,m){const mesh=new THREE.Mesh(boxGeo,m);mesh.position.set(x,y,z);mesh.scale.set(w,h,d);mesh.castShadow=h>1;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 function oval(parent,x,z,rx,rz,m,y=.07){const mesh=new THREE.Mesh(new THREE.CircleGeometry(1,48),m);mesh.rotation.x=-Math.PI/2;mesh.scale.set(rx,rz,1);mesh.position.set(x,y,z);mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 function tree(parent,x,z,scale=1,seed=0){
  // Check world coordinates, including trees parented to house/course groups.
  parent.updateWorldMatrix(true,false);
  const location=parent.localToWorld(new THREE.Vector3(x,0,z));
  if([-96,0,96].some(c=>Math.abs(location.x-c)<18||Math.abs(location.z-c)<18))return;
  if(location.x>180&&location.x<282&&location.z>106&&location.z<184)return;
  const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(scale);parent.add(g);treeInstances.push({g,seed});
  // No cartoon placeholder crown. Model is loaded below; failed loads leave an empty planting location instead of lollipop trees.
 }
 // Steel truss pedestrian crossing with vehicle clearance and grounded access ramps.
 const bridge=new THREE.Group();bridge.name='Eastside steel pedestrian bridge';bridge.userData.roadInfrastructure=true;root.add(bridge);
 const steel=mat(0x334954,.48),concrete=mat(0x929d9f,.9),deck=mat(0xb7bbb8,.82),glassRail=mat(0x748e99,.48);
 const bx=290,roadZ=0,deckY=10.5,width=4.4,span=38;
 // More than 9.9m of clear height above the boulevard; supports stay beyond sidewalks.
 box(bridge,bx,deckY,roadZ,width,.32,span,deck);
 for(const edge of [-1,1]){
  const xx=bx+edge*(width/2-.1);
  box(bridge,xx,deckY+.13,roadZ,.23,.22,span,steel);
  for(let j=0;j<=16;j++){
   const zz=roadZ-span/2+j*span/16;
   box(bridge,xx,deckY+1.1,zz,.09,2.0,.1,steel);
  }
  for(const h of [.5,1.2,2.1])box(bridge,xx,deckY+h,roadZ,.10,.10,span,steel);
  // Diagonal steel braces form visible, realistic bridge trusses.
  for(let j=0;j<16;j++){
   const zz=roadZ-span/2+(j+.5)*span/16;
   const brace=new THREE.Mesh(new THREE.BoxGeometry(.11,2.3,.12),steel);
   brace.position.set(xx,deckY+1.15,zz);
   brace.rotation.x=(j%2?1:-1)*.64;bridge.add(brace);
  }
 }
 // Four columns land beyond the traffic envelope and sidewalk.
 for(const zz of [roadZ-span/2-1.4,roadZ+span/2+1.4])
  for(const xx of [bx-width/2+.3,bx+width/2-.3]){
   box(bridge,xx,deckY/2,zz,.65,deckY,.65,concrete);
   box(bridge,xx,.28,zz,1.5,.56,1.5,concrete);
  }
 // Short, steeper approaches turn alongside the road instead of reaching
 // across the neighboring city streets. The deck meets both ramps at full height.
 const rampLength=25,landingY=.24,rise=deckY-landingY;
 const angle=Math.atan2(rise,rampLength),rampDeckLength=Math.hypot(rampLength,rise);
 for(const side of [-1,1]){
  const rampZ=roadZ+side*(span/2-width/2);
  const rampStartX=bx+width/2,centerX=rampStartX+rampLength/2;
  const ramp=new THREE.Group();ramp.position.set(centerX,(deckY+landingY)/2,rampZ);
  ramp.rotation.z=-angle;bridge.add(ramp);
  box(ramp,0,0,0,rampDeckLength,.3,width,deck);
  for(const edge of [-1,1]){
   const zz=edge*(width/2-.1);
   for(const h of [.55,1.15])box(ramp,0,h,zz,rampDeckLength,.12,.12,steel);
   for(let j=0;j<=12;j++)box(ramp,j*rampDeckLength/12-rampDeckLength/2,.58,zz,.12,1.2,.12,steel);
  }
  box(bridge,rampStartX+rampLength+2,.12,rampZ,4,.24,width+.8,concrete);
 }
 // All land in the eastern reserve belongs to one connected nine-hole course.
 const course=new THREE.Group();course.position.set(x,0,z);root.add(course);
 const layout=createNineHoleGolf(course,{origin:{x,z},materials:{rough,fairway,green,sand,walk},tree,getPlayer});
 const groves=addGolfGroves(course,{origin:{x,z},holes:layout.holes,pathCurves:layout.pathCurves});
 // Swap placeholder foliage for real modeled leafy trees stored in Zerconda assets.
 const treeUrl='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/trees-and-vehicles/trees/leafy-island-tree.glb';
 new GLTFLoader().load(treeUrl,gltf=>{
  const original=gltf.scene,bb=new THREE.Box3().setFromObject(original),sz=bb.getSize(new THREE.Vector3());
  if(sz.y<.01)return;
  for(const {g,seed} of treeInstances){
   g.clear();const model=original.clone(true),scale=(8.5+(seed%4)*1.6)/sz.y;
   model.scale.setScalar(scale);model.position.set(-bb.getCenter(new THREE.Vector3()).x*scale,-bb.min.y*scale,-bb.getCenter(new THREE.Vector3()).z*scale);
   model.rotation.y=seed*1.67;
   model.position.set(0,0,0);model.updateMatrixWorld(true);
   const rotatedBounds=new THREE.Box3().setFromObject(model),center=rotatedBounds.getCenter(new THREE.Vector3());
   model.position.set(-center.x,-rotatedBounds.min.y,-center.z);
   model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});g.add(model);
  }
  console.info('ZERCONDA: golf district loaded actual GLB trees',treeInstances.length);
 },undefined,e=>console.warn('Golf GLB tree unavailable; fallback retained',e));
 // Four-seat resort-style carts: sculpted body, windscreen, canopy, seatbacks, golf bags and wheels.
 const movingCarts=[];
 for(const [cx,cz,angle] of [[-118,-115,.1],[-109,-115,-.25],[104,-103,.7]]){
 const cart=new THREE.Group();cart.name='Automated golf cart '+(movingCarts.length+1);cart.position.set(cx,.15,cz);cart.rotation.y=angle;course.add(cart);
  movingCarts.push({cart,distance:movingCarts.length*layout.routeLength/3,speed:2.2+movingCarts.length*.2});
  const body=mat(0xecece5,.42),dark=mat(0x20272b,.62),seat=mat(0xbcb6a7,.82),chrome=mat(0xb0b7b9,.25);
  box(cart,0,.64,0,2.08,.5,3.35,body);
  box(cart,0,.98,-1.13,2,.36,1.04,body);
  box(cart,0,.98,.45,2,.18,1.65,dark);
  box(cart,0,1.21,.28,1.86,.18,1.12,seat);
  box(cart,0,1.58,.76,1.86,.67,.16,seat);
  box(cart,0,2.35,0,2.35,.13,3.65,body);
  for(const xx of [-.99,.99])for(const zz of [-1.25,1.25]){
   box(cart,xx,1.69,zz,.065,1.34,.065,chrome);
   const tire=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.23,20),dark);
   tire.rotation.z=Math.PI/2;tire.position.set(xx*1.07,.44,zz);cart.add(tire);
   const hub=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.245,20),chrome);
   hub.rotation.z=Math.PI/2;hub.position.copy(tire.position);cart.add(hub);
  }
  const windshield=new THREE.Mesh(new THREE.PlaneGeometry(1.95,.98),new THREE.MeshPhysicalMaterial({color:0xb8d9df,transparent:true,opacity:.34,roughness:.12,side:THREE.DoubleSide}));
  windshield.position.set(0,1.77,-1.1);cart.add(windshield);
  const steering=new THREE.Mesh(new THREE.TorusGeometry(.27,.038,8,20),dark);steering.position.set(-.48,1.48,-.91);steering.rotation.x=.55;cart.add(steering);
  // Seated driver gives the moving carts a clear sense of scale and purpose.
  const driverSkin=mat(0xb98864),polo=mat(0x365a70),trousers=mat(0xc1ae88);
  box(cart,-.48,1.47,-.13,.38,.55,.27,polo);
  const driverHead=new THREE.Mesh(new THREE.SphereGeometry(.145,16,12),driverSkin);driverHead.scale.y=1.17;driverHead.position.set(-.48,1.91,-.17);cart.add(driverHead);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.08,16),dark);cap.position.set(-.48,2.06,-.17);cart.add(cap);
  for(const side of [-1,1]){box(cart,-.48+side*.11,1.12,-.35,.16,.18,.48,trousers);box(cart,-.48+side*.23,1.49,-.47,.12,.12,.46,polo);}
  for(const xx of [-.38,.38]){
   const bag=new THREE.Mesh(new THREE.CylinderGeometry(.24,.19,1.02,12),dark);
   bag.position.set(xx,1.31,1.63);bag.rotation.x=-.16;cart.add(bag);
   for(let k=0;k<3;k++)box(cart,xx+(k-1)*.08,2.02,1.65,.04,.5,.04,chrome);
  }
 }
 // Clubhouse: covered entrance, glazing, porch, terrace and sign.
 const club=new THREE.Group();club.name='Zerconda Golf Clubhouse';club.position.set(-65,0,193);course.add(club);
 box(club,0,3.3,0,25,6.6,14,brick);
 box(club,0,6.9,0,26,.6,15,roof);
 box(club,0,2.1,7.1,4,4.1,.2,glass);
 for(const dx of [-9,-5,5,9])box(club,dx,2.7,7.1,2.6,3,.15,glass);
 box(club,0,.14,10,23,.2,6,walk);
 for(const dx of [-10,10])box(club,dx,2.5,10,.24,5,.24,trim);
 box(club,0,5,10,23,.3,5,roof);
 // Sign is a generated texture so text is legible from the road.
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=180;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#173b34';ctx.fillRect(0,0,1024,180);
 ctx.fillStyle='#f7f1d9';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 74px Arial';ctx.fillText('ZERCONDA GOLF CLUB',512,90);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const sign=new THREE.Mesh(new THREE.PlaneGeometry(15,2.65),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));
 sign.position.set(0,5.1,7.28);club.add(sign);
 // Carts follow the center of the same visible stone route used between holes.
 function update(dt){
  layout.update(dt);
  for(const state of movingCarts){
   state.distance=(state.distance+state.speed*dt)%layout.routeLength;
   const t=state.distance/layout.routeLength,p=layout.cartCurve.getPointAt(t),direction=layout.cartCurve.getTangentAt(t);
   state.cart.position.set(p.x,.07,p.z);state.cart.rotation.y=Math.atan2(-direction.x,-direction.z);
  }
 }
 return {root,clubhouse:club,movingCarts,center:{x,z},holes:9,residentialBuildings:0,layout,groves,heightAt:layout.heightAt,bounds:{minX:240,maxX:556,minZ:-265,maxZ:166},update};
}


