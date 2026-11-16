import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// ZERCONDA V5 — COMPLETE REPLACEMENT SCENE, NOT A PATCH.
// Keep existing index.html importmap and <script type="module" src="./world.js">.
// Does not call any old tree/lamp/car spawn loops.
const BASE='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/';
const PATH={
 tree:'realistic-assets/trees-and-vehicles/trees/leafy-small-tree.glb',
 tree2:'realistic-assets/trees-and-vehicles/trees/leafy-island-tree.glb',
 sedan:'realistic-assets/trees-and-vehicles/vehicles/starter-graphite-sedan.glb',
 white:'realistic-assets/trees-and-vehicles/vehicles/starter-white-sedan.glb',
 sport:'realistic-assets/trees-and-vehicles/vehicles/sports-supercar.glb',
 lamp:'realistic-assets/expanded-models/street-lamp/street_lamp_01_1k.gltf',
 bench:'realistic-assets/plaza-assets/plaza-bench/painted_wooden_bench_1k.gltf',
 planter:'realistic-assets/plaza-assets/planter/planter_box_01_1k.gltf',
 statue:'realistic-assets/plaza-assets/statue/marble_bust_01_1k.gltf',
 flower:'realistic-assets/plaza-assets/flowering-plant/flower_empodium_1k.gltf'
};
const status=document.getElementById('status');
const scene=new THREE.Scene();scene.background=new THREE.Color(0xaacbdf);
scene.fog=new THREE.Fog(0xaacbdf,190,390);
const camera=new THREE.PerspectiveCamera(66,innerWidth/innerHeight,.1,600);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xe6f4ff,0x737569,2.1));
const sun=new THREE.DirectionalLight(0xffefdc,3.1);sun.position.set(-70,135,85);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-160;sun.shadow.camera.right=160;
sun.shadow.camera.top=160;sun.shadow.camera.bottom=-160;sun.shadow.normalBias=.045;scene.add(sun);
const M=(color,roughness=.86,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
const asphalt=M(0x363b3d),paving=M(0xb6b3ab),curb=M(0xd7d2c8),grass=M(0x71865c);
const lane=M(0xeae5d7),yellow=M(0xc4ad62),dark=M(0x252a2d),stone=M(0xc4bcae);
const bronze=M(0x6b5c48,.38,.62),wood=M(0x6a4a31),windowMat=M(0x28434f,.23,.38);
const glass=M(0x31576a,.15,.35),doorMat=M(0x473e38,.48,.25);
const geo=new THREE.BoxGeometry(1,1,1);
function box(w,h,d,x,y,z,material,parent=scene){
 const o=new THREE.Mesh(geo,material);o.scale.set(w,h,d);o.position.set(x,y,z);
 o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;
}
function cylinder(rt,rb,h,x,y,z,material,parent=scene,n=48){
 const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),material);
 o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;
}
let seed=2451;function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
const roadLines=[-96,0,96],ROAD_HALF=9.5,SIDEWALK_EDGE=14;
const nearRoad=(x,z,margin=0)=>roadLines.some(v=>Math.abs(x-v)<ROAD_HALF+margin||Math.abs(z-v)<ROAD_HALF+margin);
const inIntersection=(x,z,margin=0)=>roadLines.some(a=>Math.abs(x-a)<ROAD_HALF+margin)&&roadLines.some(b=>Math.abs(z-b)<ROAD_HALF+margin);
const buildings=[],doors=[],trees=[],lamps=[],cars=[],loaded={};
const plazaCenter={x:48,z:48},plazaRadius=24;
const inPlaza=(x,z,extra=0)=>Math.hypot(x-plazaCenter.x,z-plazaCenter.z)<plazaRadius+extra;
const insideBuilding=(x,z,pad=0)=>buildings.some(b=>Math.abs(x-b.x)<b.w/2+pad&&Math.abs(z-b.z)<b.d/2+pad);

