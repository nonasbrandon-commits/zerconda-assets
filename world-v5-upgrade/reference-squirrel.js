import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';
let source;
export function createReferenceSquirrel(parent,{x=0,z=0,phase=0}={}){
 const group=new THREE.Group();group.name='Realistic gray squirrel · reference model';group.position.set(x,.006,z);group.userData.dynamicScenery=true;group.userData.realisticSquirrel=true;group.visible=false;parent.add(group);let model,ready=false,baseY=0;const bones=[],soles=[],point=new THREE.Vector3();
 source??=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(new URL('./assets/realistic-squirrel-v276.glb',import.meta.url).href);
 source.then(g=>{model=cloneSkeleton(g.scene);group.add(model);group.updateMatrixWorld(true);const b=new THREE.Box3().setFromObject(model,true);model.position.y+=group.position.y-b.min.y;baseY=model.position.y;group.updateMatrixWorld(true);model.traverse(o=>{if(o.isBone)bones.push({bone:o,q:o.quaternion.clone()});if(o.isMesh){o.castShadow=o.receiveShadow=true;if(o.material?.map)o.material.map.anisotropy=8;if(o.isSkinnedMesh){const ids=[];for(let i=0;i<o.geometry.attributes.position.count;i++){o.getVertexPosition(i,point).applyMatrix4(o.matrixWorld);if(point.y<group.position.y+.045)ids.push(i)}soles.push({mesh:o,ids:ids.filter((_,i)=>i%Math.max(1,Math.floor(ids.length/64))===0)})}}});group.userData.referenceSource='Zerconda_Realistic_Squirrel_Views_and_Walking.zip';group.userData.ready=true;ready=true;}).catch(error=>{group.userData.loadError=String(error);console.warn('Reference squirrel unavailable',error)});
 function animate({moving,time}){group.visible=ready;if(!ready)return;const cycle=time*24+phase;for(const {bone,q}of bones){bone.quaternion.copy(q);const n=bone.name;if(/(?:Front|Hind)Upper$/.test(n)){const offset=(n[0]==='L'?0:Math.PI)+(/Hind/.test(n)?Math.PI:0);bone.rotation.x+=moving?Math.sin(cycle+offset)*.46:0}else if(/(?:Front|Hind)Lower$/.test(n)){const offset=(n[0]==='L'?0:Math.PI)+(/Hind/.test(n)?Math.PI:0),swing=Math.sin(cycle+offset);bone.rotation.x+=moving?Math.max(0,-swing)*.38-swing*.16:0}else if(n==='Head')bone.rotation.z+=Math.sin(time*1.1+phase)*.035;else if(n==='TailBase')bone.rotation.z+=Math.sin(time*(moving?5:1.5)+phase)*.07;else if(n==='TailTip')bone.rotation.x+=Math.sin(time*1.8+phase)*.045;}
 model.position.y=baseY;group.updateMatrixWorld(true);let min=Infinity;for(const s of soles)for(const i of s.ids)min=Math.min(min,s.mesh.getVertexPosition(i,point).applyMatrix4(s.mesh.matrixWorld).y);if(Number.isFinite(min))model.position.y+=group.position.y-min;group.updateMatrixWorld(true);
 }
 return{group,animate,realistic:true,phase,get ready(){return ready}};
}
