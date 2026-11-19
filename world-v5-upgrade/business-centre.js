import {GROUND_LEVEL} from './ground-level.js?v=20261119-level-ground-v117';
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createRealisticHuman} from './realistic-human.js?v=20261118-faster-town-v106';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export const BUSINESS_CENTRE={x:188,z:-48,w:32,d:36,height:35.2,roofY:35.42,entry:{x:188,z:-26}};
export function createBusinessCentre(scene,{getPlayer,canEnter=()=>true,onTeleport=()=>{},onMessage=()=>{}}={}){
 const cfg=BUSINESS_CENTRE,root=new THREE.Group();root.name='Skyline Business Centre and public rooftop terrace';root.position.set(cfg.x,0,cfg.z);root.userData.customInterior=true;scene.add(root);let mode=null,time=0,fireOn=false,trip=null,cabinY=.22,doorOpen=1;const seats=[],solids={lobby:[],roof:[]},actions=[];
 const mat=(c,r=.8)=>new THREE.MeshStandardMaterial({color:c,roughness:r}),stone=mat(0xc7c9c2,.88),ivory=mat(0xe2dfd3),dark=mat(0x243d49,.45),teal=mat(0x416e80,.4),metal=mat(0x899795,.3),wood=mat(0x9e815e),cushion=mat(0xc5cabb,.9),slate=mat(0x50656b,.9),green=mat(0x4b7351,.95),glass=new THREE.MeshPhysicalMaterial({color:0xb6d3d7,transparent:true,opacity:.16,roughness:.12,metalness:.04,depthWrite:false,side:THREE.DoubleSide}),officeGlass=mat(0x32546c,.35);
 const parts=new Map();function mesh(geo,m,x=0,y=0,z=0,parent=null,rot=[0,0,0]){if(!geo.getAttribute('uv')){const p=geo.getAttribute('position'),u=[];for(let i=0;i<p.count;i++)u.push(p.getX(i),p.getZ(i));geo.setAttribute('uv',new THREE.Float32BufferAttribute(u,2));}const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.rotation.set(...rot);o.castShadow=true;o.receiveShadow=true;if(parent){parent.add(o);return o;}o.updateMatrix();const g=geo.clone().applyMatrix4(o.matrix),list=parts.get(m)||[];list.push(g.index?g.toNonIndexed():g);parts.set(m,list);geo.dispose();return o;}
 const box=(w,h,d,x,y,z,m=stone,p=null)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,p);
 function sign(text,x,y,z,w=8,h=.75,ry=0){const c=document.createElement('canvas');c.width=1536;c.height=256;const a=c.getContext('2d');a.fillStyle='#284650';a.fillRect(0,0,1536,256);a.fillStyle='#f2e9d1';a.textAlign='center';a.textBaseline='middle';a.font='bold 65px sans-serif';a.fillText(text,768,128,1490);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));o.position.set(x,y,z);o.rotation.y=ry;root.add(o);return o;}
 const world=(x,z,y)=>({x:cfg.x+x,z:cfg.z+z,y});const local=(x,z)=>({x:x-cfg.x,z:z-cfg.z});
 function solid(level,x,z,w,d){solids[level].push({x,z,w,d});}
 // Floor slabs and office shell leave a real opening for the lift shaft.
 function shaftCut(w,h,d,cx,cy,cz,m){const left=8,right=12,back=-14.5,front=-10;const x0=cx-w/2,x1=cx+w/2,z0=cz-d/2,z1=cz+d/2;
 box(left-x0,h,d,(x0+left)/2,cy,cz,m);box(x1-right,h,d,(right+x1)/2,cy,cz,m);
 box(right-left,h,back-z0,10,cy,(z0+back)/2,m);box(right-left,h,z1-front,10,cy,(front+z1)/2,m);}
 // Street frontage matches the adjacent news station: 36m depth and a 35m roofline.
 box(32.6,.44,36.6,0,0,0,stone);box(32,4.7,.2,0,2.57,-18,ivory);shaftCut(32,.24,36,0,4.95,0,ivory);
 for(const side of [-1,1]){for(const zz of [-15,-9,-3,3,9,15]){box(.10,4.5,5.7,side*16,2.55,zz,glass);box(.16,4.9,.16,side*16,2.55,zz-3,dark);}box(.16,.3,36,side*16,.37,0,dark);box(.16,.24,36,side*16,4.83,0,dark);}
 // Lobby transparent glazing surrounds an actual door opening.
 for(const side of [-1,1]){box(13.3,4.45,.1,side*9.35,2.55,18,glass);for(const xx of [3,7,11,15.8])box(.12,4.7,.16,side*xx,2.57,18.05,dark);}box(5.6,.7,.18,0,4.6,18,dark);
 const door=new THREE.Group();door.name='Lobby sliding glass doors';root.add(door);for(const side of [-1,1]){box(2.6,3.9,.10,side*1.35,2.2,18.12,glass,door);box(.08,3.9,.14,side*2.65,2.2,18.14,metal,door);box(.07,.6,.1,side*.2,2.2,18.25,metal,door);}
 box(11,.25,4.4,0,4.6,19.3,dark);box(10,.16,17,0,GROUND_LEVEL-.08,25.5,stone);sign('SKYLINE BUSINESS CENTRE',0,4.1,18.25,15,.65);sign('PUBLIC LOBBY & ROOFTOP',-8,1.4,21.4,5,.6);for(const x of [-10,-6])box(.08,1.3,.08,x,.65,21.4,dark);
 // Seven private commercial floors are opaque, with no public stops or hidden entrances.
 shaftCut(31.6,29.8,35.6,0,20.1,0,dark);
 for(let f=0;f<7;f++){const y=7.1+f*4.1;for(let i=0;i<8;i++){const x=-14+i*4;for(const side of [-1,1])box(3.7,3.65,.12,x,y,side*17.86,(i+f)%4?officeGlass:teal);}for(let i=0;i<9;i++){const z=-16+i*4;for(const side of [-1,1])box(.12,3.65,3.7,side*15.86,y,z,(i+f)%4?officeGlass:teal);}shaftCut(32.5,.17,36.5,0,y+2.0,0,metal);}
 for(const x of [-16,16])for(const z of [-18,18])box(.28,35.2,.28,x,17.6,z,ivory);
 // Reception and comfortable public lobby, with real views through the glazing.
 shaftCut(31.8,.18,35.8,0,.13,0,stone);box(8,1.1,2,0,.77,-3,wood);box(8.3,.14,2.2,0,1.39,-3,ivory);box(6.7,.035,.06,0,.9,-1.98,metal);solid('lobby',0,-3,8.5,2.5);
 box(1.0,.07,.55,-1.7,1.5,-3,metal);box(.06,.6,.06,-1.7,1.8,-3,metal);box(1.2,.7,.08,-1.7,2.05,-3,dark);box(1,.04,.4,1.3,1.5,-3.2,slate);sign('WELCOME · SKYLINE',2,2.8,-17.86,10,1.1);sign('PRIVATE BUSINESS FLOORS 1–7',-9,4.25,-15.56,8,.55);
 const receptionist=createRealisticHuman({shirt:0x344c63,pants:0x7b7c72});receptionist.root.name='Front desk receptionist';const receptionistStand=new THREE.Group();receptionistStand.position.set(.7,.22,-5.2);root.add(receptionistStand);receptionistStand.add(receptionist.root);
 // Private staff corridor is clearly closed, never offered as a destination.
 box(4.3,3.4,.18,-9,1.92,-15.7,dark);sign('PRIVATE BUSINESSES',-9,2.1,-15.56,3.7,.45);solid('lobby',-9,-15.7,4.5,.45);
 const marble=mat(0x131a1d,.28),brass=mat(0xa88b52,.28),cabinWall=mat(0x454d50,.38),floor=mat(0xd7d0bd,.65),liftDoors=[];
 function liftPavilion(base,level){
  box(4.3,3.4,.20,10,base+1.7,-14.5,marble);
  for(const x of [7.9,12.1])box(.20,3.4,4.6,x,base+1.7,-12.3,marble);
  box(4.4,.18,4.7,10,base+3.45,-12.3,marble);
  for(const x of [8.55,11.45])box(.85,3.4,.20,x,base+1.7,-10,marble);
  box(2.05,.95,.20,10,base+2.925,-10,marble);
  for(const x of [8.97,11.03])box(.08,2.5,.24,x,base+1.25,-9.97,brass);
  box(2.12,.08,.24,10,base+2.48,-9.97,brass);
  const pair=[];for(const side of [-1,1]){const g=new THREE.Group();g.position.set(10+side*.49,base,-9.97);root.add(g);box(.97,2.38,.06,0,1.20,0,metal,g);pair.push({g,side});}liftDoors.push({level,pair});
  box(.20,.48,.08,11.27,base+1.15,-9.85,brass);box(.10,.10,.02,11.27,base+1.2,-9.79,ivory);
  sign(level==='lobby'?'R':'L',10,base+2.83,-9.85,.45,.25);
  for(const x of [8.55,11.45])solid(level,x,-10,.85,.25);solid(level,7.9,-12.3,.4,4.8);solid(level,12.1,-12.3,.4,4.8);solid(level,10,-14.5,4.5,.4);
 }
 liftPavilion(.22,'lobby');
 const cabin=new THREE.Group();cabin.name='Traditional enclosed working elevator';root.add(cabin);cabin.position.set(10,cabinY,-12.25);
 box(3.8,.12,4.2,0,-.06,0,floor,cabin);box(3.8,.12,4.2,0,2.85,0,marble,cabin);
 box(3.8,2.8,.12,0,1.4,-2.0,cabinWall,cabin);for(const x of [-1.85,1.85]){box(.12,2.8,4,x,1.4,0,cabinWall,cabin);box(.05,.06,3.6,x*.96,1.0,0,brass,cabin);}
 box(3.4,.05,.05,0,1.0,-1.88,brass,cabin);box(2.8,.015,3.2,0,.015,0,slate,cabin);box(2.55,.02,2.95,0,.025,0,floor,cabin);
 const lamp=new THREE.MeshBasicMaterial({color:0xffecd0});box(2.6,.025,2.5,0,2.77,0,lamp,cabin);
 const carDoors=[];for(const side of [-1,1]){box(.85,2.8,.12,side*1.48,1.4,2.0,cabinWall,cabin);const g=new THREE.Group();g.position.set(side*.49,0,2.0);cabin.add(g);box(.97,2.4,.06,0,1.2,0,metal,g);carDoors.push({g,side});}
 const light=new THREE.PointLight(0xffedd4,7,6);light.position.set(0,2.5,0);cabin.add(light);
  // Weatherproof slatted outdoor furniture; seats participate in the shared sit/stand system.
 function sofa(level,x,z,width,facing=0){const y=level==='roof'?cfg.roofY:.22,g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=facing;root.add(g);box(width,.15,1.05,0,.38,0,wood,g);for(const xx of [-width/2+.13,width/2-.13])for(const zz of [-.3,.3])box(.13,.35,.13,xx,.19,zz,dark,g);box(width,.62,.13,0,.81,-.48,wood,g);box(.14,.4,1.0,-width/2+.04,.7,0,wood,g);box(.14,.4,1.0,width/2-.04,.7,0,wood,g);const count=Math.round(width/1.15);for(let i=0;i<count;i++){const xx=-width/2+(i+.5)*width/count;mesh(new RoundedBoxGeometry(width/count-.12,.18,.88,2,.06),cushion,xx,.54,.04,g);mesh(new RoundedBoxGeometry(width/count-.15,.48,.14,2,.05),cushion,xx,.89,-.36,g);const sx=x+Math.cos(facing)*xx,sz=z-Math.sin(facing)*xx;seats.push({...world(sx,sz),facing,sitHeight:y+.66,kind:level==='roof'?'rooftop outdoor lounge':'business lobby lounge',level});}solid(level,x,z,Math.abs(Math.cos(facing))*width+Math.abs(Math.sin(facing))*1.05,Math.abs(Math.sin(facing))*width+Math.abs(Math.cos(facing))*1.05);}
 sofa('lobby',-9,6,3.6,Math.PI/2);sofa('lobby',-9,-1,2.5,Math.PI/2);box(1.2,.12,2.1,-6,.67,2.8,wood);solid('lobby',-6,2.8,1.4,2.3);for(const x of [-6.45,-5.55])for(const z of [2,3.6])box(.08,.39,.08,x,.415,z,dark);
 // Public rooftop sits in the actual town, never a remote interior scene.
 const y=cfg.roofY;shaftCut(32.8,.22,36.8,0,y-.11,0,stone);for(const side of [-1,1]){box(.16,.3,36,side*16,y+.15,0,dark);box(.04,1.25,35.6,side*16,y+.9,0,glass);box(.07,.09,36,side*16,y+1.57,0,metal);box(32,.3,.16,0,y+.15,side*18,dark);box(31.6,1.25,.04,0,y+.9,side*18,glass);box(32,.09,.07,0,y+1.57,side*18,metal);}for(const x of [-16,0,16])for(const z of [-18,18])box(.08,1.6,.08,x,y+.8,z,metal);liftPavilion(y,'roof');
 sofa('roof',-3,-3,3.6,0);sofa('roof',-9,2,2.5,Math.PI/2);sofa('roof',3,2,2.5,-Math.PI/2);sofa('roof',-7,7,1.2,Math.PI);sofa('roof',1,7,1.2,Math.PI);
 // Electric flame display: no wood burning, smoke, or unattended fuel.
 box(3.3,.6,1.65,-3,y+.3,2,dark);box(2.9,.12,1.3,-3,y+.64,2,metal);for(const zz of [1.35,2.65])box(3.1,.4,.035,-3,y+.87,zz,glass);for(const xx of [-4.55,-1.45])box(.035,.4,1.3,xx,y+.87,2,glass);solid('roof',-3,2,3.6,1.95);
 const fire=new THREE.Group();fire.name='Electric fire pit flame display';fire.visible=false;root.add(fire);const flame=new THREE.MeshBasicMaterial({color:0xf4b76c,transparent:true,opacity:.8,depthWrite:false});for(let i=0;i<11;i++){const f=mesh(new THREE.SphereGeometry(1,10,8),flame,-4.1+i*.22,y+.79,2+(i%2-.5)*.2,fire);f.scale.set(.10,.16+(i%3)*.05,.08);}const fireLight=new THREE.PointLight(0xffbf7c,0,9);fireLight.position.set(-3,y+1.2,2);root.add(fireLight);
 // Two electric grills and a small outdoor dining area.
 const grills=[];for(const [i,x]of [-11,-6].entries()){box(2.6,.9,1.3,x,y+.55,-10,metal);for(const xx of [x-1,x+1])for(const zz of [-10.45,-9.55])box(.1,.12,.1,xx,y+.06,zz,dark);box(2.8,.12,1.45,x,y+1.07,-10,dark);for(let j=0;j<12;j++)box(.045,.04,1.1,x-1.1+j*.2,y+1.15,-10,metal);box(2.55,.8,.10,x,y+1.52,-10.65,metal);box(2.0,.06,.06,x,y+1.3,-10.25,dark);for(const xx of [x-.8,x+.8])mesh(new THREE.CylinderGeometry(.07,.07,.04,12),dark,xx,y+.8,-9.33,null,[Math.PI/2,0,0]);const indicator=new THREE.Mesh(new THREE.SphereGeometry(.065,8,6),new THREE.MeshBasicMaterial({color:0x586b66}));indicator.position.set(x,y+.83,-9.3);root.add(indicator);grills.push({id:i+1,x,z:-10,on:false,indicator});solid('roof',x,-10,3,1.7);}
 box(3.8,.14,2.0,8,y+.78,11,wood);for(const xx of [6.5,9.5])for(const zz of [10.3,11.7])box(.12,.7,.12,xx,y+.35,zz,dark);solid('roof',8,11,4.0,2.2);for(const [x,z,angle]of [[6,8.8,0],[10,8.8,0],[6,13.2,Math.PI],[10,13.2,Math.PI]])sofa('roof',x,z,1.2,angle);
 // Partial pergola and low planting leave open sky and skyline views around the lounge.
 for(const x of [-12,6])for(const z of [-6,10])box(.16,3.2,.16,x,y+1.6,z,dark);for(const z of [-6,10])box(18.5,.18,.18,-3,y+3.2,z,wood);for(let x=-12;x<=6;x+=1.1)box(.10,.15,16,x,y+3.3,2,wood);
 // Simple planted boxes have separately parented leaves so their full 3D form is retained.
 for(const [x,z]of [[-13,15],[-13,-15],[0,-16],[13,15],[14,1]]){box(2.2,.65,1.4,x,y+.325,z,stone);const g=new THREE.Group();g.position.set(x,y+.75,z);root.add(g);for(let i=0;i<18;i++){const a=i*2.399,r=.12+(i%4)*.15,o=mesh(new THREE.SphereGeometry(1,8,6),green,Math.cos(a)*r,.2+(i%3)*.15,Math.sin(a)*r,g);o.scale.set(.15,.45,.08);o.rotation.z=Math.sin(a)*.65;}solid('roof',x,z,2.4,1.6);}
 sign('SKYLINE TERRACE · PUBLIC ROOFTOP',-3,y+2.5,-17.7,15,.8);for(let i=0;i<15;i++){const bulb=mesh(new THREE.SphereGeometry(.065,8,6),new THREE.MeshBasicMaterial({color:0xffdeb0}),-11+i*1.15,y+3.05,9.8);}
 // Only two public destinations exist. Private offices are never visitable.
 function near(x,z,r=3.5){const p=local(getPlayer().x,getPlayer().z);return Math.hypot(p.x-x,p.z-z)<r;}
 function action(id,label,target,when,fn,priority=115){const b=document.createElement('button');b.style.display='none';b.onclick=fn;document.body.appendChild(b);registerTownAction(b,{id:'business-'+id,label,priority,target});actions.push({b,when});}
 function move(next,x,z){trip=null;mode=next;cabinY=next==='roof'?cfg.roofY:.22;cabin.position.y=cabinY;doorOpen=1;const p=getPlayer();p.x=cfg.x+x;p.z=cfg.z+z;door.visible=mode!=='lobby';onTeleport(p.x,next==='roof'?y:.22,p.z,next==='roof'?0:Math.PI);}
 function exit(){if(!mode||trip)return;mode=null;door.visible=true;const p=getPlayer();p.x=cfg.entry.x;p.z=cfg.entry.z;onTeleport(p.x,.16,p.z,0);}
 action('enter','Enter Skyline Business Centre',()=>({...cfg.entry,y:1.4}),()=>!mode&&canEnter()&&near(0,22,5),()=>move('lobby',0,13),130);
 action('exit','Exit business centre',()=>world(0,16.8,1.4),()=>mode==='lobby'&&near(0,16,4),exit,130);
 action('reception','Talk to reception',()=>world(0,-.7,1.6),()=>mode==='lobby'&&near(0,-.7,4.5),()=>onMessage('Welcome to Skyline. Floors 1–7 are private businesses. The lift connects the lobby to the public rooftop terrace.'),120);
 action('roof','Lift to rooftop terrace',()=>world(10,-8.7,1.4),()=>mode==='lobby'&&!trip&&near(10,-8.7,4),()=>startLift('roof'),140);
 action('lobby','Lift to lobby',()=>world(10,-8.7,y+1.4),()=>mode==='roof'&&!trip&&near(10,-8.7,4),()=>startLift('lobby'),140);
 action('fire',()=>fireOn?'Turn electric fire pit off':'Turn electric fire pit on',()=>world(-3,3.8,y+1.1),()=>mode==='roof'&&near(-3,3.8,4),()=>{fireOn=!fireOn;fire.visible=fireOn;fireLight.intensity=fireOn?3:0;onMessage(fireOn?'Electric fire pit on. Welcome to the rooftop lounge.':'Electric fire pit off.');},120);
 for(const g of grills)action('grill-'+g.id,()=>g.on?'Switch grill '+g.id+' off':'Turn grill '+g.id+' on',()=>world(g.x,-8.7,y+1.1),()=>mode==='roof'&&near(g.x,-8.7,3),()=>{g.on=!g.on;g.indicator.material.color.setHex(g.on?0xf3b45c:0x586b66);onMessage(g.on?'Electric grill '+g.id+' is warming for a rooftop cookout.':'Grill '+g.id+' switched off.');},120);
 function startLift(next){if(trip||!mode||next===mode)return false;const p=getPlayer();p.x=cfg.x+10;p.z=cfg.z-12;trip={from:cabinY,to:next==='roof'?cfg.roofY:.22,next,elapsed:0};doorOpen=1;onTeleport(p.x,cabinY,p.z,Math.PI);onMessage('Doors closing. '+(next==='roof'?'Going up to the rooftop terrace.':'Going down to the lobby.'));return true;}
  function contains(x,z){const p=local(x,z);if(trip)return Math.abs(p.x-10)<.7&&Math.abs(p.z+12)<.7;return Math.abs(p.x)<15.4&&Math.abs(p.z)<17.4&&!solids[mode||'lobby'].some(s=>Math.abs(p.x-s.x)<s.w/2+.25&&Math.abs(p.z-s.z)<s.d/2+.25);}
 function blocks(x,z){return !mode&&Math.abs(x-cfg.x)<16.4&&Math.abs(z-cfg.z)<18.4;}
 function heightAt(x,z){if(trip)return cabinY;if(mode&&Math.abs(x-cfg.x)<16.5&&Math.abs(z-cfg.z)<18.5)return mode==='roof'?y:.22;if(!mode&&Math.abs(x-cfg.x)<5&&z>=cfg.z+17&&z<=cfg.z+34)return GROUND_LEVEL;return null;}
 function update(dt){time+=dt;if(trip){trip.elapsed+=Math.max(0,dt);const t=trip.elapsed;doorOpen=t<1?1-t:t>9?Math.min(1,t-9):0;const u=THREE.MathUtils.clamp((t-1)/8,0,1),ease=u*u*(3-2*u);cabinY=THREE.MathUtils.lerp(trip.from,trip.to,ease);cabin.position.y=cabinY;const p=getPlayer();p.x=cfg.x+10;p.z=cfg.z-12;if(t>=10){mode=trip.next;trip=null;doorOpen=1;onMessage(mode==='roof'?'Rooftop terrace. Doors open.':'Lobby. Doors open.');}}for(const {g,side}of carDoors)g.position.x=side*(.49+doorOpen*.98);for(const landing of liftDoors){const opening=landing.level===mode?doorOpen:trip&&landing.level===trip.next&&trip.elapsed>9?doorOpen:0;for(const {g,side}of landing.pair)g.position.x=10+side*(.49+opening*.98);}
 receptionist.update(dt,0);if(fireOn)fire.children.forEach((f,i)=>f.scale.y=.14+.08*Math.sin(time*4+i));for(const a of actions)a.b.style.display=a.when()?'block':'none';}
 function clampCamera(p){if(!mode)return;const person=local(getPlayer().x,getPlayer().z);if(trip||Math.abs(person.x-10)<1.0&&person.z< -10){p.x=cfg.x+10;p.z=cfg.z-10.6;p.y=cabinY+2.15;return;}p.x=THREE.MathUtils.clamp(p.x,cfg.x-15.2,cfg.x+15.2);p.z=THREE.MathUtils.clamp(p.z,cfg.z-17.2,cfg.z+17.2);if(mode==='lobby')p.y=THREE.MathUtils.clamp(p.y,1.7,4.55);else p.y=Math.max(p.y,y+1.6);}
 for(const [m,geos]of parts){const g=mergeGeometries(geos,false),o=new THREE.Mesh(g,m);o.castShadow=m!==glass;o.receiveShadow=true;root.add(o);for(const q of geos)q.dispose();}
 return{root,cfg,cabin,startLift,get riding(){return !!trip;},get cabinY(){return cabinY;},get doorOpen(){return doorOpen;},entry:cfg.entry,seats,grills,fire,exit,move,contains,blocks,heightAt,update,clampCamera,receptionist,get active(){return !!mode;},get lobby(){return mode==='lobby';},get roof(){return mode==='roof';},get mode(){return mode;},get fireOn(){return fireOn;},nearestSeat(x,z,max=2.5){if(!mode)return null;let best=null;for(const seat of seats){if(seat.level!==mode)continue;const d=Math.hypot(x-seat.x,z-seat.z);if(d<max){max=d;best=seat;}}return best;}};
}