// Entire city road/sidewalk grid. Roads are continuous; sidewalks NEVER cross lanes.
box(350,.12,350,0,-.16,0,grass);
for(const c of roadLines){
 box(19,.12,350,c,-.04,0,asphalt);
 box(350,.12,19,0,-.035,c,asphalt);
 for(const s of [-1,1]){
  box(4,.24,350,c+s*11.5,.025,0,paving);
  box(350,.24,4,0,.025,c+s*11.5,paving);
  box(.22,.25,350,c+s*9.65,.02,0,curb);
  box(350,.25,.22,0,.02,c+s*9.65,curb);
 }
 for(let p=-166;p<=166;p+=12){
  if(!roadLines.some(k=>Math.abs(p-k)<15)){
   box(.14,.014,5,c,.035,p,lane);
   box(5,.014,.14,p,.038,c,lane);
  }
 }
}
// Pedestrian crossing stripes at intersections, inside road only.
for(const x of roadLines)for(const z of roadLines){
 for(let i=-4;i<=4;i++){
  box(1.1,.02,2.6,x+i*1.8,.048,z-7.4,lane);
  box(2.6,.02,1.1,x-7.4,.049,z+i*1.8,lane);
 }
}

// Facade texture generator: architectural materials, varied stonework,
// window frames, lintels, sills, masonry joints and shopfronts.
function facadeTexture(base,trimColor,glassColor,cols=5,floors=5){
 const cv=document.createElement('canvas');cv.width=1024;cv.height=1024;
 const ctx=cv.getContext('2d');ctx.fillStyle=base;ctx.fillRect(0,0,1024,1024);
 const fw=1024/cols,fh=1024/floors;
 for(let f=0;f<floors;f++){
  const y=f*fh;
  ctx.fillStyle=trimColor;ctx.globalAlpha=.3;ctx.fillRect(0,y,1024,7);ctx.globalAlpha=1;
  for(let c=0;c<cols;c++){
   const x=c*fw;
   ctx.strokeStyle='rgba(35,35,35,.18)';ctx.lineWidth=2;
   for(let j=0;j<4;j++)ctx.strokeRect(x+j*fw/4,y,fw/4,fh);
   const ww=fw*.56,wh=fh*.62,wx=x+(fw-ww)/2,wy=y+fh*.17;
   ctx.fillStyle=trimColor;ctx.fillRect(wx-7,wy-9,ww+14,wh+18);
   ctx.fillStyle=glassColor;ctx.fillRect(wx,wy,ww,wh);
   ctx.fillStyle='rgba(190,216,225,.12)';ctx.fillRect(wx+ww*.12,wy,ww*.19,wh);
   ctx.fillStyle=trimColor;ctx.fillRect(wx+ww*.48,wy,5,wh);
   ctx.fillRect(wx,wy+wh*.54,ww,4);
   ctx.fillRect(wx-14,wy+wh+5,ww+28,11);
   ctx.fillRect(wx-9,wy-12,ww+18,8);
  }
 }
 const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;
 return t;
}
const palettes=[
 ['#9c806c','#e3d4bf','#1c3846'],
 ['#b9b4a6','#e9e0ce','#1c3443'],
 ['#8e7567','#c9a98a','#253f4b'],
 ['#b1b4b0','#e3e5df','#294552'],
 ['#a06f5e','#d5a98f','#203b49']
];
const facadeMats=palettes.map(([a,b,c],i)=>new THREE.MeshStandardMaterial({
 map:facadeTexture(a,b,c,5,6),roughness:.93
}));
const roof=M(0x34373a),metal=M(0x565c5e,.42,.55);
function makeBuilding(x,z,w,d,h,type){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 const facade=facadeMats[type%facadeMats.length];
 // Textured front/back and side walls with complete solid mass.
 box(w,h,d,0,h/2,0,facade,g);
 // Contrasting ground-floor stone base, pilasters and cornice.
 box(w+.15,3.3,d+.15,0,1.65,0,stone,g);
 box(w+.5,.38,d+.5,0,3.35,0,metal,g);
 box(w+.65,.55,d+.65,0,h+.28,0,stone,g);
 box(w+.2,.35,d+.2,0,h+.72,0,roof,g);
 // Rooftop HVAC and mechanical screening.
 for(let i=0;i<2;i++){
  box(2.3,1.1,2.5,-w*.23+i*w*.45,h+1.45,-d*.15,metal,g);
 }
 // Storefront bays at street level on front elevation.
 const bays=Math.max(2,Math.floor(w/5));
 for(let i=0;i<bays;i++){
  const px=-w/2+(i+.5)*w/bays;
  box(w/bays*.73,2.35,.11,px,1.68,d/2+.13,glass,g);
  box(w/bays*.82,.27,.23,px,2.95,d/2+.22,metal,g);
  box(.15,2.65,.28,px-w/bays*.4,1.65,d/2+.24,stone,g);
 }
 // Ground-level front entrance with paired moving door leaves.
 // Visible opening is a dark inset vestibule. For actual indoor access,
 // wall geometry must be rebuilt into separated segments.
 box(3.1,3.05,.23,0,1.53,d/2+.23,dark,g);
 box(3.3,.28,.5,0,3.05,d/2+.36,stone,g);
 for(const s of [-1,1]){
  const hinge=new THREE.Group();
  hinge.position.set(x+s*1.42,0,z+d/2+.41);
  const panel=box(1.37,2.7,.09,-s*.685,1.37,0,doorMat,hinge);
  box(.07,.16,.08,-s*1.12,1.3,.09,bronze,hinge);
  scene.add(hinge);doors.push({hinge,x,z:z+d/2+.41,side:s,open:0});
 }
 // Entrance canopy and sconces.
 box(4.3,.22,1.2,0,3.25,d/2+.65,metal,g);
 for(const s of [-1,1])cylinder(.12,.12,.48,s*2.2,2.5,d/2+.3,bronze,g,12);
 // Realistic architectural window rows on side elevation.
 const floors=Math.floor((h-4)/3.2);
 for(let f=0;f<floors;f++)for(const side of [-1,1]){
  for(let i=0;i<Math.max(2,Math.floor(d/4.3));i++){
   const count=Math.max(2,Math.floor(d/4.3));
   const zz=-d/2+(i+.5)*d/count;
   box(.09,1.75,1.45,side*(w/2+.08),5+f*3.2,zz,windowMat,g);
   box(.2,.14,1.78,side*(w/2+.16),4.04+f*3.2,zz,stone,g);
  }
 }
 buildings.push({x,z,w,d,h});
}
const blocks=[
 [-48,-48],[48,-48],[-48,48],[48,48],
 [-144,-48],[144,-48],[-48,144],[48,144],
 [-144,48],[144,48],[-48,-144],[48,-144]
];
for(let k=0;k<blocks.length;k++){
 const [bx,bz]=blocks[k];
 if(bx===48&&bz===48)continue; // Central fountain park: no buildings.
 if(Math.abs(bx)>100||Math.abs(bz)>100)continue; // avoid outside-city half blocks
 for(const [i,j] of [[-1,-1],[1,-1],[-1,1],[1,1]]){
  const x=bx+i*17,z=bz+j*17;
  makeBuilding(x,z,24,23,18+Math.floor(rand()*5)*3.2,k+Math.round(rand()*4));
 }
}

