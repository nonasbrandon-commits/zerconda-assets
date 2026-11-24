// Keep a chosen passing side until clear; do not rebuild static paths around moving people.
export function beachPassingStep({id,here,target,speed,dt,people,player,staticClear,memory}) {
 const gap=(q,p)=>Math.hypot(q.x-p.x,q.z-p.z);
 const obstacles=people.filter(p=>p.id!==id).map(p=>({...p,r:.95}));
 if(player)obstacles.push({...player,r:1.05,id:-1});
 const near=obstacles.filter(p=>gap(here,p)<2.6);
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
 const choices=memory.left&&near.length?[.9,1.5,2.2,0]:[0];
 for(const bias of choices){
  let vx=dx+(memory.side?.x||0)*bias,vz=dz+(memory.side?.z||0)*bias;
  const norm=Math.hypot(vx,vz),step=Math.min(len,speed*dt),q={x:here.x+vx/norm*step,z:here.z+vz/norm*step};
  if(!staticClear(here,q))continue;
  if(obstacles.some(p=>{const before=gap(here,p),after=gap(q,p);return after<p.r&&(before>=p.r||after<before+.00001);}))continue;
  return q;
 }
 return null;
}
