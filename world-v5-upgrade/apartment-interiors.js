// Zerconda apartment interior asset kit — original 3D models, Three.js r160.
// Units are meters. Entrance at local z=+depth/2; elevator and stairs at rear.
import * as THREE from 'three';
const BASE='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/';
const texLoader=new THREE.TextureLoader();
const mat=(c,r=.8,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const plaster=mat(0xe6dfd3),trim=mat(0xd2c5b4),bronze=mat(0x98784e,.32,.65);
const metal=mat(0x747c80,.27,.7),black=mat(0x22292d,.3,.5),wood=mat(0x77513b,.64);
const fabric=mat(0x677b83,.95),fabricLight=mat(0x9b958c,.98),marble=mat(0xded6c9,.23);
const glass=new THREE.MeshPhysicalMaterial({color:0xb9d6dc,roughness:.08,metalness:.06,transparent:true,opacity:.55,side:THREE.DoubleSide,clearcoat:1});
const cube=new THREE.BoxGeometry(1,1,1);
function b(g,w,h,d,x,y,z,m){const o=new THREE.Mesh(cube,m);o.scale.set(w,h,d);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}
function group(parent,x=0,y=0,z=0){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);return g;}
function photo(path,repeatX=1,repeatY=1){const t=texLoader.load(BASE+path);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeatX,repeatY);t.anisotropy=8;return new THREE.MeshStandardMaterial({map:t,roughness:.85});}
const stoneFloor=photo('realistic-assets/photographic-environment-v2/warm-paving.jpg',5,4);
const brickWall=photo('realistic-assets/photographic-environment-v2/urban-plaster.jpg',4,2);
const stairStone=photo('realistic-assets/photographic-environment-v2/aged-paving.jpg',2,1);
function sofa(parent,x,z,wide=false,rotation=0){
 const g=group(parent,x,0,z);g.rotation.y=rotation;
 const w=wide?2.7:1.65;
 b(g,w,.26,.85,0,.45,0,fabric);b(g,w,.78,.24,0,.78,-.42,fabric);
 for(const s of [-1,1]){b(g,.2,.56,.91,s*(w/2-.09),.62,0,fabric);}
 for(let i=0;i<(wide?3:2);i++){
  const px=-w/2+(i+.5)*w/(wide?3:2);
  b(g,w/(wide?3:2)-.07,.14,.72,px,.63,.04,fabricLight);
  b(g,w/(wide?3:2)-.08,.51,.15,px,.89,-.27,fabric);
 }
 for(const sx of [-1,1])for(const sz of [-1,1])b(g,.09,.2,.09,sx*(w/2-.18),.17,sz*.3,wood);
 g.name=wide?'Apartment lobby sofa':'Apartment lobby loveseat';return g;
}
function coffeeTable(parent,x,z){
 const g=group(parent,x,0,z);b(g,1.6,.1,.83,0,.49,0,marble);
 for(const sx of [-1,1])for(const sz of [-1,1])b(g,.08,.46,.08,sx*.64,.23,sz*.28,bronze);
 g.name='Marble coffee table';return g;
}
function reception(parent,x,z){
 const g=group(parent,x,0,z);
 b(g,3.4,1.06,.8,0,.53,0,wood);
 b(g,3.55,.1,.98,0,1.09,0,marble);
 for(let i=-1;i<=1;i++)b(g,.035,.77,.03,i*1.08,.5,.416,bronze);
 b(g,.72,.42,.055,-.85,1.46,-.18,black);
 b(g,.65,.035,.22,-.85,1.23,-.1,metal);
 b(g,.72,.1,.4,.85,1.18,-.1,marble);
 g.name='Apartment reception front desk';return g;
}
function elevator(parent,x,z){
 const g=group(parent,x,0,z);
 b(g,3.1,3.2,.17,0,1.6,0,metal);
 for(const s of [-1,1])b(g,1.31,2.72,.1,s*.68,1.52,.12,mat(0xb1b9bc,.22,.7));
 b(g,.06,2.8,.15,0,1.5,.2,black);
 b(g,3.45,.2,.38,0,3.13,.1,bronze);
 b(g,.26,.47,.09,1.83,1.23,.18,black);
 b(g,.12,.12,.12,1.83,1.36,.27,bronze);
 g.name='Elevator with double doors and call button';
 return {group:g,doors:g.children.slice(1,3)};
}
function stairwell(parent,x,z,floors=4){
 const g=group(parent,x,0,z);
 const rise=.165,run=.3,steps=20;
 for(let floor=0;floor<floors;floor++){
  const level=floor*3.3;
  for(let i=0;i<steps;i++){
   const y=level+(i+.5)*rise;
   const zz=(i-steps/2)*run;
   b(g,2.25,rise+.015,run+.02,0,y,zz,stairStone);
   b(g,2.27,.045,run+.06,0,y+rise/2,zz,marble);
  }
  b(g,2.55,.16,1.45,0,level+3.32,steps*run/2+.5,stairStone);
  for(const sx of [-1,1]){
   for(let j=0;j<6;j++){
    const i=j*3.8;const yy=level+i*rise+1;
    b(g,.045,1.05,.045,sx*1.15,yy,(i-steps/2)*run,metal);
   }
   const rail=b(g,.07,.07,steps*run+1,sx*1.15,level+2.45,0,wood);
   rail.rotation.x=-Math.atan2(steps*rise,steps*run);
  }
 }
 g.name='Multi-floor apartment stairwell';return g;
}
function apartmentDoor(parent,x,y,z){
 const g=group(parent,x,y,z);
 b(g,1.12,2.35,.12,0,1.175,0,wood);
 b(g,1.28,.12,.21,0,2.35,0,trim);
 for(const sx of [-1,1])b(g,.09,2.45,.2,sx*.62,1.22,0,trim);
 b(g,.08,.08,.14,.37,1.05,.15,bronze);
 b(g,.38,.16,.045,0,1.9,.08,metal);
 g.name='Apartment corridor door';return g;
}
export function createApartmentLobby({scene,x=0,z=0,width=16,depth=19,floors=4,visible=true}={}){
 if(!scene)throw new Error('scene required');
 const root=group(scene,x,0,z);root.name='Zerconda furnished apartment lobby';root.visible=visible;
 b(root,width,.22,depth,0,-.06,0,stoneFloor);
 b(root,width,.16,depth,0,4.1,0,plaster);
 b(root,width,4,.22,0,2,-depth/2,brickWall);
 for(const sx of [-1,1])b(root,.22,4,depth,sx*width/2,2,0,brickWall);
 // Reception and sitting area face the main entrance.
 reception(root,-3,depth*.15);
 sofa(root,2.7,depth*.13,true,Math.PI/2);
 sofa(root,4.9,-depth*.19,false,Math.PI);
 coffeeTable(root,3.4,-depth*.09);
 const lift=elevator(root,-4.8,-depth/2+.5);
 const stairs=stairwell(root,4.7,-depth*.33,Math.min(floors,8));
 for(let floor=0;floor<floors;floor++){
  const y=floor*3.3;
  for(const sx of [-1,1])apartmentDoor(root,sx*6.4,y,-depth*.08);
 }
 for(const sx of [-1,1])for(const zz of [-5,1,6]){
  const l=new THREE.PointLight(0xffe8c9,2.1,8,2);l.position.set(sx*4,3.75,zz);root.add(l);
  b(root,1.2,.07,.55,sx*4,4,zz,marble);
 }
 b(root,3.4,.09,.18,0,3.1,depth/2-.24,bronze);
 b(root,2.8,2.65,.08,0,1.34,depth/2-.1,glass);
 return {root,lift,stairs,dispose(){scene.remove(root);}};
}

