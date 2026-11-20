import {addCoastalBreeze} from './coastal-breeze.js?v=20261119-coastal-breeze-v154';
import * as THREE from 'three';
const texture=new THREE.TextureLoader().load(new URL('./assets/beach-palm-v150.png',import.meta.url).href);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;
const material=new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.16,side:THREE.DoubleSide,depthWrite:true,toneMapped:false});
addCoastalBreeze(material,{kind:'beach palm',baseY:.15,height:.75,amplitude:.028,flutter:.005});
const geometry=new THREE.PlaneGeometry(.701,1,14,32);geometry.translate(.055,.497,0);const eye=new THREE.Vector3(),center=new THREE.Vector3();
export function createReferenceBeachPalm(parent,{x,y=.085,z,height=8.9}){const root=new THREE.Group();root.name='Beach-only reference coconut palm';root.position.set(x,y,z);root.userData.referenceAsset='assets/beach-palm-v150.png';root.userData.beachPalm=true;parent.add(root);const photo=new THREE.Mesh(geometry,material);photo.name='User palm photo cutout';photo.scale.setScalar(height);root.add(photo);photo.onBeforeRender=(_renderer,_scene,camera)=>{camera.getWorldPosition(eye);root.getWorldPosition(center);photo.rotation.y=Math.atan2(eye.x-center.x,eye.z-center.z);photo.updateMatrixWorld(true);};return{root,photo,x,z,height};}
