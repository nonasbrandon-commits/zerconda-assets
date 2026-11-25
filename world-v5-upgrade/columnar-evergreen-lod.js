import * as THREE from 'three';
import {createColumnarEvergreen} from './columnar-evergreen.js?v=20261122-garden-v232';
let lowGeo,lowMat;
export function createColumnarEvergreenLOD(parent,{x=0,z=0,y=.03,height=4,width=1.2,angle=0}={}){
 const lod=new THREE.LOD();lod.name='Privacy evergreen · distance detail';lod.position.set(x,y,z);lod.rotation.y=angle;lod.userData.distanceManaged=true;
 const near=new THREE.Group();createColumnarEvergreen(near,{height,width,y:0});lod.addLevel(near,0);
 if(!lowGeo){const profile=[];for(let i=0;i<=12;i++){const y=i/12,r=.5*Math.pow(Math.max(.001,1-y),.48)*Math.min(1,y/.10);profile.push(new THREE.Vector2(r,y));}lowGeo=new THREE.LatheGeometry(profile,14);lowMat=new THREE.MeshStandardMaterial({color:'#1d421d',roughness:1});}
 const far=new THREE.Mesh(lowGeo,lowMat);far.scale.set(width,height,width);lod.addLevel(far,24,.12);lod.addLevel(new THREE.Group(),110,.08);parent.add(lod);return lod;
}