// Center fountain plaza at (48,48), fully inside a 96x96 city block.
box(56,.16,56,48,.035,48,paving);
const fountain=new THREE.Group();fountain.position.set(48,0,48);scene.add(fountain);
cylinder(9.7,9.9,.8,0,.54,0,stone,fountain);
cylinder(9.2,9.2,.17,0,1.02,0,curb,fountain);
const water=new THREE.MeshPhysicalMaterial({color:0x3c9ab2,metalness:.08,roughness:.11,
 transparent:true,opacity:.86,clearcoat:1,clearcoatRoughness:.07,side:THREE.DoubleSide});
cylinder(8.8,8.8,.045,0,1.13,0,water,fountain);
cylinder(1.65,2.2,2.7,0,2.53,0,stone,fountain);
cylinder(4.35,4.55,.48,0,4.08,0,curb,fountain);
cylinder(4.1,4.1,.05,0,4.37,0,water,fountain);
cylinder(.75,1.12,2.1,0,5.32,0,stone,fountain);
cylinder(2.1,2.25,.35,0,6.52,0,curb,fountain);
cylinder(1.9,1.9,.05,0,6.73,0,water,fountain);
cylinder(.18,.25,.65,0,7.13,0,bronze,fountain);
const jetMaterial=new THREE.MeshPhysicalMaterial({color:0xb3efff,transparent:true,opacity:.55,
 depthWrite:false,roughness:.08});
