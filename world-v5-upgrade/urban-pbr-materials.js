import * as THREE from 'three';
// Real 1K photo-scanned CC0 maps built by GitHub Actions.
// Falls back to the existing world materials if a download is missing.
const BASE='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/urban-pbr/';
export function installUrbanPBR({scene,buildings=[],roads=[],sidewalks=[]}={}){
 const loader=new THREE.TextureLoader();
 const cache=new Map();
 function tex(name,kind='color',repeat=[1,1]){
  const path=BASE+name+'_'+kind+'.jpg';
  const t=loader.load(path,()=>{},undefined,()=>{console.warn('Zerconda PBR unavailable:',path);});
  t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(...repeat);t.anisotropy=8;
  if(kind==='color')t.colorSpace=THREE.SRGBColorSpace;
  return t;
 }
 function material(name,repeat=[1,1],rough=.86){
  const m=new THREE.MeshStandardMaterial({map:tex(name,'color',repeat),normalMap:tex(name,'normal',repeat),roughnessMap:tex(name,'roughness',repeat),roughness:rough,metalness:0});
  cache.set(name,m);return m;
 }
 const brick=material('brick',[2,3],.95);
 const concrete=material('concrete',[3,3],.92);
 const asphalt=material('asphalt',[12,12],.98);
 const pavement=material('sidewalk',[8,8],.93);
 // Explicit surface registration avoids accidentally replacing glass, cars, signs or foliage.
 for(const mesh of buildings)if(mesh?.isMesh)mesh.material=brick;
 for(const mesh of roads)if(mesh?.isMesh)mesh.material=asphalt;
 for(const mesh of sidewalks)if(mesh?.isMesh)mesh.material=pavement;
 return {brick,concrete,asphalt,pavement,materials:cache};
}

export function upgradeExistingMaterial(material,asset,repeat=[1,1]){
 // No blank surfaces: apply only after the downloaded photographic color map is confirmed.
 const url=BASE+asset+'_color.jpg';
 const loader=new THREE.TextureLoader();
 loader.load(url,color=>{
  color.colorSpace=THREE.SRGBColorSpace;color.wrapS=color.wrapT=THREE.RepeatWrapping;color.repeat.set(...repeat);color.anisotropy=8;
  material.map=color;material.color.set(0xffffff);material.needsUpdate=true;
  for(const [suffix,prop] of [['normal','normalMap'],['roughness','roughnessMap']]){
   loader.load(BASE+asset+'_'+suffix+'.jpg',t=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(...repeat);t.anisotropy=8;material[prop]=t;material.needsUpdate=true;},undefined,()=>{});
  }
 },undefined,()=>{console.info('Using Zerconda existing material while CC0 download is unavailable:',asset);});
}
