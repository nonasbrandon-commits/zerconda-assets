import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createRealisticHuman} from './realistic-human.js?v=20261117-club-v70';
import {createDarts,rackPool,stepPool,POOL} from './club-games.js?v=20261117-club-v70';
import {createClubGameView,drawDartBoard,BALL_COLORS} from './club-game-view.js?v=20261117-club-v70';
import {createClubSocial} from './club-social.js?v=20261117-club-v70';

export function createClubZerconda(scene,{getPlayer,getYaw=()=>0,stopMovement,pauseMovement=stopMovement,canEnter=()=>true,x=-48,z=-24}={}){
 const root=new THREE.Group();root.name='Club Zerconda · two-floor social club';root.position.set(x,0,z);root.userData.customInterior=true;scene.add(root);
 const mat=(color,roughness=.8,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const brick=mat(0x635c55),trim=mat(0x232c30,.4,.55),oak=mat(0x70513b,.7),floorMat=mat(0x6c6257,.85),velvet=mat(0x5c3041,.95),leather=mat(0x293f43,.88),brass=mat(0xa78b52,.35,.65),glass=new THREE.MeshPhysicalMaterial({color:0x799da7,roughness:.2,metalness:.12,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false});
 const loader=new THREE.TextureLoader();const map=loader.load('https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/expanded-models/brick-building/textures/modular_factory_facade_brick_diff_1k.jpg');map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(6,2);map.colorSpace=THREE.SRGBColorSpace;brick.map=map;
 const woodCanvas=document.createElement('canvas');woodCanvas.width=woodCanvas.height=1024;const wc=woodCanvas.getContext('2d');
 let grainSeed=512;const grain=()=>((grainSeed=(Math.imul(grainSeed,1664525)+1013904223)>>>0)/4294967296);
 wc.fillStyle='#9b856c';wc.fillRect(0,0,1024,1024);
 for(let row=0;row<16;row++){const tone=120+Math.floor(grain()*28);wc.fillStyle=`rgb(${tone+24},${tone+4},${tone-19})`;wc.fillRect(0,row*64,1024,64);wc.fillStyle='#382d25';wc.fillRect(0,row*64,1024,2);wc.fillRect(row%2?320:760,row*64,2,64);}
 for(let i=0;i<26000;i++){const y=grain()*1024,v=70+Math.floor(grain()*70);wc.fillStyle=`rgba(${v+15},${v},${v-20},.14)`;wc.fillRect(grain()*1024,y,10+grain()*130,.5+grain());}
 const woodTexture=new THREE.CanvasTexture(woodCanvas);woodTexture.colorSpace=THREE.SRGBColorSpace;woodTexture.wrapS=woodTexture.wrapT=THREE.RepeatWrapping;woodTexture.repeat.set(12,3);woodTexture.anisotropy=4;floorMat.color.set(0xffffff);floorMat.map=woodTexture;floorMat.bumpMap=woodTexture;floorMat.bumpScale=.008;
 const upholsteryCanvas=document.createElement('canvas');upholsteryCanvas.width=upholsteryCanvas.height=256;const uc=upholsteryCanvas.getContext('2d');uc.fillStyle='#d2ccca';uc.fillRect(0,0,256,256);for(let i=0;i<10000;i++){const v=135+Math.floor(grain()*90);uc.fillStyle=`rgba(${v},${v},${v},.4)`;uc.fillRect(grain()*256,grain()*256,1,2);}
 const upholstery=new THREE.CanvasTexture(upholsteryCanvas);upholstery.wrapS=upholstery.wrapT=THREE.RepeatWrapping;upholstery.repeat.set(5,3);velvet.map=upholstery;velvet.bumpMap=upholstery;velvet.bumpScale=.003;
 const cube=new THREE.BoxGeometry(1,1,1),softCube=new RoundedBoxGeometry(1,1,1,3,.12);
 function box(w,h,d,px,py,pz,m=trim,parent=root){const mesh=new THREE.Mesh(m===velvet||m===leather?softCube:cube,m);mesh.scale.set(w,h,d);mesh.position.set(px,py,pz);mesh.castShadow=h>.2;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 function cyl(r,h,px,py,pz,m,parent=root){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,24),m);mesh.position.set(px,py,pz);mesh.castShadow=true;parent.add(mesh);return mesh;}
 function label(text,px,py,pz,width=8,height=1,angle=0){const cv=document.createElement('canvas');cv.width=1024;cv.height=180;const c=cv.getContext('2d');c.fillStyle='#16272c';c.fillRect(0,0,1024,180);c.strokeStyle='#b59c64';c.lineWidth=5;c.strokeRect(3,3,1018,174);c.fillStyle='#f9e4b1';c.font='bold 68px sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(text,512,92,980);const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide}));mesh.position.set(px,py,pz);mesh.rotation.y=angle;root.add(mesh);return mesh;}
 // This footprint is entirely behind the dealership, between the established streets.
 box(60,.26,16,0,.03,0,floorMat);box(60,9,.35,0,4.5,-8,brick);box(60,9,.35,0,4.5,8,brick);box(.35,9,16,30,4.5,0,brick);
 for(const side of [-1,1])box(.35,9,6,-30,4.5,side*5,brick);
 box(.2,5.6,3.9,-30,5.9,0,glass);box(.65,.2,4.4,-30,2.9,0,brass);
 const roof=box(61,.3,17,0,9.15,0,trim);roof.name='Club roof';
 for(const xx of [-29,-15,0,15,29])for(const zz of [-7.6,7.6])box(.22,9,.22,xx,4.5,zz,brass);
 // The upper floor has a real stair opening, with a guarded gallery edge.
 box(51.5,.24,15.6,-3.25,4.54,0,floorMat);
 box(7.2,.24,1.5,25.9,4.54,-7.05,floorMat);box(7.2,.24,1.5,25.9,4.54,7.05,floorMat);
 for(let i=0;i<12;i++)box(.055,1,.055,22.55,5.16,-5.7+i,brass);
 box(.07,.07,11.7,22.55,5.68,-.2,brass);
 for(let i=0;i<24;i++)box(4,.1875,.5,25, .16+(i+.5)*.1875,-5.75+i*.5,oak);
 for(const side of [-1,1]){
  for(let i=0;i<=24;i++)box(.055,1,.055,25+side*2.12,.66+i*.1875,-6+i*.5,brass);
  const rail=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,Math.hypot(12,4.5),12),brass);rail.position.set(25+side*2.12,3.41,0);rail.rotation.x=Math.atan2(12,4.5);root.add(rail);
 }
 label('UPSTAIRS · DARTS & POOL',23,2.2,-7.7,9,.7);
 label('CLUB ZERCONDA',-30.22,7.3,0,13,1.6,-Math.PI/2);label('CLUB ZERCONDA',0,8.1,-8.21,24,1.3,Math.PI);
 label('CLUB ZERCONDA',0,8.12,8.23,24,1.15);
 const windowBacking=new THREE.MeshStandardMaterial({color:0x283c43,roughness:.3,metalness:.2,emissive:0x8b6837,emissiveIntensity:.18});
 for(const xx of [-24,-12,0,12,24])for(const level of [0,4.5]){
  box(4,2.4,.05,xx,level+2.25,8.19,windowBacking);box(3.85,2.25,.04,xx,level+2.25,8.24,glass);
  for(const side of [-1,1])box(.09,2.55,.12,xx+side*2.03,level+2.25,8.26,brass);
  for(const side of [-1,1])box(4.15,.09,.12,xx,level+2.25+side*1.25,8.26,brass);
 }
 const welcome=label('DANCE · LOUNGE · GAMES',-30.24,5.6,0,12,.65,-Math.PI/2);
 box(5,.15,4,-32.2,.07,0,floorMat);box(2,.1,4,-29.1,.16,0,oak);
 const exteriorParts=new Set(root.children);
 // Warm fixtures and restrained colored accents retain a room-like appearance.
 const glow=new THREE.MeshBasicMaterial({color:0xe5be7c});
 for(const xx of [-22,-7,9,22])for(const level of [0,4.5]){
  box(3,.08,.14,xx,level+4.16,0,glow);
  if(xx===-7||xx===22){const light=new THREE.PointLight(level?0xd9e9ed:0xffd7a3,26,22,2);light.position.set(xx,level+3.6,0);root.add(light);}
 }
 const danceTiles=[],danceFrame=mat(0x16272b,.25,.25);
 box(16,.08,10,-12,.19,0,danceFrame);
 for(let i=0;i<8;i++)for(let j=0;j<5;j++){
  const material=new THREE.MeshStandardMaterial({color:(i+j)%2?0x29303a:0x292c2e,roughness:.28,metalness:.32,emissive:0x205b75,emissiveIntensity:.12});
  const tile=box(1.94,.025,1.94,-19+i*2,.245,-4+j*2,material);danceTiles.push(tile);
 }
 box(7,1.12,1.8,-12,.73,6.2,oak);box(7.3,.08,2,-12,1.33,6.2,trim);
 for(const xx of [-14,-10]){const deck=new THREE.Mesh(new THREE.CylinderGeometry(.48,.48,.07,32),trim);deck.position.set(xx,1.42,6.2);root.add(deck);box(1.3,.1,.8,xx,1.39,5.9,brass);}
 for(const xx of [-24,-1]){box(1,2.5,1.1,xx,1.4,6.1,trim);for(const yy of [.8,1.9]){const speaker=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.08,24),mat(0x0d161c));speaker.rotation.x=Math.PI/2;speaker.position.set(xx,yy,5.51);root.add(speaker);}}
 label('DANCE FLOOR',-12,3.2,7.72,12,.8,Math.PI);
 // Upholstered booths, small conversation tables and a two-floor lounge.
 const seats=[];
 function sofa(px,pz,level,angle=0){
  const group=new THREE.Group();group.position.set(px,level+.16,pz);group.rotation.y=angle;root.add(group);
  box(3,.30,1.05,0,.28,0,velvet,group);box(3,.9,.22,0,.86,-.46,velvet,group);
  for(const offset of [-1,0,1]){box(.94,.12,.91,offset,.47,.015,velvet,group);const button=new THREE.Mesh(new THREE.SphereGeometry(.025,10,8),leather);button.scale.z=.35;button.position.set(offset,.92,-.335);group.add(button);}
  for(const side of [-1,1]){box(.24,.52,1.1,side*1.5,.54,0,leather,group);for(const zz of [-.4,.4])cyl(.045,.35,side*1.3,.19,zz,brass,group);}
  for(const side of [-1,1]){const p=new THREE.Vector3(side*.72,.16,.09).applyAxisAngle(new THREE.Vector3(0,1,0),angle);seats.push({x:x+px+p.x,z:z+pz+p.z,y:level+.16,sitHeight:level+.69,facing:angle,kind:'club',floor:level?1:0});}
 }
 for(const level of [0,4.5])for(const xx of [3,12,19]){
  sofa(xx,5.4,level,Math.PI);cyl(.75,.1,xx,level+.7,3.4,oak);cyl(.065,.5,xx,level+.4,3.4,brass);
 }
 sofa(-24,-4,4.5,Math.PI/2);sofa(-24,3.5,4.5,Math.PI/2);
 box(17,1.15,1.3,10,.74,-5.7,oak);box(17.4,.09,1.6,10,1.36,-5.7,trim);
 for(const xx of [3,6,9,12,15,18]){cyl(.32,.10,xx,.83,-3.7,leather);cyl(.04,.65,xx,.46,-3.7,brass);}
 for(const yy of [2.0,2.8])box(15,.1,.65,10,yy,-7.6,oak);
 for(let i=0;i<22;i++){const bottleMat=mat([0x3e7563,0x765c37,0x527784][i%3],.3);cyl(.09,.35,3+i*.62,2.23+(i%2)*.8,-7.55,bottleMat);}
 label('THE LOUNGE',10,3.5,-7.77,12,.7);
 // Darts upstairs: the scoring target is also the visible board texture.
 const boardCanvas=document.createElement('canvas');boardCanvas.width=boardCanvas.height=1024;drawDartBoard(boardCanvas.getContext('2d'),1024);const boardTexture=new THREE.CanvasTexture(boardCanvas);boardTexture.colorSpace=THREE.SRGBColorSpace;
 const board=new THREE.Mesh(new THREE.CircleGeometry(.32,64),new THREE.MeshStandardMaterial({map:boardTexture,roughness:.92}));board.position.set(-18,6.39,-7.77);root.add(board);
 box(1.25,1.25,.07,-18,6.39,-7.86,oak);box(2,.025,.09,-18,4.675,-5.4,brass);label('301 DARTS',-18,7.8,-7.76,5,.55);
 // A regulation-proportioned 8-ball table with six pockets, rails and numbered balls.
 const tableOrigin={x:3,z:-.3,y:4.5};const felt=mat(0x24634f,.98),pocketMat=mat(0x081713,.9);
 box(3.08,.45,1.72,tableOrigin.x,5.05,tableOrigin.z,oak);box(2.7,.08,1.35,tableOrigin.x,5.32,tableOrigin.z,felt);
 for(const side of [-1,1]){box(3.04,.13,.14,tableOrigin.x,5.40,tableOrigin.z+side*.75,oak);box(.14,.13,1.48,tableOrigin.x+side*1.45,5.4,tableOrigin.z,oak);}
 for(const xx of [-1.1,1.1])for(const zz of [-.58,.58])box(.2,.70,.2,tableOrigin.x+xx,4.95,tableOrigin.z+zz,trim);
 for(const [px,pz] of POOL.pockets){const pocket=new THREE.Mesh(new THREE.CircleGeometry(.085,20),pocketMat);pocket.rotation.x=-Math.PI/2;pocket.position.set(tableOrigin.x+px,5.45,tableOrigin.z+pz);root.add(pocket);}
 label('8-BALL POOL',3,7.8,-7.76,7,.55);
 function ballTexture(id){const cv=document.createElement('canvas');cv.width=256;cv.height=128;const ctx=cv.getContext('2d');ctx.fillStyle=id>8?'#f4eee0':BALL_COLORS[id];ctx.fillRect(0,0,256,128);if(id>8){ctx.fillStyle=BALL_COLORS[id];ctx.fillRect(0,37,256,54);}if(id){for(const u of [64,192]){ctx.fillStyle='#fff7e6';ctx.beginPath();ctx.arc(u,64,21,0,Math.PI*2);ctx.fill();ctx.fillStyle='#102021';ctx.font='bold 26px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(id,u,64);}}const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;return t;}
 const ballMeshes=new Map();for(let id=0;id<16;id++){const mesh=new THREE.Mesh(new THREE.SphereGeometry(POOL.radius,20,14),new THREE.MeshStandardMaterial({map:ballTexture(id),roughness:.2,metalness:.05}));mesh.castShadow=true;root.add(mesh);ballMeshes.set(id,mesh);}
 let pool=rackPool(),darts=createDarts(),poolStamp=0,dartsStamp=0,poolAuthority=false;
 function validPool(value){return value&&[0,1].includes(value.turn)&&Array.isArray(value.groups)&&value.groups.length===2&&value.groups.every(g=>g===null||g==='solids'||g==='stripes')&&Array.isArray(value.potted)&&typeof value.last==='string'&&typeof value.moving==='boolean'&&(value.winner===null||[0,1].includes(value.winner))&&value.balls?.length===16&&new Set(value.balls.map(b=>b.id)).size===16&&value.balls.every(b=>Number.isInteger(b.id)&&b.id>=0&&b.id<16&&Number.isFinite(b.x)&&Number.isFinite(b.z)&&Math.abs(b.x)<2&&Math.abs(b.z)<1.2&&Number.isFinite(b.vx)&&Number.isFinite(b.vz)&&Math.hypot(b.vx,b.vz)<7&&typeof b.pocketed==='boolean');}
 function validDarts(value){return value&&[0,1].includes(value.turn)&&value.scores?.length===2&&value.scores.every(v=>Number.isInteger(v)&&v>=0&&v<=301)&&Number.isInteger(value.throws)&&value.throws>=0&&value.throws<=3&&Number.isInteger(value.start)&&value.start>=0&&value.start<=301&&typeof value.last==='string'&&(value.winner===null||[0,1].includes(value.winner))&&Array.isArray(value.hits)&&value.hits.length<=3&&value.hits.every(h=>Number.isFinite(h.x)&&Number.isFinite(h.y)&&Math.hypot(h.x,h.y)<1.3);}
 const darts3d=[];
 function showDart(nx,ny){const dart=new THREE.Group();const shaft=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,.20,8),brass);shaft.rotation.x=Math.PI/2;dart.add(shaft);box(.065,.05,.018,0,0,.075,velvet,dart);dart.position.set(-18+nx*.32*.79,6.39-ny*.32*.79,-7.65);root.add(dart);darts3d.push(dart);if(darts3d.length>3)root.remove(darts3d.shift());}
 const remotes=new Map();
 let active=false,floor=0,dancing=false,connectionTime=0;
 const outsideVisibility=new Map();
 function focusInterior(inside){
  if(!inside){for(const [node,visible] of outsideVisibility)node.visible=visible;outsideVisibility.clear();return;}
  for(const node of scene.children){
   if(node===root||node.name==='Zerconda player avatar'||(!node.isGroup&&!node.isMesh))continue;
   // Keep street and ground slabs visible through the entrance; distant city
   // models behind solid club walls need not consume draw calls indoors.
   if(node.isMesh&&node.scale.y<.3)continue;
   if(!outsideVisibility.has(node))outsideVisibility.set(node,node.visible);
   node.visible=false;
  }
 }
 const social=createClubSocial({onFocus:pauseMovement,getPose:()=>{const p=getPlayer();return {x:p.x,z:p.z,y:heightAt(p.x,p.z)-(p.clubSeated?.25:0),floor,yaw:getYaw(),dance:dancing,seated:!!getPlayer().clubSeated};},
  onPresence(id,pose){
   if(!pose){const old=remotes.get(id);if(old)root.remove(old.group);remotes.delete(id);return;}
   if(!Number.isFinite(pose.x)||!Number.isFinite(pose.z)||!Number.isFinite(pose.y)||pose.y< -1||pose.y>6||Math.abs(pose.x-x)>30||Math.abs(pose.z-z)>8)return;
   pose.yaw=Number.isFinite(pose.yaw)?pose.yaw:0;
   let remote=remotes.get(id);if(!remote){const group=new THREE.Group();root.add(group);const human=createRealisticHuman({shirt:0x627f8c,pants:0x8e806c});group.add(human.root);remote={group,human,pose,last:{x:pose.x,z:pose.z}};group.position.set(pose.x-x,pose.y||.16,pose.z-z);remotes.set(id,remote);}remote.pose=pose;
  },
  getGames:()=>({pool,poolStamp,darts,dartsStamp}),
  onGame(message){if(Number.isSafeInteger(message.poolStamp)&&message.poolStamp>poolStamp&&validPool(message.pool)){pool=message.pool;poolStamp=message.poolStamp;poolAuthority=false;}if(Number.isSafeInteger(message.dartsStamp)&&message.dartsStamp>dartsStamp&&validDarts(message.darts)){darts=message.darts;dartsStamp=message.dartsStamp;}}
 });
 const gameView=createClubGameView({getPool:()=>pool,setPool:value=>pool=value,getDarts:()=>darts,setDarts:value=>darts=value,stopMovement,onDart:showDart,
  changed(kind){if(kind==='pool'){poolStamp=Math.max(poolStamp+1,Date.now());poolAuthority=true;social.sendGame({pool,poolStamp});}else{dartsStamp=Math.max(dartsStamp+1,Date.now());social.sendGame({darts,dartsStamp});}}
 });
 const enterButton=document.createElement('button'),danceButton=document.createElement('button'),gameButton=document.createElement('button');
 for(const [button,bottom] of [[enterButton,500],[danceButton,555],[gameButton,610]]){button.style.cssText=`position:fixed;right:14px;bottom:${bottom}px;z-index:12001;background:#263b41;color:#fff0d7;padding:12px;border:1px solid #b69c64;border-radius:8px;display:none;font-weight:bold`;document.body.appendChild(button);}
 const banner=document.createElement('div');banner.style.cssText='position:fixed;top:110px;left:50%;transform:translateX(-50%);z-index:12000;padding:8px 15px;background:#14252bdd;color:#f9e9c8;border:1px solid #92764a;border-radius:8px;display:none;font:13px system-ui';document.body.appendChild(banner);
 function near(){const p=getPlayer();return Math.hypot(p.x-(x-31),p.z-z)<6;}
 function toggle(){if(active){gameView.close();social.close();active=false;floor=0;dancing=false;focusInterior(false);const p=getPlayer();p.x=x-33;p.z=z;stopMovement();return;}if(!canEnter())return;active=true;floor=0;dancing=false;focusInterior(true);const p=getPlayer();p.x=x-27;p.z=z;stopMovement();social.open();}
 function heightAt(px,pz){const lx=px-x,lz=pz-z;if(lx>22.8&&lx<27.2&&lz>=-6&&lz<=6)return .16+Math.ceil(Math.max(0,(lz+6)/12)*24)/24*4.5;if(floor===0&&Math.abs(lx+12)<8&&Math.abs(lz)<5)return .258;return .16+floor*4.5;}
 function contains(px,pz){const lx=px-x,lz=pz-z;if(Math.abs(lx)>29.3||Math.abs(lz)>7.3)return false;
  const p=getPlayer(),prevX=p.x-x,prevZ=p.z-z,inStairs=lx>22.7&&lx<27.3&&lz>-6&&lz<6,wasStairs=prevX>22.7&&prevX<27.3&&prevZ>-6&&prevZ<6;
  if(wasStairs&&prevZ>-5.7&&prevZ<5.7&&!inStairs)return false;
  if(inStairs&&!wasStairs&&(floor===0?lz>-5.2:lz<5.2))return false;
  if(floor===1&&Math.abs(lx-3)<1.9&&Math.abs(lz+.3)<1.2)return false;
  for(const cx of [3,12,19]){if(Math.abs(lx-cx)<1.7&&Math.abs(lz-5.4)<.8)return false;if(Math.hypot(lx-cx,lz-3.4)<1.0)return false;}
  if(floor===1&&Math.abs(lx+24)<.8&&(Math.abs(lz+4)<1.7||Math.abs(lz-3.5)<1.7))return false;
  if(floor===0&&Math.abs(lx+12)<3.8&&lz>4.95)return false;
  if(floor===0&&lx>1&&lx<19&&lz< -4.8)return false;
  return true;
 }
 enterButton.onclick=toggle;danceButton.onclick=()=>{dancing=!dancing;stopMovement();};
 gameButton.onclick=()=>{const p=getPlayer();gameView.show(Math.hypot(p.x-(x+3),p.z-(z-.3))<5?'pool':'darts');};
 addEventListener('keydown',e=>{if(!active||gameView.open||['INPUT','TEXTAREA'].includes(e.target.tagName))return;if(e.code==='KeyB'&&!e.repeat&&floor===0&&Math.abs(getPlayer().x-(x-12))<9){dancing=!dancing;stopMovement();}if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))dancing=false;});
 // A small resident dance group keeps the floor alive without masquerading as live users.
 const dancers=[];for(let i=0;i<3;i++){const human=createRealisticHuman({shirt:[0x754c64,0x467782,0x8b7857][i],pants:0x343e47});const spot=new THREE.Group();spot.position.set(-17+i*4,.258,(i%2?1:-1)*1.5);spot.add(human.root);root.add(spot);human.readyPromise.then(()=>{for(let j=0;j<i*8;j++)human.update(.05,0,{dancing:true});});dancers.push(human);}
 const indoor=new THREE.Group();indoor.name='Club interior details';for(const child of [...root.children])if(!exteriorParts.has(child))indoor.add(child);root.add(indoor);indoor.visible=false;
 return {root,roof,seats,get games(){return {pool,darts};},get online(){return social.connected;},get peers(){return social.peers;},get active(){return active;},get floor(){return floor;},get dancing(){return dancing;},set dancing(value){dancing=value;},get gameOpen(){return gameView.open;},near,toggle,heightAt,contains,
  blocks(px,pz){return Math.abs(px-x)<30.3&&Math.abs(pz-z)<8.3;},
  nearestSeat(px,pz,max=2.4){if(!active)return null;let best=null,distance=max;for(const seat of seats){if(seat.floor!==floor)continue;const d=Math.hypot(px-seat.x,pz-seat.z);if(d<distance){best=seat;distance=d;}}return best;},
  clampCamera(point){point.x=THREE.MathUtils.clamp(point.x,x-28.6,x+28.6);point.z=THREE.MathUtils.clamp(point.z,z-6.8,z+6.8);},
  update(dt,time){
   const p=getPlayer(),lx=p.x-x,lz=p.z-z;
   if(active)focusInterior(true);
   indoor.visible=active||near();
   if(active&&lx>22.7&&lx<27.3){if(lz<=-5.8)floor=0;if(lz>=5.8)floor=1;}
   if(stepPool(pool,dt)&&poolAuthority){poolStamp=Math.max(poolStamp+1,Date.now());social.sendGame({pool,poolStamp});poolAuthority=false;}
   for(const b of pool.balls){const mesh=ballMeshes.get(b.id);mesh.visible=!b.pocketed;mesh.position.set(tableOrigin.x+b.x,5.39,b.z+tableOrigin.z);mesh.rotation.z-=b.vx*dt/POOL.radius;mesh.rotation.x+=b.vz*dt/POOL.radius;}
   for(let i=0;i<danceTiles.length;i++)danceTiles[i].material.emissiveIntensity=.14+.09*Math.sin(time*2+i*.4);
   if(indoor.visible)for(const human of dancers)human.update(dt,0,{dancing:true});
   for(const remote of remotes.values()){const before=remote.group.position.clone(),target=new THREE.Vector3(remote.pose.x-x,remote.pose.y||.16,remote.pose.z-z);remote.group.position.lerp(target,Math.min(1,dt*9));remote.group.rotation.y=remote.pose.yaw||0;const speed=dt?Math.min(5,before.distanceTo(remote.group.position)/dt):0;remote.human.update(dt,speed,{dancing:remote.pose.dance,seated:remote.pose.seated});}
   enterButton.style.display=active||(near()&&canEnter())?'block':'none';enterButton.textContent=active?'E · EXIT CLUB ZERCONDA':'E · ENTER CLUB ZERCONDA';
   const onDance=active&&floor===0&&Math.abs(lx+12)<9&&Math.abs(lz)<5.8;danceButton.style.display=onDance?'block':'none';danceButton.textContent=dancing?'B · STOP DANCING':'B · DANCE';
   const nearPool=active&&floor===1&&Math.hypot(lx-3,lz+.3)<5,nearDarts=active&&floor===1&&Math.hypot(lx+18,lz+5.8)<4;
   gameButton.style.display=nearPool||nearDarts?'block':'none';gameButton.textContent=nearPool?'PLAY 8-BALL POOL':'PLAY 301 DARTS';
   banner.style.display=active?'block':'none';banner.textContent='CLUB ZERCONDA · '+(floor?'UPSTAIRS · DARTS & POOL':'DANCE FLOOR & LOUNGE · STAIRS AT THE FAR END')+' · C to sit';
   social.update(dt);gameView.update();
  }
 };
}
