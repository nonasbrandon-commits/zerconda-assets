import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function batchApartmentStatic(root){
 root.updateWorldMatrix(true,true);const inverse=root.matrixWorld.clone().invert(),bins=new Map(),remove=[];let before=0;
 root.traverse(o=>{if(!o.isMesh)return;before++;if(o.isReflector||o.userData.clearMirror||o.isSkinnedMesh||o.isInstancedMesh||Array.isArray(o.material)||o.material.transparent)return;for(let p=o;p&&p!==root;p=p.parent)if(p.userData.apartmentDynamic||p.userData.onlyLevel)return;
  let geo=o.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse,o.matrixWorld));if(geo.index){const non=geo.toNonIndexed();geo.dispose();geo=non;}
  const key=o.material.uuid+'|'+Object.entries(geo.attributes).map(([n,a])=>n+':'+a.itemSize+':'+a.normalized).sort().join(','),bin=bins.get(key)||{material:o.material,geometries:[],castShadow:false};bin.geometries.push(geo);bin.castShadow||=o.castShadow;bins.set(key,bin);remove.push(o);
 });
 for(const o of remove)o.removeFromParent();for(const bin of bins.values()){const geometry=mergeGeometries(bin.geometries);bin.geometries.forEach(g=>g.dispose());if(!geometry)throw Error('Apartment furniture batch incompatible');geometry.computeBoundingSphere();const mesh=new THREE.Mesh(geometry,bin.material);mesh.name='Batched apartment architecture and furniture';mesh.castShadow=bin.castShadow;mesh.receiveShadow=true;root.add(mesh);}
 let after=0;root.traverse(o=>{if(o.isMesh)after++});root.userData.renderBatch={before,after};return root;
}
