import {posePowersportsRider} from './powersports-rider-ik.js?v=20261124-driving-v339';
const cache=new WeakMap();
export function applyPowersportsRiderPose(human,seat,time=0){if(!human?.ready||!seat)return;let bones=cache.get(human.root);if(!bones){bones=[];human.root.traverse(o=>{if(o.isBone)bones.push(o)});cache.set(human.root,bones);}posePowersportsRider({root:human.root,bones},seat,time);}
