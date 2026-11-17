import * as THREE from 'three';
// Original Zerconda procedural 3D foliage. Each leaf is a real double-sided mesh.
// No spherical topiary or borrowed brand assets.
export function createNaturalShrub({width=1.7,height=1.35,seed=1}={}){
 const root=new THREE.Group();root.name='Zerconda detailed leafy shrub';
 let n=seed>>>0;const rand=()=>((n=(Math.imul(n,1664525)+1013904223)>>>0)/4294967296);
 const bark=new THREE.MeshStandardMaterial({color:0x584b34,roughness:1});
 const greens=[0x365e31,0x49783a,0x648944,0x779747,0x426f35].map(color=>new THREE.MeshStandardMaterial({color,roughness:.88,side:THREE.DoubleSide}));
 const twig=new THREE.CylinderGeometry(.012,.033,1,5);
 const leafGeo=new THREE.BufferGeometry();
 const positions=[],normals=[],colors=[];
 const color=new THREE.Color();
 // 18 branched stems and approximately 450 individually shaded leaves.
 for(let b=0;b<18;b++){
  const a=rand()*Math.PI*2,spread=.18+rand()*.3;
  const h=height*(.52+rand()*.48);
  const tipX=Math.cos(a)*width*spread,tipZ=Math.sin(a)*width*spread;
  const branch=new THREE.Mesh(twig,bark);
  branch.position.set(tipX*.5,h*.5,tipZ*.5);
  branch.scale.set(.7,h, .7);
  branch.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(tipX,h,tipZ).normalize());
  root.add(branch);
  for(let j=0;j<25;j++){
   const t=.32+rand()*.7;
   const az=rand()*Math.PI*2,rr=.06+rand()*.31*width;
   const x=tipX*t+Math.cos(az)*rr,y=h*t+(rand()-.5)*.17,z=tipZ*t+Math.sin(az)*rr;
   const length=.095+rand()*.11,half=length*.33;
   const theta=rand()*Math.PI*2;
   const u=new THREE.Vector3(Math.cos(theta), (rand()-.5)*.6,Math.sin(theta)).normalize();
   const v=new THREE.Vector3(-u.z,.4,u.x).normalize();
   const p=new THREE.Vector3(x,y,z),a0=p.clone().addScaledVector(u,-length),a1=p.clone().addScaledVector(v,half),a2=p.clone().addScaledVector(u,length),a3=p.clone().addScaledVector(v,-half);
   const c=greens[Math.floor(rand()*greens.length)].color;
   const shade=.75+rand()*.5;color.copy(c).multiplyScalar(shade);
   for(const tri of [[a0,a1,a2],[a0,a2,a3]]){
    for(const pt of tri){positions.push(pt.x,pt.y,pt.z);normals.push(0,1,0);colors.push(color.r,color.g,color.b);}
   }
  }
 }
 leafGeo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
 leafGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));
 leafGeo.computeVertexNormals();
 const leaves=new THREE.Mesh(leafGeo,new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:.92}));
 leaves.receiveShadow=true;root.add(leaves);
 return root;
}
