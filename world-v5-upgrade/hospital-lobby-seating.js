import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
// Detailed linked black-upholstered, polished-metal seating; geometry joins the hospital's batches.
export function createHospitalLobbySeating({add,block,world,seats,angle,ground}){
 const leather=new THREE.MeshStandardMaterial({color:'#242a2b',roughness:.48,metalness:.02}),chrome=new THREE.MeshStandardMaterial({color:'#bbc5c9',roughness:.22,metalness:.85});
 const bankSpecs=[];const rounded=(w,h,d,x,y,z,material,tilt=0)=>add(new RoundedBoxGeometry(w,h,d,3,Math.min(.055,h*.35,d*.2,w*.2)).rotateZ(tilt),material,x,y,z);
 for(const bx of[-4.65,4.65]){
  const centerZ=10,length=4.5;bankSpecs.push({x:bx,z:centerZ,width:1.85,depth:length});block(bx,centerZ,1.85,length);
  rounded(.20,.12,length,bx,.43,centerZ,chrome);
  for(const z of[8.06,11.94]){rounded(1.80,.10,.24,bx,.07,z,chrome);rounded(.18,.38,.18,bx,.27,z,chrome);for(const side of[-1,1]){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(bx,.24,z),new THREE.Vector3(bx+side*.28,.30,z),new THREE.Vector3(bx+side*.58,.47,z)]);add(new THREE.TubeGeometry(curve,8,.045,8,false),chrome);}}
  for(let j=0;j<6;j++){const z=8.2+j*.72;
   for(const side of[-1,1]){
    const x=bx+side*.39;rounded(.70,.15,.64,x,.535,z,leather,-side*.035);rounded(.16,.65,.64,bx+side*.10,.90,z,leather,side*.10);
    // Stainless seat shells, back edging and curved arm loops are shared between adjacent chairs.
    rounded(.67,.035,.66,x,.45,z,chrome);rounded(.045,.64,.66,bx+side*.015,.90,z,chrome,side*.10);
    const p=world(x,z);seats.push({...p,sitHeight:ground+.61,facing:angle+side*Math.PI/2,kind:'hospital lobby linked seating'});
   }
  }
  for(let j=0;j<=6;j++){const z=7.84+j*.72;for(const side of[-1,1]){const points=[[.10,.65],[.10,.82],[.30,.86],[.62,.86],[.73,.79],[.69,.63]].map(([x,y])=>new THREE.Vector3(bx+side*x,y,z));add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),20,.023,8,false),chrome);}}
 }
 return{banks:bankSpecs,seatCount:24};
}
