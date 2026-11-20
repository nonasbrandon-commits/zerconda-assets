import * as THREE from 'three';
import {GLTFLoader}from'three/addons/loaders/GLTFLoader.js';
import {RoundedBoxGeometry}from'three/addons/geometries/RoundedBoxGeometry.js';
export const sedanColors=['#aeb6bf','#171c22','#e7e5df','#23354b','#592b38'];
let template,pending;const palettes=new Map();
export function loadLuxurySedan(){if(!pending)pending=new GLTFLoader().loadAsync(new URL('./assets/reference-sedan-v179.glb',import.meta.url).href).then(g=>{template=g.scene;template.updateMatrixWorld(true);return template;});return pending;}
export function createLuxurySedan({color=sedanColors[0]}={}){
 if(!template)throw Error('Reference sedan model must be loaded before creating cars');
 const root=template.clone(true);root.name='Reference luxury sedan · rounded body';root.userData.vehicleType='sedan';root.userData.cabinImproved=true;root.userData.paint=color;root.userData.referenceModel=true;
 if(!palettes.has(color)){const materials=new Map();template.traverse(o=>{if(o.isMesh)for(const m of(Array.isArray(o.material)?o.material:[o.material]))if(!materials.has(m.uuid)){let copy;if(m.name==='Sedan body paint'){copy=new THREE.MeshStandardMaterial({name:'Automotive paint · reference sedan '+color,color,metalness:.55,roughness:.27});copy.userData.referenceSedan=true;}else{copy=m;copy.side=THREE.FrontSide;}materials.set(m.uuid,copy);}});palettes.set(color,materials);}

 const materials=palettes.get(color);root.traverse(o=>{if(!o.isMesh)return;o.castShadow=true;o.receiveShadow=true;o.material=Array.isArray(o.material)?o.material.map(m=>materials.get(m.uuid)):materials.get(o.material.uuid);});const interior=new THREE.MeshStandardMaterial({color:0x20262c,roughness:.8});for(const side of[-1,1])for(const z of[-.95,.15]){const seat=new THREE.Mesh(new RoundedBoxGeometry(.49,.40,.12,2,.04),interior);seat.position.set(side*.40,.92,z-.20);seat.name='Dark leather seat back';root.add(seat);}const wheel=new THREE.Mesh(new THREE.TorusGeometry(.16,.019,8,24),interior);wheel.position.set(-.40,1.01,.48);wheel.rotation.x=-.25;wheel.name='Driver steering wheel';root.add(wheel);return root;
}
