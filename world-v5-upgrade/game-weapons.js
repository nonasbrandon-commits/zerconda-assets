import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const steel=new THREE.MeshStandardMaterial({color:'#69737a',metalness:.65,roughness:.38}),dark=new THREE.MeshStandardMaterial({color:'#22292d',metalness:.35,roughness:.55}),rubber=new THREE.MeshStandardMaterial({color:'#111719',roughness:.9}),trim=new THREE.MeshStandardMaterial({color:'#aab6bb',metalness:.7,roughness:.3});
export const GAME_WEAPONS=[{id:'z-sidearm',name:'Z Sidearm',magazine:10,reserve:60,interval:.32},{id:'z-pump',name:'Z Pump',magazine:5,reserve:35,interval:.8},{id:'z-marksman',name:'Z Marksman',magazine:4,reserve:24,interval:1},{id:'z-carbine',name:'Z Carbine',magazine:16,reserve:96,interval:.16}];
// Original fictional exterior game props; no internal mechanisms are modelled.
export function createGameWeapon(id,{locked=true}={}){const root=new THREE.Group(),long=id!=='z-sidearm',marksman=id==='z-marksman',pump=id==='z-pump';root.name=GAME_WEAPONS.find(w=>w.id===id)?.name||'Z game prop';const led=new THREE.MeshBasicMaterial({color:locked?'#ff263e':'#37ff59'});
 function box(w,h,d,x,y,z,m=steel,angle=0){const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(.012,w/4,h/4,d/4)),m);mesh.position.set(x,y,z);mesh.rotation.x=angle;root.add(mesh);return mesh;}
 function barrel(r,len,y,z,m=steel){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,len,10),m);mesh.rotation.x=Math.PI/2;mesh.position.set(0,y,z);root.add(mesh);}
 box(.10,.14,long?.32:.24,0,0,0);box(.085,.10,long?.30:.24,0,.06,.015,trim);box(.08,.23,.10,0,-.14,-.07,rubber,-.25);box(.10,.035,.13,0,-.26,-.09,trim);barrel(.021,long?(marksman?.50:.34):.14,.045,long?.32:.17);barrel(.032,.065,.045,long?(marksman?.585:.50):.24,dark);box(.08,.025,long?.48:.23,0,.125,long?.08:.015,dark);
 if(long){box(.11,.13,.23,0,-.01,-.27,dark);box(.12,.20,.05,0,-.03,-.40,rubber);box(.085,pump?.08:.23,.10,0,-.16,.06,dark,pump?0:-.12);box(.105,.105,.25,0,.015,.22,pump?rubber:steel);for(let i=0;i<6;i++)box(.116,.065,.012,0,.035,.12+i*.035,dark);if(marksman){barrel(.045,.29,.205,.045,dark);barrel(.052,.03,.205,.20,led);box(.035,.08,.14,0,.15,.04,trim);}else{box(.06,.065,.035,0,.16,.02,dark);box(.045,.055,.025,0,.15,.36,dark);}}
 for(const side of [-1,1]){box(.006,.026,.07,side*.056,.015,-.015,led);box(.006,.025,.07,side*.057,-.035,-.01,trim);}
 const muzzle=new THREE.Object3D();muzzle.position.set(0,.045,long?(marksman?.64:.55):.28);root.add(muzzle);root.userData.weaponId=id;return{root,muzzle,setLocked(v){led.color.set(v?'#ff263e':'#37ff59')}};
}
