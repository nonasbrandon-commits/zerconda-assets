import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {getCraftedWoodMaterials} from './crafted-coffee-table.js?v=20261122-walnut-v221';
let timber,metal;
function materials(){if(timber)return;timber=getCraftedWoodMaterials().walnut.clone();timber.name='Warm horizontal fence timber';timber.color.setRGB(2.35,1.95,1.6);timber.roughness=.52;timber.clearcoat=.18;metal=new THREE.MeshStandardMaterial({name:'Charcoal powder coated fence frame',color:0x22272d,roughness:.48,metalness:.45});}
// One continuous U-shaped boundary. Every turn reuses a single shared post.
export function createModernPrivacyFence(parent,{left=-16,right=16,back=-15,front=18,y=.02}={}){
 materials();const root=new THREE.Group();root.name='Continuous timber and charcoal fence with shared corner posts';root.position.y=y;parent.add(root);const groups=new Map(),posts=new Map(),panels=[];
 function box(w,h,d,x,y,z,m,angle=0){const geo=new THREE.BoxGeometry(w,h,d);geo.rotateY(angle);geo.translate(x,y,z);const list=groups.get(m)||[];list.push(geo);groups.set(m,list);}
 function post(x,z){const key=x.toFixed(5)+','+z.toFixed(5);if(posts.has(key))return;posts.set(key,{x,z});box(.15,1.69,.15,x,.845,z,metal);box(.19,.055,.19,x,1.7075,z,metal);}
 function run(ax,az,bx,bz){const length=Math.hypot(bx-ax,bz-az),count=Math.ceil(length/2.5),angle=-Math.atan2(bz-az,bx-ax);for(let i=0;i<=count;i++){const t=i/count;post(ax+(bx-ax)*t,az+(bz-az)*t);}for(let i=0;i<count;i++){const t=(i+.5)/count,x=ax+(bx-ax)*t,z=az+(bz-az)*t,span=length/count-.14;panels.push({x,z,length:span,angle});for(const yy of[.11,1.265,1.645])box(span,.07,.085,x,yy,z,metal,angle);for(let row=0;row<5;row++)box(span,.208,.055,x,.255+row*.224,z,timber,angle);for(const yy of[1.37,1.49])box(span,.04,.055,x,yy,z,metal,angle);box(.04,.32,.045,x,1.45,z,metal,angle);}}
 run(left,front,left,back);run(left,back,right,back);run(right,back,right,front);
 for(const[m,list]of groups){const mesh=new THREE.Mesh(mergeGeometries(list),m);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);list.forEach(g=>g.dispose());}
 root.userData.fence={posts:[...posts.values()],panels,corners:[{x:left,z:back},{x:right,z:back}],bounds:{left,right,back,front},height:1.735};return root;
}
