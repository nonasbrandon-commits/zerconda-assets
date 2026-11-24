import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import fontData from './powersports-lettering.js?v=20261124-driving-v339';
import {powersportsEnvironment} from './reference-powersports-vehicles.js?v=20261124-driving-v339';
let source;
export function buildPremiumHelmetDisplays(parent){
 const root=new THREE.Group();root.name='Premium full-face helmet display racks';root.userData.appliance=true;root.userData.cameraPassThrough=true;parent.add(root);
 const env=powersportsEnvironment(),dark=new THREE.MeshStandardMaterial({color:'#161b21',metalness:.6,roughness:.35,envMap:env,envMapIntensity:.45}),panel=new THREE.MeshStandardMaterial({color:'#35393e',metalness:.45,roughness:.44,envMap:env,envMapIntensity:.35}),silver=new THREE.MeshStandardMaterial({color:'#d1d5d8',metalness:.65,roughness:.25,envMap:env}),red=new THREE.MeshBasicMaterial({color:'#ff1828',toneMapped:false});
 const font=new FontLoader().parse(fontData),racks=[];
 for(const side of[-1,1]){
  const rack=new THREE.Group();rack.name='Three-tier red-lit helmet rack';rack.position.set(side*13.35,0,-5);rack.rotation.y=side<0?Math.PI/2:-Math.PI/2;root.add(rack);racks.push(rack);
  const box=(w,h,d,x,y,z,m,r=.0)=>{const mesh=new THREE.Mesh(r?new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/4,h/4,d/4)):new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;rack.add(mesh);return mesh;};
  box(4.8,3.28,.15,0,2.0,-.17,dark,.015);
  for(const x of[-2.44,2.44]){box(.12,3.42,.30,x,2.0,-.08,dark,.012);box(.014,3.22,.018,x,2.0,.085,red);}
  for(let row=0;row<10;row++)box(4.65,.010,.025,0,.50+row*.31,-.08,dark);
  for(const y of[.65,1.48,2.31]){box(4.85,.10,.74,0,y,.18,panel,.012);box(4.79,.021,.024,0,y-.035,.565,red);for(const x of[-1.65,0,1.65]){const lamp=new THREE.Mesh(new THREE.CircleGeometry(.046,16),new THREE.MeshBasicMaterial({color:'#fff0d9'}));lamp.rotation.x=Math.PI/2;lamp.position.set(x,y-.055,.28);rack.add(lamp);}}
  box(4.9,.14,.79,0,3.78,.16,dark,.015);box(4.7,.020,.025,0,3.68,.54,red);box(3.2,.48,.18,0,3.48,.49,dark,.025);
  const geometry=new TextGeometry('HELMETS',{font,size:.32,height:.025,curveSegments:4,bevelEnabled:true,bevelThickness:.004,bevelSize:.003,bevelSegments:1});geometry.computeBoundingBox();const b=geometry.boundingBox;geometry.translate(-(b.min.x+b.max.x)/2,-(b.min.y+b.max.y)/2,0);const letters=new THREE.Mesh(geometry,silver);letters.position.set(0,3.48,.59);rack.add(letters);
 }
 source??=new GLTFLoader().loadAsync(new URL('./assets/reference-helmet-v341.glb',import.meta.url).href).then(g=>g.scene);
 root.userData.readyPromise=source.then(template=>{
  const palettes=['#f0f2f4','#c51220','#17212b','#1253d8','#b8cf08'],materials=new Map();let count=0;
  for(let ri=0;ri<racks.length;ri++)for(let row=0;row<3;row++)for(let col=0;col<5;col++){
   const color=palettes[(col+row*2+ri)%palettes.length],model=template.clone(true),target=new THREE.Color(color);
   model.traverse(o=>{if(!o.isMesh)return;let mat=materials.get(color);if(!mat){const s=o.material;mat=new THREE.MeshPhysicalMaterial({map:s.map,normalMap:s.normalMap,metalnessMap:s.metalnessMap,roughnessMap:s.roughnessMap,roughness:.48,metalness:.32,clearcoat:.85,clearcoatRoughness:.12,envMap:env,envMapIntensity:.7,side:THREE.DoubleSide});mat.customProgramCacheKey=()=> 'helmet-'+color;mat.onBeforeCompile=shader=>{shader.uniforms.helmetPaint={value:target};shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nuniform vec3 helmetPaint;').replace('#include <map_fragment>','#include <map_fragment>\nfloat paint=step(diffuseColor.g*1.6,diffuseColor.r)*step(diffuseColor.b*1.5,diffuseColor.r);float brightness=max(max(diffuseColor.r,diffuseColor.g),diffuseColor.b);diffuseColor.rgb=mix(diffuseColor.rgb,helmetPaint*brightness*1.1,paint);');};materials.set(color,mat);}o.material=mat;o.castShadow=true;o.receiveShadow=true;});
   const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3()),scale=.58/size.y;model.scale.setScalar(scale);model.position.set((col-2)*.88-(bounds.min.x+bounds.max.x)*.5*scale,[.70,1.53,2.36][row]-bounds.min.y*scale,.16-(bounds.min.z+bounds.max.z)*.5*scale);model.rotation.y=(col%2?-.20:.12);model.name='Full-face helmet · '+color;model.userData.helmet=true;racks[ri].add(model);count++;
  }root.userData.helmetCount=count;root.userData.ready=true;return root;
 });return root;
}
