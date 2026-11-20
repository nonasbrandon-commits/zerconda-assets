// Bounded local A*: find a way around props, people and blocked route segments.
export function clearSegment(a,b,canWalk,radius=.28){const distance=Math.hypot(b.x-a.x,b.z-a.z),n=Math.max(1,Math.ceil(distance/.20));for(let i=1;i<=n;i++){const x=a.x+(b.x-a.x)*i/n,z=a.z+(b.z-a.z)*i/n;if(!canWalk(x,z)||!canWalk(x-radius,z)||!canWalk(x+radius,z)||!canWalk(x,z-radius)||!canWalk(x,z+radius))return false;}return true;}
export function findPedestrianDetour(start,goal,canWalk,{radius=.28,step=.6,maxNodes=1800}={}){
 const margin=7,minX=Math.min(start.x,goal.x)-margin,maxX=Math.max(start.x,goal.x)+margin,minZ=Math.min(start.z,goal.z)-margin,maxZ=Math.max(start.z,goal.z)+margin;
 const key=(x,z)=>x+','+z,heuristic=p=>Math.hypot(p.x-goal.x,p.z-goal.z),first={x:start.x,z:start.z,ix:0,iz:0,g:0,parent:null};first.f=heuristic(first);const open=[first],best=new Map([[key(0,0),0]]);let visited=0;
 while(open.length&&visited++<maxNodes){let bi=0;for(let i=1;i<open.length;i++)if(open[i].f<open[bi].f)bi=i;const current=open.splice(bi,1)[0];if(current.g>best.get(key(current.ix,current.iz)))continue;
  if(heuristic(current)<step*1.6&&clearSegment(current,goal,canWalk,radius)){const path=[{x:goal.x,z:goal.z}];let n=current;while(n.parent){path.push({x:n.x,z:n.z});n=n.parent;}path.reverse();return path;}
  for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const ix=current.ix+dx,iz=current.iz+dz,x=start.x+ix*step,z=start.z+iz*step;if(x<minX||x>maxX||z<minZ||z>maxZ)continue;const g=current.g+Math.hypot(dx,dz)*step,k=key(ix,iz);if(g>=(best.get(k)??Infinity))continue;const next={x,z,ix,iz,g,parent:current};if(!clearSegment(current,next,canWalk,radius))continue;next.f=g+heuristic(next);best.set(k,g);open.push(next);}
 }return null;
}
