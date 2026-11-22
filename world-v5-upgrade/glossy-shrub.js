import * as THREE from 'three';
// Original Zerconda procedural 3D foliage. Each leaf is a real double-sided mesh.
// No spherical topiary or borrowed brand assets.
export function createNaturalShrub({width=1.7,height=1.35,seed=1}={}){
 const root=new THREE.Group();root.name='Glossy broadleaf multi-stem woodland shrub';
 let n=seed>>>0;const rand=()=>((n=(Math.imul(n,1664525)+1013904223)>>>0)/4294967296);
 const bark=new THREE.MeshStandardMaterial({color:0x584b34,roughness:1});
 const greens=[0x17471b,0x286324,0x4b8429,0x83aa32,0x326e20].map(color=>new THREE.MeshStandardMaterial({color,roughness:.88,side:THREE.DoubleSide}));
 const twig=new THREE.CylinderGeometry(.012,.033,1,5);
 const leafGeo=new THREE.BufferGeometry();
 const positions=[],normals=[],colors=[],uvs=[];
 const color=new THREE.Color();
 // 18 branched stems and approximately 450 individually shaded leaves.
 for(let b=0;b<16;b++){
  const a=rand()*Math.PI*2,spread=.18+rand()*.3;
  const h=height*(.52+rand()*.48);
  const tipX=Math.cos(a)*width*spread,tipZ=Math.sin(a)*width*spread;
  const branch=new THREE.Mesh(twig,bark);
  branch.position.set(tipX*.5,h*.5,tipZ*.5);
  branch.scale.set(.7,h, .7);
  branch.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(tipX,h,tipZ).normalize());
  root.add(branch);
  for(let j=0;j<22;j++){
   const t=.32+rand()*.7;
   const az=rand()*Math.PI*2,rr=.06+rand()*.31*width;
   const x=tipX*t+Math.cos(az)*rr,y=h*t+(rand()-.5)*.17,z=tipZ*t+Math.sin(az)*rr;
   const length=.12+rand()*.12,half=length*.39;
   const theta=rand()*Math.PI*2;
   const u=new THREE.Vector3(Math.cos(theta), (rand()-.35)*1.3,Math.sin(theta)).normalize();
   const v=new THREE.Vector3(-u.z,.4,u.x).normalize();
   const p=new THREE.Vector3(x,y,z),ridge=p.clone().addScaledVector(u,length*.10).add(new THREE.Vector3(0,length*.16,0));
   const coords=[[-1,0],[-.65,.62],[-.10,1],[.50,.68],[1,0],[.50,-.68],[-.10,-1],[-.65,-.62]];const ring=coords.map(([l,w])=>p.clone().addScaledVector(u,l*length).addScaledVector(v,w*half));
   const c=greens[Math.floor(rand()*greens.length)].color;const shade=.8+rand()*.35;
   for(let k=0;k<8;k++){const tri=[ridge,ring[k],ring[(k+1)%8]];for(let j=0;j<3;j++){const pt=tri[j];positions.push(pt.x,pt.y,pt.z);color.copy(c).multiplyScalar(shade*(j===0?1.22:1));colors.push(color.r,color.g,color.b);const uv=j===0?[.55,.5]:coords[(k+j-1)%8].map(q=>(q+1)/2);uvs.push(...uv);}}

  }
 }
 leafGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
 leafGeo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
 leafGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
 leafGeo.computeVertexNormals();
 const canvas=document.createElement('canvas');canvas.width=canvas.height=128;const ctx=canvas.getContext('2d'),gradient=ctx.createLinearGradient(0,0,0,128);gradient.addColorStop(0,'#779c54');gradient.addColorStop(.48,'#eef4cb');gradient.addColorStop(.55,'#9fb87a');gradient.addColorStop(1,'#385b2b');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);ctx.strokeStyle='#d4dfa2';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(0,64);ctx.lineTo(128,64);ctx.stroke();ctx.strokeStyle='#b1c783';ctx.lineWidth=.6;for(let x=14;x<115;x+=13)for(const side of[-1,1]){ctx.beginPath();ctx.moveTo(x,64);ctx.quadraticCurveTo(x+10,64+side*20,x+22,64+side*48);ctx.stroke();}const leafMap=new THREE.CanvasTexture(canvas);leafMap.colorSpace=THREE.SRGBColorSpace;
 const leaves=new THREE.Mesh(leafGeo,new THREE.MeshPhysicalMaterial({map:leafMap,vertexColors:true,side:THREE.DoubleSide,roughness:.35,clearcoat:.3,clearcoatRoughness:.3}));
 root.userData.glossyShrub={leaves:352,curvedLeaves:true,transparentCards:false};leaves.receiveShadow=true;root.add(leaves);
 return root;
}
