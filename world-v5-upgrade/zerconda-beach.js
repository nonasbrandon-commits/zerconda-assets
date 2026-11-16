import {addRealisticBeachPalms} from './realistic-beach-palms.js';
import * as THREE from 'three';
// Zerconda South Beach, reachable on foot from the southern city edge at z=168.
// Tiled sand PBR, animated layered water, foam, dunes, boardwalk, umbrellas and palms.
export function createZercondaBeach(scene,{base='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/'}={}){
 const root=new THREE.Group();root.name='Zerconda South Beach';scene.add(root);
 // Original grain-scale sand texture; avoids using green grass photography as sand.
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;
 const ctx=canvas.getContext('2d');const image=ctx.createImageData(512,512);
 let seed=18357;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 for(let y=0;y<512;y++)for(let x=0;x<512;x++){const i=(y*512+x)*4,noise=(random()-.5)*47,ripple=Math.sin(y*.085+Math.sin(x*.024)*1.5)*7;image.data[i]=Math.max(0,Math.min(255,218+noise+ripple));image.data[i+1]=Math.max(0,Math.min(255,194+noise+ripple));image.data[i+2]=Math.max(0,Math.min(255,151+noise+ripple));image.data[i+3]=255;}
 ctx.putImageData(image,0,0);
 const sandMap=new THREE.CanvasTexture(canvas);sandMap.colorSpace=THREE.SRGBColorSpace;sandMap.wrapS=sandMap.wrapT=THREE.RepeatWrapping;sandMap.repeat.set(18,8);sandMap.anisotropy=8;
 const sand=new THREE.MeshStandardMaterial({color:0xe5ceaa,roughness:1,map:sandMap});
 const wood=new THREE.MeshStandardMaterial({color:0x927055,roughness:.87});
 // Turquoise ocean surface with independently tiled wave highlights. No opaque blocks.
 const oceanCanvas=document.createElement('canvas');oceanCanvas.width=512;oceanCanvas.height=512;
 const oc=oceanCanvas.getContext('2d');
 const grad=oc.createLinearGradient(0,0,512,512);
 grad.addColorStop(0,'#078c9c');grad.addColorStop(.5,'#20b4b5');grad.addColorStop(1,'#067a92');
 oc.fillStyle=grad;oc.fillRect(0,0,512,512);
 for(let i=0;i<360;i++){
  const xx=random()*512,yy=random()*512;
  oc.beginPath();oc.ellipse(xx,yy,4+random()*22,.4+random()*1.5,random()*.3,0,Math.PI*2);
  oc.strokeStyle='rgba(207,255,248,'+(.035+random()*.18)+')';oc.lineWidth=.5+random()*1.5;oc.stroke();
 }
 const oceanMap=new THREE.CanvasTexture(oceanCanvas);
 oceanMap.colorSpace=THREE.SRGBColorSpace;
 oceanMap.wrapS=oceanMap.wrapT=THREE.RepeatWrapping;
 oceanMap.repeat.set(24,17);oceanMap.anisotropy=8;
 const water=new THREE.MeshPhysicalMaterial({color:0x9bdde2,map:oceanMap,metalness:.08,roughness:.13,transparent:false,clearcoat:1,clearcoatRoughness:.07,side:THREE.DoubleSide});
// Optional repository image asset; canvas remains the safe fallback if unavailable.
 new THREE.TextureLoader().load(base+'realistic-assets/beach/turquoise-ocean-surface.svg',texture=>{
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(24,17);texture.anisotropy=8;
  water.map=texture;water.needsUpdate=true;
 },undefined,()=>console.warn('Beach ocean image unavailable; using procedural texture'));
 const foam=new THREE.MeshBasicMaterial({color:0xe6f9f8,transparent:true,opacity:.42,depthWrite:false,side:THREE.DoubleSide});
 const fabric=[0xf5f2e8,0x237aaf,0xe79a60,0xe7d2a2].map(color=>new THREE.MeshStandardMaterial({color,roughness:.82,side:THREE.DoubleSide}));
 function mesh(geo,mat,x,y,z){const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.receiveShadow=true;root.add(o);return o;}
 const land=mesh(new THREE.PlaneGeometry(520,91),sand,0,.085,199.5);land.rotation.x=-Math.PI/2;
 // Road connection across the former boundary to the promenade.
 const asphalt=new THREE.MeshStandardMaterial({color:0x45474a,roughness:.96});
 const access=mesh(new THREE.PlaneGeometry(19,38),asphalt,0,.14,171);access.rotation.x=-Math.PI/2;
 const boardwalk=mesh(new THREE.PlaneGeometry(320,10),wood,0,.17,186);boardwalk.rotation.x=-Math.PI/2;
 for(let x=-158;x<159;x+=2.1){const plank=mesh(new THREE.BoxGeometry(1.98,.05,9.5),wood,x,.19,186);}
 // Ocean begins past the beach and extends toward the far horizon.
 const ocean=mesh(new THREE.PlaneGeometry(2200,2200,100,100),water,0,-.09,1340);ocean.rotation.x=-Math.PI/2;
 const pos=ocean.geometry.attributes.position;const original=new Float32Array(pos.array);
 // Thin moving wavefronts at the shoreline, not white opaque slabs.
 const shore=[];
 // Separate translucent surf materials for natural independent fading.
 for(let j=0;j<10;j++){
  const line=mesh(new THREE.PlaneGeometry(330,.10+j*.09),foam.clone(),0,.18,241+j*1.35);
  line.rotation.x=-Math.PI/2;shore.push(line);
 }
 const washMat=new THREE.MeshBasicMaterial({color:0xcaf5ee,transparent:true,opacity:.12,depthWrite:false,side:THREE.DoubleSide});
 const wash=mesh(new THREE.PlaneGeometry(330,4.5),washMat,0,.115,242);
 wash.rotation.x=-Math.PI/2;
 // Sand ripples and dune clusters.
 const duneMat=new THREE.MeshStandardMaterial({color:0xd7bb88,roughness:1});
 for(let i=0;i<90;i++){const x=((i*73)%317)-158,z=192+((i*31)%39);if(Math.abs(x)<12&&z<202)continue;const o=mesh(new THREE.SphereGeometry(1,10,6),duneMat,x,.1,z);o.scale.set(1.3+(i%4),.1+(i%3)*.04,.6+(i%5)*.3);}
 // Lounge chairs with real-scale wooden frames and stretched canvas.
 for(let i=0;i<34;i++){
  const x=-145+(i%17)*18,z=207+Math.floor(i/17)*17;
  const a=(i%3-1)*.22;
  const chair=new THREE.Group();chair.position.set(x,.2,z);chair.rotation.y=a;root.add(chair);
  const leg=new THREE.MeshStandardMaterial({color:0x8c745e,roughness:.8});
  function beam(w,h,d,px,py,pz,material){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);o.position.set(px,py,pz);chair.add(o);return o;}
  beam(.85,.09,1.8,0,.24,0,leg);beam(.78,.055,1.65,0,.31,0,fabric[i%4]);
  const back=beam(.79,.06,.88,0,.64,-.65,fabric[i%4]);back.rotation.x=-.68;
  for(const side of [-.36,.36])for(const zz of [-.62,.62])beam(.075,.32,.075,side,.12,zz,leg);
  // Fabric beach umbrella, conical canopy and central pole.
  const pole=mesh(new THREE.CylinderGeometry(.045,.055,2.7,10),leg,x+2,1.45,z);
  const canopy=mesh(new THREE.ConeGeometry(1.65,.68,12),fabric[(i+1)%4],x+2,2.9,z);
 }
 // Detailed coconut palms with individual curved fronds, no low-poly cone foliage.
 addRealisticBeachPalms(root,{count:30});
 let elapsed=0;
 return {root,update(dt){elapsed+=dt;const arr=pos.array;for(let i=0;i<pos.count;i++){const xx=original[i*3],yy=original[i*3+1];arr[i*3+2]=Math.sin(xx*.038+yy*.013+elapsed*1.3)*.21+Math.sin(yy*.095-xx*.022+elapsed*2.1)*.10+Math.sin(xx*.17+yy*.11-elapsed*2.7)*.035;}pos.needsUpdate=true;ocean.geometry.computeVertexNormals();if(water.map){water.map.offset.x=(elapsed*.003)%1;water.map.offset.y=(elapsed*.005)%1;}wash.position.z=242+Math.sin(elapsed*.7)*2;wash.material.opacity=.08+.06*(.5+.5*Math.sin(elapsed*.7));shore.forEach((s,i)=>{s.position.z=241+i*1.35+Math.sin(elapsed*.9+i*.7)*1.5;s.material.opacity=.14+.18*(.5+.5*Math.sin(elapsed*.9+i*.7));});},bounds:{minX:-165,maxX:165,minZ:168,maxZ:248},center:{x:0,z:212}};
}
