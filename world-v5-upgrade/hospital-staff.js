import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
// CC0 Innerscene/MakeHuman assets, optimized offline; no per-frame skeleton work.
export function createHospitalStaff(parent,{getLocalPlayer,addBlock}){
 const root=new THREE.Group();root.name='Hospital medical and reception staff';parent.add(root);
 const specs=[{id:'receptionist',name:'Mei · Hospital receptionist',x:0,z:.35,height:1.68},{id:'doctor',name:'Jordan · Hospital doctor',x:-3.3,z:-.25,height:1.82},{id:'nurse',name:'Alex · Hospital nurse',x:3.3,z:-.25,height:1.70}];
 const people=specs.map(s=>{const group=new THREE.Group();group.name=s.name;group.position.set(s.x,0,s.z);group.userData.npcIdentity=s.name;group.userData.hospitalRole=s.id;root.add(group);addBlock(s.x,s.z,.55,.50);return{...s,group,loaded:false};});
 let pending=null,index=0,failed=false;const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
 function load(){if(pending||index>=people.length||failed)return pending;const person=people[index];pending=loader.loadAsync(new URL('./assets/hospital-'+person.id+'-v400.glb',import.meta.url).href).then(g=>{const bounds=new THREE.Box3().setFromObject(g.scene),size=bounds.getSize(new THREE.Vector3()),scale=person.height/size.y;g.scene.scale.setScalar(scale);g.scene.position.set(-(bounds.min.x+bounds.max.x)*scale/2,-bounds.min.y*scale,-(bounds.min.z+bounds.max.z)*scale/2);g.scene.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=true;}});person.group.add(g.scene);person.loaded=true;index++;}).catch(e=>{failed=true;root.userData.loadError=String(e);}).finally(()=>{pending=null;});return pending;}
 function update(){const p=getLocalPlayer(),distance=Math.hypot(p.x,p.z);root.visible=distance<48;if(distance<68)load();}
 return{root,people,load,update,get ready(){return index===people.length},get loaded(){return index},get pending(){return pending}};
}
