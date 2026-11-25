import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
export function createBeachKate(scene,{beach,getPlayer}={}){
 const lounge=[...beach.lounges].filter(l=>!l.seat.npcOccupant).sort((a,b)=>Math.hypot(a.seat.x+92,a.seat.z-207)-Math.hypot(b.seat.x+92,b.seat.z-207))[0];if(!lounge)throw Error('Kate needs a free beach lounge');lounge.seat.npcOccupant='Kate';lounge.setFlatResting(true);
 const group=new THREE.Group();group.name='Kate · reclining beach guest';group.userData.displayName='Kate';group.userData.dynamicScenery=true;group.userData.cameraPassThrough=true;group.position.copy(lounge.root.position);group.rotation.y=lounge.root.rotation.y;group.visible=false;scene.add(group);
 const asset=new URL('./assets/kate-reclining-v387.glb',import.meta.url).href,profile={name:'Kate',gender:'woman',height:1.60,model:asset,role:'Beach guest · resting on a lounger',area:'Beach',outfit:'Pink floral G-string bikini · copper shoulder-length curls'},root=new THREE.Group();group.add(root);let ready=false,promise=null,retry=0,time=0;
 async function load(){if(ready)return root;if(promise)return promise;promise=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(asset).then(g=>{root.add(g.scene);g.scene.traverse(o=>{if(o.isMesh){o.receiveShadow=true;o.castShadow=false;}});ready=true;return root;}).catch(e=>{promise=null;retry=time+20;throw e});return promise;}
 function update(dt){time+=dt;if(group.userData.adminDeleted){if(lounge.seat.npcOccupant==='Kate')delete lounge.seat.npcOccupant;group.visible=false;return;}if(lounge.seat.npcOccupant&&lounge.seat.npcOccupant!=='Kate'){group.visible=false;return;}lounge.seat.npcOccupant='Kate';const p=getPlayer(),near=Math.hypot(p.x-group.position.x,p.z-group.position.z)<100;if(near&&!ready&&!promise&&time>=retry)load().catch(e=>{group.userData.loadError=String(e)});group.visible=near&&ready;}
 const human={root,load,update(){},get ready(){return ready}};return{category:'Beach visitor',profile,group,human,lounge,update,get ready(){return ready},blocks(){return false}};
}
