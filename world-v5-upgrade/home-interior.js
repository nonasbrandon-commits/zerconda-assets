import {createHomeKitchen} from './home-kitchen.js?v=20261119-home-repair-v129';
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
export function createHomeInterior(scene){
 const root=new THREE.Group();root.name='Spacious standard home interior';root.position.set(2300,0,2300);root.visible=false;root.userData.customInterior=true;scene.add(root);
 const mat=(color,r=.85)=>new THREE.MeshStandardMaterial({color,roughness:r});
 const wall=mat(0xe7e2d8),trim=mat(0xf4f0e7),floorMat=mat(0xa18a6b),wood=mat(0x795c40),fabric=mat(0x75877d),cushion=mat(0xb3b9ad),linen=mat(0xdbd5c6),metal=mat(0x323d3c,.5),counter=mat(0xc9c7bc,.5),glass=mat(0x9eb9bc,.22),concrete=mat(0xa8aaa4);
 function grain(){const c=document.createElement('canvas');c.width=c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#bca78c';ctx.fillRect(0,0,256,256);for(let i=0;i<160;i++){ctx.strokeStyle=`rgba(75,53,34,${.035+(i%7)*.012})`;ctx.beginPath();ctx.moveTo((i*31)%256,0);for(let y=0;y<=256;y+=8)ctx.lineTo((i*31)%256+Math.sin(y*.025+i)*2,y);ctx.stroke();}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(8,8);return t;}floorMat.map=grain();
 let floor=0,activeHome=null,lastStyle='',onStairs=false,lastPlayer={x:3.5,z:-6.8};const obstacles=[],seats=[],furnitureBlocks=[],doors=[];
 function box(w,h,d,x,y,z,material,parent=root,round=0){const geo=round?new RoundedBoxGeometry(w,h,d,2,round):new THREE.BoxGeometry(w,h,d);const mesh=new THREE.Mesh(geo,material);mesh.position.set(x,y,z);mesh.receiveShadow=true;mesh.castShadow=h>.2;parent.add(mesh);return mesh;}
 function block(x,z,w,d,level,kind='furniture'){obstacles.push({x,z,w,d,level,kind});}
 function roomWallX(x,z0,z1,level){box(.16,3.12,z1-z0,x,level*3.2+1.56,(z0+z1)/2,wall);block(x,(z0+z1)/2,.16,z1-z0,level,'wall');}
 function roomWallZ(z,x0,x1,level){box(x1-x0,3.12,.16,(x0+x1)/2,level*3.2+1.56,z,wall);block((x0+x1)/2,z,x1-x0,.16,level,'wall');}
 function barnDoor({name,x,z,level,orientation='z',width=1.3}){
  const y=level*3.2,base=orientation==='x'?-Math.PI/2:0,leafWidth=width+.12,travel=width+.22,slideSign=name==='Bedroom'?1:-1;
  const pivot=new THREE.Group();pivot.name=name+' barn sliding door';pivot.position.set(x+(orientation==='x'?(name==='Garage access'?.15:-.15):0),y,z+(orientation==='z'?.15:0));pivot.rotation.y=base;root.add(pivot);const closed=pivot.position.clone();
  box(leafWidth,2.45,.075,0,1.225,0,wood,pivot,.018);for(const yy of[.12,2.32])box(leafWidth-.08,.09,.045,0,yy,-.06,trim,pivot,.012);
  for(let i=1;i<7;i++)box(.008,2.20,.008,-leafWidth/2+i*leafWidth/7,1.22,-.042,metal,pivot);
  const brace=box(Math.hypot(leafWidth-.20,1.90),.085,.045,0,1.22,-.065,trim,pivot,.01);brace.rotation.z=Math.atan2(1.90,leafWidth-.20);
  for(const side of[-1,1])box(.035,.30,.055,leafWidth*.32,1.20,side*.08,metal,pivot,.01);
  const rail=new THREE.Group();rail.name=name+' barn door wall rail';rail.position.copy(closed);rail.rotation.y=base;root.add(rail);box(leafWidth+travel+.18,.055,.075,slideSign*travel/2,2.66,0,metal,rail,.012);
  for(const at of[slideSign*travel/2-(leafWidth+travel)/2,slideSign*travel/2+(leafWidth+travel)/2])box(.10,.10,.12,at,2.66,0,metal,rail,.01);
  for(const at of[-.47,.47]){box(.045,.20,.04,at,2.48,-.055,metal,pivot);const roller=new THREE.Mesh(new THREE.CylinderGeometry(.065,.065,.04,20),metal);roller.rotation.x=Math.PI/2;roller.position.set(at,2.64,0);pivot.add(roller);}
  for(const side of[-1,1]){if(orientation==='x')box(.14,2.51,.10,x,y+1.255,z+side*(width/2+.045),trim);else box(.10,2.51,.14,x+side*(width/2+.045),y+1.255,z,trim);}if(orientation==='x')box(.14,.12,width+.20,x,y+2.48,z,trim);else box(width+.20,.12,.14,x,y+2.48,z,trim);
  const source=document.createElement('button');source.style.display='none';document.body.appendChild(source);const door={name,x,z,level,width,leafWidth,pivot,base,closed,travel,slideSign,progress:0,open:false,source,orientation};source.onclick=()=>{door.open=!door.open;};registerTownAction(source,{id:'home-door-'+name.toLowerCase().replaceAll(' ','-'),priority:115,label:()=>`${door.open?'Close':'Open'} ${name.toLowerCase()} sliding door`,target:()=>({x:root.position.x+x,y:y+1.2,z:root.position.z+z})});doors.push(door);return door;
 }
 // Outer shell has a real garage opening and a separate pedestrian entrance.
 box(14.2,.16,15.4,0,-.08,0,floorMat);box(.18,6.4,15.4,-7.1,3.2,0,wall);box(.18,6.4,15.4,7.1,3.2,0,wall);box(14.2,6.4,.18,0,3.2,7.7,wall);
 box(.40,3.2,.18,-6.9,1.6,-7.7,wall);box(3.20,3.2,.18,.75,1.6,-7.7,wall);box(2.45,3.2,.18,5.875,1.6,-7.7,wall);box(5.8,.40,.18,-3.75,3,-7.7,wall);box(2.3,.60,.18,3.5,2.9,-7.7,wall);box(14.2,3.2,.18,0,4.8,-7.7,wall);
 // Garage: a clear 6.5m by 6.7m room with a 2.8m by 5.4m parking bay.
 box(6.55,.025,6.65,-3.65,.013,-4.25,concrete);roomWallZ(-.8,-7.0,-.35,0);roomWallX(-.35,-7.6,-2.8,0);roomWallX(-.35,-1.5,-.8,0);box(.16,.72,1.3,-.35,2.76,-2.15,wall);barnDoor({name:'Garage access',x:-.35,z:-2.15,level:0,orientation:'x'});
 const bay=mat(0xd6d4c5);for(const xx of [-5.2,-2.4])box(.045,.006,5.4,xx,.031,-4.2,bay);for(const zz of [-6.9,-1.5])box(2.8,.006,.045,-3.8,.031,zz,bay);
 const garagePivot=new THREE.Group();garagePivot.position.set(-3.75,2.8,-7.59);root.add(garagePivot);box(5.75,2.70,.08,0,-1.35,0,concrete,garagePivot);for(let i=0;i<7;i++)box(5.7,.025,.02,0,-.2-i*.37,.055,trim,garagePivot);for(let i=0;i<4;i++)box(1.05,.30,.025,-1.89+i*1.26,-.35,.055,glass,garagePivot);let garageOpen=false;const garageSource=document.createElement('button');garageSource.style.display='none';document.body.appendChild(garageSource);garageSource.onclick=()=>{garageOpen=!garageOpen;};registerTownAction(garageSource,{id:'home-garage-overhead',priority:110,label:()=>garageOpen?'Close garage door':'Open garage door',target:()=>({x:root.position.x-3.75,y:1.5,z:root.position.z-7.6})});
 // A short outside apron provides a natural view through the opened garage.
 box(5.8,.10,5,-3.75,-.05,-10.2,concrete);
 // The stair is set well away from the outer wall and ends at a full-depth landing.
 const stair={x:-6,width:2,start:.5,end:5.9,rise:3.2};
 function upperFloor(x0,x1,z0,z1){box(x1-x0,.20,z1-z0,(x0+x1)/2,3.1,(z0+z1)/2,floorMat);box(x1-x0,.025,z1-z0,(x0+x1)/2,2.984,(z0+z1)/2,trim);}
 // The only upper-floor opening is the new wall-side stairwell.
 upperFloor(-4.8,7.1,-7.7,7.7);upperFloor(-7.1,-4.8,-7.7,.5);upperFloor(-7.1,-4.8,5.9,7.7);
 for(let i=0;i<18;i++)box(2,(i+1)*3.2/18,.30,-6,(i+1)*3.2/36,.65+i*.30,wood);
 // Close the back and underside of the landing, tight against the west wall.
 box(2,3.2,1.8,-6,1.6,6.8,wall);block(-6,6.8,2,1.8,0,'stair base');box(.03,3.2,7.2,-7.005,1.6,4.1,wall);
 const rail=box(.07,.07,Math.hypot(5.4,3.2),-4.92,2.65,3.2,wood);rail.rotation.x=-Math.atan2(3.2,5.4);
 for(let i=0;i<18;i++){const z=.65+i*.30,base=(i+1)*3.2/18;box(.045,1.0,.045,-4.92,base+.50,z,metal);}
 const wallRail=box(.065,.065,Math.hypot(5.4,3.2),-6.95,2.65,3.2,wood);wallRail.rotation.x=-Math.atan2(3.2,5.4);
 function guard(x0,z0,x1,z1){const dx=x1-x0,dz=z1-z0,len=Math.hypot(dx,dz),n=Math.ceil(len/.35);for(let i=0;i<=n;i++){const t=i/n;box(.05,1,.05,x0+dx*t,3.7,z0+dz*t,metal);}const r=box(len+.10,.08,.09,(x0+x1)/2,4.23,(z0+z1)/2,wood);r.rotation.y=-Math.atan2(dz,dx);block((x0+x1)/2,(z0+z1)/2,Math.abs(dx)+.06,Math.abs(dz)+.06,1,'guard');}
 guard(-4.8,.5,-4.8,5.9);guard(-7.0,.5,-4.8,.5);
 // Clear headroom over the flight and a complete upstairs landing.
 box(14.2,.18,15.4,0,6.49,0,trim);
 // One spacious bedroom; the bathroom and landing have complete walls and doors.
 roomWallX(.3,-7.6,.85,1);roomWallX(.3,2.15,7.6,1);box(.16,.72,1.3,.3,5.96,1.5,wall);barnDoor({name:'Bedroom',x:.3,z:1.5,level:1,orientation:'x'});
 roomWallZ(-.75,-7.0,-2.55,1);roomWallZ(-.75,-1.25,.3,1);box(1.3,.72,.16,-1.9,5.96,-.75,wall);barnDoor({name:'Bathroom',x:-1.9,z:-.75,level:1});
 for(const yy of [1.8,4.95])for(const xx of [-5.5,3.8]){box(2.0,1.65,.04,xx,yy,7.58,glass);for(const side of [-1,1])box(.08,1.8,.12,xx+side*1.04,yy,7.5,trim);box(2.18,.09,.12,xx,yy-.87,7.5,trim);box(.06,1.65,.08,xx,yy,7.47,trim);}
 for(const side of [-1,1])for(const zz of [-3.5,4.5]){box(.04,1.5,1.8,side*6.98,4.9,zz,glass);box(.07,.09,1.95,side*6.93,4.1,zz,trim);}
 const living=new THREE.Group(),dining=new THREE.Group(),bedrooms=new THREE.Group();root.add(living,dining,bedrooms);const shared=new Set([wall,trim,floorMat,wood,fabric,cushion,linen,metal,counter,glass,concrete]);
 function clear(group){group.traverse(o=>{if(o.isMesh){o.geometry.dispose();if(!shared.has(o.material))o.material.dispose();}});group.clear();}
 function furnitureBlock(x,z,w,d,level){furnitureBlocks.push({x,z,w,d,level});}
 function sofa(style){clear(living);const xx=3.8,zz=-2.0,cozy=style==='cozy',w=cozy?3.5:3;box(w,.28,1.1,xx,.36,zz,wood,living,.07);box(w,.72,.24,xx,.87,zz-.5,fabric,living,.08);for(const side of [-1,1])box(.22,.58,1.08,xx+side*(w/2-.1),.69,zz,fabric,living,.075);for(let i=0;i<3;i++)box((w-.5)/3-.04,.18,.85,xx-w*.31+i*w*.31,.59,zz+.06,fabric,living,.06);if(cozy)box(1.1,.45,1.4,xx-w*.32,.43,zz+.8,fabric,living,.08);if(style==='modern')box(.65,.12,.4,xx+.7,.78,zz-.17,cushion,living,.045);box(1.7,.10,.9,xx,.43,zz+1.65,wood,living,.03);for(const side of [-1,1])box(.08,.38,.75,xx+side*.65,.19,zz+1.65,metal,living);box(2.6,.36,.55,.6,.25,-6.85,wood,living,.03);box(2.05,1.15,.06,.6,1.4,-7.18,metal,living);box(1.92,1.03,.015,.6,1.4,-7.135,mat(0x35434a,.5),living);box(3.8,.015,3.25,3.8,.015,-.8,mat(0xb6b5a6),living);furnitureBlock(xx,zz,w,1.1,0);if(cozy)furnitureBlock(xx-w*.32,zz+.8,1.1,1.4,0);furnitureBlock(xx,zz+1.65,1.7,.9,0);furnitureBlock(.6,-6.85,2.6,.55,0);seats.push({x:xx,z:zz+.12,facing:0,sitHeight:.68,kind:'home sofa'});}
 function table(style){clear(dining);if(style==='round'){const t=new THREE.Mesh(new THREE.CylinderGeometry(1.0,1.0,.12,40),wood);t.position.set(3.9,.8,4.5);dining.add(t);box(.25,.75,.25,3.9,.375,4.5,metal,dining);}else{box(2.1,.12,1.25,3.9,.8,4.5,wood,dining,.035);for(const sx of [-1,1])for(const sz of [-1,1])box(.08,.74,.08,3.9+sx*.82,.37,4.5+sz*.45,wood,dining);}for(const [dx,dz,ry]of [[-1.5,0,Math.PI/2],[1.5,0,-Math.PI/2],[0,-1.3,0],[0,1.3,Math.PI]]){const g=new THREE.Group();g.position.set(3.9+dx,0,4.5+dz);g.rotation.y=ry;dining.add(g);seats.push({x:3.9+dx,z:4.5+dz,facing:ry,sitHeight:.54,level:0,kind:'dining chair'});box(.6,.12,.6,0,.48,0,fabric,g,.035);box(.6,.7,.10,0,.85,-.27,wood,g,.03);for(const sx of [-1,1])for(const sz of [-1,1])box(.055,.45,.055,sx*.23,.225,sz*.23,wood,g);}furnitureBlock(3.9,4.5,3.2,3.3,0);}
 function bed(style){clear(bedrooms);const g=new THREE.Group();g.position.set(5.52,3.2,1.0);g.rotation.y=-Math.PI/2;bedrooms.add(g);const w=style==='premium'?2.2:1.75;box(w+.15,.28,2.9,0,.25,0,wood,g,.04);box(w,.28,2.75,0,.51,0,linen,g,.09);box(w,.06,1.65,0,.69,.45,fabric,g,.04);box(w+.16,.9,.12,0,.68,-1.42,wood,g,.035);for(const side of [-1,1]){box(w*.39,.13,.55,side*w*.24,.73,-.85,cushion,g,.06);box(.58,.65,.58,side*(w*.5+.55),.325,-1,wood,g,.02);}furnitureBlock(5.52,1.0,3,w+.2,1);for(const side of [-1,1])furnitureBlock(6.52,1.0+side*(w*.5+.55),.58,.58,1);box(.65,2.15,3.3,.80,4.275,-4.5,wood,bedrooms,.03);for(const zz of [-5.3,-3.7])box(.06,.25,.04,1.16,4.3,zz,metal,bedrooms);furnitureBlock(.8,-4.5,.65,3.3,1);box(.65,.9,2.0,6.45,3.65,-2.5,wood,bedrooms,.03);box(.75,.12,2.05,6.40,4.13,-2.5,counter,bedrooms);furnitureBlock(6.4,-2.5,.8,2.05,1);box(.6,.15,.6,5.4,3.7,-2.5,fabric,bedrooms,.04);box(.12,.65,.6,5.1,4.0,-2.5,wood,bedrooms);furnitureBlock(5.4,-2.5,.65,.65,1);seats.push({x:5.4,z:-2.5,facing:Math.PI/2,sitHeight:.575,level:1,kind:'vanity chair'});}
 const kitchen=createHomeKitchen(root,{getHome:()=>activeHome,getFloor:()=>floor});
 for(const item of kitchen.solids)block(item.x,item.z,item.w,item.d,0,'kitchen');
 // Larger bathroom: tub, separate shower, toilet and vanity, with a clear doorway.
 box(1.7,.55,3.0,-6.0,3.5,-5.5,trim,root,.14);box(1.5,.08,2.7,-6.0,3.82,-5.5,glass,root,.12);block(-6.0,-5.5,1.7,3,1);box(2.2,.68,.65,-2.9,3.54,-7.0,wood,root,.03);box(2.3,.13,.74,-2.9,3.94,-7.0,counter,root,.06);box(1.6,1.05,.04,-2.9,4.9,-7.57,glass);block(-2.9,-7,2.3,.74,1);const toilet=new THREE.Group();toilet.position.set(-5.5,3.2,-1.3);toilet.rotation.y=Math.PI;root.add(toilet);box(.65,.48,.8,0,.25,0,trim,toilet,.12);box(.65,.65,.15,0,.6,-.38,trim,toilet,.04);block(-5.5,-1.3,.65,.8,1);box(1.65,.09,1.65,-.85,3.25,-5.8,counter);box(.05,1.9,1.65,-1.67,4.2,-5.8,glass);block(-.85,-5.8,1.65,1.65,1);
 const lamp=new THREE.MeshStandardMaterial({color:0xfff3d8,emissive:0xffdf9e,emissiveIntensity:.55,roughness:.4});for(const yy of [2.94,6.34])for(const zz of [-3,4.5])box(.52,.06,.52,1,yy,zz,lamp);for(const [yy,zz]of [[2.6,0],[5.8,2]]){const light=new THREE.PointLight(0xffefd8,16,20,1.7);light.position.set(1,yy,zz);root.add(light);}
 function configure(config={}){kitchen.configure?.(config);wall.color.set(config.wall||'#e7e2d8');fabric.color.set(config.fabric||'#75877d');wood.color.set(config.wood||'#795c40');const style=[config.sofa||'standard',config.dining||'standard',config.bed||'standard'].join(':');if(style!==lastStyle){seats.length=0;furnitureBlocks.length=0;sofa(config.sofa||'standard');table(config.dining||'standard');bed(config.bed||'standard');lastStyle=style;}}
 configure();
 function local(x,z){return {x:x-root.position.x,z:z-root.position.z};}
 function inStairLane(p){return p.x> -6.7&&p.x< -5.18;}
 function stairZone(p){return inStairLane(p)&&p.z>=.5&&p.z<=5.9;}
 function stepHeight(z){return Math.min(18,Math.max(0,Math.floor((z-.5)/.3)+1))*3.2/18;}
 function updateLevel(p){if(onStairs){if(p.z>=5.9){floor=1;onStairs=false;}else if(p.z<=.5){floor=0;onStairs=false;}}else if(stairZone(p)){if((floor===0&&lastPlayer.z<=.9&&p.z<=.9)||(floor===1&&lastPlayer.z>=5.45&&p.z>=5.45))onStairs=true;}lastPlayer={x:p.x,z:p.z};}
 // Sampling support under the feet must never change which storey the player occupies.
 function heightAt(x,z){const p=local(x,z);if(onStairs&&inStairLane(p)){if(p.z>=5.9)return 3.2;if(p.z<=.5)return 0;return stepHeight(p.z);}if(stairZone(p)&&((floor===0&&lastPlayer.z<=.9&&p.z<=.9)||(floor===1&&lastPlayer.z>=5.45&&p.z>=5.45)))return stepHeight(p.z);return floor*3.2;}
 function doorBlocks(door,p){if(door.level!==floor)return false;const dx=p.x-door.pivot.position.x,dz=p.z-door.pivot.position.z,angle=door.base,along=dx*Math.cos(angle)-dz*Math.sin(angle),across=dx*Math.sin(angle)+dz*Math.cos(angle);return Math.abs(along)<door.leafWidth/2+.18&&Math.abs(across)<.23;}

 function contains(x,z){const p=local(x,z);if(Math.abs(p.x)>6.7||Math.abs(p.z)>7.3)return false;
 if(onStairs){if(inStairLane(p)&&p.z>=.1&&p.z<=6.4)return true;if(p.z>.5&&p.z<5.9)return false;}
 if(stairZone(p)){return floor===0?lastPlayer.z<=.9&&p.z<=.9:lastPlayer.z>=5.45&&p.z>=5.45;}
 if(floor===1&&p.x< -4.8&&p.z>.5&&p.z<5.9)return false;
 if(floor===0&&p.x< -4.8&&p.z>.5&&p.z<7.6)return false;
 if(doors.some(d=>doorBlocks(d,p)))return false;if(floor===0&&kitchen.blocks(p.x,p.z))return false;return ![...obstacles,...furnitureBlocks].some(o=>o.level===floor&&Math.abs(p.x-o.x)<o.w/2+.18&&Math.abs(p.z-o.z)<o.d/2+.18);}
 function update(x,z,dt=.016){const p=local(x,z);updateLevel(p);kitchen.update(dt,x,z);for(const d of doors){d.progress=THREE.MathUtils.damp(d.progress,d.open?1:0,9,dt);d.pivot.position.copy(d.closed);if(d.orientation==='x')d.pivot.position.z+=d.slideSign*d.travel*d.progress;else d.pivot.position.x+=d.slideSign*d.travel*d.progress;d.source.style.display=activeHome&&d.level===floor&&Math.hypot(p.x-d.x,p.z-d.z)<2.35?'block':'none';}garagePivot.rotation.x=THREE.MathUtils.damp(garagePivot.rotation.x,garageOpen?-Math.PI/2:0,7,dt);garageSource.style.display=activeHome&&floor===0&&p.x<-.7&&p.z< -4.6?'block':'none';}
 return {root,x:root.position.x,z:root.position.z,doors,stair,kitchen,get panelOpen(){return kitchen.panelOpen},get onStairs(){return onStairs},garageBay:{x:-3.8,z:-4.2,width:2.8,length:5.4},get floor(){return floor},get garageOpen(){return garageOpen},show(home,config){activeHome=home;floor=0;onStairs=false;lastPlayer={x:3.5,z:-6.8};for(const d of doors){d.open=false;d.progress=0;d.pivot.position.copy(d.closed);d.pivot.rotation.y=d.base;}garageOpen=!!home.garageOpen;garagePivot.rotation.x=garageOpen?-Math.PI/2:0;configure(config);kitchen.show();root.visible=true;},hide(){kitchen.hide();root.visible=false;activeHome=null;for(const d of doors)d.source.style.display='none';garageSource.style.display='none';},configure,update,heightAt,contains,clampCamera(p){p.x=THREE.MathUtils.clamp(p.x,root.position.x-6.7,root.position.x+6.7);p.z=THREE.MathUtils.clamp(p.z,root.position.z-7.2,root.position.z+7.2);const cameraFloor=onStairs?stepHeight(lastPlayer.z):floor*3.2;p.y=THREE.MathUtils.clamp(p.y,cameraFloor+1.4,cameraFloor+2.6);},nearestSeat(x,z){let best=null,d=2;for(const seat of seats){if((seat.level??0)!==floor)continue;const dd=Math.hypot(x-(root.position.x+seat.x),z-(root.position.z+seat.z));if(dd<d){d=dd;best={...seat,sitHeight:seat.sitHeight+(seat.level??0)*3.2,x:root.position.x+seat.x,z:root.position.z+seat.z};}}return best;}};
}

