import * as THREE from 'three';
// A cached, house-only sun pass avoids re-rendering the whole town's moving cast.
export function createHouseSunShadows({scene,renderer,sun,getHome,getPlayer,enabled=true}){
 let cachedVersion=-1,ready=false,passes=0;const homePosition=new THREE.Vector3();
 function render(camera){const home=getHome(),p=getPlayer();if(home)home.getWorldPosition(homePosition);const near=enabled&&home&&Math.hypot(p.x-homePosition.x,p.z-homePosition.z)<65;
  renderer.shadowMap.enabled=!!near;renderer.shadowMap.autoUpdate=false;sun.shadow.autoUpdate=false;
  const version=home?.userData.houseShadowVersion||0;
  if(!near||ready&&cachedVersion===version){renderer.render(scene,camera);return;}
  const suppressed=[];scene.traverse(o=>{if(!o.isMesh||!o.castShadow)return;let n=o,isHome=false;while(n){if(n===home){isHome=true;break;}n=n.parent;}if(!isHome){suppressed.push(o);o.castShadow=false;}});
  sun.position.set(homePosition.x-70,135,homePosition.z+85);sun.target.position.set(homePosition.x,0,homePosition.z);sun.target.updateMatrixWorld();Object.assign(sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35});sun.shadow.camera.updateProjectionMatrix();sun.shadow.bias=-.00015;sun.shadow.normalBias=.06;sun.shadow.needsUpdate=true;renderer.shadowMap.needsUpdate=true;
  try{renderer.render(scene,camera);ready=true;cachedVersion=version;passes++;}finally{for(const o of suppressed)o.castShadow=true;}
 }
 return{render,stats:()=>({passes,ready,enabled:renderer.shadowMap.enabled})};
}
