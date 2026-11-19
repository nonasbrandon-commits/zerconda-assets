import * as THREE from 'three';
import {Reflector} from 'three/addons/objects/Reflector.js';
let reflecting=false;
export function createClearMirror(parent,{width=1,height=2,x=0,y=1.15,z=0,angle=0,name='Clear real-time mirror'}={}){
 const shader={...Reflector.ReflectorShader,fragmentShader:Reflector.ReflectorShader.fragmentShader.replace('vec4( blendOverlay( base.rgb, color ), 1.0 )','vec4( base.rgb, 1.0 )')};
 const mirror=new Reflector(new THREE.PlaneGeometry(width,height),{textureWidth:64,textureHeight:64,clipBias:.002,shader,multisample:4});mirror.name=name;mirror.userData.clearMirror=true;mirror.position.set(x,y,z);mirror.rotation.y=angle;parent.add(mirror);
 const render=mirror.onBeforeRender.bind(mirror),position=new THREE.Vector3();let last=-Infinity;
 mirror.onBeforeRender=function(renderer,scene,camera,...args){if(reflecting)return;const distance=camera.position.distanceTo(mirror.getWorldPosition(position)),now=performance.now();if(distance>18||now-last<(distance<6?25:80))return;const extent=distance<6?1536:1024,aspect=width/height,target=mirror.getRenderTarget(),w=Math.round(aspect>=1?extent:extent*aspect),h=Math.round(aspect>=1?extent/aspect:extent);if(target.width!==w||target.height!==h)target.setSize(w,h);reflecting=true;try{render(renderer,scene,camera,...args);last=now;}finally{reflecting=false;}};
 return mirror;
}
