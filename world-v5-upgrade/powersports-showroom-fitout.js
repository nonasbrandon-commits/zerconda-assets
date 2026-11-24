import {powersportsEnvironment} from './reference-powersports-vehicles.js?v=20261124-driving-v339';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import fontData from './powersports-lettering.js?v=20261124-driving-v339';
let font;
export function buildPowersportsShowroomFitout(root){
 font??=new FontLoader().parse(fontData);const group=new THREE.Group();group.name='Raised illuminated Powersports sales wall and counter';root.add(group);
 const M=(color,roughness=.5,metalness=.4)=>new THREE.MeshStandardMaterial({color,roughness,metalness,envMap:powersportsEnvironment(),envMapIntensity:.6});const dark=M('#15191e',.42,.55),panel=M('#34383d',.36,.65),metal=M('#c8cdd1',.22,.85),red=new THREE.MeshStandardMaterial({color:'#bd0009',emissive:'#ff000a',emissiveIntensity:.70,toneMapped:false}),black=M('#080c11',.35,.35),stone=M('#292b2d',.25,.22);
 const box=(w,h,d,x,y,z,m,r=0)=>{const o=new THREE.Mesh(r?new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/4,h/4,d/4)):new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;group.add(o);return o;};
 const text=(value,w,h,x,y,z,m=metal)=>{const geo=new TextGeometry(value,{font,size:1,height:.035,curveSegments:4,bevelEnabled:true,bevelThickness:.006,bevelSize:.005,bevelSegments:1});geo.computeBoundingBox();const b=geo.boundingBox,size=b.getSize(new THREE.Vector3());geo.translate(-(b.min.x+b.max.x)/2,-(b.min.y+b.max.y)/2,0);const o=new THREE.Mesh(geo,m);o.scale.set(w/size.x,h/size.y,1);o.position.set(x,y,z);group.add(o);return o;};
 const frame=(x,y,z,w,h)=>{box(w+.25,h+.25,.24,x,y,z,dark,.02);box(w,h,.035,x,y,z+.14,black);for(const yy of[y-h/2-.025,y+h/2+.025])box(w+.12,.025,.035,x,yy,z+.16,red);for(const xx of[x-w/2-.025,x+w/2+.025])box(.025,h+.12,.035,xx,y,z+.16,red);};
 // Panel joints have depth; signs and trims project from the wall.
 box(26.6,5.75,.18,0,2.95,-10.75,dark);
 for(let row=0;row<4;row++)for(let col=0;col<6;col++)box(4.37,1.39,.065,-11.02+col*4.4,.83+row*1.42,-10.62,panel,.008);
 for(const x of[-7.7,7.7]){frame(x,5.08,-10.40,10.1,.91);text(x<0?'ATV':'MOTORCYCLES',x<0?4.5:8.6,.45,x,5.08,-10.21);for(const dx of[-4.25,4.25]){const slash=box(.25,.48,.055,x+dx,5.08,-10.18,red);slash.rotation.z=-.55;}}
 frame(0,4.05,-10.25,8.7,.68);text('SALES  /  SERVICE  /  PARTS',7.9,.29,0,4.05,-10.05);
 for(const x of[-4.65,4.65]){box(.18,3.5,.24,x,1.95,-10.35,black);box(.025,3.42,.045,x,1.95,-10.19,red);}
 const loader=new THREE.TextureLoader();
 for(const [x,file]of[[-8.7,'atv-showroom-poster-v339.jpg'],[8.7,'motorcycle-showroom-poster-v339.jpg']]){frame(x,2.65,-10.42,5.2,3.35);const texture=loader.load(new URL('./assets/'+file,import.meta.url).href);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;const picture=new THREE.Mesh(new THREE.PlaneGeometry(x<0?3.44:4.80,3.20),new THREE.MeshBasicMaterial({map:texture}));picture.position.set(x,2.65,-10.24);group.add(picture);}
 // Customer-facing counter with a stone overhang and bevelled metal face.
 box(5.8,.98,1.22,0,.52,-7.20,dark,.035);box(6.15,.10,1.52,0,1.08,-7.20,stone,.035);box(5.36,.77,.055,0,.58,-6.55,panel,.018);box(5.60,.025,.035,0,.985,-6.49,red);for(const side of[-1,1]){const strip=box(.022,.77,.035,side*2.57,.57,-6.49,red);strip.rotation.z=-side*.22;box(.025,.80,1.15,side*2.91,.56,-7.20,red);}
 text('ZERCONDA',3.9,.27,0,.66,-6.50);text('POWERSPORTS',3.1,.16,0,.37,-6.495,red);
 for(const x of[-2.0,2.0])for(const y of[.30,.65]){box(1.40,.28,.025,x,y,-7.83,panel,.008);box(.38,.025,.035,x,y+.02,-7.85,metal,.005);}
 box(1.05,.61,.065,-1.05,1.57,-7.22,black,.025);box(.70,.025,.38,-1.05,1.15,-7.20,dark,.012);box(.07,.18,.07,-1.05,1.25,-7.20,metal,.008);box(.30,.14,.22,.25,1.19,-7.0,black,.02);const scanner=box(.17,.06,.12,.25,1.27,-6.99,panel,.018);scanner.rotation.x=.35;box(.10,.012,.04,.25,1.31,-6.95,red,.002);
 // Small brochure stand and a leafy desktop plant.
 const brochure=box(.38,.48,.05,2.15,1.39,-7.20,metal,.012);brochure.rotation.x=-.18;const map=loader.load(new URL('./assets/motorcycle-showroom-poster-v339.jpg',import.meta.url).href);map.colorSpace=THREE.SRGBColorSpace;const image=new THREE.Mesh(new THREE.PlaneGeometry(.32,.39),new THREE.MeshBasicMaterial({map}));image.position.set(2.15,1.39,-7.157);image.rotation.x=-.18;group.add(image);
 const pot=new THREE.Mesh(new THREE.CylinderGeometry(.19,.15,.24,20),dark);pot.position.set(-2.32,1.25,-7.21);group.add(pot);const leafMat=M('#3d7436',.72,.05);for(let k=0;k<14;k++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),leafMat);leaf.scale.set(.07,.24,.035);const a=k*2.4;leaf.position.set(-2.32+Math.cos(a)*.13,1.56+(k%3)*.04,-7.21+Math.sin(a)*.13);leaf.rotation.set(Math.sin(a)*.6,0,Math.cos(a)*.6);group.add(leaf);}
 for(const x of[-8.7,8.7]){const light=new THREE.PointLight('#ffb397',7,3,2);light.position.set(x,4.6,-9.9);group.add(light);}return group;
}
