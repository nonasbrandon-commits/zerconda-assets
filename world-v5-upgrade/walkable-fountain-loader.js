// Zerconda walkable 3D fountain plaza integration
// Download GLB from the ChatGPT attachment and upload it to:
// realistic-assets/fountain/zerconda_walkable_fountain_plaza.glb
//
// In the existing Three.js world, call:
// const plaza = await installWalkableFountainPlaza({THREE,GLTFLoader,scene});
// In the movement collision function:
// if (!plaza.canWalk(x,z)) return false;
// Do NOT also instantiate the old procedural fountain, benches, or flowers.
export async function installWalkableFountainPlaza({THREE,GLTFLoader,scene,centerX=48,centerZ=48}){
 const loader=new GLTFLoader();
 const url='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/fountain/zerconda_walkable_fountain_plaza.glb';
 const model=await loader.loadAsync(url);
 const root=model.scene;
 root.position.set(centerX,0,centerZ);
 root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
 scene.add(root);
 // Center fountain basin radius ~10.5m. The surrounding 54m square is walkable.
 const canWalk=(x,z)=>Math.hypot(x-centerX,z-centerZ)>=10.5;
 return {root,canWalk,center:{x:centerX,z:centerZ}};
}
