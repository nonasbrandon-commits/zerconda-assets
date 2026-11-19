import * as THREE from 'three';
// The complete supplied exhibit is preserved as one background-free image asset.
export function createVarusExhibit(parent){
 const root=new THREE.Group();root.name='The Varus · original enclosed exhibit';root.position.set(-45.5,1.44,22);root.rotation.y=Math.PI/2;parent.add(root);
 const material=new THREE.MeshBasicMaterial({transparent:true,alphaTest:.035,side:THREE.DoubleSide,toneMapped:false});
 const exhibit=new THREE.Mesh(new THREE.PlaneGeometry(1,1),material);exhibit.name='Original Varus creature and gold glass enclosure';exhibit.position.y=3.5;exhibit.scale.set(5.2,7,1);exhibit.castShadow=false;exhibit.receiveShadow=false;root.add(exhibit);
 let loaded=false;const map=new THREE.TextureLoader().load(new URL('./assets/varus-original-enclosure-v131.png',import.meta.url).href,texture=>{exhibit.scale.x=7*texture.image.width/texture.image.height;loaded=true;});map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=8;material.map=map;
 return{root,creature:exhibit,enclosure:exhibit,get loaded(){return loaded},blocks(x,z){return Math.hypot(x+45.5,z-22)<2.75;},update(player){parent.updateWorldMatrix(true,false);const local=parent.worldToLocal(new THREE.Vector3(player.x,0,player.z));exhibit.rotation.y=THREE.MathUtils.clamp(Math.atan2(local.x+45.5,local.z-22)-Math.PI/2,-.60,.60);}};
}
