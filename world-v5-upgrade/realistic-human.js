import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';

const BASE=new URL('../realistic-assets/characters/casual-human/',import.meta.url);
let sourcePromise;
const outfitCache=new Map();
function source(){
 if(!sourcePromise){
  const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  sourcePromise=Promise.all(['human.glb','idle.glb','walk.glb','run.glb','dance.glb'].map(file=>loader.loadAsync(new URL(file,BASE).href)));
 }
 return sourcePromise;
}
function colorClothes(mesh,shirt,pants){
 if(!/body/i.test(mesh.material.name)||!mesh.material.map?.image)return;
 const cacheKey=mesh.material.name+':'+shirt+':'+pants;
 if(outfitCache.has(cacheKey)){mesh.material=outfitCache.get(cacheKey);return;}
 const image=mesh.material.map.image,w=image.width,h=image.height;
 const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);
 const pixels=ctx.getImageData(0,0,w,h),mask=document.createElement('canvas');mask.width=w;mask.height=h;const mc=mask.getContext('2d');
 const pos=mesh.geometry.attributes.position,uv=mesh.geometry.attributes.uv,index=mesh.geometry.index;
 const point=new THREE.Vector3(),center=new THREE.Vector3();
 const bounds=new THREE.Box3().setFromObject(mesh,true),height=bounds.max.y-bounds.min.y;
 function region(part){
  mc.clearRect(0,0,w,h);mc.fillStyle='#fff';
  for(let i=0;i<(index?.count||pos.count);i+=3){
   const ids=[0,1,2].map(j=>index?index.getX(i+j):i+j);center.set(0,0,0);
   for(const id of ids)center.add(mesh.getVertexPosition(id,point).applyMatrix4(mesh.matrixWorld));center.multiplyScalar(1/3);
   const y=(center.y-bounds.min.y)/height,x=Math.abs(center.x-(bounds.min.x+bounds.max.x)/2)/height;
   const match=part==='shirt'?y>.56:y>.075&&y<.65&&x<.18;
   if(!match)continue;
   mc.beginPath();ids.forEach((id,n)=>{const u=uv.getX(id)*w,v=(mesh.material.map.flipY?1-uv.getY(id):uv.getY(id))*h;n?mc.lineTo(u,v):mc.moveTo(u,v);});mc.closePath();mc.fill();
  }
  return mc.getImageData(0,0,w,h).data;
 }
 for(const [part,color] of [['shirt',shirt],['pants',pants]]){
  const coverage=region(part),rgb=new THREE.Color(color);rgb.convertLinearToSRGB();
  for(let i=0;i<pixels.data.length;i+=4){if(coverage[i+3]<128)continue;
   const r=pixels.data[i]/255,g=pixels.data[i+1]/255,b=pixels.data[i+2]/255,l=.2126*r+.7152*g+.0722*b;
   if(part==='shirt'&&r>g*1.18&&r>b*1.25)continue;
   const shade=part==='shirt'?Math.max(.15,l):Math.min(1,.48+Math.sqrt(l)*.95);
   pixels.data[i]=Math.round(rgb.r*255*shade);pixels.data[i+1]=Math.round(rgb.g*255*shade);pixels.data[i+2]=Math.round(rgb.b*255*shade);
  }
 }
 ctx.putImageData(pixels,0,0);mesh.material=mesh.material.clone();const texture=new THREE.CanvasTexture(canvas);texture.flipY=mesh.material.map.flipY;texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;mesh.material.map=texture;
 outfitCache.set(cacheKey,mesh.material);
}

export function createRealisticHuman({shirt=0x3e83ad,pants=0xb39568,onReady=()=>{}}={}){
 const root=new THREE.Group();root.name='Textured realistic human';
 let mixer,actions,bones=[],active=null,ready=false;
 const soles=[],vertex=new THREE.Vector3(),parentPoint=new THREE.Vector3();
 const controller={root,get ready(){return ready;},update(dt,speed,options={}){
  if(!ready)return;
  const {seated=false,backwards=false}=options;
  const mode=options.dancing?'dance':speed>.08?(speed>3.4?'run':'walk'):'idle';
  if(active!==mode){actions[mode].reset().fadeIn(.22).play();if(active)actions[active].fadeOut(.22);active=mode;}
  actions.walk.timeScale=(backwards?-1:1)*THREE.MathUtils.clamp(speed/1.35,.3,2.0);
  actions.run.timeScale=THREE.MathUtils.clamp(speed/4.1,.6,1.5);mixer.update(Math.min(dt,.08));
  // Authored clips animate the skeleton in place; world movement is game-controlled.
  const hip=bones.find(b=>b.name==='Bip01');if(hip){hip.position.x=hip.userData.restX;hip.position.z=hip.userData.restZ;}
  root.updateWorldMatrix(true,false);root.updateMatrixWorld(true);
  let lowest=Infinity;
  for(const {mesh,ids} of soles)for(const id of ids)lowest=Math.min(lowest,mesh.getVertexPosition(id,vertex).applyMatrix4(mesh.matrixWorld).y);
  if(Number.isFinite(lowest)){const parentY=root.parent?.getWorldPosition(parentPoint).y||0;root.position.y+=parentY-lowest;}
  if(seated){for(const bone of bones){if(/thigh$/i.test(bone.name))bone.rotation.z+=1.1;if(/calf$/i.test(bone.name))bone.rotation.z-=1.3;}}
 }};
 controller.readyPromise=source().then(([character,idle,walk,run,dance])=>{
  character.scene.updateMatrixWorld(true);
  const model=cloneSkeleton(character.scene);model.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(model,true),size=bounds.getSize(new THREE.Vector3());
  model.scale.multiplyScalar(1.86/size.y);model.updateMatrixWorld(true);
  const placed=new THREE.Box3().setFromObject(model,true),center=placed.getCenter(new THREE.Vector3());model.position.set(-center.x,-placed.min.y,-center.z);root.add(model);root.updateWorldMatrix(true,false);root.updateMatrixWorld(true);
  const floor=root.getWorldPosition(parentPoint).y;
  model.traverse(mesh=>{if(mesh.isBone){mesh.userData.restX=mesh.position.x;mesh.userData.restZ=mesh.position.z;bones.push(mesh);}if(mesh.isMesh){
   mesh.castShadow=true;mesh.receiveShadow=true;colorClothes(mesh,shirt,pants);
   if(mesh.isSkinnedMesh){const ids=[];for(let id=0;id<mesh.geometry.attributes.position.count;id++)if(mesh.getVertexPosition(id,vertex).applyMatrix4(mesh.matrixWorld).y<floor+.16)ids.push(id);if(ids.length)soles.push({mesh,ids});}
  }});
  mixer=new THREE.AnimationMixer(model);actions={idle:mixer.clipAction(idle.animations[0]),walk:mixer.clipAction(walk.animations[0]),run:mixer.clipAction(run.animations[0]),dance:mixer.clipAction(dance.animations[0])};
  ready=true;controller.update(0,0);onReady();return controller;
 }).catch(error=>{console.error('Realistic character load failed',error);return controller;});
 return controller;
}

