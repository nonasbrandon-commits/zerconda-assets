import * as THREE from 'three';
export function avatarHeadFrame(root,head){
 root.updateWorldMatrix(true,true);const box=new THREE.Box3(),v=new THREE.Vector3();
 root.traverse(o=>{if(!o.isSkinnedMesh||!/head/i.test(o.material?.name||''))return;o.skeleton.update();for(let i=0;i<o.geometry.attributes.position.count;i++){o.getVertexPosition(i,v).applyMatrix4(o.matrixWorld);box.expandByPoint(root.worldToLocal(v));}});
 const point=head?root.worldToLocal(head.getWorldPosition(new THREE.Vector3())):new THREE.Vector3(0,1.7,0);
 // Authored head meshes include buns and ponytails; fit accessories to the skull.
 const top=box.isEmpty()?point.y+.13:Math.min(box.max.y,point.y+(box.max.x-box.min.x)*.65);
 return{point,top,scale:box.isEmpty()?1:THREE.MathUtils.clamp((box.max.x-box.min.x)/.32,.55,1.1)};
}
