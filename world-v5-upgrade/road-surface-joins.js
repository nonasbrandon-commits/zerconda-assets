import * as THREE from 'three';
import {createRoadMapGeometry} from './road-map-geometry.js?v=20261122-startup-roads-v205';
import {joinTrailSurfaces} from './trail-surfaces.js?v=20261118-area-travel-v110';
// Remove paving from travel lanes rather than stacking a second surface above it.
export function clearRoadSidewalkOverlaps(scene,{asphalt,paving,curb,gravelRoot}){
 scene.updateMatrixWorld(true);const roads=createRoadMapGeometry(scene,asphalt).scan().map(p=>({vertices:[p[0],.02,p[1],p[2],.02,p[3],p[4],.02,p[5]]}));
 gravelRoot?.traverse(o=>{if(!o.isMesh)return;const p=o.geometry.attributes.position;for(let i=0;i<p.count;i+=3){const vertices=[];for(let k=0;k<3;k++){const v=new THREE.Vector3().fromBufferAttribute(p,i+k).applyMatrix4(o.matrixWorld);vertices.push(v.x,.02,v.z);}roads.push({vertices});}});
 const bounds=v=>({x0:Math.min(v[0],v[3],v[6]),x1:Math.max(v[0],v[3],v[6]),z0:Math.min(v[2],v[5],v[8]),z1:Math.max(v[2],v[5],v[8])});
 const grid=new Map(),cell=24;for(const r of roads){r.b=bounds(r.vertices);for(let x=Math.floor(r.b.x0/cell);x<=Math.floor(r.b.x1/cell);x++)for(let z=Math.floor(r.b.z0/cell);z<=Math.floor(r.b.z1/cell);z++){const k=x+','+z,a=grid.get(k)||[];a.push(r);grid.set(k,a);}}
 let trimmed=0;const objects=[];scene.traverse(o=>{if(o.isMesh&&!o.isInstancedMesh&&(o.material===paving||o.material===curb||o.userData.roadEdge)&&!o.userData.roadJoined)objects.push(o);});
 for(const o of objects){const b=new THREE.Box3().setFromObject(o);if(b.max.y>.4||b.min.y<-.5)continue;const candidates=new Set();for(let x=Math.floor(b.min.x/cell);x<=Math.floor(b.max.x/cell);x++)for(let z=Math.floor(b.min.z/cell);z<=Math.floor(b.max.z/cell);z++)for(const r of grid.get(x+','+z)||[])if(r.b.x1>b.min.x+1e-5&&r.b.x0<b.max.x-1e-5&&r.b.z1>b.min.z+1e-5&&r.b.z0<b.max.z-1e-5)candidates.add(r);
 if(!candidates.size)continue;const p=o.geometry.attributes.position,idx=o.geometry.index,vertices=[];for(let i=0;i<(idx?.count||p.count);i+=3){const tri=[];for(let k=0;k<3;k++)tri.push(new THREE.Vector3().fromBufferAttribute(p,idx?idx.getX(i+k):i+k).applyMatrix4(o.matrixWorld));const n=tri[1].clone().sub(tri[0]).cross(tri[2].clone().sub(tri[0]));if(n.y<=.001)continue;for(const v of tri)vertices.push(v.x,v.y,v.z);}
 const joined=joinTrailSurfaces([...Array.from(candidates,r=>({kind:'road',vertices:r.vertices})),{kind:'paving',vertices}]);const result=joined.surfaces.at(-1);if(result.positions.length===vertices.length&&joined.removedArea<1e-5)continue;
 const inverse=o.matrixWorld.clone().invert(),positions=result.positions;for(let i=0;i<positions.length;i+=3){const v=new THREE.Vector3(positions[i],b.max.y,positions[i+2]).applyMatrix4(inverse);positions[i]=v.x;positions[i+1]=v.y;positions[i+2]=v.z;}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(result.uv,2));g.computeVertexNormals();o.geometry=g;o.userData.roadJoined=true;trimmed++;
 }return {trimmed};
}
