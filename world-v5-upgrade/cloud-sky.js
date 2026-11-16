import * as THREE from 'three';
// Layered volumetric-looking cloud banks using procedural alpha sprites.
// Each cloud is made from many transparent planes distributed in 3D space.
export function createCloudSky(scene,{count=34,seed=1729}={}){
 let state=seed;const random=()=>((state=(1664525*state+1013904223)>>>0)/4294967296);
 const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;
 const ctx=canvas.getContext('2d');
 const img=ctx.createImageData(256,256);
 for(let y=0;y<256;y++)for(let x=0;x<256;x++){
  const dx=(x-128)/128,dy=(y-128)/128,r=Math.sqrt(dx*dx+dy*dy);
  const turbulence=.12*Math.sin(x*.11+y*.045)*Math.cos(y*.08-x*.06)+.08*Math.sin(x*.21-y*.19);
  const alpha=Math.max(0,Math.min(1,(.91-r+turbulence)*3));
  const i=(y*256+x)*4;img.data[i]=255;img.data[i+1]=255;img.data[i+2]=255;img.data[i+3]=Math.round(alpha*205);
 }
 ctx.putImageData(img,0,0);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const material=new THREE.SpriteMaterial({map:texture,transparent:true,depthWrite:false,opacity:.5,fog:false});
 const root=new THREE.Group();root.name='3D cloud formations';scene.add(root);
 const clouds=[];
 for(let i=0;i<count;i++){
  const angle=random()*Math.PI*2,rad=210+random()*350;
  const x=Math.cos(angle)*rad,z=Math.sin(angle)*rad,y=92+random()*55;
  const cluster=new THREE.Group();cluster.position.set(x,y,z);root.add(cluster);
  const parts=9+Math.floor(random()*12);
  for(let j=0;j<parts;j++){
   const p=new THREE.Sprite(material.clone());
   const w=45+random()*65,h=17+random()*26;
   p.scale.set(w,h,1);
   p.position.set((random()-.5)*115,(random()-.5)*23,(random()-.5)*75);
   p.material.opacity=.27+random()*.22;
   cluster.add(p);
  }
  clouds.push({cluster,speed:.2+random()*.3});
 }
 function update(dt){for(const c of clouds){c.cluster.position.x+=c.speed*dt;if(c.cluster.position.x>650)c.cluster.position.x=-650;}}
 return {root,update,dispose(){scene.remove(root);root.traverse(o=>{if(o.isSprite)o.material.dispose()});texture.dispose()}};
}
