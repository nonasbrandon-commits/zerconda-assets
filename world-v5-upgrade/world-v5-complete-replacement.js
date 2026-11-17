import * as THREE from 'three';
import {createZercondaAvatar} from './zerconda-avatar-upgrade.js?v=20261117-walk-cycle-v52';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {installRealisticFountain} from './realistic-fountain.js';
import {createObservationNeedle} from './observation-needle.js';
import {createCloudSky} from './cloud-sky.js';
import {addCityDepth} from './city-depth-assets.js?v=20261117-building-setback-v54';
import {addBuildingIdentity} from './nine-building-styles.js';
import {createCoffeeShop} from './brewstone-coffee.js';
import {createApartmentExperience} from './apartment-interiors.js';
import {createUniversalInteriors} from './universal-furnished-interiors.js?v=20261117-interiors-v1';
// Dealership loads separately so a failed asset cannot blank the entire city.
import {addPremiumPlazaFurniture} from './premium-plaza-furniture.js';
import {addAirDancers} from './air-dancers.js';
import {createZercondaBeach} from './zerconda-beach.js?v=20261117-water-to-wall-v50';
import {createCityMap} from './top-city-map.js?v=20261117-open-beach-v18';
import {addSignatureArchitecture} from './signature-apartment-buildings.js?v=20261117-window-rebuild-3';
import {addWaterfrontHomes} from './waterfront-ocean-view-homes.js';
import {createOwnableHomes} from './ownable-suburban-homes.js?v=20261117-road-clearance-v53';
import {createPedestrians} from './animated-pedestrians.js';
import {createEastsideGolfDistrict} from './eastside-golf-district.js?v=20261117-syntax-repair-v35';
import {createNeedleSportsPark} from './needle-sports-park.js?v=20261117-koi-water-v16';

// ZERCONDA V5 — COMPLETE REPLACEMENT SCENE, NOT A PATCH.
const ZERCONDA_BUILD='2026-11-17-road-footprint-guard-v55';
document.documentElement.dataset.zercondaBuild=ZERCONDA_BUILD;
console.info('ZERCONDA BUILD',ZERCONDA_BUILD);
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
const scene=new THREE.Scene();scene.background=new THREE.Color(0x8eb7d3);
const cloudSky=createCloudSky(scene,{count:38});
scene.fog=new THREE.FogExp2(0xa9c8dc,.0009);
const camera=new THREE.PerspectiveCamera(66,innerWidth/innerHeight,.1,600);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
// Temporarily disable costly shadow maps while diagnosing blank WebGL output.
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xe6f4ff,0x737569,2.1));
const sun=new THREE.DirectionalLight(0xffefdc,3.1);sun.position.set(-70,135,85);sun.castShadow=true;
sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-160;sun.shadow.camera.right=160;
sun.shadow.camera.top=160;sun.shadow.camera.bottom=-160;sun.shadow.normalBias=.045;scene.add(sun);
const M=(color,roughness=.86,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
// Existing photographic CC0 PBR textures already in GitHub (no cartoon flat ground).
const groundLoader=new THREE.TextureLoader();
function groundTexture(path,repeat,color=false){
 const t=groundLoader.load(BASE+path,undefined,undefined,e=>console.warn('PBR ground texture unavailable',path,e));
 t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);
 t.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);
 if(color)t.colorSpace=THREE.SRGBColorSpace;
 return t;
}
function groundPBR(folder,name,repeat,tint=0xffffff){
 const prefix='realistic-assets/pbr/'+folder+'/'+name+'_1K-JPG_';
 return new THREE.MeshStandardMaterial({
  color:tint,
  map:groundTexture(prefix+'Color.jpg',repeat,true),
  normalMap:groundTexture(prefix+'NormalGL.jpg',repeat),
  roughnessMap:groundTexture(prefix+'Roughness.jpg',repeat),
  roughness:1,metalness:0
 });
}
// Neutral procedural asphalt: previous RoadLines001 photograph contained painted
// markings that repeated across the ENTIRE road, causing a giant zebra pattern.
// Solid asphalt prevents repeated high-frequency canvas grain from creating
// horizontal moire/striping across road surfaces at grazing camera angles.
const asphalt=new THREE.MeshStandardMaterial({color:0x333638,roughness:0.98,metalness:0,polygonOffset:true,polygonOffsetFactor:1,polygonOffsetUnits:1});
const paving=groundPBR('PavingStones070','PavingStones070',18,0xe4ddd0);
const curb=M(0xd7d2c8);
const grass=groundPBR('Ground037','Ground037',65,0x94a68a);
const lane=M(0xeae5d7),yellow=M(0xc4ad62),dark=M(0x252a2d),stone=M(0xc4bcae);
const bronze=M(0x6b5c48,.38,.62),wood=M(0x6a4a31);
const glassCanvas=document.createElement('canvas');glassCanvas.width=512;glassCanvas.height=512;
 const gc=glassCanvas.getContext('2d'),gr=gc.createLinearGradient(0,0,512,512);
 gr.addColorStop(0,'#28485e');gr.addColorStop(.38,'#8ab4c8');gr.addColorStop(.7,'#476b82');gr.addColorStop(1,'#1d3649');
 gc.fillStyle=gr;gc.fillRect(0,0,512,512);
 gc.globalAlpha=.26;for(let i=0;i<28;i++){const xx=(i*73)%512,yy=220+(i*47)%180;gc.fillStyle=i%3?'#243b50':'#c6dce5';gc.fillRect(xx,yy,14+(i%5)*8,512-yy);}
 gc.globalAlpha=.22;gc.fillStyle='#f8fafc';for(let i=0;i<11;i++){gc.beginPath();gc.ellipse((i*97)%512,55+(i*41)%150,52,9,-.25,0,Math.PI*2);gc.fill();}
 gc.globalAlpha=.48;gc.strokeStyle='#d8e9ef';gc.lineWidth=4;gc.beginPath();gc.moveTo(32,0);gc.lineTo(260,512);gc.stroke();gc.globalAlpha=1;
 const glassTexture=new THREE.CanvasTexture(glassCanvas);glassTexture.colorSpace=THREE.SRGBColorSpace;glassTexture.anisotropy=8;
 // Do not overlay the reflection SVG on window glazing: it creates duplicate window patterns.
 const glass=new THREE.MeshPhysicalMaterial({map:glassTexture,color:0xffffff,metalness:.12,roughness:.25,transparent:false,opacity:1,clearcoat:.2,clearcoatRoughness:.2,side:THREE.FrontSide,depthWrite:true});
