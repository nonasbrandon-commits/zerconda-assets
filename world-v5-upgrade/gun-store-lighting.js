import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export function createGunStoreLighting(parent,{add,materials:m}){
 const ceiling=new THREE.MeshStandardMaterial({color:'#292d2f',roughness:.64,metalness:.16}),seam=new THREE.MeshStandardMaterial({color:'#101619',roughness:.8}),light=new THREE.MeshStandardMaterial({color:'#fff4df',emissive:'#ffe5bc',emissiveIntensity:1.5,roughness:.4}),warm=new THREE.MeshStandardMaterial({color:'#ffd19c',emissive:'#ffbb70',emissiveIntensity:1.25,roughness:.5});light.userData.selectiveBloom=warm.userData.selectiveBloom=true;
 const box=(w,h,d,x,y,z,mat)=>add(new RoundedBoxGeometry(w,h,d,1,Math.min(.012,w*.25,h*.25,d*.25)),mat,x,y,z);
 // Flush dark ceiling panels and fine recessed joints, contained within the authored L-shaped ceiling.
 for(const[w,d,x,z]of[[21.98,25.98,-6,0],[11.98,37.98,11,-6]])box(w,.025,d,x,4.282,z,ceiling);
 for(let x=-16.5;x<17;x+=1.5){const back=x<5?-12.98:-24.98;box(.012,.012,12.98-back,x,4.261,(12.98+back)/2,seam);}for(let z=-24;z<13;z+=1.5){const left=z< -13?5.02:-16.98;box(16.98-left,.012,.012,(16.98+left)/2,4.261,z,seam);}
 let downlights=0;for(const x of[-13,-5,3,11])for(const z of[-8,0,9]){add(new THREE.CylinderGeometry(.15,.15,.035,24),m.metal,x,4.242,z);add(new THREE.CircleGeometry(.118,24),light,x,4.220,z,0,Math.PI/2);downlights++;}for(const z of[-20,-14]){add(new THREE.CylinderGeometry(.15,.15,.035,24),m.metal,11,4.242,z);add(new THREE.CircleGeometry(.118,24),light,11,4.220,z,0,Math.PI/2);downlights++;}
 let frames=0;for(const x of[-9,1])for(const z of[-4.8,6.4]){for(const side of[-1,1]){box(2.7,.055,.12,x,4.23,z+side*.72,m.dark);box(.12,.055,1.44,x+side*1.32,4.23,z,m.dark);box(2.62,.025,.04,x,4.193,z+side*.72,light);box(.04,.025,1.44,x+side*1.31,4.193,z,light);}frames++;}
 const outline=[[-16.75,-12.75],[4.75,-12.75],[4.75,-24.75],[16.75,-24.75],[16.75,12.75],[-16.75,12.75]];for(let i=0;i<outline.length;i++){const a=outline[i],b=outline[(i+1)%outline.length],horizontal=a[1]===b[1],w=horizontal?Math.abs(a[0]-b[0]):.16,d=horizontal?.16:Math.abs(a[1]-b[1]),x=(a[0]+b[0])/2,z=(a[1]+b[1])/2;box(w,.12,d,x,4.14,z,m.dark);box(horizontal?w:.035,.025,horizontal?.035:d,x,4.065,z,warm);}
 // Only the nearest quality-budgeted lights are active; none creates an extra shadow map.
 for(const[x,z]of[[-11,-5],[-2,-5],[-11,6],[-2,6],[11,-17],[11,-7],[11,6]]){const point=new THREE.PointLight('#ffe9ca',7,12,2);point.position.set(x,3.85,z);point.name='Guns store interior LED illumination';point.castShadow=false;parent.add(point);}
 return{downlights,frames,localLights:7};
}
