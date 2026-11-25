import {joinTrailSurfaces} from './trail-surfaces.js?v=20261118-area-travel-v110';
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {GROUND_LEVEL as G} from './ground-level.js?v=20261119-level-ground-v117';
export function createVenueAccessRoads(scene,{asphalt,paving}){const root=new THREE.Group();root.name='Western venues · connected access lanes and sidewalks';root.userData.startupEssential=true;scene.add(root);const bins=new Map(),white=new THREE.MeshBasicMaterial({color:'#e8e7dc'});
 function plane(w,d,x,z,m,y=G){const g=new THREE.PlaneGeometry(w,d);g.rotateX(-Math.PI/2);g.translate(x,y,z);const geo=g.toNonIndexed();g.dispose();const list=bins.get(m)||[];list.push(geo);bins.set(m,list);}
 // The apartment road joins the ammo-store forecourt, then the hospital access.
 plane(6,108,-616,-452,asphalt);for(const x of[-620,-612])plane(2,108,x,-452,paving);
 const head=new THREE.CircleGeometry(8,40);head.rotateX(-Math.PI/2);head.translate(-616,G,-512);bins.get(asphalt).push(head.toNonIndexed());head.dispose();const ring=new THREE.RingGeometry(8,10,40,1,-Math.PI/2+.42,Math.PI*2-.84);ring.rotateX(-Math.PI/2);ring.translate(-616,G,-512);bins.get(paving).push(ring.toNonIndexed());ring.dispose();
 // Approach from the apartment steps to the west sidewalk, outside the shell.
 plane(13.2,7.8,-627.6,-480,paving);
 // Yellow centerlines belong to the public street, not private venue driveways.
 for(const z of[-470,-360])plane(.22,2.8,-434,z+1.5,white,G+.002);
 const flatten=list=>list.flatMap(g=>Array.from(g.attributes.position.array));const joined=joinTrailSurfaces([{kind:'road',vertices:flatten(bins.get(asphalt))},{kind:'paving',vertices:flatten(bins.get(paving))}]);for(const[index,mat]of[asphalt,paving].entries()){const spec=joined.surfaces[index],g=new THREE.BufferGeometry();for(let i=1;i<spec.positions.length;i+=3)spec.positions[i]=G;g.setAttribute('position',new THREE.Float32BufferAttribute(spec.positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(spec.uv,2));g.computeVertexNormals();bins.get(mat).forEach(g=>g.dispose());bins.set(mat,[g]);}
 for(const[m,list]of bins){const mesh=new THREE.Mesh(mergeGeometries(list),m);mesh.name=m===asphalt?'Venue access asphalt':m===paving?'Venue access sidewalk':'Venue access road paint';mesh.castShadow=false;mesh.receiveShadow=m!==white;if(m===asphalt)mesh.userData.drivewaySurface=true;root.add(mesh);list.forEach(g=>g.dispose());}return{root,bounds:{x0:-637,x1:-606,z0:-522,z1:-398}};
}
