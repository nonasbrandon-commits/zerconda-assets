import * as THREE from 'three';
// Shared, deterministic finishes: four small textures, no asset downloads or extra lights.
export function createHomeFinishes({wall,floorMat,fabric}){
 let seed=464;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 function texture(n,paint,srgb=true){const c=document.createElement('canvas');c.width=c.height=n;const ctx=c.getContext('2d');paint(ctx,n);const t=new THREE.CanvasTexture(c);if(srgb)t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;}
 const oak=texture(1024,(c,n)=>{c.fillStyle='#4c4036';c.fillRect(0,0,n,n);const w=128,len=512;for(let col=0;col<8;col++)for(let row=-1;row<3;row++){const x=col*w,y=row*len+(col%3)*len/3,v=random()*16;c.fillStyle=`rgb(${106+v},${88+v},${72+v})`;c.fillRect(x+1,y+1,w-2,len-2);for(let line=0;line<115;line++){const px=x+random()*w,phase=random()*6;c.strokeStyle=`rgba(${random()>.55?'212,190,157':'35,28,22'},${.05+random()*.14})`;c.lineWidth=.4+random()*1.2;c.beginPath();for(let yy=0;yy<len;yy+=8){const xx=px+Math.sin(yy*.025+phase)*1.7+Math.sin(yy*.007+phase)*3;yy?c.lineTo(xx,y+yy):c.moveTo(xx,y+yy);}c.stroke();}if(random()>.5){const kx=x+25+random()*70,ky=y+80+random()*330;for(let ring=0;ring<5;ring++){c.strokeStyle='rgba(45,32,23,.13)';c.beginPath();c.ellipse(kx,ky,2+ring*1.7,7+ring*5,0,0,Math.PI*2);c.stroke();}}}});oak.repeat.set(8,4);floorMat.map?.dispose();floorMat.map=oak;floorMat.color.set(0xffffff);floorMat.roughness=.44;floorMat.bumpMap=oak;floorMat.bumpScale=.012;
 const plaster=texture(256,(c,n)=>{const data=c.createImageData(n,n);for(let i=0;i<data.data.length;i+=4){const v=120+random()*38;data.data[i]=data.data[i+1]=data.data[i+2]=v;data.data[i+3]=255;}c.putImageData(data,0,0);},false);plaster.repeat.set(5,5);wall.bumpMap=plaster;wall.bumpScale=.018;wall.roughness=.95;
 const weave=texture(128,(c,n)=>{c.fillStyle='#a7a7a7';c.fillRect(0,0,n,n);for(let i=0;i<n;i+=2){c.strokeStyle=i%4?'#919191':'#b5b5b5';c.beginPath();c.moveTo(i,0);c.lineTo(i,n);c.moveTo(0,i);c.lineTo(n,i);c.stroke();}},false);weave.repeat.set(5,5);fabric.bumpMap=weave;fabric.bumpScale=.009;fabric.roughness=.96;
 const rugTex=texture(128,(c,n)=>{c.fillStyle='#cfc6b7';c.fillRect(0,0,n,n);for(let i=0;i<9000;i++){c.fillStyle=random()>.5?'rgba(255,255,255,.16)':'rgba(77,64,49,.12)';c.fillRect(random()*n,random()*n,1,2);}});rugTex.repeat.set(4,4);
 const rug=new THREE.MeshStandardMaterial({color:0xffffff,map:rugTex,roughness:1});const stone=new THREE.MeshStandardMaterial({color:0xd4cbbd,roughness:.34});const darkWood=new THREE.MeshStandardMaterial({color:0x473a30,roughness:.48});const seam=new THREE.MeshStandardMaterial({color:0x555b56,roughness:1});return {rug,stone,darkWood,seam};
}
export function addHomeMouldings(root,box,trim){
 const g=new THREE.Group();g.name='White layered baseboards and crown moulding';root.add(g);
 const run=(x0,z0,x1,z1,y,h,depth)=>{const len=Math.hypot(x1-x0,z1-z0);const o=box(len,h,depth,(x0+x1)/2,y,(z0+z1)/2,trim,g);o.rotation.y=-Math.atan2(z1-z0,x1-x0);};
 for(const level of[0,1]){
  const y=level*3.2;const edges=[[-6.96,7.58,6.96,7.58],[-6.98,-7.58,-6.98,7.58],[6.98,-7.58,6.98,7.58]];
  const front=level?[[ -6.96,-7.58,6.96,-7.58]]:[[-6.96,-7.58,-6.62,-7.58],[-.86,-7.58,2.34,-7.58],[4.66,-7.58,6.96,-7.58]];
  for(const e of[...edges,...front]){run(...e,y+.09,.18,.065);run(...e,y+.19,.035,.085);run(...e,y+.025,.04,.085);}
  for(const e of[...edges,[-6.96,-7.56,6.96,-7.56]]){run(...e,y+(level?3.125:2.91),.07,.11);run(...e,y+(level?3.175:2.96),.045,.15);}
 }
 // Partition trims stop at pocket-door openings.
 for(const [x,z0,z1]of[[-.24,-7.55,-2.83],[-.24,-1.47,-.89]])run(x,z0,x,z1,.09,.18,.06);
 for(const [z,x0,x1]of[[-.69,-6.9,-.45]]){run(x0,z,x1,z,.09,.18,.06);run(x0,z,x1,z,2.91,.07,.11);run(x0,z,x1,z,2.96,.045,.15);}
 for(const [z0,z1]of[[-7.55,.70],[2.30,7.58]]){run(.17,z0,.17,z1,3.29,.18,.065);run(.17,z0,.17,z1,3.39,.035,.085);}run(.17,-7.55,.17,7.58,6.325,.07,.11);run(.17,-7.55,.17,7.58,6.375,.045,.15);
 return g;
}
export function addRecessedLights(root){
 const g=new THREE.Group();g.name='Warm recessed ceiling downlights';root.add(g);const rim=new THREE.MeshStandardMaterial({color:0xf4f1ea,roughness:.35}),lens=new THREE.MeshBasicMaterial({color:0xffedce});
 for(const y of[2.953,6.385])for(const x of[1.25,5.65])for(const z of[-5.8,.5,5.6]){
  const ring=new THREE.Mesh(new THREE.CylinderGeometry(.115,.115,.025,20),rim);ring.position.set(x,y,z);g.add(ring);const disc=new THREE.Mesh(new THREE.CircleGeometry(.085,20),lens);disc.rotation.x=Math.PI/2;disc.position.set(x,y-.014,z);g.add(disc);
 }
 return g;
}

