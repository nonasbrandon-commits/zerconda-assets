import * as THREE from 'three';
import {ConvexGeometry} from 'three/addons/geometries/ConvexGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {addNaturalFerns} from './forest-natural-details.js?v=20261121-forest-airfield-v193';
export const FOREST_ROCK_SITE={x:-682,z:-259,clearance:10.8};
// A solid outcrop built from fractured granite masses, rather than a flat image.
export function createForestLandmarkRock(scene,{x=FOREST_ROCK_SITE.x,z=FOREST_ROCK_SITE.z,y=.02}={}){
 const root=new THREE.Group();root.name='Mossy granite landmark · forest clearing';root.position.set(x,y,z);root.userData.customInterior=true;root.userData.forestLandmarkRock=true;scene.add(root);
 const texture=new THREE.TextureLoader().load(new URL('./assets/alpine-granite-v259.webp',import.meta.url).href);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;
 const rock=new THREE.MeshStandardMaterial({map:texture,color:0xc1bcb1,roughness:.96});
 rock.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 rockWorld;varying vec3 rockNormal;');s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nrockWorld=(modelMatrix*vec4(transformed,1.)).xyz;rockNormal=normalize(mat3(modelMatrix)*normal);');s.fragmentShader=s.fragmentShader.replace('#include <common>',`#include <common>
 varying vec3 rockWorld;varying vec3 rockNormal;
 float rockHash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
 float rockNoise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(rockHash(i),rockHash(i+vec3(1,0,0)),f.x),mix(rockHash(i+vec3(0,1,0)),rockHash(i+vec3(1,1,0)),f.x),f.y),mix(mix(rockHash(i+vec3(0,0,1)),rockHash(i+vec3(1,0,1)),f.x),mix(rockHash(i+vec3(0,1,1)),rockHash(i+vec3(1,1,1)),f.x),f.y),f.z);}`);s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`vec3 rn=normalize(rockNormal),blend=pow(abs(rn),vec3(5.));blend/=max(dot(blend,vec3(1.)),.0001);vec3 q=rockWorld*.22;vec3 stone=texture2D(map,q.yz).rgb*blend.x+texture2D(map,q.xz).rgb*blend.y+texture2D(map,q.xy).rgb*blend.z;float n=rockNoise(rockWorld*1.2)*.66+rockNoise(rockWorld*4.1)*.34;float grain=rockNoise(rockWorld*35.);float ledge=smoothstep(.10,.72,rn.y);float moss=smoothstep(.35,.62,n+ledge*.25)*mix(.13,.88,ledge);vec3 mossColor=mix(vec3(.09,.14,.025),vec3(.30,.36,.065),n)*(.85+grain*.30);stone*=.76+n*.36;diffuseColor.rgb*=mix(stone,mossColor,moss);`);};rock.customProgramCacheKey=()=> 'forest-landmark-granite-moss-v260';
 let seed=260;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296),pieces=[],colliders=[];
 function mass(cx,cy,cz,w,h,d,angle,solid=true){const points=[],ring=8;for(let level=0;level<3;level++){const yy=level===0?0:level===1?h*.56:h,scale=level===0?.92:level===1?1:.79;for(let i=0;i<ring;i++){const a=i*Math.PI/4+Math.PI/8,irregular=.88+random()*.18;points.push(new THREE.Vector3(Math.cos(a)*w*.5*scale*irregular,yy+(level?(.5-random())*h*.09:0),Math.sin(a)*d*.5*scale*irregular));}}const g=new ConvexGeometry(points);g.rotateY(angle);g.translate(cx,cy,cz);const pos=g.attributes.position,norm=g.attributes.normal,uv=[];for(let i=0;i<pos.count;i++){const nx=Math.abs(norm.getX(i)),ny=Math.abs(norm.getY(i)),nz=Math.abs(norm.getZ(i));uv.push((nx>ny&&nx>nz?pos.getZ(i):pos.getX(i))*.22,(ny>nx&&ny>nz?pos.getZ(i):pos.getY(i))*.22);}g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));pieces.push(g);if(solid){const c=new THREE.Group();c.name='Solid granite outcrop';c.position.set(cx,cy,cz);c.rotation.y=angle;c.userData.playerCollider={shape:'box',halfX:w*.43,halfZ:d*.43,minY:0,maxY:h};root.add(c);colliders.push(c);}}
 // Interlocking, offset slabs leave real shadowed cracks between the faces.
 mass(-1.35,-.12,.15,7.4,3.05,6.8,-.13);
 mass(1.65,-.10,-.35,5.7,4.25,5.6,.19);
 mass(-.75,2.25,-.85,6.2,2.75,5.3,-.22);
 mass(-1.65,4.05,-1.25,4.5,1.8,3.6,-.04);
 mass(2.0,3.12,-1.10,3.6,1.85,3.8,.25);
 mass(-2.75,-.10,2.65,4.8,1.65,3.25,-.25);
 mass(.75,-.12,3.15,3.8,1.15,2.75,.28);
 for(const[a,r,w]of [[.3,6.3,1.2],[1.1,5.7,1.65],[1.8,6.0,.9],[2.6,6.1,1.4],[3.3,5.8,.85],[4.0,5.7,1.25],[4.8,5.2,1.5],[5.6,5.7,.8]])mass(Math.cos(a)*r,-.07,Math.sin(a)*r,w,.45+w*.38,w*.83,a);
 const geometry=mergeGeometries(pieces);pieces.forEach(g=>g.dispose());geometry.computeBoundingSphere();const mesh=new THREE.Mesh(geometry,rock);mesh.name='Fractured granite with moss-covered ledges';mesh.castShadow=mesh.receiveShadow=true;root.add(mesh);
 const ferns=[];for(let i=0;i<24;i++){const a=i*2.399,r=4.7+random()*2.4;ferns.push({x:Math.cos(a)*r,y:.025,z:Math.sin(a)*r,scale:1.0+random()*.85,angle:a});}addNaturalFerns(root,ferns);
 root.userData.landmark={x,z,height:5.9,width:11.4,solidParts:colliders.length};return{root,mesh,colliders,site:{x,z},dispose(){scene.remove(root);geometry.dispose();rock.dispose();texture.dispose();}};
}
