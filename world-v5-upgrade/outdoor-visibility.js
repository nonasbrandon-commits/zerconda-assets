import * as THREE from 'three';
// Bound detailed exterior rendering while retaining distant terrain, roads and sky.
export function createOutdoorVisibility(scene,{getPlayer,isInside=()=>false,distance=135}={}){
 const textures=new WeakSet();let resizedTextures=0;
 function budgetTextures(o){for(const m of Array.isArray(o.material)?o.material:[o.material]){if(!m||m.isMeshBasicMaterial)continue;for(const key of ["map","normalMap","roughnessMap","metalnessMap","alphaMap","bumpMap","aoMap"]){const t=m[key],im=t?.image;if(!t||textures.has(t)||!im||!im.width||!im.height||ArrayBuffer.isView(im.data))continue;textures.add(t);const cap=im instanceof HTMLCanvasElement?512:1024;if(Math.max(im.width,im.height)<=cap)continue;const c=document.createElement("canvas"),scale=cap/Math.max(im.width,im.height);c.width=Math.max(1,Math.round(im.width*scale));c.height=Math.max(1,Math.round(im.height*scale));try{c.getContext("2d").drawImage(im,0,0,c.width,c.height);t.image=c;t.needsUpdate=true;resizedTextures++;}catch{}}}}

 const known=new WeakSet(),entries=[],hidden=new Map(),stack=[];
 const world=new THREE.Box3(),position=new THREE.Vector3(),size=new THREE.Vector3();
 let count=-1,time=0,cursor=0,paused=false;
 const exempt=n=>n.isLight||n.isCamera||n.userData.localPlayer||n.userData.distanceManaged||n.userData.startupEssential||(n.isMesh&&/sky|cloud|backdrop|ocean|terrain|ground|road|sidewalk|curb|grass/i.test(n.name));
 function enqueue(n,parent=null){if(known.has(n)||n.isBone)return;known.add(n);stack.push({node:n,parent,entered:false,box:new THREE.Box3(),dynamic:false,meshes:0});}
 function apply(e,p){const n=e.node;if(!n.parent){hidden.delete(n);return;}if(e.moving){n.getWorldPosition(position);e.x=position.x+e.offsetX;e.z=position.z+e.offsetZ;}const far=Math.hypot(e.x-p.x,e.z-p.z)>e.range+e.r;if(far){if(!hidden.has(n))hidden.set(n,n.visible);n.visible=false;}else if(hidden.has(n)){n.visible=hidden.get(n);hidden.delete(n);}}
 function step(){const job=stack[stack.length-1],n=job.node;
  if(!job.entered){job.entered=true;
   if(!n.parent||n.userData.localPlayer||n.userData.distanceManaged){stack.pop();if(job.parent)job.parent.dynamic=true;return;}
   n.updateWorldMatrix(true,false);
   if(n.isMesh){job.meshes=1;if(n.isSkinnedMesh||n.isInstancedMesh)job.dynamic=true;else{budgetTextures(n);const g=n.geometry;if(g){if(!g.boundingBox)g.computeBoundingBox();if(g.boundingBox)job.box.copy(g.boundingBox).applyMatrix4(n.matrixWorld);}}}
   // Each child is scanned once, depth-first. No recursive subtree bounds or matrix calls.
   for(let i=n.children.length-1;i>=0;i--)enqueue(n.children[i],job);
   return;
  }
  stack.pop();if(job.parent){job.parent.box.union(job.box);job.parent.dynamic||=job.dynamic;job.parent.meshes+=job.meshes;}
  if(exempt(n)||job.dynamic||!job.meshes||job.box.isEmpty())return;
  job.box.getSize(size);if(size.y<.35||Math.max(size.x,size.z)>220)return;
  let moving=false;for(let a=n;a;a=a.parent)if(a.userData.dynamicScenery||/vehicle|car$|cab|scooter|motorcycle/i.test(a.name))moving=true;
  n.getWorldPosition(position);const e={node:n,moving,offsetX:(job.box.min.x+job.box.max.x)/2-position.x,offsetZ:(job.box.min.z+job.box.max.z)/2-position.z,x:(job.box.min.x+job.box.max.x)/2,z:(job.box.min.z+job.box.max.z)/2,r:Math.hypot(size.x,size.z)/2,range:Math.max(size.x,size.z)<6?45:distance};entries.push(e);apply(e,getPlayer());
 }
 function restore(){for(const[n,v]of hidden)if(n.parent)n.visible=v;hidden.clear();}
 function update(dt){if(isInside()){if(!paused)restore();paused=true;return;}paused=false;
  if(scene.children.length!==count){count=scene.children.length;for(let i=scene.children.length-1;i>=0;i--)enqueue(scene.children[i]);}
  const start=performance.now();while(stack.length&&performance.now()-start<1.5)step();
  time+=dt;if(time<.2&&cursor===0)return;
  const p=getPlayer();let visited=0;while(entries.length&&visited<entries.length&&performance.now()-start<2.5){apply(entries[cursor],p);cursor=(cursor+1)%entries.length;visited++;if(cursor===0){time=0;break;}}
 }
 return{update,restore,async prepareInitial(){const deadline=performance.now()+300;do{await new Promise(resolve=>setTimeout(resolve,0));update(.25);}while(!this.ready&&performance.now()<deadline);return{pending:stack.length};},get ready(){return stack.length===0&&count===scene.children.length},stats:()=>({resizedSceneryTextures:resizedTextures,boundedExteriorRoots:entries.length,hiddenExteriorRoots:hidden.size,queuedExteriorRoots:stack.length})};
}
