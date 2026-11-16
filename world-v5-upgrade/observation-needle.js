import * as THREE from 'three';
// Original fictional Zerconda observation needle, not a real-world landmark.
// 88m open-air observation deck, elevator interaction and 360 degree view.
export function createObservationNeedle(scene,{x=48,z=-48}={}){
 const root=new THREE.Group();root.position.set(x,0,z);root.name='Zerconda Needle Observation Tower';scene.add(root);
 const textureLoader=new THREE.TextureLoader();
 const concreteColor=textureLoader.load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/water-concrete-v1/tower-concrete-warm-color.jpg');
 const concreteNormal=textureLoader.load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/water-concrete-v1/tower-concrete-warm-normal.jpg');
 for(const t of [concreteColor,concreteNormal]){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,5);t.anisotropy=8;}
 concreteColor.colorSpace=THREE.SRGBColorSpace;
 const stone=new THREE.MeshStandardMaterial({map:concreteColor,normalMap:concreteNormal,normalScale:new THREE.Vector2(.32,.32),color:0xf0ede5,roughness:.85,metalness:0,emissive:0x3b3935,emissiveIntensity:.24});
 const coolColor=textureLoader.load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/water-concrete-v1/tower-concrete-cool-color.jpg');
 const coolNormal=textureLoader.load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/water-concrete-v1/tower-concrete-cool-normal.jpg');
 for(const t of [coolColor,coolNormal]){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,5);t.anisotropy=8;}
 coolColor.colorSpace=THREE.SRGBColorSpace;
 const steel=new THREE.MeshStandardMaterial({map:coolColor,normalMap:coolNormal,normalScale:new THREE.Vector2(.28,.28),color:0xe3e6e5,metalness:.03,roughness:.78,emissive:0x414747,emissiveIntensity:.24});
 const trim=new THREE.MeshStandardMaterial({color:0x869ba3,metalness:.4,roughness:.36,emissive:0x24313a,emissiveIntensity:.2});
 const windows=new THREE.MeshPhysicalMaterial({color:0x9ec9d7,metalness:.12,roughness:.09,transparent:true,opacity:.72,side:THREE.DoubleSide,clearcoat:1});
 const lit=new THREE.MeshBasicMaterial({color:0xe3f5ff});
 function mesh(geometry,material,px,py,pz){const o=new THREE.Mesh(geometry,material);o.position.set(px,py,pz);o.castShadow=false;o.receiveShadow=false;root.add(o);return o;}
 function cyl(top,bottom,height,y,material,sides=48){return mesh(new THREE.CylinderGeometry(top,bottom,height,sides),material,0,y,0);}
 cyl(7.3,7.7,.65,.32,stone);cyl(5.1,6.8,11,5.8,stone);
 // Tapered core and exposed sweeping support structure like the homepage needle.
 cyl(2.1,3.6,67,44,steel);
 for(let i=0;i<3;i++){
  const a=i*Math.PI*2/3;
  const points=[new THREE.Vector3(Math.cos(a)*9.5,1,Math.sin(a)*9.5),new THREE.Vector3(Math.cos(a)*6.4,30,Math.sin(a)*6.4),new THREE.Vector3(Math.cos(a)*3.5,74,Math.sin(a)*3.5)];
  mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),24,.82,12),steel,0,0,0);
 }
 for(const h of [22,44,67]){
  const ring=mesh(new THREE.TorusGeometry(6.9-h*.045,.33,10,64),trim,0,h,0);ring.rotation.x=Math.PI/2;
 }
 cyl(4.1,2.7,8,77.5,trim);
 // Reinforced glass-walled observation lounge.
 cyl(11.4,9.5,1.6,81.9,stone);
 const lowerDeck=mesh(new THREE.TorusGeometry(11.9,.68,14,96),trim,0,82.3,0);lowerDeck.rotation.x=Math.PI/2;
 // Open panoramic glazing; no opaque central wall obstructing the skyline.
 const glazing=cyl(11.4,11.4,5.8,85.6,windows,64);
 glazing.material.depthWrite=false;
 cyl(12.3,12.3,.9,88.9,stone);
 cyl(13.4,12.8,1.15,90.1,trim);
 const roofRim=mesh(new THREE.TorusGeometry(13.15,.52,12,96),steel,0,90.8,0);roofRim.rotation.x=Math.PI/2;
 const roofGlass=new THREE.MeshPhysicalMaterial({color:0x5b8391,roughness:.18,metalness:.22,transparent:true,opacity:.9,side:THREE.DoubleSide});
 const dome=mesh(new THREE.SphereGeometry(11.2,64,24,0,Math.PI*2,0,Math.PI*.31),roofGlass,0,90.55,0);
 dome.scale.y=.35;
 cyl(8.6,8.6,.28,89.05,stone);
 cyl(.75,.9,10,95.4,steel);
 cyl(.23,.23,7,103.6,trim);
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
 // Concrete horizontal collar rings, vertical ribs and architectural cross-bracing.
 for(const h of [12,25,38,51,64,76]){
  const ring=mesh(new THREE.TorusGeometry(Math.max(2.5,5.8-h*.035),.25,10,64),stone,0,h,0);
  ring.rotation.x=Math.PI/2;
 }
 for(let i=0;i<8;i++){
  const a=i*Math.PI/4;
  const radius=3.1;
  const rib=mesh(new THREE.BoxGeometry(.24,49,.34),stone,Math.cos(a)*radius,42,Math.sin(a)*radius);
  rib.rotation.y=-a;
 }
 // Glass elevator doors at ground level and an illuminated arrival sign.
 // Visible street-level elevator lobby: pale stone, glass entry and a lit portal.
 const entry=mesh(new THREE.BoxGeometry(5.2,4.3,3.8),stone,0,2.15,6.8);
 const portal=mesh(new THREE.BoxGeometry(3.35,3.35,.2),trim,0,1.7,8.78);
 const door=mesh(new THREE.BoxGeometry(2.85,3.05,.22),windows,0,1.62,8.94);
 const entryLight=new THREE.PointLight(0xffffff,4,18);entryLight.position.set(0,3.5,9.3);root.add(entryLight);
 mesh(new THREE.BoxGeometry(3.1,.25,.32),trim,0,3.35,8.92);
 const sign=mesh(new THREE.BoxGeometry(3,.28,.09),lit,0,3.85,8.98);
 const signCanvas=document.createElement('canvas');signCanvas.width=512;signCanvas.height=128;
 const ctx=signCanvas.getContext('2d');ctx.fillStyle='#e8f2f5';ctx.fillRect(0,0,512,128);ctx.fillStyle='#19333e';ctx.font='bold 42px Arial';ctx.textAlign='center';ctx.fillText('OBSERVATION DECK',256,78);
 const tex=new THREE.CanvasTexture(signCanvas);tex.colorSpace=THREE.SRGBColorSpace;
 sign.material=new THREE.MeshBasicMaterial({map:tex});
 // Panoramic lounge: benches and binocular viewing stations around the rim.
 const seating=new THREE.MeshStandardMaterial({color:0x8b6e58,roughness:.82});
 for(let i=0;i<12;i++){
  const a=i*Math.PI/6,px=Math.cos(a)*8.2,pz=Math.sin(a)*8.2;
  const seat=mesh(new THREE.BoxGeometry(2.1,.23,.72),seating,px,89.65,pz);
  seat.rotation.y=-a+Math.PI/2;
  const back=mesh(new THREE.BoxGeometry(2.1,.8,.18),seating,px+Math.cos(a)*.3,90.04,pz+Math.sin(a)*.3);
  back.rotation.y=seat.rotation.y;
 }
 for(let i=0;i<6;i++){
  const a=i*Math.PI/3,px=Math.cos(a)*9.8,pz=Math.sin(a)*9.8;
  mesh(new THREE.CylinderGeometry(.08,.14,1.3,10),steel,px,89.8,pz);
  const scope=mesh(new THREE.CylinderGeometry(.16,.2,.75,16),trim,px,90.5,pz);
  scope.rotation.z=Math.PI/2;
 }
 const beacon=new THREE.PointLight(0xf2faff,3,15);beacon.position.set(0,89.4,0);root.add(beacon);
 return {root,x,z,entrance:{x,z:z+10.4},deckY:90.1,deckRadius:10.7,
   // The tower shaft is solid; the public observation ring is walkable.
   isOnDeck(px,pz){return Math.hypot(px-x,pz-z)<=10.7;},
   dispose(){scene.remove(root);}};
}
