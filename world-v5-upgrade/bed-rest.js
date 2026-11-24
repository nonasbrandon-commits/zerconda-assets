import * as THREE from 'three';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export function createBedRest({scene,getPlayer,getHeight,canStand,onStop=()=>{},onMessage=()=>{},canUse=()=>true}){const beds=[],seen=new WeakSet(),v=new THREE.Vector3(),scale=new THREE.Vector3(),q=new THREE.Quaternion();let active=null,previousSpine=null,timer=2;const hiddenContacts=new Map();
 const visible=o=>{for(let p=o;p;p=p.parent)if(!p.visible)return false;return !!o.parent;};
 function scan(){scene.traverse(o=>{if(seen.has(o)||o.name!=='Layered linen bedroom suite'&&!o.userData.bedRest)return;seen.add(o);beds.push(o);});}
 function pose(bed){bed.updateWorldMatrix(true,false);bed.getWorldScale(scale);bed.getWorldQuaternion(q);const front=new THREE.Vector3(0,0,1).applyQuaternion(q);front.y=0;front.normalize();const center=bed.getWorldPosition(new THREE.Vector3()),data=bed.userData.bedRest||{width:1.85,length:2.7,mattressY:.82};return{bed,center,front,right:new THREE.Vector3(front.z,0,-front.x),width:data.width*scale.x,length:data.length*scale.z,y:center.y+data.mattressY*scale.y};}
 function nearest(){const p=getPlayer();let best=null,distance=3.2;for(const bed of beds){if(!visible(bed))continue;const data=pose(bed),d=Math.hypot(p.x-data.center.x,p.z-data.center.z);if(d<distance&&Math.abs(getHeight(p.x,p.z)-data.center.y)<.45){best=data;distance=d;}}return best;}
 function restoreContacts(){for(const [o,visible]of hiddenContacts)o.visible=visible;hiddenContacts.clear();}
 function restore(){if(previousSpine){previousSpine.bone.quaternion.copy(previousSpine.q);previousSpine=null;}}
 function getUp(){if(!active)return;restore();const old=active,p=getPlayer(),candidates=[old.returnPoint,...[-1,1].map(s=>({x:old.center.x+old.right.x*s*(old.width/2+.65),z:old.center.z+old.right.z*s*(old.width/2+.65)})),{x:old.center.x+old.front.x*(old.length/2+.6),z:old.center.z+old.front.z*(old.length/2+.6)}];const safe=candidates.find(c=>canStand(c.x,c.z)&&Math.abs(getHeight(c.x,c.z)-old.center.y)<.4);if(!safe){onMessage('The side of the bed is blocked. Clear a space to get up.');return;}p.x=safe.x;p.z=safe.z;active=null;restoreContacts();onStop();}
 function lieDown(){const bed=nearest();if(!bed||!canUse())return;const p=getPlayer();active={...bed,pillowSide:((p.x-bed.center.x)*bed.right.x+(p.z-bed.center.z)*bed.right.z)<0?-1:1,returnPoint:{x:p.x,z:p.z}};p.x=bed.center.x;p.z=bed.center.z;onStop();onMessage('Resting on the bed. Choose Get up when you are ready.');}
 const button=document.createElement('button');document.body.append(button);button.onclick=()=>active?getUp():lieDown();registerTownAction(button,{id:'home-bed-rest',priority:145,label:()=>active?'Get up':'Lie down on bed',when:()=>!!active||canUse()&&!!nearest(),target:()=>{const p=active||nearest();return p?{x:p.center.x,y:p.y+.25,z:p.center.z}:null;}});
 return{scan,nearest,lieDown,getUp,get active(){return active},update(dt=.016){restore();timer+=dt;if(timer>1){timer=0;scan();}if(active&&(Math.hypot(getPlayer().x-active.center.x,getPlayer().z-active.center.z)>3||!visible(active.bed))){active=null;restoreContacts();}},applyPose(avatar){if(!active)return;const b=active,yaw=Math.atan2(b.front.x,b.front.z);avatar.position.copy(b.center).addScaledVector(b.front,.94);avatar.position.y=b.y+.15;avatar.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),yaw).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),-Math.PI/2));avatar.visible=true;avatar.updateWorldMatrix(true,false);avatar.updateMatrixWorld(true);let spine=null,head=null;avatar.traverse(o=>{if(o.isBone&&/Spine1$/.test(o.name))spine=o;if(o.isBone&&/Head$/.test(o.name))head=o;if(/shoe contact/i.test(o.name)){if(!hiddenContacts.has(o))hiddenContacts.set(o,o.visible);o.visible=false;}});if(spine&&head){
 // Rest over one pillow, with the shoulders gently supported by its front edge.
 avatar.position.addScaledVector(b.right,b.pillowSide*b.width*.20);
 avatar.updateMatrixWorld(true);
 previousSpine={bone:spine,q:spine.quaternion.clone()};
 const S=spine.getWorldPosition(new THREE.Vector3()),H=head.getWorldPosition(new THREE.Vector3());
 const goal=b.center.clone().addScaledVector(b.front,-b.length*.24).addScaledVector(b.right,b.pillowSide*b.width*.20);
 goal.y=b.y+.36;
 const delta=new THREE.Quaternion().setFromUnitVectors(H.sub(S).normalize(),goal.clone().sub(S).normalize()),parent=spine.parent.getWorldQuaternion(new THREE.Quaternion());
 if(delta.angleTo(new THREE.Quaternion())>.50)delta.slerp(new THREE.Quaternion(),1-.50/delta.angleTo(new THREE.Quaternion()));
 spine.quaternion.premultiply(parent.clone().invert().multiply(delta).multiply(parent));
 avatar.updateMatrixWorld(true);
 const actual=head.getWorldPosition(new THREE.Vector3());
 avatar.position.addScaledVector(b.front,goal.clone().sub(actual).dot(b.front));
 avatar.updateMatrixWorld(true);
}},positionCamera(camera){if(!active)return;const b=active;camera.position.copy(b.center).addScaledVector(b.front,2.7).addScaledVector(b.right,1.7);camera.position.y=b.y+2.1;camera.lookAt(b.center.x,b.y+.15,b.center.z);},dispose(){restore();restoreContacts();button.remove();}};
}
