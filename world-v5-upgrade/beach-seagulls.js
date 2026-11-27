import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Small original articulated gulls; all routes remain over the authored beach.
const colors={white:0xf0f0e8,gray:0x919ca7,black:0x26303b,yellow:0xdfaa29,red:0xa93b29};
function model(){
 const root=new THREE.Group(),parts=new Map(),wings=[],legs=new THREE.Group();
 const materials=Object.fromEntries(Object.entries(colors).map(([k,color])=>[k,new THREE.MeshStandardMaterial({color,roughness:.83})]));
 function add(parent,key,geometry,position=[0,0,0],scale=[1,1,1],rotation=[0,0,0]){const mesh=new THREE.Mesh(geometry);mesh.position.set(...position);mesh.scale.set(...scale);mesh.rotation.set(...rotation);mesh.updateMatrix();const g=geometry.clone().applyMatrix4(mesh.matrix);geometry.dispose();let bucket=parts.get(parent);if(!bucket)parts.set(parent,bucket={});(bucket[key]??=[]).push(g);}
 function oval(parent,key,p,s,r){add(parent,key,new THREE.SphereGeometry(1,20,12),p,s,r);}
 oval(root,'white',[0,.245,0],[.135,.14,.305]);oval(root,'gray',[0,.315,-.09],[.132,.095,.24]);
 oval(root,'white',[0,.4,.17],[.075,.145,.095],[.24,0,0]);oval(root,'white',[0,.505,.24],[.081,.086,.105]);
 // Eye rings, dark pupils and tiny white highlights on both sides.
 for(const s of[-1,1]){oval(root,'yellow',[s*.074,.525,.277],[.007,.014,.015]);oval(root,'black',[s*.080,.525,.281],[.004,.009,.010]);oval(root,'white',[s*.083,.529,.284],[.0015,.003,.003]);}
 add(root,'yellow',new THREE.ConeGeometry(.027,.15,12),[0,.496,.397],[1,1,.75],[Math.PI/2,0,0]);
 oval(root,'yellow',[0,.481,.37],[.032,.018,.085]);oval(root,'black',[0,.491,.408],[.032,.002,.06]);oval(root,'red',[.025,.474,.404],[.006,.01,.016]);
 for(let i=-2;i<=2;i++){oval(root,'white',[i*.025,.26,-.32],[.026,.015,.12],[.05,i*.1,0]);oval(root,'gray',[i*.025,.275,-.32],[.023,.006,.105],[.05,i*.1,0]);}
 for(const side of[-1,1]){
  const wing=new THREE.Group();wing.position.set(side*.095,.33,-.035);root.add(wing);wings.push(wing);
  // Overlapping feather vanes follow a tapered wing, with dark primary tips.
  oval(wing,'gray',[side*.19,0,-.04],[.27,.025,.115],[0,side*.17,0]);
  for(let i=0;i<9;i++){const t=i/8;oval(wing,i>4?'black':'gray',[side*(.13+t*.43),-.006,-.09-t*.1],[.115-t*.045,.012,.041],[0,side*(-.2-t*.5),0]);if(i>5)oval(wing,'white',[side*(.22+t*.43),-.004,-.06-t*.1],[.016,.003,.018],[0,side*(-.2-t*.5),0]);}
 }
 root.add(legs);
 for(const side of[-1,1]){const x=side*.058;add(legs,'yellow',new THREE.CylinderGeometry(.008,.009,.17,7),[x,.12,.01]);for(let i=-1;i<=1;i++)oval(legs,'yellow',[x+i*.02,.035,.045],[.007,.005,.038],[0,i*.34,0]);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([x-.025,.033,.061,x+.025,.033,.061,x,.033,.005],3));g.setAttribute('uv',new THREE.Float32BufferAttribute([0,1,1,1,.5,0],2));g.setIndex([0,2,1]);g.computeVertexNormals();add(legs,'yellow',g);}
 for(const[parent,bucket]of parts)for(const[key,geos]of Object.entries(bucket)){const geometry=mergeGeometries(geos),mesh=new THREE.Mesh(geometry,materials[key]);mesh.castShadow=false;parent.add(mesh);for(const g of geos)g.dispose();}
 root.name='Beach seagull · white and gray, yellow beak and feet';
 return{root,wings,legs,pose(flight,time,landing=0){for(let i=0;i<2;i++){const side=i?1:-1;wings[i].rotation.set(0,side*(1-flight)*1.27,side*((1-flight)*.12+flight*(Math.sin(time*7.4)*.31+.1+landing*.5)));wings[i].scale.setScalar(1);}legs.visible=flight<.85;legs.position.y=-flight*.065;legs.rotation.x=flight*-.65;}};
}
export function createBeachSeagulls(parent,{palms=[],random=Math.random,count=6}={}){
 const root=new THREE.Group();root.name='Beach seagulls · random flight and tree rests';parent.add(root);
 const perches=palms.map(p=>new THREE.Vector3(p.x,p.root.position.y+p.height*.875,p.z));
 const birds=[],occupied=new Map(),pick=items=>items[Math.floor(random()*items.length)],clamp=(v,a,b)=>Math.max(a,Math.min(b,v));let time=0;
 if(perches.length<2)return{root,birds,perches,update(){}};
 function destination(b){const available=perches.map((p,i)=>({p,i})).filter(x=>x.i!==b.perch&&!occupied.has(x.i)&&Math.abs(x.p.x-b.home)<85);return pick(available.length?available:perches.map((p,i)=>({p,i})).filter(x=>!occupied.has(x.i)));}
 function depart(b){const target=destination(b);if(!target){b.wait=5;return;}occupied.delete(b.perch);occupied.set(target.i,b);b.from=b.model.root.position.clone();b.to=target.p.clone();b.perch=target.i;b.elapsed=0;b.duration=14+random()*14;b.phase='flying';const dx=b.to.x-b.from.x,dz=b.to.z-b.from.z;const sideways=(random()-.5)*16;
  b.curve=new THREE.CubicBezierCurve3(b.from,new THREE.Vector3(b.from.x+dx*.25+sideways,Math.max(b.from.y,b.to.y)+4+random()*3,clamp(b.from.z+dz*.25+8,195,238)),new THREE.Vector3(b.from.x+dx*.75-sideways,Math.max(b.from.y,b.to.y)+3+random()*3,clamp(b.from.z+dz*.75+8,195,238)),b.to);
 }
 for(let i=0;i<Math.min(count,perches.length);i++){const home=-270+i*120;const choices=perches.map((p,i)=>({p,i})).filter(x=>!occupied.has(x.i)).sort((a,b)=>Math.abs(a.p.x-home)-Math.abs(b.p.x-home));const chosen=choices[Math.floor(random()*Math.min(3,choices.length))],m=model();root.add(m.root);m.root.position.copy(chosen.p);m.root.rotation.y=random()*Math.PI*2;m.root.userData.dynamicScenery=true;const b={model:m,home:chosen.p.x,perch:chosen.i,phase:'resting',wait:3+random()*28,elapsed:0,speed:.88+random()*.24,offset:random()*10};birds.push(b);occupied.set(chosen.i,b);m.pose(0,0);if(i%2===0)depart(b);}
 return{root,birds,perches,update(dt=.016){dt=clamp(dt,0,.15);time+=dt;for(const b of birds){if(b.phase==='resting'){b.wait-=dt;b.model.pose(0,time+b.offset);if(b.wait<=0)depart(b);continue;}b.elapsed+=dt;const t=clamp(b.elapsed/b.duration,0,1),p=b.curve.getPoint(t),tangent=b.curve.getTangent(t);b.model.root.position.copy(p);b.model.root.rotation.set(-Math.atan2(tangent.y,Math.hypot(tangent.x,tangent.z))*.3,Math.atan2(tangent.x,tangent.z),Math.sin(time*.6+b.offset)*.045*Math.sin(t*Math.PI));const blend=Math.min(1,t*9,(1-t)*9);b.model.pose(blend,(time+b.offset)*b.speed,t>.85?1:0);if(t>=1){b.phase='resting';b.wait=14+random()*38;b.model.root.position.copy(b.to);b.model.root.rotation.x=b.model.root.rotation.z=0;b.model.pose(0,time);}}}};
}
