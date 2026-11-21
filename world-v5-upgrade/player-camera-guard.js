import * as THREE from 'three';
// Apply after every camera override, immediately before the scene is rendered.
// Hide only for this render; animation and normal visibility rules keep running.
export function createPlayerCameraGuard(){
 const base=new THREE.Vector3();let close=false;
 return{apply(camera,avatar,enabled=true){const wasVisible=avatar.visible;if(!enabled||!wasVisible){close=false;return()=>{};}avatar.getWorldPosition(base);const distance=Math.hypot(camera.position.x-base.x,camera.position.z-base.z),nearBody=camera.position.y>base.y-.35&&camera.position.y<base.y+3.1;close=nearBody&&distance<(close?1.50:1.15);if(close)avatar.visible=false;return()=>{avatar.visible=wasVisible;};},get close(){return close;}};
}
