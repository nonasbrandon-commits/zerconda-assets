import * as THREE from 'three';
import {cityviewBox} from './cityview-building.js?v=20261124-doors-v328';
let steel;
function brushedSteel(){if(steel)return steel;const c=document.createElement('canvas');c.width=512;c.height=512;const a=c.getContext('2d');a.fillStyle='#b0b2b6';a.fillRect(0,0,512,512);for(let y=0;y<512;y++){a.fillStyle=y%3===0?'#737a8133':y%2?'#ffffff33':'#68707822';a.fillRect(0,y,512,1);}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;steel=new THREE.MeshStandardMaterial({map:t,color:'#e5e8ed',metalness:.42,roughness:.32});return steel;}
export function createCityviewElevator(parent,{level=0,height=level?3.32:3.9}={}){const root=new THREE.Group();root.name='Brushed stainless elevator with floor indicator';root.position.z=level?7.65:-7.4;root.rotation.y=level?Math.PI:0;parent.add(root);const m=brushedSteel(),dark=new THREE.MeshStandardMaterial({color:'#10151b',metalness:.65,roughness:.3}),white=new THREE.MeshBasicMaterial({color:'#e5f3ff'}),box=(...a)=>cityviewBox(root,...a);box(3.8,3.2,.22,0,1.6,-.13,dark);for(const x of[-1.73,1.73]){box(.34,3.2,.28,x,1.6,.02,m,.012);box(.055,2.78,.14,x+(x<0?.20:-.20),1.39,.075,dark);}box(3.8,.45,.30,0,2.975,.03,m,.012);for(const x of[-.78,.78]){box(1.535,2.66,.07,x,1.37,.07,m,.008);box(.012,2.60,.014,x+(x<0?.76:-.76),1.37,.115,dark);}box(3.18,.065,.40,0,.033,.04,m,.008);for(const x of[-1.9,1.9])box(.12,height,1.95,x,height/2,-.96,m);box(3.8,height,.10,0,height/2,-1.93,dark);
if(height>3.2){const cap=box(3.8,height-3.2,.30,0,(height+3.2)/2,.03,m);cap.name="Ceiling-height elevator enclosure";}
box(1.22,.37,.065,0,2.99,.22,dark,.025);for(const x of[-.62,.62])box(.025,.38,.018,x,2.99,.263,m);for(const y of[2.80,3.18])box(1.26,.022,.018,0,y,.263,m);const canvas=document.createElement('canvas');canvas.width=512;canvas.height=160;const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;const display=new THREE.Mesh(new THREE.PlaneGeometry(1.16,.32),new THREE.MeshBasicMaterial({map}));display.name='Elevator current floor number';display.position.set(0,2.99,.264);root.add(display);
box(.22,.68,.065,1.72,1.35,.22,m,.02);for(const [y,up]of[[1.52,true],[1.2,false]]){const ring=new THREE.Mesh(new THREE.TorusGeometry(.058,.009,8,20),white);ring.position.set(1.72,y,.26);root.add(ring);const points=[[-.03,up?-.015:.015],[0,up?.02:-.02],[.03,up?-.015:.015]].map(([x,yy])=>new THREE.Vector3(x+1.72,y+yy,.266));root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:'#f0f8ff'})));}
// Sculpted wall sconces: projecting metal housings, warm diffusers and local light.
const bronze=new THREE.MeshStandardMaterial({color:'#b89c68',metalness:.8,roughness:.27}),housing=new THREE.MeshStandardMaterial({color:'#22282c',metalness:.6,roughness:.32}),diffuser=new THREE.MeshPhysicalMaterial({color:'#ffedc8',emissive:'#ffbd65',emissiveIntensity:1.8,roughness:.22,clearcoat:.55});
for(const side of[-1,1]){
 const x=side*2.28;
 box(.54,height,2.02,x,height/2,-.95,housing,.008);
 for(const edge of[-1,1])box(.025,height,.04,x+edge*.25,height/2,.085,bronze);
 box(.25,1.30,.13,x,1.95,.16,housing,.015);
 box(.14,1.13,.08,x,1.95,.25,bronze,.012);
 const tube=new THREE.Mesh(new THREE.CylinderGeometry(.038,.038,.96,16),diffuser);tube.position.set(x,1.95,.325);tube.name='Raised warm elevator wall-light diffuser';root.add(tube);
 for(const y of[1.43,2.47]){const cap=new THREE.Mesh(new THREE.CylinderGeometry(.064,.064,.08,16),bronze);cap.position.set(x,y,.325);root.add(cap);box(.11,.045,.15,x,y,.25,housing,.008);}
 const light=new THREE.PointLight('#ffcf91',14,3.5,2);light.position.set(x,1.95,.46);root.add(light);
}
function setLevel(n){root.userData.floor=n;const a=canvas.getContext('2d');a.fillStyle='#080c12';a.fillRect(0,0,512,160);a.fillStyle='#f5f8ff';a.textAlign='center';a.textBaseline='middle';a.font='bold 142px Arial';a.fillText(n===0?'L':String(n),256,85,490);map.needsUpdate=true;display.userData.floor=n;}
setLevel(level);return{root,setLevel};}
