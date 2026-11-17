import * as THREE from 'three';

// Cut ground geometry at road/sidewalk boundaries instead of painting over it.
// Coordinates are relative to the golf course group.
export function trimGolfGround(mesh, courseZ){
 const corridors=[[-96,16.5],[0,16.5],[96,16.5]];
 const bands=[];let start=-Infinity;
 for(const [center,half] of corridors){
  bands.push([start,center-half-courseZ]);start=center+half-courseZ;
 }
 bands.push([start,Infinity]);
 mesh.updateMatrix();
 const old=mesh.geometry;
 const geometry=(old.index?old.toNonIndexed():old.clone()).applyMatrix4(mesh.matrix);
 const positions=geometry.getAttribute('position'),uv=geometry.getAttribute('uv');
 const out=[],tex=[];
 function cut(poly,bound,above){
  if(!Number.isFinite(bound))return poly;
  const result=[];
  for(let i=0;i<poly.length;i++){
   const a=poly[i],b=poly[(i+1)%poly.length];
   const insideA=above?a[2]>=bound:a[2]<=bound,insideB=above?b[2]>=bound:b[2]<=bound;
   if(insideA)result.push(a);
   if(insideA!==insideB){const t=(bound-a[2])/(b[2]-a[2]);result.push(a.map((v,k)=>v+(b[k]-v)*t));}
  }
  return result;
 }
 for(let i=0;i<positions.count;i+=3){
  const triangle=[];
  for(let j=0;j<3;j++)triangle.push([positions.getX(i+j),positions.getY(i+j),positions.getZ(i+j),uv?.getX(i+j)||0,uv?.getY(i+j)||0]);
  for(const [lo,hi] of bands){
   const polygon=cut(cut(triangle,lo,true),hi,false);
   for(let j=1;j<polygon.length-1;j++)for(const v of [polygon[0],polygon[j],polygon[j+1]]){out.push(...v.slice(0,3));tex.push(...v.slice(3));}
  }
 }
 const clipped=new THREE.BufferGeometry();
 clipped.setAttribute('position',new THREE.Float32BufferAttribute(out,3));
 clipped.setAttribute('uv',new THREE.Float32BufferAttribute(tex,2));clipped.computeVertexNormals();
 mesh.geometry=clipped;mesh.position.set(0,0,0);mesh.rotation.set(0,0,0);mesh.scale.set(1,1,1);
 // The source geometry may be shared by other district meshes.
 geometry.dispose();return mesh;
}
