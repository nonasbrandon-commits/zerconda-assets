import {joinTrailSurfaces} from './trail-surfaces.js?v=20261118-area-travel-v110';
import * as THREE from 'three';
import {GROUND_LEVEL as G} from './ground-level.js?v=20261119-level-ground-v117';
// Straight continuous campus lanes with square junctions. No private yellow centerlines.
export function createVenueAccessRoads(scene,{asphalt,paving,curb=paving}){
 const SURFACE=G-.016;const root=new THREE.Group();root.name='Western campus access roads';root.userData.startupEssential=true;scene.add(root);
 const roads=[],walks=[],polygons=[];
 // Complete the missing boulevard sidewalks beside the warehouse and hospital.
 for(const side of[-1,1]){const walk=new THREE.Mesh(new THREE.BoxGeometry(4.28,.02,243.22),paving);walk.name='Western boulevard continuous sidewalk';walk.position.set(-418+side*11.86,G-.01,-418.61);walk.castShadow=false;root.add(walk);const edge=new THREE.Mesh(new THREE.BoxGeometry(.22,.02,243.22),curb);edge.name='Western boulevard curb';edge.position.set(-418+side*9.61,G-.01,-418.61);edge.castShadow=false;root.add(edge);}
 function polygon(points,out,record=false){if(record)polygons.push(points);for(let i=1;i<points.length-1;i++)for(const j of[0,i+1,i])out.push(points[j][0],SURFACE,points[j][1]);}
 function rect(x0,x1,z0,z1,out,record=false){polygon([[x0,z0],[x1,z0],[x1,z1],[x0,z1]],out,record);}
 function lane(x0,x1,z0,z1){rect(x0-2,x1+2,z0-2,z1+2,walks);rect(x0,x1,z0,z1,roads,true);}
 // Open T-junction into Westhaven's existing north road (asphalt begins at z=-292.5).
 // Sidewalk corners belong to Westhaven: no cap or overlapping pavement across traffic.
 rect(-622,-610,-524,-297,walks);rect(-620,-612,-522,-297,roads,true);
 // Airport main road continues west, then joins the existing Guns & Ammo lane.
 rect(-629.78,-418,-567.78,-540.22,walks);rect(-625.5,-418,-563.5,-544.5,roads,true);
 rect(-629.78,-602.22,-554,-530,walks);rect(-625.5,-606.5,-554,-530,roads,true);
 polygon([[-629.78,-530],[-602.22,-530],[-610,-520],[-622,-520]],walks);
 polygon([[-625.5,-530],[-606.5,-530],[-612,-522],[-620,-522]],roads,true);
 // The former short east-west spur at z=-518 is removed.
 // The redundant spur across the lawn to the hospital service apron is removed.
 // The main lane sidewalk stays continuous past Guns & Ammo.
 for(const z of[-360]){const half=3;polygon([[-440,z-half],[-427.5,z-7],[-427.5,z+7],[-440,z+half]],roads,true);}
 rect(-634.2,-620,-483.9,-476.1,walks);
 const make=(spec,mat,inverse)=>{const a=spec.positions;for(let i=0;i<a.length;i+=3){const v=new THREE.Vector3(a[i],SURFACE,a[i+2]);if(inverse)v.applyMatrix4(inverse);a[i]=v.x;a[i+1]=v.y;a[i+2]=v.z;}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(a,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(spec.uv,2));g.computeVertexNormals();return g;};
 const road=new THREE.Mesh(new THREE.BufferGeometry(),asphalt),walk=new THREE.Mesh(new THREE.BufferGeometry(),paving);road.name='Campus continuous asphalt';road.userData.drivewaySurface=true;walk.name='Campus sidewalks';walk.userData.roadJoined=true;root.add(road,walk);
 const initial=joinTrailSurfaces([{kind:'road',vertices:roads},{kind:'paving',vertices:walks}]);road.geometry=make(initial.surfaces[0],asphalt);walk.geometry=make(initial.surfaces[1],paving);let finalized=false;
 function finalize(){if(finalized)return;finalized=true;scene.updateMatrixWorld(true);const old=[],specs=[{kind:'road',vertices:roads}];scene.traverse(o=>{if(!o.isMesh||o===road||o.material!==asphalt)return;const b=new THREE.Box3().setFromObject(o);if(b.min.x< -690||b.max.x> -427.49||b.min.z< -550||b.max.z> -300||b.min.x>=-427.5-.00001||b.max.x< -644||b.max.z< -526||b.min.z> -300)return;const p=o.geometry.attributes.position,idx=o.geometry.index,vertices=[];for(let i=0;i<(idx?.count||p.count);i+=3){const tri=[0,1,2].map(k=>new THREE.Vector3().fromBufferAttribute(p,idx?idx.getX(i+k):i+k).applyMatrix4(o.matrixWorld));if(tri[1].clone().sub(tri[0]).cross(tri[2].clone().sub(tri[0])).y<.000001)continue;for(const v of tri)vertices.push(v.x,G,v.z);}if(vertices.length){old.push(o);specs.push({kind:'road',vertices});}});specs.push({kind:'paving',vertices:walks});const joined=joinTrailSurfaces(specs);road.geometry=make(joined.surfaces[0],asphalt);old.forEach((o,i)=>o.geometry=make(joined.surfaces[i+1],asphalt,o.matrixWorld.clone().invert()));walk.geometry=make(joined.surfaces.at(-1),paving);return{joinedMeshes:old.length,removedOverlapArea:joined.removedArea};}
 const contains=(x,z)=>polygons.some(poly=>{let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;});
 return{root,finalize,canWalk:(x,z)=>contains(x,z)?true:null,bounds:{x0:-636,x1:-408.5,z0:-568,z1:-269}};
}
