import {loadSharedHumanAssets} from './shared-human-assets.js?v=423';
import {waitForNearbyHuman} from './nearby-human-memory.js?v=423';
import {humanStep} from "./human-runtime-budget.js?v=20261125-no-hats-v421";
import {scheduleNpcSetup} from './npc-startup-queue.js?v=20261121-fast-start-v205';
import {createHairCustomizer} from './hair-styles.js?v=20261117-style-cuts-v88';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';

const BASE=new URL('../realistic-assets/characters/casual-human/',import.meta.url);
let sourcePromise;
const outfitCache=new Map(),garmentRegions=new WeakMap();
let footContactTexture;
function contactTexture(){if(footContactTexture)return footContactTexture;const c=document.createElement('canvas');c.width=c.height=64;const a=c.getContext('2d'),g=a.createRadialGradient(32,32,2,32,32,31);g.addColorStop(0,'rgba(18,25,20,.8)');g.addColorStop(.45,'rgba(18,25,20,.45)');g.addColorStop(1,'rgba(18,25,20,0)');a.fillStyle=g;a.fillRect(0,0,64,64);return footContactTexture=new THREE.CanvasTexture(c);}

function source(){return loadSharedHumanAssets();}

function colorClothes(mesh,shirt,pants,options={}){
 if(mesh.userData.wardrobeBase)mesh.material=mesh.userData.wardrobeBase;else mesh.userData.wardrobeBase=mesh.material;
 if(!/body/i.test(mesh.material.name)||!mesh.material.map?.image)return;
 const cacheKey=mesh.material.name+':'+shirt+':'+pants+':'+(options.shoes||'#303b40')+':'+!!options.shorts+':'+!!options.tee;
 if(outfitCache.has(cacheKey)){mesh.material=outfitCache.get(cacheKey);return;}
 const image=mesh.material.map.image,w=Math.min(1024,image.width),h=Math.round(image.height*w/image.width);
 const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0,w,h);
 const pixels=ctx.getImageData(0,0,w,h),mask=document.createElement('canvas');mask.width=w;mask.height=h;const mc=mask.getContext('2d');
 const pos=mesh.geometry.attributes.position,uv=mesh.geometry.attributes.uv,index=mesh.geometry.index;
 const point=new THREE.Vector3(),center=new THREE.Vector3();
 const bounds=new THREE.Box3().setFromObject(mesh,true),height=bounds.max.y-bounds.min.y;
 function region(part){
  let regions=garmentRegions.get(mesh.geometry);if(!regions){regions=new Map();garmentRegions.set(mesh.geometry,regions);}const regionKey=w+':'+h+':'+!!mesh.material.map.flipY+':'+part;if(regions.has(regionKey))return regions.get(regionKey);
  mc.clearRect(0,0,w,h);mc.fillStyle='#fff';
  for(let i=0;i<(index?.count||pos.count);i+=3){
   const ids=[0,1,2].map(j=>index?index.getX(i+j):i+j);center.set(0,0,0);
   for(const id of ids)center.add(mesh.getVertexPosition(id,point).applyMatrix4(mesh.matrixWorld));center.multiplyScalar(1/3);
   const y=(center.y-bounds.min.y)/height,x=Math.abs(center.x-(bounds.min.x+bounds.max.x)/2)/height;
   const armWeight=mesh.isSkinnedMesh&&part==='sleeves'?ids.reduce((sum,id)=>{let weight=0;for(let k=0;k<4;k++){const bi=mesh.geometry.attributes.skinIndex.getComponent(id,k),bw=mesh.geometry.attributes.skinWeight.getComponent(id,k);if(/Forearm|Hand/i.test(mesh.skeleton.bones[bi]?.name||''))weight+=bw;}return sum+weight;},0)/3:0;
   const match=part==='shirt'?y>.56:part==='pants'?y>.075&&y<.65&&x<.18:part==='shoes'?y<.085:part==='shorts'||part==='sleeves'?true:false;
   if(!match)continue;
   let poly=ids.map(id=>{const p=mesh.getVertexPosition(id,new THREE.Vector3()).applyMatrix4(mesh.matrixWorld);let arm=0;if(mesh.isSkinnedMesh)for(let k=0;k<4;k++){const bi=mesh.geometry.attributes.skinIndex.getComponent(id,k);if(/Forearm|Hand/i.test(mesh.skeleton.bones[bi]?.name||''))arm+=mesh.geometry.attributes.skinWeight.getComponent(id,k);}return {u:uv.getX(id)*w,v:(mesh.material.map.flipY?1-uv.getY(id):uv.getY(id))*h,y:(p.y-bounds.min.y)/height,arm};});
   function clip(key,value,greater){const out=[];for(let j=0;j<poly.length;j++){const a=poly[j],b=poly[(j+1)%poly.length],inside=v=>greater?v[key]>=value:v[key]<=value,ai=inside(a),bi=inside(b);if(ai)out.push(a);if(ai!==bi){const t=(value-a[key])/(b[key]-a[key]);out.push(Object.fromEntries(['u','v','y','arm'].map(k=>[k,a[k]+(b[k]-a[k])*t])));}}poly=out;}
   if(part==='shorts'){clip('y',.085,true);clip('y',.34,false);}if(part==='sleeves')clip('arm',.45,true);if(poly.length<3)continue;mc.beginPath();poly.forEach((p,n)=>n?mc.lineTo(p.u,p.v):mc.moveTo(p.u,p.v));mc.closePath();mc.fill();
  }
  const coverage=mc.getImageData(0,0,w,h).data;regions.set(regionKey,coverage);return coverage;
 }
 for(const [part,color] of [['shirt',shirt],['pants',pants],['shoes',options.shoes||'#303b40'],...(options.shorts?[['shorts','#c3997e']]:[]),...(options.tee?[['sleeves','#c3997e']]:[])]){
  const coverage=region(part),rgb=new THREE.Color(color);rgb.convertLinearToSRGB();
  for(let i=0;i<pixels.data.length;i+=4){if(coverage[i+3]<128)continue;
   const r=pixels.data[i]/255,g=pixels.data[i+1]/255,b=pixels.data[i+2]/255,l=.2126*r+.7152*g+.0722*b;
   if(part==='shirt'&&r>g*1.18&&r>b*1.25)continue;
   const shade=part==='shorts'||part==='sleeves'?.91+l*.055:part==='shirt'?Math.max(.15,l):Math.min(1,.48+Math.sqrt(l)*.95);
   pixels.data[i]=Math.round(rgb.r*255*shade);pixels.data[i+1]=Math.round(rgb.g*255*shade);pixels.data[i+2]=Math.round(rgb.b*255*shade);
  }
 }
 ctx.putImageData(pixels,0,0);mesh.material=mesh.material.clone();const texture=new THREE.CanvasTexture(canvas);texture.flipY=mesh.material.map.flipY;texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;mesh.material.map=texture;
 if((options.shorts||options.tee)&&mesh.material.normalMap?.image){const nc=document.createElement('canvas');nc.width=w;nc.height=h;const nctx=nc.getContext('2d');nctx.drawImage(mesh.material.normalMap.image,0,0,w,h);const normal=nctx.getImageData(0,0,w,h);for(const part of [...(options.shorts?['shorts']:[]),...(options.tee?['sleeves']:[])]){const coverage=region(part);for(let i=0;i<normal.data.length;i+=4)if(coverage[i+3]>127){normal.data[i]=128;normal.data[i+1]=128;normal.data[i+2]=255;}}nctx.putImageData(normal,0,0);const nt=new THREE.CanvasTexture(nc);nt.flipY=mesh.material.normalMap.flipY;mesh.material.normalMap=nt;}
 outfitCache.set(cacheKey,mesh.material);if(outfitCache.size>64){const first=outfitCache.keys().next().value;outfitCache.delete(first);/* Active meshes own these materials; evicting a cache entry must not dispose their GPU resources. */}
}

