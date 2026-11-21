import * as THREE from 'three';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export const WALL_OPENING={x:-186,z:-1398,width:1.46,height:1.20,blocked:true};
const edge=[[-.68,.025],[.66,.025],[.72,.28],[.59,.47],[.67,.69],[.43,.84],[.38,1.03],[.16,1.12],[-.04,1.20],[-.28,1.06],[-.51,1.02],[-.48,.81],[-.69,.62],[-.60,.42],[-.74,.28]];
export function createDamagedWallPanel(width,height,depth,material){
 const shape=new THREE.Shape();shape.moveTo(-width/2,0);shape.lineTo(width/2,0);shape.lineTo(width/2,height);shape.lineTo(-width/2,height);shape.closePath();const hole=new THREE.Path();edge.forEach(([x,y],i)=>i?hole.lineTo(x,y):hole.moveTo(x,y));hole.closePath();shape.holes.push(hole);
 const g=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:false,curveSegments:1});g.translate(0,0,-depth/2);const pos=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getX(i)+width/2)/width,pos.getY(i)/height);
 const broken=material.clone();broken.color.set(0x86867c);broken.roughness=1;const mesh=new THREE.Mesh(g,[material,broken]);mesh.name='Concrete wall with real crawl-height opening';mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.customInterior=true;return mesh;
}
export function createBlockedWallOpening(scene,{getPlayer,onMessage=()=>{}}={}){
 const root=new THREE.Group();root.name='Blocked North Woods wall breach';root.userData.customInterior=true;root.position.set(WALL_OPENING.x,0,WALL_OPENING.z);scene.add(root);let seed=16398;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 const material=(color)=>new THREE.MeshStandardMaterial({color,roughness:.96});
 const rockMap=new THREE.TextureLoader().load(new URL('../realistic-assets/wilderness/rock-face.webp',import.meta.url).href);rockMap.colorSpace=THREE.SRGBColorSpace;
 const stone=new THREE.MeshStandardMaterial({color:0x9b9b8a,map:rockMap,bumpMap:rockMap,bumpScale:.045,roughness:1});
 function rock(x,y,z,sx,sy,sz,detail=1){const g=new THREE.IcosahedronGeometry(1,detail),p=g.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),scale=1+.09*Math.sin(x*9.1+y*4.7+z*7.3);p.setXYZ(i,x*scale,y*scale,z*scale);}g.computeVertexNormals();const mesh=new THREE.Mesh(g,stone);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;}
 const recess=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.5),new THREE.MeshBasicMaterial({color:0x11150f}));recess.position.set(0,.70,-1.1);recess.name='Shadowed recess behind blocked opening';root.add(recess);
 const boulder=rock(.22,.55,1.95,1.05,.64,.87,2);boulder.name='Immovable boulder blocking crawl opening';
 for(let i=0;i<16;i++){const a=rnd()*Math.PI*2,r=.85+rnd()*.85;const x=Math.cos(a)*r,z=1.8+Math.sin(a)*r;if(z<1.0)continue;const s=.05+rnd()*.10;rock(x,.04+s*.35,z,s,s*.55,s*.8,0);}
 function decal(canvas,w,h,x,y,z,name){const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:tex,transparent:true,depthWrite:false,roughness:1,side:THREE.FrontSide}));mesh.position.set(x,y,z);mesh.name=name;root.add(mesh);return mesh;}
 const paint=document.createElement('canvas');paint.width=1536;paint.height=640;const a=paint.getContext('2d');a.textBaseline='middle';a.textAlign='center';a.font='900 165px sans-serif';
 for(const [line,y,angle]of [["DON'T GO",190,-.035],['IN HERE!',415,.035]]){a.save();a.translate(768,y);a.rotate(angle);a.shadowColor='#9d2522';a.shadowBlur=7;a.fillStyle='#a52220';a.fillText(line,0,0);a.shadowBlur=0;a.globalAlpha=.55;a.fillText(line,2,-1);a.restore();}
 // Overspray, thin paint drips and broken edges leave the concrete visible through the lettering.
 a.globalCompositeOperation='destination-out';for(let i=0;i<1500;i++){a.fillStyle=`rgba(0,0,0,${.08+rnd()*.45})`;a.fillRect(rnd()*1536,rnd()*640,1+rnd()*4,1+rnd()*3);}a.globalCompositeOperation='source-over';
 for(const [x,y,len]of [[377,247,45],[902,252,38],[615,476,57],[1090,470,25]]){a.strokeStyle='#8f2420b0';a.lineWidth=2+rnd()*2;a.beginPath();a.moveTo(x,y);a.lineTo(x+2,y+len);a.stroke();}
 const graffiti=decal(paint,4.9,2.04,-.10,2.85,.932,'Spray-painted warning · DON’T GO IN HERE!');
 const cracks=document.createElement('canvas');cracks.width=cracks.height=512;const c=cracks.getContext('2d');c.strokeStyle='#30352d9a';c.lineWidth=1.7;for(const [x,y]of edge.filter((_,i)=>i%2)){if(y<.1)continue;const sign=Math.sign(x)||1;let px=256+x*150,py=445-y*220;c.beginPath();c.moveTo(px,py);for(let j=0;j<4;j++){px+=sign*(8+rnd()*10);py-=4+rnd()*13;c.lineTo(px,py);}c.stroke();}decal(cracks,3.4,2.35,0,1.0,.927,'Hairline cracks around broken concrete');
 // An abandoned fabric baseball cap, with stitched panels, mud and dried blood stains.
 const cap=new THREE.Group();cap.name='Dirty bloodstained baseball cap';cap.position.set(-1.18,.026,2.90);cap.rotation.set(.06,-.65,.08);root.add(cap);
 const cloth=document.createElement('canvas');cloth.width=cloth.height=512;const ctx=cloth.getContext('2d');ctx.fillStyle='#5b6465';ctx.fillRect(0,0,512,512);for(let i=0;i<19000;i++){ctx.fillStyle=i%2?'#a4a29830':'#222c2928';ctx.fillRect(rnd()*512,rnd()*512,1,1);}
 for(let i=0;i<90;i++){ctx.fillStyle=i%3?'#64523e50':'#332e2366';ctx.beginPath();ctx.ellipse(rnd()*512,rnd()*512,8+rnd()*32,3+rnd()*18,rnd()*6.28,0,Math.PI*2);ctx.fill();}
 for(let i=0;i<26;i++){ctx.fillStyle=i%2?'#611e21b8':'#862b2bba';ctx.beginPath();ctx.ellipse(310+(rnd()-.5)*140,205+(rnd()-.5)*155,6+rnd()*24,5+rnd()*18,rnd()*6.28,0,Math.PI*2);ctx.fill();}
 const fabricTex=new THREE.CanvasTexture(cloth);fabricTex.colorSpace=THREE.SRGBColorSpace;const fabric=new THREE.MeshStandardMaterial({map:fabricTex,roughness:1,side:THREE.DoubleSide});
 const crown=new THREE.Mesh(new THREE.SphereGeometry(.145,28,14,0,Math.PI*2,0,Math.PI/2),fabric);crown.scale.set(1,.84,1.10);crown.position.y=.013;crown.castShadow=true;cap.add(crown);
 const bill=new THREE.Shape();bill.moveTo(-.125,.055);bill.quadraticCurveTo(-.19,.21,-.10,.30);bill.quadraticCurveTo(0,.34,.10,.30);bill.quadraticCurveTo(.19,.21,.125,.055);bill.quadraticCurveTo(0,.11,-.125,.055);const brim=new THREE.Mesh(new THREE.ExtrudeGeometry(bill,{depth:.004,bevelEnabled:true,bevelThickness:.001,bevelSize:.002,bevelSegments:1,steps:1}),fabric);brim.rotation.x=Math.PI/2;brim.position.y=.016;cap.add(brim);
 const stitch=new THREE.MeshStandardMaterial({color:0x8c9288,roughness:1});for(let j=0;j<6;j++){const phi=j*Math.PI/3,points=[];for(let i=0;i<=12;i++){const t=i/12*Math.PI/2;points.push(new THREE.Vector3(Math.sin(phi)*Math.sin(t)*.146,.014+Math.cos(t)*.124,Math.cos(phi)*Math.sin(t)*.161));}cap.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),14,.0009,4,false),stitch));}
 const button=new THREE.Mesh(new THREE.SphereGeometry(.012,10,6),fabric);button.position.y=.143;cap.add(button);
 const inspect=document.createElement('button');inspect.style.display='none';inspect.onclick=()=>onMessage('The opening is barely crawl-height. The rock is firmly wedged in place. Someone left this cap behind…');document.body.appendChild(inspect);registerTownAction(inspect,{id:'north-wall-breach',label:'Inspect blocked wall opening',priority:110,target:()=>({x:WALL_OPENING.x,y:1,z:WALL_OPENING.z+2.5})});
 return{root,boulder,cap,graffiti,config:WALL_OPENING,blocks(x,z){return ((x-WALL_OPENING.x-.22)/1.30)**2+((z-WALL_OPENING.z-1.95)/1.14)**2<1;},update(){const p=getPlayer();inspect.style.display=Math.hypot(p.x-WALL_OPENING.x,p.z-WALL_OPENING.z-2.5)<5?'block':'none';},inspectButton:inspect};
}
