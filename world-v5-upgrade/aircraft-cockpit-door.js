import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export function createCockpitDoor(parent){
 const root=new THREE.Group();root.name='Cockpit privacy bulkhead';root.position.z=6.95;parent.add(root);
 const cream=new THREE.MeshStandardMaterial({color:0xddd4c2,roughness:.7,side:THREE.DoubleSide}),wood=new THREE.MeshStandardMaterial({color:0x513421,roughness:.4,side:THREE.DoubleSide}),metal=new THREE.MeshStandardMaterial({color:0xa6afb0,metalness:.8,roughness:.3});
 const shape=new THREE.Shape();for(let i=0;i<=64;i++){const a=i/64*Math.PI*2,x=Math.cos(a)*1.55,y=3+Math.sin(a)*1.46;i?shape.lineTo(x,y):shape.moveTo(x,y);}shape.closePath();const opening=new THREE.Path();opening.moveTo(-.53,1.78);opening.lineTo(-.53,4.10);opening.lineTo(.53,4.10);opening.lineTo(.53,1.78);opening.closePath();shape.holes.push(opening);const wall=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.075,bevelEnabled:false}),cream);wall.name='Opaque flight deck bulkhead';root.add(wall);
 function box(parent,w,h,d,x,y,z,material){const m=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,.015),material);m.position.set(x,y,z);parent.add(m);return m;}
 for(const x of[-.56,.56])box(root,.07,2.38,.11,x,2.95,-.015,wood);box(root,1.18,.08,.11,0,4.14,-.015,wood);
 const slider=new THREE.Group();slider.name='Sliding cockpit door';root.add(slider);slider.position.z=.09;const door=box(slider,1.055,2.32,.06,0,2.94,0,wood);door.name='Opaque cockpit privacy door';box(slider,.79,1.86,.018,0,2.94,-.041,cream).name='Opaque cockpit privacy door';box(slider,.045,.21,.035,.36,2.88,-.069,metal);
 let target=false,progress=0;return{root,door,get open(){return target},get passable(){return target&&progress>.97},setOpen(value,instant=false){target=!!value;if(instant){progress=target?1:0;slider.position.x=progress*1.12;}},update(dt){const to=target?1:0;progress=THREE.MathUtils.damp(progress,to,9,dt);if(Math.abs(progress-to)<.002)progress=to;slider.position.x=progress*1.12;}};
}
