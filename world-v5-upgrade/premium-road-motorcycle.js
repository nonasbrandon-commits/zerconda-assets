import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
let shared;const paints=new Map();
function materials(){
 if(shared)return shared;
 const faces=Array.from({length:6},(_,i)=>{const c=document.createElement('canvas');c.width=c.height=128;const a=c.getContext('2d');const g=a.createLinearGradient(0,0,128,128);g.addColorStop(0,'#252c36');g.addColorStop(.28,'#e3e9ed');g.addColorStop(.42,'#8b959e');g.addColorStop(.56,'#27313d');g.addColorStop(1,'#646c72');a.fillStyle=g;a.fillRect(0,0,128,128);if(i!==3){a.fillStyle='#ffffff';a.fillRect(16,8,6,99);a.fillStyle='#d6dde5';a.fillRect(89,0,13,110);}return c;});const env=new THREE.CubeTexture(faces);env.colorSpace=THREE.SRGBColorSpace;env.needsUpdate=true;
 const c=document.createElement('canvas');c.width=1024;c.height=256;const a=c.getContext('2d');a.fillStyle='#7b7b7b';a.fillRect(0,0,1024,256);for(let i=0;i<32;i++){const x=i*32;for(const side of[-1,1]){a.strokeStyle='#303030';a.lineWidth=4;a.beginPath();a.moveTo(x,128+side*12);a.bezierCurveTo(x+5,128+side*38,x+22,128+side*73,x+27,128+side*101);a.stroke();a.strokeStyle='#999999';a.lineWidth=1;a.stroke();}}const tread=new THREE.CanvasTexture(c);tread.wrapS=tread.wrapT=THREE.RepeatWrapping;tread.anisotropy=8;
 const M=(color,roughness,metalness)=>new THREE.MeshStandardMaterial({color,roughness,metalness,envMap:env,envMapIntensity:.55});
 shared={env,tread:M('#080a0c',.92,0),black:M('#13171b',.34,.5),engine:M('#32373b',.38,.7),metal:M('#b6bcc1',.23,.88),disc:M('#91979a',.38,.85),rubber:new THREE.MeshStandardMaterial({color:'#181a1c',roughness:.8,bumpMap:tread,bumpScale:.007}),seat:M('#232427',.83,.05),white:new THREE.MeshStandardMaterial({color:'#e9f9ff',emissive:'#bceaff',emissiveIntensity:1.6}),red:new THREE.MeshStandardMaterial({color:'#ff2c23',emissive:'#ff0b00',emissiveIntensity:1.4}),amber:new THREE.MeshStandardMaterial({color:'#ff951e',emissive:'#ff6400',emissiveIntensity:.5})};return shared;
}
export function createPremiumRoadMotorcycle(color='#c71928'){
 const g=new THREE.Group();g.name='Detailed naked road motorcycle';g.userData.premiumMotorcycle=true;const m=materials();
 if(!paints.has(color))paints.set(color,new THREE.MeshPhysicalMaterial({color,metalness:.48,roughness:.2,clearcoat:1,clearcoatRoughness:.12,envMap:m.env,envMapIntensity:.85}));const paint=paints.get(color);
 const mesh=(geo,mat,x=0,y=0,z=0,parent=g)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
 const box=(w,h,d,x,y,z,mat,r=.01)=>mesh(r?new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/3,h/3,d/3)):new THREE.BoxGeometry(w,h,d),mat,x,y,z);
 const beam=(a,b,r,mat=m.black,n=12)=>{const p=V(...a),q=V(...b),delta=q.clone().sub(p),o=mesh(new THREE.CylinderGeometry(r,r,delta.length(),n),mat);o.position.copy(p.add(q).multiplyScalar(.5));o.quaternion.setFromUnitVectors(V(0,1,0),delta.normalize());return o;};
 const tube=(points,r,mat=m.black)=>mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>V(...p))),28,r,8,false),mat);
 const axle=(x,y,z,r,h,mat)=>{const o=mesh(new THREE.CylinderGeometry(r,r,h,32),mat,x,y,z);o.rotation.z=Math.PI/2;return o;};
 // Lofted body shells keep a sculpted silhouette from every viewing angle.
 function shell(sections,mat){const positions=[],uv=[],indices=[],N=16;for(let j=0;j<sections.length;j++){const [z,y,w,h]=sections[j];for(let i=0;i<=N;i++){const t=i/N*Math.PI*2;positions.push(Math.sin(t)*w,y+Math.cos(t)*h,z);uv.push(i/N,j/(sections.length-1));if(j<sections.length-1&&i<N){const a=j*(N+1)+i;indices.push(a,a+N+1,a+1,a+1,a+N+1,a+N+2);}}}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();return mesh(geo,mat);}
 function disc(x,z,r){const shape=new THREE.Shape();shape.absarc(0,0,r,0,Math.PI*2,false);const center=new THREE.Path();center.absarc(0,0,r*.56,0,Math.PI*2,true);shape.holes.push(center);for(let i=0;i<24;i++){const a=i/24*Math.PI*2,p=new THREE.Path();p.absarc(Math.cos(a)*r*.81,Math.sin(a)*r*.81,.009,0,Math.PI*2,true);shape.holes.push(p);}const o=mesh(new THREE.ExtrudeGeometry(shape,{depth:.008,bevelEnabled:false,curveSegments:5}),m.disc,x,.365,z);o.rotation.y=Math.PI/2;return o;}
 function wheel(z,width,front){const wheelGroup=new THREE.Group();wheelGroup.position.set(0,.365,z);g.add(wheelGroup);const profile=[new THREE.Vector2(.235,-width*.44),new THREE.Vector2(.285,-width*.51),new THREE.Vector2(.337,-width*.40),new THREE.Vector2(.360,-width*.20),new THREE.Vector2(.365,0),new THREE.Vector2(.360,width*.20),new THREE.Vector2(.337,width*.40),new THREE.Vector2(.285,width*.51),new THREE.Vector2(.235,width*.44)];const tire=mesh(new THREE.LatheGeometry(profile,96),m.rubber,0,0,0,wheelGroup);tire.rotation.z=Math.PI/2;
 for(const side of[-1,1]){const x=side*width*.43;const rim=mesh(new THREE.TorusGeometry(.251,.014,8,64),m.black,x,0,0,wheelGroup);rim.rotation.y=Math.PI/2;const edge=mesh(new THREE.TorusGeometry(.256,.004,6,64),m.metal,x+side*.004,0,0,wheelGroup);edge.rotation.y=Math.PI/2;for(let i=0;i<5;i++){const a=i*Math.PI*2/5;for(const branch of[-1,1]){const a0=a+branch*.11,a1=a+branch*.22;const spoke=new THREE.Mesh(new THREE.CylinderGeometry(.010,.014,.19,8),m.black);const from=V(x,Math.cos(a0)*.07,Math.sin(a0)*.07),to=V(x,Math.cos(a1)*.25,Math.sin(a1)*.25),delta=to.clone().sub(from);spoke.scale.y=delta.length()/.19;spoke.position.copy(from.add(to).multiplyScalar(.5));spoke.quaternion.setFromUnitVectors(V(0,1,0),delta.normalize());wheelGroup.add(spoke);}}}
 for(let k=0;k<32;k++)for(const side of[-1,1]){const points=[];for(let j=0;j<=7;j++){const t=.10+j/7*.84,a=k/32*Math.PI*2+.13*t+.05*t*t,r=.365-.029*t*t;points.push([side*width*.46*t,.365+Math.cos(a)*r,z+Math.sin(a)*r]);}tube(points,.0017,m.tread);}
 axle(0,.365,z,.06,width+.06,m.engine);disc(width*.51,z,front?.225:.195);if(front)disc(-width*.51-.008,z,.225);for(const side of front?[-1,1]:[1]){box(.055,.115,.068,side*(width*.53+.015),.45,z-.17,m.engine,.013);for(const y of[.422,.475])axle(side*(width*.53+.046),y,z-.17,.014,.008,m.metal);}
 }
 wheel(.90,.18,true);wheel(-.84,.235,false);
 // Main frame, rear swingarm and visible suspension spring.
 for(const side of[-1,1]){beam([side*.12,.37,-.84],[side*.17,.55,-.12],.035);beam([side*.17,.55,-.12],[side*.16,1.03,.49],.028);beam([side*.16,1.03,.49],[side*.18,.86,-.57],.027);beam([side*.18,.86,-.57],[side*.14,.49,-.12],.024);beam([side*.18,.86,-.57],[side*.13,.92,-.94],.023);}
 beam([0,.43,-.68],[0,.91,-.36],.026,m.metal);const spring=[];for(let i=0;i<=150;i++){const t=i/150,a=t*11*Math.PI*2;spring.push([Math.cos(a)*.051,.49+t*.35,-.63+t*.22+Math.sin(a)*.051]);}tube(spring,.009,m.metal);
 // Liquid-cooled engine, separate cases, fins, bolts, radiator and headers.
 box(.31,.29,.34,0,.55,-.06,m.engine,.055);for(const side of[-1,1]){axle(side*.205,.52,-.12,.135,.075,m.engine);axle(side*.246,.52,-.12,.104,.012,m.black);for(let i=0;i<8;i++){const a=i*Math.PI/4;axle(side*.254,.52+Math.cos(a)*.12,-.12+Math.sin(a)*.12,.008,.012,m.metal);}for(let i=0;i<6;i++)box(.035,.022,.29,side*.198,.67+i*.038,.07,m.metal,.003);}
 const radiator=box(.36,.40,.065,0,.67,.40,m.black,.018);radiator.rotation.x=-.10;for(let i=0;i<13;i++)box(.31,.012,.015,0,.49+i*.029,.444,m.engine,.002);
 for(const side of[-1,1])tube([[side*.09,.73,.29],[side*.09,.50,.40],[side*.10,.27,.19],[.19,.25,-.25]],.023,m.metal);
 box(.33,.10,.44,0,.28,-.03,m.black,.02);
 // Tank, stepped stitched seat, tail cowl and side shrouds.
 shell([[-.34,.96,.035,.06],[-.24,1.025,.19,.13],[.02,1.105,.255,.16],[.34,1.11,.235,.16],[.53,1.06,.14,.09],[.58,1.04,.025,.025]],paint);
 shell([[-1.08,.98,.025,.035],[-.95,1.02,.18,.065],[-.73,1.025,.20,.075],[-.44,.98,.18,.065],[-.23,.98,.11,.045]],m.seat);
 shell([[-1.16,.93,.025,.025],[-1.04,.96,.19,.06],[-.77,.95,.22,.07],[-.60,.91,.15,.04]],paint);
 for(const side of[-1,1]){tube([[side*.145,1.066,-.97],[side*.18,1.093,-.77],[side*.155,1.045,-.47],[side*.115,1.032,-.30]],.0025,paint);
  const shroud=box(.055,.22,.34,side*.245,.87,.23,m.black,.025);shroud.rotation.x=.15;
  for(let k=0;k<4;k++)box(.030,.018,.25,side*.282,.79+k*.044,.22,m.metal,.003);
  tube([[side*.285,1.01,.35],[side*.29,.986,.30],[side*.29,.986,.12]],.009,m.white);
  beam([side*.18,.42,-.28],[side*.31,.42,-.28],.018,m.metal);box(.12,.025,.055,side*.30,.42,-.28,m.black,.008);
 }
 const fuel=mesh(new THREE.CylinderGeometry(.051,.051,.009,24),m.engine,0,1.272,.15);mesh(new THREE.CylinderGeometry(.031,.031,.011,16),m.metal,0,1.278,.15);
 // Inverted fork legs, curved front fender and rear hugger.
 for(const side of[-1,1]){beam([side*.115,.37,.90],[side*.115,1.04,.58],.035,m.black);beam([side*.115,.40,.885],[side*.115,.71,.737],.024,m.metal);box(.018,.12,.035,side*.153,.56,.81,m.amber,.004);}
 function fender(z,width,mat,back=false){const positions=[],uv=[],indices=[],N=28;for(let j=0;j<=N;j++){const a=(back?-.4:-.58)+j/N*(back?1.6:1.7);for(const side of[-1,1]){positions.push(side*width,.365+Math.cos(a)*.398,z+Math.sin(a)*.398);uv.push((side+1)/2,j/N);}if(j<N){const i=j*2;indices.push(i,i+2,i+1,i+1,i+2,i+3);}}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();const copy=mat.clone();copy.side=THREE.DoubleSide;mesh(geo,copy);}
 fender(.90,.115,paint);fender(-.84,.137,m.black,true);
 // Angular LED headlight: layered bezel, lens and individual diodes.
 const bezel=box(.34,.235,.10,0,1.05,.73,paint,.055);bezel.rotation.x=-.12;box(.293,.178,.042,0,1.055,.792,m.black,.045);box(.246,.120,.014,0,1.06,.819,m.metal,.026);for(const y of[1.025,1.096])for(const x of[-.085,-.043,0,.043,.085])box(.027,.025,.012,x,y,.830,m.white,.006);tube([[-.112,1.115,.835],[.112,1.115,.835],[.126,1.085,.835],[.10,1.005,.835],[-.10,1.005,.835],[-.126,1.085,.835],[-.112,1.115,.835]],.006,m.white);
 box(.295,.035,.035,0,.961,-1.145,m.red,.012);
 // Swept handlebars, brake levers, rubber grips, mirrors and TFT instrument.
 tube([[-.39,1.205,.53],[-.24,1.215,.51],[-.12,1.15,.55],[.12,1.15,.55],[.24,1.215,.51],[.39,1.205,.53]],.017,m.black);
 for(const side of[-1,1]){beam([side*.27,1.215,.52],[side*.41,1.205,.53],.025,m.rubber);for(let k=0;k<7;k++)beam([side*(.28+k*.017),1.216,.52],[side*(.28+k*.017),1.216,.54],.026,m.rubber);tube([[side*.29,1.21,.55],[side*.35,1.20,.60],[side*.43,1.20,.60]],.008,m.metal);beam([side*.29,1.22,.52],[side*.43,1.40,.54],.011,m.black);const mirror=box(.17,.085,.055,side*.45,1.42,.54,m.black,.025);mirror.rotation.z=side*.14;const face=box(.142,.062,.007,side*.45,1.42,.507,m.metal,.016);face.rotation.z=side*.14;}
 const dash=box(.165,.105,.04,0,1.19,.60,m.black,.015);dash.rotation.x=-.6;const screen=box(.130,.070,.006,0,1.20,.575,m.engine,.008);screen.rotation.x=-.6;box(.05,.018,.008,-.025,1.212,.570,m.white,.002);
 // Separate tapered metal muffler, outlet, clamp and mounting straps.
 tube([[.18,.26,-.23],[.28,.29,-.51],[.31,.35,-.75]],.035,m.metal);const from=V(.31,.35,-.64),to=V(.34,.48,-1.10),delta=to.clone().sub(from);const silencer=mesh(new THREE.CylinderGeometry(.082,.105,delta.length(),40),m.metal);silencer.position.copy(from.clone().add(to).multiplyScalar(.5));silencer.quaternion.setFromUnitVectors(V(0,1,0),delta.normalize());const outlet=mesh(new THREE.CylinderGeometry(.064,.064,.035,32),m.black);outlet.position.copy(to);outlet.quaternion.copy(silencer.quaternion);const opening=mesh(new THREE.CircleGeometry(.045,32),m.black);opening.position.copy(to.clone().addScaledVector(delta.clone().normalize(),.019));opening.quaternion.setFromUnitVectors(V(0,0,1),delta.clone().normalize());for(const t of[.25,.77]){const clamp=mesh(new THREE.TorusGeometry(.101,.006,6,32),m.engine);clamp.position.copy(from.clone().lerp(to,t));clamp.quaternion.setFromUnitVectors(V(0,0,1),delta.clone().normalize());}
 tube([[-.15,.80,-.36],[-.18,.56,-.70],[-.14,.38,-.84]],.012,m.engine);
 g.userData.paint=color;g.userData.detail='Sculpted body, treaded tires, split alloy spokes, perforated brake discs, engine cases and fins, exhaust, stitched seat, LED lamps, TFT and mirrors';return g;
}
