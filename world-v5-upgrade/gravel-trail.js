import * as THREE from 'three';
import {applyRealisticGravel} from './realistic-gravel.js?v=20261121-collision-v192';
export const RESIDENTIAL_TRAIL={west:-404,east:-110,z:47.5,width:1.8,y:.04};
export const APARTMENT_TRAIL={west:-82,east:-14,z:48,width:1.8,y:.04};
export function createResidentialGravelTrail(parent){const material=applyRealisticGravel(new THREE.MeshStandardMaterial({name:'Military-base gray gravel for residential paths',roughness:1,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2}));let first=null;for(const [i,p]of[RESIDENTIAL_TRAIL,APARTMENT_TRAIL].entries()){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(p.east-p.west,p.width),material);mesh.name=i?'Sidewalk to sidewalk gravel trail between apartments':'Sidewalk to sidewalk gravel trail between residential rows';mesh.rotation.x=-Math.PI/2;mesh.position.set((p.west+p.east)/2,p.y,p.z);mesh.receiveShadow=true;mesh.userData.trail={...p};parent.add(mesh);first??=mesh;}return first;}
