import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// Public park north of the Observation Needle. All features are traversable scenery.
export function createNeedleSportsPark(scene,{x=48,z=-224}={}){
 const root=new THREE.Group();root.name='Needle Park - tennis basketball fish pond';root.position.set(x,0,z);scene.add(root);
 const mat=(c,r=.85)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
 const turf=mat(0x537b3c),path=mat(0xc9c2ad),asphalt=mat(0x4b555b),blue=mat(0x245b85),red=mat(0xb44f42),white=mat(0xf1eee4),metal=mat(0x424e50),wood=mat(0x795337),water=new THREE.MeshPhysicalMaterial({color:0x3c9f9d,roughness:.17,metalness:.06,transparent:true,opacity:.78,depthWrite:false});
 // Rough, painted sports surfaces instead of untextured blue/red rectangles.
 function courtSurface(hex,seed){
  const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d');
  const rgb=new THREE.Color(hex),im=ctx.createImageData(256,256);
  for(let y=0;y<256;y++)for(let x=0;x<256;x++){
   const i=(y*256+x)*4,noise=(Math.sin(x*127.1+y*311.7+seed*53.3)*43758.5453)%1;
   const variation=(noise-Math.floor(noise)-.5)*28+(Math.sin(x*.06+y*.04+seed)*3);
   im.data[i]=Math.max(0,Math.min(255,rgb.r*255+variation));
   im.data[i+1]=Math.max(0,Math.min(255,rgb.g*255+variation));
   im.data[i+2]=Math.max(0,Math.min(255,rgb.b*255+variation));
   im.data[i+3]=255;
  }
  ctx.putImageData(im,0,0);
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(3,6);
  texture.anisotropy=8;
  return new THREE.MeshStandardMaterial({map:texture,roughness:.95,metalness:0});
 }
 const tennisSurface=courtSurface(0x245b85,3),basketSurface=courtSurface(0xb44f42,7);
 function box(w,h,d,px,py,pz,m,parent=root){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(px,py,pz);o.receiveShadow=true;o.castShadow=h>.5;parent.add(o);return o;}
 function cyl(rt,rb,h,px,py,pz,m,n=10){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),m);o.position.set(px,py,pz);o.castShadow=true;root.add(o);return o;}
 box(66,.14,108,0,-.15,0,turf);
 // Walkway links the park to the city's northern boulevard.
 box(4,.05,18,0,.015,60,path);
 for(const a of [-1,1]){box(2,.045,75,a*31,.015,0,path);}
 function line(x1,z1,x2,z2,color=white,width=.11,y=.08){
  const dx=x2-x1,dz=z2-z1,o=box(Math.hypot(dx,dz),.025,width,(x1+x2)/2,y,(z1+z2)/2,color);o.rotation.y=-Math.atan2(dz,dx);
 }
 function court(cx,cz,tennis){
  const w=tennis?24:17,d=tennis?43:29;
  box(w+.8,.09,d+.8,cx,.03,cz,asphalt);
  box(w,.03,d,cx,.092,cz,tennis?tennisSurface:basketSurface);
  const half=w/2-.85,end=d/2-.9;
  for(const sx of [-1,1])line(cx+sx*half,cz-end,cx+sx*half,cz+end);
  for(const sz of [-1,1])line(cx-half,cz+sz*end,cx+half,cz+sz*end);
  line(cx-half,cz,cx+half,cz);
  if(tennis){
   for(const sz of [-1,1])line(cx-half,cz+sz*7,cx+half,cz+sz*7);
   line(cx,cz-end,cx,cz+end);
   for(const sx of [-1,1])cyl(.07,.07,1.15,cx+sx*(half+.45),.6,cz,metal);
   // Fine mesh net made from spaced horizontal and vertical threads.
   for(let j=0;j<=10;j++)line(cx-half-.45,cz,cx+half+.45,cz,metal,.018,.14+j*.09);
   for(let j=0;j<=30;j++){const nx=cx-half-.45+j*(w-.8)/30;box(.015,.92,.018,nx,.62,cz,metal);}
  }else{
   for(const sz of [-1,1]){
    const pz=cz+sz*(end-2.5);
    line(cx-5.5,pz,cx+5.5,pz);line(cx-5.5,pz,cx-5.5,pz-sz*5.5);line(cx+5.5,pz,cx+5.5,pz-sz*5.5);
    cyl(.11,.12,3.7,cx,1.95,cz+sz*(end+1),metal);
    box(1.8,1.15,.09,cx,3.6,cz+sz*(end-.55),white);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(.46,.035,7,24),mat(0xd56b31));rim.rotation.x=Math.PI/2;rim.position.set(cx,3.12,cz+sz*(end-1.1));root.add(rim);
    // Hanging hoop net: tapered vertical cords and circumferential bands.
    for(let j=0;j<12;j++){
     const a=j*Math.PI/6,top=new THREE.Vector3(cx+Math.cos(a)*.45,3.1,cz+sz*(end-1.1)+Math.sin(a)*.45);
     const bottom=new THREE.Vector3(cx+Math.cos(a+.16)*.23,2.54,cz+sz*(end-1.1)+Math.sin(a+.16)*.23);
     const delta=bottom.clone().sub(top),cord=new THREE.Mesh(new THREE.CylinderGeometry(.009,.009,delta.length(),5),white);
     cord.position.copy(top).add(bottom).multiplyScalar(.5);cord.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());root.add(cord);
    }
   }
  }
  // Perimeter fence, with an open pedestrian gate at the south side.
  for(const side of [-1,1]){
   for(let i=0;i<7;i++){const zz=cz-end+i*(2*end/6);cyl(.055,.055,3,cx+side*(half+1.1),1.5,zz,metal);}
   for(let h of [.8,2.6])box(.035,.025,2*end,cx+side*(half+1.1),h,cz,metal);
  }
 }
 court(-18,15,true);court(18,15,false);
 // Continuous stone-paver pedestrian spine between the two courts.
 const paver=mat(0xbab5aa),joint=mat(0x827f78),edge=mat(0x8e8b83);
 box(6,.065,55,0,.052,13,paver);
 for(let z=-14;z<41;z+=1.35)box(6.05,.014,.045,0,.095,z,joint);
 for(let z=-13.3;z<41;z+=2.7)box(.035,.014,1.35,0,.096,z,joint);
 for(const side of [-1,1])box(.13,.11,55,side*3.04,.065,13,edge);
 // Accessible branches from the promenade to both courts, with stone kerbs.
 for(const side of [-1,1]){
  for(const z of [-2,29]){
   box(6,.065,2.5,side*5.9,.055,z,paver);
   for(let x=3.2;x<8.7;x+=1.15)box(.05,.014,2.5,side*x,.095,z,joint);
  }
 }
 // Park benches on the pedestrian spine, facing the courts; never inside play areas.
 function courtBench(px,pz,face){
  const g=new THREE.Group();g.position.set(px,.06,pz);g.rotation.y=face;root.add(g);
  const frame=mat(0x343b3b,.45),slats=mat(0x8a6040,.72);
  for(const side of [-1,1]){
   box(.11,.58,.58,side*1.04,.32,0,frame,g);
   box(.12,.87,.11,side*1.04,.82,.36,frame,g);
   box(.13,.08,.6,side*1.04,.71,0,frame,g);
  }
  for(let j=0;j<5;j++){
   box(2.38,.075,.095,0,.61,-.23+j*.12,slats,g);
   box(2.38,.10,.085,0,.77+j*.14,.35,slats,g);
  }
  box(2.4,.09,.12,0,.1,-.19,frame,g);
 }
 for(const z of [-8,12,34])courtBench(0,z,Math.PI/2);
 // Courts need recognisable equipment and contrasting painted regulation markings.
 // Add a basketball center circle and key arcs with low-profile white painted lines.
 const paint=mat(0xf3f0e6,.95);
 function paintArc(cx,cz,r,start,end){
  const pts=[];for(let k=0;k<=48;k++){const ang=start+(end-start)*k/48;pts.push(new THREE.Vector3(cx+Math.cos(ang)*r,.135,cz+Math.sin(ang)*r));}
  const mesh=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),48,.052,5,false),paint);root.add(mesh);
 }
 paintArc(18,15,1.8,0,Math.PI*2);
 for(const dz of [-1,1])paintArc(18,15+dz*9,3.1,dz===1?0:Math.PI,dz===1?Math.PI:Math.PI*2);
 // Tennis service boxes and distinct singles sidelines.
 for(const side of [-1,1]){
  line(-18+side*8.15,15-12,-18+side*8.15,15+12,white,.09,.137);
 }
 line(-18,15-7,-18,15+7,white,.09,.137);

 // Pond with planted stone shoreline and fish swimming under translucent water.
 const pond=new THREE.Group();pond.position.set(0,0,-35);root.add(pond);
 // Irregular garden koi pond: dark bottom, natural stone shoreline, reeds and planted banks.
 const points=[];for(let i=0;i<80;i++){
  const a=i*Math.PI*2/80,noise=1+.12*Math.sin(a*3+.7)+.08*Math.sin(a*7+1.4)+.045*Math.cos(a*11);
  points.push(new THREE.Vector2(Math.cos(a)*13.3*noise,Math.sin(a)*8.7*noise));
 }
 const shape=new THREE.Shape(points);
 const pondFloor=new THREE.Mesh(new THREE.ShapeGeometry(shape,80),mat(0x243e32));pondFloor.rotation.x=-Math.PI/2;pondFloor.position.y=-.065;pond.add(pondFloor);
 const naturalWater=new THREE.MeshPhysicalMaterial({color:0x304c3f,roughness:.31,metalness:.06,transparent:true,opacity:.64,depthWrite:false,side:THREE.DoubleSide});
 const surface=new THREE.Mesh(new THREE.ShapeGeometry(shape,80),naturalWater);surface.rotation.x=-Math.PI/2;surface.position.y=.115;surface.renderOrder=2;pond.add(surface);
 // Walkable irregular stone promenade encircling the pond, with a small viewing spur.
 const walkwayOuter=points.map(p=>new THREE.Vector2(p.x*1.28,p.y*1.35));
 const walkwayInner=points.map(p=>new THREE.Vector2(p.x*1.12,p.y*1.16));
 const walkwayShape=new THREE.Shape(walkwayOuter);
 const innerHole=new THREE.Path([...walkwayInner].reverse());walkwayShape.holes.push(innerHole);
 const walkwayMat=new THREE.MeshStandardMaterial({color:0xb9b1a2,roughness:1});
 const walkway=new THREE.Mesh(new THREE.ShapeGeometry(walkwayShape),walkwayMat);
 walkway.rotation.x=-Math.PI/2;walkway.position.y=.065;walkway.receiveShadow=true;pond.add(walkway);
 // Separate irregular flagstone paving slabs, not a single flat painted strip.
 const flagstones=[mat(0xaaa59a),mat(0xc6bdb0),mat(0x918e86)];
 for(let i=0;i<72;i++){
  const a=i*Math.PI*2/72,r=1+.12*Math.sin(a*3+.7)+.08*Math.sin(a*7+1.4)+.045*Math.cos(a*11);
  const slab=new THREE.Mesh(new THREE.BoxGeometry(.9,.065,1.1),flagstones[i%3]);
  slab.position.set(Math.cos(a)*13.3*r*1.21,.112,Math.sin(a)*8.7*r*1.26);
  slab.rotation.y=-a;slab.receiveShadow=true;pond.add(slab);
 }
 // A short path to the southern observation bench and sports-park footpath.
 box(3.2,.065,9,0,.09,-48,path);
 const stone=[mat(0x77746b),mat(0x9b9689),mat(0x6c7165),mat(0xaaa494)];
 const shrubs=[mat(0x315d36),mat(0x4a783c),mat(0x5a8244)];
 for(let i=0;i<115;i++){
  const p=points[i%80],a=i*2.399963,rr=1+(i%7)*.025;
  const xx=p.x*rr,zz=p.y*rr;
  const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(.24+(i%5)*.09,0),stone[i%stone.length]);
  rock.position.set(xx,.12,zz);rock.scale.set(1.5,.46,1.1);rock.rotation.y=a;rock.castShadow=true;pond.add(rock);
  if(i%3===0){
   const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(.36+(i%4)*.12,1),shrubs[i%shrubs.length]);
   leaf.position.set(xx*1.06,.33,zz*1.08);leaf.scale.set(1.1,.75,.9);leaf.castShadow=true;pond.add(leaf);
  }
  if(i%8===0)for(let k=0;k<6;k++){
   const reed=new THREE.Mesh(new THREE.CylinderGeometry(.015,.028,.65+(k%3)*.16,5),shrubs[k%3]);
   reed.position.set(xx+(k-2.5)*.09,.38,zz+(k%2)*.08);reed.rotation.z=(k-2.5)*.08;pond.add(reed);
  }
 }
 // Water ripples and the moving koi are visible through the dark green surface.
 for(let i=0;i<13;i++){
  const a=i*2.399963,rad=2+(i%5)*1.5;
  const ripple=new THREE.Mesh(new THREE.RingGeometry(.24,.27,24),new THREE.MeshBasicMaterial({color:0xb5c9b3,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false}));
  ripple.rotation.x=-Math.PI/2;ripple.position.set(Math.cos(a)*rad,.124,Math.sin(a)*rad*.55);pond.add(ripple);
 }
 const fish=[];const fishMat=[mat(0xe8a14b),mat(0xf2e2c2),mat(0x333f3c),mat(0xd16e55)];
 for(let i=0;i<19;i++){
  const f=new THREE.Group(),body=new THREE.Mesh(new THREE.SphereGeometry(.38,16,10),fishMat[i%4]);body.scale.set(1,.34,.42);f.add(body);
  const tail=new THREE.Mesh(new THREE.ConeGeometry(.24,.42,8),fishMat[i%4]);tail.rotation.z=Math.PI/2;tail.position.x=-.37;f.add(tail);
  f.position.y=.14;f.scale.setScalar(1.9);pond.add(f);fish.push({f,r:2+(i%5)*1.5,speed:.17+(i%4)*.06,phase:i*2.399});
 }
 // Benches, shaded picnic area and trees.
 function bench(x,z,rotation=0){
  const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rotation;root.add(g);
  box(2.4,.14,.58,0,.58,0,wood,g);box(2.4,.75,.13,0,1,.34,wood,g);
  for(const sx of [-1,1])box(.13,.56,.56,sx*1,.28,0,metal,g);
 }
 for(const [bx,bz,rot] of [[-19,-37,0],[19,-37,Math.PI],[-29,42,0],[29,42,Math.PI],[0,48,0],[-18,-21,0],[18,-21,Math.PI],[0,-49,0]])bench(bx,bz,rot);
 const parkTreeGroups=[];
 function tree(px,pz,h){
  cyl(.23,.34,h*.54,px,h*.27,pz,mat(0x73543b),9);
  const crown=new THREE.Group();crown.position.set(px,h*.65,pz);root.add(crown);parkTreeGroups.push({crown,px,pz,h});
  const leaf=mat(0x3b7041);for(let k=0;k<7;k++){
   const a=k*Math.PI*2/7,r=k===0?0:1.3;
   const m=new THREE.Mesh(new THREE.IcosahedronGeometry(h*.23,1),leaf);m.position.set(Math.cos(a)*r,k===0?h*.08:0,Math.sin(a)*r);m.scale.y=.8;crown.add(m);
  }
 }
 for(const [tx,tz,h] of [[-30,-46,8],[30,-46,8],[-30,49,8],[30,49,8],[-29,-12,7],[29,-12,7]])tree(tx,tz,h);
 // Replace geometric lollipop foliage and its trunk with a complete textured GLB tree.
 new GLTFLoader().load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/trees-and-vehicles/trees/leafy-small-tree.glb',gltf=>{
  const base=gltf.scene,bb=new THREE.Box3().setFromObject(base),sz=bb.getSize(new THREE.Vector3());
  if(sz.y<.01)return;
  for(const {crown,h} of parkTreeGroups){
   crown.clear();const model=base.clone(true),scale=h/sz.y;model.scale.setScalar(scale);
   model.position.set(-bb.getCenter(new THREE.Vector3()).x*scale,-h*.65-bb.min.y*scale,-bb.getCenter(new THREE.Vector3()).z*scale);
   model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});crown.add(model);
  }
  // Original cylindrical trunks are intentionally retained as a fallback support.
 },undefined,e=>console.warn('Needle park tree model failed',e));
 return {root,update(t){for(const q of fish){const a=t*q.speed+q.phase;q.f.position.x=Math.cos(a)*q.r;q.f.position.z=Math.sin(a)*q.r*.58;q.f.rotation.y=-a;q.f.position.y=.14+Math.sin(t*1.7+q.phase)*.045;}}};
}
