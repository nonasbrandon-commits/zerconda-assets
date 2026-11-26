import * as THREE from 'three';
const pending=new Set(),position=new THREE.Vector3();let timer=null;
function eligible(root){const viewer=globalThis.zercondaViewerPosition,world=globalThis.zercondaViewerScene;let owner=null;for(let p=root;p;p=p.parent){if(p.userData.localPlayer)return true;if(p.isScene)owner=p;}if(owner&&world&&owner!==world)return true;if(!viewer||!owner)return false;root.updateWorldMatrix(true,false);root.getWorldPosition(position);return (position.x-viewer.x)**2+(position.z-viewer.z)**2<85*85;}
function check(){for(const task of pending)if(eligible(task.root)){pending.delete(task);task.resolve();}if(!pending.size){clearInterval(timer);timer=null;}}
// The player and editor previews load immediately. Far residents keep their game
// controller and location, but defer model decoding and clothing until approached.
export function waitForNearbyHuman(root){if(typeof matchMedia!=='function'||!matchMedia('(pointer:coarse)').matches)return Promise.resolve();return new Promise(resolve=>{pending.add({root,resolve});if(!timer)timer=setInterval(check,400);queueMicrotask(check);});}
