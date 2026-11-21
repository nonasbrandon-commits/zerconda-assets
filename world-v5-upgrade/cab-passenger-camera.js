import * as THREE from 'three';
// Passenger look is independent of driver steering and the travel route.
export function createCabPassengerCamera(){
 let yaw=0,pitch=0,subject=null;const target=new THREE.Vector3(),eye=new THREE.Vector3();
 function reset(){yaw=0;pitch=0;subject=null;}
 function follow(cab){if(subject!==cab){reset();subject=cab;}}
 function look(dx,dy,cab){follow(cab);yaw=THREE.MathUtils.euclideanModulo(yaw-dx*.003+Math.PI,Math.PI*2)-Math.PI;pitch=THREE.MathUtils.clamp(pitch+dy*.003,-.18,1.05);}
 function update(camera,cab,dt){follow(cab);const p=cab.root.position,a=cab.heading+yaw,elevation=.27+pitch,radius=7.25;target.set(p.x,p.y+1.15,p.z);eye.set(p.x-Math.sin(a)*Math.cos(elevation)*radius,target.y+Math.sin(elevation)*radius,p.z-Math.cos(a)*Math.cos(elevation)*radius);camera.position.lerp(eye,1-Math.exp(-8*Math.max(0,dt)));camera.lookAt(target);}
 return{look,update,reset};
}
