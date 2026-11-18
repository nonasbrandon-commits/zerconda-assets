import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export const RV_BOUNDS={x0:-82,x1:-14,z0:-274,z1:-145};
export function createRVPark(scene,{getPlayer,canUse=()=>true,onTeleport=()=>{},onMessage=()=>{}}={}){
 const root=new THREE.Group();root.name='Tall Pines RV Retreat · four public RV sites';root.userData.customInterior=true;scene.add(root);
 const M=c=>new THREE.MeshStandardMaterial({color:c,roughness:.85}),wood=M(0x927657),dark=M(0x303e40),linen=M(0xe3ddcb),fabric=M(0x688780),stone=M(0xaaa89c),body=M(0xe2e2d9),trim=M(0x586867),tire=M(0x222627),glass=new THREE.MeshPhysicalMaterial({color:0xc2dedb,transparent:true,opacity:.065,depthWrite:false,side:THREE.DoubleSide});
 const staticParts=new Map(),seats=[],rvs=[],fires=[],trees=[],sources=[],paths=[];let seed=947,time=0;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 function mesh(geo,mat,pos=[0,0,0],rot=[0,0,0],parent=null){const o=new THREE.Mesh(geo,mat);o.position.set(...pos);o.rotation.set(...rot);o.receiveShadow=true;if(parent){parent.add(o);return o;}o.updateMatrix();const g=geo.clone().applyMatrix4(o.matrix);const list=staticParts.get(mat)||[];list.push(g.index?g.toNonIndexed():g);staticParts.set(mat,list);geo.dispose();return o;}
 const box=(w,h,d,x,y,z,m=wood,p=null)=>mesh(new THREE.BoxGeometry(w,h,d),m,[x,y,z],[0,0,0],p);
 const near=(p,d=3)=>Math.hypot(getPlayer().x-p.x,getPlayer().z-p.z)<d;
 function sign(text,x,y,z,w=4,ry=0){const c=document.createElement('canvas');c.width=1024;c.height=160;const a=c.getContext('2d');a.fillStyle='#294b3d';a.fillRect(0,0,1024,160);a.fillStyle='#efe4c9';a.textAlign='center';a.textBaseline='middle';a.font='bold 52px system-ui';a.fillText(text,512,80,990);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const o=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.15625),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));o.position.set(x,y,z);o.rotation.y=ry;root.add(o);}
 function action(id,label,target,when,fn,priority=130){const b=document.createElement('button');b.style.display='none';b.onclick=fn;document.body.appendChild(b);registerTownAction(b,{id:'rv-'+id,label,priority,target:()=>({...target,y:1.5})});sources.push({b,when});}
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const gravelCtx=canvas.getContext('2d');gravelCtx.fillStyle='#a8a295';gravelCtx.fillRect(0,0,256,256);for(let i=0;i<9000;i++){const v=115+rnd()*80;gravelCtx.fillStyle=`rgb(${v},${v-3},${v-12})`;gravelCtx.beginPath();gravelCtx.ellipse(rnd()*256,rnd()*256,1+rnd()*2,.7+rnd()*1.5,rnd()*6.3,0,6.3);gravelCtx.fill();}const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(2,18);tex.anisotropy=4;const gravel=M(0xffffff);gravel.map=tex;
 function path(ax,az,bx,bz,w=5.6){const dx=bx-ax,dz=bz-az,len=Math.hypot(dx,dz);mesh(new THREE.BoxGeometry(w,.045,len),gravel,[(ax+bx)/2,.025,(az+bz)/2],[0,Math.atan2(dx,dz),0]);paths.push({ax,az,bx,bz,w});}
 path(-82,-154,-48,-154);path(-48,-154,-48,-258);mesh(new THREE.CylinderGeometry(9,9,.045,48),gravel,[-48,.025,-258]);
 function insideAt(x,z){return rvs.find(r=>Math.abs(x-r.x)<2.17&&Math.abs(z-r.z)<5.76);}
 function enter(r){if(!canUse())return;r.open=true;getPlayer().x=r.x+.9;getPlayer().z=r.z+1.8;onTeleport(getPlayer().x,.66,getPlayer().z,-Math.PI/2);onMessage('RV '+r.id+' · Free to hang out. Find a seat or explore inside.');}
 function exit(r){getPlayer().x=r.x+4;getPlayer().z=r.z+1.8;onTeleport(getPlayer().x,.06,getPlayer().z,Math.PI/2);}
 function chair(x,z,a,kind='RV fire-pit chair',base=0){const g=new THREE.Group();g.position.set(x,base,z);g.rotation.y=a;root.add(g);box(.86,.16,.84,0,.48,0,wood,g);box(.86,.76,.1,0,.9,-.37,wood,g);for(const sx of [-.34,.34]){box(.08,.44,.65,sx,.22,0,dark,g);box(.1,.1,.78,sx,.8,0,wood,g);}seats.push({x,z,facing:a,sitHeight:base+.59,kind});}
 for(const [i,[x,z]]of [[-68,-231],[-29,-231],[-68,-184],[-29,-184]].entries()){
  const g=new THREE.Group();g.position.set(x,0,z);g.name='Public RV '+(i+1);root.add(g);const r={id:i+1,x,z,g,open:false,obstacles:[]};rvs.push(r);
  box(9,.04,19,x,.03,z,gravel);path(-48,z+9,x+3.6,z+1.8,2.3);
  box(4.65,.28,12,0,.48,0,dark,g);box(4.5,.12,11.8,0,.60,0,wood,g);box(4.85,.16,12.4,0,3.96,0,body,g);
  // Actual wall openings give every window an uninterrupted view of the forest.
  for(const side of [-1,1]){
   box(.14,.68,12,side*2.3,.99,0,body,g);box(.14,.48,12,side*2.3,3.65,0,body,g);
   for(const zz of [-5.6,-2.8,.1,3.7,5.6])box(.14,2.0,zz===3.7?1.1:.7,side*2.3,2.33,zz,body,g);
   for(const [zz,d]of [[-4.2,2.1],[-1.4,2.1],[4.65,1.1]]){box(.035,2.0,d,side*2.3,2.33,zz,glass,g);for(const yy of [1.32,3.34])box(.18,.06,d+.12,side*2.3,yy,zz,trim,g);}
   if(side<0)box(.14,2.0,2.9,side*2.3,2.33,1.9,glass,g);
  }
  // Entry side: full-height 1.5m doorway, with threshold and folding steps.
  box(.14,.68,1.6,2.3,.99,1.8,body,g).visible=false; // opening is cut from the lower panel below
  const lower=g.children.find(o=>o.isMesh&&o.position.x===2.3&&Math.abs(o.position.y-.99)<.001&&o.geometry.parameters.depth===12);g.remove(lower);
  box(.14,.68,7.05,2.3,.99,-2.475,body,g);box(.14,.68,3.35,2.3,.99,4.325,body,g);
  box(.14,.6,1.5,2.3,3.1,1.8,body,g);for(const zz of [.75,2.85])box(.14,2.7,.6,2.3,2.01,zz,body,g);
  for(const side of [-1,1]){box(4.6,.7,.14,0,1.0,side*6,body,g);box(4.6,.5,.14,0,3.65,side*6,body,g);box(3.7,1.95,.035,0,2.32,side*6,glass,g);for(const xx of [-2.1,2.1])box(.4,2.0,.14,xx,2.32,side*6,body,g);box(4.9,.2,.18,0,.4,side*6.08,dark,g);}
  for(const side of [-1,1])for(const zz of [-3.8,3.8]){mesh(new THREE.CylinderGeometry(.58,.58,.35,20),tire,[side*2.25,.58,zz],[0,0,Math.PI/2],g);mesh(new THREE.CylinderGeometry(.31,.31,.37,16),trim,[side*2.25,.58,zz],[0,0,Math.PI/2],g);}
  const hinge=r.hinge=new THREE.Group();hinge.position.set(2.39,.66,1.05);g.add(hinge);box(.09,2.35,1.5,0,1.175,.75,trim,hinge);box(.10,1.1,1.0,0,1.58,.75,glass,hinge);box(.13,.1,.2,.1,1.1,1.28,wood,hinge);
  for(let k=0;k<3;k++)box(.65,.22*(k+1),1.8,3.95-k*.6,.11*(k+1),1.8,trim,g);
  // East-facing awning shades a generous outdoor patio.
  box(4.5,.1,9,4.55,3.4,.5,fabric,g);for(const zz of [-3.8,4.8])box(.07,3.3,.07,6.75,1.65,zz,trim,g);
  // Bedroom at the back; headboard stays against the rear wall.
  box(2.3,.38,2.45,-.7,.9,-4.5,wood,g);box(2.22,.22,2.36,-.7,1.2,-4.5,linen,g);box(2.3,.08,1.7,-.7,1.35,-4.2,fabric,g);box(2.4,1.15,.12,-.7,1.25,-5.83,wood,g);box(1.8,.14,.45,-.7,1.4,-5.35,linen,g);r.obstacles.push({x:-.7,z:-4.5,w:2.5,d:2.6});
  // Galley and dining remain to one side of a clear central passage.
  box(.68,.9,3.0,-1.88,1.11,.0,wood,g);box(.78,.07,3.08,-1.85,1.59,0,linen,g);box(.5,.025,.7,-1.85,1.64,-.65,dark,g);box(.5,.025,.7,-1.85,1.64,.6,trim,g);r.obstacles.push({x:-1.85,z:0,w:.9,d:3.1});
  box(1.25,.85,2.8,-1.33,1.1,3.6,fabric,g);box(.15,.75,2.8,-1.94,1.75,3.6,fabric,g);for(const zz of [2.8,3.6,4.4])seats.push({x:x-1.3,z:z+zz,facing:Math.PI/2,sitHeight:1.56,kind:'RV lounge sofa'});r.obstacles.push({x:-1.33,z:3.6,w:1.45,d:3});
  box(.6,.75,1.7,1.86,1.03,-1.3,wood,g);box(.65,.06,1.76,1.86,1.45,-1.3,linen,g);r.obstacles.push({x:1.86,z:-1.3,w:.75,d:1.8});
  chair(x+.9,z+4.6,Math.PI,'RV lounge chair',.66);r.obstacles.push({x:.9,z:4.6,w:1.0,d:1});
  const fx=x+9.1,fz=z-1;mesh(new THREE.CylinderGeometry(4.3,4.3,.04,40),gravel,[fx,.03,fz]);const f={id:r.id,x:fx,z:fz,lit:false};fires.push(f);
  for(let j=0;j<14;j++){const a=j*Math.PI/7;mesh(new THREE.DodecahedronGeometry(.23,0),stone,[fx+Math.sin(a)*.85,.23,fz+Math.cos(a)*.85]);}for(const a of [-.5,.5])mesh(new THREE.CylinderGeometry(.1,.13,1.2,8),wood,[fx,.2,fz],[Math.PI/2,0,a]);
  f.flames=new THREE.Group();f.flames.position.set(fx,.25,fz);root.add(f.flames);for(let j=0;j<4;j++)mesh(new THREE.ConeGeometry(.18,.8,8),new THREE.MeshBasicMaterial({color:j%2?0xffc461:0xed8b3e,transparent:true,opacity:.8,depthWrite:false}),[Math.sin(j*2)*.2,.35,Math.cos(j*2)*.2],[0,0,0],f.flames);f.flames.visible=false;
  for(let j=0;j<4;j++){const a=j*Math.PI/2;chair(fx+Math.sin(a)*2.6,fz+Math.cos(a)*2.6,a+Math.PI);}
  sign('RV '+r.id+' · FREE TO USE',x+2.5,3.35,z+1.8,3,Math.PI/2);
  const door={x:x+3.8,z:z+1.8};action('enter-'+r.id,'Enter RV '+r.id+' · Free',door,()=>canUse()&&!insideAt(getPlayer().x,getPlayer().z)&&near(door,3.1),()=>enter(r),150);
  action('exit-'+r.id,'Exit RV '+r.id,{x:x+1,z:z+1.8},()=>insideAt(getPlayer().x,getPlayer().z)===r,()=>exit(r),145);
  action('fire-'+r.id,()=>`${f.lit?'Extinguish':'Light'} RV site ${r.id} fire pit`,{x:fx,z:fz},()=>canUse()&&!insideAt(getPlayer().x,getPlayer().z)&&near(f,4.4),()=>{f.lit=!f.lit;f.flames.visible=f.lit;onMessage(f.lit?'Fire pit lit. Take a chair and relax.':'Fire extinguished.');});
 }
 sign('TALL PINES · RV RETREAT',-78,2.4,-149,8,Math.PI/2);box(.14,2.3,.14,-78,1.15,-153,wood);box(.14,2.3,.14,-78,1.15,-145,wood);
 const segmentDistance=(x,z,s)=>{const dx=s.bx-s.ax,dz=s.bz-s.az,t=THREE.MathUtils.clamp(((x-s.ax)*dx+(z-s.az)*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(x-s.ax-dx*t,z-s.az-dz*t);};
 const clear=(x,z)=>paths.some(p=>segmentDistance(x,z,p)<p.w/2+2.2)||Math.hypot(x+48,z+258)<11||rvs.some(r=>Math.abs(x-r.x)<6.5&&Math.abs(z-r.z)<10.5)||fires.some(f=>Math.hypot(x-f.x,z-f.z)<6.5);
 // Tall, varied evergreen crowns use hundreds of textured boughs, not cone trees.
 const leafCanvas=document.createElement('canvas');leafCanvas.width=leafCanvas.height=256;const ctx=leafCanvas.getContext('2d');ctx.clearRect(0,0,256,256);ctx.strokeStyle='#4d643c';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(128,256);ctx.lineTo(128,10);ctx.stroke();for(let k=0;k<24;k++){const y=20+k*9,w=8+k*4;for(const side of [-1,1]){ctx.strokeStyle=k%2?'#5d8050':'#365c35';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(128,y);ctx.lineTo(128+side*w,y+25);ctx.stroke();}}const leafTexture=new THREE.CanvasTexture(leafCanvas);leafTexture.colorSpace=THREE.SRGBColorSpace;const sprig=new Image();sprig.onload=()=>{ctx.clearRect(0,0,256,256);for(let k=0;k<13;k++)for(const side of [-1,1]){ctx.save();ctx.translate(128+side*k*3,20+k*17);ctx.rotate(side*.6);ctx.drawImage(sprig,-22,-50,44,90);ctx.restore();}leafTexture.needsUpdate=true;};sprig.src=new URL('../realistic-assets/wilderness/pine-sprig.webp',import.meta.url).href;
 const verts=[],uv=[],ids=[];for(let level=0;level<20;level++){const t=level/20,y=.32+t*.66,r=(1-t)*.18+.012;for(let branch=0;branch<6;branch++){const a=branch*Math.PI/3+level*2.4,cs=Math.cos(a),sn=Math.sin(a),base=verts.length/3;for(const [u,v]of [[-1,0],[1,0],[-1,1],[1,1]]){const d=v*r;verts.push(cs*d-sn*u*r*.6*(1-v*.5),y-d*.25+u*r*.1,sn*d+cs*u*r*.6*(1-v*.5));uv.push((u+1)/2,v);}ids.push(base,base+1,base+2,base+1,base+3,base+2);}}const crownGeo=new THREE.BufferGeometry();crownGeo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));crownGeo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));crownGeo.setIndex(ids);crownGeo.computeVertexNormals();
 for(let tries=0;tries<7000&&trees.length<125;tries++){const x=-80+rnd()*64,z=-271+rnd()*122;if(clear(x,z)||trees.some(t=>Math.hypot(x-t.x,z-t.z)<4.0))continue;trees.push({x,z,height:20+rnd()*17,rotation:rnd()*Math.PI*2});}
 const crowns=new THREE.InstancedMesh(crownGeo,new THREE.MeshStandardMaterial({map:leafTexture,alphaTest:.22,side:THREE.DoubleSide,roughness:1}),trees.length),trunks=new THREE.InstancedMesh(new THREE.CylinderGeometry(.0055,.013,1,8),wood,trees.length),dummy=new THREE.Object3D(),shade=new THREE.Color();crowns.name='Tall RV park pines';trunks.name='RV park tree trunks';trees.forEach((t,i)=>{dummy.position.set(t.x,0,t.z);dummy.rotation.set(0,t.rotation,0);dummy.scale.set(t.height,t.height,t.height);dummy.updateMatrix();crowns.setMatrixAt(i,dummy.matrix);shade.setRGB(.72+rnd()*.16,.82+rnd()*.16,.64+rnd()*.16);crowns.setColorAt(i,shade);dummy.position.y=t.height*.5;dummy.updateMatrix();trunks.setMatrixAt(i,dummy.matrix);});crowns.receiveShadow=true;root.add(crowns,trunks);

 for(const [m,list]of staticParts){const o=new THREE.Mesh(mergeGeometries(list),m);o.receiveShadow=true;root.add(o);list.forEach(g=>g.dispose());}
 const inArea=(x,z)=>x>RV_BOUNDS.x0&&x<RV_BOUNDS.x1&&z>RV_BOUNDS.z0&&z<RV_BOUNDS.z1;
 function blocks(x,z,vehicle=false){if(!inArea(x,z))return false;for(const r of rvs){const xx=x-r.x,zz=z-r.z;if(Math.abs(xx)<2.65&&Math.abs(zz)<6.3){if(vehicle)return true;if(Math.abs(zz)>5.65||xx< -1.98)return true;if(xx>1.98&&(!r.open||zz<1.32||zz>2.28))return true;if(r.obstacles.some(o=>Math.abs(xx-o.x)<o.w/2+.2&&Math.abs(zz-o.z)<o.d/2+.2))return true;}}if(fires.some(f=>Math.hypot(x-f.x,z-f.z)<1.25))return true;if(trees.some(t=>Math.hypot(x-t.x,z-t.z)<t.height*.013+.28))return true;return seats.some(s=>Math.hypot(x-s.x,z-s.z)<.4);}
 function heightAt(x,z){if(!inArea(x,z))return null;for(const r of rvs){if(Math.abs(x-r.x)<2.35&&Math.abs(z-r.z)<5.95)return .66;if(z>r.z+.9&&z<r.z+2.7&&x>r.x+2.3&&x<r.x+4.3)return x<r.x+3.1?.66:x<r.x+3.7?.44:.22;if(Math.abs(x-r.x)<4.5&&Math.abs(z-r.z)<9.5)return .05;}if(paths.some(p=>segmentDistance(x,z,p)<p.w/2)||Math.hypot(x+48,z+258)<9||fires.some(f=>Math.hypot(x-f.x,z-f.z)<4.3))return .0475;return 0;}
 function update(dt){time+=dt;for(const r of rvs)r.hinge.rotation.y=THREE.MathUtils.damp(r.hinge.rotation.y,r.open?1.65:0,8,dt);for(const f of fires)if(f.lit)f.flames.children.forEach((o,j)=>o.scale.y=1+Math.sin(time*5+j)*.2);for(const s of sources)s.b.style.display=s.when()?'block':'none';}
 function clampCamera(v){const r=insideAt(getPlayer().x,getPlayer().z);if(!r)return;v.x=THREE.MathUtils.clamp(v.x,r.x-1.95,r.x+1.95);v.z=THREE.MathUtils.clamp(v.z,r.z-5.55,r.z+5.55);v.y=THREE.MathUtils.clamp(v.y,2.1,3.5);}
 return{root,rvs,fires,trees,seats,paths,inArea,blocks,heightAt,update,clampCamera,entry:{x:-82,z:-154},get inside(){return !!insideAt(getPlayer().x,getPlayer().z);},nearestSeat(x,z,max=2.3){let best=null;const current=insideAt(x,z);for(const s of seats){if(!!insideAt(s.x,s.z)!==!!current)continue;const d=Math.hypot(x-s.x,z-s.z);if(d<max){max=d;best=s;}}return best;}};
}
