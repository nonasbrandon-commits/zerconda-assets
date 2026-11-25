import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {poseSeatedResident} from './seated-resident.js?v=20261124-routines-v347';
// Existing detailed Microsoft Rocketbox community assets, MIT; no placeholder bodies.
export function createHospitalVisitors(parent,{getLocalPlayer,world}){
 const root=new THREE.Group();root.name='Hospital seated waiting visitors';parent.add(root);
 const specs=[{name:'Danielle',asset:'00',height:1.67,x:-4.26,z:9.64,facing:Math.PI/2},{name:'Brian',asset:'05',height:1.81,x:4.26,z:11.08,facing:-Math.PI/2}];
 const people=specs.map(s=>{const group=new THREE.Group();group.name=s.name+' · waiting visitor';group.position.set(s.x,0,s.z);group.rotation.y=s.facing;group.userData.npcIdentity=s.name+' · hospital visitor';group.userData.license='MIT · Copyright 2020 Microsoft';root.add(group);return{...s,group,loaded:false};});
 const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);let pending=null,index=0,retry=0;
 async function load(){if(pending||index===people.length||performance.now()<retry)return pending;const person=people[index];pending=(async()=>{
  const gltf=await loader.loadAsync(new URL('./assets/community-'+person.asset+'-v342.glb',import.meta.url).href),model=gltf.scene,body=new THREE.Group();person.group.add(body);body.add(model);
  model.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(model,true),height=bounds.max.y-bounds.min.y;if(!Number.isFinite(height)||height<.1)throw Error('Invalid visitor bounds');
  const scale=person.height/height;model.scale.multiplyScalar(scale);model.position.set(-(bounds.min.x+bounds.max.x)*scale/2,-bounds.min.y*scale,-(bounds.min.z+bounds.max.z)*scale/2);
  const bones=[];model.traverse(o=>{if(o.isBone)bones.push(o);});
  poseSeatedResident({root:body,bones},{sitHeight:.61,restHands:true,kind:'hospital waiting chair'},person.asset==='00'?2:9);
  parent.updateWorldMatrix(true,true);model.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
  // Freeze the authored seated pose once; no animation mixer or skeleton work each frame.
  const baked=new THREE.Group(),inverse=person.group.matrixWorld.clone().invert(),point=new THREE.Vector3();
  model.traverse(o=>{if(!o.isMesh)return;const geometry=o.geometry.clone(),positions=new THREE.Float32BufferAttribute(new Float32Array(o.geometry.attributes.position.count*3),3);geometry.setAttribute('position',positions);geometry.setAttribute('normal',new THREE.Float32BufferAttribute(new Float32Array(positions.count*3),3));for(let i=0;i<positions.count;i++){o.getVertexPosition(i,point);positions.setXYZ(i,point.x,point.y,point.z);}geometry.deleteAttribute('skinIndex');geometry.deleteAttribute('skinWeight');geometry.morphAttributes={};geometry.computeVertexNormals();geometry.applyMatrix4(inverse.clone().multiply(o.matrixWorld));geometry.computeBoundingBox();geometry.computeBoundingSphere();const mesh=new THREE.Mesh(geometry,o.material);mesh.name=person.name+' · seated detailed mesh';mesh.receiveShadow=true;mesh.castShadow=false;baked.add(mesh);});
  person.group.remove(body);person.group.add(baked);person.loaded=true;index++;
 })().catch(error=>{root.userData.loadError=String(error);retry=performance.now()+15000;for(const child of [...person.group.children])person.group.remove(child);}).finally(()=>pending=null);return pending;}
 function update(){const p=getLocalPlayer(),near=Math.hypot(p.x+19,p.z-12)<65;root.visible=near;if(near)load();}
 return{root,people,load,update,get ready(){return index===people.length},get loaded(){return index},get reservedSeats(){return people.filter(p=>p.loaded).map(p=>world(p.x,p.z));}};
}
