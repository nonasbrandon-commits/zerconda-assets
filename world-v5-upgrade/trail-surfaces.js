// Subtract earlier trail footprints so every junction has one visible surface.
// Coordinates and UVs stay world aligned across all branches.
const area=p=>{let a=0;for(let i=0;i<p.length;i++){const b=p[(i+1)%p.length];a+=p[i][0]*b[2]-b[0]*p[i][2];}return a/2;};
function split(poly,a,b,sign){const inside=[],outside=[];for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],distance=v=>sign*((b[0]-a[0])*(v[2]-a[2])-(b[2]-a[2])*(v[0]-a[0])),dp=distance(p),dq=distance(q),pin=dp>=0,qin=dq>=0;(pin?inside:outside).push(p);if(pin!==qin){const t=dp/(dp-dq),v=p.map((value,k)=>value+(q[k]-value)*t);inside.push(v);outside.push(v);}}return{inside,outside};}
function subtract(poly,clip){let remaining=poly;const pieces=[],sign=Math.sign(area(clip));for(let i=0;i<clip.length&&remaining.length>=3;i++){const cut=split(remaining,clip[i],clip[(i+1)%clip.length],sign);if(cut.outside.length>=3&&Math.abs(area(cut.outside))>1e-8)pieces.push(cut.outside);remaining=cut.inside;}return pieces;}
const bounds=p=>({x0:Math.min(...p.map(v=>v[0])),x1:Math.max(...p.map(v=>v[0])),z0:Math.min(...p.map(v=>v[2])),z1:Math.max(...p.map(v=>v[2]))});
export function joinTrailSurfaces(specs){const grid=new Map(),cell=8,results=[];let removedArea=0;
 const keys=b=>{const out=[];for(let x=Math.floor(b.x0/cell);x<=Math.floor(b.x1/cell);x++)for(let z=Math.floor(b.z0/cell);z<=Math.floor(b.z1/cell);z++)out.push(x+','+z);return out;};
 for(const spec of [...specs].sort((a,b)=>(a.kind==='narrow')-(b.kind==='narrow'))){const positions=[],uv=[];
  for(let i=0;i<spec.vertices.length;i+=9){const triangle=[spec.vertices.slice(i,i+3),spec.vertices.slice(i+3,i+6),spec.vertices.slice(i+6,i+9)];if(Math.abs(area(triangle))<1e-8)continue;const b=bounds(triangle),buckets=keys(b),candidates=new Set();for(const key of buckets)for(const other of grid.get(key)||[])if(other.bounds.x1>b.x0+1e-7&&other.bounds.x0<b.x1-1e-7&&other.bounds.z1>b.z0+1e-7&&other.bounds.z0<b.z1-1e-7)candidates.add(other);
   let pieces=[triangle];for(const other of candidates){pieces=pieces.flatMap(poly=>subtract(poly,other.triangle));if(!pieces.length)break;}
   const kept=pieces.reduce((sum,p)=>sum+Math.abs(area(p)),0);removedArea+=Math.max(0,Math.abs(area(triangle))-kept);
   for(const poly of pieces)for(let k=1;k<poly.length-1;k++){const triangle=[poly[0],poly[k],poly[k+1]],signed=area(triangle);if(Math.abs(signed)<1e-7)continue;if(signed>0)triangle.reverse();for(const p of triangle){positions.push(p[0],.055,p[2]);uv.push(p[0]/3,p[2]/3);}}
   const stored={triangle,bounds:b};for(const key of buckets){if(!grid.has(key))grid.set(key,[]);grid.get(key).push(stored);}
  }
  results.push({...spec,positions,uv});
 }
 return {surfaces:results,removedArea};
}
