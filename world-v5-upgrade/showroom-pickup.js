import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
let studio;
function reflection(){if(studio)return studio;const c=document.createElement('canvas');c.width=1024;c.height=512;const a=c.getContext('2d'),g=a.createLinearGradient(0,0,0,512);g.addColorStop(0,'#f4f6f8');g.addColorStop(.48,'#b9c8d0');g.addColorStop(.52,'#53616e');g.addColorStop(1,'#242b30');a.fillStyle=g;a.fillRect(0,0,1024,512);for(const x of[80,340,600,860]){a.fillStyle='#ffffff';a.fillRect(x,45,65,170);a.fillStyle='#1d2a34';a.fillRect(x+80,100,28,180);}studio=new THREE.CanvasTexture(c);studio.mapping=THREE.EquirectangularReflectionMapping;studio.colorSpace=THREE.SRGBColorSpace;return studio;}
export function createShowroomPickup({color='#c7ba91',name='Zerconda Ridge Crew Cab'}={}){
 const root=new THREE.Group();root.name=name;const env=reflection();
 const paint=new THREE.MeshPhysicalMaterial({color,metalness:.48,roughness:.25,clearcoat:1,clearcoatRoughness:.13,envMap:env,envMapIntensity:.8}),plastic=new THREE.MeshStandardMaterial({color:'#252c30',roughness:.72}),black=new THREE.MeshStandardMaterial({color:'#11191d',roughness:.48}),alloy=new THREE.MeshStandardMaterial({color:'#b2bac0',metalness:.9,roughness:.24,envMap:env}),rimBlack=new THREE.MeshStandardMaterial({color:'#222b31',metalness:.75,roughness:.28,envMap:env}),glass=new THREE.MeshPhysicalMaterial({color:'#19303c',roughness:.07,metalness:.1,transparent:true,opacity:.94,side:THREE.DoubleSide,envMap:env,envMapIntensity:.55}),seat=new THREE.MeshStandardMaterial({color:'#363c3d',roughness:.85}),white=new THREE.MeshBasicMaterial({color:'#e6f4ff'}),red=new THREE.MeshBasicMaterial({color:'#ad1627'});
 const tireCanvas=document.createElement('canvas');tireCanvas.width=tireCanvas.height=128;const t=tireCanvas.getContext('2d');t.fillStyle='#353637';t.fillRect(0,0,128,128);t.strokeStyle='#111314';t.lineWidth=5;for(let i=-128;i<256;i+=24){t.beginPath();t.moveTo(i,0);t.lineTo(i+25,55);t.lineTo(i-8,128);t.stroke();}for(const y of[17,111]){t.beginPath();t.moveTo(0,y);t.lineTo(128,y);t.stroke();}const tireTexture=new THREE.CanvasTexture(tireCanvas);tireTexture.wrapS=tireTexture.wrapT=THREE.RepeatWrapping;tireTexture.repeat.set(18,1);const rubber=new THREE.MeshStandardMaterial({color:'#343638',roughness:.92,bumpMap:tireTexture,bumpScale:.012});
 function mesh(geometry,material,x=0,y=0,z=0,parent=root){const o=new THREE.Mesh(geometry,material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 function box(w,h,d,x,y,z,m=paint,r=.035){return mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(r,w*.3,h*.3,d*.3)),m,x,y,z);}
 function beam(a,b,r=.025,m=paint){const v=new THREE.Vector3(...a),u=new THREE.Vector3(...b),d=u.clone().sub(v);const o=mesh(new THREE.CylinderGeometry(r,r,d.length(),10),m);o.position.copy(v.add(u).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;}
 function panel(points,m){const g=new THREE.BufferGeometry(),pos=[],ids=[];points.forEach(p=>pos.push(...p));for(let i=1;i<points.length-1;i++)ids.push(0,i,i+1);g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(ids);g.computeVertexNormals();return mesh(g,m);}
 function sideShape(shape,side,m,thickness=.08){const geo=new THREE.ExtrudeGeometry(shape,{depth:thickness,steps:1,bevelEnabled:true,bevelSegments:3,bevelSize:.018,bevelThickness:.015});geo.rotateY(-Math.PI/2);geo.translate(side*.99+(side<0?thickness:0),0,0);return mesh(geo,m);}
 // Body side panels have genuine open wheel wells, rather than wheels buried in a box.
 for(const side of[-1,1]){const sh=new THREE.Shape();sh.moveTo(-2.72,.45);for(const z of[-1.65,1.65]){sh.lineTo(z-.60,.45);for(let k=0;k<=24;k++){const a=Math.PI-k*Math.PI/24;sh.lineTo(z+Math.cos(a)*.60,.45+Math.sin(a)*.60);}}sh.lineTo(2.70,.45);sh.lineTo(2.70,1.21);sh.quadraticCurveTo(2.67,1.40,2.43,1.42);sh.lineTo(1.18,1.46);sh.lineTo(-1.1,1.43);sh.lineTo(-2.60,1.40);sh.quadraticCurveTo(-2.72,1.38,-2.72,1.18);sh.closePath();sideShape(sh,side,paint);
 for(const z of[-1.65,1.65]){const f=new THREE.Shape();f.moveTo(z-.77,.45);f.lineTo(z-.77,1.20);f.quadraticCurveTo(z-.74,1.38,z-.53,1.40);f.lineTo(z+.53,1.40);f.quadraticCurveTo(z+.74,1.38,z+.77,1.20);f.lineTo(z+.77,.45);f.lineTo(z+.60,.45);for(let k=0;k<=24;k++){const a=k*Math.PI/24;f.lineTo(z+Math.cos(a)*.60,.45+Math.sin(a)*.60);}f.closePath();const arch=sideShape(f,side,plastic,.11);arch.position.x=side*.065;}
 box(.14,.14,2.25,side*1.02,.50,.02,plastic);box(.24,.08,2.40,side*1.06,.39,.04,black,.02);box(.16,.025,2.20,side*1.10,.44,.04,alloy,.008);
 // Fine panel gaps, two handles per side and an inset fuel flap.
 for(const z of[-1.05,.10,1.17])beam([side*1.005,.60,z],[side*1.005,1.39,z],.005,black);
 for(const z of[-.62,.63]){box(.025,.09,.22,side*1.025,1.30,z,black,.02);box(.032,.032,.17,side*1.045,1.315,z,paint,.01);}if(side<0)box(.025,.21,.25,side*1.01,1.22,-2.39,paint,.025);
 }
 // Strong boxed hood with a subtly crowned center and dark protective shoulder trim.
 box(1.94,.18,1.50,0,1.35,1.93,paint,.09);box(1.30,.06,1.20,0,1.455,1.91,paint,.025);for(const side of[-1,1])box(.12,.028,1.18,side*.68,1.47,1.93,plastic,.008);
 box(1.78,.10,2.25,0,.65,.05,black);box(1.80,.16,2.22,0,.88,.05,paint);
 // Fully framed crew cab; front and rear glass follow the actual sloped cab silhouette.
 const roofY=2.08;box(1.73,.13,2.05,0,roofY,-.10,paint,.09);
 panel([[-.91,1.47,1.20],[.91,1.47,1.20],[.80,2.02,.78],[-.80,2.02,.78]],glass);
 panel([[-.81,2.02,-1.05],[.81,2.02,-1.05],[.90,1.45,-1.12],[-.90,1.45,-1.12]],glass);
 for(const side of[-1,1]){
 panel([[side*.922,1.46,-1.07],[side*.922,1.46,.12],[side*.81,2.01,.10],[side*.81,2.01,-1.04]],glass);
 panel([[side*.922,1.46,.19],[side*.922,1.46,1.16],[side*.81,2.01,.77],[side*.81,2.01,.19]],glass);
 beam([side*.91,1.43,-1.10],[side*.81,2.06,-1.06],.045,paint);beam([side*.91,1.43,1.20],[side*.81,2.06,.79],.045,paint);beam([side*.93,1.43,.15],[side*.81,2.07,.15],.045,black);beam([side*.94,1.435,-1.10],[side*.94,1.435,1.18],.025,black);
 box(.11,.025,1.55,side*.70,2.205,-.12,plastic,.012);for(const z of[-.75,.50])box(.10,.09,.11,side*.70,2.16,z,black,.015);
 // Separate door mirrors, with actual mirror faces toward the driver.
 beam([side*.91,1.45,.94],[side*1.14,1.57,.99],.035,black);box(.26,.18,.31,side*1.21,1.62,.98,plastic,.04);box(.20,.13,.015,side*1.21,1.62,.815,alloy,.02);
 }
 // Visible interior with two rows, dashboard and steering wheel.
 for(const x of[-.44,.44])for(const z of[-.72,.45]){box(.57,.13,.54,x,1.04,z,seat,.055);const back=box(.57,.58,.15,x,1.37,z-.23,seat,.06);back.rotation.x=-.10;box(.27,.19,.13,x,1.70,z-.25,seat,.035);}
 box(1.70,.18,.35,0,1.36,.95,black,.05);const screen=box(.44,.17,.025,0,1.53,.81,black,.015);box(.39,.12,.028,0,1.53,.79,new THREE.MeshBasicMaterial({color:'#355e6d'}),.008);const sw=mesh(new THREE.TorusGeometry(.15,.02,10,32),plastic,-.44,1.51,.80);sw.rotation.x=-.25;
 // Open, ribbed cargo bed, thick caps and a detailed tailgate.
 box(1.74,.10,1.52,0,.90,-1.91,plastic);for(let i=-5;i<=5;i++)box(.045,.027,1.42,i*.135,.962,-1.91,black,.006);
 for(const side of[-1,1]){box(.14,.45,1.63,side*.93,1.18,-1.93,paint);box(.20,.055,1.67,side*.93,1.43,-1.93,plastic,.02);for(const z of[-1.28,-2.55])box(.07,.07,.08,side*.83,1.23,z,alloy,.01);}
 box(1.90,.46,.15,0,1.18,-2.68,paint,.05);box(.40,.075,.035,0,1.33,-2.775,black,.015);box(1.38,.018,.026,0,1.12,-2.775,plastic,.006);box(2.10,.23,.25,0,.60,-2.74,plastic,.06);for(const x of[-.72,.72])box(.30,.035,.23,x,.74,-2.74,black,.01);box(.22,.16,.15,0,.34,-2.75,black,.025);
 for(const side of[-1,1]){box(.13,.40,.07,side*.91,1.15,-2.78,black,.02);box(.065,.32,.08,side*.91,1.16,-2.79,red,.012);}
 // Deep unbranded grille, individual slats, vertical projector lamps and bumper guards.
 box(1.90,.71,.14,0,1.06,2.64,paint,.08);box(1.40,.48,.11,0,1.09,2.735,black,.05);
 for(let i=-4;i<=4;i++){box(.055,.39,.045,i*.145,1.10,2.81,plastic,.014);box(.025,.30,.02,i*.145,1.10,2.837,black,.008);}for(const y of[.96,1.18])box(1.31,.045,.035,0,y,2.805,plastic,.012);
 box(2.10,.27,.25,0,.64,2.72,plastic,.07);box(.92,.17,.09,0,.52,2.85,black,.03);box(.52,.13,.025,0,.69,2.86,alloy,.012);
 for(const side of[-1,1]){box(.28,.51,.15,side*.88,1.10,2.72,plastic,.04);box(.15,.40,.06,side*.88,1.11,2.81,black,.025);box(.027,.33,.07,side*.94,1.11,2.84,white,.008);for(const y of[.99,1.12,1.25])box(.055,.075,.07,side*.865,y,2.835,white,.012);box(.10,.38,.13,side*.63,.69,2.91,black,.03);box(.17,.055,.10,side*.78,.54,2.84,alloy,.02);}
 // High-resolution tires, recessed brakes, six substantial two-tone alloy spokes.
 for(const side of[-1,1])for(const z of[-1.65,1.65]){const tire=mesh(new THREE.TorusGeometry(.34,.105,20,64),rubber,side*1.015,.46,z);tire.rotation.y=Math.PI/2;const sidewall=mesh(new THREE.CylinderGeometry(.365,.365,.19,48),rubber,side*1.015,.46,z);sidewall.rotation.z=Math.PI/2;const disc=mesh(new THREE.CylinderGeometry(.255,.255,.025,40),alloy,side*1.12,.46,z);disc.rotation.z=Math.PI/2;const rim=mesh(new THREE.TorusGeometry(.285,.018,10,48),rimBlack,side*1.125,.46,z);rim.rotation.y=Math.PI/2;for(let i=0;i<6;i++){const a=i*Math.PI/3,spoke=box(.045,.075,.25,side*1.14,.46+Math.sin(a)*.14,z+Math.cos(a)*.14,rimBlack,.012);spoke.rotation.x=-a;beam([side*1.168,.46+Math.sin(a)*.10,z+Math.cos(a)*.10],[side*1.168,.46+Math.sin(a)*.26,z+Math.cos(a)*.26],.018,alloy);}const hub=mesh(new THREE.CylinderGeometry(.065,.065,.05,20),rimBlack,side*1.15,.46,z);hub.rotation.z=Math.PI/2;for(let i=0;i<6;i++){const a=i*Math.PI/3;mesh(new THREE.SphereGeometry(.011,6,6),alloy,side*1.185,.46+Math.sin(a)*.043,z+Math.cos(a)*.043);}box(.03,.13,.07,side*1.11,.52,z+.20,paint,.015);}
 // Soft contact shadow works when large-scene shadow maps are disabled.
 const sc=document.createElement('canvas');sc.width=sc.height=64;const sa=sc.getContext('2d'),sg=sa.createRadialGradient(32,32,5,32,32,32);sg.addColorStop(0,'#0009');sg.addColorStop(1,'#0000');sa.fillStyle=sg;sa.fillRect(0,0,64,64);const shadow=mesh(new THREE.PlaneGeometry(2.65,6.2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false}),0,.008,0);shadow.rotation.x=-Math.PI/2;
 // Static detail is batched by material so both trucks remain inexpensive to draw.
 root.updateMatrixWorld(true);const batches=new Map(),originals=new Set();root.traverse(o=>{if(!o.isMesh)return;const geo=o.geometry.clone().applyMatrix4(o.matrixWorld);if(!geo.attributes.uv)geo.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(geo.attributes.position.count*2),2));const list=batches.get(o.material)||[];list.push(geo.index?geo.toNonIndexed():geo);batches.set(o.material,list);originals.add(o.geometry);});root.clear();for(const[m,geos]of batches){const geo=mergeGeometries(geos,false);if(!geo)throw Error('Unable to batch pickup geometry');const o=mesh(geo,m);o.castShadow=!m.transparent;geos.forEach(g=>g.dispose());}originals.forEach(g=>g.dispose());root.userData.showroomVehicle=true;root.userData.dimensions={length:5.8,width:2.45,height:2.22};return root;
}
