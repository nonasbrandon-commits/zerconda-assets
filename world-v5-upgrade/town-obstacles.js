import {colliderContains,colliderExitCandidates} from './outdoor-collision-shapes.js?v=20261121-collision-v192';
import * as THREE from 'three';
// Small outdoor objects use a spatial index; authored interiors keep their own doors and collision.
export function createTownObstacles({scene,getFloor=()=>0,ignore=()=>false,getDynamic=()=>[],radius=.28}={}){
 const cells=new Map(),seen=new WeakSet(),records=[],box=new THREE.Box3(),size=new THREE.Vector3(),cell=8;let elapsed=10,dynamicElapsed=1,dynamic=[],lastSafe=null;
 function add(bounds,object,shape={}){const r={...shape,minX:bounds.min.x,maxX:bounds.max.x,minZ:bounds.min.z,maxZ:bounds.max.z,minY:bounds.min.y,maxY:bounds.max.y,object};records.push(r);for(let x=Math.floor((r.minX-radius)/cell);x<=Math.floor((r.maxX+radius)/cell);x++)for(let z=Math.floor((r.minZ-radius)/cell);z<=Math.floor((r.maxZ+radius)/cell);z++){const key=x+','+z,list=cells.get(key)||[];list.push(r);cells.set(key,list);}}
 function addExplicit(o){if(seen.has(o))return;seen.add(o);const data=o.userData.playerCollider;o.updateWorldMatrix(true,false);const e=o.matrixWorld.elements,sx=Math.hypot(e[0],e[2]),sz=Math.hypot(e[8],e[10]),x=e[12],z=e[14],angle=Math.atan2(e[8],e[10]),shape={shape:data.shape,x,z,angle};let hx,hz;if(data.shape==='circle'){shape.radius=data.radius*Math.max(sx,sz);hx=hz=shape.radius;}else{shape.halfX=data.halfX*sx;shape.halfZ=data.halfZ*sz;hx=Math.abs(Math.cos(angle))*shape.halfX+Math.abs(Math.sin(angle))*shape.halfZ;hz=Math.abs(Math.sin(angle))*shape.halfX+Math.abs(Math.cos(angle))*shape.halfZ;}add({min:{x:x-hx,y:e[13]+(data.minY??0),z:z-hz},max:{x:x+hx,y:e[13]+(data.maxY??1.5),z:z+hz}},o,shape);}
 function explicitChildren(o){if(!o.visible||ignore(o)||o.isSkinnedMesh||o.isInstancedMesh||o.userData.dynamicScenery)return;if(o.userData.playerCollider){addExplicit(o);return;}for(const child of o.children)explicitChildren(child);}
 function scan(){scene.updateMatrixWorld(true);function visit(o){if(!o.visible||ignore(o)||o.userData.dynamicScenery||o.isSkinnedMesh||o.isInstancedMesh||o.name==='Animated Zerconda pedestrians')return;
  if(o.userData.playerCollider){addExplicit(o);return;}
  // Interior modules own their walls, but their outdoor benches and props still
  // register explicit colliders. Previously this skipped the entire campground.
  if(o.userData.customInterior){explicitChildren(o);return;}
  if(o.userData.outdoorSolid&&!seen.has(o)){seen.add(o);add(new THREE.Box3().setFromObject(o),o);return;}
  if(o.isGroup&&!seen.has(o)&&o.children.length){box.setFromObject(o);box.getSize(size);let character=false;if(size.x<6&&size.z<6&&size.y>.25&&size.y<4){o.traverse(c=>{if(c.isSkinnedMesh)character=true});if(!character){seen.add(o);add(box.clone(),o);return;}}}
  if(o.isMesh&&!seen.has(o)){seen.add(o);box.setFromObject(o);box.getSize(size);if(size.x<14&&size.z<14&&size.y>.22&&(size.y<5||(size.x<2&&size.z<2))&&size.x>.05&&size.z>.05)add(box.clone(),o);}
  for(const c of o.children)visit(c);
 }for(const o of scene.children)visit(o);}
 function hit(x,z){const y=getFloor(x,z),allowed=getDynamic(),list=[...(cells.get(Math.floor(x/cell)+','+Math.floor(z/cell))||[]),...dynamic.filter(r=>allowed.includes(r.object))];for(const r of list){if(!r.object.parent||!r.object.visible||(!r.dynamic&&ignore(r.object))||r.maxY<=y+.22||r.minY>=y+1.72)continue;if(colliderContains(r,x,z,radius))return r;}return null;}
 function clearExitPath(x,z,p,canWalk){const steps=Math.max(1,Math.ceil(Math.hypot(p.x-x,p.z-z)/.07));let clear=false;for(let i=1;i<=steps;i++){const t=i/steps,open=canWalk(x+(p.x-x)*t,z+(p.z-z)*t);if(clear&&!open)return false;if(open)clear=true;}return clear;}
 function recover(x,z,canWalk){if(canWalk(x,z)){lastSafe={x,z};return{x,z};}const current=hit(x,z),candidates=current?colliderExitCandidates(current,x,z,radius):[];if(lastSafe&&Math.hypot(lastSafe.x-x,lastSafe.z-z)<3)candidates.push(lastSafe);const floor=getFloor(x,z);for(let ring=.15;ring<=2.1;ring+=.15)for(let i=0;i<24;i++){const a=i*Math.PI/12;candidates.push({x:x+Math.cos(a)*ring,z:z+Math.sin(a)*ring});}candidates.sort((a,b)=>Math.hypot(a.x-x,a.z-z)-Math.hypot(b.x-x,b.z-z));for(const p of candidates)if(Math.abs(getFloor(p.x,p.z)-floor)<.30&&canWalk(p.x,p.z)&&clearExitPath(x,z,p,canWalk)){lastSafe=p;return p;}return{x,z};}
 function step(x,z,dx,dz,canWalk){if(canWalk(x+dx,z+dz))return{x:x+dx,z:z+dz};let xx=x,zz=z;if(canWalk(x+dx,z))xx+=dx;if(canWalk(xx,z+dz))zz+=dz;return{x:xx,z:zz};}
 function slide(x,z,dx,dz,canWalk,{recover:allowRecovery=true}={}){
  const p=allowRecovery?recover(x,z,canWalk):{x,z};x=p.x;z=p.z;
  // Sweep every input source, including scroll and long frame steps, rather
  // than checking only the final point on the far side of a thin object.
  const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.07));for(let i=0;i<steps;i++){const next=step(x,z,dx/steps,dz/steps,canWalk);x=next.x;z=next.z;}if(canWalk(x,z))lastSafe={x,z};return{x,z};
 }
 return{scan,hit,slide,recover,records,update(dt){elapsed+=dt;dynamicElapsed+=dt;if(dynamicElapsed>=.3){dynamicElapsed=0;dynamic=getDynamic().filter(o=>o.visible).map(object=>{object.updateWorldMatrix(true,true);box.setFromObject(object);return{object,dynamic:true,minX:box.min.x,maxX:box.max.x,minZ:box.min.z,maxZ:box.max.z,minY:box.min.y,maxY:box.max.y}});}if(elapsed>=5){elapsed=0;scan();}}};
}
