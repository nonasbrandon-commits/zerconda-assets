import * as THREE from 'three';
// Original modular city-detail kit. Distant skyline fills the horizon
// while the near plaza gets recognizable street furniture and landscaping.
export function addCityDepth({scene,THREE: T=THREE,asphalt,paving,grass,seed=8124}){
 let state=seed;const rnd=()=>((state=(Math.imul(state,1664525)+1013904223)>>>0)/4294967296);
 const root=new THREE.Group();root.name='Zerconda city depth and streetscape';scene.add(root);
 const wall=[0xb0b6b6,0x9ca5aa,0xb9a99a,0x84959d,0x9a8f83].map(c=>new T.MeshStandardMaterial({color:c,roughness:.78}));
 const windows=new T.MeshStandardMaterial({color:0x678e9f,metalness:.45,roughness:.24,emissive:0x152a38,emissiveIntensity:.18});
 const frame=new T.MeshStandardMaterial({color:0x434c50,metalness:.55,roughness:.4});
 const concrete=new T.MeshStandardMaterial({color:0xc5c0b5,roughness:.9});
 const metal=new T.MeshStandardMaterial({color:0x525b60,metalness:.7,roughness:.3});
 const leaf=new T.MeshStandardMaterial({color:0x38613b,roughness:.95,side:T.DoubleSide});
 const flower=[0xcf6688,0xe0b95e,0x8c83cb].map(c=>new T.MeshStandardMaterial({color:c,roughness:.85}));
 const boxGeo=new T.BoxGeometry(1,1,1),poleGeo=new T.CylinderGeometry(1,1,1,8);
 function b(parent,x,y,z,w,h,d,m){const o=new T.Mesh(boxGeo,m);o.position.set(x,y,z);o.scale.set(w,h,d);o.castShadow=false;o.receiveShadow=true;parent.add(o);return o;}
 function pole(parent,x,y,z,r,h,m){const o=new T.Mesh(poleGeo,m);o.position.set(x,y,z);o.scale.set(r,h,r);o.castShadow=false;parent.add(o);return o;}
 function skylineTower(x,z,w,d,h,index){
  const g=new T.Group();g.position.set(x,0,z);root.add(g);
  // Distinct architectural silhouettes instead of identical striped slabs.
  const style=index%6,levels=Math.max(4,Math.floor(h/3.6));
  const brick=new T.MeshStandardMaterial({color:[0x995944,0xb47c60,0x8b5143,0xc5a489][index%4],roughness:.92});
  const limestone=new T.MeshStandardMaterial({color:0xd5c6ae,roughness:.9});
  const blueGlass=new T.MeshPhysicalMaterial({color:0x548fa9,metalness:.32,roughness:.16,clearcoat:.6});
  const body=style===0||style===3?brick:style===1?blueGlass:style===2?limestone:wall[index%wall.length];
  const baseHeight=style===0||style===3?Math.min(h,17):h;
  b(g,0,baseHeight/2,0,w,baseHeight,d,body);
  if(baseHeight<h)b(g,0,(baseHeight+h)/2,0,w*.73,h-baseHeight,d*.77,body);
  if(style===2){b(g,0,h+1,0,w+1,2,d+1,limestone);b(g,0,h+2.3,0,w*.78,.5,d*.78,frame);}
  else if(style===1){b(g,0,h+1.5,0,w*.68,3,d*.68,blueGlass);}
  else if(style===4){b(g,0,h+1,0,w*.8,2,d*.8,frame);pole(g,0,h+4,0,.13,4,metal);}
  else b(g,0,h+.3,0,w+.45,.6,d+.45,concrete);
  if(style===0||style===3){
   // Individually framed windows and projecting black balconies.
   for(let floor=1;floor<Math.min(levels,6);floor++){
    const yy=floor*3.2+1.1;
    for(let bay=0;bay<Math.max(2,Math.floor(w/4));bay++){
     const xx=-w/2+(bay+.5)*w/Math.max(2,Math.floor(w/4));
     b(g,xx,yy,d/2+.13,1.7,2,.12,windows);
     b(g,xx,yy+1.05,d/2+.16,2,.13,.2,concrete);
     if((bay+floor)%2===0){
      b(g,xx,yy-.95,d/2+.85,2.8,.13,1.55,frame);
      b(g,xx,yy-.32,d/2+1.58,2.8,.07,.08,frame);
      for(const dx of [-1.25,0,1.25])b(g,xx+dx,yy-.65,d/2+1.58,.06,.65,.06,frame);
     }
    }
   }
  }else{
   const step=style===1?2.9:3.8;
   for(let floor=1;floor<levels;floor++){
    const yy=floor*h/levels;
    if(style===1){
     b(g,0,yy,d/2+.12,w*.92,2.1,.14,windows);
     b(g,0,yy,-d/2-.12,w*.92,2.1,.14,windows);
     for(let col=1;col<6;col++)b(g,-w/2+col*w/6,h/2,d/2+.25,.1,h,.14,frame);
    }else{
     for(let bay=0;bay<Math.max(2,Math.floor(w/4.4));bay++){
      const xx=-w/2+(bay+.5)*w/Math.max(2,Math.floor(w/4.4));
      b(g,xx,yy,d/2+.12,style===2?1.3:2.2,1.8,.13,windows);
      b(g,xx,yy,-d/2-.12,style===2?1.3:2.2,1.8,.13,windows);
     }
    }
   }
  }
  b(g,0,1.55,d/2+.18,w*.72,2.8,.2,windows);
  b(g,0,3.1,d/2+.45,w*.82,.28,.9,frame);
  return g;
 }
 // City extends beyond the playable district in concentric, staggered rows.
 // Avoid the main view corridor and keep structures outside +/-170m play bounds.
 let total=0;
 for(let ring=0;ring<3;ring++){
  const radius=202+ring*65;
  const n=ring===0?30:40;
  for(let i=0;i<n;i++){
   const angle=2*Math.PI*(i+.24*(rnd()-.5))/n;
   const x=Math.cos(angle)*(radius+(rnd()-.5)*22);
   const z=Math.sin(angle)*(radius+(rnd()-.5)*22);
   // South Beach and the ocean must remain completely free of city towers.
   if(z>95)continue;
   const w=12+rnd()*15,d=12+rnd()*15,h=25+rnd()*58+(ring===1?20:0);
   skylineTower(x,z,w,d,h,total++);
  }
 }
 // Road extensions outside the playable area prevent the asphalt ending abruptly.
 for(const c of [-96,0,96]){
  // Terminate the north/south road at the beach promenade, never under the sea.
  b(root,c,-.15,-117,19,.1,554,asphalt);
  b(root,0,-.145,c,790,.1,19,asphalt);
 }
 // Rich tower island details. All objects are outside the elevator approach.
 function planter(x,z){
  const g=new T.Group();g.position.set(x,0,z);root.add(g);
  b(g,0,.43,0,2,.86,1.3,concrete);
  b(g,0,.88,0,1.74,.11,1.04,grass);
  for(let i=0;i<9;i++){
   const px=(rnd()-.5)*1.5,pz=(rnd()-.5)*.85;
   pole(g,px,1.04,pz,.035,.32,leaf);
   const bloom=new T.Mesh(new T.IcosahedronGeometry(.14,1),flower[i%3]);
   bloom.position.set(px,1.26,pz);g.add(bloom);
  }
 }
 function bench(x,z,rotation=0){
  const g=new T.Group();g.position.set(x,0,z);g.rotation.y=rotation;root.add(g);
  b(g,0,.57,0,2.2,.15,.66,concrete);
  b(g,0,.94,-.3,2.2,.73,.12,metal);
  for(const xx of [-.85,.85])b(g,xx,.28,0,.13,.55,.56,metal);
 }
 function bollard(x,z){
  pole(root,x,.43,z,.12,.86,metal);
  const lamp=new T.Mesh(new T.SphereGeometry(.15,8,6),new T.MeshBasicMaterial({color:0xffdf9d}));
  lamp.position.set(x,.91,z);root.add(lamp);
 }
 for(const [x,z,rot] of [[28,-28,0],[68,-28,0],[28,-68,Math.PI],[68,-68,Math.PI]])bench(x,z,rot);
 for(const [x,z] of [[27,-42],[69,-42],[27,-55],[69,-55],[38,-28],[58,-28],[38,-68],[58,-68]])planter(x,z);
 for(let v=-25;v<=25;v+=10){
  bollard(18,-48+v);bollard(78,-48+v);
 }
 // Central plaza perimeter: planters and benches only outside fountain basin.
 for(const [x,z,rot] of [[29,26,0],[67,26,0],[29,70,Math.PI],[67,70,Math.PI]])bench(x,z,rot);
 for(const [x,z] of [[24,25],[72,25],[24,71],[72,71]])planter(x,z);
 // Keep the waterfront horizon unobstructed: no low-poly cone mountains.
 return {root,skylineCount:total,dispose(){scene.remove(root);}};
}
