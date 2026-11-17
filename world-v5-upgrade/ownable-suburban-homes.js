import * as THREE from 'three';
// Playable prototype neighborhood. Ownership is stored only in this browser,
// NOT in an authenticated server account or payment ledger.
export function createOwnableHomes(scene){
 const root=new THREE.Group();root.name='Outer residential homes';scene.add(root);
 const wallColors=[0xe5d8c7,0xc8b49e,0xd6e0dc,0xb87965,0xe0d0ae,0xabb9c2];
 const wall=wallColors.map(color=>new THREE.MeshStandardMaterial({color,roughness:.87}));
 const trim=new THREE.MeshStandardMaterial({color:0xf1eee6,roughness:.83});
 const roof=new THREE.MeshStandardMaterial({color:0x404b54,roughness:.88});
 const windows=new THREE.MeshPhysicalMaterial({color:0x83b6c8,roughness:.18,metalness:.22,transparent:true,opacity:.72});
 const wood=new THREE.MeshStandardMaterial({color:0x8e6349,roughness:.86});
 const lawn=new THREE.MeshStandardMaterial({color:0x567d43,roughness:1});
 const concrete=new THREE.MeshStandardMaterial({color:0xc9c6bf,roughness:.95});
 const dark=new THREE.MeshStandardMaterial({color:0x28353a,roughness:.62});
 const palette=[0x9fbeaa,0xc6a3a2,0xb5b7d8,0xe2c38e];
 const savedKey='zerconda-v5-demo-home';
 let owned=null;try{owned=JSON.parse(localStorage.getItem(savedKey)||'null');}catch(e){}

 // Demo-only local ownership. A production multiplayer server must be authoritative.
 function safeName(value){return String(value||'').trim().replace(/[^a-zA-Z0-9_ .-]/g,'').slice(0,24);}
 function doorLabel(home,name){
  if(home.namePlate){home.group.remove(home.namePlate);home.namePlate.geometry.dispose();home.namePlate.material.map?.dispose();home.namePlate.material.dispose();}
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;
  const ctx=canvas.getContext('2d');ctx.fillStyle='#14252c';ctx.fillRect(0,0,512,128);
  ctx.strokeStyle='#d9c9a4';ctx.lineWidth=7;ctx.strokeRect(5,5,502,118);
  ctx.fillStyle='#fff8e8';ctx.font='bold 46px Arial';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(name||'FOR SALE',256,65,470);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const plate=new THREE.Mesh(new THREE.PlaneGeometry(3.5,.88),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));
  plate.position.set(-3.4,3.3,-7.72);plate.rotation.y=Math.PI;
  home.group.add(plate);home.namePlate=plate;
 }
 const homes=[];
 function box(g,w,h,d,x,y,z,mat){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
 // Two outlying rows on the western and eastern edge of the city, well
 // inland from the beach and ocean. Each lot has a driveway and garage.
 for(const side of [-1,1])for(let row=0;row<5;row++){
  const id=(side===-1?0:5)+row+1;
  // Keep lots off the east-west roads at z=-96, -48 and 0.
  // Previous row 2 at z=-91 placed a full house across the roadway.
  const residentialZ=[-174,-139,-72,-22,32];
  const x=side*146,z=residentialZ[row];
  const g=new THREE.Group();g.position.set(x,0,z);root.add(g);
  const h=6.7+(id%3)*.65,w=13,d=15;
  const body=box(g,w,h,d,0,h/2,0,wall[(id-1)%wall.length]);
  box(g,16,.08,23,0,.035,0,lawn);
  box(g,14,.45,16,0,h+.18,0,roof);
  if(id%3===0){box(g,7,2.3,10,-2,h+1.35,0,wall[(id+1)%wall.length]);box(g,7,.3,10,-2,h+2.55,0,roof);}
  if(id%3===1){box(g,14.8,.32,17,0,h+.55,0,trim);}
  if(id%3===2){box(g,13.7,.4,16,0,h+.42,0,roof);box(g,7,.3,10,3,h+.85,0,trim);}
  // Front door and real separate garage, visible from the access lane.
  box(g,2.1,2.9,.16,-3.4,1.47,-d/2-.15,wood);
  box(g,4.6,3.2,.25,3.4,1.65,-d/2-.17,dark);
  for(let k=0;k<5;k++)box(g,4.3,.05,.27,3.4,.45+k*.55,-d/2-.36,trim);
  for(const floor of [0,1])for(const dx of [-4,0,4]){
   if(floor===0&&dx!==0)continue;
   box(g,2.1,1.7,.11,dx,2.15+floor*3.3,d/2+.12,windows);
   box(g,2.35,.14,.25,dx,3.05+floor*3.3,d/2+.17,trim);
  }
  for(const dx of [-5,5])box(g,1.7,1.65,.12,dx,4.7,-d/2-.14,windows);
  // Balcony facing the garden, and landscaped yard.
  box(g,7,.17,2,0,3.55,d/2+1,concrete);
  box(g,7,.12,.1,0,4.5,d/2+1.9,dark);
  for(let k=0;k<8;k++)box(g,.08,.9,.08,-3.4+k*.97,4.05,d/2+1.9,dark);
  box(g,5,.08,9,3.4,.08,-11,concrete);
  box(g,2,.08,3,-3.4,.08,-9,concrete);
  const furniture=new THREE.Group();furniture.position.set(0,0,0);g.add(furniture);
  // Starter furniture included with a purchased home.
  box(furniture,2.5,.45,1.1,-2,.52,3,wood);
  box(furniture,3.3,.6,1.5,1.8,.5,3,new THREE.MeshStandardMaterial({color:palette[(id-1)%4],roughness:.95}));
  box(furniture,1.6,.12,1.1,0,.65,5,trim);
  furniture.visible=!!owned&&owned.id===id;
  const sign=box(g,1.7,.85,.08,-5.5,1.15,-10,new THREE.MeshStandardMaterial({color:owned?.id===id?0x4e8d6e:0x204b69}));
  box(g,.09,1.4,.09,-5.5,.7,-10,wood);
  const home={id,x,z,group:g,body,furniture,sign,baseColor:(id-1)%wall.length};
  homes.push(home);doorLabel(home,owned?.id===id?safeName(owned.username)||'OWNER':'FOR SALE');
 }
 // Ten additional detached family houses in the open western residential expansion.
 // Two rows of five, with individual garages, pitched shingle roofs, porches and driveways.
 const shingles=new THREE.MeshStandardMaterial({color:0x504b47,roughness:.98});
 const brick=new THREE.MeshStandardMaterial({color:0xb59b85,roughness:.95});
 const garageDoor=new THREE.MeshStandardMaterial({color:0xdedbd2,roughness:.78});
 const pane=new THREE.MeshStandardMaterial({color:0x456a7a,roughness:.22,metalness:.15});
 function gable(g,ww,dd,y,centerX=0,centerZ=0){
  const rise=2.5;
  const roofShape=new THREE.Shape();
  roofShape.moveTo(-ww/2-.35,0);roofShape.lineTo(0,rise);roofShape.lineTo(ww/2+.35,0);roofShape.closePath();
  const roofGeo=new THREE.ExtrudeGeometry(roofShape,{depth:dd+.7,bevelEnabled:false});
  roofGeo.computeVertexNormals();
  const roofMesh=new THREE.Mesh(roofGeo,shingles);
  roofMesh.position.set(centerX,y,centerZ-(dd+.7)/2);roofMesh.castShadow=true;roofMesh.receiveShadow=true;g.add(roofMesh);
  for(const side of [-1,1]){
   const slant=new THREE.Mesh(new THREE.BoxGeometry(Math.hypot(ww/2+.35,rise),.13,dd+.8),roof);
   slant.rotation.z=side*Math.atan2(rise,ww/2+.35);
   slant.position.set(centerX+side*(ww/4+.175),y+rise/2,centerZ);
   slant.castShadow=true;g.add(slant);
  }
 }
 for(let row=0;row<5;row++)for(let column=0;column<2;column++){
  const id=11+row*2+column;
  // Dedicated lots between cross-streets; keep full 25m plot off z=-96, 0, 96.
  const detachedLotZ=[-204,-166,-130,-62,-30];
  const x=-210+column*27,z=detachedLotZ[row];
  const g=new THREE.Group();g.name='Detached family home '+id;g.position.set(x,0,z);root.add(g);
  const w=14.2,d=15.4,h=6.65,base=wall[(id+1)%wall.length];
  box(g,21,.1,25,0,.025,0,lawn);
  const body=box(g,w,h,d,0,h/2,0,base);
  // Stone/brick main floor, upper siding, trim and pitched architectural roof.
  box(g,w+.08,3.12,d+.08,0,1.56,0,id%2?brick:base);
  box(g,w+.25,.2,d+.25,0,3.16,0,trim);
  gable(g,w,d,h);
  // Garage to the left of the main entry with raised panels and upper windows.
  const garageX=-3.65,front=-d/2-.18;
  box(g,5.5,3.1,.18,garageX,1.65,front,garageDoor);
  for(let k=0;k<4;k++)box(g,5.2,.055,.06,garageX,.42+k*.68,front-.12,trim);
  for(let k=0;k<4;k++)box(g,1.06,.38,.08,garageX-1.92+k*1.28,2.62,front-.15,pane);
  // Covered entry porch, stone steps, front door and decorative columns.
  box(g,4.6,.19,3.15,3.5,3.32,front-.9,shingles);
  for(const xx of [1.45,5.55])box(g,.23,3.15,.23,xx,1.68,front-2.22,trim);
  box(g,2.0,2.8,.17,3.5,1.42,front,wood);
  box(g,.18,.18,.12,4.15,1.42,front-.13,garageDoor);
  // Steps run perpendicular to the front wall, directly outward from the door.
   // The lowest tread is furthest into the yard; each successive tread rises toward the threshold.
   for(let step=0;step<3;step++){
    const treadDepth=.58, treadHeight=.14;
    const centerZ=front-2.15+step*.65;
    box(g,2.35,treadHeight, treadDepth,3.5,treadHeight/2+step*treadHeight,centerZ,concrete);
   }
  // Window openings represented by inset dark glass and dimensional white casing.
  for(const yy of [1.82,5.02])for(const xx of [-4.6,-.65,3.8]){
   if(yy<3&&xx<0)continue;
   box(g,2.1,1.8,.12,xx,yy,front-.05,pane);
   for(const sx of [-1,1])box(g,.12,2.05,.16,xx+sx*1.1,yy,front-.17,trim);
   for(const sy of [-1,1])box(g,2.35,.12,.18,xx,yy+sy*.95,front-.17,trim);
   box(g,.08,1.8,.17,xx,yy,front-.18,trim);
   box(g,2.1,.07,.17,xx,yy,front-.18,trim);
  }
  for(const side of [-1,1])for(const zz of [-3.1,2.7]){
   box(g,.12,1.75,2.1,side*(w/2+.09),4.65,zz,pane);
  }
  // Front walkway and individual driveway on each plot.
  box(g,5.7,.09,11,garageX,.07,front-5.2,concrete);
  box(g,2.15,.09,5.5,3.5,.08,front-4.7,concrete);
  // Plantings and small front garden.
  for(const xx of [-6.4,6.3]){
   for(let k=0;k<3;k++){
    const shrub=new THREE.Mesh(new THREE.IcosahedronGeometry(.37+(k%2)*.12,2),new THREE.MeshStandardMaterial({color:0x365b37,roughness:1}));
    shrub.position.set(xx,.42,front-1.1+k*.9);shrub.castShadow=true;g.add(shrub);
   }
  }
  const furniture=new THREE.Group();g.add(furniture);
  box(furniture,2.7,.5,1.3,0,.5,2.3,wood);
  box(furniture,2.8,.7,1.5,2,.55,3.2,new THREE.MeshStandardMaterial({color:palette[id%4],roughness:.9}));
  furniture.visible=!!owned&&owned.id===id;
  const sign=box(g,1.7,.85,.08,5.9,1.1,front-4,new THREE.MeshStandardMaterial({color:owned?.id===id?0x4e8d6e:0x204b69}));
  box(g,.09,1.4,.09,5.9,.7,front-4,wood);
  const home={id,x,z,group:g,body,furniture,sign,baseColor:(id+1)%wall.length};
  homes.push(home);doorLabel(home,owned?.id===id?safeName(owned.username)||'OWNER':'FOR SALE');
 }
 function closest(x,z,max=8){let best=null,dist=max;for(const home of homes){const d=Math.hypot(home.x-x,home.z-10-z);if(d<dist){best=home;dist=d;}}return best;}
 function buy(home,username){
  if(owned&&owned.id!==home.id)return {ok:false,message:'You can own only one home.'};
  if(owned?.id===home.id)return {ok:false,message:'This home is already yours.'};
  const name=safeName(username);
  if(!name)return {ok:false,message:'Enter your player username before buying a home.'};
  // Prototype-only: account currency and cross-player property availability
  // require server-side transactional validation before public launch.
  owned={id:home.id,color:home.baseColor,balance:100,username:name};
  try{localStorage.setItem(savedKey,JSON.stringify(owned));}catch(e){}
  homes.forEach(h=>{
   h.furniture.visible=h.id===owned.id;
   h.sign.material.color.setHex(h.id===owned.id?0x4e8d6e:0x204b69);
   doorLabel(h,h.id===owned.id?owned.username:'FOR SALE');
  });
  return {ok:true,message:'Home '+home.id+' reserved for '+name+' in this browser demo. 200 Zer Bucks is the planned price; no account currency was charged.'};
 }
 function decorate(){if(!owned)return {ok:false,message:'Buy a home first.'};owned.color=(owned.color+1)%wall.length;
  const h=homes.find(h=>h.id===owned.id);if(h)h.body.material=wall[owned.color];
  try{localStorage.setItem(savedKey,JSON.stringify(owned));}catch(e){}
  return {ok:true,message:'Your home exterior color has changed.'};
 }
 if(owned){const h=homes.find(h=>h.id===owned.id);if(h)h.body.material=wall[owned.color%wall.length];}
 return {root,homes,closest,buy,decorate,get owned(){return owned;}};
}
