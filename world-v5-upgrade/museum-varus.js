import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
// Keep the supplied exhibit fixed; the surrounding velvet barrier is real geometry.
export function createVarusExhibit(parent){
 const root=new THREE.Group();root.name='The Varus · original enclosed exhibit';root.position.set(-45.5,1.44,22);root.rotation.y=Math.PI/2;parent.add(root);
 const material=new THREE.MeshBasicMaterial({transparent:true,alphaTest:.035,side:THREE.DoubleSide,toneMapped:false});
 const exhibit=new THREE.Mesh(new THREE.PlaneGeometry(1,1),material);exhibit.name='Original Varus creature and gold glass enclosure';exhibit.position.y=3.5;exhibit.scale.set(5.2,7,1);exhibit.castShadow=false;exhibit.receiveShadow=false;root.add(exhibit);
 let loaded=false;const map=new THREE.TextureLoader().load(new URL('./assets/varus-original-enclosure-v131.png',import.meta.url).href,texture=>{exhibit.scale.x=7*texture.image.width/texture.image.height;loaded=true;});map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;material.map=map;
 const barrier=new THREE.Group();barrier.name='Gold stanchions and red velvet museum barrier';root.add(barrier);
 const brass=new THREE.MeshStandardMaterial({color:'#c99b39',metalness:.72,roughness:.25}),velvet=new THREE.MeshStandardMaterial({color:'#8e1026',roughness:.96,metalness:0});const goldParts=[],ropeParts=[];
 function part(geometry,x,y,z,list=goldParts,rx=0){const matrix=new THREE.Matrix4().compose(new THREE.Vector3(x,y,z),new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),rx),new THREE.Vector3(1,1,1));geometry.applyMatrix4(matrix);const g=geometry.index?geometry.toNonIndexed():geometry;if(g!==geometry)geometry.dispose();list.push(g);}
 const posts=[[-3.3,-1.6],[0,-1.6],[3.3,-1.6],[3.3,.4],[3.3,2.4],[0,2.4],[-3.3,2.4],[-3.3,.4]];
 for(const [x,z]of posts){part(new THREE.CylinderGeometry(.19,.23,.055,32),x,.028,z);part(new THREE.CylinderGeometry(.065,.17,.14,32),x,.115,z);part(new THREE.CylinderGeometry(.035,.052,.73,24),x,.54,z);for(const y of[.19,.89,.98])part(new THREE.TorusGeometry(.057,.015,8,24),x,y,z,goldParts,Math.PI/2);part(new THREE.SphereGeometry(.092,24,16),x,1.055,z);}
 for(let i=0;i<posts.length;i++){const a=posts[i],b=posts[(i+1)%posts.length],curve=new THREE.CatmullRomCurve3([new THREE.Vector3(a[0],.98,a[1]),new THREE.Vector3(a[0]*.75+b[0]*.25,.76,a[1]*.75+b[1]*.25),new THREE.Vector3((a[0]+b[0])/2,.66,(a[1]+b[1])/2),new THREE.Vector3(a[0]*.25+b[0]*.75,.76,a[1]*.25+b[1]*.75),new THREE.Vector3(b[0],.98,b[1])]);part(new THREE.TubeGeometry(curve,40,.045,12,false),0,0,0,ropeParts);}
 for(const [parts,mat,name]of[[goldParts,brass,'Eight polished gold barrier posts'],[ropeParts,velvet,'Eight sagging red velvet ropes']]){const mesh=new THREE.Mesh(mergeGeometries(parts,false),mat);mesh.name=name;mesh.castShadow=true;mesh.receiveShadow=true;barrier.add(mesh);parts.forEach(g=>g.dispose());}
 return{root,barrier,posts,creature:exhibit,enclosure:exhibit,get loaded(){return loaded},blocks(x,z){const lx=-(z-22),lz=x+45.5;return Math.abs(lx)<3.55&&lz> -1.85&&lz<2.65;},update(){}};
}
