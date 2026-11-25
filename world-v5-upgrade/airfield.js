import {createCockpitDoor} from './aircraft-cockpit-door.js?v=20261121-profile-studio-v203';
import {createAirportEntrance} from './airport-entrance.js?v=20261121-forest-airfield-v193';
import {buildRealisticHangar,createAirportConcrete} from './airport-architecture.js?v=20261121-profile-studio-v203';
import {createExecutiveSeat,executiveBodyMaterial,addExecutiveJetExterior} from './executive-jet-details.js?v=20261121-forest-airfield-v193';
import {mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export const AIRFIELD={west:-276,east:570,north:-530,south:-285,runway:{x:130,z:-452,length:730,width:28}};
export function createAirfield(scene,{getPlayer,groundMaterial=null,roadMaterial=null,canUse=()=>true,onTeleport=()=>{},onMessage=()=>{}}={}){
 const root=new THREE.Group();root.name='Zerconda North Airfield';root.userData.customInterior=true;scene.add(root);
 const mat=(color,roughness=.8)=>new THREE.MeshStandardMaterial({color,roughness});
 const white=mat(0xe5e5db),stripe=mat(0x278899,.4),dark=mat(0x263a43,.5),steel=mat(0x939ea0,.45),rubber=mat(0x182329),seatMat=mat(0x425a68),cream=mat(0xd4cbb9),yellow=mat(0xe7c15a),glass=new THREE.MeshPhysicalMaterial({color:0x83b4c4,transparent:true,opacity:.22,roughness:.08,metalness:.05,side:THREE.DoubleSide,depthWrite:false});
 const parts=new Map();function mesh(geo,m,x=0,y=0,z=0,parent=null,rot=[0,0,0]){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.rotation.set(...rot);o.castShadow=true;o.receiveShadow=true;if(parent){parent.add(o);return o;}o.updateMatrix();const g=geo.clone().applyMatrix4(o.matrix);const list=parts.get(m)||[];list.push(g.index?g.toNonIndexed():g);parts.set(m,list);geo.dispose();return o;}
 const box=(w,h,d,x,y,z,m=white,p=null)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,p);
 function sphere(x,y,z,sx,sy,sz,m,p){const o=mesh(new THREE.SphereGeometry(1,20,12),m,x,y,z,p);o.scale.set(sx,sy,sz);return o;}
 function label(text,x,y,z,w=7,h=1,ry=0,bg='#233e49'){const c=document.createElement('canvas');c.width=1536;c.height=256;const a=c.getContext('2d');a.fillStyle=bg;a.fillRect(0,0,c.width,c.height);a.fillStyle='#f0e9d4';a.textAlign='center';a.textBaseline='middle';a.font='bold 74px sans-serif';a.fillText(text,768,128,1490);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));o.position.set(x,y,z);o.rotation.y=ry;root.add(o);return o;}
 function grain(base){const c=document.createElement('canvas');c.width=c.height=256;const a=c.getContext('2d');a.fillStyle=base;a.fillRect(0,0,256,256);let s=571;for(let i=0;i<13000;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;const x=s%256;s=(Math.imul(s,1664525)+1013904223)>>>0;const y=s%256;a.fillStyle=i%2?'#ffffff18':'#00000016';a.fillRect(x,y,1,1);}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(40,15);return t;}
 // Share the town's grass and world-aligned UV scale across the airfield.
 const grass=groundMaterial||mat(0x94a68a);const groundGeo=new THREE.BoxGeometry(846,.12,245),gp=groundGeo.attributes.position,gu=groundGeo.attributes.uv;for(let i=0;i<gu.count;i++)gu.setXY(i,(gp.getX(i)+147-165)/1250+.5,.5-(gp.getZ(i)-407.5+425)/1180);groundGeo.dispose(); // The continuous city lawn already covers this whole footprint; no raised duplicate slab.
 const asphalt=mat(0xffffff);asphalt.map=grain('#4a5051');box(730,.08,28,130,.08,-452,asphalt);box(725,.08,13,130,.08,-405,asphalt);box(120,.08,89.5,-168,.08,-353.75,createAirportConcrete());box(180,.08,89.5,6,.08,-353.75,createAirportConcrete());box(24,.08,85.5,-96,.08,-355.75,createAirportConcrete());box(24,.08,16.5,-96,-.02,-300.75,roadMaterial||asphalt);
 const approachRamp=new THREE.BufferGeometry();approachRamp.setAttribute('position',new THREE.Float32BufferAttribute([-108,.02,-309,-84,.02,-309,-108,.12,-313,-84,.02,-309,-84,.12,-313,-108,.12,-313],3));approachRamp.setAttribute('uv',new THREE.Float32BufferAttribute([0,0,1,0,0,1,1,0,1,1,0,1],2));approachRamp.computeVertexNormals();mesh(approachRamp,roadMaterial||asphalt);
 // Taxiway connections, turn pads and clear runway markings.
 for(const x of [-213,473])box(13,.08,47,x,.08,-428.5,asphalt);
 for(let x=-211;x<480;x+=28)box(13,.012,.32,x,.128,-452,white);
 for(const z of [-464,-440])box(690,.012,.22,130,.128,z,white);
 for(const side of [-1,1]){const x=130+side*330;for(const z of [-461,-458,-455,-449,-446,-443])box(13,.014,1.25,x,.129,z,white);const n=label(side<0?'09':'27',x-side*18,.132,-452,7,4);n.rotation.set(-Math.PI/2,0,side<0?Math.PI/2:-Math.PI/2);}
 for(let x=-207;x<478;x+=9)box(4,.01,.14,x,.128,-405,yellow);
 for(const x of [-190,-130,20,60])for(let z=-389;z< -372;z+=5)box(.15,.01,2.5,x,.128,z,yellow);
 const lightMat=new THREE.MeshBasicMaterial({color:0xb8dded});for(let x=-225;x<=485;x+=35)for(const z of [-467,-437]){box(.25,.34,.25,x,.17,z,dark);box(.22,.12,.22,x,.4,z,lightMat);}
 const hangars=[];for(const [i,x]of [-190,-130].entries()){
  const g=new THREE.Group();g.name='Hangar '+(i+1);g.position.set(x,0,-328);root.add(g);hangars.push({x,z:-328,w:40,d:36,group:g});
  buildRealisticHangar(g,i+1);
 }
 // Passenger commuter aircraft, with a real open aisle, fourteen passenger seats and two pilot seats.
 function subdivideSurface(source){let values=Array.from(source.index?source.toNonIndexed().attributes.position.array:source.attributes.position.array);for(let pass=0;pass<3;pass++){const next=[];for(let i=0;i<values.length;i+=9){const a=values.slice(i,i+3),b=values.slice(i+3,i+6),c=values.slice(i+6,i+9),mid=(a,b)=>a.map((n,k)=>(n+b[k])/2),ab=mid(a,b),bc=mid(b,c),ca=mid(c,a);for(const v of [a,ab,ca,ab,b,bc,ca,bc,c,ab,bc,ca])next.push(...v);}values=next;}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(values,3));source.dispose();return g;}
 const planes=[],helicopters=[],aircraft=[],sources=[];const cabinFloor=1.80,apronY=.12,stairCount=10,stairRun=.32,stairInner=1.70,stairOuter=stairInner+stairCount*stairRun,doorZ=6.50,doorHalf=.60;let boarded=null,seated=null;
 function seat(g,x,z,y=1.85){mesh(new RoundedBoxGeometry(.54,.12,.62,2,.045),seatMat,x,y,z,g);mesh(new RoundedBoxGeometry(.54,.72,.15,2,.05),seatMat,x,y+.39,z+.26,g);mesh(new RoundedBoxGeometry(.45,.20,.14,2,.045),seatMat,x,y+.85,z+.26,g);box(.09,.48,.09,x,y-.3,z,dark,g);for(const side of [-1,1])mesh(new RoundedBoxGeometry(.045,.06,.48,2,.018),dark,x+side*.30,y+.25,z,g);}
 function tire(g,x,y,z){mesh(new THREE.CylinderGeometry(.32,.32,.22,16),rubber,x,y,z,g,[0,0,Math.PI/2]);box(.09,.7,.09,x,y+.45,z,steel,g);}
 function wing(g,span,chord,z,y,m){const sh=new THREE.Shape();sh.moveTo(-span/2,chord*.45);sh.lineTo(-span/2,-chord*.1);sh.lineTo(-1.2,-chord*.55);sh.lineTo(1.2,-chord*.55);sh.lineTo(span/2,-chord*.1);sh.lineTo(span/2,chord*.45);sh.closePath();mesh(new THREE.ExtrudeGeometry(sh,{depth:.17,bevelEnabled:false}),m,0,y,z,g,[Math.PI/2,0,0]);}
 for(const [i,x]of [-190,-130].entries()){
  const z=-377,g=new THREE.Group();g.position.set(x,0,z);g.name='Passenger plane '+(i+1)+' · 14 seats';root.add(g);
  const p={id:'plane-'+(i+1),name:'Passenger plane '+(i+1),x,z,seats:14,group:g,entry:{x:x+stairOuter+.45,z:z+doorZ},eye:{x:x+.40,y:cabinFloor+1.6,z:z+doorZ},exit:{x:x+stairOuter+.60,z:z+doorZ},stairs:{inner:stairInner,outer:stairOuter,z:doorZ,halfWidth:.58,count:stairCount,rise:(cabinFloor-apronY)/stairCount,run:stairRun,floor:cabinFloor,ground:apronY}};planes.push(p);aircraft.push(p);
  p.name='Zerconda Executive Jet '+(i+1);p.cabinSeats=[];p.pilotSeats=[{x:x-.55,z:z+7.68,kind:'pilot'},{x:x+.55,z:z+7.68,kind:'pilot'}];
  const body=executiveBodyMaterial(z),trim=new THREE.MeshStandardMaterial({color:0x173048,roughness:.35}),windowMat=new THREE.MeshPhysicalMaterial({color:0x94c3d2,transparent:true,opacity:.30,roughness:.08,metalness:.10,side:THREE.DoubleSide,depthWrite:false}),rx=1.65,ry=1.5,cy=3.0,y0=1.65,y1=4.15;
  // An oval-window cabin with 2.2m usable standing headroom and a clear central aisle.
  for(const side of [-1,1]){
   const shape=new THREE.Shape();shape.moveTo(-8,y0);shape.lineTo(8,y0);shape.lineTo(8,y1);shape.lineTo(-8,y1);shape.closePath();
   for(let row=0;row<8;row++){const zz=-5.8+row*1.45,hole=new THREE.Path();hole.absellipse(zz,3.17,.28,.36,0,Math.PI*2,true);shape.holes.push(hole);
    const points=[];for(let j=0;j<=40;j++){const t=j/40*Math.PI*2,y=3.17+Math.sin(t)*.36,z=zz+Math.cos(t)*.28,x=side*(rx*Math.sqrt(Math.max(0,1-((y-cy)/ry)**2))+.018);points.push(new THREE.Vector3(x,y,z));}mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),40,.024,5,false),steel,0,0,0,g);
    const verts=[];for(let j=0;j<40;j++){const aa=j/40*Math.PI*2,bb=(j+1)/40*Math.PI*2;for(const [dy,dz]of [[0,0],[Math.sin(aa)*.36,Math.cos(aa)*.28],[Math.sin(bb)*.36,Math.cos(bb)*.28]]){const y=3.17+dy;verts.push(side*(rx*Math.sqrt(Math.max(0,1-((y-cy)/ry)**2))+.009),y,zz+dz);}}const glassGeo=new THREE.BufferGeometry();glassGeo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));glassGeo.computeVertexNormals();mesh(glassGeo,windowMat,0,0,0,g);
   }
   if(side===1){const doorway=new THREE.Path();doorway.moveTo(doorZ-doorHalf,cabinFloor);doorway.lineTo(doorZ+doorHalf,cabinFloor);doorway.lineTo(doorZ+doorHalf,3.95);doorway.quadraticCurveTo(doorZ+doorHalf,4.05,doorZ+.48,4.05);doorway.lineTo(doorZ-.48,4.05);doorway.quadraticCurveTo(doorZ-doorHalf,4.05,doorZ-doorHalf,3.95);doorway.closePath();shape.holes.push(doorway);}
   const geo=subdivideSurface(new THREE.ShapeGeometry(shape,16)),pos=geo.attributes.position;for(let j=0;j<pos.count;j++){const z=pos.getX(j),y=pos.getY(j);pos.setXYZ(j,side*rx*Math.sqrt(Math.max(0,1-((y-cy)/ry)**2)),y,z);}const smooth=mergeVertices(geo,1e-5);smooth.computeVertexNormals();geo.dispose();mesh(smooth,body,0,0,0,g);
  }
  const angles=Array.from({length:65},(_,k)=>k/64*Math.PI*2);for(const y of [y0,y1]){const t=Math.asin((y-cy)/ry);for(const a of [t<0?t+Math.PI*2:t,Math.PI-t])angles.push(a);}angles.sort((a,b)=>a-b);const verts=[];
  for(let j=0;j<angles.length-1;j++){const a=angles[j],b=angles[j+1],y=cy+Math.sin((a+b)/2)*ry;if(y>y0&&y<y1)continue;for(const [t,z]of [[a,-8],[b,-8],[a,8],[a,8],[b,-8],[b,8]])verts.push(Math.cos(t)*rx,cy+Math.sin(t)*ry,z);}const shell=new THREE.BufferGeometry();shell.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));shell.computeVertexNormals();mesh(shell,body,0,0,0,g);
  addExecutiveJetExterior(g,body);p.cockpitDoor=createCockpitDoor(g);
  box(2.0,.13,15.5,0,cabinFloor-.065,0,cream,g);box(1.4,.05,13.0,0,4.01,0,cream,g);
  for(let row=0;row<7;row++)for(const side of [-1,1]){createExecutiveSeat(g,side*.98,cabinFloor+.40,-5.4+row*1.5);p.cabinSeats.push({x:x+side*.98,z:z-5.4+row*1.5});}
  for(const side of [-1,1]){if(side<0)box(.025,.13,15.7,side*1.64,2.45,0,trim,g);else{box(.025,.13,13.75,1.64,2.45,-1.125,trim,g);box(.025,.13,.7,1.64,2.45,7.5,trim,g);}}
  p.cabinLights=[];for(const zz of [-4,2]){const light=new THREE.PointLight(0xffefd8,2.3,8);light.position.set(0,3.80,zz);light.visible=false;g.add(light);p.cabinLights.push(light);}
   // Fold-down airstair: 18cm risers, full-width anti-slip treads, and continuous handrails.
  const boarding=new THREE.Group();boarding.name='Open passenger doorway and grounded airstairs';g.add(boarding);
  const tread=mat(0x344148,.9),carpet=mat(0x801e37,.95),rim=mat(0xd4d9d7,.32);
  function rail(a,b,r=.025,m=steel){const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),o=mesh(new THREE.CylinderGeometry(r,r,from.distanceTo(to),10),m,0,0,0,boarding);o.position.copy(from).add(to).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),to.sub(from).normalize());return o;}
  box(.65,.08,1.20,1.375,cabinFloor-.04,doorZ,steel,boarding);
  // Recessed cream jambs join the curved fuselage to the rectangular doorway.
  for(const side of [-1,1]){box(.40,2.20,.065,1.42,2.90,doorZ+side*.615,rim,boarding);rail([1.63,cabinFloor,doorZ+side*.615],[1.63,4.02,doorZ+side*.615],.026,rim);}
  box(.68,.08,1.30,1.30,4.03,doorZ,white,boarding);
  box(.55,.035,.75,.15,3.98,doorZ,new THREE.MeshBasicMaterial({color:0xffecd2}),boarding);
  for(let j=0;j<stairCount;j++){const top=apronY+(stairCount-j)*(cabinFloor-apronY)/stairCount,x=stairInner+(j+.5)*stairRun;
   const step=box(stairRun,.075,1.16,x,top-.0375,doorZ,white,boarding);step.name='Airstair tread '+(j+1);step.userData.walkTop=top;
   box(stairRun-.045,.012,1.04,x,top+.006,doorZ,tread,boarding);
   box(.045,.022,1.17,x+stairRun/2-.0225,top,doorZ,rim,boarding);
   box(.045,(cabinFloor-apronY)/stairCount,1.16,x+stairRun/2-.0225,top-(cabinFloor-apronY)/stairCount/2,doorZ,white,boarding);
  }
  for(const side of [-1,1]){const zz=doorZ+side*.64;
   rail([1.63,cabinFloor+.88,zz],[stairOuter,apronY+.88,zz],.032);
   rail([1.55,cabinFloor-.14,zz],[stairOuter-.05,apronY+.035,zz],.065,white);
   for(const j of [0,3,7]){const x=stairInner+(j+.5)*stairRun,h=apronY+(stairCount-j)*(cabinFloor-apronY)/stairCount;rail([x,h,zz],[x,h+.80,zz],.023);}
  }
  box(.18,.18,1.20,stairOuter-.12,apronY+.09,doorZ,steel,boarding);
  box(2.9,.025,1.35,stairOuter+1.48,apronY+.0125,doorZ,carpet,boarding);
  // A restrained red-carpet approach, with rope posts kept clear of the stair entrance.
  for(const side of [-1,1]){const zz=doorZ+side*1.02;for(const xx of [stairOuter+.6,stairOuter+2.65]){mesh(new THREE.CylinderGeometry(.14,.19,.035,16),steel,xx,apronY+.0175,zz,boarding);rail([xx,apronY,zz],[xx,apronY+.84,zz],.028);sphere(xx,apronY+.86,zz,.065,.065,.065,steel,boarding);}const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(stairOuter+.6,apronY+.78,zz),new THREE.Vector3(stairOuter+1.625,apronY+.60,zz),new THREE.Vector3(stairOuter+2.65,apronY+.78,zz)]);mesh(new THREE.TubeGeometry(curve,16,.035,8,false),carpet,0,0,0,boarding);}
  p.boardingGroup=boarding;
   label('ZC · '+(i+1)+' · 14 PASSENGERS',x,1.0,z+13.5,8,.8);box(.09,.9,.09,x,.45,z+13.5,dark);
 }
 for(const [i,x]of [20,60].entries()){
  const z=-352;const pad=mesh(new THREE.CylinderGeometry(12.5,12.5,.06,64),mat(0x566466),x,.13,z);const ring=new THREE.Mesh(new THREE.RingGeometry(10.7,11.05,64),new THREE.MeshBasicMaterial({color:0xe7dca8,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(x,.19,z);root.add(ring);box(.4,.01,7,x-2,.2,z,white);box(.4,.01,7,x+2,.2,z,white);box(4.4,.01,.4,x,.129,z,white);
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
 const visitorEntrance=createAirportEntrance(root,{getPlayer});
 function action(id,text,target,fn,priority=120){const b=document.createElement('button');b.style.display='none';document.body.appendChild(b);b.onclick=fn;registerTownAction(b,{id:'airfield-'+id,label:text,priority,target});sources.push({b,id});return b;}
 for(const a of aircraft){a.button=action(a.id,`Board ${a.name} · ${a.seats} seats`,()=>({...a.entry,y:1.4}),()=>{if(boarded||!canUse())return;boarded=a;const p=getPlayer();p.x=a.eye.x;p.z=a.eye.z;onTeleport(p.x,a.eye.y-1.6,p.z,Math.PI);onMessage(a.id.startsWith('plane')?'Welcome aboard. You can stand and walk along the aisle, sit in a cabin seat, or choose Leave aircraft.':a.name+' · Parked cabin view. Drag to look; tap Leave aircraft to step outside.');});}
 const seatAction=action('seat',()=>seated?(seated.kind==='pilot'?'Stand in cockpit':'Stand in cabin'):(boarded?.id.startsWith('plane')&&getPlayer().z-boarded.z>7.1?'Sit in pilot seat':'Sit in cabin seat'),()=>({...getPlayer(),y:cabinFloor+1.2}),()=>{if(!boarded?.id.startsWith('plane'))return;if(seated){stand();return;}const p=getPlayer(),nearest=[...boarded.cabinSeats,...(boarded.pilotSeats||[])].filter(s=>boarded.cockpitDoor.passable||(p.z-boarded.z>6.95?s.kind==='pilot':s.kind!=='pilot')).sort((a,b)=>Math.hypot(p.x-a.x,p.z-a.z)-Math.hypot(p.x-b.x,p.z-b.z))[0];if(!nearest||Math.hypot(p.x-nearest.x,p.z-nearest.z)>2){onMessage('Walk closer to a passenger seat first.');return;}seated=nearest;p.x=nearest.x;p.z=nearest.z;if(nearest.kind==='pilot')onTeleport(p.x,cabinFloor+.25,p.z,0);});
 function stand(){if(!seated||!boarded)return;getPlayer().x=boarded.x;getPlayer().z=seated.z;seated=null;}
 const cockpitDoorAction=action('cockpit-door',()=>boarded?.cockpitDoor?.open?'Close cockpit door':'Open cockpit door',()=>({x:boarded?.x||0,z:(boarded?.z||0)+6.95,y:2.9}),()=>{if(!boarded?.cockpitDoor||seated)return;const p=getPlayer();if(Math.hypot(p.x-boarded.x,p.z-boarded.z-6.95)>2)return;if(boarded.cockpitDoor.open&&Math.abs(p.z-boarded.z-6.95)<.3){onMessage('Step clear of the doorway before closing it.');return;}boarded.cockpitDoor.setOpen(!boarded.cockpitDoor.open);},145);
 const leave=action('leave','Leave aircraft',()=>({...getPlayer(),y:boarded?boarded.eye.y:1.4}),()=>exit(),180);
 function exit(){if(!boarded)return;const a=boarded;a.cockpitDoor?.setOpen(false,true);boarded=null;seated=null;const p=getPlayer();p.x=a.exit.x;p.z=a.exit.z;onTeleport(p.x,.12,p.z,Math.PI);}
 function update(dt=.05){visitorEntrance.update(dt);for(const p of planes)p.cockpitDoor.update(dt);cockpitDoorAction.style.display=boarded?.cockpitDoor&&!seated&&Math.hypot(getPlayer().x-boarded.x,getPlayer().z-boarded.z-6.95)<2?'block':'none';cockpitDoorAction.textContent=boarded?.cockpitDoor?.open?'Close cockpit door':'Open cockpit door';for(const p of planes)for(const light of p.cabinLights)light.visible=boarded===p;seatAction.style.display=boarded?.id.startsWith('plane')?'block':'none';seatAction.textContent=seated?(seated.kind==='pilot'?'Stand in cockpit':'Stand in cabin'):(boarded?.id.startsWith('plane')&&getPlayer().z-boarded.z>7.1?'Sit in pilot seat':'Sit in cabin seat');for(const a of aircraft)a.button.style.display=!boarded&&canUse()&&Math.hypot(getPlayer().x-a.entry.x,getPlayer().z-a.entry.z)<4.0?'block':'none';leave.style.display=boarded?'block':'none';}
 function blocks(x,z){if(z>=-285)return false;if(hangars.some(h=>Math.abs(x-h.x)<20.4&&Math.abs(z-h.z)<18.4&&(Math.abs(x-h.x)>19.4||z>h.z+17.3||z<h.z-17.3&&Math.abs(x-h.x)>15.5)))return true;return aircraft.some(a=>{if(!a.id.startsWith('plane'))return Math.hypot(x-a.x,z-a.z)<2.3;const lx=x-a.x,lz=z-a.z;if(lx>.15&&lx<stairOuter+.3&&Math.abs(lz-doorZ)<.44)return false;return Math.abs(lx)<1.8&&Math.abs(lz)<9.2;});}
 for(const [m,geos]of parts){const g=mergeGeometries(geos,false),o=new THREE.Mesh(g,m);o.receiveShadow=true;o.castShadow=m!==grass&&m!==asphalt;root.add(o);for(const a of geos)a.dispose();}
 return {root,visitorEntrance,hangars,planes,helicopters,exit,update,blocks,stand,get seated(){return !!seated;},get walkingCabin(){return !!boarded?.id.startsWith('plane');},get controlsLocked(){return !!boarded&&(!boarded.id.startsWith('plane')||!!seated);},contains(wx,wz){if(!boarded?.id.startsWith('plane'))return false;const px=wx-boarded.x,pz=wz-boarded.z;if(!boarded.cockpitDoor.passable&&Math.abs(pz-6.95)<.20)return false;return Math.abs(px)<.46&&pz> -6.2&&pz<8.05||px>=0&&px<1.7&&Math.abs(pz-doorZ)<.43;},heightAt:(x,z)=>{if(boarded)return boarded.id.startsWith('plane')?cabinFloor+THREE.MathUtils.smoothstep(z-boarded.z,6.55,7.15)*.25:boarded.eye.y-1.6;for(const p of planes){const lx=x-p.x,lz=z-p.z;if(Math.abs(lz-doorZ)<.55){if(lx>=.15&&lx<=stairInner)return cabinFloor;if(lx>stairInner&&lx<=stairOuter){const j=Math.min(stairCount-1,Math.floor((lx-stairInner)/stairRun));return apronY+(stairCount-j)*(cabinFloor-apronY)/stairCount+.012;}if(lx>stairOuter&&lx<stairOuter+2.93)return apronY+.025;}}if(x<=-275||x>=569||z<=-529||z>=-285)return null;if(hangars.some(h=>Math.abs(x-h.x)<20&&Math.abs(z-h.z)<18))return .16;if(helicopters.some(h=>Math.hypot(x-h.x,z-h.z)<12.5))return .16;if(Math.abs(x+49)<8.5&&Math.abs(z+317)<5)return .14;if(Math.abs(x+96)<12&&z>=-313&&z<=-309)return .02+(-309-z)/4*.10;if(Math.abs(x+96)<12&&z>-309&&z< -285)return .02;const paved=z> -466&&z< -438&&x> -235&&x<495||z> -411.5&&z< -398.5&&x> -233&&x<493||x> -228&&x<96&&z> -398.5&&z< -309||[-213,473].some(cx=>Math.abs(x-cx)<6.5&&Math.abs(z+428.5)<23.5);return paved?.12:-.08;},updateCamera(camera){if(boarded){const p=getPlayer();camera.position.set(boarded.id.startsWith('plane')?p.x:boarded.eye.x,boarded.id.startsWith('plane')?seated?.kind==='pilot'?3.71:cabinFloor+(seated?1.08:1.62)+(!seated?THREE.MathUtils.smoothstep(p.z-boarded.z,6.55,7.15)*.25:0):boarded.eye.y,boarded.id.startsWith('plane')?p.z:boarded.eye.z);}},get boarded(){return !!boarded;}};
}
