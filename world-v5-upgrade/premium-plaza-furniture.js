import {addRealisticPlanterFoliage} from './realistic-planter-foliage.js?v=20261118-wall-mystery-v111';
import * as THREE from 'three';
// Original detailed plaza furnishings, scaled in meters. No oversized wooden crates or candy-ball flowers.
export function addPremiumPlazaFurniture(scene,{cx=48,cz=48}={}){
 const root=new THREE.Group();root.name='Premium plaza benches and flower planters';scene.add(root);
 const mat=(color,roughness=.8,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const metal=mat(0x252c30,.4,.65),timber=mat(0x76523b,.68),concrete=mat(0xa8a39b,.9),soil=mat(0x34291e,1),leaf=mat(0x2c6833,.95),leaf2=mat(0x488a42,.94);
 const blooms=[0xe94088,0xf056a1,0xfae0ef,0xc92764,0xf9b5d0].map(c=>mat(c,.82));
 const cube=new THREE.BoxGeometry(1,1,1);
 function box(parent,w,h,d,x,y,z,m){const o=new THREE.Mesh(cube,m);o.scale.set(w,h,d);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 function sphere(parent,r,x,y,z,m){const o=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),m);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o}
 function bench(x,z,a){
  const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=a;root.add(g);
  for(let side of [-1,1]){
   box(g,.09,.76,.09,side*.87,.4,-.22,metal);
   box(g,.09,.76,.09,side*.87,.4,.27,metal);
   box(g,.08,.12,.62,side*.87,.76,0,metal);
  }
  for(let j=0;j<5;j++)box(g,1.9,.075,.105,0,.48,-.3+j*.115,timber);
  for(let j=0;j<5;j++)box(g,1.9,.105,.075,0,.76+j*.13,.27+j*.035,timber);
  return g;
 }
 function planter(x,z,a,idx){
  const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=a;root.add(g);
  box(g,1.1,.08,1.05,0,.04,0,concrete);for(const side of[-1,1]){box(g,.09,.61,1.05,side*.505,.385,0,concrete);box(g,.92,.61,.09,0,.385,side*.48,concrete);}
  box(g,.91,.035,.86,0,.635,0,soil);
  addRealisticPlanterFoliage(g,{width:.9,depth:.84,soilY:.655,height:.4,count:5,seed:idx+81});
 }
 // Furnish two sides of the fountain without obstructing circulation.
 const spots=[[-19,-17],[-12,-20],[12,-20],[19,-17],[-19,17],[-12,20],[12,20],[19,17]];
 spots.forEach(([x,z],i)=>bench(cx+x,cz+z,Math.atan2(-x,-z)));
 const planters=[[-22,-22],[-8,-23],[8,-23],[22,-22],[-22,22],[-8,23],[8,23],[22,22]];
 planters.forEach(([x,z],i)=>planter(cx+x,cz+z,i*.34,i));
 return root;
}
