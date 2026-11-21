// Full-size oriented vehicle bounds. Measurements are cached after a model loads.
const footprints=new WeakMap();
export function measureVehicleFootprint(THREE,group){
 if(footprints.has(group))return footprints.get(group);
 group.updateWorldMatrix(true,true);
 const inverse=group.matrixWorld.clone().invert(),bounds=new THREE.Box3(),point=new THREE.Vector3();let found=false;
 group.traverse(o=>{if(!o.isMesh)return;const geometry=o.geometry;if(!geometry.boundingBox)geometry.computeBoundingBox();const box=geometry.boundingBox;if(!box||box.isEmpty()||box.max.y-box.min.y<.035)return;
  const matrix=new THREE.Matrix4().multiplyMatrices(inverse,o.matrixWorld);
  for(const x of[box.min.x,box.max.x])for(const y of[box.min.y,box.max.y])for(const z of[box.min.z,box.max.z])bounds.expandByPoint(point.set(x,y,z).applyMatrix4(matrix));found=true;
 });
 const result=found?{minX:bounds.min.x,maxX:bounds.max.x,minZ:bounds.min.z,maxZ:bounds.max.z}:{minX:-1.2,maxX:1.2,minZ:-3,maxZ:3};
 if(found)footprints.set(group,result);return result;
}
export function vehicleDescriptor(THREE,group){
 const footprint=measureVehicleFootprint(THREE,group);group.updateWorldMatrix(true,false);const e=group.matrixWorld.elements;
 return{group,x:e[12],z:e[14],angle:Math.atan2(e[8],e[10]),footprint};
}
function rectangle(vehicle,x=vehicle.x,z=vehicle.z,angle=vehicle.angle){
 const f=vehicle.footprint||{minX:-1.2,maxX:1.2,minZ:-3,maxZ:3},c=Math.cos(angle),s=Math.sin(angle),ox=(f.minX+f.maxX)/2,oz=(f.minZ+f.maxZ)/2;
 return{x:x+c*ox+s*oz,z:z-s*ox+c*oz,halfX:(f.maxX-f.minX)/2+.14,halfZ:(f.maxZ-f.minZ)/2+.14,axes:[[c,-s],[s,c]]};
}
export function vehiclePoseBlocked(vehicle,x,z,angle,others){
 const a=rectangle(vehicle,x,z,angle);
 for(const other of others){if(other===vehicle||other.group&&other.group===vehicle.group)continue;const b=rectangle(other),dx=b.x-a.x,dz=b.z-a.z;
  if(Math.hypot(dx,dz)>Math.hypot(a.halfX,a.halfZ)+Math.hypot(b.halfX,b.halfZ))continue;
  let overlap=true;for(const [ux,uz]of[...a.axes,...b.axes]){
   const radius=r=>r.halfX*Math.abs(ux*r.axes[0][0]+uz*r.axes[0][1])+r.halfZ*Math.abs(ux*r.axes[1][0]+uz*r.axes[1][1]);
   if(Math.abs(dx*ux+dz*uz)>=radius(a)+radius(b)){overlap=false;break;}
  }if(overlap)return true;
 }return false;
}
export function sweepVehiclePose(vehicle,distance,targetAngle,others,isBlocked=()=>false){
 let {x,z,angle}=vehicle;const turn=Math.atan2(Math.sin(targetAngle-angle),Math.cos(targetAngle-angle)),turnSteps=Math.max(1,Math.ceil(Math.abs(turn)/.02)),startAngle=angle;
 for(let i=1;i<=turnSteps;i++){const next=startAngle+turn*i/turnSteps;if(vehiclePoseBlocked(vehicle,x,z,next,others))return{x,z,angle,blocked:true};angle=next;}
 const steps=Math.max(1,Math.ceil(Math.abs(distance)/.10)),dx=Math.sin(angle)*distance/steps,dz=Math.cos(angle)*distance/steps;
 for(let i=0;i<steps;i++){const nx=x+dx,nz=z+dz;if(isBlocked(nx,nz)||vehiclePoseBlocked(vehicle,nx,nz,angle,others))return{x,z,angle,blocked:true};x=nx;z=nz;}
 return{x,z,angle,blocked:false};
}