const windowMat=glass,doorMat=M(0x655343,.42,.18);
const windowFrame=M(0x43494a,.42,.5),windowSill=M(0xd7cec0,.9);
const windowReflection=new THREE.MeshBasicMaterial({color:0xd8f0ff,transparent:true,opacity:.055,depthWrite:false,side:THREE.FrontSide});
function architecturalWindow(group,cx,cy,cz,width,height,face='front'){
 const outer=new THREE.Group();outer.position.set(cx,cy,cz);
 if(face==='side')outer.rotation.y=Math.PI/2;
 group.add(outer);
 // A bright interior backing, glazing, highlights and actual raised frame.
 box(width,height,.035,0,0,-.11,new THREE.MeshBasicMaterial({color:0x78909a}),outer);
 box(width-.12,height-.12,.045,0,0,.015,glass,outer);
 box(.075,height+.12,.18,-width/2,0,.08,windowFrame,outer);
 box(.075,height+.12,.18,width/2,0,.08,windowFrame,outer);
 box(width+.12,.075,.18,0,height/2,.08,windowFrame,outer);
 box(width+.12,.075,.18,0,-height/2,.08,windowFrame,outer);
 box(.06,height,.09,0,0,.12,windowFrame,outer);
 box(width,.06,.09,0,-height*.06,.12,windowFrame,outer);
 box(width+.34,.14,.31,0,-height/2-.11,.06,windowSill,outer);
 const glint=box(width*.16,height*.81,.006,-width*.25,0,.153,windowReflection,outer);
 glint.rotation.z=-.13;glint.castShadow=false;glint.receiveShadow=false;
}
const geo=new THREE.BoxGeometry(1,1,1);
function box(w,h,d,x,y,z,material,parent=scene){
 const o=new THREE.Mesh(geo,material);o.scale.set(w,h,d);o.position.set(x,y,z);
 o.castShadow=true;o.receiveShadow=true;
 // Horizontal road/sidewalk slabs must not cast shadows on themselves or each other.
 if(material===asphalt||material===paving||material===curb||material===lane||material===yellow){o.castShadow=false;o.receiveShadow=false;}
 parent.add(o);return o;
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
const entranceClearance=5.8;
const plazaCenter={x:48,z:48},plazaRadius=24;
const inPlaza=(x,z,extra=0)=>Math.hypot(x-plazaCenter.x,z-plazaCenter.z)<plazaRadius+extra;
const insideBuilding=(x,z,pad=0)=>buildings.some(b=>Math.abs(x-b.x)<b.w/2+pad&&Math.abs(z-b.z)<b.d/2+pad);

// Entire city road/sidewalk grid. Roads are continuous; sidewalks NEVER cross lanes.
// Seamless mainland under the skyline: stops the blue sky void and floating towers.
// Southern edge ends before the beach/ocean; city roads and landscaping sit above it.
box(1250,.18,940,165,-.28,-305,grass);
box(350,.12,350,0,-.16,0,grass);
// All three original road corridors now run continuously to the perimeter fence.
// East-west roads: x=-276..570. North-south roads: z=-285..242.
const roadWest=-276,roadEast=570,roadNorth=-285,roadSouth=242;
for(const c of roadLines){
 // Build non-overlapping asphalt slabs: a single surface owns each intersection.
 // Previously horizontal and vertical slabs overlapped at different heights,
 // leaving a diagonal seam and exposed grass triangles.
 box(19,.12,roadSouth-roadNorth,c,-.04,(roadNorth+roadSouth)/2,asphalt);
 const cuts=[roadWest,...roadLines.flatMap(v=>[v-9.5,v+9.5]),roadEast];
 for(let j=0;j<cuts.length-1;j+=2){
  const left=cuts[j],right=cuts[j+1];if(right<=left)continue;
  box(right-left,.12,19,(left+right)/2,-.04,c,asphalt);
 }
 for(const side of [-1,1]){
  // Sidewalks and curbs end at each junction; no raised slabs across traffic.
  const zStops=[roadNorth,...roadLines.flatMap(v=>[v-14,v+14]),roadSouth];
  const xStops=[roadWest,...roadLines.flatMap(v=>[v-14,v+14]),roadEast];
  for(let i=0;i<zStops.length-1;i+=2){
   const lo=zStops[i],hi=zStops[i+1];if(hi<=lo)continue;
   const mid=(lo+hi)/2,len=hi-lo;
   box(4,.24,len,c+side*11.5,.025,mid,paving);
   box(.22,.25,len,c+side*9.65,.02,mid,curb);
  }
  for(let i=0;i<xStops.length-1;i+=2){
   const lo=xStops[i],hi=xStops[i+1];if(hi<=lo)continue;
   const mid=(lo+hi)/2,len=hi-lo;
   box(len,.24,4,mid,.025,c+side*11.5,paving);
   box(len,.25,.22,mid,.02,c+side*9.65,curb);
  }
 }
 for(let p=roadNorth+10;p<roadSouth-10;p+=12){
  if(!roadLines.some(k=>Math.abs(p-k)<15))box(.14,.014,5,c,.035,p,yellow);
 }
 for(let p=roadWest+10;p<roadEast-10;p+=12){
  if(!roadLines.some(k=>Math.abs(p-k)<15))box(5,.014,.14,p,.038,c,yellow);
 }
}
// Complete all intersection corners with overlapping concrete returns.
// Each corner spans 9.5..16.5 metres from both road centrelines,
// overlapping the adjacent straight sidewalks by 2.5 metres. This removes
// the uncovered triangular/rectangular grass gaps left by the old 4.5m pads.
for(const ix of roadLines)for(const iz of roadLines){
 for(const sx of [-1,1])for(const sz of [-1,1]){
  const start=9.5,end=16.5,span=end-start,mid=(start+end)/2;
  const cornerX=ix+sx*mid,cornerZ=iz+sz*mid;
  const pad=box(span,.24,span,cornerX,.025,cornerZ,paving);
  pad.castShadow=false;pad.receiveShadow=false;
  // Curb returns face the asphalt and do not cut through pedestrian paths.
  const edgeX=box(.22,.25,span,ix+sx*9.61,.02,cornerZ,curb);
  const edgeZ=box(span,.25,.22,cornerX,.02,iz+sz*9.61,curb);
  edgeX.castShadow=false;edgeZ.castShadow=false;
 }
}
// Four consistent zebra crossings per intersection, set back from the
// junction centre. The old two crossing strips formed a disconnected L.
// Each crossing spans the asphalt and meets the sidewalk approaches.
for(const x of roadLines)for(const z of roadLines){
 for(const side of [-1,1]){
  for(let i=-4;i<=4;i++){
   const offset=i*2.0;
   // East/west-running stripes cross the north/south road.
   const ns=box(1.25,.016,2.65,x+offset,.045,z+side*18,lane);
   // North/south-running stripes cross the east/west road.
   const ew=box(2.65,.016,1.25,x+side*18,.045,z+offset,lane);
   ns.castShadow=false;ns.receiveShadow=false;
   ew.castShadow=false;ew.receiveShadow=false;
  }
 }
}
// Tall solid concrete/stone perimeter barrier. Original 3D geometry and
// textured PBR-style surface, not the copyrighted photographic reference.
const wallCanvas=document.createElement('canvas');wallCanvas.width=512;wallCanvas.height=512;
const wc=wallCanvas.getContext('2d');wc.fillStyle='#8e918b';wc.fillRect(0,0,512,512);
let ws=75431;function wr(){ws=(Math.imul(ws,1664525)+1013904223)>>>0;return ws/4294967296;}
for(let i=0;i<14000;i++){
 const v=Math.floor(85+wr()*80);wc.fillStyle='rgba('+v+','+(v+3)+','+v+','+(.015+wr()*.08)+')';
 wc.fillRect(wr()*512,wr()*512,1+wr()*8,2+wr()*16);
}
for(let x=0;x<512;x+=64){wc.fillStyle='rgba(35,40,38,.15)';wc.fillRect(x,0,2,512);}
const wallTex=new THREE.CanvasTexture(wallCanvas);wallTex.colorSpace=THREE.SRGBColorSpace;
wallTex.wrapS=wallTex.wrapT=THREE.RepeatWrapping;wallTex.repeat.set(1,1);
const wallStone=new THREE.MeshStandardMaterial({map:wallTex,color:0xc9c9c3,roughness:.97,metalness:0});
const wallCap=new THREE.MeshStandardMaterial({color:0x92948e,roughness:.95});
const WALL_HEIGHT=12.5,WALL_THICKNESS=1.8;
function wallSegment(x1,z1,x2,z2){
 const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),angle=Math.atan2(dz,dx);
 const group=new THREE.Group();group.position.set(x1,0,z1);group.rotation.y=-angle;scene.add(group);
 for(let pos=0;pos<len;pos+=12){
  const w=Math.min(12,len-pos);
  box(w,WALL_HEIGHT,WALL_THICKNESS,pos+w/2,WALL_HEIGHT/2,0,wallStone,group);
  box(w+.03,.32,WALL_THICKNESS+.3,pos+w/2,WALL_HEIGHT+.16,0,wallCap,group);
  box(.15,WALL_HEIGHT,.06,pos, WALL_HEIGHT/2,WALL_THICKNESS/2+.03,wallCap,group);
 }
}
// The southern coastline is intentionally OPEN: no wall across the beach or ocean.
wallSegment(-276,-285,570,-285);
wallSegment(-276,-285,-276,350); // Extend the west wall deep into the ocean; no beach bypass.
// Main east gate: a clear 26-metre entrance aligned with the golf access road.
wallSegment(570,-285,570,-61);wallSegment(570,-35,570,350); // East perimeter also continues offshore.
// Gate geometry is loaded after core scene setup to avoid blocking world startup.
// Actual three-dimensional mountain terrain beyond the perimeter, with
// rugged triangulated slopes and snow-capped upper elevations.
const mountainRock=new THREE.MeshStandardMaterial({color:0x69746e,roughness:1,flatShading:true,side:THREE.DoubleSide});
const mountainSnow=new THREE.MeshStandardMaterial({color:0xdde4e5,roughness:.94,flatShading:true,side:THREE.DoubleSide});
function mountain3D(cx,cz,radius,height,seed){
 const rings=9,segments=20,vertices=[],indices=[],materials=[];
 for(let j=0;j<=rings;j++){
  const t=j/rings;
  for(let k=0;k<segments;k++){
   const angle=k*Math.PI*2/segments;
   const jag=1+.13*Math.sin(k*2.7+seed)+.09*Math.cos(k*5.1+seed*3+j);
   const rad=radius*(1-t)*jag;
   vertices.push(cx+Math.cos(angle)*rad,height*t+Math.sin(k*3.3+j*2+seed)*height*.035*(1-t),cz+Math.sin(angle)*rad);
  }
 }
 for(let j=0;j<rings;j++)for(let k=0;k<segments;k++){
  const n=j*segments+k,next=j*segments+(k+1)%segments;
  const up=n+segments,upNext=next+segments;
  const start=indices.length;indices.push(n,next,upNext,n,upNext,up);
  materials.push({start,count:6,materialIndex:j>=6?1:0});
 }
 const geometry=new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));
 geometry.setIndex(indices);geometry.computeVertexNormals();
 for(const g of materials)geometry.addGroup(g.start,g.count,g.materialIndex);
 const mesh=new THREE.Mesh(geometry,[mountainRock,mountainSnow]);
 mesh.name='3D wilderness mountain';mesh.castShadow=false;mesh.receiveShadow=true;scene.add(mesh);
}
for(let i=0;i<13;i++){
 const x=-430+i*100;
 mountain3D(x,-590-(i%3)*85,105+(i%4)*22,85+(i%5)*19,i+2);
 // No southern mountain ridge: preserve the open ocean horizon.
}
// No mountains along either side of the southern beach approach.
// Northern mountains remain visible inland beyond the northern perimeter.
// Forest is populated with existing real GLB tree assets after asynchronous loading.
function populateOuterForest(){
 const source=loaded.tree||loaded.tree2;if(!source)return;
 for(let i=0;i<180;i++){
  const side=i%3;
  const x=side===0?-320-rand()*90:side===1?610+rand()*95:-350+rand()*1020;
  const z=side===2?-325-rand()*65:-310+rand()*430;
  cloneNormalized(loaded[i%2?'tree2':'tree']||source,x,z,8+rand()*10,rand()*Math.PI*2);
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
// Real CC0 architectural photographs replace hand-painted cartoon windows.
const facadeMats=[
 'realistic-assets/facades/brick-residential-premium.svg',
 'realistic-assets/facades/limestone-residential-premium.svg',
 'realistic-assets/facades/glass-office-premium.svg',
 'realistic-assets/facades/classic-brick-residences.svg',
 'realistic-assets/expanded-models/brick-building/textures/modular_factory_facade_brick_diff_1k.jpg',
 'realistic-assets/expanded-models/urban-building/textures/modular_urban_apartments_facade_plaster_diff_1k.jpg',
 'realistic-assets/expanded-models/urban-building/textures/modular_urban_apartments_facade_trim_01_diff_1k.jpg'
].map((path,i)=>{
 const t=groundLoader.load(BASE+path);
 t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(1,1);t.anisotropy=8; // prevent crushed/over-tiled facade photography
 return new THREE.MeshStandardMaterial({map:t,roughness:.93,color:0xffffff});
});
const roof=M(0x34373a),metal=M(0x565c5e,.42,.55);
const brickNormal=groundTexture('realistic-assets/expanded-models/brick-building/textures/modular_factory_facade_brick_nor_gl_1k.jpg',3);
facadeMats[4].normalMap=brickNormal;facadeMats[4].normalScale.set(.35,.35);
const plasterNormal=groundTexture('realistic-assets/expanded-models/urban-building/textures/modular_urban_apartments_facade_plaster_nor_gl_1k.jpg',3);
facadeMats[5].normalMap=plasterNormal;facadeMats[5].normalScale.set(.4,.4);
const entranceAwning=new THREE.MeshStandardMaterial({color:0x3d4c50,metalness:.6,roughness:.38});
const castStone=new THREE.MeshStandardMaterial({color:0xc9c1b2,roughness:.94});

function makeBuilding(x,z,w,d,h,type){
 // Reject the entire structure including facade trim, balconies and entrance steps.
 // Road corridors are centered at -96, 0, 96; their paved surface ends 9.5m
 // from center, and sidewalks extend to 14m. Keep a further 3m buffer.
 const clearance=17;
 if(roadLines.some(c=>Math.abs(x-c)<w/2+clearance||Math.abs(z-c)<d/2+clearance))return;

 // Entirely new low-rise stucco residences, replacing the defective brick towers.
 // No signature kit, blue ornaments, glass layering, or legacy facade textures.
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 const plaster=new THREE.MeshStandardMaterial({color:type%2?0xe5dfd2:0xd9d7cf,roughness:.92});
 const accent=new THREE.MeshStandardMaterial({color:0xb8b4aa,roughness:.9});
 const roofMat=new THREE.MeshStandardMaterial({color:0x535960,roughness:.82});
 const windowGlass=new THREE.MeshStandardMaterial({color:0x304650,metalness:.16,roughness:.3});
 const windowFrame=new THREE.MeshStandardMaterial({color:0xf5f3e9,roughness:.78});
 const entrance=new THREE.MeshStandardMaterial({color:0x524f4a,roughness:.72});
 const H=Math.min(h,13.5),levels=3;
 box(w,H,d,0,H/2,0,plaster,g);
 box(w+.7,.32,d+.7,0,H+.16,0,roofMat,g);
 box(w+.4,.22,d+.4,0,3.45,0,accent,g);
 for(let floor=0;floor<levels;floor++){
  const yy=2.0+floor*3.55;
  for(const sign of [-1,1]){
   const frontCount=Math.max(3,Math.floor(w/5));
   for(let k=0;k<frontCount;k++){
    const xx=-w/2+(k+.5)*w/frontCount;
    if(floor===0&&sign===1&&Math.abs(xx)<2)continue;
    // Each opening has a single glass pane, a single frame and a sill.
    box(1.85,2.0,.12,xx,yy,sign*(d/2+.12),windowFrame,g);
    box(1.63,1.78,.14,xx,yy,sign*(d/2+.22),windowGlass,g);
    box(2.05,.13,.27,xx,yy-1.08,sign*(d/2+.18),accent,g);
   }
   const sideCount=Math.max(3,Math.floor(d/5));
   for(let k=0;k<sideCount;k++){
    const zz=-d/2+(k+.5)*d/sideCount;
    box(.12,2.0,1.85,sign*(w/2+.12),yy,zz,windowFrame,g);
    box(.14,1.78,1.63,sign*(w/2+.22),yy,zz,windowGlass,g);
    box(.27,.13,2.05,sign*(w/2+.18),yy-1.08,zz,accent,g);
   }
  }
 }
 box(2.6,3.0,.13,0,1.5,d/2+.18,entrance,g);
 box(3.6,.22,1.2,0,3.15,d/2+.65,roofMat,g);
 // Architectural depth: grounded stone base, horizontal cornices, entrance steps,
 // and window lintels. All details remain attached to the building footprint.
 const stone=new THREE.MeshStandardMaterial({color:0xa9a49a,roughness:.96});
 const cornice=new THREE.MeshStandardMaterial({color:0xece6d9,roughness:.83});
 box(w+.22,.55,d+.22,0,.28,0,stone,g);
 for(const elevation of [3.52,7.07,10.62]){
   box(w+.45,.12,d+.45,0,elevation,0,cornice,g);
 }
 for(let step=0;step<3;step++)box(3.25,.13,.43,0,.07+step*.13,d/2+.48+step*.41,stone,g);
 for(const side of [-1,1]){
   for(let floor=0;floor<levels;floor++){
     const yy=2.0+floor*3.55;
     const frontCount=Math.max(3,Math.floor(w/5));
     for(let k=0;k<frontCount;k++){
       const xx=-w/2+(k+.5)*w/frontCount;
       if(floor===0&&side===1&&Math.abs(xx)<2)continue;
       box(2.12,.12,.34,xx,yy+1.1,side*(d/2+.19),cornice,g);
     }
   }
 }
 buildings.push({x,z,w,d,h:H});
}

const blocks=[
 [-48,-48],[48,-48],[-48,48],[48,48],
 [-144,-48],[144,-48],[-48,144],[48,144],
 [-144,48],[144,48],[-48,-144],[48,-144]
];
for(let k=0;k<blocks.length;k++){
 const [bx,bz]=blocks[k];
 if(bx===48&&bz===48)continue; // Central fountain park: no buildings.
 if(bx===48&&bz===-48)continue; // Dedicated observation needle district: no buildings.
 if(Math.abs(bx)>100||Math.abs(bz)>100)continue; // avoid outside-city half blocks
 for(const [i,j] of [[-1,-1],[1,-1],[-1,1],[1,1]]){
  // Keep the complete building footprint and trim well behind the curb.
  // Road centers are 96m apart; this leaves at least 11m from each wall to asphalt.
  const x=bx+i*15,z=bz+j*15;
  if(bx===-48&&bz===-48)continue; // Reserved commercial district: cafe, dealership, and access road. // Reserve east side for Brewstone cafe opposite the Needle.
  makeBuilding(x,z,24,23,18+Math.floor(rand()*5)*3.2,k+Math.round(rand()*4));
 }
}

// Ocean-view residential neighborhood: homes face the southern beach.
const waterfrontHomes=addWaterfrontHomes(scene,{count:12});
const eastsideGolf=createEastsideGolfDistrict(scene,{x:425,z:-48});
const ownableHomes=createOwnableHomes(scene);
const universalInteriors=createUniversalInteriors(scene);
let universalSession=null;

// Dedicated tower island in its own city block (0..96, -96..0).
// The 7.5m loop road surrounds the landscaped tower plaza and connects
// to the city street grid through north/south access lanes.
const towerDistrict={x:48,z:-48,outer:37,inner:29};
const loopRoadMaterial=asphalt;
const towerPavingMaterial=paving;
const towerLawnMaterial=grass;
function towerSurface(w,d,x,z,material,y=.045){
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,d),material);
 mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);
 mesh.receiveShadow=true;scene.add(mesh);return mesh;
}
// Four sides of a continuous road loop, 7.5 meters wide.
for(const dz of [-33.25,33.25])towerSurface(74,7.5,48,-48+dz,loopRoadMaterial,.065);
for(const dx of [-33.25,33.25])towerSurface(7.5,59,48+dx,-48,loopRoadMaterial,.065);
// Connect loop to the existing grid road at z=0 and z=-96.
towerSurface(9,11,48,-5.5,loopRoadMaterial,.067);
towerSurface(9,11,48,-90.5,loopRoadMaterial,.067);
// Raised inner pedestrian island, with generous room around the tower.
towerSurface(57.5,57.5,48,-48,towerPavingMaterial,.09);
// Landscape pockets at the four corners of the tower island.
for(const dx of [-21,21])for(const dz of [-21,21]){
 const bed=new THREE.Mesh(new THREE.CircleGeometry(6,32),towerLawnMaterial);
 bed.rotation.x=-Math.PI/2;bed.position.set(48+dx,.108,-48+dz);
 bed.receiveShadow=true;scene.add(bed);
}
// Removed elevated decorative curb strips around the tower loop.
// They projected as stray white lines across nearby roadway and sidewalk.
// Existing sidewalk edges remain defined by the road grid.
const observationNeedle=createObservationNeedle(scene,{x:48,z:-48});
const coffeeShop=createCoffeeShop(scene,{x:-34,z:-48});
// Walk-in showroom just west of Brewstone Coffee, with three fictional display vehicles.
const dealership={
 x:-72,z:-48,isNear:(x,z,r=5.5)=>Math.hypot(x+72,z+48)<r,
 nearestCar:()=>null
};
import('./zerconda-dealership.js?v=20261117-isolated-v25')
 .then(({createDealership})=>Object.assign(dealership,createDealership(scene,{x:-72,z:-48})))
 .catch(err=>{console.error('Dealership asset failed (city continues):',err);
   if(status)status.textContent='City loaded; dealership asset unavailable: '+err.message;
 });
