import * as THREE from 'three';
// Three distinctive architecture kits inspired by user-provided references:
// historic brick fire-escape apartments, glass terrace residences, modern white-frame condos.
// All elements are actual 3D meshes, not photo billboards.
export function addSignatureArchitecture(group,{w,d,h,style=0}={}){
 const brick=new THREE.MeshStandardMaterial({color:0x974e3f,roughness:.94});
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
