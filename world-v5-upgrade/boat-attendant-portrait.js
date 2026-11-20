import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const source=new GLTFLoader().loadAsync(new URL('./assets/boat-attendant-portrait-v166.glb',import.meta.url).href);
export async function fitAttendantPortrait(person){const g=await source,portrait=g.scene.clone(true);portrait.name='Reference brunette · coherent 3D upper body';person.root.updateWorldMatrix(true,true);
 person.root.traverse(o=>{if(o.isSkinnedMesh)o.visible=false;});
 portrait.position.set(0,1.25,.015);portrait.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});person.root.add(portrait);person.root.userData.portrait=portrait;return portrait;}
