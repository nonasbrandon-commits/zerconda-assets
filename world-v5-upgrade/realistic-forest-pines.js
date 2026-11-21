import {installTreeBreeze} from './tree-breeze.js?v=20261121-forest-airfield-v193';
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
// Original volumetric pine geometry, normalized to the existing forest transforms.
// Existing positions, height, rotation, collision radii and road exclusions stay intact.
let pine,lowPine;
function createPine(low=false){
 let seed=71935;const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 const barkCanvas=document.createElement('canvas');barkCanvas.width=512;barkCanvas.height=1024;const b=barkCanvas.getContext('2d');b.fillStyle='#584638';b.fillRect(0,0,512,1024);
 for(let i=0;i<1800;i++){const x=rnd()*512,y=rnd()*1024,w=2+rnd()*13,h=10+rnd()*90;b.fillStyle=['#322c24','#78624a','#9c8362','#463a2d','#6a5741'][i%5];b.beginPath();b.moveTo(x,y);b.lineTo(x+w,y+4);b.lineTo(x+w*.8,y+h);b.lineTo(x-2,y+h*.7);b.closePath();b.fill();b.strokeStyle='#29291f';b.lineWidth=.8;b.stroke();b.fillStyle='#c1a68150';b.fillRect(x+1,y+3,1,h*.6);}
 for(let i=0;i<17000;i++){b.fillStyle=i%2?'#dcc8a91c':'#0c160d25';b.fillRect(rnd()*512,rnd()*1024,1+rnd()*2,1+rnd()*4);}
 const bark=new THREE.CanvasTexture(barkCanvas);bark.colorSpace=THREE.SRGBColorSpace;bark.wrapS=bark.wrapT=THREE.RepeatWrapping;bark.repeat.set(2,5);bark.anisotropy=8;
 const wood=new THREE.MeshStandardMaterial({map:bark,bumpMap:bark,bumpScale:.045,roughness:1,color:0xffffff});
 // A dense needle shoot, with hundreds of individual shaded needles and no opaque backing.
 const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const c=canvas.getContext('2d');
 const stroke=(x,y,ex,ey,color,width)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(ex,ey);c.stroke();};
 for(let twig=0;twig<13;twig++){const angle=-Math.PI/2+(twig-6)*.15,len=150+rnd()*80,ex=256+Math.cos(angle)*len,ey=465+Math.sin(angle)*len;stroke(256,465,ex,ey,'#61583a',3);
 for(let j=0;j<63;j++){const t=.16+j/75,x=256+(ex-256)*t,y=465+(ey-465)*t,a=angle+(rnd()-.5)*2.9,l=15+rnd()*38;stroke(x+1,y+2,x+Math.cos(a)*l,y+Math.sin(a)*l,'#142912',3);stroke(x,y,x+Math.cos(a)*l,y+Math.sin(a)*l,['#47602b','#647632','#849247','#344d24','#9aa65b'][Math.floor(rnd()*5)],1.3+rnd());}}
 const filled=document.createElement('canvas');filled.width=filled.height=512;filled.getContext('2d').drawImage(canvas,75,205,365,285,0,0,512,512);const needles=new THREE.CanvasTexture(filled);needles.colorSpace=THREE.SRGBColorSpace;needles.anisotropy=8;
 const leaves=new THREE.MeshStandardMaterial({map:needles,alphaTest:.35,side:THREE.DoubleSide,roughness:.93,color:0xffffff});
 const woodParts=[],pos=[],uv=[],ids=[],colors=[];const up=new THREE.Vector3(0,1,0),shade=new THREE.Color();
 function branch(a,end,r0,r1){const d=end.clone().sub(a),g=new THREE.CylinderGeometry(r1,r0,d.length(),5,1,true);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up,d.clone().normalize()));g.translate(...a.clone().add(end).multiplyScalar(.5).toArray());woodParts.push(g);}
 function tuft(p,length,width,angle,tilt,roll){
  const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(tilt,angle,roll,'YXZ')),base=pos.length/3;
  // Folded shoot cards face several directions, rather than stacked horizontal shelves.
  for(const [x,y,z,u,v] of [[-width,0,0,0,0],[width,0,0,1,0],[-width*.65,length*.55,.014,0,.55],[width*.65,length*.55,.014,1,.55],[-width*.14,length,0,0,1],[width*.14,length,0,1,1]]){const pt=new THREE.Vector3(x,y,z).applyQuaternion(q).add(p);pos.push(...pt.toArray());uv.push(u,v);const light=.78+rnd()*.28;shade.setRGB(light*.92,light,light*.83);colors.push(shade.r,shade.g,shade.b);}ids.push(base,base+1,base+2,base+1,base+3,base+2,base+2,base+3,base+4,base+3,base+5,base+4);
 }
 const rings=low?6:12;
 for(let level=0;level<rings;level++){const t=level/(rings-1),y=.24+t*.70,r=(.21*(1-t)**.48+.008)*(.86+rnd()*.14),count=low?3:(level>9?4:5);
 for(let j=0;j<count;j++){const angle=j*Math.PI*2/count+level*2.399+(rnd()-.5)*.4,cs=Math.cos(angle),sn=Math.sin(angle),reach=r*(.77+rnd()*.23),start=new THREE.Vector3(0,y,0),elbow=new THREE.Vector3(cs*reach*.5,y-.016,sn*reach*.5),tip=new THREE.Vector3(cs*reach,y+.012+rnd()*.025,sn*reach);branch(start,elbow,.0027*(1-t)+.0006,.0018*(1-t)+.0004);branch(elbow,tip,.0018*(1-t)+.0004,.00035);
 for(let k=0;k<(low?2:4);k++){const u=low?(.55+k*.35):.35+k*.20,side=k%2?1:-1,pp=elbow.clone().lerp(tip,Math.min(1,(u-.5)*2));pp.x+=-sn*side*reach*.14;pp.z+=cs*side*reach*.14;const length=(.062+(1-t)*.052)*(low?1.3:1);for(let face=0;face<2;face++)tuft(pp,length,length*.54,angle+face*Math.PI/2+(rnd()-.5)*.5,.3+rnd()*.8,side*(.2+rnd()*.7));}
 }}
 for(let j=0;j<4;j++)tuft(new THREE.Vector3(0,.95,0),.05,.014,j*Math.PI/2,.12,0);
 const crown=new THREE.BufferGeometry();crown.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));crown.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));crown.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));crown.setIndex(ids);crown.computeVertexNormals();leaves.vertexColors=true;
 const trunk=new THREE.LatheGeometry([new THREE.Vector2(.018,0),new THREE.Vector2(.013,.025),new THREE.Vector2(.011,.12),new THREE.Vector2(.009,.35),new THREE.Vector2(.005,.70),new THREE.Vector2(.001,.99)],10);woodParts.push(trunk);
 // Root flares stay inside the prior pine collision footprint.
 for(let j=0;j<6;j++){const a=j*Math.PI/3;branch(new THREE.Vector3(Math.cos(a)*.020,0,Math.sin(a)*.020),new THREE.Vector3(0,.045,0),.002,.006);}
 const timber=mergeGeometries(woodParts.map(g=>g.index?g.toNonIndexed():g));timber.translate(0,-.5,0);woodParts.forEach(g=>g.dispose());
 installTreeBreeze(leaves,{offset:0,strength:low?.005:.006});installTreeBreeze(wood,{offset:.5,strength:low?.005:.006});crown.computeBoundingSphere();timber.computeBoundingSphere();return{crown,timber,leaves,wood};
}
function detailChunks(source,high,low,material){
 const bins=new Map(),m=new THREE.Matrix4(),v=new THREE.Vector3();
 for(let i=0;i<source.count;i++){source.getMatrixAt(i,m);v.setFromMatrixPosition(m);const key=Math.floor(v.x/128)+','+Math.floor(v.z/128),list=bins.get(key)||[];list.push(i);bins.set(key,list);}
 for(const list of bins.values()){
  const center=new THREE.Vector3();for(const i of list){source.getMatrixAt(i,m);center.add(v.setFromMatrixPosition(m));}center.divideScalar(list.length);
  const lod=new THREE.LOD();lod.name=source.name+' · distance detail';lod.position.copy(center);
  for(const [geometry,distance]of [[high,0],[low,150]]){
   const mesh=new THREE.InstancedMesh(geometry,material,list.length);mesh.name=source.name+' · '+(distance?'distant':'near');mesh.receiveShadow=true;
   list.forEach((old,i)=>{source.getMatrixAt(old,m);m.elements[12]-=center.x;m.elements[13]-=center.y;m.elements[14]-=center.z;mesh.setMatrixAt(i,m);if(source.instanceColor){const color=new THREE.Color();source.getColorAt(old,color);mesh.setColorAt(i,color);}});
   mesh.computeBoundingSphere();mesh.userData.realisticPine=true;lod.addLevel(mesh,distance,.15);
  }
  source.add(lod);
 }
 source.userData.originalTreeCount=source.count;source.count=0;source.frustumCulled=false;
}
export function upgradePineMeshes(crowns,trunks){
 pine??=createPine();lowPine??=createPine(true);
 if(crowns){crowns.geometry=pine.crown;crowns.material=pine.leaves;crowns.userData.realisticPine=true;detailChunks(crowns,pine.crown,lowPine.crown,pine.leaves);}
 if(trunks){trunks.geometry=pine.timber;trunks.material=pine.wood;trunks.userData.realisticPine=true;detailChunks(trunks,pine.timber,lowPine.timber,pine.wood);}
}
