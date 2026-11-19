import * as THREE from 'three';
// A perspective-correct view of the actual lot for the separate collision-safe home interior.
export function createHomeWindowViews(scene,interior,originals){
 let target=null;const viewCamera=new THREE.PerspectiveCamera(),size=new THREE.Vector2(),viewport=new THREE.Vector2(),rotation=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0),state=[];const uniforms={view:{value:null},screen:{value:viewport}};
 const material=new THREE.ShaderMaterial({uniforms,vertexShader:'void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`uniform sampler2D view;uniform vec2 screen;void main(){vec3 c=texture2D(view,gl_FragCoord.xy/screen).rgb;gl_FragColor=vec4(c*vec3(.96,.98,.99),1.);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,side:THREE.DoubleSide});
 for(const pane of interior.windowPanes){pane.material.dispose();pane.material=material;pane.castShadow=false;}
 function render(renderer,camera,home){if(!home||!interior.root.visible)return;renderer.getDrawingBufferSize(size);viewport.copy(size);const width=Math.min(1280,size.x),height=Math.round(width*size.y/size.x);if(!target){target=new THREE.WebGLRenderTarget(width,height);uniforms.view.value=target.texture;}else if(target.width!==width||target.height!==height)target.setSize(width,height);
 viewCamera.copy(camera,false);viewCamera.position.copy(camera.position).sub(interior.root.position);rotation.setFromAxisAngle(up,home.angle||0);viewCamera.position.applyQuaternion(rotation).add(new THREE.Vector3(home.x,.14,home.z));viewCamera.quaternion.copy(rotation).multiply(camera.quaternion);viewCamera.far=Math.max(camera.far,800);viewCamera.updateProjectionMatrix();viewCamera.updateMatrixWorld(true);
 const previous=renderer.getRenderTarget(),shadow=renderer.shadowMap.autoUpdate;state.length=0;
 try{for(const obj of scene.children){state.push([obj,obj.visible]);if(originals.has(obj))obj.visible=originals.get(obj);if(obj===interior.root||/avatar|player/i.test(obj.name))obj.visible=false;}const hidden=[];for(const obj of home.group.children)if(obj.userData.windowViewHideHouse||obj===home.hinge||obj===home.overhead){hidden.push([obj,obj.visible]);obj.visible=false;}try{renderer.shadowMap.autoUpdate=false;renderer.setRenderTarget(target);renderer.render(scene,viewCamera);}finally{for(const [obj,visible]of hidden)obj.visible=visible;}}
 finally{for(const [obj,visible]of state)obj.visible=visible;renderer.setRenderTarget(previous);renderer.shadowMap.autoUpdate=shadow;}
 }
 return{render,get target(){return target},material,viewCamera};
}
