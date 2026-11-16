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
 const homes=[];
 function box(g,w,h,d,x,y,z,mat){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
 // Two outlying rows on the western and eastern edge of the city, well
 // inland from the beach and ocean. Each lot has a driveway and garage.
 for(const side of [-1,1])for(let row=0;row<5;row++){
  const id=(side===-1?0:5)+row+1;
  const x=side*146,z=-145+row*27;
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
  homes.push({id,x,z,group:g,body,furniture,sign,baseColor:(id-1)%wall.length});
 }
 function closest(x,z,max=8){let best=null,dist=max;for(const home of homes){const d=Math.hypot(home.x-x,home.z-10-z);if(d<dist){best=home;dist=d;}}return best;}
 function buy(home){if(owned&&owned.id!==home.id)return {ok:false,message:'You already own a home in this demo.'};
  if(!owned){owned={id:home.id,color:home.baseColor,balance:100};try{localStorage.setItem(savedKey,JSON.stringify(owned));}catch(e){}}
  homes.forEach(h=>{h.furniture.visible=h.id===owned.id;h.sign.material.color.setHex(h.id===owned.id?0x4e8d6e:0x204b69);});
  return {ok:true,message:'Home '+home.id+' is yours! Demo price: 200 Zer Bucks. Starter furniture and garage included.'};
 }
 function decorate(){if(!owned)return {ok:false,message:'Buy a home first.'};owned.color=(owned.color+1)%wall.length;
  const h=homes.find(h=>h.id===owned.id);if(h)h.body.material=wall[owned.color];
  try{localStorage.setItem(savedKey,JSON.stringify(owned));}catch(e){}
  return {ok:true,message:'Your home exterior color has changed.'};
 }
 if(owned){const h=homes.find(h=>h.id===owned.id);if(h)h.body.material=wall[owned.color%wall.length];}
 return {root,homes,closest,buy,decorate,get owned(){return owned;}};
}
