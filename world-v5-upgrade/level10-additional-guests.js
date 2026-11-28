import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {loadAdditionalGuestBytes} from './level10-additional-assets.js?v=487';

// Preserve the supplied poses: these scans contain no skeleton or animation.
export function createAdditionalLevel10Guests(parent,{solids}) {
  const actors=[
    {id:'kayden',name:'Kayden',x:4.2,z:.1,height:1.7,yaw:.4},
    
  ].map(spec=>{
    const root=new THREE.Group();root.name='Level 10 · '+spec.name;
    Object.assign(root.userData,{customInterior:true,apartmentDynamic:true,npcIdentity:spec.name,characterSource:spec.name+' by Zizian1987 · CC BY 4.0'});
    root.position.set(spec.x,0,spec.z);root.rotation.y=spec.yaw;root.visible=false;parent.add(root);
    return {...spec,root,collider:{x:spec.x,z:spec.z,w:.9,d:.85},loaded:false,pending:null,error:null};
  });
  let active=false;
  async function loadActor(a) {
    if(a.loaded)return;if(a.pending)return a.pending;
    a.pending=(async()=>{
      try {
        const bytes=await loadAdditionalGuestBytes(a.id);
        const {scene}=await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(bytes,'');
        scene.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(scene);
        const size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
        if(!Number.isFinite(size.y)||size.y<.1)throw Error('Invalid character dimensions');
        const scale=a.height/size.y,fitting=new THREE.Group();fitting.scale.setScalar(scale);
        fitting.position.set(-center.x*scale,-bounds.min.y*scale,-center.z*scale);fitting.add(scene);a.root.add(fitting);
        scene.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=true;}});
        a.loaded=true;a.error=null;
      }catch(e){a.error=String(e);throw e;}finally{a.pending=null;}
    })();return a.pending;
  }
  function setActive(value){active=!!value;for(const a of actors){a.root.visible=active;const i=solids.indexOf(a.collider);if(active&&i<0)solids.push(a.collider);if(!active&&i>=0)solids.splice(i,1);if(active)loadActor(a).catch(()=>{});}}
  return {setActive,load:()=>Promise.all(actors.map(loadActor)),stats:()=>({active,actors:actors.map(a=>({id:a.id,x:a.x,z:a.z,loaded:a.loaded,error:a.error,height:a.height}))})};
}
