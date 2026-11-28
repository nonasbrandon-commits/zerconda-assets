import {createCityviewFacadeMaterials} from './cityview-facade-materials.js?v=20261124-realism-v337';
import {createTownSidewalkMaterial} from './town-sidewalks.js?v=20261121-forest-airfield-v193';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export const CITYVIEW={id:'cityview',name:'Cityview Apartments',x:-378,z:-62,angle:Math.PI,w:30,d:24,floors:10,lobbyHeight:4.2,floorHeight:3.55};
export const cityviewFloorY=level=>.18+(level?CITYVIEW.lobbyHeight+(level-1)*CITYVIEW.floorHeight:0);
let palette;
export function cityviewMaterials(){if(palette)return palette;const texture=(kind)=>{const c=document.createElement('canvas');c.width=c.height=512;const a=c.getContext('2d');a.fillStyle=kind==='wood'?'#67452d':'#66696b';a.fillRect(0,0,512,512);for(let i=0;i<500;i++){const y=i*1.1;a.strokeStyle=kind==='wood'?(i%2?'#c4935844':'#20130d55'):(i%2?'#d6d5c133':'#1d242544');a.lineWidth=kind==='wood'?1:2;a.beginPath();a.moveTo(0,y);a.bezierCurveTo(150,y+Math.sin(i)*15,350,y-8,512,y+4);a.stroke();}if(kind!=='wood'){a.strokeStyle='#333b3e';for(let y=0;y<512;y+=64){a.strokeRect(0,y,512,64);for(let x=(y%128?0:90);x<512;x+=170)a.strokeRect(x,y,170,64);}}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;};palette={stone:new THREE.MeshStandardMaterial({map:texture('stone'),roughness:.82}),wood:new THREE.MeshStandardMaterial({map:texture('wood'),roughness:.55}),dark:new THREE.MeshStandardMaterial({color:'#202b34',roughness:.45,metalness:.45}),cream:new THREE.MeshStandardMaterial({color:'#dedcd5',roughness:.75}),metal:new THREE.MeshStandardMaterial({color:'#b7c2c8',metalness:.8,roughness:.24}),glass:new THREE.MeshPhysicalMaterial({color:'#7197ab',transparent:true,opacity:.42,roughness:.12,metalness:.3,depthWrite:false,side:THREE.DoubleSide}),gold:new THREE.MeshBasicMaterial({color:'#ffbd64'}),warm:new THREE.MeshBasicMaterial({color:'#fff0cd'}),leaf:new THREE.MeshStandardMaterial({color:'#3d6640',roughness:.9}),soil:new THREE.MeshStandardMaterial({color:'#33291f',roughness:1})};return palette;}
export function cityviewBox(parent,w,h,d,x,y,z,material,r=0){const mesh=new THREE.Mesh(r?new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/4,h/4,d/4)):new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=!material.transparent&&h>.2;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
export function cityviewText(parent,text,w,h,x,y,z,color='#fff2db',background='#16222a'){const c=document.createElement('canvas');c.width=2048;c.height=256;const a=c.getContext('2d');a.fillStyle=background;a.fillRect(0,0,2048,256);a.fillStyle=color;a.font='600 148px Arial';a.textAlign='center';a.textBaseline='middle';a.fillText(text,1024,132,1980);const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map}));mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
let planterMaterials;
export function cityviewPlant(parent,x,y,z,scale=1){if(!planterMaterials)planterMaterials={pot:new THREE.MeshStandardMaterial({color:'#171b1d',roughness:.48,metalness:.3}),leaf:new THREE.MeshStandardMaterial({color:'#b2c59b',vertexColors:true,side:THREE.DoubleSide,roughness:.76}),pebble:new THREE.MeshStandardMaterial({color:'#252b2b',roughness:.8})};const m=cityviewMaterials(),pm=planterMaterials,g=new THREE.Group();g.name='Leafy plant · tapered black illuminated planter';g.position.set(x,y,z);g.scale.setScalar(scale);parent.add(g);const body=new THREE.Mesh(new THREE.CylinderGeometry(.34,.28,.60,4,1),pm.pot);body.rotation.y=Math.PI/4;body.position.y=.30;g.add(body);cityviewBox(g,.43,.025,.43,0,.605,0,m.soil);for(const side of[-1,1]){cityviewBox(g,.495,.035,.035,0,.61,side*.23,pm.pot);cityviewBox(g,.035,.035,.495,side*.23,.61,0,pm.pot);cityviewBox(g,.472,.014,.008,0,.51,side*.236,m.gold);cityviewBox(g,.008,.014,.472,side*.236,.51,0,m.gold);}for(let i=0;i<22;i++){const pebble=new THREE.Mesh(new THREE.SphereGeometry(.025,7,5),pm.pebble);pebble.position.set(Math.sin(i*2.4)*(.06+i%4*.035),.624,Math.cos(i*2.4)*(.06+i%4*.035));g.add(pebble);}for(let k=0;k<14;k++){const angle=k*2.4,radial=new THREE.Vector3(Math.cos(angle),0,Math.sin(angle)),cross=new THREE.Vector3(-Math.sin(angle),0,Math.cos(angle)),height=k>9?1.05+(k%2)*.12:.65+(k%3)*.17,reach=k>9?.25+(k%2)*.06:.45+(k%4)*.08,center=t=>new THREE.Vector3().addScaledVector(radial,.025+reach*t).setY(.65+height*t-.23*t*t);const positions=[],uv=[],colors=[],indices=[],N=16,W=6;for(let j=0;j<=N;j++){const t=j/N,c=center(t),width=.22*Math.pow(Math.sin(t*Math.PI),.8);for(let i=0;i<=W;i++){const u=i/W,point=c.clone().addScaledVector(cross,(u-.5)*width*2);point.y+=.04*Math.sin(t*Math.PI)*(1-Math.abs(u-.5)*2);positions.push(point.x,point.y,point.z);uv.push(u,t);const vein=1-Math.abs(u-.5)*2;colors.push(.10+.16*vein,.26+.18*vein,.045+.035*vein);if(j<N&&i<W){const a=j*(W+1)+i;indices.push(a,a+W+1,a+1,a+1,a+W+1,a+W+2);}}}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setIndex(indices);geometry.computeVertexNormals();g.add(new THREE.Mesh(geometry,pm.leaf));const vein=new THREE.CatmullRomCurve3(Array.from({length:12},(_,i)=>center(i/11).add(new THREE.Vector3(0,.004,0))));g.add(new THREE.Mesh(new THREE.TubeGeometry(vein,16,.004,4,false),m.leaf));}return g;}

