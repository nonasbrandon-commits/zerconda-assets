import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export const AIRFIELD={west:-276,east:570,north:-530,south:-285,runway:{x:130,z:-452,length:730,width:28}};
export function createAirfield(scene,{getPlayer,canUse=()=>true,onTeleport=()=>{},onMessage=()=>{}}={}){
 const root=new THREE.Group();root.name='Zerconda North Airfield';root.userData.customInterior=true;scene.add(root);
 const mat=(color,roughness=.8)=>new THREE.MeshStandardMaterial({color,roughness});
 const white=mat(0xe5e5db),stripe=mat(0x278899,.4),dark=mat(0x263a43,.5),steel=mat(0x939ea0,.45),rubber=mat(0x182329),seatMat=mat(0x425a68),cream=mat(0xd4cbb9),yellow=mat(0xe7c15a),glass=new THREE.MeshPhysicalMaterial({color:0x83b4c4,transparent:true,opacity:.22,roughness:.08,metalness:.05,side:THREE.DoubleSide,depthWrite:false});
 const parts=new Map();function mesh(geo,m,x=0,y=0,z=0,parent=null,rot=[0,0,0]){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.rotation.set(...rot);o.castShadow=true;o.receiveShadow=true;if(parent){parent.add(o);return o;}o.updateMatrix();const g=geo.clone().applyMatrix4(o.matrix);const list=parts.get(m)||[];list.push(g.index?g.toNonIndexed():g);parts.set(m,list);geo.dispose();return o;}
 const box=(w,h,d,x,y,z,m=white,p=null)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,p);
 function sphere(x,y,z,sx,sy,sz,m,p){const o=mesh(new THREE.SphereGeometry(1,20,12),m,x,y,z,p);o.scale.set(sx,sy,sz);return o;}
 function label(text,x,y,z,w=7,h=1,ry=0,bg='#233e49'){const c=document.createElement('canvas');c.width=1536;c.height=256;const a=c.getContext('2d');a.fillStyle=bg;a.fillRect(0,0,c.width,c.height);a.fillStyle='#f0e9d4';a.textAlign='center';a.textBaseline='middle';a.font='bold 74px sans-serif';a.fillText(text,768,128,1490);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));o.position.set(x,y,z);o.rotation.y=ry;root.add(o);return o;}
 function grain(base){const c=document.createElement('canvas');c.width=c.height=256;const a=c.getContext('2d');a.fillStyle=base;a.fillRect(0,0,256,256);let s=571;for(let i=0;i<13000;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;const x=s%256;s=(Math.imul(s,1664525)+1013904223)>>>0;const y=s%256;a.fillStyle=i%2?'#ffffff18':'#00000016';a.fillRect(x,y,1,1);}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(40,15);return t;}
 const grass=mat(0xffffff);grass.map=grain('#758264');box(846,.12,245,147,-.14,-407.5,grass);
 const asphalt=mat(0xffffff);asphalt.map=grain('#4a5051');box(730,.08,28,130,.08,-452,asphalt);box(725,.08,13,130,.08,-405,asphalt);box(324,.08,89.5,-66,.08,-353.75,mat(0x8a8f89));box(14,.08,24,-96,.08,-297,asphalt);
 // Taxiway connections, turn pads and clear runway markings.
 for(const x of [-213,473])box(13,.08,47,x,.08,-428.5,asphalt);
 for(let x=-211;x<480;x+=28)box(13,.012,.32,x,.2,-452,white);
 for(const z of [-464,-440])box(690,.012,.22,130,.2,z,white);
 for(const side of [-1,1]){const x=130+side*330;for(const z of [-461,-458,-455,-449,-446,-443])box(13,.014,1.25,x,.2,z,white);const n=label(side<0?'09':'27',x-side*18,.2,-452,7,4);n.rotation.set(-Math.PI/2,0,side<0?Math.PI/2:-Math.PI/2);}
 for(let x=-207;x<478;x+=9)box(4,.01,.14,x,.2,-405,yellow);
 for(const x of [-190,-130,20,60])for(let z=-389;z< -372;z+=5)box(.15,.01,2.5,x,.2,z,yellow);
 const lightMat=new THREE.MeshBasicMaterial({color:0xb8dded});for(let x=-225;x<=485;x+=35)for(const z of [-467,-437]){box(.25,.34,.25,x,.17,z,dark);box(.22,.12,.22,x,.4,z,lightMat);}
 const hangars=[];for(const [i,x]of [-190,-130].entries()){
  const g=new THREE.Group();g.name='Hangar '+(i+1);g.position.set(x,0,-328);root.add(g);hangars.push({x,z:-328,w:40,d:36,group:g});
  box(40,.16,36,0,.08,0,mat(0xaaa99f),g);box(40,8,.2,0,4,18,steel,g);for(const s of [-1,1])box(.25,8,36,s*20,4,0,steel,g);
  for(const s of [-1,1]){const roof=box(20.8,.2,38,s*10,9,0,dark,g);roof.rotation.z=-s*Math.atan2(2,20);box(4,7.4,.18,s*18,3.7,-18,steel,g);box(.4,8.2,.5,s*16,4.1,-18,dark,g);}
  box(40,.6,.5,0,7.7,-18,dark,g);for(let x=-19;x<=19;x+=2.4)box(.06,7.6,.08,x,3.8,18.15,white,g);
  // Open frontage: retracted sliding panels reveal an unobstructed 32m opening.
  for(const s of [-1,1]){box(3.8,7,.3,s*18,3.5,-18.2,dark,g);for(let j=0;j<4;j++)box(.045,7,.05,s*(16.6+j*.8),3.5,-18.4,steel,g);}
  for(const z of [-10,5]){box(8,.65,1.2,-13,.4,z,dark,g);box(8,.14,1.2,-13,.8,z,cream,g);}label('HANGAR 0'+(i+1),x,8.2,-346.4,13,1,Math.PI);
 }
 // Passenger commuter aircraft, with a real open aisle, fourteen passenger seats and two pilot seats.
 const planes=[],helicopters=[],aircraft=[],sources=[];let boarded=null;
 function seat(g,x,z,y=1.85){box(.54,.12,.62,x,y,z,seatMat,g);box(.54,.72,.13,x,y+.39,z+.26,seatMat,g);box(.45,.2,.12,x,y+.85,z+.26,seatMat,g);box(.09,.48,.09,x,y-.3,z,dark,g);}
 function tire(g,x,y,z){mesh(new THREE.CylinderGeometry(.32,.32,.22,16),rubber,x,y,z,g,[0,0,Math.PI/2]);box(.09,.7,.09,x,y+.45,z,steel,g);}
 function wing(g,span,chord,z,y,m){const sh=new THREE.Shape();sh.moveTo(-span/2,chord*.45);sh.lineTo(-span/2,-chord*.1);sh.lineTo(-1.2,-chord*.55);sh.lineTo(1.2,-chord*.55);sh.lineTo(span/2,-chord*.1);sh.lineTo(span/2,chord*.45);sh.closePath();mesh(new THREE.ExtrudeGeometry(sh,{depth:.17,bevelEnabled:false}),m,0,y,z,g,[Math.PI/2,0,0]);}
 for(const [i,x]of [-190,-130].entries()){
  const z=-377,g=new THREE.Group();g.position.set(x,0,z);g.name='Passenger plane '+(i+1)+' · 14 seats';root.add(g);
  const p={id:'plane-'+(i+1),name:'Passenger plane '+(i+1),x,z,seats:14,group:g,entry:{x:x+2.8,z:z+4.7},eye:{x:x+.58,y:2.75,z:z+3.35},exit:{x:x+3.25,z:z+4.7}};planes.push(p);aircraft.push(p);
  // Rounded elliptical fuselage with true transparent window bands.
  const shell=white.clone();shell.side=THREE.DoubleSide;const shellParts=[[],[]],zs=[-6.5,6.5];for(let row=0;row<7;row++){const z=-4.9+row*1.4;zs.push(z-.53,z+.53);}zs.sort((a,b)=>a-b);
  for(let j=0;j<zs.length-1;j++)for(let k=0;k<48;k++){const aa=k/48*Math.PI*2,bb=(k+1)/48*Math.PI*2,mid=(aa+bb)/2,zz=(zs[j]+zs[j+1])/2;const sideWindow=(mid<.85||mid>Math.PI*2-.08||mid>Math.PI-.85&&mid<Math.PI+.08)&&Array.from({length:7},(_,r)=>Math.abs(zz-(-4.9+r*1.4))<.54).some(Boolean);const vertices=shellParts[sideWindow?1:0];for(const [ang,z]of [[aa,zs[j]],[bb,zs[j]],[aa,zs[j+1]],[aa,zs[j+1]],[bb,zs[j]],[bb,zs[j+1]]])vertices.push(Math.cos(ang)*1.35,2.3+Math.sin(ang)*1.02,z);}
  for(let k=0;k<2;k++){const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(shellParts[k],3));geo.computeVertexNormals();mesh(geo,k?glass:shell,0,0,0,g);}
  box(2.2,.13,12.8,0,1.49,0,cream,g);for(let row=0;row<7;row++)for(const side of [-1,1])seat(g,side*.65,-4.9+row*1.4,1.85);
  for(const side of [-1,1])box(.025,.14,12.4,side*1.32,2.04,0,stripe,g);
  sphere(0,2.3,-7.0,1.31,.95,2.0,white,g);sphere(0,2.75,-7.1,1.17,.55,1.25,glass,g);sphere(0,2.15,7.0,1.16,.84,2,white,g);seat(g,-.55,-6.3);seat(g,.55,-6.3);
  box(1.8,.35,.5,0,2.28,-7.35,dark,g);wing(g,24,3.5,-1,3.45,white);wing(g,8,1.8,7,3.0,white);
  const fin=new THREE.Shape();fin.moveTo(6,2.7);fin.lineTo(8.9,2.4);fin.lineTo(8,5.9);fin.lineTo(6.8,5.9);fin.closePath();mesh(new THREE.ExtrudeGeometry(fin,{depth:.15,bevelEnabled:false}),stripe,-.075,0,0,g,[0,-Math.PI/2,0]);
  for(const side of [-1,1]){sphere(side*4.2,2.95,-2.3,.58,.65,2.0,dark,g);mesh(new THREE.CylinderGeometry(.3,.48,.8,16),steel,side*4.2,2.95,-4.1,g,[Math.PI/2,0,0]);for(let blade=0;blade<4;blade++){const prop=box(.16,3.5,.08,side*4.2,2.95,-4.6,dark,g);prop.rotation.z=blade*Math.PI/2+.3;}tire(g,side*1.65,.36,2.5);}tire(g,0,.36,-6.1);
  // Movable boarding is via nearby action; stairs remain outside the landing gear.
  for(let j=0;j<5;j++)box(.65,.18*(j+1),1.3,2.9-j*.31,.09*(j+1),4.7,steel,g);
  label('ZC · '+(i+1)+' · 14 PASSENGERS',x,1.0,z+10.2,8,.8);box(.09,.9,.09,x,.45,z+10.2,dark);
 }
 for(const [i,x]of [20,60].entries()){
  const z=-352;const pad=mesh(new THREE.CylinderGeometry(12.5,12.5,.06,64),mat(0x566466),x,.13,z);const ring=new THREE.Mesh(new THREE.RingGeometry(10.7,11.05,64),new THREE.MeshBasicMaterial({color:0xe7dca8,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(x,.19,z);root.add(ring);box(.4,.01,7,x-2,.2,z,white);box(.4,.01,7,x+2,.2,z,white);box(4.4,.01,.4,x,.2,z,white);
  const g=new THREE.Group();g.name='Helicopter '+(i+1);g.position.set(x,0,z);root.add(g);const h={id:'heli-'+(i+1),name:'Helicopter '+(i+1),x,z,seats:6,group:g,entry:{x:x+2.8,z:z+.4},eye:{x:x+.55,y:2.1,z:z-.3},exit:{x:x+3.1,z:z+.4}};helicopters.push(h);aircraft.push(h);
  sphere(0,1.85,1.4,1.3,1.1,1.4,[stripe,white][i],g);sphere(0,1.95,-1.35,1.22,1.03,1.65,glass,g);box(1.9,.16,3.4,0,1.02,-.2,dark,g);for(let row=0;row<3;row++)for(const side of [-1,1])seat(g,side*.49,-1.35+row*1.0,1.3);
  for(const side of [-1,1]){box(.08,1.7,.09,side*1.1,1.84,-.5,dark,g);box(.06,.08,2.5,side*1.1,2.7,-.4,dark,g);mesh(new THREE.CylinderGeometry(.09,.09,5.8,12),dark,side*1.25,.3,.2,g,[Math.PI/2,0,0]);for(const zz of [-1,1.4])box(.09,.9,.09,side*1.25,.7,zz,steel,g);}
  const boom=mesh(new THREE.CylinderGeometry(.17,.48,6,12),[stripe,white][i],0,2.15,4.3,g,[Math.PI/2,0,0]);box(.12,1.8,.85,0,3.0,7.1,stripe,g);wing(g,3.1,1.0,6.5,2.3,white);box(.15,.9,.15,0,3.3,0,steel,g);
  for(let n=0;n<4;n++){const rotor=box(.3,.06,11,0,3.85,0,dark,g);rotor.rotation.y=n*Math.PI/2+.25;}box(.12,2.0,.12,.2,2.8,7.05,dark,g);box(.12,.12,2.0,.2,2.8,7.05,dark,g);
  label('HELICOPTER 0'+(i+1),x,.9,z+13.5,7,.7);box(.08,.8,.08,x,.4,z+13.5,dark);
 }
 // Arrival shelter, route signs and windsock, all original, unbranded town signage.
 box(17,.14,10,-49,.07,-317,cream);for(const x of [-57,-41])for(const z of [-321,-313])box(.18,3,.18,x,1.5,z,steel);box(19,.3,12,-49,3.1,-317,dark);box(16,2.2,.15,-49,1.25,-321,glass);label('ZERCONDA NORTH AIRFIELD',-49,2.8,-311,16,1.0);label('HANGARS ←     HELIPADS →',-49,1.7,-320.8,13,.6);
 for(const x of [-54,-45]){box(4,.15,.7,x,.65,-319,cream);for(const dx of [-1.5,1.5])box(.1,.6,.4,x+dx,.3,-319,dark);}
 box(.18,7,.18,107,3.5,-344,steel);const sock=new THREE.Group();sock.position.set(107,6.7,-344);sock.rotation.z=-Math.PI/2;root.add(sock);for(let i=0;i<5;i++)mesh(new THREE.CylinderGeometry(.5-i*.065,.54-i*.065,.6,16,1,true),i%2?white:mat(0xdf8a4a),0,i*.6,0,sock);
 label('NORTH AIRFIELD · VISITORS WELCOME',-85,2.2,-292,14,1);for(const x of [-91,-79])box(.12,2.1,.12,x,1.05,-292,dark);
 function action(id,text,target,fn,priority=120){const b=document.createElement('button');b.style.display='none';document.body.appendChild(b);b.onclick=fn;registerTownAction(b,{id:'airfield-'+id,label:text,priority,target});sources.push({b,id});return b;}
 for(const a of aircraft){a.button=action(a.id,`Board ${a.name} · ${a.seats} seats`,()=>({...a.entry,y:1.4}),()=>{if(boarded||!canUse())return;boarded=a;const p=getPlayer();p.x=a.eye.x;p.z=a.eye.z;onTeleport(p.x,a.eye.y-1.6,p.z,Math.PI);onMessage(a.name+' · Parked cabin view. Drag to look; tap Leave aircraft to step outside.');});}
 const leave=action('leave','Leave aircraft',()=>({...getPlayer(),y:boarded?boarded.eye.y:1.4}),()=>exit(),180);
 function exit(){if(!boarded)return;const a=boarded;boarded=null;const p=getPlayer();p.x=a.exit.x;p.z=a.exit.z;onTeleport(p.x,.04,p.z,Math.PI);}
 function update(){for(const a of aircraft)a.button.style.display=!boarded&&canUse()&&Math.hypot(getPlayer().x-a.entry.x,getPlayer().z-a.entry.z)<4.0?'block':'none';leave.style.display=boarded?'block':'none';}
 function blocks(x,z){if(z>=-285)return false;if(hangars.some(h=>Math.abs(x-h.x)<20.4&&Math.abs(z-h.z)<18.4&&(Math.abs(x-h.x)>19.4||z>h.z+17.3||z<h.z-17.3&&Math.abs(x-h.x)>15.5)))return true;return aircraft.some(a=>a.id.startsWith('plane')?Math.abs(x-a.x)<1.8&&Math.abs(z-a.z)<9.2:Math.hypot(x-a.x,z-a.z)<2.3);}
 for(const [m,geos]of parts){const g=mergeGeometries(geos,false),o=new THREE.Mesh(g,m);o.receiveShadow=true;o.castShadow=m!==grass&&m!==asphalt;root.add(o);for(const a of geos)a.dispose();}
 return {root,hangars,planes,helicopters,exit,update,blocks,heightAt:(x,z)=>{if(boarded)return boarded.eye.y-1.6;if(x<=-275||x>=569||z<=-529||z>=-285)return null;if(hangars.some(h=>Math.abs(x-h.x)<20&&Math.abs(z-h.z)<18))return .16;if(helicopters.some(h=>Math.hypot(x-h.x,z-h.z)<12.5))return .16;if(Math.abs(x+49)<8.5&&Math.abs(z+317)<5)return .14;const paved=z> -466&&z< -438&&x> -235&&x<495||z> -411.5&&z< -398.5&&x> -233&&x<493||x> -228&&x<96&&z> -398.5&&z< -309||Math.abs(x+96)<7&&z> -309||[-213,473].some(cx=>Math.abs(x-cx)<6.5&&Math.abs(z+428.5)<23.5);return paved?.12:-.08;},updateCamera(camera){if(boarded)camera.position.set(boarded.eye.x,boarded.eye.y,boarded.eye.z);},get boarded(){return !!boarded;}};
}
