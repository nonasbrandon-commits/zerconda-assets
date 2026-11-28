import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {loadAdditionalGuestBytes} from './level10-additional-assets.js?v=487';
import {createHouseScanRig} from './house-scan-rig.js?v=490';
export function createHouseMidnight(parent){
 const root=new T.Group();root.name='Midnight Lace · house resident';root.userData.apartmentDynamic=true;parent.add(root);root.visible=false;
 let active=false,loading=false,loaded=false,error=null,rig,mode='idle';
 async function load(){if(loading||loaded)return;loading=true;try{const bytes=await loadAdditionalGuestBytes('midnight-lace'),g=await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(bytes,'');g.scene.updateMatrixWorld(true);const b=new T.Box3().setFromObject(g.scene),c=b.getCenter(new T.Vector3()),scale=1.72/(b.max.y-b.min.y),fit=new T.Group();fit.scale.setScalar(scale);fit.position.set(-c.x*scale,-b.min.y*scale,-c.z*scale);fit.add(g.scene);root.add(fit);rig=createHouseScanRig(fit,root);loaded=true;}catch(e){error=String(e);}finally{loading=false;}}
 return{root,setActive(v){v=!!v;if(v===active)return;active=v;root.visible=active;if(active)load();},setMotion(v){mode=v;},update(dt,moved=0){if(active&&rig)rig.update(dt,mode==='walk'?moved:0,mode==='sit');},stats:()=>({loaded,loading,error,mode,walk:rig?.stats()})};
}
