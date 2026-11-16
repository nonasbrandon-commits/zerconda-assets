import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Optional Kenney CC0 building accents: 19 distinct commercial GLB models
// already committed under realistic-assets/cc0-city-buildings.
// This module never blocks world startup and does not replace existing collision meshes.
const BASE='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/cc0-city-buildings/';
const NAMES=['commercial-building-a','commercial-building-b','commercial-building-c','commercial-building-d','commercial-building-e','commercial-building-f','commercial-building-g','commercial-building-h','commercial-building-i','commercial-building-j','commercial-building-k','commercial-building-l','commercial-building-m','commercial-building-n','commercial-building-skyscraper-a','commercial-building-skyscraper-b','commercial-building-skyscraper-c','commercial-building-skyscraper-d','commercial-building-skyscraper-e'];
export function loadVariedBuildingModels({scene,locations=[],maxHeight=28}={}){
 const loader=new GLTFLoader(),loaded=[];
 for(let i=0;i<locations.length;i++){
  const location=locations[i],name=NAMES[i%NAMES.length];
  loader.load(BASE+name+'.glb',gltf=>{
   const model=gltf.scene;
   const bounds=new THREE.Box3().setFromObject(model);
   const size=bounds.getSize(new THREE.Vector3());
   if(size.x<.001||size.y<.001||size.z<.001)return;
   // Keep proportions; fit models to lots without huge, distorted geometry.
   const scale=Math.min((location.w||18)/size.x,(location.d||18)/size.z,(location.h||maxHeight)/size.y);
   if(!Number.isFinite(scale)||scale<=0)return;
   model.scale.setScalar(scale);
   model.updateMatrixWorld(true);
   const fitted=new THREE.Box3().setFromObject(model);
   const center=fitted.getCenter(new THREE.Vector3());
   model.position.set(location.x-center.x,-fitted.min.y,location.z-center.z);
   model.traverse(obj=>{if(obj.isMesh){obj.castShadow=true;obj.receiveShadow=true;}});
   scene.add(model);loaded.push(model);
  },undefined,error=>console.warn('Optional CC0 building not available:',name,error));
 }
 return {loaded,dispose(){for(const model of loaded)scene.remove(model);}};
}
