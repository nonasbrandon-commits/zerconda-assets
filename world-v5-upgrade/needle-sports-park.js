import {GROUND_LEVEL} from './ground-level.js?v=20261119-level-ground-v117';
import * as THREE from 'three';
import {createZenPond} from './zen-pond.js?v=20261119-level-ground-v117';
// Public park north of the Observation Needle. All features are traversable scenery.
export function createNeedleSportsPark(scene,{x=48,z=-224,getPlayer=()=>null}={}){
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
 turf.polygonOffset=true;turf.polygonOffsetFactor=1;turf.polygonOffsetUnits=2;for(const m of[tennisSurface,basketSurface]){m.polygonOffset=true;m.polygonOffsetFactor=-1;m.polygonOffsetUnits=-2;}const walkSurfaces=[];
 function box(w,h,d,px,py,pz,m,parent=root){if(parent===root&&h<=.3&&w*d>2){py=GROUND_LEVEL-h/2;walkSurfaces.push({x:px,z:pz,w,d,y:GROUND_LEVEL,kind:m===turf?'lawn':m===asphalt||h<.05?'court':'path'});}const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(px,py,pz);o.receiveShadow=true;o.castShadow=h>.5;parent.add(o);return o;}
 function cyl(rt,rb,h,px,py,pz,m,n=10){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),m);o.position.set(px,py,pz);o.castShadow=true;root.add(o);return o;}
 box(66,.14,108,0,-.15,0,turf);
 // Walkway links the park to the city's northern boulevard.
 // A continuous promenade now reaches the boulevard sidewalk.
 
 function line(x1,z1,x2,z2,color=white,width=.11,y=.08){
  const dx=x2-x1,dz=z2-z1,o=box(Math.hypot(dx,dz),color===white?.004:.025,width,(x1+x2)/2,color===white?GROUND_LEVEL+.002:y,(z1+z2)/2,color);o.rotation.y=-Math.atan2(dz,dx);
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
 const stoneMap=new THREE.TextureLoader().load(new URL('../realistic-assets/pbr/PavingStones070/PavingStones070_1K-JPG_Color.jpg',import.meta.url).href);stoneMap.colorSpace=THREE.SRGBColorSpace;stoneMap.wrapS=stoneMap.wrapT=THREE.RepeatWrapping;stoneMap.repeat.set(2,12);paver.map=stoneMap;
 box(6,.10,96,0,.055,33.5,paver); // -14.5..81.5, ending on the city sidewalk
 for(const side of [-1,1])box(3,.10,83,side*31,.055,2.5,paver);
 for(const pz of [-11,44])box(65,.10,3,0,.055,pz,paver);
 // Branches meet the open ends of both courts, keeping their side fences clear.
 for(const [cx,lo,hi]of [[-18,-11,-6.5],[18,-11,.5],[-18,36.5,44],[18,29.5,44]])box(3,.10,hi-lo,cx,.055,(lo+hi)/2,paver);
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
 function paintArc(cx,cz,r,start,end){const pos=[],idx=[];for(let k=0;k<=48;k++){const a=start+(end-start)*k/48;for(const rr of[r-.052,r+.052])pos.push(cx+Math.cos(a)*rr,GROUND_LEVEL+.003,cz+Math.sin(a)*rr);if(k<48){const j=k*2;idx.push(j,j+2,j+1,j+1,j+2,j+3);}}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();root.add(new THREE.Mesh(g,paint));}
 paintArc(18,15,1.8,0,Math.PI*2);
 for(const dz of [-1,1])paintArc(18,15+dz*9,3.1,dz===1?0:Math.PI,dz===1?Math.PI:Math.PI*2);
 // Tennis service boxes and distinct singles sidelines.
 for(const side of [-1,1]){
  line(-18+side*8.15,15-12,-18+side*8.15,15+12,white,.09,.137);
 }
 line(-18,15-7,-18,15+7,white,.09,.137);


 const garden=createZenPond(root,{x:0,z:-35,getPlayer,externalPaths:walkSurfaces.filter(p=>p.kind==='path')});
 return {root,garden,seats:[...garden.worldSeats(),...[-8,12,34].map(pz=>({x,z:z+pz,facing:-Math.PI/2,sitHeight:.7075,kind:'park bench'}))],blocks:garden.blocks,heightAt(wx,wz){let height=garden.heightAt(wx,wz);const px=wx-x,pz=wz-z;for(const r of walkSurfaces)if(Math.abs(px-r.x)<=r.w/2&&Math.abs(pz-r.z)<=r.d/2)height=Math.max(height??-1,r.y);return height;},walkSurfaces,counts:garden.counts,update(t){garden.update(t);}};
}

