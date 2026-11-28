import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {createPierFernPlanter} from './pier-fern-planter.js?v=20261120-standing-attendant-v167';
export function createZViewGroundLobby(parent,{x,z,lobbyY,finishes,solids}){
 const root=new THREE.Group();root.name='Z-View ground lobby · reference marble, brass and cream';root.position.y=lobbyY;root.userData.renderBudgetIgnore=true;parent.add(root);const batches=new Map(),seats=[];
 const standard=(color,roughness=.6,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness}),black=standard(0x151e28,.3,.6),gold=standard(0xbca16b,.28,.72),cream=standard(0xe3dfd1,.88),pillow=standard(0xaaa99e,.92),warm=new THREE.MeshBasicMaterial({color:0xffd19a,toneMapped:false}),blue=new THREE.MeshBasicMaterial({color:0x159fff,toneMapped:false});
 const marble=finishes.marble.clone();marble.color.set(0x77818c);marble.roughness=.19;marble.metalness=.22;
 function add(g,m,px=0,py=0,pz=0,rx=0,ry=0,rz=0){const matrix=new THREE.Matrix4().compose(new THREE.Vector3(px,py,pz),new THREE.Quaternion().setFromEuler(new THREE.Euler(rx,ry,rz)),new THREE.Vector3(1,1,1));if(!g.attributes.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));g.applyMatrix4(matrix);const a=batches.get(m)||[];a.push(g.index?g.toNonIndexed():g);batches.set(m,a);if(g.index)g.dispose();}
 const box=(w,h,d,px,py,pz,m,r=0)=>add(new RoundedBoxGeometry(w,h,d,2,Math.min(.065,w/5,h/5,d/5)),m,px,py,pz,0,r);
 const ring=(r,y,t,m)=>add(new THREE.TorusGeometry(r,t,8,128),m,0,y,0,Math.PI/2);
 const shape=new THREE.Shape();shape.absarc(0,0,7.38,0,Math.PI*2,false);const hole=new THREE.Path();hole.moveTo(-1.77,-1.77);hole.lineTo(-1.77,1.77);hole.lineTo(1.77,1.77);hole.lineTo(1.77,-1.77);hole.closePath();shape.holes.push(hole);add(new THREE.ShapeGeometry(shape,96),marble,0,.012,0,-Math.PI/2);
 for(const[r,width]of[[2.72,.12],[6.8,.14],[7.28,.08]])add(new THREE.RingGeometry(r-width,r,128),black,0,.018,0,-Math.PI/2);
 // Curved dark fascia, warm soffit strips and a restrained blue exterior edge.
 add(new THREE.RingGeometry(2.65,8.33,128),standard(0x6c665e,.82,.06),0,4.30,0,Math.PI/2);
 add(new THREE.CylinderGeometry(8.30,8.30,.25,128,1,true),black,0,4.39,0);ring(8.32,4.45,.04,blue);ring(8.18,4.27,.026,warm);ring(7.08,4.27,.025,warm);ring(3.03,4.28,.026,warm);ring(5.02,4.29,.025,blue);
 for(let i=0;i<28;i++){const a=i*Math.PI/14;add(new THREE.CircleGeometry(.073,16),warm,Math.cos(a)*7.65,4.285,Math.sin(a)*7.65,Math.PI/2);}
 // Reception stays in the original footprint, with a softly curved fluted face.
 box(3.0,1.03,1.2,-4.2,.515,3.3,gold);box(3.18,.10,1.34,-4.2,1.08,3.3,black);box(2.94,.025,.03,-4.2,.14,3.915,warm);
 for(let i=0;i<17;i++)box(.035,.75,.027,-5.52+i*.165,.56,3.908,black);
 box(.47,.025,.30,-4.2,1.15,3.24,black);box(.45,.32,.035,-4.2,1.34,3.23,black);
 function sofa(cx,cz,angle){const local=(lx,ly,lz)=>({x:cx+lx*Math.cos(angle)+lz*Math.sin(angle),y:ly,z:cz-lx*Math.sin(angle)+lz*Math.cos(angle)}),b=(w,h,d,lx,ly,lz,m)=>{const p=local(lx,ly,lz);box(w,h,d,p.x,p.y,p.z,m,angle);};
  b(2.34,.13,1.0,0,.17,0,black);b(2.30,.27,.91,0,.35,0,cream);b(2.31,.69,.17,0,.67,-.43,cream);
  for(const s of[-1,1]){b(.16,.54,1.0,s*1.1,.55,0,cream);b(.055,.15,.055,s*.92,.075,.30,gold);b(.055,.15,.055,s*.92,.075,-.30,gold);b(.48,.20,.77,s*.52,.52,.035,cream);b(.38,.35,.10,s*.77,.76,-.30,pillow);const p=local(s*.50,0,.08);seats.push({x:x+p.x,z:z+p.z,facing:angle,sitHeight:lobbyY+.57,kind:'Z-View lobby sofa'});}
  const w=Math.abs(Math.cos(angle))*2.4+Math.abs(Math.sin(angle))*1.03,d=Math.abs(Math.sin(angle))*2.4+Math.abs(Math.cos(angle))*1.03;solids.push({x:cx,z:cz,w,d});
  const table=local(0,0,1.35);add(new THREE.CylinderGeometry(.43,.39,.055,36),black,table.x,.51,table.z);add(new THREE.CylinderGeometry(.055,.07,.48,16),gold,table.x,.255,table.z);solids.push({x:table.x,z:table.z,w:.88,d:.88});
 }
 sofa(-4.8,-1.1,Math.PI/2);sofa(4.8,-1.1,-Math.PI/2);sofa(-3.25,-4.55,.6);sofa(3.25,-4.55,-.6);
 const planters=[];for(const[px,pz]of[[-3.6,4.8],[3.6,4.8],[-5.2,-3.0],[5.2,-3.0]]){planters.push(createPierFernPlanter(root,{x:px,y:0,z:pz,height:2.1}));solids.push({x:px,z:pz,w:1.02,d:1.02});}
 // Raised marquee: lettering is a material on modeled signage, not a scene image.
 box(5.34,.88,.14,0,3.94,7.77,black);box(5.39,.035,.16,0,4.39,7.78,gold);box(5.39,.035,.16,0,3.49,7.78,gold);for(const s of[-1,1])box(.035,.9,.16,s*2.68,3.94,7.78,gold);
 const c=document.createElement('canvas');c.width=2048;c.height=384;const a=c.getContext('2d');a.fillStyle='#0c1722';a.fillRect(0,0,c.width,c.height);const glow=a.createLinearGradient(0,330,0,384);glow.addColorStop(0,'#003a6c00');glow.addColorStop(1,'#12a8ff');a.fillStyle=glow;a.fillRect(0,300,2048,84);const ink=a.createLinearGradient(0,80,0,285);ink.addColorStop(0,'#ffffff');ink.addColorStop(.5,'#c9d5df');ink.addColorStop(.55,'#647783');ink.addColorStop(1,'#eaf3f9');a.font='italic bold 245px Arial';a.textAlign='center';a.textBaseline='middle';a.lineWidth=8;a.strokeStyle='#03090e';a.strokeText('Z-VIEW',1024,190);a.fillStyle=ink;a.fillText('Z-VIEW',1024,190);const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;const sign=new THREE.Mesh(new THREE.PlaneGeometry(5.18,.76),new THREE.MeshBasicMaterial({map:tex,toneMapped:false}));sign.position.set(0,3.94,7.86);root.add(sign);
 // Small tower crest and blue arc echo the supplied entrance reference.
 add(new THREE.TorusGeometry(.66,.035,8,48,Math.PI),blue,0,4.36,7.81,0,0,0);box(.055,.85,.07,0,4.70,7.82,cream);for(const side of[-1,1])box(.04,.78,.065,side*.14,4.67,7.82,cream,-side*.15);
 for(const[m,gs]of batches){const mesh=new THREE.Mesh(mergeGeometries(gs,false),m);mesh.receiveShadow=true;mesh.castShadow=false;root.add(mesh);for(const g of gs)g.dispose();}
 root.userData.groundLobby={seatingGroups:4,seats:seats.length,planters:4,downlights:28,staticBatches:batches.size,addedDynamicLights:0,reference:'User supplied Z-View ground entrance reference'};
 return{root,seats,planters,readyPromise:Promise.all(planters.map(p=>p.readyPromise))};
}
