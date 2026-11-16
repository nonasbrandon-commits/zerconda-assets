import * as THREE from 'three';
// Replacement fountain: eliminates the black GLB geometry entirely.
// Physically lit limestone tiers, clear water, water jets and a walkable plaza.
const BASE='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/';
export async function installRealisticFountain({scene,centerX=48,centerZ=48,renderer}={}){
 const root=new THREE.Group();root.position.set(centerX,0,centerZ);root.name='Zerconda rebuilt limestone fountain';scene.add(root);
 const loader=new THREE.TextureLoader();
 const tex=loader.load(BASE+'realistic-assets/photographic-environment-v2/warm-paving.jpg');
 tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(9,9);tex.anisotropy=8;
 const paving=new THREE.MeshStandardMaterial({map:tex,color:0xffffff,roughness:.92,side:THREE.DoubleSide});
 const limestone=new THREE.MeshStandardMaterial({color:0xe3d8c6,roughness:.86,metalness:0,side:THREE.DoubleSide});
 const accent=new THREE.MeshStandardMaterial({color:0xb6a792,roughness:.82,side:THREE.DoubleSide});
 const water=new THREE.MeshPhysicalMaterial({color:0x70b9d0,roughness:.12,metalness:.08,transparent:true,opacity:.83,clearcoat:1,side:THREE.DoubleSide,depthWrite:false});
 const spray=new THREE.MeshBasicMaterial({color:0xe2f9ff,transparent:true,opacity:.75,depthWrite:false,side:THREE.DoubleSide});
 const add=(geo,mat,x=0,y=0,z=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.receiveShadow=true;m.castShadow=false;root.add(m);return m};
 // All plaza geometry is explicitly upward-facing: no dark/inverted GLB faces.
 const plaza=add(new THREE.PlaneGeometry(54,54),paving,0,.035,0);plaza.rotation.x=-Math.PI/2;
 const ring=(outer,inner,h,y,mat)=>add(new THREE.RingGeometry(inner,outer,96),mat,0,y,0);
 function disk(radius,height,y,mat){return add(new THREE.CylinderGeometry(radius,radius,height,96),mat,0,y,0);}
 function basin(radius,baseY,wallH){
  disk(radius,.35,baseY,limestone);
  add(new THREE.CylinderGeometry(radius,radius,wallH,96,1,true),limestone,0,baseY+wallH/2,0);
  add(new THREE.CylinderGeometry(radius-.4,radius-.4,wallH-.2,96,1,true),accent,0,baseY+wallH/2,0);
  const rim=add(new THREE.TorusGeometry(radius-.06,.27,12,96),limestone,0,baseY+wallH,0);rim.rotation.x=Math.PI/2;
  const surface=disk(radius-.43,.035,baseY+wallH-.21,water);surface.renderOrder=3;
 }
 disk(11.35,.25,.12,limestone);basin(10.8,.45,1.35);
 disk(3.35,1.45,1.65,limestone);
 add(new THREE.CylinderGeometry(1.5,2.15,3.4,48),limestone,0,3.95,0);
 basin(4.35,5.55,.65);
 add(new THREE.CylinderGeometry(.92,1.4,2.5,48),limestone,0,7.05,0);
 basin(2.5,8.3,.5);
 add(new THREE.CylinderGeometry(.33,.55,2.15,32),limestone,0,9.75,0);
 const top=add(new THREE.SphereGeometry(.5,24,16),accent,0,10.9,0);
 // Carved stone flutes and ornamental supports.
 for(let i=0;i<24;i++){
  const a=i*Math.PI/12;
  const x=Math.cos(a)*3.1,z=Math.sin(a)*3.1;
  add(new THREE.CylinderGeometry(.13,.19,1.8,12),accent,x,2.3,z);
 }
 const jets=[];
 function jet(from,to,arc,r=.035){
  const pts=[];for(let j=0;j<=20;j++){const t=j/20;pts.push(new THREE.Vector3(
   from.x+(to.x-from.x)*t,from.y+(to.y-from.y)*t+Math.sin(Math.PI*t)*arc,
   from.z+(to.z-from.z)*t));}
  const m=add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),28,r,6),spray.clone());jets.push(m);
 }
 for(let i=0;i<32;i++){
  const a=i*Math.PI/16;
  jet(new THREE.Vector3(Math.cos(a)*9.8,1.7,Math.sin(a)*9.8),
      new THREE.Vector3(Math.cos(a)*5.1,1.6,Math.sin(a)*5.1),3.5,.035);
 }
 for(let i=0;i<16;i++){
  const a=i*Math.PI/8;
  jet(new THREE.Vector3(Math.cos(a)*3.65,6.15,Math.sin(a)*3.65),
      new THREE.Vector3(Math.cos(a)*7.4,1.7,Math.sin(a)*7.4),1.6,.028);
 }
 for(let i=0;i<12;i++){
  const a=i*Math.PI/6;
  jet(new THREE.Vector3(Math.cos(a)*2,8.75,Math.sin(a)*2),
      new THREE.Vector3(Math.cos(a)*4.5,5.9,Math.sin(a)*4.5),1,.022);
 }
 const light=new THREE.HemisphereLight(0xffffff,0xe3d6c5,1.2);root.add(light);
 let elapsed=0;
 function update(dt){elapsed+=dt;for(let i=0;i<jets.length;i++)jets[i].material.opacity=.68+.1*Math.sin(elapsed*3+i*.4);}
 function canWalk(x,z,radius=.45){return Math.hypot(x-centerX,z-centerZ)>11.35+radius;}
 function dispose(){scene.remove(root);root.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});tex.dispose();}
 return {root,update,canWalk,dispose,obstacles:[{x:centerX,z:centerZ,r:11.35}],stats:{replacedBlackGLB:true}};
}
