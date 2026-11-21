import {applyRealisticGrass,createRealisticGrass} from './realistic-grass.js?v=20261121-town-v191';
import * as THREE from 'three';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
import {trimGolfGround} from './golf-road-clearance.js?v=20261117-ground-golf-v86';

// A compact nine-hole city course, with all playing surfaces inside road-free parcels.
export function createNineHoleGolf(course,{origin,materials,tree,getPlayer}){
 const {rough,fairway,green,sand,walk}=materials;
 const toLocal=(x,z,y=.035)=>new THREE.Vector3(x-origin.x,y,z-origin.z);
 const turf=[],pathCurves=[];
 function patch(x,z,rx,rz,material,y=.04,phase=0){
  const shape=new THREE.Shape();
  for(let i=0;i<=64;i++){
   const a=i/64*Math.PI*2,r=1+.065*Math.sin(a*3+phase)+.035*Math.cos(a*5-phase);
   const px=Math.cos(a)*rx*r,pz=Math.sin(a)*rz*r;
   if(i===0)shape.moveTo(px,pz);else shape.lineTo(px,pz);
  }
  const geo=new THREE.ShapeGeometry(shape,48);geo.rotateX(-Math.PI/2);
  const pos=geo.attributes.position,uv=geo.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setXY(i,(pos.getX(i)/rx+1)/2,(pos.getZ(i)/rz+1)/2);
  const mesh=new THREE.Mesh(geo,material);mesh.position.copy(toLocal(x,z,y));mesh.receiveShadow=true;course.add(mesh);turf.push(mesh);return mesh;
 }
 function ribbon(points,width,material,y=.045,closed=false){
  const curve=new THREE.CatmullRomCurve3(points.map(([x,z])=>toLocal(x,z,y)),closed,'centripetal');
  const vertices=[],uv=[],indices=[],steps=Math.max(80,points.length*16);
  for(let i=0;i<=steps;i++){
   const t=i/steps,p=curve.getPoint(t),dir=curve.getTangent(t),side=new THREE.Vector3(-dir.z,0,dir.x).normalize();
   const half=width/2*(material===fairway?1+.13*Math.sin(t*18):1);
   for(const sign of [-1,1]){const v=p.clone().addScaledVector(side,sign*half);vertices.push(v.x,v.y,v.z);uv.push(sign<0?0:1,t*curve.getLength()/width);}
   if(i<steps){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();
  let surface=material;
  if(material===fairway){surface=applyRealisticGrass(material.clone(),{variant:'fairway'});for(const name of ['map','normalMap','roughnessMap'])if(surface[name]){surface[name]=surface[name].clone();surface[name].repeat.set(2,1);}}
  const mesh=new THREE.Mesh(geo,surface);mesh.receiveShadow=true;course.add(mesh);turf.push(mesh);if(material!==fairway){mesh.userData.golfPath=true;pathCurves.push({curve,width});}return curve;
 }
 // The entire marked eastern reserve becomes golf land; city streets remain separate.
 for(const [lo,hi] of [[-265,-113],[-79,-17],[17,79],[113,166]]){
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(316,hi-lo),rough);
  mesh.rotation.x=-Math.PI/2;mesh.position.copy(toLocal(398,(lo+hi)/2,.012));mesh.receiveShadow=true;course.add(mesh);turf.push(mesh);
 }
 const holeSpecs=[];
 for(let row=0;row<3;row++)for(let col=0;col<3;col++){
  const cx=291+col*96;
  const [teeZ,pinZ]=row===0?[-246,-135]:row===1?[-26,-69]:[26,69];
  const flip=col%2?-1:1;
  holeSpecs.push({number:row*3+col+1,tee:[cx-flip*15,teeZ],pin:[cx+flip*9,pinZ],par:3});
 }
 const flagMat=new THREE.MeshStandardMaterial({color:0xf2eee3,roughness:.75,side:THREE.DoubleSide});
 const poleMat=new THREE.MeshStandardMaterial({color:0xd4d4ca,metalness:.55,roughness:.32});
 const cupMat=new THREE.MeshStandardMaterial({color:0x17251b,roughness:1});
 const fringe=applyRealisticGrass(green.clone(),{variant:'green'});fringe.color.multiplyScalar(.78);
 const teeMat=applyRealisticGrass(fairway.clone(),{variant:'fairway'});teeMat.color.multiplyScalar(.88);
 function label(text,x,z){
  const cv=document.createElement('canvas');cv.width=256;cv.height=128;const ctx=cv.getContext('2d');
  ctx.fillStyle='#203e30';ctx.fillRect(0,0,256,128);ctx.strokeStyle='#c6b37e';ctx.lineWidth=7;ctx.strokeRect(4,4,248,120);
  ctx.fillStyle='#f8f1d9';ctx.textAlign='center';ctx.font='bold 36px sans-serif';ctx.fillText('HOLE '+text,128,52);ctx.font='22px sans-serif';ctx.fillText('PAR 3',128,95);
  const texture=new THREE.CanvasTexture(cv);texture.colorSpace=THREE.SRGBColorSpace;
  const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.8,.9),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));sign.position.copy(toLocal(x,z,1.15));course.add(sign);
  const post=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.8,8),poleMat);post.position.copy(toLocal(x,z,.4));course.add(post);
 }
 for(const h of holeSpecs){
  const [tx,tz]=h.tee,[px,pz]=h.pin,dx=px-tx,dz=pz-tz;
  ribbon([[tx,tz],[tx+dx*.3+6,tz+dz*.3],[tx+dx*.7-4,tz+dz*.7],[px,pz]],h.number<4?24:19,fairway,.036);
  patch(px,pz,14,8.8,fringe,.046,h.number);
  patch(px,pz,11.5,6.6,green,.051,h.number);
  patch(tx,tz,5,2.8,teeMat,.05,h.number);
  // Bunkers sit beside the green, outside every street and path.
  patch(px+(h.number%2?21:-21),pz,6.4,4.2,sand,.052,h.number*.7);
  if(h.number<4)patch(tx+dx*.65-19,tz+dz*.65,6.8,10,sand,.048,h.number);
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,2.5,10),poleMat);pole.position.copy(toLocal(px,pz,1.31));course.add(pole);
  const flag=new THREE.Mesh(new THREE.PlaneGeometry(.85,.48),flagMat);flag.position.copy(toLocal(px+.43,pz,2.35));course.add(flag);
  const cup=new THREE.Mesh(new THREE.CircleGeometry(.14,20),cupMat);cup.rotation.x=-Math.PI/2;cup.position.copy(toLocal(px,pz,.057));course.add(cup);
  label(h.number,tx-7,tz);
  for(const side of [-1,1]){const marker=new THREE.Mesh(new THREE.SphereGeometry(.14,10,8),flagMat);marker.position.copy(toLocal(tx+side*3,tz,.17));course.add(marker);}
 }
 // Photographic stone paving, with a darker edging strip under each path.
 const stoneLoader=new THREE.TextureLoader();
 const stoneMap=stoneLoader.load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/pbr/PavingStones070/PavingStones070_1K-JPG_Color.jpg');
 stoneMap.wrapS=stoneMap.wrapT=THREE.RepeatWrapping;stoneMap.colorSpace=THREE.SRGBColorSpace;stoneMap.repeat.set(1,1);stoneMap.anisotropy=4;
 const stone=new THREE.MeshStandardMaterial({map:stoneMap,color:0xd5cfc1,roughness:1});
 const edging=new THREE.MeshStandardMaterial({color:0x777e70,roughness:1});
 // A single connected route visits each row and returns to the clubhouse.
 // The southern cart loop stays east of the carnival and clear of the relocated clubhouse.
 const route=[[360,168],[310,168],[287,165],[296,142],[296,121],[294,112],[286,105],[246,79],[246,-25],[246,-120],[247,-258],[294,-258],[390,-258],[494,-258],[547,-246],[547,-150],[541,-115],[451,-115],[353,-115],[249,-115],[246,-80],[258,-18],[352,-18],[451,-18],[545,-23],[547,23],[449,18],[353,18],[253,18],[247,79],[286,105],[294,112],[310,120],[385,120],[451,122],[542,145],[451,168],[396,168]];
 ribbon(route,4.4,edging,.075,true);const cartCurve=ribbon(route,3.8,stone,.08,true);
 // Short stone connections from the main route to all nine tee boxes.
 for(const h of holeSpecs){const [tx,tz]=h.tee;const pathZ=h.number<4?-258:h.number<7?-18:18;ribbon([[tx,pathZ],[tx-2,(pathZ+tz)/2],[tx,tz]],2.8,stone,.082);}
 // Paths follow the rough beside each fairway and reach every green, as well as every tee.
 for(const h of holeSpecs){const [tx,tz]=h.tee,[px,pz]=h.pin,cx=291+((h.number-1)%3)*96,side=cx+37,fromZ=h.number<4?-258:h.number<7?-18:18;const points=[[tx,fromZ],[side,fromZ],[side,(tz+pz)/2],[side,pz],[px+16,pz]];ribbon(points,3.2,edging,.078);ribbon(points,2.7,stone,.084);}
 // Clip paving and all turf at each road boundary, retaining visible asphalt crossings.
 for(const mesh of turf)trimGolfGround(mesh,origin.z,mesh.userData.golfPath?13.5:16.5);
 // Trees form a natural boundary rather than a row through the playing corridors.
 for(const xx of [242,337,433,551])for(const zz of [-225,-184,-143,-48,48,141]){
  if(xx===337&&zz===-143)continue;
  tree(course,xx-origin.x,zz-origin.z,.68+((xx+zz)%3)*.035,Math.abs(xx+zz));
 }
 // Simple playable practice golf: approach a tee, then use G for each stroke.
 const ball=new THREE.Mesh(new THREE.SphereGeometry(.12,16,10),flagMat);ball.visible=false;course.add(ball);
 const button=document.createElement('button');button.style.cssText='position:fixed;right:14px;bottom:245px;z-index:10001;padding:13px;background:#244d38;color:white;border:1px solid #c7b87e;border-radius:8px;display:none';document.body.appendChild(button);
 registerTownAction(button,{id:'golf-play',priority:90,target:()=>active?{x:ball.position.x+origin.x,y:.3,z:ball.position.z+origin.z}:nearest?{x:nearest.tee[0],y:.3,z:nearest.tee[1]}:null});
 const score=document.createElement('div');score.id='golf-score';score.style.cssText='position:fixed;left:14px;top:245px;z-index:9997;padding:9px 12px;background:#173529df;color:#fff;border-radius:7px;display:none;font:13px sans-serif';document.body.appendChild(score);
 let active=null,strokes=0,flight=null,nearest=null;const results=new Map();
 function stroke(){
  if(flight)return;
  if(!active){if(!nearest)return;active=nearest;strokes=0;ball.position.copy(toLocal(...active.tee,.18));ball.visible=true;}
  const target=toLocal(...active.pin,.18),distance=ball.position.distanceTo(target);
  const end=ball.position.clone().lerp(target,distance<9?1:.70);
  flight={from:ball.position.clone(),to:end,t:0,duration:1.3,distance};strokes++;
 }
 button.addEventListener('click',stroke);addEventListener('keydown',e=>{if(e.code==='KeyG'&&!e.repeat&&button.style.display!=='none')stroke();});
 function update(dt){
  if(flight){flight.t+=dt;const t=Math.min(1,flight.t/flight.duration);ball.position.lerpVectors(flight.from,flight.to,t);ball.position.y+=Math.sin(t*Math.PI)*Math.min(4,flight.distance*.05);
   if(t===1){flight=null;if(ball.position.distanceTo(toLocal(...active.pin,.18))<.5){results.set(active.number,strokes);score.textContent='Hole '+active.number+' completed · '+strokes+' strokes · '+results.size+'/9 holes';active=null;ball.visible=false;}}
  }
  const player=getPlayer?.();if(!player)return;
  nearest=holeSpecs.find(h=>Math.hypot(player.x-h.tee[0],player.z-h.tee[1])<11)||null;
  const nearBall=active&&Math.hypot(player.x-(ball.position.x+origin.x),player.z-(ball.position.z+origin.z))<11;
  const show=!!(nearBall||(!active&&nearest));button.style.display=show?'block':'none';
  button.textContent=active?'G · HIT BALL · STROKE '+(strokes+1):'G · PLAY HOLE '+(nearest?.number||'');
  score.style.display=(player.x>232&&player.z<170)?'block':'none';
  if(active)score.textContent='Hole '+active.number+' · Par 3 · '+strokes+' strokes · Follow the ball, then tap Hit ball';
  else if(!results.size)score.textContent='ZERCONDA · NINE-HOLE GOLF · Approach a numbered tee and tap Play';
 }
 const floorCells=new Map(),cellSize=8;
 for(const mesh of turf){mesh.updateMatrix();const geo=mesh.geometry.index?mesh.geometry.toNonIndexed():mesh.geometry,p=geo.getAttribute('position');for(let i=0;i<p.count;i+=3){const a=new THREE.Vector3().fromBufferAttribute(p,i).applyMatrix4(mesh.matrix),b=new THREE.Vector3().fromBufferAttribute(p,i+1).applyMatrix4(mesh.matrix),c=new THREE.Vector3().fromBufferAttribute(p,i+2).applyMatrix4(mesh.matrix);const area=(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);if(Math.abs(area)<1e-8)continue;const tri={a,b,c,area};for(let ix=Math.floor(Math.min(a.x,b.x,c.x)/cellSize);ix<=Math.floor(Math.max(a.x,b.x,c.x)/cellSize);ix++)for(let iz=Math.floor(Math.min(a.z,b.z,c.z)/cellSize);iz<=Math.floor(Math.max(a.z,b.z,c.z)/cellSize);iz++){const key=ix+','+iz,list=floorCells.get(key)||[];list.push(tri);floorCells.set(key,list);}}}
 function heightAt(wx,wz){const x=wx-origin.x,z=wz-origin.z,list=floorCells.get(Math.floor(x/cellSize)+','+Math.floor(z/cellSize))||[];let height=null;for(const {a,b,c,area}of list){const u=((x-a.x)*(c.z-a.z)-(z-a.z)*(c.x-a.x))/area,v=((b.x-a.x)*(z-a.z)-(b.z-a.z)*(x-a.x))/area;if(u>=-1e-6&&v>=-1e-6&&u+v<=1.000001)height=Math.max(height??-1,a.y+u*(b.y-a.y)+v*(c.y-a.y));}return height;}
 return {holes:holeSpecs,cartCurve,pathCurves,heightAt,update,routeLength:cartCurve.getLength(),groundMeshes:turf};
}

