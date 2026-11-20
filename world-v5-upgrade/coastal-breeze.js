// A shared, gentle coastal gust. All deformation happens on the GPU.
const clock={value:0};
export function advanceCoastalBreeze(dt){clock.value+=Math.max(0,Math.min(.15,dt));}
export function setCoastalBreezeTime(time){clock.value=time;}
export function coastalBreezeTime(){return clock.value;}
export function addCoastalBreeze(material,{kind='foliage',baseY=0,height=1,amplitude=.015,flutter=.002,rects=[]}={}){
 const n=v=>Number(v).toFixed(6),mask=rects.length?rects.map(r=>`coastalRect(uv,vec4(${r.map(n).join(',')}))`).join('+'):`smoothstep(${n(baseY)},${n(baseY+height)},position.y)`;
 material.userData.coastalBreeze={kind,baseY,height,amplitude,flutter,rects};
 material.onBeforeCompile=shader=>{shader.uniforms.coastalWindTime=clock;shader.vertexShader=shader.vertexShader.replace('#include <common>',`#include <common>\nuniform float coastalWindTime;\nfloat coastalRect(vec2 p,vec4 r){return smoothstep(r.x,r.x+.018,p.x)*(1.0-smoothstep(r.z-.018,r.z,p.x))*smoothstep(r.y,r.y+.025,p.y)*(1.0-smoothstep(r.w-.025,r.w,p.y));}`);shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>\nfloat coastalWeight=clamp(${mask},0.0,1.0);\nvec3 coastalWorld=(modelMatrix*vec4(position,1.0)).xyz;\nfloat coastalPhase=dot(modelMatrix[3].xz,vec2(.173,.119));\nfloat coastalGust=sin(coastalWindTime*.68+coastalPhase)*.70+sin(coastalWindTime*1.13+coastalPhase*.7)*.30;\nfloat coastalFlutter=sin(coastalWindTime*2.1+coastalWorld.x*2.7+coastalWorld.y*1.9);\ntransformed.x+=coastalWeight*(${n(amplitude)}*coastalGust+${n(flutter)}*coastalFlutter);\ntransformed.z+=coastalWeight*${n(amplitude*.22)}*sin(coastalWindTime*.79+coastalPhase);`);};
 material.customProgramCacheKey=()=>`coastal-breeze-${JSON.stringify(material.userData.coastalBreeze)}`;material.needsUpdate=true;return material;
}
