import * as THREE from 'three';
// Nine distinct original architectural facade kits; each is actual 3D geometry.
// The base building, doors, and collision remain owned by world-v5.
export function addBuildingIdentity(group,{w,d,h,type=0}={}){
 const id=type%9;
 const P=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const limestone=P(0xc5bba9,.9),brick=P(0x81554a,.93),darkBrick=P(0x504b4a,.9),
  steel=P(0x63747b,.38,.65),copper=P(0x6b8178,.46,.55),white=P(0xe4e2d8,.75),
  blue=P(0x88b7c9,.18,.24),glass=P(0x789eb4,.14,.35),terracotta=P(0xb1765c,.85);
 const mat=[limestone,brick,steel,white,darkBrick,copper,terracotta,blue,limestone][id];
 const win=[glass,blue,glass,glass,blue,glass,blue,glass,glass][id];
 const geo=new THREE.BoxGeometry(1,1,1);
 function box(x,y,z,a,b,c,m){
  const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.scale.set(a,b,c);
  o.castShadow=false;o.receiveShadow=true;group.add(o);return o;
 }
 const floors=Math.max(2,Math.floor((h-4)/3.3));
 const bays=Math.max(3,Math.floor(w/3.6));
 const sideBays=Math.max(2,Math.floor(d/4));
 function rowWindows(z,back=false){
  const side=back?-1:1;
  for(let f=0;f<floors;f++){
   const y=5.1+f*3.3;if(y+1.5>h)break;
   for(let i=0;i<bays;i++){
    const x=-w/2+(i+.5)*w/bays;
    const ww=Math.min(2.2,w/bays*.68);
    // Glazing, actual mullion and lintel on front/back.
    box(x,y,z+side*.09,ww,1.8,.11,win);
    box(x,y,z+side*.18,.07,1.85,.11,steel);
    box(x,y-1.02,z+side*.22,ww+.3,.12,.28,mat);
    if(id===1||id===4)box(x,y+1.02,z+side*.19,ww+.4,.13,.26,limestone);
   }
  }
 }
 rowWindows(d/2+.13);rowWindows(-d/2-.13,true);
 // Nine visibly different building silhouettes and facade identities.
 if(id===0){ // Chicago limestone office
  for(const x of [-w*.39,w*.39])box(x,h/2,d/2+.32,.48,h,.55,limestone);
  box(0,h+1.5,0,w*.55,2,d*.62,limestone);
 }else if(id===1){ // Red brick loft
  for(let f=0;f<floors;f++)box(0,4.1+f*3.3,d/2+.26,w,.18,.48,limestone);
  box(0,h+1.2,0,w*.75,1.8,d*.75,brick);
 }else if(id===2){ // Glass curtain-wall tower
  for(const x of [-w*.33,0,w*.33])box(x,h/2,d/2+.35,.18,h,.25,steel);
  box(0,h+1.6,0,w*.46,2.5,d*.5,steel);
 }else if(id===3){ // White stepped art deco
  for(let i=0;i<3;i++)box(0,h+.5+i*.9,0,w*(.88-i*.18),.9,d*(.88-i*.17),white);
  for(const x of [-w*.4,w*.4])box(x,h/2,d/2+.31,.22,h,.3,white);
 }else if(id===4){ // Dark industrial warehouse
  for(let f=0;f<floors;f++)box(0,4+f*3.3,d/2+.28,w,.14,.3,steel);
  for(const x of [-w*.3,w*.3])box(x,h+1.8,0,2,3,2,steel);
 }else if(id===5){ // Copper-clad residential tower
  for(const x of [-w*.34,w*.34])box(x,h/2,d/2+.34,.3,h,.3,copper);
  for(let f=0;f<floors;f++)box(0,4.2+f*3.3,d/2+.6,w*.76,.18,1.1,limestone);
 }else if(id===6){ // Terracotta retail tower
  for(let i=1;i<bays;i++)box(-w/2+i*w/bays,h/2,d/2+.36,.3,h,.25,terracotta);
  box(0,h+1.5,0,w*.8,2,d*.82,terracotta);
 }else if(id===7){ // Modern blue glass with balconies
  for(let f=0;f<floors;f++)box(0,4.3+f*3.3,d/2+.85,w*.82,.14,1.5,steel);
  box(0,h+1.1,0,w*.8,1.8,d*.8,glass);
 }else{ // Classical stone tower with roof lantern
  for(const x of [-w*.4,-w*.2,w*.2,w*.4])box(x,h/2,d/2+.35,.35,h,.38,limestone);
  box(0,h+1.3,0,w*.5,2.2,d*.6,limestone);
  box(0,h+3,0,w*.32,1.2,d*.4,steel);
 }
 // Street-level awning and architectural sign backing.
 box(0,3.6,d/2+.65,w*.65,.19,1.05,id%2?steel:mat);
 return {type:id};
}
