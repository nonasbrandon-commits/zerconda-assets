import {poseSeatedResident} from './seated-resident.js?v=20261123-natural-v264';
const cache=new WeakMap();
export function applyPlayerSeatPose(human,seat,ground=0,time=0){if(!human?.ready)return;let data=cache.get(human.root);if(!data){const bones=[];human.root.traverse(o=>{if(o.isBone)bones.push(o)});data={bones,base:human.root.position.clone()};cache.set(human.root,data);}human.root.position.copy(data.base);if(!seat)return;poseSeatedResident({root:human.root,bones:data.bones},{...seat,sitHeight:(seat.sitHeight??.51)-ground},time);}
