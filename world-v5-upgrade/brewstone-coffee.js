import * as THREE from 'three';
// Zerconda original cafe set across the north street from Observation Needle.
// Seats are local interactions; multiplayer presence needs a shared realtime server.
export function createCoffeeShop(scene,{x=48,z=48}={}){
 const root=new THREE.Group();root.name='Brewstone Coffee - 3D furnished cafe';root.position.set(x,0,z);scene.add(root);
 const mat=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const brick=mat(0xa5755e,.92),plaster=mat(0xe6ded0,.92),floor=mat(0xb8aa93,.8),wood=mat(0x76503b,.65),
  black=mat(0x28343a,.35,.4),glass=new THREE.MeshPhysicalMaterial({color:0xb1d5dc,roughness:.12,metalness:.1,transparent:true,opacity:.38,side:THREE.DoubleSide,depthWrite:false}),
  fabric=mat(0x466e69,.95),metal=mat(0x9aa6a6,.32,.7);
 const cube=new THREE.BoxGeometry(1,1,1);
 function box(x,y,z,w,h,d,m){const o=new THREE.Mesh(cube,m);o.position.set(x,y,z);o.scale.set(w,h,d);o.receiveShadow=true;root.add(o);return o;}
 function cyl(x,y,z,r,h,m){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,16),m);o.position.set(x,y,z);root.add(o);return o;}
 // Open cafe, 24x18 meters. South-facing glazed entrance faces tower.
 box(0,.12,0,24,.24,18,floor);
 box(0,3.2,-9,24,6.4,.35,brick);
 for(const sx of [-1,1])box(sx*12,3.2,0,.35,6.4,18,plaster);
 box(0,6.45,0,24.7,.38,18.7,black);
 for(const xx of [-10.8,-6.8,-2.4,2.4,6.8,10.8])box(xx,3.1,9,.2,6.2,.25,black);
 box(-7.8,3.1,9,7.6,5.8,.12,glass);box(7.8,3.1,9,7.6,5.8,.12,glass);
 box(0,4.8,9,4.3,2.3,.13,glass);
 // Real walk-through doorway, no invisible front wall.
 box(0,1.65,9,3.6,3.3,.1,glass);
 box(0,3.42,9,4,.2,.2,black);
 // Cafe counter, espresso bar and shelves.
 box(0,1.05,-6.5,14,2.1,1.8,wood);box(0,2.16,-6.5,14.4,.2,2,metal);
 for(const xx of [-4,0,4]){box(xx,3.65,-8.7,2.6,.16,.55,wood);box(xx,4.75,-8.7,2.6,.16,.55,wood);}
 for(const xx of [-3,-2.4,2.5,3.2])cyl(xx,2.55,-6.4,.22,.55,black);
 // Outdoor patio to the south of shop, away from tower access road.
 const seats=[];
 function table(tx,tz,rot=0){
  cyl(tx,.75,tz,.78,.12,wood);cyl(tx,.38,tz,.08,.75,black);
  for(let j=0;j<4;j++){
   const a=j*Math.PI/2+rot,px=tx+Math.cos(a)*1.5,pz=tz+Math.sin(a)*1.5;
   box(px,.48,pz,.65,.16,.65,wood);
   box(px,.27,pz,.1,.46,.1,black);
   box(px,.88,pz+Math.sin(a)*.32,.68,.7,.12,fabric);
   seats.push({x:x+px,z:z+pz,facing:a,occupied:false});
  }
 }
 for(const [tx,tz] of [[-7,1],[0,1],[7,1],[-7,5],[0,5],[7,5],[-7,14],[0,14],[7,14]])table(tx,tz);
 for(const px of [-10,10])for(const pz of [11,17]){
  box(px,.45,pz,1.2,.9,1.2,plaster);
  const leaves=new THREE.Mesh(new THREE.IcosahedronGeometry(.85,1),fabric);leaves.position.set(px,1.65,pz);root.add(leaves);
 }
 // Sign above the glass shopfront, visible from observation tower.
 const cv=document.createElement('canvas');cv.width=1024;cv.height=256;
 const ctx=cv.getContext('2d');ctx.fillStyle='#263b3a';ctx.fillRect(0,0,1024,256);
 ctx.fillStyle='#f8e4c0';ctx.font='bold 112px Arial';ctx.textAlign='center';ctx.fillText('BREWSTONE COFFEE',512,160);
 const signTex=new THREE.CanvasTexture(cv);signTex.colorSpace=THREE.SRGBColorSpace;
 const sign=new THREE.Mesh(new THREE.PlaneGeometry(15,3.75),new THREE.MeshBasicMaterial({map:signTex,side:THREE.DoubleSide}));
 sign.position.set(0,5.25,9.18);root.add(sign);
 for(const xx of [-9,-3,3,9]){
  const light=new THREE.PointLight(0xffd6a1,.8,6);light.position.set(xx,4.8,1);root.add(light);
 }
 return {root,seats,entrance:{x,z:z+11},isInside:(px,pz)=>Math.abs(px-x)<11.8&&Math.abs(pz-z)<8.8,
 nearestSeat(px,pz,max=2.1){let best=null,dist=max;for(const seat of seats){const d=Math.hypot(seat.x-px,seat.z-pz);if(d<dist){dist=d;best=seat;}}return best;},
 dispose(){scene.remove(root);}};
}
