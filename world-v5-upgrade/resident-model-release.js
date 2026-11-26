// Release a privately loaded resident model, without affecting shared town props.
export function releaseResidentModel(model,mixer){
 if(!model)return;
 mixer?.stopAllAction();mixer?.uncacheRoot(model);
 const geometries=new Set(),materials=new Set(),textures=new Set(),skeletons=new Set();
 model.traverse(o=>{if(!o.isMesh)return;geometries.add(o.geometry);if(o.skeleton)skeletons.add(o.skeleton);for(const m of Array.isArray(o.material)?o.material:[o.material]){if(!m)continue;materials.add(m);for(const value of Object.values(m))if(value?.isTexture)textures.add(value);}});
 model.removeFromParent();skeletons.forEach(s=>s.dispose());textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());
}
