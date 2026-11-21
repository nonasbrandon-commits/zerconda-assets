import {installTreeBreeze} from './tree-breeze.js?v=20261121-forest-airfield-v193';
import {scatterNaturalBoulders} from './forest-natural-details.js?v=20261121-forest-airfield-v193';
import {getRealisticGrassTexture} from './realistic-grass.js?v=20261121-town-v191';
import {upgradePineMeshes} from './realistic-forest-pines.js?v=20261121-forest-airfield-v193';
import {replaceDistantTerrain} from './local-terrain-visibility.js?v=20261119-sand-mountains-v157';
import {createAlpineHorizon} from './alpine-horizon.js?v=20261119-alpine-v155';
import {treeOverlapsRoad} from './tree-road-clearance.js?v=20261118-clear-roads-v112';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
// Deterministic, continuous 3D terrain: no cone primitives or photographic backdrop.
const smooth=(a,b,x)=>{const t=THREE.MathUtils.clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
function hash(x,z){return ((Math.sin(x*127.1+z*311.7)*43758.5453)%1+1)%1;}
function noise(x,z){const a=Math.floor(x),b=Math.floor(z),u=smooth(0,1,x-a),v=smooth(0,1,z-b);return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(a,b),hash(a+1,b),u),THREE.MathUtils.lerp(hash(a,b+1),hash(a+1,b+1),u),v);}
function fbm(x,z){let n=0,a=.5;for(let i=0;i<5;i++){n+=noise(x,z)*a;x=x*2.03+17.7;z=z*2.03-8.4;a*=.5;}return n;}
const peaks=[[-1010,-970,300,230,290],[-690,-870,370,235,270],[-360,-1040,420,220,310],[-30,-820,330,195,250],[270,-1020,455,240,320],[620,-890,360,225,270],[980,-1080,435,250,330],[1380,-850,340,270,285],[-850,-350,225,260,230],[1150,-330,245,280,260]].map(p=>p[1]<-700?[p[0],p[1]-820,...p.slice(2)]:p);
export function wildernessHeight(x,z){
 const outside=Math.max(-444-x,x-570,-1350-z);
 const coast=1-smooth(10,155,z),rise=smooth(12,220,outside)*coast;
 if(!rise)return -.22;
 const warp=(fbm(x*.003,z*.003)-.5)*105;
 let h=0;for(const [px,pz,ph,rx,rz]of peaks){const dx=(x+warp-px)/rx,dz=(z-warp*.48-pz)/rz;const r=Math.sqrt(dx*dx+dz*dz);h=Math.max(h,ph*Math.exp(-r*r*1.1));}
 const ridges=1-Math.abs(fbm(x*.012,z*.012)*2-1);
 const folds=Math.pow(1-Math.abs(Math.sin(x*.025+z*.008+fbm(x*.006,z*.006)*12)),2);
 const distantHills=smooth(650,1800,outside)*(18+fbm(x*.0015,z*.0015)*65);
 return rise*(distantHills+Math.max(0,h*(.69+.35*ridges)-folds*h*.16)+(fbm(x*.018,z*.018)-.3)*h*.12+fbm(x*.005,z*.005)*12)-.22;
}
function rockTexture(){
 const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d'),data=ctx.createImageData(512,512);
 for(let y=0;y<512;y++)for(let x=0;x<512;x++){const n=fbm(x/70,y/48),grain=hash(x,y),seam=Math.pow(1-Math.abs(Math.sin(y*.05+noise(x*.012,y*.017)*9)),18);const v=118+n*72+(grain-.5)*36-seam*35,i=(y*512+x)*4;data.data[i]=v+10;data.data[i+1]=v;data.data[i+2]=v-13;data.data[i+3]=255;}
 ctx.putImageData(data,0,0);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;
}
export function createWildernessLandscape(scene){
 const root=new THREE.Group();root.name='Rugged alpine ridges and perimeter forest';root.userData.wilderness=true;scene.add(root);
 const rock=rockTexture();new THREE.TextureLoader().load(new URL('./assets/alpine-granite-v155.png',import.meta.url).href,t=>{t.wrapS=t.wrapT=THREE.RepeatWrapping;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;material.map=t;material.bumpMap=t;material.needsUpdate=true;rock.dispose();});
 const material=new THREE.MeshStandardMaterial({map:rock,vertexColors:true,roughness:1,bumpMap:rock,bumpScale:.70});
 // Project rock in world coordinates onto all three axes; steep cliffs retain detail.
 material.onBeforeCompile=shader=>{shader.uniforms.realisticGrassPhoto={value:getRealisticGrassTexture()};shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 terrainPosition; varying vec3 terrainNormal;').replace('#include <begin_vertex>','#include <begin_vertex>\nterrainPosition=position;terrainNormal=normal;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 terrainPosition; varying vec3 terrainNormal; uniform sampler2D realisticGrassPhoto;');shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`vec3 blend=pow(abs(normalize(terrainNormal)),vec3(4.));blend/=max(dot(blend,vec3(1.)),.0001);vec3 p=terrainPosition*.055;vec4 texel=texture2D(map,p.yz)*blend.x+texture2D(map,p.xz)*blend.y+texture2D(map,p.xy)*blend.z;float graniteLuma=dot(texel.rgb,vec3(.299,.587,.114));texel.rgb=mix(vec3(graniteLuma),texel.rgb,.35);diffuseColor.rgb*=mix(vec3(1.0),texel.rgb*1.55,.88);float lawnMask=(1.0-smoothstep(45.0,115.0,terrainPosition.y))*(1.0-smoothstep(.10,.30,1.0-abs(normalize(terrainNormal).y)));diffuseColor.rgb=mix(diffuseColor.rgb,texture2D(realisticGrassPhoto,terrainPosition.xz/1.35).rgb*vec3(.80,.92,.68),lawnMask);float snowGully=smoothstep(335.0,420.0,terrainPosition.y+sin(terrainPosition.x*.024)*11.0+cos(terrainPosition.z*.018)*8.0)*(1.0-smoothstep(.28,.80,1.0-abs(normalize(terrainNormal).y)));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.89,.94,.98),snowGully*.96);`);shader.fragmentShader=shader.fragmentShader.replace('#include <fog_fragment>',`#ifdef USE_FOG\nfloat alpineFog=1.0-exp(-fogDensity*fogDensity*vFogDepth*vFogDepth*.40);gl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,alpineFog);\n#endif`);};
 const tiles=[[-1450,1750,-1845,-1348.9,240,100],[-1450,-274.9,-1348.9,350,90,70],[568.9,1750,-1348.9,350,90,70],[-7000,-1450,-7000,350,110,110],[1750,7000,-7000,350,110,110],[-1450,1750,-7000,-1845,110,100]];
 const base=new THREE.Color(),green=new THREE.Color('#3f5539'),stone=new THREE.Color('#8e989e'),snow=new THREE.Color('#edf3f5');
 for(const [x0,x1,z0,z1,nx,nz]of tiles){const pos=[],colors=[],uv=[],indices=[];
  for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){const x=x0+(x1-x0)*i/nx,z=z0+(z1-z0)*j/nz,h=wildernessHeight(x,z);pos.push(x,h,z);uv.push(x*.055,z*.055);
   const slope=Math.hypot(wildernessHeight(x+3,z)-wildernessHeight(x-3,z),wildernessHeight(x,z+3)-wildernessHeight(x,z-3))/6;
   const rocky=smooth(.6,1.15,slope)*.75+smooth(95,205,h)*.8;base.copy(green).lerp(stone,Math.min(1,rocky));base.multiplyScalar(.78+fbm(x*.05,z*.05)*.4);
   const snowline=350+noise(x*.013,z*.013)*65;const cover=smooth(snowline,snowline+28,h)*(1-smooth(.7,1.5,slope));base.lerp(snow,cover);colors.push(base.r,base.g,base.b);
  }
  for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){const a=j*(nx+1)+i,b=a+nx+1;indices.push(a,b,a+1,a+1,b,b+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();const mesh=new THREE.Mesh(g,material);mesh.name='Continuous eroded mountain terrain';mesh.receiveShadow=true;root.add(mesh);
 }
 // Fine evergreen bough cutout. The branches are arranged in 3D whorls below.
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const ctx=canvas.getContext('2d');
 ctx.strokeStyle='#586143';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(128,254);ctx.lineTo(128,12);ctx.stroke();
 let seed=2873;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 for(let j=0;j<24;j++){const y=28+j*8.5,w=8+j*3.8;for(const side of [-1,1]){const ex=128+side*w,ey=y+17;ctx.strokeStyle='#394b2e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(128,y);ctx.lineTo(ex,ey);ctx.stroke();for(let k=0;k<24;k++){const t=k/24,px=128+(ex-128)*t,py=y+17*t,len=7+random()*13;ctx.strokeStyle=['#476b36','#587c42','#35542c','#769051'][Math.floor(random()*4)];ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+side*len*.55,py-len);ctx.moveTo(px,py);ctx.lineTo(px+side*len*.85,py+len*.3);ctx.stroke();}}}
 const foliage=new THREE.CanvasTexture(canvas);foliage.colorSpace=THREE.SRGBColorSpace;foliage.anisotropy=4;
 // Photographic CC0 pine needles, arranged into a full bough on the GPU texture.
 const sprig=new Image();sprig.onload=()=>{ctx.clearRect(0,0,256,256);ctx.strokeStyle='#5d5740';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(128,255);ctx.lineTo(128,14);ctx.stroke();for(let row=0;row<12;row++){const y=28+row*17,span=10+row*7;for(const side of [-1,1]){ctx.save();ctx.translate(128+side*span*.4,y+12);ctx.rotate(side*(.65+row*.025));const h=45+row*4;ctx.drawImage(sprig,-h*.27,-h,h*.54,h);ctx.restore();}}foliage.needsUpdate=true;};sprig.src=new URL('../realistic-assets/wilderness/pine-sprig.webp',import.meta.url).href;

 const leaves=new THREE.MeshStandardMaterial({map:foliage,alphaTest:.22,side:THREE.DoubleSide,roughness:1,color:0xffffff});
 const vertices=[],uvs=[],idx=[];const point=new THREE.Vector3();
 for(let level=0;level<22;level++){const t=level/22,y=.15+t*.83,r=((1-t)*.23+.008)*(.85+noise(level*2,8)*.3);for(let branch=0;branch<6;branch++){const angle=branch*Math.PI/3+level*2.4,c=Math.cos(angle),s=Math.sin(angle),width=r*.65;const start=vertices.length/3;for(const [u,v]of [[-1,0],[1,0],[-1,1],[1,1]]){const d=v*r;point.set(c*d-s*u*width*(1-v*.5),y-d*.27+u*width*.13,s*d+c*u*width*(1-v*.5));vertices.push(point.x,point.y,point.z);uvs.push((u+1)/2,v);}idx.push(start,start+1,start+2,start+1,start+3,start+2);}}
 const crownGeometry=new THREE.BufferGeometry();crownGeometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));crownGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));crownGeometry.setIndex(idx);crownGeometry.computeVertexNormals();
 const trees=[];
 for(let i=0;i<10000;i++){const x=-1500+random()*3300,z=-3000+random()*3130,outside=Math.max(-444-x,x-570,-1350-z);if(outside<15||z>100|| (x>570&&Math.abs(z-(-Math.max(0,x-610)*.075+Math.sin((x-570)/40)*5))<15))continue;const h=wildernessHeight(x,z);if(h>215||z>70&&h<.3||random()>1-smooth(120,225,h))continue;const height=(25+random()*23)*(1-smooth(100,250,h)*.45);trees.push({x,z,y:h,height,rotation:random()*Math.PI*2,shade:.64+random()*.5});}
 // Deliberate dense edge belt tall enough to be seen above the wall.
 for(let i=0;i<470;i++){const side=i%3;const x=side===0?-464-random()*95:side===1?590+random()*110:-290+random()*970;const z=side===2?-1370-random()*110:-270+random()*355;if(side===1&&Math.abs(z)<22)continue;trees.push({x,z,y:wildernessHeight(x,z),height:29+random()*19,rotation:random()*Math.PI*2,shade:.65+random()*.45});}
 // The near-border pass must obey the same complete corridors as the distant forest.
 for(let i=trees.length-1;i>=0;i--)if(treeOverlapsRoad(trees[i].x,trees[i].z,trees[i].height*.19+1))trees.splice(i,1);
 const crowns=new THREE.InstancedMesh(crownGeometry,leaves,trees.length),trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.006,.013,1,7),new THREE.MeshStandardMaterial({color:0x675746,roughness:1}),trees.length);crowns.name='Instanced 3D evergreen forest';trunks.name='Forest trunks';const dummy=new THREE.Object3D(),color=new THREE.Color();
 trees.forEach((t,i)=>{dummy.position.set(t.x,t.y,t.z);dummy.rotation.set(0,t.rotation,0);dummy.scale.set(t.height,t.height,t.height);dummy.updateMatrix();crowns.setMatrixAt(i,dummy.matrix);color.setRGB(.85*t.shade,t.shade,.78*t.shade);crowns.setColorAt(i,color);dummy.position.y+=t.height*.5;dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);});crowns.receiveShadow=true;upgradePineMeshes(crowns,trunks);root.add(crowns,trunks);const distant=[],farLimit=matchMedia('(pointer:coarse)').matches?6500:14000;for(let i=0;i<farLimit*2&&distant.length<farLimit;i++){const x=-3400+random()*7100,z=-4700+random()*4800,outside=Math.max(-444-x,x-570,-1350-z);if(outside<650||outside>3000)continue;const y=wildernessHeight(x,z);if(y>220||z>70&&y<.3)continue;distant.push({x,z,y,h:28+random()*25});}
 const farTrees=new THREE.InstancedMesh(mergeGeometries([[1,.65,-.175],[.8,.6,.1],[.5,.45,.275]].map(([r,h,y])=>{const g=new THREE.ConeGeometry(r,h,7,1,true);g.translate(0,y,0);return g;})),new THREE.MeshStandardMaterial({color:0x334b35,roughness:1}),distant.length);farTrees.name='Distant forest continuing into the haze';for(let i=0;i<distant.length;i++){const t=distant[i];dummy.position.set(t.x,t.y+t.h*.5,t.z);dummy.rotation.set(0,i*2.399,0);dummy.scale.set(t.h*.15,t.h,t.h*.15);dummy.updateMatrix();farTrees.setMatrixAt(i,dummy.matrix);color.setRGB(.28+random()*.12,.38+random()*.13,.27+random()*.1);farTrees.setColorAt(i,color);}installTreeBreeze(farTrees.material,{offset:.5,strength:.004});farTrees.computeBoundingSphere();root.add(farTrees);
 scatterNaturalBoulders(root,{bounds:{x0:-1040,x1:1150,z0:-2100,z1:55},heightAt:wildernessHeight,count:matchMedia('(pointer:coarse)').matches?80:200,seed:9531,canPlace:(x,z,r)=>{const outside=Math.max(-444-x,x-570,-1350-z);return outside>18&&outside<700&&!treeOverlapsRoad(x,z,r+1.5);}});
 for(const mesh of root.children){if(!mesh.isMesh)continue;const kind=mesh.name==='Continuous eroded mountain terrain'?'terrain':mesh.name==='Forest trunks'?'trunk':mesh.name==='Distant forest continuing into the haze'?'far':'crown';replaceDistantTerrain(mesh.material,kind);}root.userData.replacedDistantMountains=true;const alpineHorizon=createAlpineHorizon(root);root.userData.treeCount=trees.length;root.userData.distantTreeCount=distant.length;return {root,alpineHorizon,terrainMaterial:material,treeCount:trees.length,distantTreeCount:distant.length};
}