export function createRealisticHuman({shirt=0x3e83ad,pants=0xb39568,onReady=()=>{}}={}){
 const root=new THREE.Group();root.name='Textured realistic human';
 let hairRig=null,hairChoice=null;const contacts=[];
 let mixer,actions,bones=[],active=null,ready=false,outfit={shirt,pants},wearables=[];
 function clearWearables(){for(const g of wearables){g.parent?.remove(g);g.traverse(o=>{o.geometry?.dispose();if(o.material&&!Array.isArray(o.material))o.material.dispose();});}wearables=[];}
 function applyOutfit(){if(!ready)return;root.traverse(mesh=>{if(mesh.isMesh&&mesh.userData.wardrobeBase)colorClothes(mesh,outfit.shirt,outfit.pants,outfit);});clearWearables();root.updateMatrixWorld(true);const mat=c=>new THREE.MeshStandardMaterial({color:c,roughness:.55}),black=mat(0x17252b),accent=mat(outfit.accessoryColor||0x8f6a45),gold=mat(0xc2a16a);
 function add(g,geo,m,x,y,z){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;}
 function attach(g,bone){root.add(g);root.updateMatrixWorld(true);bone?.attach(g);wearables.push(g);}
 const head=bones.find(b=>/Head$/i.test(b.name));
 if(outfit.glasses){const g=new THREE.Group();for(const side of [-1,1]){add(g,new RoundedBoxGeometry(.067,.042,.024,2,.01),black,side*.04,1.705,.137);const arm=add(g,new THREE.BoxGeometry(.012,.012,.12),black,side*.079,1.715,.08);}add(g,new THREE.BoxGeometry(.025,.012,.018),gold,0,1.715,.145);attach(g,head);}
 if(outfit.bag&&outfit.bag!=='none'){const g=new THREE.Group(),px=outfit.bag==='purse'?-.31:.22,py=outfit.bag==='purse'?.78:.92;add(g,new RoundedBoxGeometry(.23,.21,.10,3,.025),accent,px,py,.08);add(g,new THREE.BoxGeometry(.04,.03,.012),gold,px,py+.02,.14);const handle=add(g,new THREE.TorusGeometry(.08,.012,8,20,Math.PI),accent,px,py+.11,.08);if(outfit.bag==='crossbody'){const strap=add(g,new THREE.BoxGeometry(.025,.72,.025),accent,.03,1.28,.13);strap.rotation.z=.5;}attach(g,outfit.bag==='purse'?bones.find(b=>/L_Hand$|L Hand$/.test(b.name)):bones.find(b=>/Spine1$/.test(b.name)));}
 if(hairChoice)hairRig?.apply(hairChoice);
 }
 const soles=[],vertex=new THREE.Vector3(),parentPoint=new THREE.Vector3();
 const controller={root,setHair(value={}){hairChoice={style:value.style||'original',color:value.color||'#4a3224'};if(ready){hairRig?.apply(hairChoice);for(const g of wearables)if(g.userData.isHat)g.visible=false;}return {...hairChoice};},get hair(){return hairChoice?{...hairChoice}:{style:'original',color:'#4a3224'};},setOutfit(value={}){outfit={shirt,pants,...value,hat:'none'};applyOutfit();return {...outfit};},get outfit(){return {...outfit};},get ready(){return ready;},update(dt,speed,options={}){
  if(!ready)return;
  const step=humanStep(root,dt);if(step===null)return;dt=step;
  const {seated=false,backwards=false}=options;
  const running=speed>(active==='run'?4.1:4.5);
  const mode=options.dancing?'dance':speed>.08?(running?'run':'walk'):'idle';
  if(active!==mode){actions[mode].reset().fadeIn(.22).play();if(active)actions[active].fadeOut(.22);active=mode;}
  actions.walk.timeScale=(backwards?-1:1)*THREE.MathUtils.clamp(speed/1.35,.3,2.8);
  actions.run.timeScale=THREE.MathUtils.clamp(speed/3.25,.65,2.6);mixer.update(Math.min(dt,.15));
  // Authored clips animate the skeleton in place; world movement is game-controlled.
  const hip=bones.find(b=>b.name==='Bip01');if(hip){hip.position.x=hip.userData.restX;hip.position.z=hip.userData.restZ;}
  if(options.skating){for(const bone of bones){if(/thigh$/i.test(bone.name))bone.rotation.z+=.26;if(/calf$/i.test(bone.name))bone.rotation.z-=.5;if(/foot$/i.test(bone.name))bone.rotation.z+=.24;if(/UpperArm$/i.test(bone.name))bone.rotation.x+=.18;}}
  root.updateWorldMatrix(true,false);root.updateMatrixWorld(true);
  let lowest=Infinity;
  for(const {mesh,ids} of soles)for(const id of ids)lowest=Math.min(lowest,mesh.getVertexPosition(id,vertex).applyMatrix4(mesh.matrixWorld).y);
  if(Number.isFinite(lowest)){const parentY=root.parent?.getWorldPosition(parentPoint).y||0;root.position.y+=parentY-lowest;}
  if(seated){for(const bone of bones){if(/thigh$/i.test(bone.name))bone.rotation.z+=1.1;if(/calf$/i.test(bone.name))bone.rotation.z-=1.3;}}
  if(options.driving){
   root.updateMatrixWorld(true);
   // Two-joint arm aiming keeps both hands on the generic watercraft controls.
   for(const [side,sign]of [['L',1],['R',-1]]){
    const arm=part=>bones.find(b=>b.name.endsWith(side+'_'+part)||b.name.endsWith(side+' '+part)),upper=arm('UpperArm'),fore=arm('Forearm'),hand=arm('Hand');if(!upper||!fore||!hand)continue;
    const target=root.parent.localToWorld(new THREE.Vector3(sign*.28,options.dj?1.38:1.21,options.dj?.65:.37));
    for(let pass=0;pass<3;pass++)for(const joint of [fore,upper]){const origin=joint.getWorldPosition(new THREE.Vector3()),from=hand.getWorldPosition(new THREE.Vector3()).sub(origin).normalize(),to=target.clone().sub(origin).normalize();if(!from.lengthSq()||!to.lengthSq())continue;const delta=new THREE.Quaternion().setFromUnitVectors(from,to),parentQ=joint.parent.getWorldQuaternion(new THREE.Quaternion()),local=parentQ.clone().invert().multiply(delta).multiply(parentQ);joint.quaternion.premultiply(local);joint.updateWorldMatrix(false,true);}
   }
  }

  // Shoe contact remains readable with mobile shadows disabled. Lifted feet fade their contact.
  root.updateWorldMatrix(true,true);const groundY=root.parent?.getWorldPosition(parentPoint).y||0;
  for(const {foot,mesh}of contacts){mesh.visible=!seated&&!options.driving&&!options.skating&&!options.dancing;if(!mesh.visible)continue;const p=foot.getWorldPosition(new THREE.Vector3()),lift=Math.max(0,p.y-groundY-.09);mesh.material.opacity=.34*THREE.MathUtils.clamp(1-lift/.35,0,1);const target=root.worldToLocal(new THREE.Vector3(p.x,groundY+.012,p.z));mesh.position.copy(target);mesh.scale.set(.36+lift*.2,.5+lift*.2,1);}
 }};
 controller.readyPromise=waitForNearbyHuman(root).then(()=>source()).then(bundle=>scheduleNpcSetup(()=>{const [character,idle,walk,run,dance]=bundle;
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
  for(const side of ['L','R']){const foot=bones.find(b=>b.name.replace(/[^a-z0-9]/gi,'').endsWith(side+'Foot'));if(!foot)continue;const material=new THREE.MeshBasicMaterial({map:contactTexture(),transparent:true,depthWrite:false,opacity:.3,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});const mesh=new THREE.Mesh(new THREE.PlaneGeometry(1,1),material);mesh.name=side+' shoe contact';mesh.rotation.x=-Math.PI/2;mesh.renderOrder=1;root.add(mesh);contacts.push({foot,mesh});}
  ready=true;controller.update(0,0);hairRig=createHairCustomizer(root,bones);applyOutfit();onReady();return controller;
 })).catch(error=>{console.error('Realistic character load failed',error);return controller;});
 return controller;
}


