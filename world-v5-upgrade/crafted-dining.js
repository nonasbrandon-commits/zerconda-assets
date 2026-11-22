import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {getCraftedWoodMaterials} from './crafted-coffee-table.js?v=20261122-walnut-v221';
let fabric,piping;
function upholstery(){if(fabric)return;const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d'),p=ctx.createImageData(512,512);let seed=224;for(let i=0;i<512*512;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const v=105+(seed>>>27)*.5+(i%3===0?3:0);for(let j=0;j<3;j++)p.data[i*4+j]=v;p.data[i*4+3]=255;}ctx.putImageData(p,0,0);const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(2,2);map.anisotropy=8;fabric=new THREE.MeshStandardMaterial({map,bumpMap:map,bumpScale:.003,roughness:.94});piping=new THREE.MeshStandardMaterial({color:0xb5b5af,roughness:.85});}
export function createCraftedDiningSet(parent,{x=0,y=0,z=0,width=2.5,depth=1.5}={}){upholstery();const{walnut,edge}=getCraftedWoodMaterials(),root=new THREE.Group();root.name='Walnut paneled dining table and four upholstered chairs';root.position.set(x,y,z);parent.add(root);
 function box(g,w,h,d,x,y,z,m=walnut,r=0){const mesh=new THREE.Mesh(r?new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/3,h/3,d/3)):new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);g.add(mesh);return mesh;}
 function pillar(g,x,z,height=.71,scale=1){const w=.14*scale;box(g,w,height-.15,w,x,(height+.05)/2,z);box(g,.20*scale,.05,.20*scale,x,.025,z);box(g,.18*scale,.06,.18*scale,x,.08,z);box(g,.18*scale,.05,.18*scale,x,height-.025,z);for(const side of[-1,1]){box(g,w*.57,height-.27,.006,x,.39*height+.06,z+side*(w/2+.003),edge,.002);box(g,.006,height-.27,w*.57,x+side*(w/2+.003),.39*height+.06,z,edge,.002);}}
 for(const sx of[-1,1])for(const sz of[-1,1])pillar(root,sx*(width/2-.17),sz*(depth/2-.17));
 for(const side of[-1,1]){box(root,width-.26,.10,.07,0,.66,side*(depth/2-.14));box(root,.07,.10,depth-.26,side*(width/2-.14),.66,0);}
 box(root,width,.065,depth,0,.7475,0,walnut,.009);box(root,width+.012,.012,depth+.012,0,.786,0,edge,.003);box(root,width-.16,.018,depth-.16,0,.787,0);
 for(const side of[-1,1]){box(root,width,.020,.08,0,.790,side*(depth/2-.04),walnut,.004);box(root,.08,.020,depth-.16,side*(width/2-.04),.790,0,walnut,.004);}
 function seam(g,w,h,depth,material=piping){const points=[],r=.035;for(let i=0;i<64;i++){const a=i*Math.PI*2/64;points.push(new THREE.Vector3(Math.sign(Math.cos(a))*(w/2-r)+Math.cos(a)*r,Math.sign(Math.sin(a))*(h/2-r)+Math.sin(a)*r,depth));}g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points,true),64,.0025,4,true),material));}
 for(const px of[-.85,.85])for(const side of[-1,1]){const chair=new THREE.Group();chair.name='Gray upholstered walnut dining chair';chair.position.set(px,0,side*1.18);chair.rotation.y=side<0?0:Math.PI;root.add(chair);
 for(const sx of[-1,1])for(const sz of[-1,1]){const leg=new THREE.Group();leg.position.set(sx*.235,0,sz<0?-.29:.25);if(sz<0)leg.rotation.x=.12;chair.add(leg);pillar(leg,0,0,.36,.55);}
 box(chair,.61,.075,.65,0,.366,0,walnut,.012);box(chair,.625,.008,.665,0,.407,0,edge,.002);const seat=box(chair,.59,.13,.625,0,.463,0,fabric,.055);
 const back=new THREE.Group();back.position.set(0,.74,-.33);back.rotation.x=-.13;chair.add(back);box(back,.60,.66,.10,0,0,0,walnut,.025);const pad=box(back,.48,.54,.075,0,.005,.065,fabric,.035);seam(pad,.48,.54,.039);box(back,.48,.54,.018,0,.005,-.061,fabric,.025);box(back,.61,.065,.11,0,.33,0,walnut,.018);
 const roll=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.60,16),walnut);roll.rotation.z=Math.PI/2;roll.position.y=.365;back.add(roll);
 for(const sx of[-1,1]){const scroll=new THREE.Mesh(new THREE.TorusGeometry(.024,.008,6,16),walnut);scroll.rotation.y=Math.PI/2;scroll.position.set(sx*.30,.365,0);back.add(scroll);}
 }
 root.updateMatrixWorld(true);const inverse=root.matrixWorld.clone().invert(),groups=new Map(),meshes=[];root.traverse(o=>{if(!o.isMesh)return;const source=o.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse,o.matrixWorld)),geo=source.index?source.toNonIndexed():source;if(geo!==source)source.dispose();const list=groups.get(o.material)||[];list.push(geo);groups.set(o.material,list);meshes.push(o);});for(const o of meshes){o.removeFromParent();o.geometry.dispose();}for(const[m,list]of groups){const mesh=new THREE.Mesh(mergeGeometries(list),m);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);list.forEach(g=>g.dispose());}return root;}

