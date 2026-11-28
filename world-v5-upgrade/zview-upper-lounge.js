import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createZViewUpperFinishes(){
 const c=document.createElement('canvas');c.width=c.height=512;const a=c.getContext('2d');a.fillStyle='#d9d8d5';a.fillRect(0,0,512,512);let seed=617;const rand=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 for(let i=0;i<1200;i++){const x=rand()*512,y=rand()*512,r=15+rand()*90,g=a.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,i%2?'#92959a19':'#ffffff30');g.addColorStop(1,'#ffffff00');a.fillStyle=g;a.fillRect(x-r,y-r,r*2,r*2);}
 for(let i=0;i<48;i++){const y=rand()*620-55;a.beginPath();a.moveTo(-30,y);a.bezierCurveTo(110,y-80+rand()*160,300,y-90+rand()*180,545,y-140+rand()*280);a.strokeStyle=i%4?'#636b762e':'#333e5060';a.lineWidth=.6+rand()*2.5;a.stroke();a.strokeStyle='#ffffff66';a.lineWidth=.55;a.stroke();}
 const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(.13,.13);map.anisotropy=4;
 return{marble:new THREE.MeshStandardMaterial({map,color:0xf0efeb,roughness:.24,metalness:.16}),terrace:new THREE.MeshStandardMaterial({color:0x777c80,roughness:.68}),dark:new THREE.MeshStandardMaterial({color:0x1b252c,roughness:.32,metalness:.5}),ceiling:new THREE.MeshStandardMaterial({color:0x615d56,roughness:.78})};
}
export function createZViewUpperLounge(parent,{x,z,deckY,seats,finishes}){
 const root=new THREE.Group();root.name='Z-View upper lounge · marble, champagne brass and cream upholstery';root.position.y=deckY;root.userData.renderBudgetIgnore=true;parent.add(root);const batches=new Map(),obstacles=[],leaves=[[],[],[]];
 const mat=(color,roughness=.6,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const gold=mat(0xb59a61,.28,.72),black=finishes.dark,cream=mat(0xdedbd1,.9),pillow=mat(0xb1a99b,.95),graphite=mat(0x343d44,.8),glass=new THREE.MeshPhysicalMaterial({color:0x7897a2,transparent:true,opacity:.13,depthWrite:false,roughness:.1,side:THREE.DoubleSide}),light=new THREE.MeshBasicMaterial({color:0xffd99a,toneMapped:false}),rug=mat(0x8d897e,.98),soil=mat(0x393124,.97),green=[mat(0x365b25,.9),mat(0x547d32,.9),mat(0x6f913c,.9)];
 const v=new THREE.Vector3();
 function emit(geometry,material,px=0,py=0,pz=0,rotation=[0,0,0],scale=[1,1,1],base=null){if(!geometry.attributes.uv)geometry.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(geometry.attributes.position.count*2),2));const o=new THREE.Object3D();o.position.set(px,py,pz);o.rotation.set(...rotation);o.scale.set(...scale);o.updateMatrix();if(base)o.matrix.premultiply(base);geometry.applyMatrix4(o.matrix);const g=geometry.index?geometry.toNonIndexed():geometry;if(g!==geometry)geometry.dispose();(batches.get(material)||batches.set(material,[]).get(material)).push(g);}
 const box=(w,h,d,px,py,pz,m=black,base=null,r=.035)=>emit(r?new RoundedBoxGeometry(w,h,d,2,r):new THREE.BoxGeometry(w,h,d),m,px,py,pz,[0,0,0],[1,1,1],base);
 const cyl=(r,h,px,py,pz,m=gold,base=null)=>emit(new THREE.CylinderGeometry(r,r,h,24),m,px,py,pz,[0,0,0],[1,1,1],base);
 const ring=(r,y,t,m=gold)=>emit(new THREE.TorusGeometry(r,t,6,96),m,0,y,0,[Math.PI/2,0,0]);
 function baseAt(px,pz,yaw){return new THREE.Matrix4().compose(new THREE.Vector3(px,0,pz),new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),yaw),new THREE.Vector3(1,1,1));}
 function solid(px,pz,w,d){obstacles.push({x:px,z:pz,w,d});}
 function seat(base,lx,lz,facing,label){v.set(lx,0,lz).applyMatrix4(base);seats.push({x:x+v.x,z:z+v.z,facing,sitHeight:deckY+.64,kind:label});}
 function sofa(px,pz,width,yaw,{chaise=false,bench=false}={}){
  const b=baseAt(px,pz,yaw),depth=bench?.85:1.12;box(width,.2,depth,0,.32,0,black,b);box(width,.55,.2,0,.86,-depth/2+.05,cream,b,.07);
  for(const sx of[-1,1]){box(.22,.50,depth,sx*(width/2-.09),.64,0,cream,b,.075);for(const sz of[-1,1])box(.06,.22,.06,sx*(width/2-.27),.13,sz*(depth/2-.16),gold,b,.012);}
  const count=Math.round(width/1.2);for(let i=0;i<count;i++){const lx=-width/2+.20+(i+.5)*(width-.4)/count;box((width-.48)/count,.22,depth-.16,lx,.52,.035,cream,b,.055);box((width-.55)/count,.48,.18,lx,.88,-depth/2+.19,cream,b,.055);seat(b,lx,.06,yaw,bench?'Z-View window seat':'Z-View lounge sofa');}
  if(!bench)for(const[lx,m]of[[-width*.28,pillow],[width*.26,graphite]])emit(new RoundedBoxGeometry(.55,.45,.17,2,.07),m,lx,.85,-.24,[0,0,lx<0?.12:-.12],[1,1,1],b);
  solid(px,pz,Math.abs(Math.cos(yaw))*width+Math.abs(Math.sin(yaw))*depth,Math.abs(Math.sin(yaw))*width+Math.abs(Math.cos(yaw))*depth);
  if(chaise){const lx=width/2+.65;box(1.5,.20,2.45,lx,.32,.53,black,b);box(1.5,.22,2.40,lx,.52,.55,cream,b,.075);box(.20,.5,2.45,lx+.66,.68,.53,cream,b,.06);box(1.5,.55,.2,lx,.86,-.59,cream,b,.07);seat(b,lx,.15,yaw,'Z-View chaise');seat(b,lx,1.15,yaw,'Z-View chaise');v.set(lx,0,.53).applyMatrix4(b);solid(v.x,v.z,Math.abs(Math.cos(yaw))*1.5+Math.abs(Math.sin(yaw))*2.45,Math.abs(Math.sin(yaw))*1.5+Math.abs(Math.cos(yaw))*2.45);}
  return b;
 }
 function tablePlant(px,pz){cyl(.14,.19,px,.75,pz,black);for(let i=0;i<8;i++){const a=i*Math.PI/4;emit(new THREE.SphereGeometry(1,8,6),green[i%3],px+Math.cos(a)*.12,.95+(i%3)*.025,pz+Math.sin(a)*.12,[Math.sin(a)*.7,0,Math.cos(a)*.7],[.055,.19,.055]);}}
 function palm(px,pz,height=3.0){
  emit(new THREE.LatheGeometry([new THREE.Vector2(.30,0),new THREE.Vector2(.38,.06),new THREE.Vector2(.47,.66),new THREE.Vector2(.45,.87),new THREE.Vector2(.40,.89)],24),black,px,.015,pz);cyl(.405,.04,px,.87,pz,soil);emit(new THREE.TorusGeometry(.448,.018,6,32),gold,px,.88,pz,[Math.PI/2,0,0]);solid(px,pz,1,1);
  for(let f=0;f<12;f++){const a=f*Math.PI*2/12,spread=.9+(f%3)*.17,top=height-.35+(f%3)*.1,curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(px,.78,pz),new THREE.Vector3(px+Math.cos(a)*spread*.25,top+.55,pz+Math.sin(a)*spread*.25),new THREE.Vector3(px+Math.cos(a)*spread,top-.35,pz+Math.sin(a)*spread));emit(new THREE.TubeGeometry(curve,12,.012,4,false),green[f%3]);for(let k=2;k<10;k++){const t=k/10,p=curve.getPoint(t),length=(.20+Math.sin(t*Math.PI)*.25)*(height/3);for(const side of[-1,1]){const angle=a+side*1.05,tip=new THREE.Vector3(p.x+Math.cos(angle)*length,p.y-.10-t*.13,p.z+Math.sin(angle)*length),middle=p.clone().lerp(tip,.48);middle.y+=.045;const across=new THREE.Vector3(-Math.sin(angle)*.045,0,Math.cos(angle)*.045),left=middle.clone().add(across),right=middle.clone().sub(across),arr=leaves[(f+k)%3];for(const q of[p,left,middle,p,middle,right,left,tip,middle,middle,tip,right])arr.push(q.x,q.y,q.z);}}}
 }
 // Black stone rings and warm ceiling coves follow the supplied reference.
 for(const[r,w]of[[3.65,.15],[14.75,.32]])emit(new THREE.RingGeometry(r-w,r+w,128),black,0,.008,0,[-Math.PI/2,0,0]);
 for(const r of[3.35,7,12.8,16.4]){ring(r,4.27,.10,black);ring(r,4.245,.047,light);ring(r+.12,4.27,.017,gold);}
 for(let i=0;i<36;i++){const a=i*Math.PI/18,r=i%2?15.4:9.8;cyl(.125,.025,Math.cos(a)*r,4.265,Math.sin(a)*r,gold);cyl(.075,.03,Math.cos(a)*r,4.245,Math.sin(a)*r,light);}
 // Clear axial corridors connect the lift and all four existing skywalk portals.
 for(let i=0;i<4;i++){const a=Math.PI/4+i*Math.PI/2,px=Math.cos(a)*11.2,pz=Math.sin(a)*11.2,yaw=Math.atan2(-px,-pz),b=sofa(px,pz,4.2,yaw,{chaise:true});emit(new THREE.CircleGeometry(1,64),rug,0,.013,1.0,[-Math.PI/2,0,0],[4.2,3.4,1],b);emit(new THREE.CylinderGeometry(1,1,.085,48),black,-.1,.56,2.45,[0,0,0],[1.45,1,.78],b);for(const sx of[-1,1])for(const sz of[-1,1])cyl(.04,.46,sx*.95,.27,2.45+sz*.45,gold,b);v.set(-.1,0,2.45).applyMatrix4(b);tablePlant(v.x,v.z);solid(v.x,v.z,2.7,2.7);box(1.35,.20,1.0,-2.0,.34,2.5,black,b);box(1.35,.22,1.0,-2.0,.52,2.5,cream,b,.08);seat(b,-2,2.5,yaw,'Z-View lounge ottoman');v.set(-2,0,2.5).applyMatrix4(b);solid(v.x,v.z,1.7,1.7);}
 for(let i=0;i<4;i++){const a=Math.PI/8+i*Math.PI/2,px=Math.cos(a)*15.5,pz=Math.sin(a)*15.5;sofa(px,pz,2.8,Math.atan2(-px,-pz),{bench:true});}
 for(let i=0;i<8;i++){const a=Math.PI/4+i*Math.PI/4; // Keep plants out of the axial portal openings.
  if(i%2===0)palm(Math.cos(a)*15.25,Math.sin(a)*15.25,3.0);
 }
 palm(-3.65,2.85,2.9);palm(3.65,2.85,2.9);
 // Cylindrical black/glass pavilion, open at the existing lift landing.
 const radius=2.75;
 for(let i=0;i<48;i++){const a=i*Math.PI/24,b=(i+1)*Math.PI/24,mid=(a+b)/2;if(Math.sin(mid)>0&&Math.abs(Math.cos(mid)*radius)<1.9)continue;const pos=[];for(const[t,h]of[[a,.12],[b,.12],[a,3.4],[b,3.4]])pos.push(Math.cos(t)*radius,h,Math.sin(t)*radius);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex([0,1,2,1,3,2]);g.computeVertexNormals();emit(g,glass);if(i%4===0)box(.055,3.35,.055,Math.cos(a)*radius,1.77,Math.sin(a)*radius,gold);}
 cyl(3.0,.24,0,3.65,0,black);cyl(3.2,.18,0,3.88,0,black);ring(3.03,3.76,.045,light);ring(3.17,3.97,.045,gold);ring(2.78,.10,.045,gold);
 for(const side of[-1,1]){box(.16,3.35,.20,side*1.89,1.77,2.18,gold);solid(side*1.89,2.18,.23,.25);}box(3.92,.66,.25,0,3.22,2.18,black);box(3.9,.045,.29,0,2.87,2.18,light);
 // Brushed inner panels and rails surround the original moving cabin, not its doorway.
 const brushed=mat(0x8f938d,.30,.7);box(.045,2.55,3.22,-1.74,1.42,-.05,brushed);box(.045,2.55,3.22,1.74,1.42,-.05,brushed);box(3.48,2.55,.045,0,1.42,-1.70,brushed);box(3.2,.045,.055,0,1.05,-1.65,gold);solid(-1.74,-.05,.09,3.22);solid(1.74,-.05,.09,3.22);solid(0,-1.70,3.48,.09);
 function label(text,w,h,px,py,pz){const c=document.createElement('canvas');c.width=1024;c.height=256;const a=c.getContext('2d');a.fillStyle='#111b22';a.fillRect(0,0,1024,256);a.fillStyle='#eee7d4';a.textAlign='center';a.textBaseline='middle';a.font='600 68px sans-serif';a.fillText(text,512,133,980);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;emit(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t}),px,py,pz);}
 label('↑  ELEVATOR  ↓',3.35,.47,0,3.22,2.32);box(.30,.83,.11,2.16,1.34,2.18,gold);label('↕',.22,.60,2.16,1.35,2.245);
 for(let i=0;i<3;i++)if(leaves[i].length){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(leaves[i],3));g.computeVertexNormals();green[i].side=THREE.DoubleSide;emit(g,green[i]);}
 for(const[m,geos]of batches){const geometry=mergeGeometries(geos,false),mesh=new THREE.Mesh(geometry,m);mesh.castShadow=false;mesh.receiveShadow=true;root.add(mesh);for(const g of geos)g.dispose();}
 root.userData.upperLounge={reference:'User supplied zerconda_elevator_lobby_views.zip',sofaGroups:4,windowBenches:4,palms:6,ceilingDownlights:36,addedDynamicLights:0,staticBatches:batches.size};
 return{root,obstacles,blocks(px,pz){if(Math.abs(Math.hypot(px,pz)-radius)<.22&&!(pz>1.4&&Math.abs(px)<1.78))return true;return obstacles.some(s=>Math.abs(px-s.x)<s.w/2+.23&&Math.abs(pz-s.z)<s.d/2+.23);}};
}
