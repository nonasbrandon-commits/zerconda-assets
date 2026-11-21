import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
const cache=new Map(),loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
export function loadStreetTree(kind='small'){if(!cache.has(kind)){const url=new URL('./assets/street-tree-'+kind+'-v205.glb',import.meta.url).href;cache.set(kind,loader.loadAsync(url).then(g=>g.scene));}return cache.get(kind);}
