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
 // Brickwork is generated as a reusable facade texture rather than a plain color.
 function brickTexture(index){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;
  const c=canvas.getContext('2d'),colors=['#955c4b','#a46b58','#856055','#ba8b6d','#b6a293'];
  c.fillStyle='#a99b8c';c.fillRect(0,0,512,512);
  for(let row=0;row<40;row++)for(let col=-1;col<11;col++){
   const xx=col*52+(row%2)*26,yy=row*13;
   const jitter=((row*71+col*43+index*17)%23)-11;
   c.fillStyle=colors[Math.abs(row*3+col+index)%colors.length];
   c.fillRect(xx+1,yy+1,50,11);
   c.fillStyle='rgba(35,25,20,.10)';c.fillRect(xx+2,yy+9,48,2);
   c.fillStyle='rgba(240,210,190,.12)';c.fillRect(xx+2,yy+1,48,2);
  }
  const t=new T.CanvasTexture(canvas);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(2,3);t.anisotropy=4;return t;
 }
 const brickWalls=Array.from({length:5},(_,i)=>new T.MeshStandardMaterial({map:brickTexture(i),roughness:.96,color:0xffffff}));
 const darkGlass=new T.MeshStandardMaterial({color:0x324d5c,roughness:.25,metalness:.38});
 const curtainGlass=new T.MeshStandardMaterial({color:0x203d62,roughness:.22,metalness:.38,transparent:false,opacity:1,depthWrite:true,side:T.FrontSide});
 const curtainAlt=new T.MeshStandardMaterial({color:0x2c5076,roughness:.26,metalness:.3,transparent:false,opacity:1,depthWrite:true,side:T.FrontSide});
 const curtainDark=new T.MeshStandardMaterial({color:0x15283d,roughness:.2,metalness:.4,transparent:false,depthWrite:true});
 const mullion=new T.MeshStandardMaterial({color:0x7b8794,roughness:.42,metalness:.55});
 // Window grid is a single opaque facade layer over an opaque structural core.
 // Avoid transparent planes or coplanar duplicate panes (the cause of ghosted buildings).
 function glassTower(g,w,d,h,index){
  const shell=new T.MeshStandardMaterial({color:0x172c43,roughness:.5,metalness:.2});
  b(g,0,h/2,0,w,h,d,shell);
  const floors=Math.max(5,Math.floor(h/2.95)),cols=Math.max(5,Math.floor(w/1.8)),depthCols=Math.max(4,Math.floor(d/1.8));
  const paneW=w/cols,paneD=d/depthCols;
  for(let f=0;f<floors;f++){
   const y=1.6+f*(h-2.5)/floors,ph=(h-2.5)/floors-.1;
   for(let i=0;i<cols;i++){
    const x=-w/2+(i+.5)*paneW,material=(f*13+i*7+index)%11===0?curtainDark:((f+i)%4===0?curtainAlt:curtainGlass);
    for(const side of [-1,1])b(g,x,y,side*(d/2+.065),paneW-.095,ph,.075,material);
   }
   for(let i=0;i<depthCols;i++){
    const z=-d/2+(i+.5)*paneD,material=(f*9+i*5+index)%13===0?curtainDark:((f+i)%3===0?curtainAlt:curtainGlass);
    for(const side of [-1,1])b(g,side*(w/2+.065),y,z,.075,ph,paneD-.095,material);
   }
   b(g,0,y+ph/2+.045,d/2+.16,w,.035,.055,mullion);
   b(g,0,y+ph/2+.045,-d/2-.16,w,.035,.055,mullion);
  }
  for(let i=0;i<=cols;i++){
   const x=-w/2+i*paneW;
   for(const side of [-1,1])b(g,x,h/2,side*(d/2+.15),.045,h,.045,mullion);
  }
  for(let i=0;i<=depthCols;i++){
   const z=-d/2+i*paneD;
   for(const side of [-1,1])b(g,side*(w/2+.15),h/2,z,.045,h,.045,mullion);
  }
  b(g,0,h+.2,0,w+.4,.4,d+.4,mullion);
  b(g,0,1.55,d/2+.22,3,3,.12,curtainDark);
 }

 const iron=new T.MeshStandardMaterial({color:0x272b2b,roughness:.78,metalness:.38});
 function skylineTower(x,z,w,d,h,index){
  const g=new T.Group();g.position.set(x,0,z);root.add(g);
  // Street-scale brick apartments and occasional distinctive taller buildings.
  const style=index%9,brick=style!==7&&style!==8;
  if(style===7||style===8){glassTower(g,w,d,h,index);return g;}
  const floors=Math.max(3,Math.floor(h/3.25));
  const body=brick?brickWalls[index%brickWalls.length]:wall[index%wall.length];
  b(g,0,h/2,0,w,h,d,body);
  // Cornices, rooftop water towers, ventilation and parapets vary by building.
  b(g,0,h+.35,0,w+.6,.7,d+.6,brick?concrete:frame);
  if(index%4===0){
   b(g,0,h+1.05,0,w+.35,.6,d+.35,concrete);
   const tank=new T.Mesh(new T.CylinderGeometry(1.15,1.15,2.6,10),metal);
   tank.position.set(w*.2,h+2.4,0);g.add(tank);
   for(const dx of [-.9,.9])pole(g,w*.2+dx,h+1,0,.08,2,iron);
  }else if(index%4===1){
   b(g,w*.18,h+1.2,0,3.2,1.7,3,frame);
  }else if(index%4===2){
   b(g,0,h+1,0,w*.75,1.2,d*.7,body);
  }
  const bays=Math.max(2,Math.floor(w/3.3));
  const sideBays=Math.max(2,Math.floor(d/3.4));
  for(let floor=0;floor<floors;floor++){
   const yy=1.9+floor*3.25;
   if(yy+1.2>h)break;
   // Individual dark windows with stone lintels and sills, not full-width stripes.
   for(let bay=0;bay<bays;bay++){
    const xx=-w/2+(bay+.5)*w/bays;
    for(const face of [-1,1]){
     b(g,xx,yy,face*(d/2+.095),1.35,1.9,.12,darkGlass);
     b(g,xx,yy+1.04,face*(d/2+.16),1.7,.15,.23,concrete);
     b(g,xx,yy-.99,face*(d/2+.18),1.7,.11,.3,concrete);
     b(g,xx,yy,face*(d/2+.19),.075,1.94,.09,frame);
    }
   }
   for(let bay=0;bay<sideBays;bay++){
    const zz=-d/2+(bay+.5)*d/sideBays;
    for(const face of [-1,1]){
     b(g,face*(w/2+.08),yy,zz,.12,1.8,1.25,darkGlass);
     b(g,face*(w/2+.14),yy+1.03,zz,.23,.13,1.5,concrete);
    }
   }
  }
  // NYC-style black fire escapes, alternating landings, guardrails and ladders.
  if(brick&&index%3!==2){
   const fx=w*.23,front=d/2+.78;
   for(let floor=1;floor<Math.min(floors,7);floor++){
    const y=floor*3.25+.15;
    b(g,fx,y,front,3.4,.12,1.25,iron);
    b(g,fx,y+.82,front+.6,3.4,.08,.07,iron);
    for(let p=0;p<5;p++)b(g,fx-1.5+p*.75,y+.42,front+.6,.065,.82,.065,iron);
    if(floor<Math.min(floors,7)-1){
     const ladder=new T.Group();g.add(ladder);
     ladder.position.set(fx+1.25,y+1.55,front+.45);
     ladder.rotation.z=.27;
     for(const dx of [-.34,.34])b(ladder,dx,0,0,.07,3.2,.07,iron);
     for(let step=0;step<10;step++)b(ladder,0,-1.4+step*.3,0,.75,.06,.07,iron);
    }
   }
  }
  // Ground-floor entrances and occasional storefront awnings.
  b(g,0,1.45,d/2+.14,2.15,2.8,.16,frame);
  b(g,0,3.0,d/2+.48,3.3,.22,.95,frame);
  if(index%4===3){
   const awning=new T.MeshStandardMaterial({color:0x385b55,roughness:.9});
   b(g,-w*.25,3.3,d/2+.7,w*.38,.22,1.6,awning);
  }
  return g;
 }
 // City extends beyond the playable district in concentric, staggered rows.
 // Avoid the main view corridor and keep structures outside +/-170m play bounds.
 let total=0;
 for(let ring=0;ring<3;ring++){ // Restore interior skyline; reject all exterior placements
  const radius=145+ring*54;
  const n=ring===0?36:46;
  for(let i=0;i<n;i++){
   const angle=2*Math.PI*(i+.24*(rnd()-.5))/n;
   const x=Math.cos(angle)*(radius+(rnd()-.5)*22);
   const z=Math.sin(angle)*(radius+(rnd()-.5)*22);
   // South Beach and the ocean must remain completely free of city towers.
   if(z>105)continue; // Preserve the beach and ocean approach
   // Protect Needle Park's courts, pond and sightline from surrounding skyline towers.
   if(x>13&&x<83&&z> -250&&z< -135)continue;
   // Golf course protected land: do not place background towers on fairways or clubhouse.
   if(x>218&&x<590&&z>-285&&z<184)continue;
   const w=14+rnd()*12,d=12+rnd()*13,h=28+rnd()*40+(ring===2&&total%8===0?20:0);
   // Keep the full footprint of every ownable home clear of skyline towers.
   // Includes a 5m separation gap so detached homes never merge into apartments.
   const protectedHomes=[];
   for(const hx of [-246,-220,-194,-168,-142])for(const hz of [-128,-64,-32,32])protectedHomes.push({x:hx,z:hz,w:24,d:32});
   const touchesHome=protectedHomes.some(home=>
     Math.abs(x-home.x)<(w+home.w)/2+5 &&
     Math.abs(z-home.z)<(d+home.d)/2+5);
   if(touchesHome)continue;
   // Reserve full road and sidewalk corridors, including the actual building footprint.
   // The old radial placement allowed skyscrapers to intersect the extended roads.
   const roads=[-96,0,96];
   if(roads.some(c=>Math.abs(x-c)<w/2+17||Math.abs(z-c)<d/2+17))continue;
   if(Math.abs(z+117)<d/2+12)continue;
   if(x+w/2>13&&x-w/2<83&&z+d/2> -250&&z-d/2< -135)continue;
   // Never generate a tower beyond the solid perimeter wall.
   // The outside view must be wilderness, not a second skyline.
   if(x-w/2<=-266||x+w/2>=560||z-d/2<=-275||z+d/2>=115)continue;
   if(Math.abs(x-140)<w/2+24&&Math.abs(z-35)<d/2+18)continue; // Luxe Lanes footprint and access
   if(Math.abs(x-188)<w/2+17&&Math.abs(z-61)<d/2+15)continue; // Boutique footprint
   skylineTower(x,z,w,d,h,total++);
  }
 }
 // Relocate corner towers to vacant northern lots before adding the news headquarters.
 const towers=root.children.filter(g=>g.isGroup&&g.children.length>100);
 for(const g of towers){const size=new T.Box3().setFromObject(g).getSize(new T.Vector3());if(Math.abs(g.position.x-136)>size.x/2+19||Math.abs(g.position.z+49)>size.z/2+20)continue;
  for(const [nx,nz]of [[-220,-230],[-180,-230],[-140,-230],[-220,-180],[-180,-180],[-140,-180],[190,-240],[150,-240],[190,-200],[150,-200],[190,-160],[130,-160]]){const clear=towers.every(o=>o===g||Math.abs(nx-o.position.x)>(size.x+o.children[0].scale.x)/2+5||Math.abs(nz-o.position.z)>(size.z+o.children[0].scale.z)/2+5);if(clear){g.position.set(nx,0,nz);g.name='Relocated corner apartment tower';g.userData.relocatedForNews=true;break;}}
 }
 // Replace the brick tower at the southeast plaza-side corner with scooter rentals.
 for(const g of [...root.children])if(g.isGroup&&g.position.x>120&&g.position.x<150&&g.position.z>40&&g.position.z<65&&g.children.length>100){root.remove(g);total--;}
 // Roads are owned exclusively by world-v5-complete-replacement.js.
 // Do not draw duplicate continuous road slabs here: they previously
 // resurfaced closed segments and overlaid landscaping and house plots.
 // Background city depth only supplies buildings and street furniture.
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
 // Brick facade, varied rooftops and fire escapes replace uniform striped skyscrapers.
 return {root,skylineCount:total,dispose(){scene.remove(root);}};
}