const airDancers=addAirDancers(scene,{x:-72,z:-48});
const southBeach=createZercondaBeach(scene);

// Ocean safety: remove legacy oversized pyramid/mountain meshes if a previous
// scene module adds them. Never remove the observation needle or beach umbrellas.
function removeLegacyOceanPyramids(){
 const rejected=[];
 scene.updateMatrixWorld(true);
 scene.traverse(object=>{
  if(!object.isMesh||!object.geometry)return;
  const geo=object.geometry;
  if(!geo.boundingBox)geo.computeBoundingBox();
  const bb=geo.boundingBox;if(!bb)return;
  const size=bb.getSize(new THREE.Vector3());
  const worldPos=object.getWorldPosition(new THREE.Vector3());
  const scale=object.getWorldScale(new THREE.Vector3());
  const height=size.y*Math.abs(scale.y),width=Math.max(size.x*Math.abs(scale.x),size.z*Math.abs(scale.z));
  const pyramidShape=/ConeGeometry|TetrahedronGeometry|CylinderGeometry/.test(geo.type);
  if(pyramidShape&&width>25&&height>18&&worldPos.z>155)rejected.push(object);
 });
 for(const object of rejected){object.parent?.remove(object);}
 if(rejected.length)console.warn('Removed legacy ocean pyramids:',rejected.length);
}
removeLegacyOceanPyramids();

