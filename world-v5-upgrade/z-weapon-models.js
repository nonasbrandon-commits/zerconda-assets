import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
let shared;const geometryCache=new Map();
function materials(){if(shared)return shared;const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d');c.fillStyle='#b9bcbf';c.fillRect(0,0,256,256);let seed=410;for(let i=0;i<16000;i++){seed=Math.imul(seed,1664525)+1013904223>>>0;c.fillStyle=i%2?'#ffffff18':'#00000014';c.fillRect(seed%256,(seed>>>10)%256,1,1);}const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;const mat=(color,metalness,roughness)=>new THREE.MeshStandardMaterial({color,metalness,roughness,map,bumpMap:map,bumpScale:.00035});return shared={steel:mat('#333b40',.78,.39),silver:mat('#bbc0c3',.87,.29),black:mat('#101719',.45,.48),rubber:mat('#1a2022',.03,.84),screw:mat('#555b5c',.8,.35),glass:new THREE.MeshPhysicalMaterial({color:'#16352b',metalness:.45,roughness:.13,clearcoat:1})};}
// Exterior visual replicas of the user's Zerconda reference sheets. No internal mechanisms.
export function createDetailedZWeapon(id,{locked=true,statusMaterial=null}={}){
 const m=materials(),root=new THREE.Group(),art=new THREE.Group();root.add(art);art.scale.setScalar(.60);root.name='Reference Z '+id;root.userData.weaponId=id;root.userData.reference='Zerconda_Game_Weapons.zip';
 const led=statusMaterial||new THREE.MeshStandardMaterial({color:'#ff263e',emissive:'#ff263e',emissiveIntensity:2.4,roughness:.25});led.name='Z_STATUS_LIGHT';led.userData.selectiveBloom=true;const lights=[];
 const profile=(points,width,material,x=0)=>{const shape=new THREE.Shape();points.forEach(([z,y],i)=>i?shape.lineTo(z,y):shape.moveTo(z,y));shape.closePath();const source=new THREE.ExtrudeGeometry(shape,{depth:width,bevelEnabled:true,bevelThickness:.006,bevelSize:.006,bevelSegments:3,steps:1,curveSegments:8});const matrix=new THREE.Matrix4().set(0,0,-1,x+width/2,0,1,0,0,1,0,0,0,0,0,0,1);source.applyMatrix4(matrix);source.computeVertexNormals();const mesh=new THREE.Mesh(source,material);art.add(mesh);return mesh;};
 function box(w,h,d,x,y,z,mat=m.steel,rz=0){const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(.008,w*.25,h*.25,d*.25)),mat);mesh.position.set(x,y,z);mesh.rotation.z=rz;art.add(mesh);return mesh;}
 function cyl(radius,length,y,z,mat=m.steel,x=0){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(radius,radius,length,24),mat);mesh.rotation.x=Math.PI/2;mesh.position.set(x,y,z);art.add(mesh);return mesh;}
 function pipe(points,radius=.012,mat=m.silver){const mesh=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(([z,y,x=0])=>new THREE.Vector3(x,y,z))),24,radius,8,false),mat);art.add(mesh);return mesh;}
 function screw(x,y,z){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(.009,.009,.008,12),m.screw);mesh.rotation.z=Math.PI/2;mesh.position.set(x,y,z);art.add(mesh);box(.010,.002,.003,x+Math.sign(x)*.005,y,z,m.black);}
 function panel(points,x){profile(points,.012,m.silver,x);}
 function insignia(z,y,x){profile([[z-.085,y+.055],[z+.085,y+.055],[z+.085,y+.028],[z-.035,y-.035],[z+.085,y-.035],[z+.085,y-.060],[z-.085,y-.060],[z-.085,y-.030],[z+.035,y+.028],[z-.085,y+.028]],.007,m.silver,x);}
 const pistol=id==='z-sidearm',pump=id==='z-pump',marksman=id==='z-marksman';
 if(geometryCache.has(id)){for(const part of geometryCache.get(id)){const mesh=new THREE.Mesh(part.geometry,part.light?led:part.material);mesh.receiveShadow=true;art.add(mesh);if(part.light)lights.push(mesh);}}else{
 if(pistol){
  profile([[-.18,.005],[-.18,.105],[-.12,.165],[.30,.165],[.39,.12],[.39,.025],[.30,-.025],[-.06,-.025]],.15,m.steel);
  profile([[-.145,-.015],[.015,-.035],[-.02,-.13],[-.065,-.33],[-.19,-.33],[-.19,-.285],[-.12,-.09]],.125,m.black);
  for(const side of[-1,1]){const x=side*.081;panel([[-.175,.09],[-.12,.17],[.04,.17],[.015,.125],[-.10,.12],[-.13,.075]],x);panel([[.11,.17],[.32,.17],[.39,.12],[.39,.06],[.33,.06],[.29,.115],[.12,.115]],x);profile([[-.118,-.085],[-.04,-.10],[-.082,-.29],[-.17,-.29],[-.17,-.25]],.009,m.rubber,side*.068);insignia(.065,.072,side*.089);
   for(let j=0;j<4;j++)panel([[.15+j*.035,.14],[.165+j*.035,.14],[.12+j*.035,.075],[.105+j*.035,.075]],x+side*.004);
   const light=box(.013,.025,.135,side*.082,-.007,.22,led);lights.push(light);for(const [z,y]of[[-.14,.12],[.33,.09],[-.15,-.29]])screw(side*.093,y,z);
  }
  pipe([[-.055,-.04],[.115,-.04],[.14,-.11],[.08,-.17],[-.035,-.16],[-.055,-.04]],.013,m.steel);pipe([[.03,-.05],[.015,-.10],[.035,-.135]],.009,m.black);
  cyl(.051,.08,.075,.385,m.silver);cyl(.040,.006,.075,.430,m.black);for(const z of[.04,.30])box(.075,.035,.045,0,.19,z,m.black);for(let i=0;i<4;i++)box(.115,.02,.015,0,-.05,.20+i*.035,m.black);
 }else{
  profile([[-.30,-.035],[-.30,.075],[-.21,.15],[.18,.15],[.27,.085],[.23,-.045],[-.10,-.065]],.15,m.steel);
  profile([[-.17,-.04],[-.045,-.055],[-.08,-.15],[-.15,-.34],[-.285,-.31],[-.26,-.27]],.12,m.black);
  // Skeleton buttstock with open triangular supports and an inset cheek pad.
  pipe([[-.30,.04],[-.48,.10],[-.75,.10],[-.75,-.18],[-.65,-.18],[-.43,-.015],[-.30,-.02]],.031,m.steel);
  box(.16,.29,.05,0,-.045,-.76,m.rubber);box(.14,.075,.25,0,.12,-.60,m.rubber);
  for(const side of[-1,1]){panel([[-.74,.135],[-.50,.135],[-.47,.10],[-.72,.09]],side*.082);panel([[-.28,.08],[-.20,.16],[.12,.16],[.18,.105],[.12,.07],[-.17,.095],[-.22,.035]],side*.084);profile([[-.19,.085],[-.04,.085],[.12,.035],[.12,-.055],[-.16,-.055],[-.235,-.015]],.012,m.black,side*.09);insignia(-.075,.028,side*.104);const light=box(.012,.025,.115,side*.105,-.038,.065,led);lights.push(light);profile([[-.17,-.11],[-.105,-.12],[-.17,-.295],[-.25,-.28]],.010,m.rubber,side*.066);for(const [z,y]of[[-.20,.12],[-.14,-.28],[-.69,-.10],[.15,.10]])screw(side*.105,y,z);}
  pipe([[-.135,-.06],[.025,-.06],[.045,-.13],[-.03,-.17],[-.155,-.15]],.012,m.steel);pipe([[-.04,-.065],[-.06,-.10],[-.025,-.135]],.008,m.black);
  if(pump){
   cyl(.055,.40,.005,.43,m.rubber);for(let i=0;i<10;i++)cyl(.058,.012,.005,.26+i*.035,m.black);
   cyl(.032,.66,.095,.53,m.steel);cyl(.025,.60,-.04,.50,m.black);cyl(.045,.08,.095,.88,m.silver);cyl(.032,.008,.095,.925,m.black);
   for(const side of[-1,1]){panel([[.16,.17],[.76,.17],[.80,.125],[.16,.125]],side*.08);for(let i=0;i<5;i++)box(.02,.06,.015,side*.08,.12,.25+i*.10,m.silver);}
  }else{
   profile([[.18,-.035],[.67,-.015],[.73,.05],[.65,.17],[.20,.17]],.15,m.black);
   for(const side of[-1,1]){panel([[.16,.19],[.65,.19],[.70,.155],[.17,.145]],side*.084);panel([[.18,-.035],[.67,-.035],[.69,.005],[.18,.015]],side*.084);for(let i=0;i<5;i++)panel([[.22+i*.085,.16],[.25+i*.085,.16],[.215+i*.085,.005],[.19+i*.085,.005]],side*.086);}
   const length=marksman?.42:.27,center=marksman?.88:.805;cyl(.026,length,.075,center,m.steel);cyl(.045,.10,.075,marksman?1.10:.95,m.silver);cyl(.030,.008,.075,marksman?1.155:1.005,m.black);
   profile([[.01,-.055],[.15,-.05],[.23,-.32],[.10,-.36],[.015,-.29]],.10,m.black);for(const side of[-1,1]){for(let i=0;i<3;i++)panel([[.03+i*.035,-.08],[.04+i*.035,-.08],[.10+i*.035,-.30],[.085+i*.035,-.30]],side*.06);panel([[.07,-.35],[.23,-.32],[.23,-.35],[.07,-.38]],side*.058);}
   if(marksman){cyl(.045,.32,.31,.03,m.black);cyl(.065,.14,.31,.255,m.black);cyl(.064,.008,.31,.33,m.glass);cyl(.05,.07,.31,-.19,m.silver);for(const z of[-.08,.14])box(.075,.12,.055,0,.21,z,m.black);box(.08,.035,.24,0,.18,.03,m.silver);for(const side of[-1,1])pipe([[.36,-.07,side*.075],[.64,-.10,side*.09],[.72,-.06,side*.08]],.018,m.black);
   }else{profile([[-.02,.17],[.17,.17],[.15,.30],[.02,.30]],.085,m.black);box(.095,.025,.16,0,.30,.085,m.silver);box(.008,.065,.05,0,.25,.17,led);}
  }
  for(const z of[.23,.36,.49,.62])box(.13,.02,.018,0,.205,z,m.black);
 }
 // Material batches retain the reference detail while keeping carried props inexpensive.
 const bins=new Map();for(const mesh of [...art.children]){mesh.updateMatrix();const source=mesh.geometry.clone().applyMatrix4(mesh.matrix),g=source.index?source.toNonIndexed():source;if(g!==source)source.dispose();const list=bins.get(mesh.material)||[];list.push(g);bins.set(mesh.material,list);art.remove(mesh);mesh.geometry.dispose();}lights.length=0;for(const [material,list]of bins){const geometry=mergeGeometries(list),mesh=new THREE.Mesh(geometry,material);list.forEach(g=>g.dispose());mesh.receiveShadow=true;art.add(mesh);if(material===led){mesh.name='Z story status light';lights.push(mesh);}}
 geometryCache.set(id,art.children.map(mesh=>({geometry:mesh.geometry,material:mesh.material,light:mesh.material===led})));
 }
 const muzzle=new THREE.Object3D();muzzle.name='Existing gameplay muzzle anchor';muzzle.position.set(0,.045,pistol?.28:marksman?.70:.61);root.add(muzzle);root.userData.statusLights=lights;root.userData.statusMaterial=led;
 function setStatus(state){if(!['active','locked','off'].includes(state))throw Error('Unknown Z light status');const color=state==='active'?'#37ff59':state==='locked'?'#ff263e':'#18231b';led.color.set(color);led.emissive.set(color);led.emissiveIntensity=state==='off'?0:2.4;root.userData.lightState=state;}
 setStatus(locked?'locked':'active');return{root,muzzle,setStatus,setLocked(value){setStatus(value?'locked':'active')}};
}
