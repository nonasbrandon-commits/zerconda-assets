import * as THREE from 'three';
export function createLawnSeating(scene){const root=new THREE.Group();root.name='South lawn garden benches';scene.add(root);const wood=new THREE.MeshStandardMaterial({color:0x79523a,roughness:.8}),metal=new THREE.MeshStandardMaterial({color:0x23343a,metalness:.5,roughness:.55}),seats=[];
function box(parent,w,h,d,x,y,z,mat){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.receiveShadow=true;parent.add(m);}
for(const z of [25,39,53]){const g=new THREE.Group();g.position.set(-114.4,.02,z);g.rotation.y=Math.PI/2;root.add(g);for(let i=0;i<4;i++){box(g,2,.07,.13,0,.48,(i-1.5)*.15,wood);box(g,2,.12,.065,0,.72+i*.13,-.32,wood);}for(const x of[-.78,.78]){box(g,.07,.47,.54,x,.235,0,metal);box(g,.07,1,.07,x,.5,-.34,metal);}seats.push({x:-114.4,z,facing:Math.PI/2,sitHeight:.535,kind:'garden bench'});}
return{root,seats};}
