import * as THREE from 'three';
import {createRealisticHuman} from './realistic-human.js?v=20261117-realistic-human-v68';

export function createEastForestGate(scene,{createAvatar,getPlayer}){
 const root=new THREE.Group();root.name='Closed east forest checkpoint';root.userData.roadInfrastructure=true;scene.add(root);
 const iron=new THREE.MeshStandardMaterial({color:0x171e22,roughness:.48,metalness:.72});
 const gold=new THREE.MeshStandardMaterial({color:0xc4ac6c,roughness:.42,metalness:.7});
 function box(w,h,d,x,y,z,material=iron){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);return mesh;}
 // Closed double-leaf iron gate, with fine bars and pointed finials.
 for(const side of [-1,1]){
  for(const z of [side*.15,side*17.2])box(.25,4.8,.18,582,2.5,z);
  for(const y of [.6,1.4,3.8,4.65])box(.16,.12,17.1,582,y,side*8.7);
  for(let i=0;i<24;i++){
   const z=side*(.35+i*.72);box(.065,4.35,.065,582,2.45,z);
   const tip=new THREE.Mesh(new THREE.ConeGeometry(.095,.25,4),iron);tip.position.set(582,4.73,z);root.add(tip);
  }
  const handle=new THREE.Mesh(new THREE.TorusGeometry(.13,.035,8,16),gold);handle.rotation.y=Math.PI/2;handle.position.set(581.84,1.7,side*.35);root.add(handle);
 }
 const police=[];
 const uniforms=new Map([[0x2879a4,0x17232d],[0x21668e,0x101a23],[0x417d9c,0x465663],[0x9a7854,0x202a31],[0x806347,0x151e26]]);
 for(const side of [-1,1]){
  const guard=createAvatar();guard.name='Police officer · east gate';guard.position.set(564,.145,side*13);guard.rotation.y=-Math.PI/2;
  guard.traverse(mesh=>{if(!mesh.isMesh)return;const color=mesh.material.color?.getHex();if(uniforms.has(color)){mesh.material=mesh.material.clone();mesh.material.color.setHex(uniforms.get(color));}});
  const oldParts=[...guard.children];
  const human=createRealisticHuman({shirt:0x1d2a36,pants:0x27313b,onReady:()=>{for(const part of oldParts)part.visible=false;}});
  guard.add(human.root);police.push(human);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.125,.13,.095,24),iron);cap.position.set(0,1.92,0);guard.add(cap);
  const brim=new THREE.Mesh(new THREE.BoxGeometry(.22,.025,.15),iron);brim.position.set(0,1.885,.11);guard.add(brim);
  const band=new THREE.Mesh(new THREE.CylinderGeometry(.131,.131,.035,24),new THREE.MeshStandardMaterial({color:0xbac3c8,roughness:.7}));band.position.set(0,1.9,0);guard.add(band);
  const badge=new THREE.Mesh(new THREE.SphereGeometry(.025,10,8),gold);badge.scale.set(1,1.3,.2);badge.position.set(-.075,1.4,.13);guard.add(badge);
  const belt=new THREE.Mesh(new THREE.BoxGeometry(.29,.065,.23),iron);belt.position.set(0,1.035,0);guard.add(belt);
  root.add(guard);
 }
 function sign(text,x,y,z,width=8,height=1){
  const cv=document.createElement('canvas');cv.width=1024;cv.height=160;const ctx=cv.getContext('2d');ctx.fillStyle='#17232b';ctx.fillRect(0,0,1024,160);ctx.strokeStyle='#c4ad70';ctx.lineWidth=9;ctx.strokeRect(5,5,1014,150);ctx.fillStyle='#fff2ca';ctx.font='bold 50px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,80,970);
  const texture=new THREE.CanvasTexture(cv);texture.colorSpace=THREE.SRGBColorSpace;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));mesh.rotation.y=-Math.PI/2;mesh.position.set(x,y,z);root.add(mesh);
 }
 sign('POLICE CHECKPOINT · GATE CLOSED',569.75,5.8,0,23,1.05);
 sign('DANGER OUTSIDE · NO EXIT',569.7,2.7,0,7,.85);
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
 const notice=document.createElement('div');notice.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);max-width:85vw;padding:14px 20px;border:1px solid #c4ad70;border-radius:8px;background:#13212bea;color:#fff1cf;font:15px sans-serif;z-index:9999;display:none;text-align:center';notice.textContent='POLICE: The gate is closed. The forest outside is dangerous. No one may leave for now.';document.body.appendChild(notice);
 return {root,update(dt=.016){for(const human of police)human.update(dt,0);const p=getPlayer();notice.style.display=p.x>557&&Math.abs(p.z)<24?'block':'none';}};
}

