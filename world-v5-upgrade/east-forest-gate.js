import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {createRealisticHuman} from './realistic-human.js?v=20261117-realistic-human-v68';

export function createEastForestGate(scene,{createAvatar,getPlayer}){
 const root=new THREE.Group();root.name='Zerconda Gate Complex · closed forest checkpoint';root.userData.roadInfrastructure=true;scene.add(root);
 const detail=new THREE.Group(),distant=new THREE.Group();detail.position.x=distant.position.x=582;detail.name='Gate Complex close detail';distant.name='Gate Complex distant silhouette';detail.userData.distanceManaged=distant.userData.distanceManaged=true;root.add(detail,distant);
 const material=(color,roughness=.75,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const iron=material('#151b23',.38,.7),cap=material('#252a32',.5,.55),silver=material('#cbd8e8',.3,.55),darkStone=material('#565956'),cream=material('#ebe9df'),soil=material('#302c2b'),leaves=material('#23543a'),lime=material('#65794b'),pink=material('#ca63d7'),screen=new THREE.MeshBasicMaterial({color:'#54acd2'}),violet=new THREE.MeshBasicMaterial({color:'#c348ff'}),warm=new THREE.MeshBasicMaterial({color:'#ffce84'}),glass=new THREE.MeshStandardMaterial({color:'#6995aa',roughness:.24,metalness:.25,transparent:true,opacity:.42,depthWrite:false,side:THREE.DoubleSide});
 const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');let seed=4937;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);ctx.fillStyle='#454743';ctx.fillRect(0,0,512,512);for(let row=0;row<16;row++)for(let col=-1;col<9;col++){const x=col*64+(row%2)*32,y=row*32,v=100+Math.floor(random()*42);ctx.fillStyle=`rgb(${v+8},${v+8},${v+3})`;ctx.fillRect(x+1,y+1,61,29);ctx.strokeStyle='#ffffff15';ctx.strokeRect(x+3,y+3,57,25);for(let i=0;i<18;i++){ctx.fillStyle=random()>.5?'#fff1':'#0001';ctx.fillRect(x+random()*62,y+random()*30,2+random()*8,1+random()*2);}}
 const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.colorSpace=THREE.SRGBColorSpace;const stone=material('#d0d0c4',.95);stone.map=texture;
 const nc=document.createElement('canvas');nc.width=nc.height=512;const nx=nc.getContext('2d'),nd=nx.createImageData(512,512);const height=(x,y)=>{x=(x+512)%512;y=(y+512)%512;const row=Math.floor(y/32),u=(x+(row%2)*32)%64,v=y%32;return Math.max(0,Math.min(1,(Math.min(u,64-u,v,32-v)-1)/4));};for(let y=0;y<512;y++)for(let x=0;x<512;x++){const dx=(height(x+1,y)-height(x-1,y))*.8,dy=(height(x,y+1)-height(x,y-1))*.8,len=Math.hypot(dx,dy,1),i=(y*512+x)*4;nd.data[i]=Math.round((.5-dx/len*.5)*255);nd.data[i+1]=Math.round((.5-dy/len*.5)*255);nd.data[i+2]=Math.round((.5+.5/len)*255);nd.data[i+3]=255;}nx.putImageData(nd,0,0);stone.normalMap=new THREE.CanvasTexture(nc);stone.normalMap.wrapS=stone.normalMap.wrapT=THREE.RepeatWrapping;stone.normalScale.set(.45,.45);
 const wash=document.createElement('canvas');wash.width=128;wash.height=256;const wx=wash.getContext('2d');wx.scale(1,2);const wg=wx.createRadialGradient(64,64,3,64,64,64);wg.addColorStop(0,'rgba(255,188,105,.6)');wg.addColorStop(1,'rgba(255,188,105,0)');wx.fillStyle=wg;wx.fillRect(0,0,128,128);const wt=new THREE.CanvasTexture(wash);wt.colorSpace=THREE.SRGBColorSpace;const warmWash=new THREE.MeshBasicMaterial({map:wt,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.65});
 silver.emissive=new THREE.Color('#53647b');silver.emissiveIntensity=.22;
 const skyline=new THREE.MeshBasicMaterial({color:'#672e79'});
 const batches=new Map();function add(g,m=iron,x=0,y=0,z=0,rotation=null){if(rotation)g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(rotation));g.translate(x,y,z);if(m===stone){const p=g.attributes.position,n=g.attributes.normal,u=g.attributes.uv;for(let i=0;i<p.count;i++){const nx=Math.abs(n.getX(i)),ny=Math.abs(n.getY(i));u.setXY(i,(nx>.5?p.getZ(i):p.getX(i))/4,(ny>.5?p.getZ(i):p.getY(i))/4);}}if(!batches.has(m))batches.set(m,[]);batches.get(m).push(g);}
 const box=(w,h,d,x,y,z,m=iron)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z);
 const tube=(points,r,m=iron)=>add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),Math.max(12,points.length*3),r,6,false),m);
 function face(w,h,x,y,z,m,parent=detail){const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),m);mesh.rotation.y=-Math.PI/2;mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
 function textPlate(title,subtitle,w,h,x,y,z){const c=document.createElement('canvas');c.width=2048;c.height=256;const a=c.getContext('2d');a.fillStyle='#141b24';a.fillRect(0,0,2048,256);const gradient=a.createLinearGradient(0,30,0,170);gradient.addColorStop(0,'#ffffff');gradient.addColorStop(.45,'#c5d2df');gradient.addColorStop(.5,'#677a91');gradient.addColorStop(.65,'#f6f9fc');gradient.addColorStop(1,'#8799ae');a.font='italic 900 200px Arial,sans-serif';a.textAlign='center';a.textBaseline='middle';a.lineWidth=7;a.strokeStyle='#070b11';a.strokeText(title,1024,102,1920);a.fillStyle=gradient;a.fillText(title,1024,97,1920);a.fillStyle='#f0eef8';a.font='bold 36px Arial,sans-serif';a.fillText(subtitle,1024,220,1600);a.fillStyle='#bc55ff';a.fillRect(70,220,200,5);a.fillRect(1778,220,200,5);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return face(w,h,x,y,z,new THREE.MeshBasicMaterial({map:t}),detail);}
 // Two stone towers, outside both the road and its sidewalks.
 for(const side of[-1,1]){const z=side*16.1;box(4.8,12.5,3.8,0,6.25,z,stone);box(5.1,.55,4.1,0,.275,z,darkStone);box(5.35,.35,4.35,0,12.6,z,iron);box(5.65,.28,4.65,0,12.9,z,cap);box(.08,.075,4.5,-2.72,12.62,z,violet);box(5.4,.075,.08,0,12.62,z+side*2.17,violet);
  face(3.6,6,-2.44,6.25,z,warmWash);box(.26,2.6,.65,-2.58,6.25,z,iron);box(.08,2.25,.4,-2.74,6.25,z,warm);box(.1,.1,.55,-2.79,6.25,z,iron);box(.42,.35,.22,-2.59,9.2,z,iron);add(new THREE.BoxGeometry(.8,.34,.38),cream,-3.05,9.32,z,new THREE.Euler(0,side*.18,-.18));add(new THREE.CylinderGeometry(.12,.12,.15,12),iron,-3.48,9.25,z,new THREE.Euler(0,0,Math.PI/2));
  // Tapered stone wings meet the existing 12.5m perimeter at z=±66.
  box(2.2,7.4,37.0,0,3.7,side*36.5,stone);box(2.65,.3,37.0,0,7.55,side*36.5,cap);box(.07,.07,37.0,-1.37,7.63,side*36.5,violet);
  const shape=new THREE.Shape();shape.moveTo(side*55,0);shape.lineTo(side*66,0);shape.lineTo(side*66,12.5);shape.lineTo(side*55,7.4);shape.closePath();const wing=new THREE.ExtrudeGeometry(shape,{depth:2.2,bevelEnabled:false,steps:1});wing.rotateY(Math.PI/2);wing.translate(-1.1,0,0);add(wing,stone);tube([new THREE.Vector3(-1.15,7.62,side*55),new THREE.Vector3(-1.15,12.72,side*66)],.09,cap);
  // Glass guard booth, roof and illuminated trim.
  box(6.3,.42,5.6,-8.4,.21,side*21.5,darkStone);box(6.0,.85,5.3,-8.4,.85,side*21.5,stone);box(.2,2.45,5.3,-5.5,2.05,side*21.5,iron);box(6.4,.28,5.85,-8.4,3.55,side*21.5,cap);box(6.85,.25,6.2,-8.4,3.83,side*21.5,iron);box(.07,.065,6.1,-11.85,3.76,side*21.5,violet);box(6.6,.065,.07,-8.4,3.76,side*24.55,violet);
  box(.06,2.15,5.0,-11.36,2.12,side*21.5,glass);for(const zz of[-2.45,0,2.45])box(.16,2.2,.12,-11.45,2.15,side*21.5+zz,iron);for(const zz of[-2.5,2.5]){box(5.6,2.15,.05,-8.5,2.12,side*21.5+zz,glass);box(.15,2.2,.15,-5.65,2.15,side*21.5+zz,iron);}box(3,.12,3.5,-9.5,1.45,side*21.5,cream);box(.2,.6,.85,-9.0,1.9,side*24.2,iron);box(.035,.45,.65,-9.13,1.9,side*24.2,screen);
  // Keypad bollard and illuminated ring, clear of the sidewalk edge.
  add(new THREE.CylinderGeometry(.22,.26,1.25,12),silver,-7,.625,side*15.5);add(new THREE.TorusGeometry(.235,.045,6,16),violet,-7,1.05,side*15.5,new THREE.Euler(Math.PI/2,0,0));box(.22,.48,.32,-7,1.5,side*15.5,iron);for(let r=0;r<3;r++)for(let c=0;c<3;c++)box(.025,.065,.065,-7.125,1.37+r*.11,side*15.5+(c-1)*.09,screen);
  for(const zz of[33,46]){const z=side*zz;box(3.6,.55,7,-8.5,.275,z,darkStone);box(3.35,.1,6.75,-8.5,.58,z,soil);for(let i=0;i<5;i++){add(new THREE.IcosahedronGeometry(.65,1),leaves,-8.4,.95,z-2.5+i*1.25);for(let j=0;j<5;j++){const a=j*2.4+i;add(new THREE.IcosahedronGeometry(.15,0),pink,-8.4+Math.sin(a)*.45,1.45+(j%2)*.1,z-2.5+i*1.25+Math.cos(a)*.4);}}for(let i=0;i<8;i++){const h=.8+(i%3)*.18,g=new THREE.ConeGeometry(.1,h,4);add(g,lime,-9.4+(i%2)*.35,.6+h/2,z-2.8+Math.floor(i/2)*1.7);}}
 }
 // Header and skyline. No additional dynamic light or postprocessing passes.
 box(5.2,3.4,28.6,0,10.5,0,iron);box(5.45,.25,29.3,0,12.31,0,cap);box(.08,.08,27,-2.8,9.0,0,violet);textPlate('ZERCONDA','G A T E   C O M P L E X',26.5,3.1,-2.67,10.5,0);
 for(let i=0;i<31;i++){const z=-10.5+i*.7,h=.25+random()*1.3;box(.16,h,.44,-1.9,12.5+h/2,z,skyline);}tube(Array.from({length:25},(_,i)=>{const a=i/24*Math.PI;return new THREE.Vector3(-2.0,12.5+Math.sin(a)*2.05,Math.cos(a)*11.6);}),.075,violet);
 for(const side of[-1,1]){for(let i=0;i<5;i++)box(.22,.07,.6,-1.4,8.76,side*(2+i*2.7),warm);}
 // Closed arched double gate with one central Z medallion.
 const arch=z=>6.35+1.5*Math.sqrt(Math.max(0,1-(z/14.1)**2));for(let z=-13.8;z<=13.9;z+=.4){const top=arch(z);box(.14,top-.35,.075,0,(top+.35)/2,z,iron);}for(const side of[-1,1]){for(const y of[.45,1.2,5.35])box(.23,.16,13.9,0,y,side*7.05,iron);for(const z of[side*.09,side*14.0])box(.28,arch(z),.2,0,arch(z)/2,z,iron);tube(Array.from({length:24},(_,i)=>{const z=side*(.06+i/23*13.94);return new THREE.Vector3(0,arch(z),z);}),.12,iron);box(.28,.8,13.9,-.12,3.8,side*7.05,iron);for(const y of[3.52,4.08])box(.08,.06,13.9,-.29,y,side*7.05,violet);}
 add(new THREE.CylinderGeometry(1.8,1.8,.24,48),iron,-.48,3.8,0,new THREE.Euler(0,0,Math.PI/2));add(new THREE.TorusGeometry(1.72,.055,8,64),violet,-.63,3.8,0,new THREE.Euler(0,Math.PI/2,0));
 const zShape=new THREE.Shape();zShape.moveTo(-1.0,.9);zShape.lineTo(1.0,.9);zShape.lineTo(.8,.55);zShape.lineTo(-.5,-.55);zShape.lineTo(.85,-.55);zShape.lineTo(.65,-.9);zShape.lineTo(-1.05,-.9);zShape.lineTo(-.85,-.5);zShape.lineTo(.45,.55);zShape.lineTo(-1.2,.55);zShape.closePath();const zGeo=new THREE.ExtrudeGeometry(zShape,{depth:.1,bevelEnabled:true,bevelSize:.045,bevelThickness:.035,bevelSegments:1,steps:1});zGeo.rotateY(-Math.PI/2);add(zGeo,silver,-.71,3.8,0);
 // Material batches keep the detailed complex inexpensive to render nearby.
 let triangles=0;for(const[m,parts]of batches){const plain=parts.map(g=>g.index?g.toNonIndexed():g),geometry=mergeGeometries(plain,false),mesh=new THREE.Mesh(geometry,m);mesh.name='Gate Complex · '+(m===stone?'coursed stone':m===violet?'violet illuminated trim':m===glass?'guard booth glazing':'batched architecture');mesh.receiveShadow=!m.isMeshBasicMaterial;mesh.castShadow=false;detail.add(mesh);triangles+=(geometry.index?.count||geometry.attributes.position.count)/3;for(const g of new Set([...parts,...plain]))g.dispose();}
 for(const side of[-1,1]){const tower=new THREE.Mesh(new THREE.BoxGeometry(4.8,13.1,3.8),darkStone);tower.position.set(0,6.55,side*16.1);distant.add(tower);const wall=new THREE.Mesh(new THREE.BoxGeometry(2.2,9.8,48),darkStone);wall.position.set(0,4.9,side*42);distant.add(wall);}const beam=new THREE.Mesh(new THREE.BoxGeometry(5.2,3.4,28.6),iron);beam.position.y=10.5;distant.add(beam);const gate=new THREE.Mesh(new THREE.BoxGeometry(.2,6.2,28.6),iron);gate.position.y=3.1;distant.add(gate);

 const gold=silver;
 const police=[];
 const uniforms=new Map([[0x2879a4,0x17232d],[0x21668e,0x101a23],[0x417d9c,0x465663],[0x9a7854,0x202a31],[0x806347,0x151e26]]);
 for(const side of [-1,1]){
  const guard=createAvatar();guard.name='Police officer · east gate';guard.position.set(574,.145,side*17.4);guard.rotation.y=-Math.PI/2;
  guard.traverse(mesh=>{if(!mesh.isMesh)return;const color=mesh.material.color?.getHex();if(uniforms.has(color)){mesh.material=mesh.material.clone();mesh.material.color.setHex(uniforms.get(color));}});
  const oldParts=[...guard.children];
  const human=createRealisticHuman({shirt:0x15191f,pants:0x111820,onReady:()=>{for(const part of oldParts)part.visible=false;}});
  guard.add(human.root);police.push(human);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.125,.13,.095,24),iron);cap.position.set(0,1.92,0);guard.add(cap);
  const brim=new THREE.Mesh(new THREE.BoxGeometry(.22,.025,.15),iron);brim.position.set(0,1.885,.11);guard.add(brim);
  const band=new THREE.Mesh(new THREE.CylinderGeometry(.131,.131,.035,24),new THREE.MeshStandardMaterial({color:0xbac3c8,roughness:.7}));band.position.set(0,1.9,0);guard.add(band);
  const badge=new THREE.Mesh(new THREE.SphereGeometry(.025,10,8),silver);badge.scale.set(1,1.3,.2);badge.position.set(-.075,1.4,.13);guard.add(badge);
  const belt=new THREE.Mesh(new THREE.BoxGeometry(.29,.065,.23),iron);belt.position.set(0,1.035,0);guard.add(belt);
  root.add(guard);
 }

 {
 // A winding earth track replaces city paving beyond the closed perimeter.
 const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#796347';ctx.fillRect(0,0,256,256);
 let seed=491;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 for(let i=0;i<15000;i++){const light=Math.floor(65+random()*85);ctx.fillStyle=`rgba(${light+22},${light+5},${light-18},.35)`;ctx.fillRect(random()*256,random()*256,1+random()*3,1+random()*5);}
 for(const x of [72,177]){ctx.fillStyle='#493f3060';ctx.fillRect(x,0,18,256);}
 const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(1,30);texture.colorSpace=THREE.SRGBColorSpace;
 const dirt=new THREE.MeshStandardMaterial({map:texture,color:0xc1ad89,roughness:1});
 const curve=new THREE.CatmullRomCurve3([[582,0],[604,0],[645,7],[697,-5],[752,-15],[820,-8],[930,-35]].map(([x,z])=>new THREE.Vector3(x,.015,z)));
 const vertices=[],uv=[],indices=[];
 for(let i=0;i<=160;i++){const t=i/160,p=curve.getPoint(t),d=curve.getTangent(t),side=new THREE.Vector3(-d.z,0,d.x).normalize();for(const sign of [-1,1]){const v=p.clone().addScaledVector(side,sign*(3.5-t*.9));vertices.push(v.x,v.y,v.z);uv.push(sign<0?0:1,t);}if(i<160){const k=i*2;indices.push(k,k+1,k+2,k+1,k+3,k+2);}}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();const track=new THREE.Mesh(geo,dirt);track.receiveShadow=true;root.add(track);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(600,500),new THREE.MeshStandardMaterial({color:0x435b32,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.set(860,-.21,-60);root.add(floor);

 }

 const notice=document.createElement('div');notice.style.cssText='position:fixed;left:50%;top:76px;transform:translateX(-50%);max-width:85vw;padding:12px 18px;border:1px solid #b562df;border-radius:9px;background:#13212bea;color:#f4e7ff;pointer-events:none;font:13px system-ui;z-index:9999;display:none;text-align:center';notice.textContent='Gate closed · Outer forest access restricted.';document.body.append(notice);
 const solids=[[-7.3,-6.7,-15.8,-15.2],[-7.3,-6.7,15.2,15.8],[-8.35,-7.65,-17.75,-17.05],[-8.35,-7.65,17.05,17.75],[-2.4,2.4,-18,-14.2],[-2.4,2.4,14.2,18],[-11.6,-5.25,-24.4,-18.6],[-11.6,-5.25,18.6,24.4],[-10.3,-6.7,-36.5,-29.5],[-10.3,-6.7,29.5,36.5],[-10.3,-6.7,-49.5,-42.5],[-10.3,-6.7,42.5,49.5]];
 const stats={triangles,materialBatches:batches.size,booths:2,guards:2,dynamicLights:0};root.userData.gateComplexStats=stats;batches.clear();detail.visible=false;distant.visible=true;const guardRoots=root.children.filter(c=>c.name==='Police officer · east gate');
 return{root,stats,blocks(x,z,r=.35){x-=582;return solids.some(([xa,xb,za,zb])=>x>xa-r&&x<xb+r&&z>za-r&&z<zb+r);},update(dt=.016){const p=getPlayer(),near=Math.hypot(p.x-582,p.z)<185;detail.visible=near;distant.visible=!near;for(const guard of guardRoots)guard.visible=near;if(near)for(const human of police)human.update(dt,0);notice.style.display=p.x>557&&p.x<586&&Math.abs(p.z)<24?'block':'none';}};
}
