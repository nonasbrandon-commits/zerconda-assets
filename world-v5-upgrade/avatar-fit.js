import * as THREE from 'three';
export function avatarHeadFrame(root,head){
 root.updateWorldMatrix(true,true);const box=new THREE.Box3(),v=new THREE.Vector3();let weightedHead=false;const axes=['getX','getY','getZ','getW'],component=(a,i,k)=>a[axes[k]](i);
 root.traverse(o=>{if(!o.isSkinnedMesh)return;const named=/head/i.test(o.material?.name||''),headIds=new Set(o.skeleton.bones.map((b,i)=>/Head(?:Nub)?$/i.test(b.name)?i:-1).filter(i=>i>=0));if(!named&&(!/^Reference.*main.character/i.test(o.name)||!headIds.size))return;if(!named)weightedHead=true;o.skeleton.update();for(let i=0;i<o.geometry.attributes.position.count;i++){if(!named){let w=0;for(let k=0;k<4;k++)if(headIds.has(component(o.geometry.attributes.skinIndex,i,k)))w+=component(o.geometry.attributes.skinWeight,i,k);if(w<.5)continue;}o.getVertexPosition(i,v).applyMatrix4(o.matrixWorld);box.expandByPoint(root.worldToLocal(v));}});
 const point=head?root.worldToLocal(head.getWorldPosition(new THREE.Vector3())):new THREE.Vector3(0,1.7,0);
 // Authored head meshes include buns and ponytails; fit accessories to the skull.
 const top=box.isEmpty()?point.y+.13:weightedHead?box.max.y:Math.min(box.max.y,point.y+(box.max.x-box.min.x)*.65);
 return{point,top,scale:box.isEmpty()?1:THREE.MathUtils.clamp((box.max.x-box.min.x)/.32,.55,1.1)};
}
