import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
let template;
export function createPorchPlanter(parent,x,z,ground=.02){
 if(!template)template=build();const root=template.clone(true);root.name='White cross-braced porch planter';root.position.set(x,ground,z);parent.add(root);return root;
}
function build(){
 const root=new THREE.Group(),white=new THREE.MeshStandardMaterial({color:'#f1eee6',roughness:.48}),soil=new THREE.MeshStandardMaterial({color:'#30271c',roughness:1}),stem=new THREE.MeshStandardMaterial({color:'#426c24',roughness:.7}),parts=new Map();
 function add(geo,mat,x=0,y=0,z=0,angle=0){geo.rotateZ(angle);geo.translate(x,y,z);const a=parts.get(mat)||[];a.push(geo.index?geo.toNonIndexed():geo);parts.set(mat,a);}
 function box(w,h,d,x,y,z,angle=0){add(new RoundedBoxGeometry(w,h,d,1,Math.min(.008,w/4,h/4,d/4)),white,x,y,z,angle);}
 const W=1.65,D=.68,H=.68;
 // Hollow painted timber box, recessed panel faces and projecting cap/base mouldings.
 for(const side of[-1,1]){box(W,.55,.045,0,.34,side*(D/2-.025));box(.045,.55,D,side*(W/2-.025),.34,0);for(const xx of[-W/2+.045,0,W/2-.045])box(.07,H,.055,xx,H/2,side*(D/2+.018));for(const yy of[.105,H-.105])box(W,.07,.055,0,yy,side*(D/2+.018));
  for(const cx of[-W/4,W/4])for(const a of[-1,1])box(Math.hypot(W/2-.14,H-.25),.035,.032,cx,H/2,side*(D/2+.052),a*Math.atan2(H-.25,W/2-.14));
  box(W+.08,.06,.09,0,H,side*(D/2+.015));box(W+.08,.07,.09,0,.055,side*(D/2+.015));
  box(.09,.06,D,side*(W/2+.015),H,0);box(.09,.07,D,side*(W/2+.015),.055,0);
  // End panels carry the same white X detail.
  for(const a of[-1,1]){const g=new THREE.BoxGeometry(.035,.035,Math.hypot(D-.12,H-.24));g.rotateX(a*Math.atan2(H-.24,D-.12));add(g,white,side*(W/2+.035),H/2,0);}
 }
 add(new THREE.BoxGeometry(W-.12,.045,D-.12),soil,0,H-.06,0);
 const leafGeometry=new THREE.BufferGeometry(),pos=[],uv=[],indices=[];const rows=16,cols=8;
 for(let j=0;j<=rows;j++)for(let i=0;i<=cols;i++){const t=j/rows,u=i/cols*2-1,width=Math.pow(Math.sin(Math.PI*t),.72)*.5;pos.push(u*width,t,.07*Math.sin(Math.PI*t)*(1-u*u)+.11*t*t+.016*Math.sin(t*26)*u*u);uv.push(i/cols,t);if(i<cols&&j<rows){const k=j*(cols+1)+i;indices.push(k,k+1,k+cols+1,k+1,k+cols+2,k+cols+1);}}
 leafGeometry.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));leafGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));leafGeometry.setIndex(indices);leafGeometry.computeVertexNormals();
 function leafMaterial(coleus=false){const c=document.createElement('canvas');c.width=256;c.height=512;const a=c.getContext('2d');const g=a.createLinearGradient(0,0,256,0);if(coleus){g.addColorStop(0,'#7f9a32');g.addColorStop(.15,'#9b1935');g.addColorStop(.5,'#641a2e');g.addColorStop(.85,'#ad2940');g.addColorStop(1,'#a4b448');}else{g.addColorStop(0,'#345714');g.addColorStop(.45,'#437f21');g.addColorStop(.53,'#679735');g.addColorStop(1,'#284f12');}a.fillStyle=g;a.fillRect(0,0,256,512);a.lineWidth=2;a.strokeStyle=coleus?'#ce738466':'#a3bd6880';a.beginPath();a.moveTo(128,0);a.lineTo(128,512);a.stroke();for(let i=0;i<13;i++)for(const side of[-1,1]){const y=28+i*37;a.lineWidth=1;a.beginPath();a.moveTo(128,y);a.quadraticCurveTo(128+side*50,y+20,128+side*128,y+58);a.stroke();}const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;return new THREE.MeshStandardMaterial({map,roughness:coleus?.83:.38,metalness:0,side:THREE.DoubleSide});}
 const green=leafMaterial(),red=leafMaterial(true),leafParts=new Map([[green,[]],[red,[]]]);let seed=19;const rand=()=>((seed=seed*16807%2147483647)/2147483647);const dummy=new THREE.Object3D();
 function leaf(x,y,z,angle,tilt,length,width,material){dummy.position.set(x,y,z);dummy.rotation.set(tilt,angle,(rand()-.5)*.35);dummy.scale.set(width,length,length);dummy.updateMatrix();leafParts.get(material).push(leafGeometry.clone().applyMatrix4(dummy.matrix).toNonIndexed());}
 // Upright glossy ZZ-like foliage with paired leaflets on individual stems.
 for(let n=0;n<13;n++){const x=(rand()-.5)*1.25,z=(rand()-.5)*.40,height=.52+rand()*.48,lean=(rand()-.5)*.3;const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(x,H-.04,z),new THREE.Vector3(x+lean*.3,H+height*.5,z),new THREE.Vector3(x+lean,H+height,z+.04)]);add(new THREE.TubeGeometry(curve,12,.009,5,false),stem);for(let k=0;k<5;k++)for(const side of[-1,1]){const t=.20+k*.15,p=curve.getPoint(t),a=side*Math.PI/2+n*.61;leaf(p.x,p.y,p.z,a,.65,.19+rand()*.07,.10+rand()*.025,green);}const p=curve.getPoint(1);leaf(p.x,p.y,p.z,n*.61,.1,.22,.10,green);}
 // Lower burgundy and lime-edged coleus spills gently over the rim.
 for(let n=0;n<25;n++){const x=(rand()-.5)*1.55,z=(rand()-.5)*.56,y=H+.02+rand()*.25;for(let k=0;k<4;k++)leaf(x,y,z,k*Math.PI/2+n*.31,1.0+rand()*.45,.22+rand()*.12,.18+rand()*.08,n%5===0?green:red);}
 leafGeometry.dispose();for(const [m,list]of leafParts)parts.set(m,list);
 for(const [material,geos]of parts){const geometry=mergeGeometries(geos,false),mesh=new THREE.Mesh(geometry,material);mesh.name=material===white?'Painted white cross-braced timber planter':material===soil?'Recessed potting soil':material===stem?'Upright plant stems':material===green?'Veined glossy green foliage':'Burgundy coleus with lime leaf edges';mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);geos.forEach(g=>g.dispose());}
 return root;
}
