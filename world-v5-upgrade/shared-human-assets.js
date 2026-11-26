import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
const base=new URL('../realistic-assets/characters/casual-human/',import.meta.url);let pending;
export function loadSharedHumanAssets(){return pending??=Promise.all(['human.glb','idle.glb','walk.glb','run.glb','dance.glb'].map(file=>new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(new URL(file,base).href))).then(bundle=>{for(let i=0;i<bundle.length;i++){const g=bundle[i];delete g.parser;if(i>0){for(const scene of g.scenes||[g.scene])scene?.clear();}}return bundle;});}
