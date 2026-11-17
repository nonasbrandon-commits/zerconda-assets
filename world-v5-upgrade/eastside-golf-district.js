import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Zerconda Eastside: residential approach and playable-scale three-hole public golf park.
// Located about three 96m blocks east of the Needle at (48,-48).
export function createEastsideGolfDistrict(scene,{x=425,z=-48}={}){
 const root=new THREE.Group();root.name='Eastside Golf and Residential District';scene.add(root);
 const mat=(color,roughness=.94)=>new THREE.MeshStandardMaterial({color,roughness});
 const grass=mat(0x4b8045),fairway=mat(0x62994d),rough=mat(0x396c38),green=mat(0x80b85a),sand=mat(0xe9d2a0);
 const road=mat(0x41484b),walk=mat(0xb8b5a7),brick=mat(0x9c6452),brick2=mat(0xb48a70);
 const glass=new THREE.MeshPhysicalMaterial({color:0x6b9db2,roughness:.19,metalness:.24,transparent:true,opacity:.83});
 const trim=mat(0xd9d0bf),roof=mat(0x39464b),wood=mat(0x80664d),bark=mat(0x70503a);
 const treeInstances=[];
 const leaf=[0x3e6f39,0x4e8640,0x648d49,0x2f6339].map(c=>mat(c));
 const water=new THREE.MeshPhysicalMaterial({color:0x248c98,metalness:.1,roughness:.16,clearcoat:1});
 const flag=[mat(0xe5e6e4),mat(0xd44432),mat(0x306ca2)];
 const boxGeo=new THREE.BoxGeometry(1,1,1);
 function box(parent,x,y,z,w,h,d,m){const mesh=new THREE.Mesh(boxGeo,m);mesh.position.set(x,y,z);mesh.scale.set(w,h,d);mesh.castShadow=h>1;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 function oval(parent,x,z,rx,rz,m,y=.07){const mesh=new THREE.Mesh(new THREE.CircleGeometry(1,48),m);mesh.rotation.x=-Math.PI/2;mesh.scale.set(rx,rz,1);mesh.position.set(x,y,z);mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 function tree(parent,x,z,scale=1,seed=0){
  const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(scale);parent.add(g);treeInstances.push({g,seed});
  // No cartoon placeholder crown. Model is loaded below; failed loads leave an empty planting location instead of lollipop trees.
 }
 // Access boulevard from the existing eastern city edge. 3 blocks east of Needle.
 box(root,236,-.12,-48,300,.16,14,road);
 for(const side of [-1,1]){
  box(root,236,.02,-48+side*8,300,.12,2.4,walk);
  for(let i=0;i<22;i++)tree(root,105+i*12,-48+side*12, .65+(i%3)*.07,i);
 }
 // Apartments and houses precede the golf club. Their fronts face the boulevard.
 for(let i=0;i<16;i++){
  const side=i%2===0?-1:1,col=Math.floor(i/2),px=165+col*19,pz=-48+side*35;
  const apartment=i%4===0||i%4===1;
  const g=new THREE.Group();g.position.set(px,0,pz);root.add(g);
  const w=apartment?14:12,d=apartment?16:13,h=apartment?14+(i%3)*3:6.8+(i%3)*.6;
  box(g,0,h/2,0,w,h,d,i%3===0?brick:brick2);
  box(g,0,h+.35,0,w+.8,.7,d+.8,roof);
  for(let floor=0;floor<Math.floor(h/3.2);floor++)for(const sideFace of [-1,1])for(let bay=0;bay<3;bay++){
   const xx=(bay-1)*w*.28,yy=1.9+floor*3.2;
   box(g,xx,yy,sideFace*(d/2+.08),1.7,1.9,.13,glass);
   box(g,xx,yy+1,sideFace*(d/2+.14),2,.12,.2,trim);
   if(apartment&&floor>0&&bay===1){
    box(g,xx,yy-1,sideFace*(d/2+1),3,.13,2,trim);
    box(g,xx,yy-.18,sideFace*(d/2+2),3,.08,.09,roof);
   }
  }
  box(g,0,1.4,-d/2-.15,2.2,2.7,.2,wood);
  if(!apartment){box(g,4,1.4,-d/2-.15,3.4,2.7,.2,roof);box(g,4,.1,-d/2-5,4,.12,9,walk);}
  tree(g,-w/2-2,3,.52,i);
 }
 // Course perimeter: grass, fairways, sand traps, water hazard, paths.
 const course=new THREE.Group();course.position.set(x,0,z);root.add(course);
 box(course,0,-.15,0,300,.25,260,rough);
 for(const [fx,fz,rx,rz,rotation] of [[-68,-63,65,25,-.28],[53,-5,85,26,.33],[-28,73,73,26,-.23]]){
  const f=oval(course,fx,fz,rx,rz,fairway,.04);f.rotation.z=rotation;
 }
 const holes=[{tee:[-120,-91],pin:[-19,-35],n:1},{tee:[-115,0],pin:[108,15],n:2},{tee:[98,85],pin:[-95,92],n:3}];
 for(const hole of holes){
  const [px,pz]=hole.pin;
  oval(course,px,pz,14,12,green,.095);
  oval(course,px+14,pz+10,10,5,sand,.065);
  oval(course,px-18,pz-12,8,6,sand,.065);
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,3.2,8),trim);
  pole.position.set(px,1.65,pz);course.add(pole);
  const banner=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.85),flag[hole.n%3]);
  banner.position.set(px+.72,2.75,pz);course.add(banner);
  const tee=oval(course,hole.tee[0],hole.tee[1],7,5,green,.09);
  for(let j=0;j<2;j++){const ball=new THREE.Mesh(new THREE.SphereGeometry(.11,10,8),trim);ball.position.set(hole.tee[0]+j*.7,.22,hole.tee[1]);course.add(ball);}
 }
 const pond=oval(course,35,74,31,17,water,.1);
 for(let i=0;i<38;i++){
  const theta=i*2.399963,rad=115+(i%4)*4;
  const tx=Math.cos(theta)*rad,tz=Math.sin(theta)*rad;
  if(Math.abs(tx)<24&&tz< -95)continue;
  tree(course,tx,tz,.75+(i%4)*.2,i);
 }
 // Swap placeholder foliage for real modeled leafy trees stored in Zerconda assets.
 const treeUrl='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/trees-and-vehicles/trees/leafy-island-tree.glb';
 new GLTFLoader().load(treeUrl,gltf=>{
  const original=gltf.scene,bb=new THREE.Box3().setFromObject(original),sz=bb.getSize(new THREE.Vector3());
  if(sz.y<.01)return;
  for(const {g,seed} of treeInstances){
   g.clear();const model=original.clone(true),scale=(8.5+(seed%4)*1.6)/sz.y;
   model.scale.setScalar(scale);model.position.set(-bb.getCenter(new THREE.Vector3()).x*scale,-bb.min.y*scale,-bb.getCenter(new THREE.Vector3()).z*scale);
   model.rotation.y=seed*1.67;model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});g.add(model);
  }
  console.info('ZERCONDA: golf district loaded actual GLB trees',treeInstances.length);
 },undefined,e=>console.warn('Golf GLB tree unavailable; fallback retained',e));
 // Mowing bands, contoured rough, and continuous winding golf-cart paths.
 const mowA=mat(0x5b9146),mowB=mat(0x659c4d);
 for(const [cx,cz,rx,rz,rotation] of [[-68,-63,65,25,-.28],[53,-5,85,26,.33],[-28,73,73,26,-.23]]){
  for(let i=-4;i<=4;i++){
   const patch=oval(course,cx+i*rx*.16,cz,rx*.11,rz*.88,i%2?mowA:mowB,.049);
   patch.rotation.z=rotation;
  }
 }
 const cartWaypoints=[[-130,-115],[-103,-91],[-79,-54],[-50,-29],[-12,-16],[34,-30],[82,-9],[111,27],[89,70],[42,99],[-11,102],[-68,94],[-112,69]];
 const cartCurve=new THREE.CatmullRomCurve3(cartWaypoints.map(([xx,zz])=>new THREE.Vector3(xx,.058,zz)),false,'catmullrom',.35);
 const cartRibbon=new THREE.Mesh(new THREE.TubeGeometry(cartCurve,180,1.55,8,false),walk);
 cartRibbon.scale.y=.035;cartRibbon.receiveShadow=true;course.add(cartRibbon);
 // Golf cart path and carts.
 for(let i=0;i<18;i++){
  const a=i/17*Math.PI*1.7+.3;
  const px=Math.cos(a)*108,pz=Math.sin(a)*92;
  oval(course,px,pz,4.2,3.4,walk,.055);
 }
 // Four-seat resort-style carts: sculpted body, windscreen, canopy, seatbacks, golf bags and wheels.
 for(const [cx,cz,angle] of [[-118,-115,.1],[-109,-115,-.25],[104,-103,.7]]){
  const cart=new THREE.Group();cart.position.set(cx,.15,cz);cart.rotation.y=angle;course.add(cart);
  const body=mat(0xecece5,.42),dark=mat(0x20272b,.62),seat=mat(0xbcb6a7,.82),chrome=mat(0xb0b7b9,.25);
  box(cart,0,.64,0,2.08,.5,3.35,body);
  box(cart,0,.98,-1.13,2,.36,1.04,body);
  box(cart,0,.98,.45,2,.18,1.65,dark);
  box(cart,0,1.21,.28,1.86,.18,1.12,seat);
  box(cart,0,1.58,.76,1.86,.67,.16,seat);
  box(cart,0,2.35,0,2.35,.13,3.65,body);
  for(const xx of [-.99,.99])for(const zz of [-1.25,1.25]){
   box(cart,xx,1.69,zz,.065,1.34,.065,chrome);
   const tire=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.23,20),dark);
   tire.rotation.z=Math.PI/2;tire.position.set(xx*1.07,.44,zz);cart.add(tire);
   const hub=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,.245,20),chrome);
   hub.rotation.z=Math.PI/2;hub.position.copy(tire.position);cart.add(hub);
  }
  const windshield=new THREE.Mesh(new THREE.PlaneGeometry(1.95,.98),new THREE.MeshPhysicalMaterial({color:0xb8d9df,transparent:true,opacity:.34,roughness:.12,side:THREE.DoubleSide}));
  windshield.position.set(0,1.77,-1.1);cart.add(windshield);
  const steering=new THREE.Mesh(new THREE.TorusGeometry(.27,.038,8,20),dark);steering.position.set(-.48,1.48,-.91);steering.rotation.x=.55;cart.add(steering);
  for(const xx of [-.38,.38]){
   const bag=new THREE.Mesh(new THREE.CylinderGeometry(.24,.19,1.02,12),dark);
   bag.position.set(xx,1.31,1.63);bag.rotation.x=-.16;cart.add(bag);
   for(let k=0;k<3;k++)box(cart,xx+(k-1)*.08,2.02,1.65,.04,.5,.04,chrome);
  }
 }
 // Modern golf-course homes face inward onto fairways, outside playable boundaries.
 // Architectural reference: low, wide two-storey stone-and-glass clubhouse-style residences.
 const stone=mat(0xb7aa96,.92),stucco=mat(0xd7d2c7,.85),steel=mat(0x29343a,.44);
 const homeGlass=new THREE.MeshPhysicalMaterial({color:0x6592a8,roughness:.17,metalness:.18,transparent:true,opacity:.78});
 function modernHome(px,pz,rotation,variant){
  const home=new THREE.Group();home.position.set(px,0,pz);home.rotation.y=rotation;course.add(home);
  const width=18+variant%3*2;
  box(home,0,2.2,0,width,4.4,13,stone);
  box(home,-3,6.05,-.6,width-5,3.4,11,stucco);
  box(home,0,7.88,0,width+1,.36,14,steel);
  box(home,3,4.5,0,width*.47,.25,13.5,steel);
  for(const level of [2.1,5.9])for(let col=0;col<5;col++){
   const xx=-width*.39+col*width*.195;
   box(home,xx,level,-6.57,width*.16,level===2.1?2.8:2.5,.08,homeGlass);
   box(home,xx,level,6.57,width*.16,level===2.1?2.8:2.5,.08,homeGlass);
   box(home,xx,level,-6.67,.075,level===2.1?2.95:2.65,.11,steel);
  }
  box(home,0,4.15,-7.4,width*.82,.17,2.3,steel);
  for(const xx of [-width*.4,width*.4])box(home,xx,2.1,-7.35,.16,4.2,.16,steel);
  box(home,0,.13,-10,width*.7,.18,6,walk);
  // Native landscape strips instead of geometric lollipop trees.
  for(const xx of [-width*.5,width*.5])for(let j=0;j<4;j++){
   const shrub=new THREE.Mesh(new THREE.IcosahedronGeometry(.6+j*.07,2),mat(0x416a40,.98));
   shrub.position.set(xx,.42,-4+j*2.3);home.add(shrub);
  }
 }
 for(const [hx,hz,rot,v] of [[-116,151,Math.PI,0],[-76,151,Math.PI,1],[-36,151,Math.PI,2],[10,151,Math.PI,3],[55,151,Math.PI,4],[100,151,Math.PI,5],[-116,-153,0,6],[-68,-153,0,7],[14,-153,0,8],[84,-153,0,9]])modernHome(hx,hz,rot,v);
 // Clubhouse: covered entrance, glazing, porch, terrace and sign.
 const club=new THREE.Group();club.position.set(-125,0,-122);course.add(club);
 box(club,0,3.3,0,25,6.6,14,brick);
 box(club,0,6.9,0,26,.6,15,roof);
 box(club,0,2.1,7.1,4,4.1,.2,glass);
 for(const dx of [-9,-5,5,9])box(club,dx,2.7,7.1,2.6,3,.15,glass);
 box(club,0,.14,10,23,.2,6,walk);
 for(const dx of [-10,10])box(club,dx,2.5,10,.24,5,.24,trim);
 box(club,0,5,10,23,.3,5,roof);
 // Sign is a generated texture so text is legible from the road.
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=180;
 const ctx=canvas.getContext('2d');ctx.fillStyle='#173b34';ctx.fillRect(0,0,1024,180);
 ctx.fillStyle='#f7f1d9';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 74px Arial';ctx.fillText('ZERCONDA GOLF CLUB',512,90);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const sign=new THREE.Mesh(new THREE.PlaneGeometry(15,2.65),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));
 sign.position.set(0,5.1,7.28);club.add(sign);
 // Entry connection, no blocking the coastal beach.
 box(root,306,-.10,-48,140,.16,11,road);
 return {root,center:{x,z},holes:holes.length,residentialBuildings:16,bounds:{minX:100,maxX:575,minZ:-200,maxZ:110}};
}