let dealerInside=false;
// Separate commercial parcels with an actual paved access road, curb and pedestrian sidewalks.
box(8,.13,83,-51.5,-.025,-48,asphalt);
for(const side of [-1,1])box(2.6,.16,83,-51.5+side*5.5,.035,-48,paving);
coffeeShop.root.rotation.y=Math.PI/2; // Entrance and patio face east toward the Needle.
// Convert authored local chair locations to rotated world coordinates.
for(const seat of coffeeShop.seats){const lx=seat.x+34,lz=seat.z+48;seat.x=-34+lz;seat.z=-48-lx;}
// Populate tower surroundings and distant horizon with detailed 3D architecture.
const cityDepth=addCityDepth({scene,asphalt,paving,grass});
// Dedicated green space behind the Needle, outside the downtown building grid.
const needleSportsPark=createNeedleSportsPark(scene,{x:48,z:-190});
// Extend pedestrian access north from the existing street grid to the park entrance.
box(4,.065,37,48,.005,-123,paving);
for(const zz of [-112,-123,-134]){box(.18,.025,2,48,.06,zz,yellow);}
const apartments=createApartmentExperience({scene,x:1050,z:1050});
apartments.root.visible=false;
let apartmentSession=null,apartmentFloor=0;
// The old cartoon fountain, tiled boxes, sphere bushes, and procedural benches
// have been REMOVED. The GLB supplies the entire detailed plaza instead.
let realisticPlaza=null;
installRealisticFountain({scene,centerX:48,centerZ:48,renderer})
 .then(plaza=>{realisticPlaza=plaza;
  if(status)status.textContent='Real 3D fountain plaza loaded at (48,48)';
 })
 .catch(err=>{console.error('Real fountain asset unavailable:',err);
  if(status)status.textContent='Fountain GLB missing: upload the model to GitHub first';
 });

