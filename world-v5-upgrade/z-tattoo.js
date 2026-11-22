import {createTattooTreatmentChair,createTattooWaitingSofa,createTattooReceptionCounter} from './tattoo-studio-furniture.js?v=20261122-tattoo-v255';
import {GROUND_LEVEL} from './ground-level.js?v=20261119-level-ground-v117';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createRealisticHuman} from './realistic-human.js?v=20261118-faster-town-v106';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
import {createTattooEditor} from './tattoo-editor.js?v=20261118-clear-roads-v112';
import {drawTattoo,TATTOO_DESIGNS} from './tattoo-art.js?v=20261118-clear-roads-v112';
export const Z_TATTOO={x:-390,z:-26,w:24,d:20,floor:.18,entry:{x:-390,z:-13.5}};
export function createZTattoo(scene,{getPlayer,controller,state,onStop=()=>{},onMessage=()=>{},canUse=()=>true}){
 const cfg=Z_TATTOO,root=new THREE.Group();root.name='Z Tattoo · illuminated corner studio';root.userData.customInterior=true;root.position.set(cfg.x,0,cfg.z);scene.add(root);const M=(color,roughness=.7,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness}),brick=M(0x996f56,.95),black=M(0x202b2e,.5),steel=M(0x8f9c98,.3,.65),cream=M(0xddd0b3,.85),wood=M(0x775540,.75),leather=M(0x34494a,.65),glass=new THREE.MeshPhysicalMaterial({color:0xa7c3c6,transparent:true,opacity:.24,roughness:.12,metalness:.06,depthWrite:false,side:THREE.DoubleSide}),neon=new THREE.MeshBasicMaterial({color:0xffac60});
 const texture=new THREE.TextureLoader().load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/expanded-models/brick-building/textures/modular_factory_facade_brick_diff_1k.jpg');texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(3,1);brick.map=texture;const solids=[];let artist=null,doorGap=0;
 function box(w,h,d,x,y,z,m=black,parent=root){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=h>.4;o.receiveShadow=true;parent.add(o);return o;}
 function rounded(w,h,d,x,y,z,m=leather,angle=0){const o=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,.06),m);o.position.set(x,y,z);o.rotation.x=angle;o.castShadow=true;root.add(o);return o;}
 box(24.5,.28,20.5,0,.04,0,cream);box(4,.12,1.75,0,GROUND_LEVEL-.06,11.125,cream);box(24,6.2,.24,0,3.28,-10,brick);box(.24,6.2,20,12,3.28,0,brick);box(.24,1.1,20,-12,.73,0,brick);box(24.7,.30,20.7,0,6.55,0,black);
 // South and west street faces are mostly glazing, with warm illuminated display windows.
 for(const side of [-1,1]){box(10.5,3.7,.12,side*6.55,2.25,10,glass);box(10.8,.65,.25,side*6.55,.5,10,brick);}box(.10,4.8,19.6,-12,3.3,0,glass);
 for(const x of [-12,-8,-4,-1.2,1.2,4,8,12])box(.12,6.22,.16,x,3.29,10.06,black);for(const z of [-10,-6,-2,2,6,10])box(.16,6.22,.12,-12.06,3.29,z,black);
 box(24,.16,.20,0,4.24,10.07,black);box(24,2.08,.10,0,5.28,10,glass);box(.16,.16,20,-12.07,4.24,0,black);box(.10,2.08,20,-12,5.28,0,glass);
 for(const x of [-11.72,-1.44,1.44,11.72])box(.035,3.45,.06,x,2.30,10.16,neon);for(const side of [-1,1])for(const y of [.64,4.02])box(10.3,.035,.06,side*6.55,y,10.16,neon);
 for(const y of [1.32,4.08])box(.06,.035,19.4,-12.17,y,0,neon);
 const doors=[];for(const side of [-1,1]){const door=new THREE.Group();door.position.set(side*.56,0,10.11);root.add(door);box(1.08,2.75,.09,0,1.56,0,glass,door);box(.055,2.80,.12,side*.52,1.56,.015,steel,door);box(.03,.48,.04,-side*.30,1.46,.08,steel,door);doors.push({door,side});}box(2.4,1.0,.14,0,3.78,10.10,glass);
 function sign(canvas,w,h,x,y,z,ry=0){const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;const plane=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,side:THREE.DoubleSide}));plane.position.set(x,y,z);plane.rotation.y=ry;root.add(plane);return plane;}
 const logo=document.createElement('canvas');logo.width=1536;logo.height=256;const lc=logo.getContext('2d');lc.textAlign='center';lc.textBaseline='middle';lc.shadowColor='#ffad65';lc.shadowBlur=12;lc.fillStyle='#fff6dd';lc.font='bold 174px Georgia';lc.fillText('Z TATTOO',768,138);sign(logo,18,1.35,0,5.15,10.15);sign(logo,14,1.15,-12.15,5.15,0,-Math.PI/2);
 // Sealed perimeter headers overlap the roof soffit and cap both glazed faces.
 box(24.25,.18,.26,0,6.35,10,black);box(.26,.18,20.25,-12,6.35,0,black);
 const display=new THREE.Group();display.name='18 framed tattoo flash illustrations';root.add(display);
 const atlas=document.createElement('canvas');atlas.width=2304;atlas.height=768;const ac=atlas.getContext('2d');ac.fillStyle='#e9d9ba';ac.fillRect(0,0,2304,768);
 const atlasMap=new THREE.CanvasTexture(atlas);atlasMap.colorSpace=THREE.SRGBColorSpace;atlasMap.anisotropy=8;
 const artMaterial=new THREE.MeshBasicMaterial({map:atlasMap,toneMapped:false});
 const flashIds=['wolf','skull','dragon','compass','rose','wolf','wings','koi','moon','skull','anchor','lotus','feather','skull','phoenix','snake','sun','dagger'];
 for(let i=0;i<18;i++){const col=i%9,row=Math.floor(i/9);ac.drawImage(drawTattoo(flashIds[i],'#161616',256),col*256+20,row*384+36,216,312);}
 new THREE.TextureLoader().load(new URL('./assets/tattoo-flash-atlas-v255.webp',import.meta.url).href,texture=>{
  const image=texture.image,edges=[[0,177,353,510,685,850,1010,1208,1360,1536],[0,176,354,505,680,844,1037,1200,1360,1536]];
  ac.fillStyle='#e9d9ba';ac.fillRect(0,0,2304,768);
  for(let row=0;row<2;row++)for(let col=0;col<9;col++){const sx=edges[row][col]+2,sw=edges[row][col+1]-sx-2,sy=row?540:80,sh=row?420:405,scale=Math.min(220/sw,342/sh),w=sw*scale,h=sh*scale;ac.drawImage(image,sx,sy,sw,sh,col*256+(256-w)/2,row*384+(384-h)/2,w,h);}
  atlasMap.needsUpdate=true;root.userData.flashAtlasLoaded=true;texture.dispose();
 });
 for(let row=0;row<2;row++)for(let col=0;col<9;col++){
  const x=-10.3+col*2.575,y=4.65-row*2.25;
  box(1.91,2.13,.10,x,y,-9.79,black,display);box(1.82,2.04,.035,x,y,-9.725,steel,display);
  const geo=new THREE.PlaneGeometry(1.74,1.96),uv=geo.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,(col+uv.getX(i))/9,(1-row+uv.getY(i))/2);
  const art=new THREE.Mesh(geo,artMaterial);art.name='Framed tattoo flash '+(row*9+col+1);art.position.set(x,y,-9.699);display.add(art);
 }
 // Sculpted leather furniture stays inside the existing collision footprints.
 const counter=createTattooReceptionCounter(root);solids.push({x:3.5,z:-6.7,w:7.2,d:1.65});
 for(const [x,z]of [[-7,-1],[5,-.5]]){
  createTattooTreatmentChair(root,{x,z});solids.push({x,z,w:1.65,d:2.0});
  const tray=new THREE.Group();tray.name='Brushed steel instrument tray';tray.position.set(x+1.55,.18,z);root.add(tray);
  box(.88,.07,.62,0,.90,0,steel,tray);box(.09,.82,.11,0,.45,0,steel,tray);box(.63,.065,.49,0,.035,0,steel,tray);
  for(const side of[-1,1]){box(.025,.045,.64,side*.44,.95,0,steel,tray);box(.88,.045,.025,0,.95,side*.31,steel,tray);}solids.push({x:x+1.55,z,w:1.2,d:.8});
 }
 createTattooWaitingSofa(root,{x:-6,z:6,width:3.2});solids.push({x:-6,z:6,w:3.4,d:1.4});
 root.userData.tattooUpgrade={chairs:2,sofas:1,flashFrames:18,sealedGlazing:true,counter:true};
 for(const x of [-8,0,8]){const light=new THREE.PointLight(0xffc78c,5,12);light.position.set(x,4.6,3);root.add(light);box(3.5,.04,.65,x,5.88,2,new THREE.MeshBasicMaterial({color:0xffead0}));}
 const editor=createTattooEditor({controller,state,onClose:onStop,onMessage});const browse=document.createElement('button');browse.style.display='none';browse.onclick=()=>{onStop();editor.open();};document.body.appendChild(browse);registerTownAction(browse,{id:'z-tattoo-designs',label:'Z Tattoo · Browse designs',priority:125,target:()=>({x:cfg.x,y:1.5,z:cfg.z+7.8})});
 function inBuilding(x,z){return Math.abs(x-cfg.x)<12.35&&Math.abs(z-cfg.z)<10.35;}
 return{root,cfg,editor,state,browseButton:browse,close:()=>editor.close(),get panelOpen(){return editor.isOpen},heightAt(x,z){if(Math.abs(x-cfg.x)<12.25&&Math.abs(z-cfg.z)<=10.25)return .18;return Math.abs(x-cfg.x)<2&&z>cfg.z+10.25&&z<=cfg.z+12?GROUND_LEVEL:null;},canWalk(x,z){if(!inBuilding(x,z))return null;const px=x-cfg.x,pz=z-cfg.z,p=getPlayer(),near=Math.hypot(p.x-cfg.x,p.z-cfg.z-10)<4;const entrance=Math.abs(px)<.90&&pz>9.55;if(entrance)return near;if(Math.abs(px)>11.55||Math.abs(pz)>9.55)return false;if(solids.some(s=>Math.abs(px-s.x)<s.w/2+.25&&Math.abs(pz-s.z)<s.d/2+.25))return false;return true;},update(dt){const p=getPlayer(),d=Math.hypot(p.x-cfg.x,p.z-cfg.z),nearDoor=Math.hypot(p.x-cfg.x,p.z-cfg.z-10)<4;doorGap=THREE.MathUtils.damp(doorGap,nearDoor?1:0,10,dt);for(const{door,side}of doors)door.position.x=side*(.56+doorGap*1.05);browse.style.display=canUse()&&!editor.isOpen&&(inBuilding(p.x,p.z)||Math.hypot(p.x-cfg.x,p.z-cfg.z-11)<6)?'block':'none';if(d<45&&!artist){artist=createRealisticHuman({shirt:0x543542,pants:0x263339});const artistAnchor=new THREE.Group();artistAnchor.position.set(3.4,.18,-8.1);root.add(artistAnchor);artistAnchor.add(artist.root);artist.readyPromise.then(()=>{for(let i=0;i<12;i++)artist.update(.05,0);});}if(artist){artist.root.visible=d<65;if(d<65)artist.update(dt,0);}},get artist(){return artist}};
}
