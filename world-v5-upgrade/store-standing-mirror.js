import * as THREE from 'three';
import {Reflector} from 'three/addons/objects/Reflector.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export function createStoreStandingMirror(parent){
 const root=new THREE.Group();root.name='Full-length standing store mirror';root.userData.dynamicScenery=true;root.position.set(4.86,0,-5.0);root.rotation.y=-Math.PI/2;parent.add(root);
 const frame=new THREE.MeshStandardMaterial({color:'#30373c',metalness:.75,roughness:.28}),edge=new THREE.MeshStandardMaterial({color:'#aebbc4',metalness:.9,roughness:.18}),rubber=new THREE.MeshStandardMaterial({color:'#151a1d',roughness:.9});
 function box(w,h,d,x,y,z,mat){const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(.02,w/4,h/4,d/4)),mat);mesh.position.set(x,y,z);root.add(mesh);return mesh;}
 const backing=box(1.22,2.38,.065,0,1.24,.065,frame);backing.rotation.x=-.045;
 const mobile=matchMedia('(pointer:coarse)').matches,size=mobile?256:512;
 const glass=new Reflector(new THREE.PlaneGeometry(1.10,2.24),{clipBias:.003,textureWidth:size,textureHeight:size,color:0xe9eef0,multisample:0});glass.name='Actual full-length mirror reflection';glass.position.set(0,1.24,.105);glass.rotation.x=-.045;glass.userData.dynamicScenery=true;root.add(glass);
 // Reuse the last reflection between bounded updates. Hidden/offscreen mirrors cost no pass.
 const reflect=glass.onBeforeRender;let last=-Infinity,captures=0;
 glass.onBeforeRender=function(renderer,scene,camera,...args){const now=performance.now();if(now-last<(mobile?120:65))return;const world=new THREE.Vector3();glass.getWorldPosition(world);if(camera.position.distanceTo(world)>12)return;last=now;reflect.call(this,renderer,scene,camera,...args);captures++;};
 for(const side of[-1,1]){const rail=box(.045,2.37,.035,side*.586,1.24,.104,edge);rail.rotation.x=-.045;box(1.20,.045,.04,0,1.24+side*1.17,.104-side*.052,edge);box(.22,.055,.27,side*.45,.028,.17,frame);box(.20,.015,.24,side*.45,.008,.17,rubber);}
 return{root,glass,resolution:size,get captures(){return captures;}};
}
