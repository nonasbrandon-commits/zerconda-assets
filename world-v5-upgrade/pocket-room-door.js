import * as THREE from 'three';
let wood;
export function createPocketRoomDoor(parent,{width=1.3,height=2.45}={}){
 if(!wood){const c=document.createElement('canvas');c.width=256;c.height=512;const ctx=c.getContext('2d');ctx.fillStyle='#78502d';ctx.fillRect(0,0,256,512);for(let i=0;i<1200;i++){ctx.strokeStyle=`rgba(${i%2?34:212},${i%2?21:156},${i%2?12:93},.12)`;ctx.beginPath();const x=(i*41.73)%256;ctx.moveTo(x,0);for(let y=0;y<=512;y+=8)ctx.lineTo(x+Math.sin(y*.017+i)*1.4,y);ctx.stroke();}const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;wood=new THREE.MeshStandardMaterial({map,roughness:.78,color:0xb99b7c});}
 const trim=new THREE.MeshStandardMaterial({color:0xf2eee6,roughness:.65}),iron=new THREE.MeshStandardMaterial({color:0x161a19,metalness:.65,roughness:.38}),recess=new THREE.MeshStandardMaterial({color:0x080b0a,roughness:.9}),leaf=new THREE.Group();leaf.name='Wood pocket door · recessed pulls';parent.add(leaf);
 function box(g,w,h,d,x,y,z,m){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
 box(leaf,width,height,.065,0,height/2,0,wood);
 for(const side of[-1,1]){for(const x of[-width/2+.055,width/2-.055])box(leaf,.11,height,.018,x,height/2,side*.041,wood);for(const y of[.07,height/2,height-.07])box(leaf,width,.12,.018,0,y,side*.041,wood);
 const span=width-.22,half=(height-.34)/2;
 for(const sign of[-1,1]){const top=box(leaf,Math.hypot(span/2,half-.08),.075,.015,sign*span/4,height*.74,side*.043,wood);top.rotation.z=sign*Math.atan2(half-.08,span/2);const lower=box(leaf,Math.hypot(span,half-.08),.075,.015,0,height*.26,side*.043,wood);lower.rotation.z=sign*Math.atan2(half-.08,span);}
 // Flush black inset pull remains inside the wall pocket clearance.
 const px=width/2-.14;box(leaf,.085,.30,.010,px,1.08,side*.052,iron);box(leaf,.047,.23,.003,px,1.08,side*.058,recess);box(leaf,.008,.20,.004,px+.018,1.08,side*.061,iron);}
 const frame=new THREE.Group();frame.name='White pocket doorway casing';parent.parent?.add(frame);frame.position.copy(parent.position);frame.rotation.copy(parent.rotation);
 for(const side of[-1,1]){for(const x of[-width/2-.035,width/2+.035])box(frame,.11,height+.08,.045,x,height/2,side*.115,trim);box(frame,width+.20,.14,.055,0,height+.04,side*.115,trim);box(frame,width+.29,.035,.075,0,height+.125,side*.115,trim);}
 return{leaf,frame};
}
