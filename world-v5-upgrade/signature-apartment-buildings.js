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
  const clayColors=[0x9c513b,0xb76549,0x8d4938,0xb46d50,0x9a5b43];
  const idx=Math.abs(Math.round(w*3+d*7+h*11))%clayColors.length;
  const brick=new THREE.MeshStandardMaterial({color:clayColors[idx],roughness:.94});
  applyRealBrick(brick);
  const cream=new THREE.MeshStandardMaterial({color:0xd9c7aa,roughness:.9});
  const dark=new THREE.MeshStandardMaterial({color:0x242d33,metalness:.58,roughness:.42});
  const glass=new THREE.MeshPhysicalMaterial({color:0x456779,metalness:.08,roughness:.16,transparent:true,opacity:.83,side:THREE.DoubleSide});
  const warm=new THREE.MeshBasicMaterial({color:0xbda079});
  const foliage=new THREE.MeshStandardMaterial({color:0x3c6544,roughness:.97});
  const B=(ww,hh,dd,x,y,z,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(ww,hh,dd),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;group.add(o);return o;};
  const floors=Math.max(3,Math.floor((h-3)/3.35));
  // Distinct corner towers with projecting pilasters and parapet caps.
  B(w-.2,h-3.4,.26,0,(h+3.4)/2,d/2+.22,brick);
  for(const xx of [-w/2+.48,w/2-.48]){
   B(.72,h-3.2,.6,xx,(h+3.2)/2,d/2+.48,brick);
   B(1.22,.33,1.1,xx,h+.12,d/2+.52,cream);
  }
  // Ground floor stone podium and retail-scale glazing.
  B(w+.5,.55,.48,0,3.38,d/2+.42,cream);
  for(let k=0;k<Math.max(3,Math.floor(w/4.6));k++){
   const count=Math.max(3,Math.floor(w/4.6));
   const xx=-w/2+(k+.5)*w/count;
   B(w/count*.72,2.25,.09,xx,1.65,d/2+.35,glass);
   B(.1,2.6,.25,xx-w/count*.4,1.65,d/2+.43,dark);
  }
  for(let f=0;f<floors;f++){
   const yy=4.9+f*3.3;
   if(yy+1.2>h)break;
   B(w+.45,.16,.48,0,yy-1.55,d/2+.4,cream);
   const bays=Math.max(4,Math.floor(w/3.9));
   for(let k=0;k<bays;k++){
    const xx=-w/2+(k+.5)*w/bays;
    const winW=Math.min(2.05,w/bays*.64);
    B(winW+.27,2.5,.16,xx,yy,d/2+.37,cream);
    B(winW,2.25,.11,xx,yy,d/2+.47,glass);
    B(.075,2.3,.14,xx,yy,d/2+.55,dark);
    B(winW+.2,.15,.25,xx,yy+1.22,d/2+.56,cream);
    B(winW+.2,.16,.27,xx,yy-1.2,d/2+.57,cream);
    // Alternate balcony placements to avoid identical facades.
    if((k+f+idx)%3===0){
     B(winW+1.0,.18,1.55,xx,yy-1.42,d/2+1.12,cream);
     B(winW+1.0,.09,.09,xx,yy-.36,d/2+1.91,dark);
     for(const side of [-1,1])B(.08,1.1,.08,xx+side*(winW+.95)/2,yy-.85,d/2+1.91,dark);
     for(let q=0;q<6;q++)B(.045,.95,.045,xx-(winW+.8)/2+q*(winW+.8)/5,yy-.88,d/2+1.91,dark);
     if((k+idx)%2===0){
      B(.72,.34,.38,xx,yy-1.18,d/2+1.55,cream);
      const bush=new THREE.Mesh(new THREE.IcosahedronGeometry(.38,1),foliage);
      bush.position.set(xx,yy-.65,d/2+1.55);group.add(bush);
     }
    }
   }
  }
  // Crown with layered cream stone cornice and distinctive rooftop masses.
  B(w+.75,.38,d+.65,0,h+.14,0,cream);
  B(w+.4,.34,d+.4,0,h+.48,0,brick);
  B(w*.3,1.2,d*.24,w*.18,h+1.2,-d*.2,brick);
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
 const glass=new THREE.MeshPhysicalMaterial({color:0x83a9bd,metalness:.12,roughness:.09,transparent:true,opacity:.6,clearcoat:1,side:THREE.DoubleSide});
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
    for(const xx of [-w*.34,w*.34]){box(.85,.5,.55,xx,y-1.12,d/2+depth-.1,white);const shrub=new THREE.Mesh(new THREE.SphereGeometry(.48,8,6),plant);shrub.position.set(xx,y-.67,d/2+depth-.1);group.add(shrub);}
   }
  }
 }
 // Rooftop cornices / recessed penthouse and roof garden silhouette.
 if(style===0){box(w+.55,.55,d+.6,0,h+.48,0,mortar);for(let x=-w/2+.4;x<w/2;x+=.8)box(.38,.32,.5,x,h+.9,d/2+.25,mortar);}
 else{box(w+.65,.35,d+.6,0,h+.5,0,style===1?dark:white);box(w*.62,1.55,d*.55,0,h+1.3,0,style===1?dark:white);}
 return group;
}
