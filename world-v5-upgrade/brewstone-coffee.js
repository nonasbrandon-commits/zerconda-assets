import {GROUND_LEVEL} from './ground-level.js?v=20261119-level-ground-v117';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Zerconda original cafe set across the north street from Observation Needle.
// Seats are local interactions; multiplayer presence needs a shared realtime server.
export function createCoffeeShop(scene,{x=-28,z=-132,getPlayer=()=>null}={}){
 const root=new THREE.Group();root.name='Brewstone Coffee - 3D furnished cafe';root.position.set(x,GROUND_LEVEL,z);root.userData.customInterior=true;scene.add(root);
 const mat=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const brick=mat(0xa5755e,.92),plaster=mat(0xe6ded0,.92),floor=mat(0xb8aa93,.8),wood=mat(0x76503b,.65),
  black=mat(0x28343a,.35,.4),glass=new THREE.MeshPhysicalMaterial({color:0xb1d5dc,roughness:.12,metalness:.1,transparent:true,opacity:.24,side:THREE.DoubleSide,depthWrite:false}),
  fabric=mat(0x466e69,.95),metal=mat(0x9aa6a6,.32,.7);
 // Existing photographic brickwork makes the recovered exterior consistent with the upgraded patio.
 const brickLoader=new THREE.TextureLoader();
 const brickTexture=brickLoader.load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/expanded-models/brick-building/textures/modular_factory_facade_brick_diff_1k.jpg');
 brickTexture.colorSpace=THREE.SRGBColorSpace;brickTexture.wrapS=brickTexture.wrapT=THREE.RepeatWrapping;brickTexture.repeat.set(3,1);brick.map=brickTexture;
 const cube=new THREE.BoxGeometry(1,1,1);
 function box(x,y,z,w,h,d,m){const o=new THREE.Mesh(cube,m);o.position.set(x,y,z);o.scale.set(w,h,d);o.receiveShadow=true;root.add(o);return o;}
 function cyl(x,y,z,r,h,m){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),m);o.position.set(x,y,z);root.add(o);return o;}
 // Open cafe, 24x18 meters. South-facing glazed entrance faces tower.
 box(0,-.12,0,24,.24,18,floor);
 box(0,3.2,-9,24,6.4,.35,brick);
 for(const sx of [-1,1])box(sx*12,3.2,0,.35,6.4,18,brick);
 box(0,6.45,0,24.7,.38,18.7,black);
 // Continuous floor-to-ceiling glass across the complete frontage.
 for(const side of [-1,1])box(side*6.45,3.12,9,10.9,6.20,.08,glass);
 for(const xx of [-11.95,-8,-4,-1,1,4,8,11.95])box(xx,3.12,9.08,.09,6.24,.12,black);
 box(0,4.28,9,1.9,3.96,.08,glass);box(0,6.24,9.08,24,.10,.12,black);
 box(0,2.29,9.10,2.0,.10,.14,black);
 // Human-scale automatic doors: two 0.9m leaves, 2.2m high.
 const doors=[];let doorGap=0;
 for(const side of [-1,1]){const door=new THREE.Group();door.name='Brewstone center door';door.position.set(side*.46,0,9.14);root.add(door);
 const part=(w,h,d,px,py,pz,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(px,py,pz);door.add(o);return o;};
 part(.90,2.20,.065,0,1.10,0,glass);for(const px of [-.44,.44])part(.035,2.23,.09,px,1.115,.015,metal);for(const yy of [.025,2.205])part(.90,.035,.09,0,yy,.015,metal);part(.025,.42,.035,-side*.26,1.05,.085,black);doors.push({door,side});}
 // Cafe counter, espresso bar and shelves.
 box(0,1.05,-6.5,14,2.1,1.8,wood);box(0,2.16,-6.5,14.4,.2,2,metal);
 for(const xx of [-4,0,4]){box(xx,3.65,-8.7,2.6,.16,.55,wood);box(xx,4.75,-8.7,2.6,.16,.55,wood);}
 for(const xx of [-3,-2.4,2.5,3.2])cyl(xx,2.55,-6.4,.22,.55,black);
 // Full-width stone terrace extends from the glazing to both adjoining sidewalks.
 const terraceCanvas=document.createElement('canvas');terraceCanvas.width=terraceCanvas.height=256;const tc=terraceCanvas.getContext('2d');tc.fillStyle='#c7c4b9';tc.fillRect(0,0,256,256);let stoneSeed=91;const stoneRand=()=>{stoneSeed=(Math.imul(stoneSeed,1664525)+1013904223)>>>0;return stoneSeed/4294967296;};for(let i=0;i<6000;i++){tc.fillStyle=i%2?'#ffffff16':'#554f4610';tc.fillRect(stoneRand()*256,stoneRand()*256,1.5,1.5);}tc.strokeStyle='#8e8b803f';tc.lineWidth=1.4;tc.strokeRect(0,0,256,256);tc.beginPath();tc.moveTo(128,0);tc.lineTo(128,256);tc.moveTo(0,128);tc.lineTo(256,128);tc.stroke();
 const terraceTex=new THREE.CanvasTexture(terraceCanvas);terraceTex.colorSpace=THREE.SRGBColorSpace;terraceTex.wrapS=terraceTex.wrapT=THREE.RepeatWrapping;terraceTex.repeat.set(13.5,6.5);terraceTex.anisotropy=8;const terraceMat=mat(0xffffff,.85);terraceMat.map=terraceTex;terraceMat.polygonOffset=true;terraceMat.polygonOffsetFactor=-1;terraceMat.polygonOffsetUnits=-2;
 const terrace=box(.5,-.06,15.5,27,.12,13,terraceMat);terrace.name='Brewstone Coffee · full stone terrace';

 const seats=[],solids=[{x:0,z:-6.5,w:14.4,d:2}];
 // Higher-detail patio furniture: metal frames, wood slat seats, curved chair backs,
 // tapered table pedestals, and individual leaf clusters instead of green spheres.
 const furnitureFrame=mat(0x292f31,.35,.68),oak=mat(0xa17b55,.72),cushion=mat(0x3e6b64,.95);
 function chair(px,pz,a){
  const g=new THREE.Group();g.position.set(px,0,pz);g.rotation.y=a;root.add(g);
  const add=(geo,m,x,y,z)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;};
  const rail=new THREE.CylinderGeometry(.027,.027,1,8);
  for(const sx of [-.32,.32])for(const sz of [-.29,.29]){
   const leg=add(rail,furnitureFrame,sx,.25,sz);leg.scale.y=.5;
  }
  for(let k=0;k<5;k++)add(new THREE.BoxGeometry(.62,.035,.105),oak,0,.51,-.25+k*.125);
  for(const sx of [-.33,.33]){
   const back=add(new THREE.CylinderGeometry(.03,.03,.78,8),furnitureFrame,sx,.88,-.33);back.rotation.x=-.16;
   add(new THREE.BoxGeometry(.035,.035,.58),furnitureFrame,sx,.69,-.02);
  }
  for(let k=0;k<4;k++)add(new THREE.BoxGeometry(.62,.105,.035),k%2?oak:cushion,0,.77+k*.15,-.37-k*.025);
  seats.push({x:x+px,z:z+pz,facing:a,sitHeight:GROUND_LEVEL+.51,occupied:false});solids.push({x:px,z:pz,w:.78,d:.86});
 }
 function table(tx,tz,rot=0){
  solids.push({x:tx,z:tz,w:1.6,d:1.6});
  // Thin beveled-looking round top, inset edge, flared base, and center support.
  const top=cyl(tx,.78,tz,.76,.085,oak);top.castShadow=true;
  cyl(tx,.71,tz,.70,.04,furnitureFrame);
  cyl(tx,.40,tz,.058,.66,furnitureFrame);
  const base=new THREE.Mesh(new THREE.CylinderGeometry(.12,.44,.08,16),furnitureFrame);
  base.position.set(tx,.085,tz);root.add(base);
  for(let j=0;j<4;j++){
   const a=j*Math.PI/2+rot,px=tx+Math.cos(a)*1.57,pz=tz+Math.sin(a)*1.57;
   chair(px,pz,a+Math.PI);
  }
 }
 for(const [tx,tz] of [[-7,1],[7,1],[-7,5],[7,5],[-7,14],[7,14]])table(tx,tz);
 const shrubContainers=[];
 const foliage=[mat(0x315d38,.96),mat(0x427b44,.96),mat(0x538b4b,.96),mat(0x668b43,.96)];
 function shrub(px,pz,seed=0){
  solids.push({x:px,z:pz,w:1.45,d:1.45});
  // Raised stone planter with dark soil, branching stems and layered leaf geometry.
  box(px,.05,pz,1.45,.10,1.45,plaster);
  for(const side of [-1,1]){box(px+side*.68,.38,pz,.09,.56,1.45,plaster);box(px,.38,pz+side*.68,1.27,.56,.09,plaster);}
  box(px,.60,pz,1.25,.04,1.25,mat(0x493d31,.99));
  const shrubRoot=new THREE.Group();shrubRoot.position.set(px,.62,pz);root.add(shrubRoot);shrubContainers.push(shrubRoot);
  const stem=mat(0x4d4932,.98);
  const rand=(n)=>{const t=Math.sin(n*78.233+seed*43.19)*43758.5453;return t-Math.floor(t);};
  for(let i=0;i<12;i++){
   const angle=i*2.399963,dist=.06+rand(i+2)*.22;
   const height=.42+rand(i+10)*.28;
   const stalk=new THREE.Mesh(new THREE.CylinderGeometry(.014,.025,height,5),stem);
   stalk.position.set(Math.cos(angle)*dist*.55,height*.5,Math.sin(angle)*dist*.55);
   stalk.rotation.z=Math.sin(angle)*.22;shrubRoot.add(stalk);
   for(let j=0;j<3;j++){
    const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(.10+rand(i*4+j)*.035,1),foliage[(i+j+seed)%foliage.length]);
    leaf.scale.set(.8,.4,1.35);
    leaf.position.set(Math.cos(angle)*dist+(j-1)*.09,height*(.55+j*.2),Math.sin(angle)*dist);
    leaf.rotation.y=angle+j*.6;leaf.castShadow=true;shrubRoot.add(leaf);
   }
  }
 }
 for(const px of [-10,10])for(const pz of [11,17])shrub(px,pz,Math.round(px+pz+20));
 // Load a real, textured botanical GLTF already stored in this GitHub repository.
 // The procedural leaf cluster is only the fallback if the asset request fails.
 const plantUrl='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/expanded-models/foliage/nettle_plant_1k.gltf';
 new GLTFLoader().load(plantUrl,gltf=>{
  // The source scene is a six-plant nursery lineup, not one centered shrub.
  // Fit individual specimens to the soil bed instead of cloning the whole lineup.
  const variants=gltf.scene.children.filter(node=>node.isMesh||node.children.length);
  if(!variants.length)return;
  shrubContainers.forEach((holder,i)=>{
   holder.clear();holder.name='Contained coffee patio planting';
   for(const [j,offset]of [[-.28,-.20],[.28,-.20],[0,.25]].entries()){
    const plant=variants[(i+j*2)%variants.length].clone(true);plant.position.set(0,0,0);plant.rotation.y=i*1.3+j*2.4;plant.scale.setScalar(1);plant.updateMatrixWorld(true);
    const bb=new THREE.Box3().setFromObject(plant),size=bb.getSize(new THREE.Vector3()),center=bb.getCenter(new THREE.Vector3()),scale=Math.min((.70+(j%2)*.10)/Math.max(size.y,.001),.49/Math.max(size.x,.001),.49/Math.max(size.z,.001));
    plant.scale.setScalar(scale);plant.position.set(offset[0]-center.x*scale,-bb.min.y*scale,offset[1]-center.z*scale);
    plant.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});holder.add(plant);
   }
   holder.userData.plantingReady=true;
  });
   console.info('ZERCONDA: textured botanical GLTF loaded at Brewstone Coffee');
 },undefined,e=>console.warn('Botanical GLTF failed; detailed leaf fallback retained',e));
 // Legible front fascia: fit full name within the available width and keep roof above it.
 const cv=document.createElement('canvas');cv.width=2304;cv.height=144;
 const ctx=cv.getContext('2d');ctx.fillStyle='#223432';ctx.fillRect(0,0,2304,144);
 ctx.fillStyle='#f6e7c8';ctx.textAlign='center';ctx.textBaseline='middle';
 let fontSize=128;do{ctx.font='bold '+fontSize+'px Arial';fontSize-=4;}while(ctx.measureText('BREWSTONE COFFEE').width>2140&&fontSize>50);
 ctx.fillText('BREWSTONE COFFEE',1152,72);
 const signTex=new THREE.CanvasTexture(cv);signTex.colorSpace=THREE.SRGBColorSpace;signTex.anisotropy=8;
 const sign=new THREE.Mesh(new THREE.PlaneGeometry(22,1.375),new THREE.MeshBasicMaterial({map:signTex,side:THREE.DoubleSide,depthTest:true}));
 // Front-facing plane sits outside the facade and below the roof edge.
 box(0,7.15,9.10,24,1.55,.28,black);sign.name='Brewstone Coffee · raised sign';sign.position.set(0,7.15,9.30);root.add(sign);
 for(const xx of [-9,-3,3,9]){
  const light=new THREE.PointLight(0xffd6a1,.8,6);light.position.set(xx,4.8,1);root.add(light);
 }
 function canWalk(px,pz){const lx=px-x,lz=pz-z;if(Math.abs(lx)>12.4||lz< -9.4||lz>18)return null;
 if(lz<9.4){if(Math.abs(lx)>11.6||lz< -8.6)return false;if(lz>8.6&&Math.abs(lx)>.70)return false;}
 return !solids.some(s=>Math.abs(lx-s.x)<s.w/2+.26&&Math.abs(lz-s.z)<s.d/2+.26);}
 return {root,seats,shrubContainers,doors,solids,canWalk,update(dt){const p=getPlayer();const near=p&&Math.hypot(p.x-x,p.z-z-9)<3.8;doorGap=THREE.MathUtils.damp(doorGap,near?1:0,10,dt);for(const{door,side}of doors)door.position.x=side*(.46+doorGap*.94);},entrance:{x,z:z+11},isInside:(px,pz)=>Math.abs(px-x)<11.8&&Math.abs(pz-z)<8.8,
 nearestSeat(px,pz,max=2.1){let best=null,dist=max;for(const seat of seats){const d=Math.hypot(seat.x-px,seat.z-pz);if(d<dist){dist=d;best=seat;}}return best;},
 dispose(){scene.remove(root);}};
}

