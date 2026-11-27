import * as T from 'three';
// A reversible idle correction. Every changed joint is restored before the
// animation mixer runs again, so walking and activity poses keep their own hands.
export function createRelaxedPlayerStance(root,bones,poseArms){
 const saved=new Map();let weight=0;
 const find=(side,part)=>bones.find(b=>b.name.endsWith(side+'_'+part)||b.name.endsWith(side+' '+part));
 function restore(){for(const [bone,q]of saved)bone.quaternion.copy(q);saved.clear();}
 function apply(dt,enabled){weight=enabled?T.MathUtils.damp(weight,1,12,Math.min(dt,.15)):0;if(!enabled||weight<.001)return;
  for(const b of bones)if(/UpperArm|Forearm|Hand|Finger/i.test(b.name))saved.set(b,b.quaternion.clone());
  root.updateWorldMatrix(true,false);root.updateMatrixWorld(true);const targets={},worldQ=root.getWorldQuaternion(new T.Quaternion());
  for(const [side,sign]of [['L',1],['R',-1]]){const hand=find(side,'Hand');if(!hand)continue;const current=hand.getWorldPosition(new T.Vector3()),target=root.localToWorld(new T.Vector3(sign*.29,.88,.045));targets[side]=current.lerp(target,weight);targets[side+'Elbow']=root.localToWorld(new T.Vector3(sign*.245,1.19,-.09));targets[side+'Direction']=new T.Vector3(0,-1,.035).normalize().applyQuaternion(worldQ);targets[side+'Across']=new T.Vector3(-sign*.45,0,.893).normalize().applyQuaternion(worldQ);}
  const aim={};for(const side of ['L','R']){aim[side]=targets[side];aim[side+'Elbow']=targets[side+'Elbow'];}poseArms(aim);root.updateMatrixWorld(true);for(const side of ['L','R']){const hand=find(side,'Hand');if(hand)targets[side+'Across']=new T.Vector3(0,0,side==='L'?-1:1).applyQuaternion(hand.getWorldQuaternion(new T.Quaternion()));}
  for(const [side,sign]of [['L',1],['R',-1]]){const hand=find(side,'Hand');if(!hand)continue;for(const base of hand.children){const match=base.name.match(/Finger([0-4])$/);if(!match)continue;const index=Number(match[1]);let joint=base;for(let k=0;k<3&&joint;k++){const parentQ=joint.parent.getWorldQuaternion(new T.Quaternion()),axis=targets[side+'Across'].clone().applyQuaternion(parentQ.invert()).normalize(),angle=(index===0?[.18,.20,.12]:[[0,0,0],[.18,.30,.20],[.25,.45,.25],[.30,.50,.30],[.40,.55,.35]][index])[k]*weight*.45;const q=new T.Quaternion().setFromAxisAngle(axis,-sign*angle);joint.quaternion.premultiply(q);joint.updateWorldMatrix(false,true);joint=joint.children.find(c=>c.isBone);}}}
 }
 return{restore,apply};
}
