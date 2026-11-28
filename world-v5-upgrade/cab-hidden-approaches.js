import * as T from 'three';
// Look at other nearby road approaches when the fleet's existing approach is in view.
export function hiddenCabApproach({network,makePath,player,visible,blocked}){
  if(!network||!makePath)return null;
  const candidates=[];
  for(const edge of network.edges){
    if(edge.length<12)continue;
    const a=network.points[edge.i],b=network.points[edge.j],dx=(b.x-a.x)/edge.length,dz=(b.z-a.z)/edge.length;
    const t=T.MathUtils.clamp((player.x-a.x)*dx+(player.z-a.z)*dz,0,edge.length);
    if(Math.hypot(a.x+dx*t-player.x,a.z+dz*t-player.z)>110)continue;
    const alongs=new Set([edge.length/2,...[-90,-65,-45,-28,28,45,65,90].map(d=>T.MathUtils.clamp(t+d,6,edge.length-6))]);
    for(const along of alongs)for(const sign of[-1,1]){
      const point=new T.Vector3(a.x+dx*along-dz*sign*2.7,0,a.z+dz*along+dx*sign*2.7);
      const distance=Math.hypot(point.x-player.x,point.z-player.z),heading=Math.atan2(dx*sign,dz*sign);
      if(distance<22||distance>105||visible(point)||blocked(point,heading))continue;
      candidates.push({point,heading,distance});
    }
  }
  candidates.sort((a,b)=>a.distance-b.distance);
  for(const c of candidates){
    const path=makePath(c.point,c.heading);
    if(!path||path.length>110||path.length<15||blocked(path.pickup,path.heading))continue;
    return {path,spawn:{point:c.point,heading:c.heading},remaining:path.length,alternativeApproach:true};
  }
  return null;
}
