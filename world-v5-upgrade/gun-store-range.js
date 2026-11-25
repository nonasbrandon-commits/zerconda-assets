import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// Decorative work stays behind the existing firing-line collider. Target positions,
// lane access, practice hit testing and the town safety-light rule stay unchanged.
export function createGunStoreRange(parent,{add,materials:m}){
 const steel=new THREE.MeshStandardMaterial({color:'#171b1f',roughness:.42,metalness:.72});
 const acoustic=new THREE.MeshStandardMaterial({color:'#292b2d',roughness:.94});
 const red=new THREE.MeshStandardMaterial({color:'#c81c26',emissive:'#ff1728',emissiveIntensity:1.4,metalness:.25,roughness:.35});
 const warm=new THREE.MeshStandardMaterial({color:'#ffe2b8',emissive:'#ffc680',emissiveIntensity:1.5,roughness:.45});
 red.userData.selectiveBloom=warm.userData.selectiveBloom=true;
 const c=document.createElement('canvas');c.width=c.height=128;const p=c.getContext('2d');p.fillStyle='#aaa';p.fillRect(0,0,128,128);
 // Deterministic micrograin, shared by the frame and acoustic backing.
 let seed=411;for(let i=0;i<4096;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const k=90+(seed%80);p.fillStyle=`rgb(${k},${k},${k})`;p.fillRect(seed%128,(seed>>>8)%128,1,1);}
 const grain=new THREE.CanvasTexture(c);grain.wrapS=grain.wrapT=THREE.RepeatWrapping;grain.repeat.set(8,8);steel.bumpMap=acoustic.bumpMap=grain;steel.bumpScale=.008;acoustic.bumpScale=.018;
 const box=(w,h,d,x,y,z,mat=steel)=>add(new RoundedBoxGeometry(w,h,d,1,Math.min(.018,w/4,h/4,d/4)),mat,x,y,z);
 function panel(name,w,h,x,y,z,paint){const c=document.createElement('canvas');c.width=name==='Firing range header'?2048:768;c.height=name==='Firing range header'?256:1024;paint(c.getContext('2d'),c.width,c.height);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t}));mesh.position.set(x,y,z);mesh.name=name;parent.add(mesh);return mesh;}
 function chrome(p,text,x,y,size,max){const g=p.createLinearGradient(0,y-size,0,y+size/3);g.addColorStop(0,'#fff');g.addColorStop(.4,'#f8f9fb');g.addColorStop(.5,'#a5afb6');g.addColorStop(.8,'#e1e6ea');g.addColorStop(1,'#737d83');p.font=`italic 900 ${size}px Arial`;p.textAlign='center';p.textBaseline='middle';p.fillStyle='#000';p.fillText(text,x+3,y+4,max);p.fillStyle=g;p.fillText(text,x,y,max);}
 function base(p,w,h){const g=p.createLinearGradient(0,0,0,h);g.addColorStop(0,'#30383f');g.addColorStop(.25,'#101519');g.addColorStop(1,'#171d22');p.fillStyle=g;p.fillRect(0,0,w,h);p.strokeStyle='#aeb9c1';p.lineWidth=8;p.strokeRect(5,5,w-10,h-10);p.strokeStyle='#ed2634';p.lineWidth=5;p.strokeRect(18,18,w-36,h-36);}
 // The portal fits the existing twelve-metre annex and its 4.3m ceiling.
 box(11.70,1.05,.40,11,3.675,1.65);box(11.88,.10,.50,11,4.235,1.65,m.metal);
 for(const x of[5.48,16.52]){box(.65,3.15,.42,x,1.575,1.65);box(.08,3.12,.06,x-.25,1.56,1.90,m.metal);box(.08,3.12,.06,x+.25,1.56,1.90,m.metal);box(.78,.12,.57,x,.06,1.65,m.metal);}
 box(10.8,.035,.06,11,3.16,1.91,red);box(10.65,.035,.055,11,3.08,1.67,warm);
 const header=panel('Firing range header',11.45,.90,11,3.69,1.86,(p,w,h)=>{base(p,w,h);chrome(p,'Z  ZERCONDA MILITARY',w/2,66,73,w-170);p.fillStyle='#8b0610';p.fillRect(60,115,w-120,109);p.strokeStyle='#ff3b43';p.lineWidth=3;p.strokeRect(60,115,w-120,109);chrome(p,'FIRING RANGE',w/2,171,102,w-230);});
 const rules=panel('Firing range rules',1.80,2.60,5.145,1.95,3.45,(p,w,h)=>{base(p,w,h);chrome(p,'Z  RANGE RULES',w/2,91,57,w-55);const rows=[['01','AUTHORIZED USE ONLY'],['02','FOLLOW RANGE OFFICER','INSTRUCTIONS'],['03','EYE & EAR PROTECTION','REQUIRED'],['04','KEEP FIREARMS POINTED','DOWNRANGE'],['05','NO LIVE FIRE OUTSIDE','DESIGNATED AREAS']];rows.forEach((r,i)=>{const y=220+i*167;p.strokeStyle='#fb2637';p.lineWidth=5;p.beginPath();p.arc(83,y,40,0,Math.PI*2);p.stroke();p.fillStyle='#eee';p.font='bold 32px Arial';p.textAlign='center';p.fillText(r[0],83,y+11);p.textAlign='left';p.font='bold 37px Arial';r.slice(1).forEach((s,j)=>p.fillText(s,145,y-7+j*46,w-175));p.strokeStyle='#545b5f';p.lineWidth=2;p.beginPath();p.moveTo(35,y+80);p.lineTo(w-35,y+80);p.stroke();});});
 rules.rotation.y=Math.PI/2;box(.025,2.66,1.86,5.117,1.95,3.45,m.metal);
 const shield=panel('Zerconda military range shield',1.25,2.10,15.76,1.94,1.91,(p,w,h)=>{base(p,w,h);p.beginPath();p.moveTo(w/2,110);p.lineTo(w-86,238);p.lineTo(w-110,680);p.lineTo(w/2,900);p.lineTo(110,680);p.lineTo(86,238);p.closePath();p.fillStyle='#080c10';p.fill();p.strokeStyle='#dbe1e5';p.lineWidth=16;p.stroke();p.strokeStyle='#ed2634';p.lineWidth=7;p.stroke();chrome(p,'★',w/2,365,205,w-200);p.fillStyle='#ed1b2a';p.font='italic 900 355px Arial';p.textAlign='center';p.fillText('Z',w/2-10,686);chrome(p,'RANGE',w/2,948,53,w-90);});
 // Front fascia and illuminated tread plate on the retained firing-line barrier.
 box(10.9,.66,.025,11,.43,1.925);box(10.9,.035,.035,11,.79,1.95,warm);box(11.65,.045,.32,11,.87,1.80,m.metal);
 for(let x=5.6;x<16.5;x+=.22){const g=new THREE.BoxGeometry(.105,.016,.015);g.rotateZ(Math.PI/4);add(g,m.metal,x,.36+(Math.round(x*100)%2)*.13,1.945);}
 // Original dividers retain their footprint; add slim metal caps, not extra walls.
 for(const x of[9.2,12.8]){box(.15,.055,3.04,x,2.425,4,m.metal);box(.155,2.35,.045,x,1.2,5.52,steel);}
 // Three suspended carrier rails align with the original authored targets.
 for(const[x,z]of[[7.3,-9],[11,-16],[14.7,-22]]){const length=1.6-z;box(.08,.09,length,x,3.91,(1.6+z)/2,m.metal);box(.30,.13,.42,x,3.81,z);box(.045,.73,.045,x,3.40,z,m.metal);box(1.45,.045,.035,x,2.83,z,m.metal);box(.40,.055,.80,x,4.05,z,steel);box(.30,.026,.65,x,4.014,z,warm);}
 // Subtle acoustic wall panels follow the existing range boundary.
 for(let z=-23;z<=0;z+=2){box(.025,2.7,1.94,16.83,1.55,z,acoustic);box(.025,2.7,1.94,5.13,1.55,z,acoustic);}
 return{header,rules,shield,carrierCount:3,addedLights:0};
}
