import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function createTagWallPhotos(root){
 const mobile=matchMedia('(pointer:coarse)').matches,cap=mobile?128:512,frame=new THREE.MeshBasicMaterial({color:'#b94cff',toneMapped:false}),back=new THREE.MeshStandardMaterial({color:'#17101e',roughness:.65}),frames=[],backs=[],pictures=[],status={count:4,loaded:0,loading:false,errors:0,cap};root.userData.tagWallPhotos=status;
 function box(w,h,d,x,y,z,parts){parts.push(new THREE.BoxGeometry(w,h,d).translate(x,y,z));}
 for(const[i,x]of[-32,-23,23,32].entries()){
  box(6.14,6.14,.14,x,4.3,-34.6,backs);for(const side of[-1,1]){box(.045,6.12,.045,x+side*3.04,4.3,-34.48,frames);box(6.12,.045,.045,x,4.3+side*3.04,-34.48,frames);}
  const material=new THREE.MeshBasicMaterial({color:'#25172e',toneMapped:false}),picture=new THREE.Mesh(new THREE.PlaneGeometry(5.96,5.96),material);picture.name='Tag reaction photo '+(i+1);picture.position.set(x,4.3,-34.465);picture.userData.cameraPassThrough=true;root.add(picture);pictures.push(picture);
 }
 for(const[parts,mat,name]of[[backs,back,'Tag reaction photo backings'],[frames,frame,'Tag reaction photo violet frames']]){const mesh=new THREE.Mesh(mergeGeometries(parts,false),mat);mesh.name=name;mesh.userData.cameraPassThrough=true;root.add(mesh);parts.forEach(g=>g.dispose());}
 let next=0,retryAfter=0,inside=false;
 async function loadNext(){if(status.loading||!inside||next>=pictures.length||performance.now()<retryAfter)return;status.loading=true;const index=next,url=new URL('./assets/tag-photo-'+(index+1)+'-v432.png',import.meta.url).href;try{let bitmap;try{bitmap=await new THREE.ImageBitmapLoader().setOptions({imageOrientation:'flipY',resizeWidth:cap,resizeHeight:cap,resizeQuality:'high'}).loadAsync(url);}catch{bitmap=await new THREE.ImageBitmapLoader().setOptions({imageOrientation:'flipY'}).loadAsync(url);}const texture=new THREE.CanvasTexture(bitmap);texture.flipY=false;texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=2;const m=pictures[index].material;m.map=texture;m.color.set('#ffffff');m.needsUpdate=true;status.loaded++;next++;}catch(error){status.errors++;retryAfter=performance.now()+15000;status.lastError=String(error?.message||error);}finally{status.loading=false;if(inside&&next<pictures.length&&performance.now()>=retryAfter)setTimeout(loadNext,0);}}
 return{pictures,status,update(active){inside=!!active;if(inside&&next<pictures.length&&!status.loading&&performance.now()>=retryAfter)loadNext();}};
}