export function batchCityview(root){const groups=new Map(),remove=[];root.updateMatrixWorld(true);const inv=root.matrixWorld.clone().invert();root.traverse(o=>{if(!o.isMesh||o.isReflector||o.userData.keepDynamic)return;const clone=o.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,o.matrixWorld)),geometry=clone.index?clone.toNonIndexed():clone;if(geometry!==clone)clone.dispose();const list=groups.get(o.material)||[];list.push(geometry);groups.set(o.material,list);remove.push(o);});for(const mesh of remove){mesh.removeFromParent();mesh.geometry.dispose();}for(const [material,list]of groups){const mesh=new THREE.Mesh(mergeGeometries(list,false),material);mesh.name='Batched Cityview architecture';mesh.castShadow=!material.transparent;mesh.receiveShadow=true;root.add(mesh);list.forEach(g=>g.dispose());}}
export function buildCityviewExterior(scene,building=CITYVIEW){const cfg={...CITYVIEW,...building};
 const m=cityviewMaterials(),f=createCityviewFacadeMaterials(),root=new THREE.Group();root.name=cfg.name+' · detailed contemporary facade';root.userData.cityview=true;root.userData.customInterior=true;root.position.set(cfg.x,0,cfg.z);root.rotation.y=cfg.angle;root.scale.z=cfg.depthScale||1;scene.add(root);
 const box=(...a)=>cityviewBox(root,...a);
 const led=(w,h,d,x,y,z)=>box(w,h,d,x,y,z,f.led);
 const downlight=(x,y,z)=>{const trim=new THREE.Mesh(new THREE.CylinderGeometry(.105,.105,.022,16),f.dark);trim.position.set(x,y,z);root.add(trim);const lens=new THREE.Mesh(new THREE.CircleGeometry(.066,16),f.lamp);lens.rotation.x=Math.PI/2;lens.position.set(x,y-.013,z);root.add(lens);};
 // The podium retains the existing walk-through entrance and ramp.
 box(31,.25,26,0,.035,0,f.dark);box(30,4,.28,0,2.1,-12,f.core);
 for(const side of[-1,1]){const x=side*14.82;
 box(.32,.40,24,x,.30,0,f.panel);box(.32,.46,24,x,3.87,0,f.panel);
 for(const z of[-9.6,-4.8,0,4.8,9.6]){box(.045,3.14,4.58,x+side*.17,2.04,z,f.glass);box(.07,3.20,.065,x+side*.20,2.04,z,f.dark);}
 for(const z of[-12,-7.2,-2.4,2.4,7.2,12])box(.36,3.2,.20,x,2.04,z,f.dark);
 for(const y of[.46,3.64])box(.10,.07,24,x+side*.20,y,0,f.trim);
}root.userData.lobbySideWindows=10;
 for(const side of[-1,1]){
  const x=side*9.1;box(10.75,3.05,.045,x,1.82,12.055,f.glass);
  for(let k=-2;k<=2;k++)box(.065,3.12,.11,x+k*2.12,1.82,12.10,f.dark);
  for(const y of[.255,3.385])box(10.85,.085,.13,x,y,12.12,f.dark);
  for(const px of[side*3.15,side*14.62]){const width=Math.abs(px)<4?1.65:.78;box(width,3.48,.50,px,1.92,12.19,Math.abs(px)<4?f.marble:f.panel,.01);box(.11,1.25,.09,px,1.95,12.49,f.dark,.01);led(.035,1.10,.025,px,1.95,12.55);const wash=new THREE.Mesh(new THREE.PlaneGeometry(width*.95,2.75),f.glow);wash.position.set(px,1.95,12.455);root.add(wash);}
  led(10.65,.025,.025,x,.22,12.20);
 }
 for(const x of[-14.62,-3.15,3.15,14.62]){const light=new THREE.PointLight('#ffd092',9,3.5,2);light.position.set(x,2.05,12.85);root.add(light);}
 root.userData.entrance=createCityviewEntrance(root,{z:12.12,y:.18});
 box(4.35,.18,.24,0,3.35,12.13,f.dark);box(4.2,.09,.12,0,.20,12.2,f.trim);
 box(31,.55,3.2,0,3.85,12.8,f.panel,.015);box(31,.045,3.2,0,3.55,12.8,f.dark);
 led(30.7,.025,.025,0,3.57,14.42);for(const side of[-1,1])led(.025,.025,3.1,side*15.42,3.57,12.8);
 for(const x of[-14,-11,-8,-5,-2,2,5,8,11,14])downlight(x,3.52,13.35);
 for(const x of[-12,-6,6,12])box(.018,.48,.014,x,3.85,14.408,f.dark);
 box(15.15,.56,.045,0,3.86,14.44,f.dark,.008);
 for(const y of[3.59,4.13])led(15.16,.015,.015,0,y,14.47);
 for(const x of[-7.57,7.57])led(.015,.55,.015,x,3.86,14.47);
 const sign=cityviewText(root,(cfg.roofName||'CITYVIEW')+' · LOBBY & ELEVATOR',14.7,.43,0,3.86,14.478,'#fff4de','#111619');sign.material.map.anisotropy=8;
 for(const x of[-12,-5,5,12])cityviewPlant(root,x,.18,14.4,1.1);
 // Ten floors: recessed reflective glazing, wood soffits and framed glass rails.
 for(let level=1;level<=10;level++){
  const y=cityviewFloorY(level);box(30,.18,24,0,y-.09,0,f.panel);
  for(const side of[-1,1]){const x=side*14.65;box(.7,3.4,24,x,y+1.7,0,f.core);for(const z of[-8,-2,4,10]){box(.035,2.5,4.4,x+side*.36,y+1.72,z,f.glass);for(const edge of[-2.2,0,2.2])box(.055,2.55,.065,x+side*.40,y+1.72,z+edge,f.dark);}}
  box(30,3.4,.22,0,y+1.7,-12,f.core);for(const x of[-11,-5,1,7,12]){box(3.8,2.05,.04,x,y+1.75,-12.13,f.glass);box(.05,2.1,.055,x,y+1.75,-12.17,f.dark);}
  box(5.2,3.4,.6,0,y+1.7,11.9,f.core);
  for(const x of[-2.55,2.55])box(.075,3.4,.045,x,y+1.7,12.235,f.trim);
  for(let row=0;row<12;row++)box(4.98,.012,.025,0,y+.12+row*.285,12.22,f.dark);
  box(.42,.42,.04,-2.0,y+1.6,12.25,f.panel);cityviewText(root,String(level),.30,.30,-2.0,y+1.6,12.276,'#f6f3e7','#555b60');
  for(const x of[-8.9,8.9]){
   box(11.4,2.8,.035,x,y+1.6,11.92,f.glass);
   for(let k=-2;k<=2;k++)box(.065,2.9,.10,x+k*2.15,y+1.6,12.0,f.dark);
   for(const yy of[y+.16,y+3.04])box(11.45,.065,.10,x,yy,12.0,f.dark);
   box(12,.22,2.0,x,y-.07,12.9,f.panel);box(11.94,.045,1.95,x,y-.202,12.9,f.soffit);
   led(11.9,.022,.025,x,y-.13,13.92);
   for(let k=0;k<5;k++){const dx=(k-2)*2.34;box(2.29,1.03,.025,x+dx,y+.62,13.77,f.railing);box(.045,1.12,.065,x+dx-1.16,y+.61,13.79,f.dark);}
   box(.045,1.12,.065,x+5.85,y+.61,13.79,f.dark);box(11.8,.055,.065,x,y+1.16,13.79,f.dark);box(11.8,.035,.045,x,y+.085,13.79,f.dark);
   for(const sx of[-1,1]){box(.025,1.03,1.72,x+sx*5.85,y+.62,12.92,f.railing);box(.06,.055,1.8,x+sx*5.85,y+1.16,12.92,f.dark);}
   box(12,.13,2,x,y+3.35,12.9,f.soffit);
   for(const dx of[-4.4,0,4.4])downlight(x+dx,y+3.27,12.8);
   cityviewPlant(root,x+(x<0?-4.7:4.7),y,12.65,.9);
   for(const dx of[-1.6,1.6]){box(1.05,.18,.82,x+dx,y+.45,12.7,m.cream,.04);box(1.05,.65,.15,x+dx,y+.78,12.3,f.dark,.025);for(const sx of[-.4,.4])box(.055,.4,.055,x+dx+sx,y+.2,12.6,f.trim);}box(.8,.08,.6,x,y+.5,12.85,m.wood,.02);
  }
 }
 const roofY=cityviewFloorY(10)+3.55;box(31.2,.35,26.5,0,roofY,0,f.panel);led(31,.025,.025,0,roofY-.2,13.27);
 for(const x of[-15.55,15.55])led(.025,.025,26.4,x,roofY-.2,0);
 box(7.5,2.7,.7,0,roofY+.65,12.85,f.dark);cityviewText(root,cfg.roofName||'CITYVIEW',6.8,1,0,roofY+.9,13.22);cityviewText(root,'APARTMENTS',5.3,.48,0,roofY+.12,13.23,'#ffc477');
 box(7,.9,5,0,roofY+.62,-2,f.dark);for(const x of[-10,10]){box(3.8,.6,2.2,x,roofY+.49,-5,f.panel);for(let k=-6;k<=6;k++)box(.025,.48,2.1,x+k*.25,roofY+.5,-5,f.dark);}
 for(const x of[-12,-6,6,12])box(.14,.9,.14,x,.45,16,f.dark);
 buildCityviewEntrancePath(root);batchCityview(root);return root;
}