// Trees are only placed in designated landscape strips on blocks.
// NEVER on road, parking lanes, intersections, or inside fountain plaza.
const treeSpots=[];
for(const c of roadLines){
 for(let p=-145;p<=145;p+=23){
  if(roadLines.some(v=>Math.abs(p-v)<22))continue;
  for(const side of [-1,1]){
   // 16.5m from centerline: beyond 9.5m asphalt and 4m sidewalk.
   for(const [x,z] of [[c+side*16.5,p],[p,c+side*16.5]]){
    if(Math.abs(x)>162||Math.abs(z)>162)continue;
    // Coastal houses occupy z=135, with walls and balconies extending beyond the lot.
    // Reserve the complete residential frontage plus tree-canopy clearance.
    if(z>72&&z<172&&Math.abs(x)<185)continue; // Protect entire beachside residential blocks, including full tree canopies
    if(x>12&&x<84&&z> -250&&z< -135||Math.abs(x+51.5)<12&&Math.abs(z+48)<44||Math.abs(x+72)<17&&Math.abs(z+48)<19||nearRoad(x,z,5.1)||insideBuilding(x,z,1.5)||inPlaza(x,z,2)||Math.abs(x-48)<39&&Math.abs(z+48)<39||doors.some(d=>Math.hypot(x-d.x,z-d.z)<entranceClearance)||Math.abs(x+34)<22&&Math.abs(z+48)<23)continue;
    if(treeSpots.some(([a,b])=>Math.hypot(x-a,z-b)<10))continue;
    treeSpots.push([x,z]);
   }
  }
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
    if(x>12&&x<84&&z> -220&&z< -105||nearRoad(x,z,.6)||inPlaza(x,z,3)||insideBuilding(x,z,2)||Math.abs(x-48)<39&&Math.abs(z+48)<39)continue;
    if(treeSpots.some(([tx,tz])=>Math.hypot(x-tx,z-tz)<4))continue;
    if(lampSpots.some(([lx,lz])=>Math.hypot(x-lx,z-lz)<8))continue;
    lampSpots.push([x,z]);
   }
  }
 }
}
// Parallel curbside parking: vehicles sit alongside sidewalks, never in travel lanes.
// Road asphalt half-width is 9.5m; car centers are 8.55m from centerline,
// leaving approximately 0.95m for the outer half of a 1.9m-wide vehicle.
const parking=[];
const curbOffset=8.48;
const parkingSamples=[-160,-152,-144,-136,-128,-120,-112,-80,-72,-64,-56,-48,-40,-32,-24,24,32,40,48,56,64,72,80,112,120,128,136,144,152,160];
for(const center of roadLines){
 for(const along of parkingSamples){
  // No parking at intersections or across pedestrian crossings.
  if(roadLines.some(cross=>Math.abs(along-cross)<24))continue;
  for(const side of [-1,1]){
   for(const vertical of [true,false]){
    const x=vertical?center+side*curbOffset:along;
    const z=vertical?along:center+side*curbOffset;
    if(Math.abs(x)>160||Math.abs(z)>160)continue;
    if(inIntersection(x,z,16)||inPlaza(x,z,7))continue;
    if(doors.some(d=>Math.hypot(x-d.x,z-d.z)<9))continue;
    if(parking.some(p=>Math.hypot(x-p[0],z-p[1])<7.2))continue;
    // Cars follow the street direction, parallel to the curb.
    parking.push([x,z,vertical?0:Math.PI/2]);
   }
  }
 }
}
parking.sort((a,b)=>Math.hypot(a[0]-48,a[1]-48)-Math.hypot(b[0]-48,b[1]-48));
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
 // Align the vehicle's actual long axis with the road, regardless of GLB export orientation.
 const longAxisX=size.x>size.z;
 // Imported vehicles can have either local X or local Z as their forward axis.
 // Preserve curb-parallel alignment by mapping the measured long axis to the road.
 g.rotation.y=angle+(longAxisX?Math.PI/2:0);
 g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
 scene.add(g);return g;
}
async function populate(){
 const keys=Object.keys(PATH);
 const result=await Promise.allSettled(keys.map(load));
 result.forEach((r,i)=>{if(r.status==='fulfilled')loaded[keys[i]]=r.value;});
 populateOuterForest();
 for(let i=0;i<treeSpots.length;i++){
  const [x,z]=treeSpots[i],src=loaded[i%2?'tree2':'tree']||loaded.tree||loaded.tree2;
  if(z>72&&z<172&&Math.abs(x)<185)continue; // Protect entire beachside residential blocks, including full tree canopies
  if(src&&!doors.some(d=>Math.hypot(x-d.x,z-d.z)<13)&&!(Math.abs(x+34)<24&&Math.abs(z+48)<24))cloneNormalized(src,x,z,7+rand()*2.5,rand()*6.28);
 }
 for(const [x,z] of lampSpots){
  if(loaded.lamp)cloneNormalized(loaded.lamp,x,z,4.4);
  else {cylinder(.09,.12,4.3,x,2.15,z,dark,scene,12);
    box(.5,.55,.5,x,4.6,z,stone);}
 }
 const carModels=Array.from({length:32},(_,i)=>['sedan','white','sport','white','sedan'][i%5]);
 for(let i=0;i<Math.min(carModels.length,parking.length);i++){
  const [x,z,angle]=parking[i],src=loaded[carModels[i]];
  if(!src)continue;
  const g=cloneNormalized(src,x,z,1.55,angle);
  if(g)cars.push({group:g,x,z,angle,speed:0});
 }
 // Populate the plaza perimeter with real scanned GLTF street furniture.
 // Unlike primitive placeholder meshes these contain authored textures and normals.
 const decorate=(key,x,z,height,angle=0)=>{
  const src=loaded[key];if(!src)return;
  return cloneNormalized(src,x,z,height,angle);
 };
 // Detailed, human-scale furniture replaces the oversized mismatched imported crates and toy flowers.

 if(status)status.textContent='Loaded '+Object.keys(loaded).length+'/'+keys.length+' model types · Fountain plaza at (48,48)';
}
populate();
addPremiumPlazaFurniture(scene,{cx:48,cz:48});
const START_X=34,START_Z=34; // Open southwest edge of fountain plaza, clear of the central lamp and fountain.
const keys=new Set(),player={x:START_X,z:START_Z},clock=new THREE.Clock();
const cityMap=createCityMap({player});
// Third-person walking avatar: forward-facing, visible from the default camera.
// Kept lightweight so mobile devices do not need an additional model download.
const pedestrianSystem=createPedestrians(scene,{count:18});
const playerRig=pedestrianSystem.createHuman(0);
const avatar=playerRig.root;avatar.name='Zerconda player avatar';scene.add(avatar);
let realAvatar=null,realAvatarMixer=null,realAvatarWalk=null,realAvatarIdle=null;
const avatarBones={};
const avatarRest={};
// The old recolored GLB is intentionally retired. Use actual clothing meshes.
const dressedPlayer={root:createZercondaAvatar(),update:()=>{}};
avatar.add(dressedPlayer.root);
// Hide ALL primitive pedestrian parts, including the old head, ears, neck and hands.
// Previously the old head remained visible over the detailed replacement.
for(const child of [...avatar.children])if(child!==dressedPlayer.root)child.visible=false;
function updateRealAvatar(dt,time,speed){dressedPlayer.root.userData.animate?.(dt,speed);}
let lastAvatarX=START_X,lastAvatarZ=START_Z;


let activeCar=null,yaw=0,pitch=0,drag=false,lastX=0,lastY=0;
let driverLookYaw=0,driverLookPitch=0,driverSteer=0;
let onObservationDeck=false,insideNeedleLobby=false;
// Initialize camera BEFORE the first frame. A blank sky must never be the default.
camera.position.set(START_X,5,START_Z-8);
camera.lookAt(48,2,48);
function resetView(){
 if(apartmentSession){apartmentSession=null;apartments.root.visible=false;}
 activeCar=null;driverLookYaw=0;driverLookPitch=0;driverSteer=0;onObservationDeck=false;insideNeedleLobby=false;player.x=START_X;player.z=START_Z;yaw=0;pitch=0;
 camera.position.set(START_X,5,START_Z-8);camera.lookAt(48,2,48);
 if(status)status.textContent='View reset · Walk forward with W';
}
addEventListener('keydown',e=>{if(e.code==='KeyR')resetView();});
const resetButton=document.createElement('button');resetButton.textContent='RESET VIEW';
resetButton.type='button';resetButton.style.cssText='position:fixed;right:12px;top:12px;z-index:9999;padding:12px 16px;background:#203b49;color:white;border:1px solid #9ab5c4;border-radius:8px;cursor:pointer';
resetButton.addEventListener('click',resetView);document.body.appendChild(resetButton);
const movement={vx:0,vz:0,wheelImpulse:0};
 // Explicit ocean-facing beach arrival. The ocean is at positive Z.
 // The normal plaza camera can look inland and mistakenly appear to show
 // the beach wall; this provides a reproducible shoreline viewpoint.
 const beachButton=document.createElement('button');
 beachButton.textContent='GO TO BEACH';
 beachButton.type='button';
 beachButton.style.cssText='position:fixed;right:12px;top:66px;z-index:9999;padding:12px 16px;background:#126879;color:white;border:1px solid #9ed6dd;border-radius:8px;cursor:pointer';
 beachButton.addEventListener('click',()=>{
  if(apartmentSession){apartmentSession=null;apartments.root.visible=false;}
  activeCar=null;insideNeedleLobby=false;onObservationDeck=false;cafeInside=false;
  player.x=0;player.z=225;yaw=0;pitch=-.04;
  movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
  camera.position.set(0,4.5,218);
  camera.lookAt(0,1.6,280);
  if(status)status.textContent='South Beach · Ocean straight ahead · W to walk toward the water';
 });
 document.body.appendChild(beachButton);

