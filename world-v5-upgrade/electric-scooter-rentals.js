import {attachReferenceProp} from './reference-props.js?v=20261120-reference-props-v180';
import {createScooterStorefront} from './scooter-storefront.js?v=20261120-scooter-shop-v180';
import {createRealisticHuman} from './player-human.js?v=20261119-profile-v136';
import * as THREE from 'three';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export function createScooterRentals(scene,{getPlayer,getYaw,onMessage=()=>{},onStop=()=>{},onTeleport=()=>{},getHeight=()=>0,canInteract=()=>true,canMove=()=>true,now=()=>Date.now()}={}){
 const root=new THREE.Group();root.name='Corner electric scooter rentals';root.userData.customInterior=true;scene.add(root);const shop={x:126,z:69,w:18,d:14},desk={x:126,z:77.5},key='zerconda-scooter-fleet-v1';let active=null,speed=0,clock=0;
 const M=(c,r=.8)=>new THREE.MeshStandardMaterial({color:c,roughness:r});const green=M(0x49776c),white=M(0xe7e4d6),metal=M(0x364542,.5),rubber=M(0x242d2c),stone=M(0xb7b5a4),glass=new THREE.MeshPhysicalMaterial({color:0x91b8bc,roughness:.18,transparent:true,opacity:.45});
 function box(g,w,h,d,x,y,z,m){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;}function beam(g,a,b,r,m){const v=new THREE.Vector3(...a),u=new THREE.Vector3(...b),dir=u.clone().sub(v),o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,dir.length(),10),m);o.position.copy(v.add(u).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());g.add(o);return o;}
 function sign(label,x,y,z,w,h){const c=document.createElement('canvas');c.width=1024;c.height=256;const a=c.getContext('2d');a.fillStyle='#254940';a.fillRect(0,0,1024,256);a.fillStyle='#f1edd6';a.textAlign='center';a.textBaseline='middle';a.font='bold 60px system-ui';a.fillText(label,512,128,990);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));o.position.set(x,y,z);root.add(o);}
 const storefront=createScooterStorefront(root);
 // Original unbranded scooter geometry, built at human scale.
 function model(i){
 const g=new THREE.Group();g.name='Black and neon green electric scooter';const paint=M(0x151c20,.3),rim=M(0x222c30,.36),chrome=M(0xb9c2c5,.35),glow=new THREE.MeshStandardMaterial({color:0x74ff12,emissive:0x45ff00,emissiveIntensity:1.6,roughness:.35});
 const ring=(radius,tube,x,y,z,mat)=>{const o=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,8,32),mat);o.rotation.y=Math.PI/2;o.position.set(x,y,z);g.add(o);return o;};
 for(const z of [-.56,.58]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.205,.205,.13,32),rubber);w.rotation.z=Math.PI/2;w.position.set(0,.205,z);g.add(w);for(const side of [-1,1]){ring(.151,.009,side*.071,.205,z,glow);const disc=new THREE.Mesh(new THREE.CylinderGeometry(.112,.112,.009,28),chrome);disc.rotation.z=Math.PI/2;disc.position.set(side*.078,.205,z);g.add(disc);for(let k=0;k<8;k++){const t=k*Math.PI/4;beam(g,[side*.086,.205,z],[side*.086,.205+Math.sin(t)*.13,z+Math.cos(t)*.13],.013,rim);}}
 const fender=new THREE.Mesh(new THREE.TorusGeometry(.229,.035,8,24,Math.PI),paint);fender.rotation.y=Math.PI/2;fender.position.set(0,.205,z);g.add(fender);}
 box(g,.34,.13,.95,0,.27,-.02,paint);box(g,.30,.025,.84,0,.347,-.03,rubber);for(const x of [-.177,.177])box(g,.012,.028,.80,x,.29,-.03,glow);
 beam(g,[0,.25,.58],[0,1.39,.39],.063,paint);beam(g,[-.34,1.46,.37],[.34,1.46,.37],.029,paint);for(const x of [-.29,.29]){beam(g,[x-.10,1.46,.37],[x+.10,1.46,.37],.044,rubber);beam(g,[x-.09,1.40,.44],[x+.07,1.40,.46],.013,metal);}
 for(const x of [-.085,.085])beam(g,[x,.205,.58],[x,.50,.54],.033,paint);box(g,.16,.12,.12,0,1.43,.40,paint);box(g,.115,.075,.016,0,1.43,.47,new THREE.MeshStandardMaterial({color:0xf1fbff,emissive:0xc3eeff,emissiveIntensity:2}));
 beam(g,[.048,.52,.54],[.048,1.24,.415],.012,glow);beam(g,[0,.28,-.35],[.17,.015,-.39],.016,metal);box(g,.08,.028,.03,0,.40,-.78,new THREE.MeshStandardMaterial({color:0xee2626,emissive:0xc90000}));root.add(g);attachReferenceProp(g,'scooter');return g;
 }

 const fleet=Array.from({length:8},(_,i)=>({id:i,x:118.0+i*1.10,z:77.5,angle:Math.PI/3,parked:false,model:model(i)}));function nextPickup(t){const d=new Date(t);d.setHours(4,0,0,0);if(d.getTime()<=t)d.setDate(d.getDate()+1);return d.getTime();}let pickupAt=nextPickup(now());
 try{const s=JSON.parse(localStorage.getItem(key)||'null');if(s?.fleet&&Number.isFinite(s.pickupAt)){pickupAt=s.pickupAt;for(const p of s.fleet){const a=fleet[p.id];if(a&&Number.isFinite(p.x)&&Number.isFinite(p.z)&&p.x> -444&&p.x<570&&p.z> -278&&p.z<171){a.x=p.x;a.z=p.z;a.angle=Number(p.angle)||0;a.parked=!!p.parked;}}for(const a of fleet)if(!a.parked){a.x=118+a.id*1.10;a.z=77.5;a.angle=Math.PI/3;}}}catch{}
 function save(){try{localStorage.setItem(key,JSON.stringify({pickupAt,fleet:fleet.map(({id,x,z,angle,parked})=>({id,x,z,angle,parked:parked||active?.id===id}))}));}catch{}}
 function collect(){for(const a of fleet)if(a!==active){a.x=118.0+a.id*1.10;a.z=77.5;a.angle=Math.PI/3;a.parked=false;}pickupAt=nextPickup(now());save();}
 function sync(){for(const a of fleet){a.model.position.set(a.x,getHeight(a.x,a.z),a.z);a.model.rotation.y=a.angle;}}
 function ride(a){if(!a||active||!canInteract())return false;active=a;speed=0;a.parked=false;a.angle=getYaw();const p=getPlayer();p.x=a.x;p.z=a.z;onStop();onMessage('Scooter ready. Hold left mouse to ride and drag to steer; release to coast. Mouse wheel or W/S also moves. End the ride wherever you stop.');save();return true;}
 function end(){if(!active)return false;const a=active,p=getPlayer(),dx=Math.cos(a.angle),dz=-Math.sin(a.angle);for(const side of [1,-1]){const xx=a.x+dx*.7*side,zz=a.z+dz*.7*side;if(canMove(xx,zz)){p.x=xx;p.z=zz;break;}}a.parked=true;active=null;speed=0;onStop();save();onMessage('Ride ended. Leave the scooter here; it returns to the shop after two minutes once out of view.');return true;}
 const buttons=[];function action(id,label,target,visible,fn,priority=115){const b=document.createElement('button');b.style.display='none';document.body.appendChild(b);b.onclick=fn;registerTownAction(b,{id:'scooter-'+id,label,target:()=>({...target(),y:1.1}),priority});buttons.push({b,visible:id==='enter'||id==='exit'?()=>false:visible});}
 const room=new THREE.Group();room.name='Scooter rental shop interior';room.position.set(5600,0,1200);room.visible=false;room.userData.customInterior=true;scene.add(room);let inside=false;
 const roomFloor=.10,entry={x:5600,z:1204},counter={x:5600,z:1197.6};
 box(room,14,.20,12,0,0,0,stone);box(room,14,3.5,.20,0,1.85,-6,white);for(const x of [-7,7])box(room,.20,3.5,12,x,1.85,0,white);box(room,14,.16,12,0,3.65,0,white);box(room,14,3.5,.20,0,1.85,6,glass);
 box(room,5,1.0,1.15,0,.60,-3.2,green);box(room,5.2,.10,1.3,0,1.15,-3.2,metal);box(room,.46,.32,.32,1.4,1.36,-3.2,metal);
 const attendant=createRealisticHuman({shirt:'#49776c',pants:'#263447'});attendant.root.position.set(0,roomFloor,-4.6);room.add(attendant.root);attendant.readyPromise.then(()=>attendant.update(.016,0));
 const light=new THREE.PointLight(0xfff1d6,10,18,2);light.position.set(0,3.1,0);room.add(light);room.add(new THREE.HemisphereLight(0xffffff,0x79735c,1.2));
 for(let i=0;i<4;i++){const display=model(i);room.add(display);display.position.set(i<2?-6.65:6.65,.8,i%2?1.5:-1.6);display.rotation.y=i<2?Math.PI/2:-Math.PI/2;box(room,.25,.08,1.6,i<2?-6.7:6.7,.75,i%2?1.5:-1.6,metal);}
 for(let i=0;i<6;i++){const x=-4.3+i*1.7;box(room,1.45,.07,.48,x,2.0,-5.6,metal);const helmet=new THREE.Mesh(new THREE.SphereGeometry(.22,20,12,0,Math.PI*2,0,Math.PI/2),M([0x1e2529,0x80ef14,0xe9e7da][i%3],.3));helmet.position.set(x,2.07,-5.6);room.add(helmet);beam(room,[x-.16,2.07,-5.6],[x,1.85,-5.6],.012,rubber);beam(room,[x+.16,2.07,-5.6],[x,1.85,-5.6],.012,rubber);}
 const greeting=new Audio(new URL('./assets/scooter-attendant-welcome-v180.mp3',import.meta.url).href);greeting.preload='auto';
 function teleport(x,z,heading){const p=getPlayer();p.x=x;p.z=z;onStop();onTeleport(x,inside?roomFloor:.03,z,heading);}
 function enter(){if(active||!canInteract())return false;inside=true;room.visible=true;teleport(entry.x,entry.z,Math.PI);onMessage('Welcome! Can we rent you a Scooter?');greeting.currentTime=0;greeting.play().catch(()=>{});return true;}
 function leave(){if(!inside)return false;inside=false;room.visible=false;greeting.pause();teleport(129,79.3,0);return true;}
 function rent(){if(!inside||active)return false;const a=fleet.find(a=>!a.parked);if(!a){onMessage('All scooters are out. Please return after collection.');return false;}leave();a.x=129;a.z=80.7;teleport(a.x,a.z,0);return ride(a);}
 action('enter','Enter scooter rental shop',()=>({x:129,z:76.8}),()=>!inside&&!active&&canInteract()&&Math.hypot(getPlayer().x-129,getPlayer().z-76.8)<3.6,enter);
 action('rent','Rent a scooter · Ride outside',()=>counter,()=>inside&&!active&&Math.hypot(getPlayer().x-counter.x,getPlayer().z-counter.z)<4,rent,150);
 action('exit','Leave scooter shop',()=>entry,()=>inside&&Math.hypot(getPlayer().x-entry.x,getPlayer().z-entry.z)<3.5,leave,140);

 for(const a of fleet)action('ride-'+a.id,()=>a.parked?'Ride parked scooter':'Ride electric scooter',()=>a,()=>!inside&&!active&&canInteract()&&Math.hypot(getPlayer().x-a.x,getPlayer().z-a.z)<2.2,()=>ride(a),110);
 action('end','End ride · Leave scooter here',()=>getPlayer(),()=>!!active,end,150);
 function blocks(x,z){return Math.abs(x-shop.x)<shop.w/2+.35&&Math.abs(z-shop.z)<shop.d/2+.35;}
 function drive(dt,forward,yaw){if(!active)return;active.angle=yaw;speed=THREE.MathUtils.damp(speed,forward>0?6.2:forward<0?-1.8:0,forward?3.3:1.8,dt);const travel=speed*dt,n=Math.max(1,Math.ceil(Math.abs(travel)/.15));for(let i=0;i<n;i++){const xx=active.x+Math.sin(yaw)*travel/n,zz=active.z+Math.cos(yaw)*travel/n;if(canMove(xx,zz)){active.x=xx;active.z=zz;}else{speed=0;break;}}const p=getPlayer();p.x=active.x;p.z=active.z;sync();clock+=dt;if(clock>2){clock=0;save();}}
 function update(dt=0){if(!inside&&!active&&canInteract()&&Math.abs(getPlayer().x-129)<1.15&&getPlayer().z>76.35&&getPlayer().z<77.15)enter();if(inside&&Math.abs(getPlayer().x-5600)<1.1&&getPlayer().z>1205.1){leave();}if(inside){attendant.update(Math.min(dt,.1),0);if(Math.abs(getPlayer().x-5600)>10||Math.abs(getPlayer().z-1200)>9){inside=false;room.visible=false;greeting.pause();}}sync();for(const o of buttons)o.b.style.display=o.visible()?'block':'none';}
 if(now()>=pickupAt)collect();sync();
 return {root,room,storefront,shop,desk,fleet,get activeScooter(){return active},returnUnused(a,h){if(a===active)return;Object.assign(a,{x:h.x,z:h.z,angle:h.angle,parked:false});sync();save();},enter,leave,rent,get inside(){return inside},canWalkInterior(x,z){return Math.abs(x-5600)<6.6&&Math.abs(z-1200)<5.6&&!(Math.abs(x-5600)<2.9&&z<1197.9);},clampCamera(p){if(inside){p.x=THREE.MathUtils.clamp(p.x,5593.5,5606.5);p.z=THREE.MathUtils.clamp(p.z,1194.5,1205.5);p.y=THREE.MathUtils.clamp(p.y,.8,3.35);}},update,drive,blocks,ride,end,collect,heightAt(x,z){
  if(inside&&Math.abs(x-5600)<8&&Math.abs(z-1200)<7)return roomFloor;
  // Physical slab tops: foundation .025+.175, porch .09+.06, court -.02+.05.
  if(Math.abs(x-126)<=9.2&&Math.abs(z-69)<=7.2)return .20;
  if(Math.abs(x-126)<=9&&z>=76.2&&z<=82)return .03;
  return null;
 },stop(){speed=0;},get riding(){return !!active},get riderY(){return active?getHeight(active.x,active.z)+.31:0},get heading(){return active?.angle||0},get pickupAt(){return pickupAt},get speed(){return speed}};
}
