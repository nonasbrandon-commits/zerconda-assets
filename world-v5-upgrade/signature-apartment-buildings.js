import {createPhotoPlanter} from './photo-planter.js?v=20261119-zdogz-v146';
import * as THREE from 'three';
// Shared real CC0 photo-scanned PBR maps already present in this repository.
// Loading is non-blocking: existing brick colors remain visible if a texture fails.
const URBAN_BASE='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/urban-pbr/';
const textureLoader=new THREE.TextureLoader();
const masonryMaps=new Map();
function loadMasonryMap(kind){
 if(masonryMaps.has(kind))return masonryMaps.get(kind);
 const entry={texture:null,ready:false,listeners:[]};
 masonryMaps.set(kind,entry);
 entry.texture=textureLoader.load(URBAN_BASE+'brick_'+kind+'.jpg',
  ()=>{entry.ready=true;for(const callback of entry.listeners)callback(entry.texture);entry.listeners.length=0;},
  undefined,()=>{entry.listeners.length=0;console.warn('Zerconda PBR unavailable: brick_'+kind);});
 entry.texture.wrapS=entry.texture.wrapT=THREE.RepeatWrapping;
 entry.texture.repeat.set(3,3);entry.texture.anisotropy=8;
 if(kind==='color')entry.texture.colorSpace=THREE.SRGBColorSpace;
 return entry;
}
function applyRealBrick(material){
 for(const [kind,property] of [['color','map'],['normal','normalMap'],['roughness','roughnessMap']]){
  const entry=loadMasonryMap(kind);
  const apply=t=>{material[property]=t;if(kind==='normal')material.normalScale.set(.3,.3);material.needsUpdate=true;};
  if(entry.ready)apply(entry.texture);else entry.listeners.push(apply);
 }
}
// Three distinctive architecture kits inspired by user-provided references:
// historic brick fire-escape apartments, glass terrace residences, modern white-frame condos.
// All elements are actual 3D meshes, not photo billboards.
export function addSignatureArchitecture(group,{w,d,h,style=0}={}){
 // Warm brick mid-rise apartment architecture based on the supplied reference:
 // staggered brick masses, stone cornices, dark balcony rails and deep window reveals.
 if(style===3){
  // Single clean facade kit: opaque brick, one dark glass pane per bay,
  // and matching front, rear and side elevations. No floating blue ornaments.
  const brick=new THREE.MeshStandardMaterial({color:0x965843,roughness:.94});
  const stone=new THREE.MeshStandardMaterial({color:0xc9bba7,roughness:.92});
  const frame=new THREE.MeshStandardMaterial({color:0x343b3d,metalness:.35,roughness:.6});
  const glass=new THREE.MeshStandardMaterial({color:0x243c48,metalness:.2,roughness:.28});
  const B=(ww,hh,dd,x,y,z,mat)=>{
   const m=new THREE.Mesh(new THREE.BoxGeometry(ww,hh,dd),mat);
   m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;
  };
  // Cover any legacy window texture underneath the architecture.
  B(w+.06,h-3.45,d+.06,0,(h+3.45)/2,0,brick);
  const floorCount=Math.max(2,Math.floor((h-4)/3.25));
  function elevation(width,depth,side,sideWall){
   const bays=Math.max(2,Math.floor(width/4.1));
   const cell=width/bays;
   for(let f=0;f<floorCount;f++){
    const y=4.75+f*3.25;
    if(y+1.05>h)break;
    for(let k=0;k<bays;k++){
     const lateral=-width/2+(k+.5)*cell;
     const paneW=Math.min(1.75,cell*.57),paneH=2.05;
     const px=sideWall?side*(w/2+.13):lateral;
     const pz=sideWall?lateral:side*(d/2+.13);
     if(sideWall){
      B(.10,paneH+.22,paneW+.22,px,y,pz,stone);
      B(.12,paneH,paneW,px+side*.075,y,pz,glass);
      B(.14,paneH,.055,px+side*.15,y,pz,frame);
      B(.2,.11,paneW+.3,px+side*.09,y-paneH/2-.06,pz,stone);
     }else{
      B(paneW+.22,paneH+.22,.10,px,y,pz,stone);
      B(paneW,paneH,.12,px,y,pz+side*.075,glass);
      B(.055,paneH,.14,px,y,pz+side*.15,frame);
      B(paneW+.3,.11,.2,px,y-paneH/2-.06,pz+side*.09,stone);
     }
    }
   }
  }
  for(const side of [-1,1]){elevation(w,d,side,false);elevation(d,w,side,true);}
  B(w+.5,.3,d+.5,0,h+.12,0,stone);
  B(w+.25,.24,d+.25,0,h+.39,0,brick);
  return group;
 }
 // Seeded, seamless masonry texture with mortar joints and granular variation.
 // Generated in-browser so Airo needs no extra asset upload or CORS configuration.
 const masonry=document.createElement('canvas');masonry.width=1024;masonry.height=1024;
 const ctx=masonry.getContext('2d');let seed=49231;
 const rnd=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);
 ctx.fillStyle='#b3a49b';ctx.fillRect(0,0,1024,1024);
 const bw=128,bh=48;
 for(let row=0;row<22;row++)for(let col=-1;col<9;col++){
  const x=col*bw+(row%2?bw/2:0),y=row*bh;
  const tone=Math.round(80+rnd()*50),red=Math.min(180,tone+38);
  ctx.fillStyle='rgb('+red+','+Math.round(tone*.68)+','+Math.round(tone*.58)+')';
  ctx.fillRect(x+3,y+3,bw-6,bh-6);
  for(let k=0;k<95;k++){
   const px=x+4+rnd()*(bw-8),py=y+4+rnd()*(bh-8),v=Math.floor(rnd()*110);
   ctx.fillStyle=rnd()>.5?'rgba(22,18,16,.13)':'rgba(242,202,166,.15)';
   ctx.fillRect(px,py,1+rnd()*4,1+rnd()*2);
  }
 }
 const masonryTex=new THREE.CanvasTexture(masonry);
 masonryTex.colorSpace=THREE.SRGBColorSpace;
 masonryTex.wrapS=masonryTex.wrapT=THREE.RepeatWrapping;
 masonryTex.repeat.set(2,3);
 masonryTex.anisotropy=8;
 const brick=new THREE.MeshStandardMaterial({map:masonryTex,color:0xffffff,roughness:.9});
 const mortar=new THREE.MeshStandardMaterial({color:0xc7a696,roughness:1});
 const iron=new THREE.MeshStandardMaterial({color:0x493f3e,metalness:.63,roughness:.54});
 const white=new THREE.MeshStandardMaterial({color:0xd8dce0,roughness:.65});
 const dark=new THREE.MeshStandardMaterial({color:0x303a44,metalness:.42,roughness:.32});
 const glass=new THREE.MeshStandardMaterial({color:0x2b4757,metalness:.18,roughness:.34,side:THREE.FrontSide});
 const lit=new THREE.MeshBasicMaterial({color:0xe6ba7e,transparent:true,opacity:.64});
 const plant=new THREE.MeshStandardMaterial({color:0x346b41,roughness:.96});
 const mat=(style===0?brick:style===1?dark:white);
 const box=(w1,h1,d1,x,y,z,m,parent=group)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w1,h1,d1),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
 const floorCount=Math.max(3,Math.floor((h-3.5)/3.25));
 // Secondary dimensional cladding on facade, contrasting the older base building.
 box(w-.5,h-3.6,.17,0,(h+3.6)/2,d/2+.18,mat);
 for(let floor=1;floor<=floorCount;floor++){
  const y=3.5+(floor-.5)*((h-3.7)/floorCount);
  const n=style===0?Math.max(3,Math.floor(w/3.4)):Math.max(2,Math.floor(w/5));
  for(let k=0;k<n;k++){
   const xx=-w/2+(k+.5)*w/n;
   const ww=(w/n)*(style===0?.59:.84);
   box(ww,2.15,.06,xx,y,d/2+.34,glass);
   box(ww+.15,.085,.13,xx,y+1.12,d/2+.4,style===0?mortar:dark);
   box(ww+.15,.085,.13,xx,y-1.12,d/2+.4,style===0?mortar:dark);
   for(const side of [-1,1])box(.085,2.25,.13,xx+side*ww/2,y,d/2+.41,style===0?mortar:dark);
   if(style!==0&&k%2===0)box(ww*.5,1.45,.025,xx,y,d/2+.45,lit);
  }
  if(style===0){
   // Traditional projecting iron fire escape: grated landing, railings and angled stair flights.
   const x=w*.19;
   box(3.5,.11,1.15,x,y-1.25,d/2+1.02,iron);
   for(const dx of [-1.65,1.65])box(.065,1.05,.065,x+dx,y-.65,d/2+1.55,iron);
   box(3.45,.065,.065,x,y-.12,d/2+1.55,iron);
   for(let j=0;j<10;j++)box(.045,.86,.045,x-1.5+j*.33,y-.68,d/2+1.55,iron);
   if(floor>1){
    const stairs=new THREE.Group();stairs.position.set(x,y-1.45,d/2+1.2);group.add(stairs);
    const rail=box(.07,3.35,.07,-1.25,-1.6,.35,iron,stairs);rail.rotation.z=-.58;
    const rail2=box(.07,3.35,.07,-1.25,-1.6,-.35,iron,stairs);rail2.rotation.z=-.58;
    for(let j=0;j<9;j++)box(.8,.07,.6,-2.45+j*.3,-3+j*.34,0,iron,stairs);
   }
  }else{
   // Real projecting balconies, clear glass balustrades and planters.
   const depth=style===1?2.2:1.45;
   box(w-.8,.2,depth,0,y-1.45,d/2+depth/2+.38,style===1?dark:white);
   box(w-.8,.92,.06,0,y-.87,d/2+depth+.36,glass);
   for(const xx of [-w/2+.5,w/2-.5])box(.08,.95,.08,xx,y-.85,d/2+depth+.4,white);
   if(floor%2===0){
    for(const xx of [-w*.34,w*.34])createPhotoPlanter(group,{x:xx,y:y-1.37,z:d/2+depth-.1,width:1.10});
   }
  }
 }
 // Rooftop cornices / recessed penthouse and roof garden silhouette.
 if(style===0){box(w+.55,.55,d+.6,0,h+.48,0,mortar);for(let x=-w/2+.4;x<w/2;x+=.8)box(.38,.32,.5,x,h+.9,d/2+.25,mortar);}
 else{box(w+.65,.35,d+.6,0,h+.5,0,style===1?dark:white);box(w*.62,1.55,d*.55,0,h+1.3,0,style===1?dark:white);}
 return group;
}
