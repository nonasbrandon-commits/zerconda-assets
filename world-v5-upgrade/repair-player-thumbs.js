import * as T from 'three';
// Repair the main avatar's baked thumb shape in hand space. Move the distal
// thumb gradually; the wrist, watch, palm centre and other fingers stay fixed.
export function repairPlayerThumbs(model){
 model.updateMatrixWorld(true);const report=[];
 model.traverse(mesh=>{if(!mesh.isSkinnedMesh||mesh.userData.thumbShapeRepaired)return;mesh.skeleton.update();const original=mesh.geometry,ids=original.attributes.skinIndex,weights=original.attributes.skinWeight;if(!ids||!weights)return;let geometry=null;const changed=new Set();
 for(const [side,sign]of [['L',-1],['R',1]]){const hand=mesh.skeleton.bones.find(b=>b.name.endsWith(side+'_Hand'));if(!hand)continue;const id=mesh.skeleton.bones.indexOf(hand),toHand=hand.matrixWorld.clone().invert().multiply(mesh.matrixWorld),fromHand=toHand.clone().invert();let count=0,maxMove=0;
 for(let i=0;i<ids.count;i++){const jointIds=[ids.getX(i),ids.getY(i),ids.getZ(i),ids.getW(i)],jointWeights=[weights.getX(i),weights.getY(i),weights.getZ(i),weights.getW(i)];if(!jointIds.some((n,k)=>n===id&&jointWeights[k]>.75))continue;
 const p=mesh.getVertexPosition(i,new T.Vector3()).applyMatrix4(toHand),sideways=p.z*sign;
 const blend=T.MathUtils.smoothstep(sideways,.082,.108)*T.MathUtils.smoothstep(p.x,.035,.085)*(1-T.MathUtils.smoothstep(p.x,.155,.175));if(blend<=0)continue;
 // Unfold the pinched tip and round the underside without enlarging the hand.
 const q=p.clone();q.x+=.014*blend;q.y+=.007*blend;q.z-=sign*.006*blend;
 if(!geometry)geometry=original.clone();const move=p.distanceTo(q),skin=new T.Matrix4();skin.elements.fill(0);for(let k=0;k<4;k++){if(!jointWeights[k])continue;const matrix=new T.Matrix4().fromArray(mesh.skeleton.boneMatrices,jointIds[k]*16);for(let j=0;j<16;j++)skin.elements[j]+=matrix.elements[j]*jointWeights[k];}skin.premultiply(mesh.bindMatrixInverse).multiply(mesh.bindMatrix);q.applyMatrix4(fromHand).applyMatrix4(skin.invert());geometry.attributes.position.setXYZ(i,...q.toArray());changed.add(i);count++;maxMove=Math.max(maxMove,move);
 }report.push({hand:hand.name,vertices:count,maxMove});}
 if(geometry){geometry.attributes.position.needsUpdate=true;geometry.computeVertexNormals();if(original.attributes.normal){const n=geometry.attributes.normal,old=original.attributes.normal;for(let i=0;i<n.count;i++)if(!changed.has(i))n.setXYZ(i,old.getX(i),old.getY(i),old.getZ(i));n.needsUpdate=true;}geometry.computeBoundingBox();geometry.computeBoundingSphere();mesh.geometry=geometry;}mesh.userData.thumbShapeRepaired=true;
 });return report;
}