const jets=[];
for(let i=0;i<16;i++){
 const a=i*Math.PI*2/16,r=7.5;
 const pts=[];for(let j=0;j<=20;j++){
  const t=j/20;pts.push(new THREE.Vector3(Math.cos(a)*r*(1-t*.42),
  1.3+Math.sin(t*Math.PI)*2.2,Math.sin(a)*r*(1-t*.42)));
 }
 const m=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),32,.047,6),jetMaterial);
 fountain.add(m);jets.push(m);
}
// Fountain plaza seats and decorative planters; model upgrades loaded below.
for(let i=0;i<8;i++){
 const a=i*Math.PI/4,r=19.4,x=48+Math.cos(a)*r,z=48+Math.sin(a)*r;
 const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=-a+Math.PI/2;scene.add(g);
 box(2.5,.16,.7,0,.65,0,wood,g);box(2.5,.8,.13,0,1.03,-.38,wood,g);
 for(const dx of [-.95,.95])box(.12,.65,.55,dx,.33,0,bronze,g);
}
for(let i=0;i<8;i++){
 const a=(i+.5)*Math.PI/4,r=23,x=48+Math.cos(a)*r,z=48+Math.sin(a)*r;
 cylinder(.92,1.12,.7,x,.38,z,stone);
 const shrub=new THREE.Mesh(new THREE.IcosahedronGeometry(.83,2),M(0x3f6940));
 shrub.position.set(x,1.08,z);shrub.castShadow=true;scene.add(shrub);
}

// Trees are only placed in designated landscape strips on blocks.
// NEVER on road, parking lanes, intersections, or inside fountain plaza.
const treeSpots=[];
for(const [bx,bz] of blocks){
 if(Math.abs(bx)>100||Math.abs(bz)>100)continue;
 for(const [dx,dz] of [[-29,-29],[29,-29],[-29,29],[29,29]]){
  const x=bx+dx,z=bz+dz;
  if(nearRoad(x,z,4)||insideBuilding(x,z,4)||inPlaza(x,z,4))continue;
  treeSpots.push([x,z]);
 }
}
// Streetlights placed in 4m sidewalks (offset 11.5 from road centers).
// Avoid crossings/intersections and keep at least 3m from tree trunks.
const lampSpots=[];
for(const c of roadLines){
 for(let p=-144;p<=144;p+=32){
  if(roadLines.some(v=>Math.abs(p-v)<22))continue;
  for(const side of [-1,1]){
   const a=[c+side*11.5,p],b=[p,c+side*11.5];
   for(const [x,z] of [a,b]){
    if(nearRoad(x,z,.6)||inPlaza(x,z,3)||insideBuilding(x,z,2))continue;
    if(treeSpots.some(([tx,tz])=>Math.hypot(x-tx,z-tz)<4))continue;
    if(lampSpots.some(([lx,lz])=>Math.hypot(x-lx,z-lz)<8))continue;
    lampSpots.push([x,z]);
   }
  }
 }
}
// Parking bays in straight road segments, 20m away from intersections.
const parking=[];
for(const c of roadLines)for(const p of [-143,-118,-73,-48,48,73,118,143]){
 for(const s of [-1,1]){
  const x=c+s*6.6,z=p;
  if(Math.abs(x)>155||Math.abs(z)>155||inIntersection(x,z,12))continue;
  if(parking.some(q=>Math.hypot(x-q[0],z-q[1])<10))continue;
  parking.push([x,z,0]);
 }
}
const loader=new GLTFLoader();
function load(key){
 return new Promise((resolve,reject)=>loader.load(BASE+PATH[key],g=>resolve(g.scene),undefined,reject));
}
function cloneNormalized(source,x,z,targetHeight,angle=0){
 const g=source.clone(true),bounds=new THREE.Box3().setFromObject(g);
 const size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
 if(size.y<.0001)return null;
 const s=targetHeight/size.y;
 g.scale.setScalar(s);
 g.position.set(x-center.x*s,-bounds.min.y*s,z-center.z*s);
 g.rotation.y=angle;
 g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
 scene.add(g);return g;
}
async function populate(){
 const keys=Object.keys(PATH);
 const result=await Promise.allSettled(keys.map(load));
 result.forEach((r,i)=>{if(r.status==='fulfilled')loaded[keys[i]]=r.value;});
 for(let i=0;i<treeSpots.length;i++){
  const [x,z]=treeSpots[i],src=loaded[i%2?'tree2':'tree']||loaded.tree||loaded.tree2;
  if(src)cloneNormalized(src,x,z,7+rand()*2.5,rand()*6.28);
 }
 for(const [x,z] of lampSpots){
  if(loaded.lamp)cloneNormalized(loaded.lamp,x,z,4.4);
  else {cylinder(.09,.12,4.3,x,2.15,z,dark,scene,12);
    box(.5,.55,.5,x,4.6,z,stone);}
 }
 const carModels=['sedan','white','sport','sedan','white'];
 for(let i=0;i<Math.min(carModels.length,parking.length);i++){
  const [x,z,angle]=parking[i],src=loaded[carModels[i]];
  if(!src)continue;
  const g=cloneNormalized(src,x,z,1.55,angle);
  if(g)cars.push({group:g,x,z,angle,speed:0});
 }
 // Real imported plaza decorations; do not put models inside fountain.
 const decor=[
  ['statue',48,70,2.2],['planter',32,48,1.2],
  ['planter',64,48,1.2],['flower',48,24,1.1]
 ];
 for(const [key,x,z,height] of decor)if(loaded[key])cloneNormalized(loaded[key],x,z,height);
 if(loaded.bench)for(const [x,z] of [[32,36],[64,36],[32,60],[64,60]]){
  cloneNormalized(loaded.bench,x,z,1.05);
 }
 if(status)status.textContent='Loaded '+Object.keys(loaded).length+'/'+keys.length+' model types · Fountain plaza at (48,48)';
}
populate();
const keys=new Set(),player={x:48,z:15},clock=new THREE.Clock();
let activeCar=null,yaw=0,pitch=.1,drag=false,lastX=0,lastY=0;
addEventListener('keydown',e=>{keys.add(e.code);if(e.code==='KeyE'&&!e.repeat)toggleCar();
 if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();});
