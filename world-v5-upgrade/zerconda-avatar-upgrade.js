import * as THREE from 'three';
export function createZercondaAvatar(){
 const root=new THREE.Group();
 const mat=(color)=>new THREE.MeshStandardMaterial({color,roughness:.92});
 const skin=mat(0xb98768),shirt=mat(0x246d9c),pants=mat(0x806247),hair=mat(0x38251c),shoes=mat(0x242b30);
 function part(x,y,z,rx,ry,rz,m){const o=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),m);o.position.set(x,y,z);o.scale.set(rx,ry,rz);o.castShadow=true;root.add(o);return o;}
 part(0,1.38,0,.22,.27,.13,shirt);part(0,1.11,0,.17,.12,.12,shirt);
 part(0,1.64,0,.064,.085,.065,skin);part(0,1.77,0,.095,.116,.09,skin);
 part(0,1.845,-.012,.097,.057,.094,hair);part(0,1.79,-.081,.08,.029,.028,hair);
 for(const s of [-1,1]){part(s*.225,1.43,0,.073,.16,.077,shirt);part(s*.24,1.16,0,.044,.19,.044,skin);part(s*.24,.955,0,.041,.065,.035,skin);part(s*.086,.81,0,.082,.27,.09,pants);part(s*.086,.40,0,.066,.25,.072,pants);part(s*.086,.09,.05,.079,.053,.13,shoes);}
 return root;
}
