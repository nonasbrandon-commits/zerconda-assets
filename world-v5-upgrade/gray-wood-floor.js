import * as THREE from 'three';
let material;
// Shared silver-gray oak, staggered 1.8 m planks, 22 cm wide.
export function getGrayWoodFloorMaterial(){
 if(material)return material;
 const w=2048,h=1024,c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d'),pixels=ctx.createImageData(w,h);let seed=225;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};const rows=9,tones=Array.from({length:rows},()=>Array.from({length:3},()=>random()*14-7));
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const row=Math.floor(y/h*rows),fy=y/h*rows-row,offset=(row%3)/3,fx=(x/w+offset)%1,board=Math.floor(fx*2),lx=fx*2-board;const warp=fy*24+Math.sin(x*.008+row*2)*1.7+Math.sin(x*.021+row)*.35;const grain=Math.sin(warp*5)*6.6+Math.sin(warp*13+x*.003)*2.3;const knot=Math.sin(Math.sqrt(((lx-.47)*1.8)**2+((fy-.5)*1.3)**2)*30)*Math.exp(-(((lx-.47)*1.8)**2))*2.5;let v=139+tones[row][board]+grain+knot+(random()-.5)*3;if(fy<.012||lx<.0018)v-=43;else if(fy<.023||lx<.004)v+=13;const i=(y*w+x)*4;pixels.data[i]=v+3;pixels.data[i+1]=v+2;pixels.data[i+2]=v;pixels.data[i+3]=255;}
 ctx.putImageData(pixels,0,0);const map=new THREE.CanvasTexture(c);map.name='Reusable silver gray oak staggered plank texture';map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.anisotropy=8;const bump=map.clone();bump.colorSpace=THREE.NoColorSpace;bump.needsUpdate=true;material=new THREE.MeshPhysicalMaterial({name:'Silver gray oak plank floor',map,bumpMap:bump,bumpScale:.004,roughness:.33,clearcoat:.32,clearcoatRoughness:.28});return material;
}
// Align the top UVs in local house coordinates across every landing/slab.
export function applyGrayWoodFloor(mesh){const geometry=mesh.geometry,uv=geometry.attributes.uv,p=geometry.attributes.position,n=geometry.attributes.normal;for(let i=0;i<p.count;i++)if(n.getY(i)>.5)uv.setXY(i,(p.getX(i)+mesh.position.x)/3.6,(p.getZ(i)+mesh.position.z)/1.98);uv.needsUpdate=true;const base=mesh.material;mesh.material=[base,base,getGrayWoodFloorMaterial(),base,base,base];return mesh;}
