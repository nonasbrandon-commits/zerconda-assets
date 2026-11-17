import * as THREE from 'three';
// Shared furnished, enterable interior for every city building and residential home.
// All furniture is original reusable 3D geometry; no external model URLs or licensing dependencies.
export function createUniversalInteriors(scene){
 const root=new THREE.Group();root.name='Zerconda furnished building interiors';root.visible=false;scene.add(root);
 const origin={x:1900,z:1900}, W=15,D=18;
 root.position.set(origin.x,0,origin.z);
 const mat=(c,r=.85)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
 const plaster=mat(0xf1ede5),floor=mat(0xb9a18a),wood=mat(0x8b6041),fabric=mat(0x496b7e),dark=mat(0x333b42),glass=mat(0x8fb9c4,.2);
 function cube(parent,w,h,d,x,y,z,m){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 cube(root,W,.2,D,0,-.12,0,floor);
 for(const x of [-W/2,W/2])cube(root,.18,3.7,D,x,1.85,0,plaster);
 cube(root,W,3.7,.18,0,1.85,-D/2,plaster);
 // Front wall has a wide opening to avoid visually trapping the avatar.
 for(const x of [-5.2,5.2])cube(root,4.6,3.7,.18,x,1.85,D/2,plaster);
 cube(root,5.8,.55,.18,0,3.45,D/2,plaster);
 for(const x of [-4.5,4.5])for(const z of [-8.9,8.9]){
  cube(root,1.8,1.7,.08,x,2.05,z,glass);
 }
 // Living room: sectional sofa with cushions, coffee table, two chairs, side tables.
 function sofa(x,z,angle=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=angle;root.add(g);
  cube(g,3.5,.48,1.35,0,.48,0,fabric);cube(g,3.5,1.05,.32,0,1.08,-.58,fabric);
  for(const xx of [-1.67,1.67])cube(g,.23,.76,1.3,xx,.75,0,fabric);
  for(const xx of [-1.05,0,1.05])cube(g,.95,.15,1,xx,.79,.12,mat(0x668a9d));
 }
 function chair(x,z,angle=0){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=angle;root.add(g);
  cube(g,.95,.22,1,0,.54,0,fabric);cube(g,.95,1,.17,0,1.08,-.45,fabric);
  for(const xx of [-.35,.35])for(const zz of [-.35,.35])cube(g,.1,.55,.1,xx,.28,zz,wood);
 }
 sofa(-3,-3);chair(1.4,-3.5,-.3);chair(3.3,-3.5,.3);
 cube(root,2.2,.12,1.25,-.9,.55,-1.2,wood);
 for(const xx of [-1.8,0])for(const zz of [-1.7,-.7])cube(root,.12,.52,.12,xx,.27,zz,wood);
 // Dining room and four matching chairs.
 cube(root,3,.14,1.65,2.4,.86,3.5,wood);
 for(const xx of [1.35,3.45])for(const zz of [2.1,4.9])chair(xx,zz,zz<3.5?0:Math.PI);
 // Kitchen counters, cabinets, island, sink and refrigerator.
 for(const xx of [-5.7,-3.9,-2.1]){cube(root,1.7,.9,.75,xx,.46,-7.9,wood);cube(root,1.7,.12,.8,xx,.96,-7.9,mat(0xbcbdb8));}
 cube(root,1,.95,.85,-6,.48,-5.6,dark);cube(root,1,1.9,.9,-6,1,-6.8,mat(0xd3d6d5));
 // Bedroom nook: bed, pillows, nightstands and dresser.
 cube(root,2.5,.4,3.3,4,.44,-6.4,wood);cube(root,2.3,.25,2.8,4,.76,-6.25,mat(0xe4dfd5));
 cube(root,2.3,.75,.22,4,.95,-8.08,wood);
 for(const xx of [3.45,4.55])cube(root,.9,.16,.48,xx,.96,-7.2,mat(0xffffff));
 cube(root,1.25,.85,.65,6,.45,-5,wood);
 const sign=document.createElement('canvas');sign.width=512;sign.height=128;
 const ctx=sign.getContext('2d');const texture=new THREE.CanvasTexture(sign);texture.colorSpace=THREE.SRGBColorSpace;
 const label=new THREE.Mesh(new THREE.PlaneGeometry(3.8,.95),new THREE.MeshBasicMaterial({map:texture,transparent:true}));
 label.position.set(0,2.55,-8.88);root.add(label);
 function show(name){root.visible=true;ctx.fillStyle='#f4eee0';ctx.fillRect(0,0,512,128);ctx.fillStyle='#334b56';ctx.font='bold 42px Arial';ctx.textAlign='center';ctx.fillText(String(name).slice(0,25),256,79);texture.needsUpdate=true;}
 return {root,x:origin.x,z:origin.z,show,hide(){root.visible=false;},contains(x,z){return Math.abs(x-origin.x)<W/2-.4&&Math.abs(z-origin.z)<D/2-.4;}};
}
