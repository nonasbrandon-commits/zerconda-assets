import * as THREE from 'three';
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
 // Pond with planted stone shoreline and fish swimming under translucent water.
 const pond=new THREE.Group();pond.position.set(0,0,-35);root.add(pond);
 const shape=new THREE.Shape();shape.absellipse(0,0,14,10,0,Math.PI*2,false,0);
 const pondFloor=new THREE.Mesh(new THREE.ShapeGeometry(shape,48),mat(0x246d68));pondFloor.rotation.x=-Math.PI/2;pondFloor.position.y=-.025;pond.add(pondFloor);
 const surface=new THREE.Mesh(new THREE.ShapeGeometry(shape,48),water);surface.rotation.x=-Math.PI/2;surface.position.y=.12;surface.renderOrder=2;pond.add(surface);
 const shore=new THREE.Mesh(new THREE.TorusGeometry(13,1.05,9,48),mat(0x918c72));shore.scale.y=.76;shore.rotation.x=Math.PI/2;shore.position.y=.06;pond.add(shore);
 const fish=[];const fishMat=[mat(0xe8a14b),mat(0xf2e2c2),mat(0x333f3c),mat(0xd16e55)];
 for(let i=0;i<11;i++){
  const f=new THREE.Group(),body=new THREE.Mesh(new THREE.SphereGeometry(.29,8,6),fishMat[i%4]);body.scale.set(1,.34,.42);f.add(body);
  const tail=new THREE.Mesh(new THREE.ConeGeometry(.18,.37,5),fishMat[i%4]);tail.rotation.z=Math.PI/2;tail.position.x=-.37;f.add(tail);
  f.position.y=.035;pond.add(f);fish.push({f,r:2+(i%5)*1.5,speed:.17+(i%4)*.06,phase:i*2.399});
 }
 // Benches, shaded picnic area and trees.
 function bench(x,z,rotation=0){
  const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rotation;root.add(g);
  box(2.4,.14,.58,0,.58,0,wood,g);box(2.4,.75,.13,0,1,.34,wood,g);
  for(const sx of [-1,1])box(.13,.56,.56,sx*1,.28,0,metal,g);
 }
 for(const [bx,bz,rot] of [[-29,-37,0],[29,-37,Math.PI],[-29,42,0],[29,42,Math.PI],[0,48,0],[-27,-12,0]])bench(bx,bz,rot);
 function tree(px,pz,h){
  cyl(.23,.34,h*.54,px,h*.27,pz,mat(0x73543b),9);
  const crown=new THREE.Group();crown.position.set(px,h*.65,pz);root.add(crown);
  const leaf=mat(0x3b7041);for(let k=0;k<7;k++){
   const a=k*Math.PI*2/7,r=k===0?0:1.3;
   const m=new THREE.Mesh(new THREE.IcosahedronGeometry(h*.23,1),leaf);m.position.set(Math.cos(a)*r,k===0?h*.08:0,Math.sin(a)*r);m.scale.y=.8;crown.add(m);
  }
 }
 for(const [tx,tz,h] of [[-30,-46,8],[30,-46,8],[-30,49,8],[30,49,8],[-29,-12,7],[29,-12,7]])tree(tx,tz,h);
 return {root,update(t){for(const q of fish){const a=t*q.speed+q.phase;q.f.position.x=Math.cos(a)*q.r;q.f.position.z=Math.sin(a)*q.r*.58;q.f.rotation.y=-a;}}};
}
