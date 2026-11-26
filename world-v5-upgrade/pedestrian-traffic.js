// Shared on-foot traffic response. Positions remain continuous; normal AI resumes afterwards.
const reactions=new WeakMap();
export function pedestrianSpeedLimit(car,people,speed){
 const f=car.footprint,sgn=speed<0?-1:1,c=Math.cos(car.angle),s=Math.sin(car.angle);let gap=Infinity;
 for(const p of people){const dx=p.x-car.x,dz=p.z-car.z,x=c*dx-s*dz,z=s*dx+c*dz;if(x<f.minX-.9||x>f.maxX+.9)continue;const d=sgn>0?z-f.maxZ-.95:f.minZ-z-.95;if(d>=-1&&d<gap)gap=d;}
 return Number.isFinite(gap)?sgn*Math.min(Math.abs(speed),Math.sqrt(2*7*Math.max(0,gap-.25))):speed;
}
export function pedestrianPoseBlocked(car,x,z,angle,people){const c=Math.cos(angle),s=Math.sin(angle),f=car.footprint;return people.some(p=>{const dx=p.x-x,dz=p.z-z,lx=c*dx-s*dz,lz=s*dx+c*dz;return Math.hypot(lx-Math.max(f.minX,Math.min(f.maxX,lx)),lz-Math.max(f.minZ,Math.min(f.maxZ,lz)))<.85;});}
export function requestPedestrianYield(source,actors,canWalk){if(!source)return 0;source.updateWorldMatrix(true,false);const e=source.matrixWorld.elements,angle=Math.atan2(e[8],e[10]),c=Math.cos(angle),s=Math.sin(angle),now=performance.now();let count=0;
 for(const a of actors){if(!a.group?.visible||a.vehicle||a.staff||a.seated||a.seat||a.restTime>0||a.human&&!a.human.ready)continue;const p=a.group.position,dx=p.x-e[12],dz=p.z-e[14],x=c*dx-s*dz,z=s*dx+c*dz;if(z<-.5||z>16||Math.abs(x)>3.8||reactions.get(a.group)?.until>now)continue;
 for(const sign of[x<0?-1:1,x<0?1:-1]){const shift=sign*4.3-x,target={x:p.x+c*shift,z:p.z-s*shift};let clear=true;for(let t=.1;t<=1.001;t+=.1)if(!canWalk(p.x+(target.x-p.x)*t,p.z+(target.z-p.z)*t)){clear=false;break;}if(!clear)continue;reactions.set(a.group,{...target,until:now+6500,hold:0});count++;break;}}
 return count;
}
export function stepPedestrianYield(a,dt,getHeight,canWalk){const r=reactions.get(a.group);if(!r)return false;const p=a.group.position,d=Math.hypot(r.x-p.x,r.z-p.z),step=Math.min(d,3.1*Math.min(.1,dt));let speed=0;
 if(d>.06){const x=p.x+(r.x-p.x)*step/d,z=p.z+(r.z-p.z)*step/d;if(!canWalk(x,z)){reactions.delete(a.group);return false;}a.group.rotation.y=Math.atan2(x-p.x,z-p.z);p.set(x,getHeight(x,z),z);speed=3.1;}else r.hold+=dt;
 a.human.update(dt,speed);a.walking=speed>0;if(r.hold>.8||performance.now()>r.until){reactions.delete(a.group);if(a.roam){a.roam.route=[];a.roam.remaining=0;}if(a.path)a.path=[];a.pause=0;a.detour=null;a.search=null;}return true;
}