export function addFramedHomeArt(root,box,options={}){
 const g=new THREE.Group();g.name=options.name||'Framed tropical sunset beside the stairs';g.position.set(...(options.position||[-3.45,1.72,-.675]));g.rotation.y=options.angle||0;g.scale.setScalar(options.scale??.88);root.add(g);
 const black=new THREE.MeshStandardMaterial({color:0x25211d,roughness:.42}),gold=new THREE.MeshStandardMaterial({color:0xb18b4b,metalness:.72,roughness:.33});
 const frame=(w,h,d,z,m)=>{box(w,.075,d,0,h/2,z,m,g);box(w,.075,d,0,-h/2,z,m,g);box(.075,h,d,-w/2,0,z,m,g);box(.075,h,d,w/2,0,z,m,g);};
 box(4.55,2.32,.07,0,0,0,black,g);frame(4.55,2.32,.12,.045,black);frame(4.39,2.16,.055,.085,gold);frame(4.29,2.06,.035,.103,black);
 const texture=new THREE.TextureLoader().load(new URL(options.image||'./assets/home-sunset-v464.jpg',import.meta.url).href);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;
 const print=new THREE.Mesh(new THREE.PlaneGeometry(4.20,2.10),new THREE.MeshStandardMaterial({map:texture,roughness:.90,metalness:0,emissive:0xffffff,emissiveMap:texture,emissiveIntensity:.10}));print.position.z=.13;print.name=options.image?'Mountain lake print':'Tropical sunset print';g.add(print);return g;
}
