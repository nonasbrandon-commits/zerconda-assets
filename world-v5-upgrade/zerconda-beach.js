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
 oceanMap.repeat.set(13,10);oceanMap.anisotropy=8;
 const water=new THREE.MeshPhysicalMaterial({color:0xb4ffff,map:oceanMap,metalness:.03,roughness:.22,transparent:true,opacity:.96,clearcoat:1,clearcoatRoughness:.12,side:THREE.DoubleSide});
// Optional repository image asset; canvas remains the safe fallback if unavailable.
 new THREE.TextureLoader().load(base+'realistic-assets/beach/turquoise-ocean-surface.svg',texture=>{
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(13,10);texture.anisotropy=8;
  water.map=texture;water.needsUpdate=true;
 },undefined,()=>console.warn('Beach ocean image unavailable; using procedural texture'));
 const foam=new THREE.MeshBasicMaterial({color:0xe6f9f8,transparent:true,opacity:.42,depthWrite:false,side:THREE.DoubleSide});
 const fabric=[0xf5f2e8,0x237aaf,0xe79a60,0xe7d2a2].map(color=>new THREE.MeshStandardMaterial({color,roughness:.82,side:THREE.DoubleSide}));
 function mesh(geo,mat,x,y,z){const o=new THREE.Mesh(geo,mat);o.position.set(x,y,z);o.receiveShadow=true;root.add(o);return o;}
 const land=mesh(new THREE.PlaneGeometry(330,82),sand,0,.08,202);land.rotation.x=-Math.PI/2;
 // Road connection across the former boundary to the promenade.
 const asphalt=new THREE.MeshStandardMaterial({color:0x45474a,roughness:.96});
 const access=mesh(new THREE.PlaneGeometry(19,38),asphalt,0,.14,171);access.rotation.x=-Math.PI/2;
 const boardwalk=mesh(new THREE.PlaneGeometry(320,10),wood,0,.17,186);boardwalk.rotation.x=-Math.PI/2;
 for(let x=-158;x<159;x+=2.1){const plank=mesh(new THREE.BoxGeometry(1.98,.05,9.5),wood,x,.19,186);}
 // Ocean begins past the beach and extends toward the far horizon.
 const ocean=mesh(new THREE.PlaneGeometry(1100,850,60,50),water,0,-.1,660);ocean.rotation.x=-Math.PI/2;
 const pos=ocean.geometry.attributes.position;const original=new Float32Array(pos.array);
 // Thin moving wavefronts at the shoreline, not white opaque slabs.
 const shore=[];
 for(let j=0;j<10;j++){const line=mesh(new THREE.PlaneGeometry(330,.12+j*.12),foam,0,.18,241+j*1.35);line.rotation.x=-Math.PI/2;shore.push(line);}
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
 // Palm clusters with segmented trunks and layered curved fronds.
 const trunk=new THREE.MeshStandardMaterial({color:0x7d6245,roughness:1});
 const frond=new THREE.MeshStandardMaterial({color:0x356d3c,roughness:.85,side:THREE.DoubleSide});
 for(let i=0;i<30;i++){
  const x=-154+(i*61)%308,z=191+(i*23)%24;if(Math.abs(x)<10&&z<201)continue;
  const height=5+(i%5)*.6;
  const stem=mesh(new THREE.CylinderGeometry(.19,.36,height,9),trunk,x,height/2,z);stem.rotation.z=(i%3-1)*.08;
  for(let k=0;k<9;k++){const a=k*Math.PI*2/9;const leaf=mesh(new THREE.ConeGeometry(.52,4.7,4),frond,x+Math.sin(a)*1.6,height-.35,z+Math.cos(a)*1.6);leaf.rotation.z=Math.sin(a)*1.15;leaf.rotation.x=Math.cos(a)*1.15;}
 }
 let elapsed=0;
 return {root,update(dt){elapsed+=dt;const arr=pos.array;for(let i=0;i<pos.count;i++){const xx=original[i*3],yy=original[i*3+1];arr[i*3+2]=Math.sin(xx*.045+elapsed*1.2)*.13+Math.sin(yy*.08+elapsed*1.7)*.08;}pos.needsUpdate=true;ocean.geometry.computeVertexNormals();if(water.map){water.map.offset.x=(elapsed*.003)%1;water.map.offset.y=(elapsed*.005)%1;}shore.forEach((s,i)=>{s.position.z=241+i*1.35+Math.sin(elapsed*.9+i*.7)*1.5;s.material.opacity=.32;});},bounds:{minX:-165,maxX:165,minZ:168,maxZ:248},center:{x:0,z:212}};
}