const WALK_SPEED=2.5,RUN_SPEED=5.3,ACCELERATION=7,DECELERATION=12;
const WHEEL_STEP=1.5,WHEEL_MAX=4;
// Live diagnostics: distinguish a blank render from a covered/lost WebGL canvas.
const diag=document.createElement('div');
diag.id='zerconda-render-diagnostics';
diag.style.cssText='position:fixed;left:8px;bottom:10px;z-index:99999;background:rgba(0,0,0,.82);color:#c5ffcf;padding:8px 11px;font:12px monospace;pointer-events:none;white-space:pre-line;border-radius:5px;max-width:95vw';
document.body.appendChild(diag);
let contextLost=false,renderFailure='';
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;renderFailure='WebGL context lost';});
renderer.domElement.addEventListener('webglcontextrestored',()=>{contextLost=false;renderFailure='WebGL context restored';});
// Unlit diagnostic marker at (48,2,29), in front of the player.
// If this is invisible despite nonzero draw calls, investigate canvas overlay/CSS.
let diagnosticFrames=0;
renderer.domElement.addEventListener('wheel',e=>{
 e.preventDefault();
 if(activeCar)return;
 const dir=Math.sign(-e.deltaY);
 if(!dir)return;
 movement.wheelImpulse=THREE.MathUtils.clamp(
  movement.wheelImpulse+dir*WHEEL_STEP,-WHEEL_MAX,WHEEL_MAX);
},{passive:false});
addEventListener('keydown',e=>{keys.add(e.code);if(e.code==='KeyE'&&!e.repeat){if(apartmentSession)apartmentAction();else if(nearCafeEntrance()||cafeInside)enterCafe();else if(dealership.isNear(player.x,player.z,5.5)||dealerInside)visitDealership();else toggleCar();}if(e.code==='KeyF'&&!e.repeat){if(universalSession)exitUniversalInterior();else if(nearestUniversalEntrance())enterUniversalInterior();else toggleNearbyDoor();}if(e.code==='KeyT'&&!e.repeat)toggleObservationDeck();
 if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();});
