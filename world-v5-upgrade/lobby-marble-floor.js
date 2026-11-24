import * as THREE from 'three';
let material;
// A seamless stone atlas with four 1.6 m square tiles on each side.
export function createLobbyMarbleFloor(){
 if(material)return material;
 const N=1024,c=document.createElement('canvas');c.width=c.height=N;
 const a=c.getContext('2d'),im=a.createImageData(N,N),pixels=im.data;
 const hash=(x,y)=>{const n=Math.sin(x*127.1+y*311.7+31.83)*43758.5453;return n-Math.floor(n)};
 const noise=(x,y)=>{const ix=Math.floor(x),iy=Math.floor(y);let u=x-ix,v=y-iy;u=u*u*(3-2*u);v=v*v*(3-2*v);return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(ix,iy),hash(ix+1,iy),u),THREE.MathUtils.lerp(hash(ix,iy+1),hash(ix+1,iy+1),u),v)};
 const fbm=(x,y)=>noise(x,y)*.57+noise(x*2,y*2)*.27+noise(x*4,y*4)*.11+noise(x*8,y*8)*.05;
 const smooth=(a,b,x)=>{const t=THREE.MathUtils.clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
 for(let y=0;y<N;y++)for(let x=0;x<N;x++){
  const u=x/N*8,v=y/N*8,warp=fbm(u*.8+7,v*.8+3),detail=fbm(u*5,v*5);
  const contour=Math.abs(Math.sin((u*.75+v*.47+warp*.68+detail*.10)*Math.PI*2));
  const vein=(1-smooth(.004,.034,contour))*(.35+noise(u*9,v*9)*.65);
  const branch=1-smooth(.007,.025,Math.abs(noise(u*3+warp*3,v*3)-.51));
  const base=65+fbm(u*2,v*2)*29+noise(u*24,v*24)*9;
  let value=base+vein*95+branch*25+noise(u*90,v*90)*6;
  const gx=x%(N/4),gy=y%(N/4),edge=Math.min(gx,gy,N/4-gx,N/4-gy);
  if(edge<1.1)value=155;
  const i=(y*N+x)*4;pixels[i]=value*1.025;pixels[i+1]=value;pixels[i+2]=value*.985;pixels[i+3]=255;
 }
 a.putImageData(im,0,0);const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(28/6.4,20/6.4);map.anisotropy=8;
 material=new THREE.MeshPhysicalMaterial({map,roughness:.20,metalness:.08,clearcoat:.65,clearcoatRoughness:.16});material.name='Polished charcoal marble square lobby tiles';return material;
}
