const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function colliderContains(r,x,z,padding=0){
 if(r.shape==='circle')return Math.hypot(x-r.x,z-r.z)<r.radius+padding;
 if(r.shape==='box'){const dx=x-r.x,dz=z-r.z,c=Math.cos(r.angle),s=Math.sin(r.angle),lx=c*dx-s*dz,lz=s*dx+c*dz;return Math.hypot(lx-clamp(lx,-r.halfX,r.halfX),lz-clamp(lz,-r.halfZ,r.halfZ))<padding||Math.abs(lx)<r.halfX&&Math.abs(lz)<r.halfZ;}
 return Math.hypot(x-clamp(x,r.minX,r.maxX),z-clamp(z,r.minZ,r.maxZ))<padding;
}
export function colliderExitCandidates(r,x,z,padding=.28){
 const margin=padding+.018;
 if(r.shape==='circle'){const angle=Math.atan2(z-r.z,x-r.x);return Array.from({length:16},(_,i)=>({x:r.x+Math.cos(angle+i*Math.PI/8)*(r.radius+margin),z:r.z+Math.sin(angle+i*Math.PI/8)*(r.radius+margin)}));}
 const shape=r.shape==='box'?r:{x:(r.minX+r.maxX)/2,z:(r.minZ+r.maxZ)/2,halfX:(r.maxX-r.minX)/2,halfZ:(r.maxZ-r.minZ)/2,angle:0},c=Math.cos(shape.angle),s=Math.sin(shape.angle),dx=x-shape.x,dz=z-shape.z,lx=c*dx-s*dz,lz=s*dx+c*dz,local=[[-shape.halfX-margin,lz],[shape.halfX+margin,lz],[lx,-shape.halfZ-margin],[lx,shape.halfZ+margin]],qx=clamp(lx,-shape.halfX,shape.halfX),qz=clamp(lz,-shape.halfZ,shape.halfZ),len=Math.hypot(lx-qx,lz-qz);
 if(len>1e-6)local.unshift([qx+(lx-qx)/len*margin,qz+(lz-qz)/len*margin]);
 return local.map(([a,b])=>({x:shape.x+c*a+s*b,z:shape.z-s*a+c*b})).sort((a,b)=>Math.hypot(a.x-x,a.z-z)-Math.hypot(b.x-x,b.z-z));
}
