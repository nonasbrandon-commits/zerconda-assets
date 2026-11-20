import * as THREE from 'three';
// Casts follow the player's view, never a predefined fishing station.
export function findWaterCast(player,yaw,{footprint,heightAt}){
 const dx=Math.sin(yaw),dz=Math.cos(yaw);
 const water=(x,z)=>(z>=235||z>=70&&(x< -444||x>570))&&z<16000&&Math.abs(x)<12000&&!footprint(x,z)&&heightAt(x,z)===null;
 // The whole final stretch must be open water, not merely the final point.
 for(let distance=7;distance<=25;distance+=1){const x=player.x+dx*distance,z=player.z+dz*distance;if(water(x,z)&&water(x-dx*2,z-dz*2)&&water(x-dx*4,z-dz*4))return {x:player.x,z:player.z,dx,dz,waterX:x,waterZ:z};}
 return null;
}
const rigs=new WeakMap();
export function poseHeldFishingRod(avatar,rod,yaw,{elapsed=0,casting=false}={}){
 avatar.updateWorldMatrix(true,true);let bones=rigs.get(avatar);if(!bones||!bones.length||!attached(bones[0],avatar)){bones=[];avatar.traverse(o=>{if(o.isBone)bones.push(o)});rigs.set(avatar,bones);}
 const bone=(side,part)=>bones.find(b=>b.name.replace(/[^a-z0-9]/gi,'').endsWith(side+part));
 const base=avatar.getWorldPosition(new THREE.Vector3()),front=new THREE.Vector3(Math.sin(yaw),0,Math.cos(yaw)),right=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw));
 const cast=casting&&elapsed<.8?Math.sin(Math.min(1,elapsed/.8)*Math.PI):0;
 function goal(x,y,z){return base.clone().addScaledVector(right,x).addScaledVector(front,z).add(new THREE.Vector3(0,y,0));}
 const grip=goal(-.23,1.12+cast*.22,.32);
 for(const[side,target]of[['R',grip],['L',goal(-.08,1.16+cast*.20,.38)]]){const hand=bone(side,'Hand'),fore=bone(side,'Forearm'),upper=bone(side,'UpperArm');if(!hand||!fore||!upper)continue;for(let i=0;i<6;i++)for(const joint of[fore,upper]){const origin=joint.getWorldPosition(new THREE.Vector3()),a=hand.getWorldPosition(new THREE.Vector3()).sub(origin),b=target.clone().sub(origin);if(a.lengthSq()<1e-10||b.lengthSq()<1e-10)continue;const q=new THREE.Quaternion().setFromUnitVectors(a.normalize(),b.normalize()),parent=joint.parent.getWorldQuaternion(new THREE.Quaternion());joint.quaternion.premultiply(parent.clone().invert().multiply(q).multiply(parent));joint.updateWorldMatrix(false,true);}}
 const hand=bone('R','Hand');rod.position.copy(hand?hand.getWorldPosition(new THREE.Vector3()):grip);rod.rotation.set(.42-cast*.8,yaw,0,'YXZ');rod.updateMatrixWorld(true);return rod.position;
}

function attached(bone,root){for(let p=bone;p;p=p.parent)if(p===root)return true;return false;}
