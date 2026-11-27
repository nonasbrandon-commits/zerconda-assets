// Keep a chosen passing side until clear; do not rebuild static paths around moving people.
export function beachPassingStep({id,here,target,speed,dt,people,player,staticClear,memory}) {
 const gap=(q,p)=>Math.hypot(q.x-p.x,q.z-p.z);
 const obstacles=people.filter(p=>p.id!==id).map(p=>({...p,r:1.15}));
 if(player)obstacles.push({...player,r:1.2,id:-1});
 const heading={x:target.x-here.x,z:target.z-here.z},headingLength=Math.hypot(heading.x,heading.z)||1;const near=obstacles.filter(p=>gap(here,p)<3.2&&((p.x-here.x)*heading.x+(p.z-here.z)*heading.z)/headingLength>-.4);
 memory.left=Math.max(0,(memory.left||0)-dt);
 if(!memory.left&&near.length){
  const closest=near.sort((a,b)=>gap(here,a)-gap(here,b))[0];
  const dx=target.x-here.x,dz=target.z-here.z,len=Math.hypot(dx,dz)||1;
  // Both walkers choose their own right-hand side, so oncoming paths separate.
  memory.side={x:dz/len,z:-dx/len};memory.left=3;
 }
 let dx=target.x-here.x,dz=target.z-here.z,len=Math.hypot(dx,dz);
 if(len<.001)return null;
 dx/=len;dz/=len;
 const choices=memory.left&&near.length?[.9,1.5,2.2,0,-.9,-1.5,-2.2,Infinity,-Infinity]:[0,.9,-.9,2.2,-2.2,Infinity,-Infinity];
 for(const bias of choices){
  const side=memory.side||{x:dz,z:-dx};let vx=Number.isFinite(bias)?dx+side.x*bias:side.x*Math.sign(bias),vz=Number.isFinite(bias)?dz+side.z*bias:side.z*Math.sign(bias);
  const norm=Math.hypot(vx,vz),step=Math.min(len,speed*dt),q={x:here.x+vx/norm*step,z:here.z+vz/norm*step};
  if(!staticClear(here,q))continue;
  if(obstacles.some(p=>{const before=gap(here,p),after=gap(q,p);return after<p.r&&(before>=p.r||after<before-.000001);}))continue;
  return q;
 }
 return null;
}
// Recover when an existing position overlaps the clearance ring of a prop.
// Ordinary movement still uses full body clearance; only an already overlapping
// actor may take gradual steps toward the nearest clear footprint.
export function pedestrianStaticEscapeStep({id,here,canWalk,speed,dt,people=[],player,memory,radius=.32}){
 const clear=p=>canWalk(p.x,p.z)&&canWalk(p.x-radius,p.z)&&canWalk(p.x+radius,p.z)&&canWalk(p.x,p.z-radius)&&canWalk(p.x,p.z+radius);
 if(clear(here)){memory.exit=null;return{active:false,point:null};}
 if(!memory.exit||!clear(memory.exit)){
  memory.exit=null;
  for(const distance of[.12,.24,.4,.6,.9,1.2,1.8,2.5,3.5]){
   for(let i=0;i<16;i++){const a=i*Math.PI/8,q={x:here.x+Math.cos(a)*distance,z:here.z+Math.sin(a)*distance};if(clear(q)){memory.exit=q;break;}}
   if(memory.exit)break;
  }
 }
 if(!memory.exit)return{active:true,point:null};
 const centerLegal=canWalk(here.x,here.z);
 const point=beachPassingStep({id,here,target:memory.exit,speed,dt,people,player,memory:memory.passing||(memory.passing={}),staticClear:(from,to)=>!centerLegal||canWalk(to.x,to.z)});
 return{active:true,point};
}