addEventListener('keyup',e=>keys.delete(e.code));
for(const b of document.querySelectorAll('[data-key]')){
 const key=b.dataset.key;b.addEventListener('pointerdown',e=>{
 e.preventDefault();keys.add(key);b.setPointerCapture(e.pointerId);});
 for(const evt of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(evt,()=>keys.delete(key));
}
const enter=document.getElementById('enter');if(enter)enter.onclick=toggleCar;
// Context-sensitive actions: accessible on keyboard and touch screens.
const actionButton=(id,label,bottom,callback)=>{
 const el=document.createElement('button');el.id=id;el.type='button';el.textContent=label;
 el.style.cssText='position:fixed;right:14px;bottom:'+bottom+'px;z-index:9999;padding:12px 15px;background:#203d50;color:white;border:1px solid #a2bac9;border-radius:9px;font:700 13px system-ui;display:none;cursor:pointer';
 el.addEventListener('click',callback);document.body.appendChild(el);return el;
};
const homeButton=actionButton('zerconda-home-action','H · BUY HOME',365,()=>{
 const home=ownableHomes.closest(player.x,player.z,11);if(!home)return;
 const username=ownableHomes.owned?.username||window.prompt('Enter your Zerconda username for the nameplate on your front door:');
 if(!ownableHomes.owned&&username===null)return;
 const result=ownableHomes.owned?.id===home.id?ownableHomes.decorate():ownableHomes.buy(home,username);
 alert(result.message+'\\n\\nThis is a local-browser prototype, not an account-backed Zer Bucks transaction.');
});
const towerButton=actionButton('zerconda-tower-button','ENTER TOWER / ELEVATOR',245,toggleObservationDeck);
const doorButton=actionButton('zerconda-door-button','F · ENTER BUILDING',305,()=>{if(universalSession)exitUniversalInterior();else if(nearestUniversalEntrance())enterUniversalInterior();else toggleNearbyDoor();});
const apartmentButton=actionButton('zerconda-apartment-action','E · ELEVATOR / EXIT',425,apartmentAction);
const floorPanel=document.createElement('div');floorPanel.id='zerconda-apartment-floors';
floorPanel.style.cssText='position:fixed;left:14px;top:85px;z-index:10001;background:rgba(15,30,42,.92);color:white;border-radius:10px;padding:12px;display:none;font:13px system-ui;max-width:290px';
floorPanel.innerHTML='<b>ZERCONDA APARTMENTS</b><p>Choose a floor to visit:</p>';
for(let f=0;f<=4;f++){const btn=document.createElement('button');btn.textContent=f===0?'LOBBY':('FLOOR '+f);btn.style.cssText='margin:3px;padding:9px;background:#315568;color:white;border:1px solid #87a5b6;border-radius:6px;cursor:pointer';btn.addEventListener('click',()=>setApartmentFloor(f));floorPanel.appendChild(btn);}
document.body.appendChild(floorPanel);
function setApartmentFloor(f){if(!apartmentSession)return;apartmentFloor=f;apartments.showFloor(f);player.x=apartments.x;player.z=apartments.z+6;movement.vx=0;movement.vz=0;if(status)status.textContent=f===0?'Apartment lobby · reception and elevator':'Apartment floor '+f+' · furnished rooms';}
function apartmentAction(){if(!apartmentSession)return;if(apartmentFloor!==0){setApartmentFloor(0);return;}const back=apartmentSession;apartmentSession=null;apartments.root.visible=false;floorPanel.style.display='none';player.x=back.x;player.z=back.z+3.4;movement.vx=0;movement.vz=0;if(status)status.textContent='Exited apartment building';}
function enterApartment(d){if(apartmentSession)return;apartmentSession={x:d.x,z:d.z};apartments.root.visible=true;floorPanel.style.display='block';activeCar=null;setApartmentFloor(0);}
// Legacy overlay cleanup: older Airo button can survive alongside the new UI.
const fixLegacyDoorLabels=()=>{for(const b of document.querySelectorAll('button')){if(b!==doorButton&&/^(?:F\\s*[·:.\\-]\\s*)?(?:OPEN|CLOSE)\\s+DOORS?$/i.test((b.textContent||'').trim())){b.textContent='F · ENTER BUILDING';b.onclick=()=>toggleNearbyDoor();}}};
fixLegacyDoorLabels();
const legacyDoorObserver=new MutationObserver(fixLegacyDoorLabels);
legacyDoorObserver.observe(document.body,{subtree:true,childList:true});
const cafeButton=actionButton('zerconda-cafe-button','C · SIT DOWN',365,toggleCafeSeat);
const dealerButton=actionButton('zerconda-dealership-button','E · ENTER DEALERSHIP',390,visitDealership);
function visitDealership(){
 if(!dealerInside&&dealership.isNear(player.x,player.z,5.5)){dealerInside=true;
  player.x=dealership.x+9;player.z=dealership.z;movement.vx=0;movement.vz=0;
  if(status)status.textContent='Welcome to Zerconda Motors · Explore three vehicles on the showroom floor';return;
 }
 const vehicle=dealership.nearestCar(player.x,player.z,5);
 if(vehicle){if(status)status.textContent=vehicle.name+' · Display vehicle · Visit the vehicle shop for purchases';return;}
 if(dealerInside){dealerInside=false;player.x=dealership.x+15;player.z=dealership.z;movement.vx=0;movement.vz=0;if(status)status.textContent='Exited Zerconda Motors';}
}
let sittingSeat=null,cafeInside=false;
const cafeEntry={x:-34+10.8,z:-48};
function nearCafeEntrance(){return Math.hypot(player.x-cafeEntry.x,player.z-cafeEntry.z)<4.5;}
function enterCafe(){if(sittingSeat){sittingSeat=null;}if(cafeInside){cafeInside=false;player.x=cafeEntry.x+3.3;player.z=cafeEntry.z;}else{cafeInside=true;player.x=cafeEntry.x-3.6;player.z=cafeEntry.z;}movement.vx=0;movement.vz=0;if(status)status.textContent=cafeInside?'Inside Brewstone Coffee · Find a table and press C':'Exited Brewstone Coffee';}
const cafeEntryButton=actionButton('zerconda-cafe-enter','E · ENTER COFFEE SHOP',445,enterCafe);
// Public benches in the Needle plaza, fountain square and sports park.
// Positions match the authored benches in city-depth-assets.js and needle-sports-park.js.
const publicSeats=[
 ...[[28,-28,0],[68,-28,0],[28,-68,Math.PI],[68,-68,Math.PI],[29,26,0],[67,26,0],[29,70,Math.PI],[67,70,Math.PI]].map(([x,z,facing])=>({x,z,facing,kind:'bench'})),
 ...[[-29,-37,0],[29,-37,Math.PI],[-29,42,0],[29,42,Math.PI],[0,48,0],[-27,-12,0]].map(([x,z,facing])=>({x:x+48,z:z-190,facing,kind:'park bench'}))
];
function nearestPublicSeat(px,pz,max=2.6){
 let best=null,bestD=max;
 for(const seat of publicSeats){const d=Math.hypot(px-seat.x,pz-seat.z);if(d<bestD){best=seat;bestD=d;}}
 return best;
}
function nearestAvailableSeat(){const cafe=coffeeShop.nearestSeat(player.x,player.z,2.5);const bench=nearestPublicSeat(player.x,player.z,2.6);if(!cafe)return bench;if(!bench)return cafe;return Math.hypot(player.x-cafe.x,player.z-cafe.z)<Math.hypot(player.x-bench.x,player.z-bench.z)?cafe:bench;}
let seatReturn=null;
function toggleCafeSeat(){
 if(activeCar||apartmentSession||onObservationDeck)return;
 if(sittingSeat){
  const old=sittingSeat;sittingSeat=null;
  if(seatReturn){player.x=seatReturn.x;player.z=seatReturn.z;seatReturn=null;}
  movement.vx=0;movement.vz=0;
  if(status)status.textContent='Standing up';
  return;
 }
 const seat=nearestAvailableSeat();if(!seat)return;
 seatReturn={x:player.x,z:player.z};
 sittingSeat=seat;player.x=seat.x;player.z=seat.z;
 yaw=seat.facing??yaw;
 movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 if(status)status.textContent='Seated · Press C or tap STAND UP to stand';
}
addEventListener('keydown',e=>{if(e.code==='KeyC'&&!e.repeat&&(sittingSeat||nearestAvailableSeat()))toggleCafeSeat();});
function nearestUniversalEntrance(){
 if(activeCar||onObservationDeck||apartmentSession||universalSession)return null;
 let best=null,dist=4.7;
 for(const b of buildings){const x=b.x,z=b.z+b.d/2+1.4;const d=Math.hypot(player.x-x,player.z-z);if(d<dist){best={x,z,label:'City building'};dist=d;}}
 for(const h of ownableHomes.homes){const x=h.x+(h.id<=10?-3.4:3.5),z=h.z+(h.id<=10?-7.8:-11.2);const d=Math.hypot(player.x-x,player.z-z);if(d<dist){best={x,z,label:'Home '+h.id};dist=d;}}
 for(const h of waterfrontHomes.homesList||[]){const d=Math.hypot(player.x-h.entryX,player.z-h.entryZ);if(d<dist){best={x:h.entryX,z:h.entryZ,label:'Waterfront home'};dist=d;}}
 return best;
}
function enterUniversalInterior(){const entry=nearestUniversalEntrance();if(!entry)return;universalSession={x:player.x,z:player.z};universalInteriors.show(entry.label);activeCar=null;player.x=universalInteriors.x;player.z=universalInteriors.z+5.8;movement.vx=0;movement.vz=0;if(status)status.textContent='Inside '+entry.label+' · F to exit';}
function exitUniversalInterior(){if(!universalSession)return;const back=universalSession;universalSession=null;universalInteriors.hide();player.x=back.x;player.z=back.z;movement.vx=0;movement.vz=0;if(status)status.textContent='Exited building';}
function nearestDoor(){
 if(activeCar||onObservationDeck||apartmentSession)return null;
 let nearest=null,best=3.7;
 for(const d of doors){const dist=Math.hypot(player.x-d.x,player.z-d.z);if(dist<best){best=dist;nearest=d;}}
 return nearest;
}
function toggleNearbyDoor(){
 const d=nearestDoor();if(!d)return;
 enterApartment(d);
 const next=true;
 for(const leaf of doors){
  if(Math.abs(leaf.x-d.x)<.1&&Math.abs(leaf.z-d.z)<.1){
   leaf.manual=next;leaf.holdUntil=next?elapsed+8:0;
  }
 }
}
// Two-step tower interaction: enter lobby first, then press the elevator button.
function toggleObservationDeck(){
 if(activeCar)return;
 if(onObservationDeck){
  onObservationDeck=false;insideNeedleLobby=true;
  player.x=observationNeedle.x;player.z=observationNeedle.z+7.5;
  movement.vx=0;movement.vz=0;
  if(status)status.textContent='Tower lobby · Press elevator button to go up again';
  return;
 }
 if(insideNeedleLobby){
  insideNeedleLobby=false;onObservationDeck=true;
  player.x=observationNeedle.x;player.z=observationNeedle.z+8;
  movement.vx=0;movement.vz=0;yaw=0;pitch=0;
  camera.position.set(player.x,observationNeedle.deckY+1.8,player.z-2);
  if(status)status.textContent='Observation deck · Look through panoramic windows · Press T to descend';
  return;
 }
 if(Math.hypot(player.x-observationNeedle.entrance.x,player.z-observationNeedle.entrance.z)>7)return;
 insideNeedleLobby=true;
 player.x=observationNeedle.x;player.z=observationNeedle.z+7.5;
 movement.vx=0;movement.vz=0;yaw=0;pitch=0;
 if(status)status.textContent='Tower lobby · Walk to the elevator · Press T or the elevator button';
}

function toggleCar(){
 if(activeCar){player.x=activeCar.x+3;player.z=activeCar.z;activeCar=null;driverLookYaw=0;driverLookPitch=0;driverSteer=0;movement.vx=0;movement.vz=0;movement.wheelImpulse=0;return;}
 let closest=null,best=5;
 for(const c of cars){const d=Math.hypot(c.x-player.x,c.z-player.z);
  if(d<best){best=d;closest=c;}}
 if(closest){activeCar=closest;driverLookYaw=0;driverLookPitch=0;driverSteer=0;pitch=0;movement.vx=0;movement.vz=0;movement.wheelImpulse=0;}
}
renderer.domElement.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;lastY=e.clientY;});
addEventListener('pointerup',()=>drag=false);
addEventListener('pointermove',e=>{if(!drag)return;
 const dx=e.clientX-lastX,dy=e.clientY-lastY;
 if(activeCar){driverLookYaw=THREE.MathUtils.clamp(driverLookYaw-dx*.003,-1.25,1.25);driverLookPitch=THREE.MathUtils.clamp(driverLookPitch+dy*.0025,-.45,.55);}
 else{yaw-=dx*.003;pitch=THREE.MathUtils.clamp(pitch-dy*.004,-1.25,1.25);}
 lastX=e.clientX;lastY=e.clientY;});
