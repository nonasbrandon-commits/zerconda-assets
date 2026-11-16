// Zerconda photorealistic fountain plaza integration — THREE.js r160+
// This imports the actual walkable GLB; it does NOT build cartoon substitutes.
// Requires the GLB to exist at realistic-assets/fountain/zerconda_walkable_fountain_plaza.glb
// and the existing CC0 PBR texture maps in realistic-assets/pbr/PavingStones070/.
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const REPO='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/';
const GLB=REPO+'realistic-assets/fountain/zerconda_walkable_fountain_plaza.glb';
const PBR=REPO+'realistic-assets/pbr/PavingStones070/';
const files={
 color:'PavingStones070_1K-JPG_Color.jpg',
 normal:'PavingStones070_1K-JPG_NormalGL.jpg',
 rough:'PavingStones070_1K-JPG_Roughness.jpg',
 ao:'PavingStones070_1K-JPG_AmbientOcclusion.jpg'
};
function loadTexture(loader,name,color=false){
 const t=loader.load(PBR+files[name]);
 t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.anisotropy=8;
 if(color)t.colorSpace=THREE.SRGBColorSpace;
 return t;
}
function pbrMaterial(map,normalMap,roughnessMap,color=0xffffff,roughness=1){
 return new THREE.MeshStandardMaterial({color,map,normalMap,normalScale:new THREE.Vector2(.65,.65),roughnessMap,roughness,metalness:0});
}
function generatePlanarUV(geometry,worldMatrix,scale=1/2.1){
 const pos=geometry.getAttribute('position');
 const uv=new Float32Array(pos.count*2),v=new THREE.Vector3();
 for(let i=0;i<pos.count;i++){
  v.fromBufferAttribute(pos,i).applyMatrix4(worldMatrix);
  uv[2*i]=v.x*scale;uv[2*i+1]=v.z*scale;
 }
 geometry.setAttribute('uv',new THREE.BufferAttribute(uv,2));
 // Ambient occlusion needs uv2; same coordinates are fine for a tiling texture.
 geometry.setAttribute('uv2',new THREE.BufferAttribute(uv.slice(),2));
 return geometry;
}
function mergeNamedMeshes(root,filter,material){
 root.updateMatrixWorld(true);
 const found=[];
 root.traverse(o=>{if(o.isMesh&&filter(o.name))found.push(o);});
 const parts=[];
 for(const m of found){
  const g=m.geometry.clone();
  // Convert each object's geometry into root-local coordinates.
  const matrix=new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(m.matrixWorld);
  g.applyMatrix4(matrix);
  generatePlanarUV(g,new THREE.Matrix4().identity());
  if(!g.getAttribute('normal'))g.computeVertexNormals();
  // Remove nonuniform optional attributes to keep mergeGeometries compatible.
  for(const attr of Object.keys(g.attributes)){
   if(!['position','normal','uv','uv2'].includes(attr))g.deleteAttribute(attr);
  }
  if(g.index) {const n=g.toNonIndexed();g.dispose();parts.push(n);}
  else parts.push(g);
 }
 if(!parts.length)return 0;
 const combined=mergeGeometries(parts,false);
 parts.forEach(p=>p.dispose());
 if(!combined)throw new Error('Failed to merge plaza geometry');
 const mesh=new THREE.Mesh(combined,material);
 mesh.name='Optimized '+found.length+' stone pieces';
 mesh.receiveShadow=true;mesh.castShadow=false;
 root.add(mesh);
 for(const m of found){m.parent.remove(m);m.geometry.dispose();}
 return found.length;
}
function makeWater(){
 return new THREE.MeshPhysicalMaterial({
  color:0x78aeb6,roughness:.07,metalness:.05,transparent:true,opacity:.85,
  transmission:.12,ior:1.333,clearcoat:1,clearcoatRoughness:.04,
  side:THREE.DoubleSide,depthWrite:false
 });
}
function makeJet(THREE,start,end,height,radius=.032){
 const points=[];
 for(let i=0;i<=18;i++){
  const t=i/18;
  points.push(new THREE.Vector3(
   THREE.MathUtils.lerp(start.x,end.x,t),
   THREE.MathUtils.lerp(start.y,end.y,t)+Math.sin(t*Math.PI)*height,
   THREE.MathUtils.lerp(start.z,end.z,t)));
 }
 return new THREE.Mesh(
  new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),32,radius,5),
  new THREE.MeshPhysicalMaterial({
   color:0xc7f3ff,transparent:true,opacity:.57,
   roughness:.09,depthWrite:false
  })
 );
}
export async function installRealisticFountain({
 scene,centerX=48,centerZ=48,renderer,baseUrl=GLB
}={}){
 if(!scene)throw new Error('installRealisticFountain requires a Three.js scene');
 const textures=new THREE.TextureLoader();
 const stoneColor=loadTexture(textures,'color',true);
 const stoneNormal=loadTexture(textures,'normal');
 const stoneRough=loadTexture(textures,'rough');
 const pavement=pbrMaterial(stoneColor,stoneNormal,stoneRough,0xffffff,1);
 const granite=pbrMaterial(stoneColor,stoneNormal,stoneRough,0xada79f,.94);
 const carved=pbrMaterial(stoneColor,stoneNormal,stoneRough,0xe4d8c9,.91);
 const metal=new THREE.MeshStandardMaterial({color:0x605343,metalness:.72,roughness:.28});
 const wood=new THREE.MeshStandardMaterial({color:0x59402d,roughness:.7});
 const leaves=new THREE.MeshStandardMaterial({color:0x3d6036,roughness:.9,side:THREE.DoubleSide});
 const petals=new THREE.MeshStandardMaterial({color:0xbd6577,roughness:.8,side:THREE.DoubleSide});
 const water=makeWater();
 const loader=new GLTFLoader();
 let gltf;
 try{gltf=await loader.loadAsync(baseUrl);}
 catch(err){throw new Error('Fountain GLB could not load. Upload the .glb to GitHub first: '+baseUrl+' ('+err.message+')');}
 const root=gltf.scene;
 root.name='Zerconda realistic walkable fountain plaza';
 root.position.set(centerX,0,centerZ);
 // Model is already 54x54m, oriented Y-up. Never normalize or scale by height.
 scene.add(root);
 root.updateMatrixWorld(true);
 // ~2,550 individual stone meshes cause terrible performance; merge into one.
 // Use real CC0 photographed PBR maps, not flat vertex colors.
 // The GLB already batches its paving into nine meshes. Never re-merge them:
 // mergeGeometries can produce invalid morph attributes in deployed Three.js builds.
 const optimizedPavers=0,optimizedCarvings=0,optimizedFlowerLeaves=0,optimizedFlowerPetals=0;
 root.traverse(obj=>{
  if(!obj.isMesh)return;
  const n=obj.name.toLowerCase();
  if(n==='plaza_substrate'||n.includes('stone')||n.includes('granite')||n.includes('basin')||n.includes('pedestal')||n.includes('tier')||n.startsWith('flute_')||n.startsWith('outer_')||n.startsWith('inner_')){
   if(!n.includes('water')){
    const g=obj.geometry.clone();
    // Planar UVs give texture to meshes that originally only had vertex colors.
    obj.updateWorldMatrix(true,false);
    generatePlanarUV(g,new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(obj.matrixWorld),.45);
    // setGeometry is intentionally avoided: older Three.js builds may crash
    // in Mesh.updateMorphTargets when swapping cloned GLTF geometry.
    g.morphAttributes=g.morphAttributes||{};
    obj.geometry=g;
    obj.material=n.includes('basin')||n.includes('pedestal')||n.includes('tier')?carved:granite;
   }
  }
  if(n.startsWith('paver_batch_')){
   const g=obj.geometry.clone();g.morphAttributes=g.morphAttributes||{};
   obj.updateWorldMatrix(true,false);
   generatePlanarUV(g,new THREE.Matrix4().copy(root.matrixWorld).invert().multiply(obj.matrixWorld),.46);
   obj.geometry=g;obj.material=pavement;
  }
  if(n.includes('water'))obj.material=water;
  if(n.startsWith('bench_'))obj.material=n.includes('leg')?metal:wood;
  if(n.startsWith('stone_flower_urn_'))obj.material=carved;
  if(n==='finial')obj.material=metal;
  obj.castShadow=!n.includes('water')&&!n.startsWith('paver_');
  obj.receiveShadow=true;
 });
 // Reusable water effects are separate from the solid GLB mesh.
 const effects=new THREE.Group();effects.name='Fountain water effects';root.add(effects);
 const jets=[];
 for(let i=0;i<20;i++){
  const a=i*Math.PI*2/20;
  const from=new THREE.Vector3(Math.cos(a)*8.5,1.7,Math.sin(a)*8.5);
  const to=new THREE.Vector3(Math.cos(a)*4.6,1.65,Math.sin(a)*4.6);
  const jet=makeJet(THREE,from,to,2.7,.036);
  effects.add(jet);jets.push(jet);
 }
 for(let i=0;i<12;i++){
  const a=i*Math.PI*2/12;
  const jet=makeJet(THREE,
   new THREE.Vector3(Math.cos(a)*3.9,4.85,Math.sin(a)*3.9),
   new THREE.Vector3(Math.cos(a)*7.3,1.5,Math.sin(a)*7.3),1.3,.028);
  effects.add(jet);jets.push(jet);
 }
 // Underwater lighting gives the reference's warm highlight without fake glowing stone.
 for(let i=0;i<6;i++){
  const a=i*Math.PI/3;
  const lamp=new THREE.PointLight(0xffd8a0,.6,7,2);
  lamp.position.set(Math.cos(a)*5,1.8,Math.sin(a)*5);
  effects.add(lamp);
 }
 if(renderer){
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.15;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 }
 let t=0;
 const obstacles=[{x:centerX,z:centerZ,r:11.1}];
 // Do not block the 54x54m pedestrian plaza. Block only the central basin.
 function canWalk(x,z,radius=.45){
  return obstacles.every(o=>Math.hypot(x-o.x,z-o.z)>o.r+radius);
 }
 function update(dt){
  t+=Math.min(dt,.05);
  water.opacity=.82+.025*Math.sin(t*1.3);
  for(let i=0;i<jets.length;i++){
   jets[i].material.opacity=.5+.08*Math.sin(t*2.8+i*.35);
  }
 }
 function dispose(){
  scene.remove(root);
  root.traverse(o=>{if(o.isMesh)o.geometry.dispose();});
  [pavement,granite,carved,metal,wood,leaves,petals,water].forEach(m=>m.dispose());
  [stoneColor,stoneNormal,stoneRough].forEach(t=>t.dispose());
 }
 return {root,update,canWalk,dispose,obstacles,
  stats:{optimizedPavers,optimizedCarvings,optimizedFlowerLeaves,optimizedFlowerPetals}};
}
