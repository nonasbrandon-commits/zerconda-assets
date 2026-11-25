import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createStoreDeskPhone({add,x,y,z}){
 const plastic=new THREE.MeshStandardMaterial({color:'#252a2e',roughness:.47,metalness:.04});
 const rubber=new THREE.MeshStandardMaterial({color:'#11171b',roughness:.85});
 const keys=new THREE.MeshStandardMaterial({color:'#576168',roughness:.53});
 const trim=new THREE.MeshStandardMaterial({color:'#8a969d',roughness:.35,metalness:.65});
 const screen=new THREE.MeshStandardMaterial({color:'#98b8ad',roughness:.26,emissive:'#34544c',emissiveIntensity:.18});
 // Single inclined, bevelled shell; the base and receiver make physical contact.
 const side=new THREE.Shape();side.moveTo(-.20,.022);side.lineTo(.20,.022);side.lineTo(.20,.065);side.lineTo(-.20,.166);side.closePath();
 const shell=new THREE.ExtrudeGeometry(side,{depth:.435,steps:1,bevelEnabled:true,bevelThickness:.012,bevelSize:.012,bevelSegments:3});shell.rotateY(Math.PI/2);shell.translate(-.2175,0,0);add(shell,plastic,x,y,z);
 function box(w,h,d,px,py,pz,material=plastic,tilt=0){const g=new RoundedBoxGeometry(w,h,d,3,Math.min(.015,w*.2,h*.25,d*.2));g.rotateX(tilt);add(g,material,x+px,y+py,z+pz);}
 const slope=.25,angle=-Math.atan(slope),deck=zz=>.124+zz*slope;
 for(const px of[-.16,.16])for(const pz of[-.15,.15])box(.05,.018,.045,px,.009,pz,rubber);
 // Handset cradle and two hook-switch pads, seated on the sloping shell.
 for(const zz of[-.135,.135]){box(.145,.040,.102,-.133,deck(zz)+.012,zz,rubber,angle);box(.025,.013,.026,-.133,deck(zz)+.018,zz,keys,angle);}
 // Ergonomic receiver: continuous curved grip, rounded earpieces and inset grilles.
 // Cross-section varies along its length, avoiding the previous floating block ends.
 const slices=32,segments=16,positions=[],uv=[],indices=[];
 for(let i=0;i<=slices;i++){const t=i/slices,zz=(t-.5)*.36,end=Math.pow(Math.abs(t-.5)*2,3),halfWidth=.027+.035*end,halfHeight=.023+.009*end,cy=deck(zz)+.054+.012*Math.sin(Math.PI*t);for(let j=0;j<=segments;j++){const a=j/segments*Math.PI*2;positions.push(-.133+Math.cos(a)*halfWidth,cy+Math.sin(a)*halfHeight,zz);uv.push(j/segments,t);if(i<slices&&j<segments){const a=i*(segments+1)+j,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);}}}
 const receiver=new THREE.BufferGeometry();receiver.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));receiver.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));receiver.setIndex(indices);receiver.computeVertexNormals();add(receiver,plastic,x,y,z);
 for(const zz of[-.18,.18]){add(new THREE.SphereGeometry(1,24,12).scale(.062,.032,.023),plastic,x-.133,y+deck(zz)+.054,z+zz);for(let i=-2;i<=2;i++)box(.006,.003,.027,-.133+i*.013,deck(zz)+.026,zz,rubber,angle);}
 // Sloped display and tactile twelve-key dial pad on the right, facing the clerk.
 box(.215,.015,.103,.078,deck(.125)+.008,.125,rubber,angle);box(.186,.003,.074,.078,deck(.125)+.018,.125,screen,angle);
 const c=document.createElement('canvas');c.width=768;c.height=1024;const p=c.getContext('2d');p.clearRect(0,0,768,1024);p.textAlign='center';p.textBaseline='middle';p.fillStyle='#203c35';p.font='bold 46px Arial';p.fillText('ZERCONDA',384,58);p.font='38px monospace';p.fillText('STORE · LINE 1',384,122);p.fillText('READY',384,190);
 const labels=['1','2','3','4','5','6','7','8','9','*','0','#'];for(let row=0;row<4;row++)for(let col=0;col<3;col++){const xx=.147-col*.066,zz=.022-row*.060;box(.052,.014,.045,xx,deck(zz)+.015,zz,keys,angle);p.fillStyle='#f4f6f5';p.font='bold 105px Arial';p.fillText(labels[row*3+col],128+col*256,352+row*192);}
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=4;
 const decal=new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
 // All labels share one atlas/material, but fit their own raised key surfaces.
 function label(w,d,px,zz,yy,u0,v0,uw,vh){const g=new THREE.PlaneGeometry(w,d),a=g.attributes.uv;for(let i=0;i<a.count;i++)a.setXY(i,u0+a.getX(i)*uw,1-(v0+(1-a.getY(i))*vh));g.rotateZ(Math.PI);g.rotateX(-Math.PI/2);g.rotateX(angle);add(g,decal,x+px,y+yy,z+zz);}
 label(.177,.068,.078,.125,deck(.125)+.0205,0,0,1,.25);
 for(let row=0;row<4;row++)for(let col=0;col<3;col++){const xx=.147-col*.066,zz=.022-row*.060;label(.043,.034,xx,zz,deck(zz)+.023,col/3,.25+row*.1875,1/3,.1875);}
 // Speaker slots and a small line indicator, without adding another scene light.
 for(let i=0;i<6;i++)box(.031,.003,.004,.185,deck(.030+i*.018)+.014,.030+i*.018,rubber,angle);
 const led=new THREE.MeshStandardMaterial({color:'#8fd8a4',emissive:'#3d9260',emissiveIntensity:.35,roughness:.4});box(.012,.005,.008,.187,deck(.16)+.017,.16,led,angle);
 // Coiled handset lead rests on the counter rather than hanging through it.
 const points=[];for(let i=0;i<=200;i++){const t=i/200,a=t*Math.PI*40;points.push(new THREE.Vector3(x-.245-.050*Math.sin(Math.PI*t)+.009*Math.cos(a),y+.055+.009*Math.sin(a),z-.13+.23*t));}
 const curve=new THREE.CatmullRomCurve3(points);add(new THREE.TubeGeometry(curve,200,.0035,5,false),rubber);
 const lead=new THREE.CatmullRomCurve3([new THREE.Vector3(x-.16,y+deck(-.15)+.042,z-.15),points[0]]);add(new THREE.TubeGeometry(lead,8,.0035,5,false),rubber);
 return{kind:'corded office desk phone',footprint:{width:.47,depth:.424},newLights:0};
}
