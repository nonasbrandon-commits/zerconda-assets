import * as THREE from 'three';
let cache;
export function createCityviewFacadeMaterials(){
 if(cache)return cache;
 const c=document.createElement('canvas');c.width=c.height=1024;const a=c.getContext('2d');a.fillStyle='#26282a';a.fillRect(0,0,1024,1024);
 let seed=714;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const image=a.getImageData(0,0,1024,1024);for(let i=0;i<image.data.length;i+=4){const n=(rand()-.5)*13;image.data[i]+=n;image.data[i+1]+=n;image.data[i+2]+=n;}a.putImageData(image,0,0);
 for(let i=0;i<35;i++){let x=rand()*1024,y=rand()*1024;const points=[[x,y]];for(let j=0;j<30;j++){x+=18+rand()*29;y+=9+rand()*28-10;points.push([x,y]);}for(const [width,alpha]of[[5,.025],[1.3,.28],[.5,.40]]){a.beginPath();a.moveTo(...points[0]);for(const p of points.slice(1))a.lineTo(...p);a.strokeStyle=`rgba(231,231,223,${alpha})`;a.lineWidth=width;a.stroke();}}
 const marble=new THREE.CanvasTexture(c);marble.colorSpace=THREE.SRGBColorSpace;marble.wrapS=marble.wrapT=THREE.RepeatWrapping;marble.anisotropy=8;
 const skyFaces=Array.from({length:6},(_,i)=>{const c=document.createElement('canvas');c.width=c.height=256;const a=c.getContext('2d');const g=a.createLinearGradient(0,0,0,256);g.addColorStop(0,i===3?'#35433c':'#91a5b4');g.addColorStop(.48,'#d3dbdc');g.addColorStop(.53,'#7a8b81');g.addColorStop(1,'#35433c');a.fillStyle=g;a.fillRect(0,0,256,256);if(i!==2&&i!==3){a.fillStyle='#4c5b60';for(let k=0;k<9;k++){const h=13+(k*37)%65;a.fillRect(k*31,142-h,22,h);}}return c;});const env=new THREE.CubeTexture(skyFaces);env.colorSpace=THREE.SRGBColorSpace;env.needsUpdate=true;
 const glowCanvas=document.createElement('canvas');glowCanvas.width=glowCanvas.height=128;const ga=glowCanvas.getContext('2d'),gradient=ga.createRadialGradient(64,64,3,64,64,64);gradient.addColorStop(0,'rgba(255,192,93,.42)');gradient.addColorStop(.3,'rgba(255,166,55,.18)');gradient.addColorStop(1,'rgba(255,155,40,0)');ga.fillStyle=gradient;ga.fillRect(0,0,128,128);const glowMap=new THREE.CanvasTexture(glowCanvas);glowMap.colorSpace=THREE.SRGBColorSpace;
 cache={
  glow:new THREE.MeshBasicMaterial({map:glowMap,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}),
  panel:new THREE.MeshStandardMaterial({color:'#72777b',roughness:.33,metalness:.65,envMap:env,envMapIntensity:.45}),
  dark:new THREE.MeshStandardMaterial({color:'#171e23',roughness:.28,metalness:.65,envMap:env,envMapIntensity:.4}),
  marble:new THREE.MeshPhysicalMaterial({map:marble,roughness:.24,metalness:.1,clearcoat:.5,envMap:env,envMapIntensity:.25}),
  core:new THREE.MeshStandardMaterial({color:'#343a3e',roughness:.66,metalness:.15}),
  trim:new THREE.MeshStandardMaterial({color:'#aeb5b9',roughness:.24,metalness:.85,envMap:env}),
  glass:new THREE.MeshPhysicalMaterial({color:'#49616d',roughness:.08,metalness:.55,envMap:env,envMapIntensity:1.0,transparent:true,opacity:.83,depthWrite:false}),
  railing:new THREE.MeshPhysicalMaterial({color:'#475f6b',roughness:.09,metalness:.35,envMap:env,envMapIntensity:.85,transparent:true,opacity:.63,depthWrite:false,side:THREE.DoubleSide}),
  soffit:new THREE.MeshStandardMaterial({color:'#644b37',roughness:.48,metalness:.12}),
  led:new THREE.MeshStandardMaterial({color:'#ffe4aa',emissive:'#ffb94f',emissiveIntensity:1.6,roughness:.3}),
  lamp:new THREE.MeshStandardMaterial({color:'#fff0d5',emissive:'#ffcd81',emissiveIntensity:2.0})
 };return cache;
}