addEventListener('keyup',e=>keys.delete(e.code));
for(const b of document.querySelectorAll('[data-key]')){
 const key=b.dataset.key;b.addEventListener('pointerdown',e=>{
 e.preventDefault();keys.add(key);b.setPointerCapture(e.pointerId);});
 for(const evt of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(evt,()=>keys.delete(key));
}
const enter=document.getElementById('enter');if(enter)enter.onclick=toggleCar;
function toggleCar(){
 if(activeCar){player.x=activeCar.x+3;player.z=activeCar.z;activeCar=null;return;}
 let closest=null,best=5;
 for(const c of cars){const d=Math.hypot(c.x-player.x,c.z-player.z);
  if(d<best){best=d;closest=c;}}
 if(closest)activeCar=closest;
}
renderer.domElement.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;});
addEventListener('pointerup',()=>drag=false);
addEventListener('pointermove',e=>{if(!drag)return;yaw-=(e.clientX-lastX)*.003;
 pitch=THREE.MathUtils.clamp(pitch+(e.clientY-lastY)*.0025,-.35,.65);
 lastX=e.clientX;lastY=e.clientY;});
function walkable(x,z){
 if(Math.abs(x)>168||Math.abs(z)>168)return false;
 if(insideBuilding(x,z,1.2))return false;
 if(Math.hypot(x-48,z-48)<10.8)return false; // fountain basin
 return true;
}
let elapsed=0;
function animate(){
 requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);elapsed+=dt;
 const f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
 const side=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));
 if(activeCar){
  const c=activeCar;c.speed=THREE.MathUtils.damp(c.speed,f*11,2.6,dt);
  c.angle-=side*dt*(.5+Math.abs(c.speed)*.035);
  const nx=c.x+Math.sin(c.angle)*c.speed*dt,nz=c.z+Math.cos(c.angle)*c.speed*dt;
  if(walkable(nx,nz)){
   c.group.position.x+=nx-c.x;c.group.position.z+=nz-c.z;c.x=nx;c.z=nz;
  }else c.speed=0;
  c.group.rotation.y=c.angle;player.x=c.x;player.z=c.z;yaw=c.angle;
 }else{
  const len=Math.hypot(f,side)||1,step=(keys.has('ShiftLeft')?9:5)*dt;
  const dx=(Math.sin(yaw)*f+Math.cos(yaw)*side)/len*step;
  const dz=(Math.cos(yaw)*f-Math.sin(yaw)*side)/len*step;
  if(walkable(player.x+dx,player.z))player.x+=dx;
  if(walkable(player.x,player.z+dz))player.z+=dz;
 }
 for(const d of doors){
  const near=Math.hypot(player.x-d.x,player.z-d.z)<3.4;
  d.open=THREE.MathUtils.damp(d.open,near?1:0,4,dt);
  d.hinge.rotation.y=d.side*d.open*1.22;
 }
 jetMaterial.opacity=.48+.09*Math.sin(elapsed*2);
 const dist=activeCar?9:5,eye=activeCar?3.4:2.1;
 const target=new THREE.Vector3(player.x,eye,player.z);
 const desired=new THREE.Vector3(player.x-Math.sin(yaw)*dist,
 eye+2+pitch*dist,player.z-Math.cos(yaw)*dist);
 camera.position.lerp(desired,Math.min(1,dt*8));camera.lookAt(target);
 renderer.render(scene,camera);
}
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;
 camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