let marble;
export function createCraftedCounter(parent,{x=0,y=0,z=0}={}){
 upholstery();const {walnut,edge}=getCraftedWoodMaterials();
 if(!marble){const c=document.createElement('canvas');c.width=c.height=1024;const ctx=c.getContext('2d');ctx.fillStyle='#514237';ctx.fillRect(0,0,1024,1024);let seed=225;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};for(let i=0;i<210;i++){let px=rand()*1400-200,py=rand()*1024;ctx.beginPath();ctx.moveTo(px,py);for(let j=0;j<18;j++){px+=55;py+=(rand()-.52)*120;ctx.lineTo(px,py);}ctx.strokeStyle=i%5===0?'#e3d8c4':'#8b7760';ctx.lineWidth=i%5===0?1.7:.65;ctx.stroke();}const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;marble=new THREE.MeshPhysicalMaterial({map,roughness:.24,clearcoat:.65});}
 const root=new THREE.Group();root.name='Paneled walnut marble counter with three evenly spaced stools';root.position.set(x,y,z);parent.add(root);
 const box=(g,w,h,d,x,y,z,m=walnut,r=.004)=>{const o=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/3,h/3,d/3)),m);o.position.set(x,y,z);g.add(o);return o;};
 box(root,2.90,.86,1.12,0,.47,0);box(root,3.04,.10,1.25,0,.05,0);box(root,3.02,.05,1.23,0,.135,0,edge);box(root,3.02,.055,1.23,0,.91,0,edge);box(root,3.18,.095,1.52,0,.985,.10,marble,.015);
 for(const side of[-1,1]){for(const px of[-1.38,1.38]){box(root,.16,.75,.13,px,.52,side*.57);box(root,.22,.045,.17,px,.86,side*.58,edge);}box(root,2.48,.58,.018,0,.51,side*.568,edge);box(root,2.36,.48,.025,0,.51,side*.582);for(const yy of[.24,.78])box(root,2.48,.025,.035,0,yy,side*.60,edge);}
 for(const side of[-1,1]){box(root,.022,.58,.88,side*1.46,.51,0,edge);box(root,.025,.48,.78,side*1.475,.51,0);}
 for(const px of[-1,0,1]){const chair=new THREE.Group();chair.name='Upholstered walnut counter chair';chair.position.set(px,0,1.18);chair.rotation.y=Math.PI;root.add(chair);
 for(const sx of[-1,1])for(const sz of[-1,1]){box(chair,.075,.66,.075,sx*.23,.33,sz*.23);box(chair,.095,.055,.095,sx*.23,.035,sz*.23,edge);box(chair,.095,.04,.095,sx*.23,.59,sz*.23,edge);}
 for(const side of[-1,1]){box(chair,.48,.035,.04,0,.24,side*.23);box(chair,.04,.035,.48,side*.23,.24,0);}box(chair,.44,.009,.045,0,.262,.23,new THREE.MeshStandardMaterial({color:0x9c8553,metalness:.7,roughness:.3}));
 box(chair,.58,.065,.58,0,.66,0);box(chair,.59,.012,.59,0,.701,0,edge);box(chair,.55,.11,.55,0,.759,0,fabric,.045);
 const back=new THREE.Group();back.position.set(0,1.02,-.29);back.rotation.x=-.12;chair.add(back);box(back,.57,.57,.085,0,0,0,walnut,.022);box(back,.45,.45,.07,0,0,.06,fabric,.028);box(back,.45,.45,.02,0,0,-.05,fabric,.02);box(back,.58,.06,.11,0,.285,0,walnut,.025);
 }
 root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return root;
}
