import * as THREE from 'three';
// Original fictional Zerconda observation needle, not a real-world landmark.
// 88m open-air observation deck, elevator interaction and 360 degree view.
export function createObservationNeedle(scene,{x=48,z=-48}={}){
 const root=new THREE.Group();root.position.set(x,0,z);root.name='Zerconda Needle Observation Tower';scene.add(root);
 const stone=new THREE.MeshStandardMaterial({color:0xc8c6bf,roughness:.82});
 const steel=new THREE.MeshStandardMaterial({color:0x66747a,metalness:.7,roughness:.32});
 const trim=new THREE.MeshStandardMaterial({color:0x34434c,metalness:.7,roughness:.28});
 const windows=new THREE.MeshPhysicalMaterial({color:0x9ec9d7,metalness:.12,roughness:.09,transparent:true,opacity:.72,side:THREE.DoubleSide,clearcoat:1});
 const lit=new THREE.MeshBasicMaterial({color:0xe3f5ff});
 function mesh(geometry,material,px,py,pz){const o=new THREE.Mesh(geometry,material);o.position.set(px,py,pz);o.castShadow=false;o.receiveShadow=true;root.add(o);return o;}
 function cyl(top,bottom,height,y,material,sides=48){return mesh(new THREE.CylinderGeometry(top,bottom,height,sides),material,0,y,0);}
 cyl(7.3,7.7,.65,.32,stone);cyl(5.1,6.8,11,5.8,stone);
 cyl(2.3,4.2,63,42.5,steel);cyl(4.1,2.7,8,77.5,trim);
 // Reinforced glass-walled observation lounge.
 cyl(12.5,10.6,1.5,82,stone);
 cyl(11.4,11.4,5.8,85.6,windows,64);
 cyl(12.3,12.3,.9,88.9,stone);
 cyl(13.4,12.8,1.15,90.1,trim);
 cyl(8.6,8.6,.28,89.05,stone);
 cyl(1.05,1.05,13,97.1,steel);
 cyl(.28,.28,7,106.8,trim);
 const railMat=new THREE.MeshStandardMaterial({color:0xb3c5c9,metalness:.8,roughness:.25});
 for(let i=0;i<48;i++){
  const a=i*Math.PI/24,xx=Math.cos(a)*11.6,zz=Math.sin(a)*11.6;
  mesh(new THREE.CylinderGeometry(.065,.065,2.05,8),railMat,xx,90.1,zz);
 }
 const railing=mesh(new THREE.TorusGeometry(11.6,.075,8,96),railMat,0,91.1,0);railing.rotation.x=Math.PI/2;
 // Four steel support legs provide a readable architectural silhouette.
 for(let i=0;i<4;i++){
  const a=i*Math.PI/2+.785;
  const dx=Math.cos(a),dz=Math.sin(a);
  const points=[new THREE.Vector3(dx*5.4,1,dz*5.4),new THREE.Vector3(dx*3.2,28,dz*3.2),new THREE.Vector3(dx*2.3,65,dz*2.3)];
  const beam=mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),16,.36,8,false),steel,0,0,0);
 }
 // Glass elevator doors at ground level and an illuminated arrival sign.
 const door=mesh(new THREE.BoxGeometry(2.65,3.1,.12),windows,0,1.7,6.8);
 mesh(new THREE.BoxGeometry(3.1,.25,.32),trim,0,3.35,6.8);
 const sign=mesh(new THREE.BoxGeometry(3,.28,.09),lit,0,3.85,6.83);
 const signCanvas=document.createElement('canvas');signCanvas.width=512;signCanvas.height=128;
 const ctx=signCanvas.getContext('2d');ctx.fillStyle='#e8f2f5';ctx.fillRect(0,0,512,128);ctx.fillStyle='#19333e';ctx.font='bold 42px Arial';ctx.textAlign='center';ctx.fillText('OBSERVATION DECK',256,78);
 const tex=new THREE.CanvasTexture(signCanvas);tex.colorSpace=THREE.SRGBColorSpace;
 sign.material=new THREE.MeshBasicMaterial({map:tex});
 const beacon=new THREE.PointLight(0xf2faff,3,15);beacon.position.set(0,89.4,0);root.add(beacon);
 return {root,x,z,entrance:{x,z:z+8.2},deckY:90.1,deckRadius:10.7,
   // The tower shaft is solid; the public observation ring is walkable.
   isOnDeck(px,pz){return Math.hypot(px-x,pz-z)<=10.7;},
   dispose(){scene.remove(root);}};
}
