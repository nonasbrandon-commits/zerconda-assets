import * as THREE from 'three';
let map;const applied=new WeakSet();
export function applyRealisticGrass(material,{variant='lawn'}={}){
 if(applied.has(material))return material;applied.add(material);
 map??=new THREE.TextureLoader().load(new URL('./assets/lush-grass-v191.webp',import.meta.url).href);map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.anisotropy=8;
 const short=variant==='green',fairway=variant==='fairway',rough=variant==='rough',scale=short?.38:fairway?.9:rough?1.8:1.35;
 material.map=map;material.normalMap=null;material.bumpMap=null;material.displacementMap=null;material.roughnessMap=null;material.aoMap=null;material.roughness=.98;material.metalness=0;material.color.set(short?0xb7d39c:fairway?0xa8c78f:rough?0x8aa66f:0xb1c994);material.userData.realisticGrass={variant,visualOnly:true,displacement:0};
 const before=material.onBeforeCompile.bind(material),key=material.customProgramCacheKey();
 material.onBeforeCompile=shader=>{before(shader);shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 realisticGrassWorld;');shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>\nvec4 grassLocal=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\ngrassLocal=instanceMatrix*grassLocal;\n#endif\nrealisticGrassWorld=(modelMatrix*grassLocal).xyz;`);shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 realisticGrassWorld;');shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#ifdef USE_MAP\nvec4 sampledDiffuseColor=texture2D(map,realisticGrassWorld.xz/${scale.toFixed(3)});\n${short?'sampledDiffuseColor.rgb=mix(vec3(.33,.48,.19),sampledDiffuseColor.rgb,.55);':''}\ndiffuseColor*=sampledDiffuseColor;\n#endif`);};material.customProgramCacheKey=()=>key+'-realistic-grass-v191-'+variant;material.needsUpdate=true;return material;
}
export function createRealisticGrass(variant='lawn'){return applyRealisticGrass(new THREE.MeshStandardMaterial(),{variant});}

export function getRealisticGrassTexture(){if(!map)createRealisticGrass();return map;}