export function createApartmentExperience({scene,x=1050,z=1050}={}){
 const lobby=createApartmentLobby({scene,x,z,width:18,depth:22,floors:4});
 const root=lobby.root;
 // Furnished accessible residential levels. Only one floor is displayed at a time.
 const floors=4,levelGroups=[];
 const bedMat=mat(0xd9d4ca),kitchen=mat(0xaaa49c),accent=mat(0x526d81),floorMat=stoneFloor;
 for(let f=0;f<floors;f++){
  const g=group(root,0,0,0);g.name='Apartment floor '+(f+1);levelGroups.push(g);
  const y=0; // Separate virtual floors share ground plane; floor selector changes visibility.
  b(g,18,.2,22,0,-.17,0,floorMat);
  // Central corridor and four individually furnished rooms.
  for(const sx of [-1,1]){
   const xx=sx*5.1;
   b(g,.2,3.4,19,sx*2.1,1.7,0,plaster);
   b(g,.2,3.4,19,sx*8.85,1.7,0,plaster);
   for(const zz of [-5,5]){
    b(g,6.5,3.4,.2,xx,1.7,zz+5,plaster);
    // Bedroom: bed, pillows, side tables, wardrobe, lamp.
    b(g,2.1,.45,2.7,xx,.36,zz-1,wood);
    b(g,1.94,.28,2.52,xx,.74,zz-1,bedMat);
    b(g,1.7,.15,.48,xx,.95,zz-2,plaster);
    b(g,.65,.65,.65,xx+sx*1.55,.4,zz-2,wood);
    b(g,1.65,.85,.72,xx, .5,zz+1.65,fabric);
    b(g,1.6,.17,.8,xx,.47,zz+3.1,wood);
    b(g,1.7,2.3,.65,xx-sx*1.8,1.15,zz+3.4,kitchen);
    b(g,1.2,.8,.62,xx+sx*1.8,.5,zz+3.4,accent);
    const light=new THREE.PointLight(0xffdfb6,1.4,8);light.position.set(xx,2.9,zz);g.add(light);
   }
  }
  b(g,1.6,.1,16,0,-.05,0,marble);
 }
 // Keep reception on floor 0, residential floors swap to fully furnished floor.
 function showFloor(f){const floor=Math.max(0,Math.min(floors,f|0));lobby.root.children.forEach(c=>{if(!levelGroups.includes(c))c.visible=floor===0;});for(let i=0;i<floors;i++)levelGroups[i].visible=floor===i+1;}
 showFloor(0);
 return {root,showFloor,floorCount:5,x,z,contains(px,pz){return Math.abs(px-x)<8.6&&Math.abs(pz-z)<10.5},dispose:lobby.dispose};
}