function walkable(x,z){
 if(universalSession)return universalInteriors.contains(x,z);
 if(apartmentSession)return apartments.contains(x,z);
  if(cafeInside)return coffeeShop.isInside(x,z);
  if(coffeeShop.isInside(x,z))return false;
 if(x< -274.5||x>568.5||z< -283.5||z>(Math.abs(x)<165?248:242))return false;
 // No movement around the submerged perimeter: shoreline outside the central beach is impassable.
 if(z>174&&Math.abs(x)>260)return false;
 // Eastern expansion is accessed from the city's eastbound road corridor.
 // Residential expansion is accessible on foot; building walls remain solid.
 if(onObservationDeck)return observationNeedle.isOnDeck(x,z);
 if(insideNeedleLobby)return Math.abs(x-observationNeedle.x)<2.2&&z>observationNeedle.z+5.5&&z<observationNeedle.z+9.5;
 if(Math.hypot(x-observationNeedle.x,z-observationNeedle.z)<5.3)return false;
 if(insideBuilding(x,z,.35))return false;
 if(Math.hypot(x-48,z-48)<11.55)return false; // actual 3D basin collision
 return true;
}
let elapsed=0;
function animate(){
 requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);elapsed+=dt;
 airDancers.update(elapsed);
 southBeach.update(dt);
 pedestrianSystem.update(dt,elapsed);
 cityMap.draw();
 if(realisticPlaza)realisticPlaza.update(dt);
 cloudSky.update(dt);
 const f=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
 const side=Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));
 if(activeCar){
  const c=activeCar;c.speed=THREE.MathUtils.damp(c.speed,f*11,2.6,dt);
  // Steering stays relative to the vehicle, not to the driver's camera view.
  c.angle-=side*dt*(.5+Math.abs(c.speed)*.035);
  const nx=c.x+Math.sin(c.angle)*c.speed*dt,nz=c.z+Math.cos(c.angle)*c.speed*dt;
  if(walkable(nx,nz)){
   c.group.position.x+=nx-c.x;c.group.position.z+=nz-c.z;c.x=nx;c.z=nz;
  }else c.speed=0;
  c.group.rotation.y=c.angle;player.x=c.x;player.z=c.z;yaw=c.angle;
 }else if(sittingSeat){
  movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 }else{
  const len=Math.hypot(f,side)||1;
  const speed=keys.has('ShiftLeft')||keys.has('ShiftRight')?RUN_SPEED:WALK_SPEED;
  const desiredX=(Math.sin(yaw)*f+Math.cos(yaw)*side)/len*speed;
  const desiredZ=(Math.cos(yaw)*f-Math.sin(yaw)*side)/len*speed;
  const damping=(f||side)?ACCELERATION:DECELERATION;
  movement.vx=THREE.MathUtils.damp(movement.vx,desiredX,damping,dt);
  movement.vz=THREE.MathUtils.damp(movement.vz,desiredZ,damping,dt);
  const wheelDistance=movement.wheelImpulse*(1-Math.exp(-11*dt));
  movement.wheelImpulse-=wheelDistance;
  const dx=movement.vx*dt+Math.sin(yaw)*wheelDistance;
  const dz=movement.vz*dt+Math.cos(yaw)*wheelDistance;
  const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.45));
  for(let n=0;n<count;n++){
   if(walkable(player.x+dx/count,player.z))player.x+=dx/count;
   else movement.vx=0;
   if(walkable(player.x,player.z+dz/count))player.z+=dz/count;
   else movement.vz=0;
  }
 }
 for(const d of doors){
  const near=Math.hypot(player.x-d.x,player.z-d.z)<3.4;
  d.open=THREE.MathUtils.damp(d.open,near&&d.manual?1:0,4,dt);
  d.hinge.rotation.y=d.side*d.open*1.22;
 }
 // The old procedural fountain's jetMaterial was removed with that fountain.
 // Its stale animation line caused ReferenceError every frame BEFORE renderer.render().
 // Animated water is now updated by realisticPlaza.update(dt) above.
 if(activeCar){
  avatar.visible=false;
  // First-person driver's seat: camera moves with the car and looks through windshield.
  // Car geometry is hidden only for this client while driving to avoid blocking the view.
  const a=activeCar.angle;
  const forward=new THREE.Vector3(Math.sin(a),0,Math.cos(a));
  const right=new THREE.Vector3(Math.cos(a),0,-Math.sin(a));
  const eyePos=new THREE.Vector3(activeCar.x,1.58,activeCar.z).addScaledVector(right,-.34).addScaledVector(forward,.25);
  camera.position.copy(eyePos);
  const heading=a+driverLookYaw;
  const direction=new THREE.Vector3(Math.sin(heading),-Math.sin(driverLookPitch),Math.cos(heading));
  camera.lookAt(eyePos.clone().addScaledVector(direction,25));
 }else{
  const dist=onObservationDeck?2.8:insideNeedleLobby?1.6:5,eye=onObservationDeck?observationNeedle.deckY+1.7:2.1;
  const target=new THREE.Vector3(player.x,eye,player.z);
  // Camera elevation and target elevation must not cancel one another.
  // Positive pitch looks UP, negative pitch looks DOWN, with full vertical range.
  const desired=new THREE.Vector3(player.x-Math.sin(yaw)*dist,eye+1.15,player.z-Math.cos(yaw)*dist);
  camera.position.lerp(desired,Math.min(1,dt*8));
  camera.position.y=Math.max(onObservationDeck?observationNeedle.deckY+1.25:1.75,camera.position.y);
  const forward=new THREE.Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));
  camera.lookAt(camera.position.clone().addScaledVector(forward,20));
  avatar.visible=!onObservationDeck&&!insideNeedleLobby&&!apartmentSession;
  avatar.position.set(player.x,0,player.z);
  avatar.rotation.y=yaw;
  const walkingSpeed=Math.hypot(movement.vx,movement.vz);
  if(!realAvatar)playerRig.animate(elapsed,sittingSeat?0:walkingSpeed);
  else updateRealAvatar(dt,elapsed,sittingSeat?0:walkingSpeed);
  if(sittingSeat){
   // Seated pose: thighs forward, knees bent and torso lowered onto chair height.
   avatar.position.y=-.48;
   if(!realAvatar){playerRig.legs.forEach(leg=>{leg.hip.rotation.x=-1.18;leg.knee.rotation.x=1.48;});playerRig.torso.rotation.x=.05;}
   else{for(const [name,bone] of Object.entries(avatarBones)){
    if(/(upperleg|upleg|thigh)/.test(name))bone.rotation.x=-1.12;
    if(/(lowerleg|calf|shin)/.test(name))bone.rotation.x=1.38;
   }}
  }else avatar.position.y=0;
 }
 if(!Number.isFinite(camera.position.x)||!Number.isFinite(camera.position.y)||!Number.isFinite(camera.position.z))resetView();
 // Prevent the driven car body from obstructing the first-person windshield view.
 if(activeCar)activeCar.group.visible=false;
 try{renderer.render(scene,camera);}
 catch(err){renderFailure=String(err);console.error('ZERCONDA RENDER ERROR',err);}
 finally{if(activeCar)activeCar.group.visible=true;}
 const nearHome=!activeCar?ownableHomes.closest(player.x,player.z,11):null;
 homeButton.style.display=nearHome?'block':'none';
 if(nearHome)homeButton.textContent=ownableHomes.owned?.id===nearHome.id?'H · CUSTOMIZE HOME':'H · BUY HOME · 200 ZB (DEMO)';
 const nearTower=!activeCar&&Math.hypot(player.x-observationNeedle.entrance.x,player.z-observationNeedle.entrance.z)<7;
 towerButton.style.display=(onObservationDeck||insideNeedleLobby||nearTower)?'block':'none';
 towerButton.textContent=onObservationDeck?'T · ELEVATOR DOWN':insideNeedleLobby?'T · ELEVATOR UP':'T · ENTER TOWER';
 const universalEntry=universalSession?{label:'EXIT'}:nearestUniversalEntrance();
 const door=universalEntry?null:nearestDoor();doorButton.style.display=(door||universalEntry)?'block':'none';
 doorButton.textContent=universalSession?'F · EXIT BUILDING':'F · ENTER BUILDING';
 const nearSeat=nearestAvailableSeat();
 cafeButton.style.display=(sittingSeat||nearSeat)&&!activeCar?'block':'none';
 cafeButton.textContent=sittingSeat?'C · STAND UP':'C · SIT DOWN';
 if((diagnosticFrames++%30)===0){
  const p=camera.position;
  diag.textContent='BUILD '+ZERCONDA_BUILD+'\nRENDER '+(contextLost?'CONTEXT LOST':'ACTIVE')+
   ' | objects '+scene.children.length+
   ' | draw calls '+renderer.info.render.calls+
   ' | triangles '+renderer.info.render.triangles+
   '\nCamera '+p.x.toFixed(1)+','+p.y.toFixed(1)+','+p.z.toFixed(1)+
   ' | player '+player.x.toFixed(1)+','+player.z.toFixed(1)+
   ' | canvas '+renderer.domElement.clientWidth+'x'+renderer.domElement.clientHeight+
   (renderFailure?'\nERROR '+renderFailure:'');
 }

}
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;
 camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
