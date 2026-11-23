import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);let source;
export function createPierReferenceWoman(){
 const root=new THREE.Group();root.name='Pier boat attendant · approved red swimsuit reference';let ready=false,model,time=0;
 const api={root,get ready(){return ready},get state(){return{source:'approved body and head reference',ready}},update(dt){if(!ready)return;time+=Math.min(.1,Math.max(0,dt));model.scale.y=model.userData.restScaleY*(1+Math.sin(time*1.3)*.0007);},setHair(){},setOutfit(){}};
 source??=loader.loadAsync(new URL('./assets/pier-reference-woman-v274.glb',import.meta.url).href);
 api.readyPromise=source.then(g=>{model=g.scene.clone(true);model.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3());if(size.y<.01)throw Error('Pier attendant model has no height');model.scale.multiplyScalar(1.73/size.y);model.updateMatrixWorld(true);const fitted=new THREE.Box3().setFromObject(model),center=fitted.getCenter(new THREE.Vector3());model.position.set(-center.x,-fitted.min.y,-center.z);model.userData.restScaleY=model.scale.y;model.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;for(const m of(Array.isArray(o.material)?o.material:[o.material]))if(m?.map)m.map.anisotropy=8;}});root.add(model);root.userData.height=1.73;root.userData.modelAsset='assets/pier-reference-woman-v274.glb';root.userData.referenceSource='Zerconda_Red_Bikini_Character_Body_and_Head_Views.zip';ready=true;return api;}).catch(error=>{root.userData.loadError=String(error);console.error('Reference pier attendant load failed',error);return api;});
 return api;
}
