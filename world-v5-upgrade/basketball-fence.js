// Sweep the ball's radius against finite fence panels, including their end posts.
// Height and real gate gaps remain open; fast shots cannot tunnel through a panel.
export function bounceBasketballFences(position,old,flight,h,radius,fences){
 for(const fence of fences){const ex=fence.bx-fence.ax,ez=fence.bz-fence.az,len=Math.hypot(ex,ez);if(len<1e-6)continue;const ux=ex/len,uz=ez/len,nx=-uz,nz=ux,R=radius+(fence.thickness??.045),dx=position.x-old.x,dz=position.z-old.z;let hit=null;
  function candidate(t,x,z){if(t<0||t>1||hit&&t>=hit.t)return;const y=old.y+(position.y-old.y)*t;if(y+radius<(fence.minY??0)||y-radius>(fence.maxY??2.3))return;hit={t,nx:x,nz:z};}
  const d0=(old.x-fence.ax)*nx+(old.z-fence.az)*nz,dv=dx*nx+dz*nz;
  for(const sign of[-1,1]){if(sign*dv>=-1e-9)continue;const t=(sign*R-d0)/dv,along=(old.x+dx*t-fence.ax)*ux+(old.z+dz*t-fence.az)*uz;if(along>=0&&along<=len)candidate(t,nx*sign,nz*sign);}
  const speed2=dx*dx+dz*dz;for(const [x,z]of[[fence.ax,fence.az],[fence.bx,fence.bz]]){const ox=old.x-x,oz=old.z-z,b=2*(ox*dx+oz*dz),c=ox*ox+oz*oz-R*R,disc=b*b-4*speed2*c;if(speed2>1e-12&&disc>=0){const t=(-b-Math.sqrt(disc))/(2*speed2),cx=ox+dx*t,cz=oz+dz*t,d=Math.hypot(cx,cz);if(d>1e-8)candidate(t,cx/d,cz/d);}}
  if(!hit){const along=Math.max(0,Math.min(len,(position.x-fence.ax)*ux+(position.z-fence.az)*uz)),cx=fence.ax+along*ux,cz=fence.az+along*uz,vx=position.x-cx,vz=position.z-cz,d=Math.hypot(vx,vz);if(d<R&&position.y+radius>=(fence.minY??0)&&position.y-radius<=(fence.maxY??2.3)){const sign=d0<0?-1:1;hit={t:1,overlap:true,nx:d>1e-7?vx/d:nx*sign,nz:d>1e-7?vz/d:nz*sign};position.x=cx+hit.nx*(R+.001);position.z=cz+hit.nz*(R+.001);}}
  if(!hit)continue;const vn=flight.v.x*hit.nx+flight.v.z*hit.nz;if(vn>=0)continue;const x=hit.overlap?position.x:old.x+dx*hit.t,z=hit.overlap?position.z:old.z+dz*hit.t;flight.v.x-=1.72*vn*hit.nx;flight.v.z-=1.72*vn*hit.nz;position.x=x+hit.nx*.001+flight.v.x*h*(1-hit.t);position.z=z+hit.nz*.001+flight.v.z*h*(1-hit.t);flight.fenceHits=(flight.fenceHits||0)+1;
 }
}
