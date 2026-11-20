import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export function addShowroomGallery(parent,{getPlayer=()=>null}={}){
 const root=new THREE.Group();root.name='Zerconda Motors · truck gallery and commercial';parent.add(root);
 const M=(color,r=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness:r,metalness}),wood=M('#6e5540'),ink=M('#20343c',.55),gold=M('#b9a16c',.28,.75),stone=M('#b4bcb9'),glass=new THREE.MeshPhysicalMaterial({color:'#b4d2d6',transparent:true,opacity:.15,roughness:.10,depthWrite:false});
 const solid=[];function box(w,h,d,x,y,z,m=ink){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);root.add(o);return o;}
 function textCanvas(title,subtitle){const c=document.createElement('canvas');c.width=1024;c.height=256;const a=c.getContext('2d');a.fillStyle='#19343e';a.fillRect(0,0,1024,256);a.strokeStyle='#b9a16c';a.lineWidth=4;a.strokeRect(10,10,1004,236);a.fillStyle='#f2e4c6';a.textAlign='center';a.font='bold 63px Georgia';a.fillText(title,512,101,950);a.fillStyle='#b8d6d9';a.font='29px Arial';a.fillText(subtitle,512,181,950);return c;}
 function canvasTexture(c){const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
 function face(w,h,x,y,z,map,rotation=Math.PI/2,name=''){const mat=new THREE.MeshBasicMaterial({map,toneMapped:false}),o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);o.position.set(x,y,z);o.rotation.y=rotation;o.name=name;root.add(o);return o;}
 // Architectural wall lining, plinth and brass reveals bring the large room down to human scale.
 box(.09,2.1,27.6,-11.78,1.08,0,ink);box(.12,.12,27.7,-11.68,2.17,0,gold);box(.13,.12,27.7,-11.65,.11,0,gold);
 for(let z=-13.4;z<=13.4;z+=.46)box(.10,5.4,.12,-11.71,4.7,z,wood);
 for(const side of[-1,1]){box(23.4,1.55,.08,0,.80,side*13.80,stone);box(23.5,.045,.08,0,1.60,side*13.74,gold);box(23.5,.10,.10,0,.08,side*13.72,ink);}
 const loader=new THREE.TextureLoader();const asset=n=>new URL('./assets/'+n,import.meta.url).href;
 const posters=[];for(const [z,file,title]of[[-6.5,'ridge-sandstone.jpg','RIDGE · SANDSTONE'],[6.5,'ridge-graphite.jpg','RIDGE · GRAPHITE']]){box(.18,3.30,5.70,-11.48,4.55,z,ink);box(.045,3.08,5.48,-11.36,4.55,z,gold);const tex=loader.load(asset(file));tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;posters.push(face(5.30,2.981,-11.32,4.55,z,tex,Math.PI/2,'Framed '+title+' photograph'));box(.38,.08,5.3,-11.20,6.22,z,gold);box(.22,.025,4.9,-11.11,6.16,z,new THREE.MeshBasicMaterial({color:'#fff1cd'}));}
 // A true looping video commercial uses the same trucks seen on the display plinths.
 box(.22,4.15,7.25,-11.40,4.12,0,ink);box(.035,3.96,7.04,-11.25,4.12,0,M('#090f13'));
 const fallback=canvasTexture(textCanvas('ZERCONDA RIDGE','THE ROAD AHEAD · VISIT OUR SALES TEAM'));
 const screen=face(6.82,3.836,-11.215,4.12,0,fallback,Math.PI/2,'Wall TV · Ridge driving commercial');const diode=box(.04,.025,.025,-11.21,2.13,0,new THREE.MeshBasicMaterial({color:'#76d2bc'}));
 const video=document.createElement('video');video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;video.preload='none';video.setAttribute('playsinline','');video.setAttribute('aria-label','Zerconda Ridge driving commercial');video.poster=asset('ridge-sandstone.jpg');video.src=asset('ridge-driving-commercial.mp4');
 const videoTexture=new THREE.VideoTexture(video);videoTexture.colorSpace=THREE.SRGBColorSpace;let manualPaused=false,started=false,lastNear=false;
 video.addEventListener('loadeddata',()=>{screen.material.map=videoTexture;screen.material.needsUpdate=true;});video.addEventListener('error',()=>{screen.material.map=fallback;screen.material.needsUpdate=true;});
 const button=document.createElement('button');button.style.display='none';button.onclick=()=>{manualPaused=!manualPaused;if(manualPaused)video.pause();else video.play().catch(()=>{});};document.body.append(button);const target=new THREE.Vector3(-10,2,0);registerTownAction(button,{id:'showroom-tv',label:()=>manualPaused?'TV · Play truck commercial':'TV · Pause truck commercial',priority:30,target:()=>{const p=parent.localToWorld(target.clone());return{x:p.x,y:p.y,z:p.z};}});
 // Supplied shield, cup and star artwork mounted on the marked side wall.
 const awardsTexture=loader.load(asset('motors-awards-v183.png'));awardsTexture.colorSpace=THREE.SRGBColorSpace;awardsTexture.anisotropy=8;awardsTexture.userData.readableSign=true;
 const awards=new THREE.Mesh(new THREE.PlaneGeometry(9.5,3.165),new THREE.MeshBasicMaterial({map:awardsTexture,transparent:true,alphaTest:.5,depthWrite:false,toneMapped:false}));awards.name='Zerconda Car of the Year · shield cup and star wall awards';awards.position.set(0,3.9,-13.63);root.add(awards);
 box(9.9,3.6,.10,0,3.9,-13.75,ink);box(10.05,.04,.12,0,5.72,-13.65,gold);box(10.05,.04,.12,0,2.08,-13.65,gold);
 face(8,.9,-11.50,7.75,0,canvasTexture(textCanvas('ZERCONDA MOTORS','DESIGNED FOR THE JOURNEY')),Math.PI/2);
 // Batch anonymous architectural pieces; photographs, TV and named displays stay independently inspectable.
 const groups=new Map();for(const o of[...root.children])if(o.isMesh&&!o.name){o.updateMatrix();const geo=o.geometry.clone().applyMatrix4(o.matrix),list=groups.get(o.material)||[];list.push(geo.index?geo.toNonIndexed():geo);groups.set(o.material,list);root.remove(o);o.geometry.dispose();}for(const[m,list]of groups){const merged=new THREE.Mesh(mergeGeometries(list),m);root.add(merged);list.forEach(g=>g.dispose());}
 const point=new THREE.Vector3();return{root,video,screen,posters,solids:solid,get manualPaused(){return manualPaused},update(near){lastNear=near&&!document.hidden;if(lastNear&&!started){started=true;video.preload='auto';video.load();}if(lastNear&&!manualPaused){if(video.paused)video.play().catch(()=>{});}else if(!video.paused)video.pause();const p=getPlayer();if(p){point.set(p.x,0,p.z);parent.worldToLocal(point);button.style.display=lastNear&&Math.abs(point.x)<12&&Math.abs(point.z)<13?'block':'none';}else button.style.display='none';},dispose(){video.pause();video.removeAttribute('src');video.load();videoTexture.dispose();button.remove();root.removeFromParent();}};
}
