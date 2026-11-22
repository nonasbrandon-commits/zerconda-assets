import * as THREE from 'three';
// Layered cumulus cloud fields: soft sunlit tops, shaded bases and billowing lobes.
// Rendered as camera-facing transparent volumetric impostors in the ACTUAL 3D WORLD.
export function createCloudSky(scene,{count=48,seed=1729}={}){
 let state=seed;const rnd=()=>((state=(1664525*state+1013904223)>>>0)/4294967296);
 const size=256,canvas=document.createElement('canvas');canvas.width=canvas.height=size;
 const ctx=canvas.getContext('2d'),im=ctx.createImageData(size,size);
 const noise=(x,y)=>{const v=Math.sin(x*127.1+y*311.7)*43758.5453;return v-Math.floor(v)};
 const smooth=(a,b,t)=>a+(b-a)*t;
 const valueNoise=(x,y)=>{let ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);return smooth(smooth(noise(ix,iy),noise(ix+1,iy),fx),smooth(noise(ix,iy+1),noise(ix+1,iy+1),fx),fy)};
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const u=(x-size/2)/(size/2),v=(y-size/2)/(size/2);
  const n=valueNoise(x*.038,y*.038)*.32+valueNoise(x*.095,y*.095)*.15+valueNoise(x*.19,y*.19)*.07;
  const radial=Math.sqrt(u*u*.9+v*v*1.22);
  const density=Math.max(0,Math.min(1,(1.01-radial+n-.23)*3.7));
  const shade=Math.max(0,Math.min(1,.83-v*.15+n*.18));
  const i=(y*size+x)*4;
  im.data[i]=Math.round(242*shade+13);im.data[i+1]=Math.round(247*shade+8);im.data[i+2]=Math.round(255*shade);
  im.data[i+3]=Math.round(density*235);
 }
 ctx.putImageData(im,0,0);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.LinearFilter;
 const material=new THREE.SpriteMaterial({map:texture,transparent:true,depthWrite:false,depthTest:true,opacity:.8,fog:false,toneMapped:false});
 const root=new THREE.Group();root.name='Zerconda world cumulus cloud system';scene.add(root);
 const clouds=[];
 for(let i=0;i<count;i++){
  const angle=rnd()*Math.PI*2,rad=155+rnd()*390;
  const cluster=new THREE.Group();cluster.position.set(-645+i/Math.max(1,count-1)*1290,180+rnd()*95,(rnd()-.5)*1100);const cloudMaterial=material.clone();
  root.add(cluster);
  const parts=9+Math.floor(rnd()*15),span=40+rnd()*95;
  for(let j=0;j<parts;j++){
   const p=new THREE.Sprite(cloudMaterial);
   const w=32+rnd()*47,h=24+rnd()*38;
   p.scale.set(w,h,1);
   p.position.set((rnd()-.5)*span,(rnd()-.5)*27,(rnd()-.5)*span*.55);
   p.userData.billowing={position:p.position.clone(),scale:p.scale.clone(),phase:rnd()*Math.PI*2,rate:.07+rnd()*.07};
   cluster.add(p);
  }
  clouds.push({cluster,material:cloudMaterial,speed:3.2+rnd()*1.8,generation:0,age:rnd()*60});
 }
 // Pale blue atmosphere, deeper overhead, lighter at the horizon.
 const skyCanvas=document.createElement('canvas');skyCanvas.width=8;skyCanvas.height=512;
 const sc=skyCanvas.getContext('2d'),gradient=sc.createLinearGradient(0,0,0,512);
 gradient.addColorStop(0,'#23568f');gradient.addColorStop(.48,'#438bcb');gradient.addColorStop(.83,'#8dd3f4');gradient.addColorStop(1,'#c6e6f4');
 sc.fillStyle=gradient;sc.fillRect(0,0,8,512);
 const skyTexture=new THREE.CanvasTexture(skyCanvas);skyTexture.colorSpace=THREE.SRGBColorSpace;
 const dome=new THREE.Mesh(new THREE.SphereGeometry(550,32,20),new THREE.MeshBasicMaterial({map:skyTexture,side:THREE.BackSide,depthWrite:false,fog:false,toneMapped:false}));
 dome.name='Sky atmosphere dome';scene.add(dome);
 function update(dt,anchor=null){dt=Math.max(0,Math.min(Number(dt)||0,.25));if(anchor){root.position.set(anchor.x,0,anchor.z);dome.position.set(anchor.x,0,anchor.z);}for(const c of clouds){c.age+=dt;c.cluster.position.x+=c.speed*dt;c.cluster.position.z+=c.speed*.18*dt;if(c.cluster.position.x>650){c.cluster.position.set(-650,180+rnd()*95,(rnd()-.5)*1100);c.speed=3.2+rnd()*1.8;c.generation++;const span=45+rnd()*85;for(const p of c.cluster.children){p.position.set((rnd()-.5)*span,(rnd()-.5)*27,(rnd()-.5)*span*.55);p.scale.set(32+rnd()*47,24+rnd()*38,1);p.userData.billowing.position.copy(p.position);p.userData.billowing.scale.copy(p.scale);}}for(const p of c.cluster.children){const b=p.userData.billowing,t=c.age*b.rate+b.phase;p.position.set(b.position.x+Math.sin(t)*5,b.position.y+Math.sin(t*.83+1)*3,b.position.z+Math.cos(t*.67)*3);p.scale.set(b.scale.x*(1+Math.sin(t*.71)*.14),b.scale.y*(1+Math.cos(t*.91)*.16),1);}const fade=Math.min(1,Math.max(0,(650-Math.abs(c.cluster.position.x))/100));c.material.opacity=.8*fade;}}

 return {root,dome,clouds,update,dispose(){scene.remove(root,dome);for(const c of clouds)c.material.dispose();material.dispose();texture.dispose();dome.geometry.dispose();dome.material.dispose();skyTexture.dispose()}};
}
