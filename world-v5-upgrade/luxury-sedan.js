import * as THREE from 'three';
import {GLTFLoader}from'three/addons/loaders/GLTFLoader.js';
export const sedanColors=['#aeb6bf','#171c22','#e7e5df','#23354b','#592b38'];
let template,pending;
export function loadLuxurySedan(){if(!pending)pending=new GLTFLoader().loadAsync(new URL('./assets/reference-sedan-v181.glb',import.meta.url).href).then(g=>{template=g.scene;template.name='Clean reference luxury sedan';template.traverse(o=>{if(!o.isMesh)return;o.castShadow=true;o.receiveShadow=true;for(const m of(Array.isArray(o.material)?o.material:[o.material])){m.side=THREE.FrontSide;for(const key of ['map','normalMap','roughnessMap','metalnessMap','aoMap'])if(m[key]){m[key].userData.preserveDetail=true;m[key].anisotropy=4;}}});template.updateMatrixWorld(true);return template;});return pending;}
export function createLuxurySedan({color=sedanColors[0]}={}){
 if(!template)throw Error('Reference sedan model must be loaded before creating cars');
 const root=template.clone(true);root.name='Reference luxury sedan · clean silver finish';root.userData.vehicleType='sedan';root.userData.cabinImproved=true;root.userData.paint='#b8bcc2';root.userData.requestedPaint=color;root.userData.referenceModel=true;
 // Keep the source PBR finish intact: tinting a combined atlas also recolors chrome, glass and tires.
 return root;
}
