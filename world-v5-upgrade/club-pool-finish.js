import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function createClubPoolFinish(parent,{pockets=[]}={}){
 const root=new T.Group();root.name='8-ball pool · black marble and brass';parent.add(root);const bins=new Map(),mat=(color,roughness=.5,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness}),black=mat('#12181b',.3,.2),gold=mat('#b99858',.3,.7),felt=mat('#24634f',.96),hole=mat('#050809',1),glow=mat('#f8d9a2');glow.emissive.set('#ffc56e');glow.emissiveIntensity=.8;
 function add(g,m,x,y,z){g.translate(x,y,z);const a=bins.get(m)||[];a.push(g);bins.set(m,a)}
 function box(w,h,d,x,y,z,m){add(new T.BoxGeometry(w,h,d),m,x,y,z)}
 function cyl(r,h,x,y,z,m){add(new T.CylinderGeometry(r,r,h,24),m,x,y,z)}
 box(3.08,.45,1.72,3,5.05,-.3,black);box(2.7,.08,1.35,3,5.32,-.3,felt);
 for(const s of[-1,1]){box(3.04,.13,.14,3,5.40,-.3+s*.75,black);box(.14,.13,1.48,3+s*1.45,5.4,-.3,black);box(3.05,.025,.025,3,5.15,-.3+s*.87,gold);box(.025,.025,1.72,3+s*1.55,5.15,-.3,gold);box(3,.025,.025,3,4.81,-.3+s*.78,glow);for(let i=-2;i<=2;i++)if(i)box(.024,.005,.024,3+i*.46,5.468,-.3+s*.75,gold);}
 for(const x of[-1.1,1.1])for(const z of[-.58,.58]){box(.22,.7,.22,3+x,4.95,-.3+z,black);box(.235,.045,.235,3+x,4.64,-.3+z,gold);}
 for(const[x,z]of pockets){const g=new T.CircleGeometry(.085,24);g.rotateX(-Math.PI/2);add(g,hole,3+x,5.469,-.3+z);}
 // Pendants use emissive undersides without adding expensive dynamic lights.
 box(2.3,.075,.09,3,8.88,-.3,gold);for(const x of[2.2,3,3.8]){cyl(.015,.55,x,8.57,-.3,gold);add(new T.CylinderGeometry(.12,.30,.25,32),black,x,8.17,-.3);cyl(.302,.026,x,8.045,-.3,gold);cyl(.26,.012,x,8.025,-.3,glow);}
 const lamp=new T.PointLight(0xffdfad,1.15,9,2);lamp.position.set(3,7.7,-.3);lamp.name='Pool table warm pendant light';root.add(lamp);
 function picture(text,x,y,z,w,h,angle=0,art=false){const c=document.createElement('canvas');c.width=1024;c.height=art?640:256;const a=c.getContext('2d');a.fillStyle='#11191d';a.fillRect(0,0,c.width,c.height);a.strokeStyle='#b99858';a.lineWidth=12;a.strokeRect(7,7,c.width-14,c.height-14);if(art){for(let i=0;i<7;i++){const px=160+(i%4)*230,py=160+Math.floor(i/4)*260;a.fillStyle=['#d4ab2b','#294f9c','#c74c43','#6a337e','#df9827','#3d7350','#713d33'][i];a.beginPath();a.arc(px,py,80,0,Math.PI*2);a.fill();a.fillStyle='#f2e9d5';a.beginPath();a.arc(px,py,34,0,Math.PI*2);a.fill();a.fillStyle='#161b1e';a.font='bold 38px sans-serif';a.textAlign='center';a.textBaseline='middle';a.fillText(String(i+1),px,py);}}else{a.fillStyle='#f4e7c9';a.font='bold 108px sans-serif';a.textAlign='center';a.textBaseline='middle';a.fillText(text,512,132,940);}const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;const o=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:t,toneMapped:false}));o.name=art?'Billiard ball wall art':'8-BALL POOL illuminated sign';o.position.set(x,y,z);o.rotation.y=angle;root.add(o);}
 picture('8-BALL POOL',3,8.05,-7.35,7.2,1.05);picture('',12,7.1,7.66,4.1,2.4,Math.PI,true);
 for(const x of[-2.4,8.4]){box(1.2,1.85,.12,x,6.5,-7.49,black);for(const y of[5.75,7.25])box(1.3,.08,.24,x,y,-7.35,gold);for(let i=0;i<5;i++){const g=new T.CylinderGeometry(.012,.025,1.55,8);g.rotateZ((i-2)*.016);add(g,i%2?gold:black,x-.4+i*.2,6.5,-7.30);}}
 for(const[m,gs]of bins){const mesh=new T.Mesh(mergeGeometries(gs,false),m);mesh.receiveShadow=true;root.add(mesh);gs.forEach(g=>g.dispose());}root.userData.poolUpgrade={table:'black and brass',pendants:3,cueRacks:2,wallArt:1,physicsPreserved:true};return{root};
}
