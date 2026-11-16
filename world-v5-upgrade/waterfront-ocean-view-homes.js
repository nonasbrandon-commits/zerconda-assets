import * as THREE from 'three';
// Waterfront residential district: original, unbranded 3D homes.
// Ocean is toward +Z; broad glazing and terraces face the water.
// All homes stay on the city side of the beach (z < 154).
export function addWaterfrontHomes(scene,{count=12}={}){
 const root=new THREE.Group();root.name='Zerconda ocean-view homes';scene.add(root);
 const walls=[0xd5c4a8,0xb58a70,0xe1d8c6,0x9e6653,0xc5b7a4,0xc8d3d3].map(color=>new THREE.MeshStandardMaterial({color,roughness:.9}));
 const trim=new THREE.MeshStandardMaterial({color:0xe6dfd3,roughness:.88});
 const glass=new THREE.MeshPhysicalMaterial({color:0x80b9d3,metalness:.18,roughness:.13,transparent:true,opacity:.72,side:THREE.DoubleSide});
 const rail=new THREE.MeshStandardMaterial({color:0x333b40,metalness:.65,roughness:.4});
 const roof=new THREE.MeshStandardMaterial({color:0x454b4b,roughness:.85});
 const wood=new THREE.MeshStandardMaterial({color:0x9c7758,roughness:.88});
 const lawn=new THREE.MeshStandardMaterial({color:0x60854e,roughness:1});
 function box(g,w,h,d,x,y,z,mat){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);
  m.castShadow=true;m.receiveShadow=true;g.add(m);return m;
 }
 const spots=[];
 // Two coastal clusters, separated by the central road and beach access.
 for(const x of [-158,-137,-116,-77,-56,-35,35,56,77,116,137,158])spots.push({x,z:135});
 for(let i=0;i<Math.min(count,spots.length);i++){
  const {x,z}=spots[i];const g=new THREE.Group();g.position.set(x,0,z);root.add(g);
  const type=i%4,wide=14+(i%3)*1.3,deep=13+(i%2)*2;
  const levels=type===0?2:type===1?3:2;
  const height=levels*3.3+1;
  box(g,wide+.7,.12,deep+.7,0,.02,0,lawn);
  box(g,wide,height,deep,0,height/2,0,walls[i%walls.length]);
  // Architectural variety: roof parapet, asymmetric upper volume and stone columns.
  if(type===0||type===3){
   box(g,wide+.7,.45,deep+.7,0,height+.23,0,trim);
   box(g,wide*.48,2.5,deep*.7,-wide*.22,height+1.35,-deep*.1,walls[(i+2)%walls.length]);
  }else{
   box(g,wide+.6,.45,deep+.6,0,height+.22,0,roof);
   box(g,wide*.45,1.3,deep*.6,wide*.2,height+.9,-deep*.1,roof);
  }
  // Ocean-facing glass walls: large views from every upper floor.
  for(let floor=0;floor<levels;floor++){
   const y=1.75+floor*3.3;
   for(let bay=0;bay<3;bay++){
    const xx=(bay-1)*wide*.29;
    box(g,wide*.265,2.45,.1,xx,y,deep/2+.11,glass);
    box(g,.1,2.6,.16,xx+wide*.135,y,deep/2+.18,rail);
    box(g,wide*.29,.15,.22,xx,y+1.27,deep/2+.19,trim);
   }
   if(floor>0){
    // Ocean-view balcony with safety railing and projecting terrace.
    box(g,wide*.78,.18,2.1,0,y-1.45,deep/2+1,trim);
    box(g,wide*.78,.09,.09,0,y-.48,deep/2+2,rail);
    for(let k=0;k<9;k++)box(g,.055,.93,.055,-wide*.39+k*wide*.78/8,y-.96,deep/2+2,rail);
    for(const side of [-1,1])box(g,.08,.95,2.1,side*wide*.39,y-.96,deep/2+1,rail);
   }
  }
  // Entrance and street-side windows face the inland access side.
  box(g,2.1,2.6,.14,0,1.35,-deep/2-.13,wood);
  for(const xx of [-wide*.3,wide*.3])for(let floor=0;floor<levels;floor++){
   box(g,1.8,1.8,.12,xx,1.9+floor*3.3,-deep/2-.13,glass);
  }
  for(const side of [-1,1]){
   box(g,.25,height,deep+.1,side*(wide/2-.18),height/2,0,trim);
   for(let floor=0;floor<levels;floor++)box(g,.13,1.8,2.4,side*(wide/2+.1),1.9+floor*3.3,0,glass);
  }
 }
 return {root,homes:Math.min(count,spots.length)};
}
