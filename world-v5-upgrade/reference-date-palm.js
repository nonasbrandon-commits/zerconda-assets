import * as THREE from 'three';
import{addCoastalBreeze}from'./coastal-breeze.js?v=20261119-coastal-breeze-v154';
const texture=new THREE.TextureLoader().load(new URL('./assets/date-palm-v184.png',import.meta.url).href);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;texture.userData.preserveDetail=true;
const material=new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.40,side:THREE.DoubleSide,depthWrite:true,toneMapped:false});material.forceSinglePass=true;
addCoastalBreeze(material,{kind:'reference date palm',baseY:.42,height:.58,amplitude:.012,flutter:.002});
const wind=material.onBeforeCompile;material.onBeforeCompile=shader=>{wind(shader);shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
if((diffuseColor.r>.65&&diffuseColor.g<.08&&diffuseColor.b<.12)||(diffuseColor.g>.65&&diffuseColor.r<.08&&diffuseColor.b<.08))discard;`);};
const geometry=new THREE.PlaneGeometry(3/3.29,1,14,32);geometry.translate(0,.5,0);const eye=new THREE.Vector3(),center=new THREE.Vector3();
export function createReferenceDatePalm(parent,{x,y=.085,z,height=8.9}){const root=new THREE.Group();root.name='Reference date palm · full crown and patterned trunk';root.position.set(x,y,z);root.userData.referenceAsset='assets/date-palm-v184.png';root.userData.beachPalm=true;parent.add(root);const photo=new THREE.Mesh(geometry,material);photo.name='Dense date palm reference foliage';photo.scale.setScalar(height);root.add(photo);photo.onBeforeRender=(_renderer,_scene,camera)=>{camera.getWorldPosition(eye);root.getWorldPosition(center);photo.rotation.y=Math.atan2(eye.x-center.x,eye.z-center.z);photo.updateMatrixWorld(true);};return{root,photo,x,z,height};}
