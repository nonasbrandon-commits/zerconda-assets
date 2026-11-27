import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
// A fully modeled stall, sharing bottles, toys and bulb geometry. No image panels stand in for the booth.
export function createRingTossBooth(parent,{x=0,z=0}={}){
 const root=new T.Group();root.name='Ring Toss · timber and navy marquee booth';const meshes=[],stats={bottles:0,prizes:0,bulbs:0};
 function grain(base,lines,fabric=false){const c=document.createElement('canvas');c.width=128;c.height=256;const a=c.getContext('2d');a.fillStyle=base;a.fillRect(0,0,128,256);let seed=391;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);for(let i=0;i<500;i++){a.strokeStyle=lines[i%lines.length];a.lineWidth=fabric?.4:.5+rand();const xx=rand()*128;a.beginPath();a.moveTo(xx,0);for(let y=0;y<=256;y+=8)a.lineTo(xx+Math.sin(y*.035+i)* (fabric?.15:1.3),y);a.stroke();}const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
 const timberMap=grain('#99622f',['#88502566','#c38b4a77','#3c241a33']),navyMap=grain('#132a42',['#34526a55','#09192d66']),clothMap=grain('#ffffff',['#a5a5a525','#eeeeee88'],true);
 const wood=new T.MeshStandardMaterial({map:timberMap,bumpMap:timberMap,bumpScale:.025,roughness:.68}),navy=new T.MeshStandardMaterial({map:navyMap,bumpMap:navyMap,bumpScale:.01,roughness:.8}),gold=new T.MeshStandardMaterial({color:0xd6a34d,metalness:.72,roughness:.3}),black=new T.MeshStandardMaterial({color:0x101319,metalness:.55,roughness:.42}),cream=new T.MeshStandardMaterial({color:0xf1e5ce,roughness:.7}),fabricBlue=new T.MeshStandardMaterial({color:0x15314f,map:clothMap,roughness:.9,side:T.DoubleSide}),fabricCream=new T.MeshStandardMaterial({color:0xf7eedb,map:clothMap,roughness:.9,side:T.DoubleSide}),bulb=new T.MeshStandardMaterial({color:0xffdfa0,emissive:0xffb640,emissiveIntensity:2.5,roughness:.3}),amber=new T.MeshStandardMaterial({color:0xffd282,emissive:0xffaa38,emissiveIntensity:1.4,roughness:.35});
 const red=new T.MeshStandardMaterial({color:0xd91f2e,metalness:.15,roughness:.22}),blue=new T.MeshStandardMaterial({color:0x1741e3,metalness:.18,roughness:.2}),yellow=new T.MeshStandardMaterial({color:0xf5bb12,metalness:.15,roughness:.22}),green=new T.MeshStandardMaterial({color:0x56a32c,roughness:.86}),pink=new T.MeshStandardMaterial({color:0xf09bb7,roughness:.9}),purple=new T.MeshStandardMaterial({color:0xa054a4,roughness:.9}),brown=new T.MeshStandardMaterial({color:0xb87a36,roughness:1}),ivory=new T.MeshStandardMaterial({color:0xe8dfc9,roughness:1}),gray=new T.MeshStandardMaterial({color:0x6c6a69,roughness:1});
 function add(geo,mat,px,py,pz,sx=1,sy=1,sz=1){const m=new T.Mesh(geo,mat);m.position.set(px,py,pz);m.scale.set(sx,sy,sz);root.add(m);meshes.push(m);return m;}
 const cube=new T.BoxGeometry(1,1,1),sphere=new T.SphereGeometry(1,12,9),ringGeo=new T.TorusGeometry(.27,.045,8,24);
 const box=(w,h,d,px,py,pz,m)=>add(cube,m,px,py,pz,w,h,d),oval=(px,py,pz,sx,sy,sz,m)=>add(sphere,m,px,py,pz,sx,sy,sz);
 function ring(px,py,pz,m,scale=1){return add(ringGeo,m,px,py,pz,scale,scale,scale);}
 box(13,.22,8.8,0,.21,0,wood);box(13,.15,8.9,0,.1,0,black);
 // Individually raised siding reads as timber from the sides and rear as well as the front.
 for(let i=0;i<26;i++)box(.485,4.15,.16,-6.25+i*.5,2.35,-4.22,navy);
 for(const sign of[-1,1]){for(let i=0;i<17;i++)box(.16,4.15,.485,sign*6.35,2.35,-4+i*.5,navy);for(const zz of[-4.2,4.15])box(.28,4.65,.3,sign*6.35,2.55,zz,wood);box(.28,.22,8.7,sign*6.35,4.72,0,wood);box(.30,.18,8.7,sign*6.35,.42,0,wood);}
 for(const yy of[.43,4.65])box(13,.22,.27,0,yy,-4.22,wood);
 const roof=box(13.6,.16,8.9,0,4.84,-.1,navy);roof.rotation.x=-.035;for(const side of[-1,1])box(.17,.22,9.1,side*6.72,4.88,-.1,gold);
 // Counter and five inset front panels.
 box(12.6,1.05,.25,0,.89,3.98,wood);box(13,.20,1.8,0,1.49,3.45,wood);box(13,.065,1.87,0,1.61,3.45,gold);
 for(let i=0;i<5;i++){const xx=(i-2)*2.48;box(2.28,.84,.10,xx,.91,4.15,gold);box(2.16,.71,.11,xx,.91,4.22,black);box(2.04,.60,.12,xx,.91,4.29,navy);}
 box(12.6,.15,1.2,0,1.47,.95,wood);box(12.6,.16,.65,0,2.96,-2.72,wood);
 // Bottle stacks: three colored trays with nine neck targets apiece.
 const bottleGeo=new T.LatheGeometry([[0,0],[.15,0],[.18,.04],[.18,.47],[.14,.59],[.065,.67],[.058,.95],[.07,.97]].map(v=>new T.Vector2(...v)),16);
 for(const [i,mat]of[blue,yellow,red].entries()){const xx=(i-1)*3.65;add(new T.CylinderGeometry(1.15,1.15,.13,40),gold,xx,1.61,1.02);add(new T.CylinderGeometry(1.08,1.08,.08,40),cream,xx,1.71,1.02);for(let row=0;row<3;row++)for(let col=0;col<3;col++){add(bottleGeo,mat,xx+(col-1)*.43,1.76,.58+row*.43);stats.bottles++;}}
 // Toy prizes, modeled as soft rounded forms rather than flat billboards.
 function eyes(xx,yy,zz,spread=.115){for(const side of[-1,1])oval(xx+side*spread,yy,zz,.027,.033,.025,black);}
 function teddy(xx){oval(xx,3.33,-2.7,.29,.35,.21,brown);oval(xx,3.81,-2.69,.28,.27,.22,brown);for(const s of[-1,1]){oval(xx+s*.22,4.02,-2.7,.105,.11,.08,brown);oval(xx+s*.32,3.39,-2.65,.12,.23,.12,brown);oval(xx+s*.17,3.08,-2.47,.15,.12,.20,brown);}oval(xx,3.72,-2.47,.14,.11,.08,ivory);oval(xx,3.78,-2.39,.045,.033,.03,black);oval(xx,3.34,-2.48,.19,.24,.035,ivory);eyes(xx,3.88,-2.48);}
 function dog(xx){oval(xx,3.3,-2.7,.24,.28,.2,ivory);oval(xx,3.7,-2.7,.29,.27,.22,gray);for(const s of[-1,1]){const ear=add(new T.ConeGeometry(.12,.27,4),gray,xx+s*.19,3.98,-2.7);ear.rotation.z=-s*.15;oval(xx+s*.12,3.09,-2.48,.105,.11,.16,ivory);oval(xx+s*.115,3.73,-2.49,.09,.105,.035,ivory);}oval(xx,3.61,-2.43,.15,.11,.08,ivory);oval(xx,3.67,-2.34,.05,.04,.035,black);eyes(xx,3.79,-2.445,.105);}
 function dino(xx){oval(xx,3.34,-2.7,.25,.33,.21,green);oval(xx,3.76,-2.68,.25,.23,.21,green);oval(xx+.12,3.71,-2.46,.29,.13,.15,green);oval(xx,3.32,-2.48,.16,.23,.035,yellow);for(const s of[-1,1]){oval(xx+s*.18,3.08,-2.49,.14,.1,.17,green);oval(xx+s*.25,3.45,-2.56,.12,.13,.09,green);}eyes(xx+.03,3.83,-2.46,.11);for(let i=0;i<3;i++)add(new T.ConeGeometry(.06,.13,4),yellow,xx-.13,3.44+i*.14,-2.89);}
 function unicorn(xx){oval(xx,3.32,-2.7,.25,.28,.19,pink);oval(xx,3.73,-2.65,.23,.28,.18,pink);oval(xx+.1,3.63,-2.47,.22,.11,.12,pink);for(const s of[-1,1]){oval(xx+s*.17,3.09,-2.49,.12,.12,.16,pink);oval(xx+s*.16,3.97,-2.67,.07,.13,.06,pink);}add(new T.ConeGeometry(.06,.30,10),gold,xx+.01,4.11,-2.52);for(let i=0;i<4;i++)oval(xx-.15,3.5+i*.12,-2.76,.09,.09,.10,purple);eyes(xx+.01,3.78,-2.48,.105);}
 for(const [xx,kind]of[[-5.1,teddy],[-3.65,dog],[-2.2,dino],[-.75,unicorn],[.75,unicorn],[2.2,dino],[3.65,dog],[5.1,teddy]]){kind(xx);stats.prizes++;}
 // Spare throwing rings displayed inside both front posts.
 for(const side of[-1,1])for(let row=0;row<2;row++)for(let i=0;i<3;i++)ring(side*5.55+(i-1)*.23,2.15+row*.65,2.8,[red,yellow,blue][i],.75);
 // Striped cloth awning and scalloped front edge.
 for(let i=0;i<20;i++){const xx=-6.5+(i+.5)*.65,mat=i%2?fabricCream:fabricBlue,awning=box(.65,.07,2.1,xx,4.48,4.0,mat);awning.rotation.x=.17;const shape=new T.Shape();shape.moveTo(-.325,0);shape.lineTo(.325,0);shape.lineTo(.325,-.15);shape.quadraticCurveTo(0,-.37,-.325,-.15);shape.closePath();add(new T.ShapeGeometry(shape,10),mat,xx,4.32,5.04);}
 box(13.1,.065,.07,0,4.38,5.055,gold);
 // Raised marquee silhouette, gold perimeter and custom gold serif lettering.
 function marquee(width,height){const s=new T.Shape();s.moveTo(-width/2,-height/2);s.lineTo(width/2,-height/2);s.lineTo(width/2,height/2-.14);s.lineTo(width*.27,height/2-.14);s.quadraticCurveTo(0,height/2+.35,-width*.27,height/2-.14);s.lineTo(-width/2,height/2-.14);s.closePath();return new T.ExtrudeGeometry(s,{depth:.18,bevelEnabled:false,curveSegments:24});}
 add(marquee(13.45,1.6),gold,0,5.29,4.23);add(marquee(13.2,1.35),wood,0,5.29,4.43);add(marquee(12.99,1.16),navy,0,5.29,4.63);
 const canvas=document.createElement('canvas');canvas.width=1536;canvas.height=256;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,1536,256);ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='bold 166px Georgia, serif';ctx.lineWidth=6;ctx.strokeStyle='#100d09';ctx.strokeText('RING TOSS',768,131,1460);const gradient=ctx.createLinearGradient(0,45,0,215);gradient.addColorStop(0,'#fff0bc');gradient.addColorStop(.45,'#d99b3e');gradient.addColorStop(.65,'#ffefbb');gradient.addColorStop(1,'#9a581c');ctx.fillStyle=gradient;ctx.fillText('RING TOSS',768,131,1460);const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;add(new T.PlaneGeometry(8.6,1.32),new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}),0,5.31,4.832);
 for(const side of[-1,1])for(let i=0;i<3;i++){const r=ring(side*5.13+(i-1)*.35,5.31+(i%2)*.12,4.86,[red,yellow,blue][i],.95);r.rotation.z=i*.6;}
 for(let i=0;i<45;i++){const xx=-6.55+i*13.1/44,top=5.93+.26*Math.max(0,1-(xx/3.7)**2);for(const yy of[4.55,top]){oval(xx,yy,4.9,.055,.055,.045,bulb);stats.bulbs++;}}
 for(const side of[-1,1])for(let i=0;i<6;i++){oval(side*6.55,4.75+i*.2,4.9,.055,.055,.045,bulb);stats.bulbs++;}
 for(let i=0;i<25;i++){oval(-6+i*.5,4.1,4.77,.045,.045,.045,bulb);stats.bulbs++;}
 // Warm lanterns on the outer timber posts.
 for(const side of[-1,1]){const xx=side*6.36;box(.12,.6,.13,xx,3.8,4.4,black);box(.33,.47,.28,xx,3.62,4.65,amber);for(const sx of[-.18,.18])for(const sz of[-.16,.16])box(.025,.54,.025,xx+sx,3.62,4.65+sz,black);box(.43,.065,.38,xx,3.35,4.65,black);const cap=add(new T.ConeGeometry(.32,.21,4),black,xx,3.99,4.65);cap.rotation.y=Math.PI/4;}
 // Merge per material to keep this detailed single booth inexpensive to draw.
 const groups=new Map(),geos=new Set();for(const m of meshes){m.updateMatrix();const g=m.geometry.clone().applyMatrix4(m.matrix),list=groups.get(m.material)||[];list.push(g.index?g.toNonIndexed():g);groups.set(m.material,list);geos.add(m.geometry);root.remove(m);}
 let triangles=0;for(const [material,parts]of groups){const geo=mergeGeometries(parts);parts.forEach(g=>g.dispose());const mesh=new T.Mesh(geo,material);mesh.name='Ring Toss · '+(material===bulb?'marquee bulbs':material===wood?'grained timber':material===navy?'navy siding':'crafted display');mesh.receiveShadow=true;root.add(mesh);triangles+=geo.attributes.position.count/3;}geos.forEach(g=>g.dispose());
 root.userData.ringToss={...stats,batches:groups.size,triangles,referenceStyle:'navy, timber, gold, striped awning, prizes and bottle trays'};root.position.set(x,0,z);parent.add(root);return root;
}
