import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {addNaturalFerns} from './forest-natural-details.js?v=20261121-forest-airfield-v193';
let palette;
function materials(){if(palette)return palette;const c=document.createElement('canvas');c.width=c.height=1024;const a=c.getContext('2d');a.fillStyle='#5d594f';a.fillRect(0,0,1024,1024);let s=205;const rnd=()=>((s=Math.imul(s,1664525)+1013904223>>>0)/4294967296);for(let row=0;row<12;row++){let x=row%2?-80:0;while(x<1024){const w=90+rnd()*160,y=row*86,h=75+rnd()*6;a.fillStyle=['#ab9c85','#b9aa92','#978d7c','#c0ad90','#8d887a'][Math.floor(rnd()*5)];a.beginPath();a.moveTo(x+6,y+6);a.lineTo(x+w-7,y+3+rnd()*7);a.lineTo(x+w-4,y+h-7);a.lineTo(x+4,y+h);a.closePath();a.fill();for(let j=0;j<110;j++){a.fillStyle=j%2?'#fff4d91c':'#27251d20';a.fillRect(x+rnd()*w,y+rnd()*h,1+rnd()*5,1+rnd()*3);}a.strokeStyle='#ddd0b330';a.lineWidth=2;a.stroke();x+=w;}}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(1.2,2);const stone=new THREE.MeshStandardMaterial({map:t,bumpMap:t,bumpScale:.04,roughness:.92,color:0xe2dccf}),black=new THREE.MeshStandardMaterial({color:0x171c20,metalness:.55,roughness:.36}),timber=new THREE.MeshStandardMaterial({color:0x77563c,roughness:.7}),warm=new THREE.MeshBasicMaterial({color:0xffbc60,toneMapped:false}),hedge=new THREE.MeshStandardMaterial({color:0x4f6e2e,roughness:1});return palette={stone,black,timber,warm,hedge};}
export function upgradeModernEstate(home){const {stone,black,timber,warm,hedge}=materials(),root=new THREE.Group();root.name='Stone and charcoal modern estate exterior';home.group.add(root);const bins=new Map();function box(w,h,d,x,y,z,m=black,parent=root){const geo=new THREE.BoxGeometry(w,h,d);geo.translate(x,y,z);if(parent!==root){const o=new THREE.Mesh(geo,m);parent.add(o);return o;}const list=bins.get(m)||[];list.push(geo.toNonIndexed());bins.set(m,list);geo.dispose();}
 function lamp(x,y,z,parent=root,face=1){box(.27,.85,.20,x,y,z,black,parent);box(.15,.66,.045,x,y,z+face*.12,warm,parent);}
 for(const x of[-22,-10,-2.5,2.5,10,22]){const central=Math.abs(x)<3,h=central?5.3:4.3;box(.9,h,.55,x,.24+h/2,13.20,stone);box(1.02,.12,.72,x,.24+h,13.20,black);lamp(x,2.65,13.57);}
 for(const x of[-22,22])for(const z of[-13,0]){box(.55,4.3,.9,x,.24+2.15,z,stone);}
 for(const x of[-22,-2.5,2.5,22]){box(.9,Math.abs(x)<3?5.3:4.3,.50,x,Math.abs(x)<3?2.89:2.39,-13.16,stone);lamp(x,2.6,-13.48,root,-1);}
 for(const side of[-1,1]){box(15.5,.09,29,side*15.75,4.61,0,timber);box(15.5,.045,.035,side*15.75,4.65,14.52,warm);for(let x=side<0?-22:-7;x<(side<0?-8:23);x+=2.8)box(.20,.035,.20,x,4.55,13.8,warm);}
 box(16,.09,28,0,5.56,1,timber);box(16,.05,.05,0,5.61,15.02,warm);box(16,.2,.18,0,5.45,13.17,black);for(const x of[-8,8])box(.12,.85,26,x,5.12,0,black);
 // Central glazed transom and black frames keep every window bay clear of stone piers.
 const transom=new THREE.MeshPhysicalMaterial({color:0x26383c,roughness:.12,metalness:.1,transparent:true,opacity:.65,side:THREE.DoubleSide});box(15.96,.90,.05,0,5.0,13.17,transom);for(const x of[-8,-2.0,2.0,8])box(.10,.95,.16,x,5.0,13.2,black);
 for(const x of[-9.45,-3.05,3.05,9.45,10.6,21.4])box(.10,3.95,.13,x,2.25,13.10,black);for(const x of[-6.25,6.25,16])box(x===16?10.8:6.5,.12,.13,x,.32,13.10,black);
 
 // Layered covered carport, inside the existing lot, with a clear route underneath.
 box(11,.26,15,27.5,4.45,6.5,black);box(10.7,.08,14.7,27.5,4.27,6.5,timber);box(11,.04,.04,27.5,4.29,14.03,warm);for(const z of[-.5,13.5]){box(.8,4.0,.8,32.2,2.22,z,stone);lamp(32.2,2.55,z+.45);}for(const x of[24,27.5,31])box(.16,.03,.16,x,4.20,12.5,warm);
 if(home.garagePivot){box(8.45,3.31,.05,0,-1.675,.12,black,home.garagePivot);for(const y of[-.55,-1.50,-2.45])box(7.8,.04,.035,0,y,.165,warm,home.garagePivot);}
 for(const x of[-33,-22,-11.3,-2.5,2.5,12,22,33]){box(.8,1.95,.75,x,.975,31,stone);box(1.02,.12,.95,x,2.01,31,black);lamp(x,1.05,31.43);}
 // Continue the street fence around both sides and the rear, sharing corner piers.
 for(const x of[-33,33]){box(.22,.35,102,x,.175,-20,stone);for(const y of[.55,.78,1.01,1.24,1.47])box(.16,.10,102,x,y,-20,black);for(let j=1;j<=10;j++){const z=31-j*10.2;box(.8,1.95,.75,x,.975,z,stone);box(1.02,.12,.95,x,2.01,z,black);}}
 box(66,.35,.22,0,.175,-71,stone);for(const y of[.55,.78,1.01,1.24,1.47])box(66,.10,.16,0,y,-71,black);for(let j=1;j<6;j++){const x=-33+j*11;box(.8,1.95,.75,x,.975,-71,stone);box(1.02,.12,.95,x,2.01,-71,black);}
 // Low planting strips stay out of both the four-metre entry and driveway gates.
 const ferns=[];for(const[lo,hi]of[[-32,-23],[-10,-4],[4,32]])for(let x=lo;x<hi;x+=1.25){const o=new THREE.Mesh(new THREE.SphereGeometry(1,7,5),hedge);o.scale.set(.75,.40,.55);o.position.set(x,.40,30.3);root.add(o);}for(const x of[-8.5,8.5,21,31]){box(1.7,.55,1.5,x,.45,16,black);ferns.push({x,z:16,y:.73,scale:1.9,angle:x});}addNaturalFerns(root,ferns);
 for(const x of[-22,22]){const light=new THREE.PointLight(0xffc37b,5,7,2);light.position.set(x,2.6,-13.8);root.add(light);}
 for(const x of[-2.5,2.5,22]){const light=new THREE.PointLight(0xffc37b,7,9,2);light.position.set(x,3,14.1);root.add(light);}
 for(const[m,list]of bins){const mesh=new THREE.Mesh(mergeGeometries(list),m);mesh.castShadow=mesh.receiveShadow=true;root.add(mesh);list.forEach(g=>g.dispose());}home.modernExterior=root;return root;}
