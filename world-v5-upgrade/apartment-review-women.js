import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
const specifications=[['Pink satin · blonde updo',-1.0,1.70],['Black satin · long dark hair',1.0,1.68],['Red satin · curly updo',3.0,1.69]];
export function createApartmentReviewWomen(parent){
 const root=new T.Group();root.name='Three reference women · level 10 review';root.userData.customInterior=true;root.userData.apartmentDynamic=true;root.visible=false;parent.add(root);
 const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder),actors=[];let active=false,loading=false,generation=0,error=null;
 function releaseModel(model,mixer){mixer?.stopAllAction();mixer?.uncacheRoot(model);const gs=new Set(),ms=new Set(),ts=new Set();model.traverse(o=>{if(o.geometry)gs.add(o.geometry);for(const m of(Array.isArray(o.material)?o.material:[o.material]))if(m){ms.add(m);for(const v of Object.values(m))if(v?.isTexture)ts.add(v);}o.skeleton?.dispose();});for(const g of gs)g.dispose();for(const m of ms)m.dispose();for(const t of ts){t.dispose();t.source?.data?.close?.();}model.removeFromParent();}
 function clear(){for(const a of actors){releaseModel(a.model,a.mixer);a.group.removeFromParent();}actors.length=0;}
 async function load(){if(loading||actors.length||!active)return;loading=true;const ticket=generation;try{for(let i=0;i<3;i++){
  const gltf=await loader.loadAsync(new URL('./assets/turnaround-woman-'+(i+1)+'-idle-v458.glb',import.meta.url).href),model=gltf.scene;
  if(ticket!==generation||!active){releaseModel(model);return;}
  const group=new T.Group();group.name=specifications[i][0];group.position.set(specifications[i][1],0,-2.5);group.rotation.y=0;group.userData.customInterior=true;root.add(group);const fitting=new T.Group();group.add(fitting);fitting.add(model);parent.updateWorldMatrix(true,false);root.updateMatrixWorld(true);
  model.traverse(o=>o.skeleton?.update());const box=new T.Box3().setFromObject(model,true),size=box.getSize(new T.Vector3());if(!(size.y>.1&&size.y<100))throw Error('Invalid character dimensions');fitting.scale.multiplyScalar(specifications[i][2]/size.y);parent.updateWorldMatrix(true,false);root.updateMatrixWorld(true);model.traverse(o=>o.skeleton?.update());const fit=new T.Box3().setFromObject(model,true),origin=group.getWorldPosition(new T.Vector3()),center=fit.getCenter(new T.Vector3());group.worldToLocal(center);fitting.position.x-=center.x;fitting.position.z-=center.z;fitting.position.y+=origin.y-fit.min.y;
  const mixer=new T.AnimationMixer(model),clip=gltf.animations[0];if(!clip)throw Error('Character idle animation missing');mixer.clipAction(clip).play();mixer.setTime(i*.73);model.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;for(const m of(Array.isArray(o.material)?o.material:[o.material]))if(m?.map)m.map.anisotropy=4;}});actors.push({group,model,mixer});
 }}catch(e){error=String(e);clear();}finally{loading=false;if(active&&ticket!==generation)load();}}
 return{root,setActive(value){value=!!value;if(value===active)return;active=value;root.visible=value;generation++;if(value){error=null;load();}else clear();},update(dt){if(active)for(const a of actors)a.mixer.update(Math.min(dt,.1));},dispose(){active=false;generation++;clear();root.removeFromParent();},stats(){return{active,loaded:actors.length,loading,error};}};
}
