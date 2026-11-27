import * as T from 'three';
// This Mixamo walker has only a walk clip. Build a reversible relaxed stance
// from its authored leg/body rest pose, lowering the bind-pose arms with IK.
export function createNaturalStandingPose(model){
 const bones=[];model.traverse(b=>{if(b.isBone)bones.push(b)});
 const find=n=>bones.find(b=>b.name.replace(/[^a-z0-9]/gi,'').endsWith(n));
 const chains=['Left','Right'].map(side=>({side,arm:find(side+'Arm'),elbow:find(side+'ForeArm'),hand:find(side+'Hand')}));
 if(chains.some(c=>!c.arm||!c.elbow||!c.hand))return null;
 const original=bones.map(b=>({b,q:b.quaternion.clone(),p:b.position.clone()}));
 model.updateWorldMatrix(true,true);const group=model.parent,orientation=group.getWorldQuaternion(new T.Quaternion()),down=new T.Vector3(0,-1,0).applyQuaternion(orientation),forward=new T.Vector3(0,0,1).applyQuaternion(orientation),right=new T.Vector3(1,0,0).applyQuaternion(orientation);
 function aim(joint,from,to){const delta=new T.Quaternion().setFromUnitVectors(from.normalize(),to.normalize()),parent=joint.parent.getWorldQuaternion(new T.Quaternion());joint.quaternion.premultiply(parent.clone().invert().multiply(delta).multiply(parent));joint.updateWorldMatrix(false,true);}
 for(const {side,arm,elbow,hand}of chains){const sign=side==='Left'?1:-1,a=arm.getWorldPosition(new T.Vector3()),b=elbow.getWorldPosition(new T.Vector3()),c=hand.getWorldPosition(new T.Vector3()),l1=a.distanceTo(b),l2=b.distanceTo(c),reach=l1+l2;
  const target=a.clone().addScaledVector(down,reach*.965).addScaledVector(right,sign*reach*.08).addScaledVector(forward,reach*.035),dir=target.clone().sub(a),length=Math.min(dir.length(),reach-.001);dir.normalize();
  const bend=forward.clone().negate().addScaledVector(right,sign*.25);bend.addScaledVector(dir,-bend.dot(dir)).normalize();const along=(l1*l1-l2*l2+length*length)/(2*length),joint=a.clone().addScaledVector(dir,along).addScaledVector(bend,Math.sqrt(Math.max(0,l1*l1-along*along)));
  aim(arm,b.clone().sub(a),joint.clone().sub(a));const updated=elbow.getWorldPosition(new T.Vector3());aim(elbow,hand.getWorldPosition(new T.Vector3()).sub(updated),target.clone().sub(updated));
 }
 const target=original.map(({b,p})=>({b,p,q:b.quaternion.clone()}));for(const {b,q,p}of original){b.quaternion.copy(q);b.position.copy(p);}model.updateWorldMatrix(true,true);let weight=0;
 return{apply(dt,speed){weight=T.MathUtils.damp(weight,speed>.03?0:1,12,Math.min(.15,Math.max(0,dt)));if(weight<.001)return;for(const {b,q,p}of target){b.quaternion.slerp(q,weight);b.position.lerp(p,weight);}model.updateWorldMatrix(true,true);},get weight(){return weight;}};
}