export function createCityviewEntrance(parent,{z=10,y=0}={}){const m=cityviewMaterials(),leaves=[];for(const sign of[-1,1]){const leaf=new THREE.Group();leaf.position.set(sign*1.03,y,z);parent.add(leaf);const box=(...a)=>{const mesh=cityviewBox(leaf,...a);mesh.userData.keepDynamic=true;return mesh;};const glazing=cityviewGlazing(leaf,2.02,3.05,0,1.525,0);glazing.userData.keepDynamic=true;for(const x of[-1.01,1.01])box(.045,3.08,.06,x,1.525,0,m.dark);for(const h of[.02,3.03])box(2.06,.045,.06,0,h,0,m.dark);box(.045,.65,.10,-sign*.78,1.5,.05,m.metal);leaves.push({leaf,sign});}let progress=0;return{leaves,get progress(){return progress},update(near,dt){progress=THREE.MathUtils.clamp(progress+(near?1:-1)*Math.min(Math.max(dt,0),.15)*3.5,0,1);for(const {leaf,sign}of leaves)leaf.position.x=sign*(1.03+progress*2.08);}};}

export function cityviewGlazing(parent,width,height,x,y,z,angle=0){const p=cityviewMaterials();if(!p.privacy){const m=p.privacy=new THREE.MeshPhysicalMaterial({color:'#adcbd7',side:THREE.DoubleSide,transparent:true,opacity:.12,roughness:.18,metalness:.35,depthWrite:false});m.forceSinglePass=true;m.customProgramCacheKey=()=> 'cityview-privacy-v328';m.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb = gl_FrontFacing ? vec3(0.07, 0.14, 0.18) : diffuseColor.rgb;').replace('#include <opaque_fragment>','diffuseColor.a = gl_FrontFacing ? 0.94 : 0.12;\n#include <opaque_fragment>');};}const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,height),p.privacy);mesh.name='Privacy tinted window · clear inside';mesh.position.set(x,y,z);mesh.rotation.y=angle;parent.add(mesh);return mesh;}

export function cityviewEntranceHeight(x,z){if(Math.abs(x)>2.25||z<12||z>20)return null;return z<=15?.18:.18-(z-15)*(.16/5);}
export function buildCityviewEntrancePath(parent){const geometry=new THREE.BufferGeometry(),vertices=[],uv=[];const add=(a,b,c)=>{for(const v of[a,b,c]){vertices.push(...v);uv.push(v[0],v[2]);}};const span=(z0,z1,y0,y1)=>{const a=[-2.25,y0,z0],b=[2.25,y0,z0],c=[2.25,y1,z1],d=[-2.25,y1,z1];add(a,d,b);add(b,d,c);for(const x of[-2.25,2.25]){const p=[x,y0,z0],q=[x,y1,z1],r=[x,-.08,z1],s=[x,-.08,z0];if(x<0){add(p,s,q);add(q,s,r);}else{add(p,q,s);add(q,r,s);}}};span(12,15,.18,.18);span(15,20,.18,.02);geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.computeVertexNormals();const mesh=new THREE.Mesh(geometry,createTownSidewalkMaterial());mesh.name='Continuous Cityview entrance ramp · flush sidewalk joint';mesh.receiveShadow=true;parent.add(mesh);return mesh;}
