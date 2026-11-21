import {installCabBranding} from './cab-branding.js?v=20261121-cab-signs-v189';
import {vehicleDescriptor,vehiclePoseBlocked} from './vehicle-collision.js?v=20261121-town-v191';
import * as THREE from 'three';
import {GLTFLoader}from'three/addons/loaders/GLTFLoader.js';
import{AREA_DESTINATIONS}from'./area-travel.js?v=20261121-town-v191';
import{registerTownAction}from'./town-interactions.js?v=20261117-touch-v75';
export function createCabRoadNetwork(){const points=[],edges=[],lookup=new Map();function node(x,z){const key=x+','+z;if(!lookup.has(key)){lookup.set(key,points.length);points.push({x,z});}return lookup.get(key);}function edge(a,b){const i=node(...a),j=node(...b);edges.push({i,j,length:Math.hypot(a[0]-b[0],a[1]-b[1])});}function road(ps){for(let i=1;i<ps.length;i++)edge(ps[i-1],ps[i]);}
 for(const z of[-283,-96,0,96])road([-418,-96,0,96,542].map(x=>[x,z]));for(const x of[-96,0,96])road([-283,-96,0,96,169].map(z=>[x,z]));road([-554,-283,-96,0,96,169].map(z=>[-418,z]));road([[-418,-554],[465,-554],[542,-554]]);road([[542,-554],[542,-283]]);road([[465,-554],[465,-1040]]);
 function nearest(p){let best;for(const e of edges){const a=points[e.i],b=points[e.j],dx=b.x-a.x,dz=b.z-a.z,t=THREE.MathUtils.clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(e.length*e.length),0,1),q={x:a.x+dx*t,z:a.z+dz*t},d=Math.hypot(q.x-p.x,q.z-p.z);if(!best||d<best.d)best={...q,d,e,t};}return best;}
 function route(from,to,heading=null){const s=nearest(from),t=nearest(to),P=[...points,s,t],S=P.length-2,T=P.length-1,adj=P.map(()=>[]),connect=(i,j,w)=>{adj[i].push([j,w]);adj[j].push([i,w]);};for(const e of edges)connect(e.i,e.j,e.length);for(const[q,k]of[[s,S],[t,T]]){let allowed=null;if(k===S&&heading!==null&&q.t*q.e.length>2&&(1-q.t)*q.e.length>2){const a=points[q.e.i],b=points[q.e.j],dot=(Math.sin(heading)*(b.x-a.x)+Math.cos(heading)*(b.z-a.z))/q.e.length;if(Math.abs(dot)>.5)allowed=dot>0?q.e.j:q.e.i;}if(allowed===null||allowed===q.e.i)connect(k,q.e.i,q.e.length*q.t);if(allowed===null||allowed===q.e.j)connect(k,q.e.j,q.e.length*(1-q.t));}if(s.e===t.e&&(heading===null||((t.x-s.x)*Math.sin(heading)+(t.z-s.z)*Math.cos(heading))>=0))connect(S,T,s.e.length*Math.abs(s.t-t.t));const dist=P.map(()=>Infinity),prev=[];dist[S]=0;const open=new Set(P.map((_,i)=>i));while(open.size){let u=-1;for(const k of open)if(u<0||dist[k]<dist[u])u=k;if(u===T||!Number.isFinite(dist[u]))break;open.delete(u);for(const[v,w]of adj[u])if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;prev[v]=u;}}if(!Number.isFinite(dist[T]))return null;const result=[];for(let u=T;u!==undefined;u=prev[u]){result.unshift(P[u]);if(u===S)break;}return result.filter((p,i)=>!i||Math.hypot(p.x-result[i-1].x,p.z-result[i-1].z)>.1);}
 return{points,edges,nearest,route};}
export function lanePath(route,start,heading=0){
 if(!route||route.length<2)return null;
 const lane=2.7,ps=[],turns=[],V=p=>new THREE.Vector3(p.x,0,p.z),direction=(a,b)=>V(b).sub(V(a)).normalize(),right=d=>new THREE.Vector3(d.z,0,-d.x);
 const first=direction(route[0],route[1]),forward=new THREE.Vector3(Math.sin(heading),0,Math.cos(heading));
 ps.push(V(start));
 function uTurn(entry,dir,radius){
  const begin=ps.length-1,left=right(dir).negate();
  for(let j=1;j<=32;j++){const angle=j/32*Math.PI;ps.push(entry.clone().addScaledVector(dir,Math.sin(angle)*radius).addScaledVector(left,(1-Math.cos(angle))*radius));}
  turns.push({begin,end:ps.length-1});
 }
 for(let i=0;i<route.length;i++){
  const p=V(route[i]),before=i?direction(route[i-1],route[i]):first,after=i<route.length-1?direction(route[i],route[i+1]):before;
  if(i===0){
   // Reverse into the other lane with a forward semicircle, never a pivot.
   if(forward.dot(first)<-.9){
    const lateral=V(start).sub(p).dot(right(forward)),radius=(lateral+lane)/2;
    if(radius>1.2&&radius<5){uTurn(ps[0],forward,radius);}
   }
   const lead=Math.min(14,p.distanceTo(V(route[1]))*.45),offset=p.clone().addScaledVector(right(after),lane).addScaledVector(after,lead),current=ps.at(-1);
   if(offset.distanceTo(current)>.5){const dir=ps.length>1?first:forward,control=current.clone().addScaledVector(dir,Math.max(1,lead*.4)),turn=new THREE.CubicBezierCurve3(current,control,offset.clone().addScaledVector(after,-lead*.4),offset);for(let j=1;j<=16;j++)ps.push(turn.getPoint(j/16));}else ps.push(offset);
   continue;
  }
  if(i===route.length-1){ps.push(p.clone().addScaledVector(right(before),lane));continue;}
  const r=Math.min(6,p.distanceTo(V(route[i-1]))*.35,p.distanceTo(V(route[i+1]))*.35),entry=p.clone().addScaledVector(before,-r).addScaledVector(right(before),lane);
  ps.push(entry);
  if(before.dot(after)<-.9){uTurn(entry,before,lane);continue;}
  const exit=p.clone().addScaledVector(after,r).addScaledVector(right(after),lane),control=p.clone().addScaledVector(right(before).add(right(after)),lane*.5),curve=new THREE.QuadraticBezierCurve3(entry,control,exit);
  for(let j=1;j<=8;j++)ps.push(curve.getPoint(j/8));
 }
 const points=ps.filter((p,i)=>!i||p.distanceTo(ps[i-1])>.01),lengths=[0];
 for(let i=1;i<points.length;i++)lengths.push(lengths[i-1]+points[i].distanceTo(points[i-1]));
 const uTurns=turns.map(t=>({start:ps[t.begin],end:ps[t.end]}));
 return{points,lengths,uTurns,length:lengths.at(-1),sample(distance){let i=1;while(i<lengths.length-1&&lengths[i]<distance)i++;const a=points[i-1],b=points[i],t=THREE.MathUtils.clamp((distance-lengths[i-1])/Math.max(.001,lengths[i]-lengths[i-1]),0,1);return a.clone().lerp(b,t);}};
}
export function createZCabs(scene,{getPlayer,onHonk=()=>{},onPickupState=()=>{},canRequest=()=>true,getHeight=()=>.02,canUse=()=>true,getVehicles=()=>[],getPedestrians=()=>[],onStop=()=>{},onMessage=()=>{},onAlight=()=>{}}){const network=createCabRoadNetwork(),vehicles=[],root=new THREE.Group();root.name='Two roaming Z Cabs';scene.add(root);let active=null,selected=null,requested=null,calling=false,time=0;const cruises=[[{x:0,z:154},{x:96,z:96},{x:96,z:-96},{x:-96,z:-96},{x:-96,z:96},{x:0,z:96}],[{x:-96,z:48},{x:-418,z:96},{x:-418,z:-283},{x:96,z:-283},{x:96,z:0},{x:-96,z:0}]];
 const panel=document.createElement('section');panel.id='z-cab-destinations';panel.style.cssText='display:none;position:fixed;z-index:21000;left:50%;top:50%;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 24px));max-height:80dvh;box-sizing:border-box;overflow:auto;padding:20px;border:1px solid #d9b340;border-radius:14px;background:#142c35f7;color:#fff7db;font:16px system-ui';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Choose your Z Cab destination');const heading=document.createElement('h2');heading.textContent='Z Cab · Where to?';const note=document.createElement('p');note.textContent='Choose a destination. Your driver will take you to its nearest road drop-off.';panel.append(heading,note);const list=document.createElement('div');list.style.cssText='display:grid;gap:7px';panel.append(list);document.body.append(panel);
 const ridePanel=document.createElement('div');ridePanel.style.cssText='display:none;position:fixed;z-index:19000;bottom:24px;right:16px;padding:14px;border-radius:12px;background:#142c35f2;color:#fff7db;font:16px system-ui;max-width:calc(100vw - 32px);box-sizing:border-box';const status=document.createElement('p');status.style.margin='0 0 10px';ridePanel.append(status);document.body.append(ridePanel);
 function button(parent,label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.style.cssText='min-height:44px;padding:10px 13px;border:1px solid #d9b340;border-radius:7px;background:#e1bc43;color:#152b32;font:600 15px system-ui;text-align:left;cursor:pointer';b.onclick=fn;parent.append(b);return b;}
 for(const d of AREA_DESTINATIONS)button(list,d.name,()=>book(d));button(panel,'Cancel',()=>close());button(ridePanel,'Get out of Z Cab',()=>alight(false));for(const el of[panel,ridePanel])for(const event of['pointerdown','pointerup','wheel','click','keydown','keyup'])el.addEventListener(event,e=>{e.stopPropagation();if(event==='keydown'&&e.key==='Escape'){e.preventDefault();active?alight(false):close();}});
 const pickupMarker=new THREE.Mesh(new THREE.RingGeometry(1.3,1.5,48),new THREE.MeshBasicMaterial({color:0xf3cf55,side:THREE.DoubleSide,depthWrite:false}));pickupMarker.rotation.x=-Math.PI/2;pickupMarker.visible=false;pickupMarker.name='Z Cab roadside pickup marker';root.add(pickupMarker);
 function roadPath(v,destination){
  const forward=lanePath(network.route(v.root.position,destination,v.heading),v.root.position,v.heading),direct=lanePath(network.route(v.root.position,destination),v.root.position,v.heading);
  if(!direct||!direct.uTurns.length||forward&&direct.length>=forward.length)return forward||direct;
  const own=vehicleDescriptor(THREE,v.root),obstacles=[...getVehicles().map(o=>vehicleDescriptor(THREE,o.group)),...vehicles.filter(o=>o!==v&&o.ready).map(o=>vehicleDescriptor(THREE,o.root))];
  for(const turn of direct.uTurns){let begun=false;for(let i=0;i<direct.points.length;i++){const q=direct.points[i];if(q===turn.start)begun=true;if(begun){const a=direct.points[Math.max(0,i-1)],b=direct.points[Math.min(direct.points.length-1,i+1)],angle=Math.atan2(b.x-a.x,b.z-a.z);if(vehiclePoseBlocked(own,q.x,q.z,angle,obstacles))return forward;}if(q===turn.end)break;}}
  return direct;
 }
 function pickupPath(v,road){
  const base=roadPath(v,road);if(!base)return null;
  const end=base.sample(base.length),before=base.sample(Math.max(0,base.length-2)),direction=end.clone().sub(before).normalize(),right=new THREE.Vector3(direction.z,0,-direction.x),goal=new THREE.Vector3(road.x,0,road.z).addScaledVector(right,5.4),cut=Math.max(0,base.length-14),start=base.sample(cut),curve=new THREE.CubicBezierCurve3(start,start.clone().addScaledVector(direction,4),goal.clone().addScaledVector(direction,-4),goal),points=base.points.filter((q,i)=>base.lengths[i]<cut);
  points.push(start);for(let i=1;i<=16;i++)points.push(curve.getPoint(i/16));const lengths=[0];for(let i=1;i<points.length;i++)lengths.push(lengths.at(-1)+points[i].distanceTo(points[i-1]));
  return{points,lengths,length:lengths.at(-1),pickup:goal,heading:Math.atan2(direction.x,direction.z),sample(distance){let i=1;while(i<lengths.length-1&&lengths[i]<distance)i++;return points[i-1].clone().lerp(points[i],THREE.MathUtils.clamp((distance-lengths[i-1])/Math.max(.001,lengths[i]-lengths[i-1]),0,1));}};
 }
 async function requestPickup(){
  if(active){onMessage('You are already in a Z Cab.');return false;}
  if(!canUse()||!canRequest()){onMessage('Step outside on foot to call a Z Cab.');return false;}
  if(calling){onMessage('Finding your Z Cab…');return false;}
  if(requested){if(requested.state==='waiting'&&Math.hypot(getPlayer().x-requested.root.position.x,getPlayer().z-requested.root.position.z)<7)open(requested);else onMessage(requested.state==='waiting'?'Your Z Cab is waiting by the pickup marker.':'Your Z Cab is on its way to the pickup marker.');return true;}
  calling=true;try{await readyPromise;if(!canUse()||!canRequest())return false;
   const player=getPlayer(),road=network.nearest(player),available=vehicles.filter(v=>v.ready&&v!==active&&v!==selected).map(v=>({v,length:roadPath(v,road)?.length??Infinity})).sort((a,b)=>a.length-b.length).map(o=>o.v);
   for(const v of available){const a=network.points[road.e.i],b=network.points[road.e.j],dx=(b.x-a.x)/road.e.length,dz=(b.z-a.z)/road.e.length;
    for(const offset of[0,8,-8,16,-16,24,-24]){const along=THREE.MathUtils.clamp(road.t*road.e.length+offset,12,road.e.length-12),point={x:a.x+dx*along,z:a.z+dz*along},path=pickupPath(v,point);if(!path)continue;
     const own=vehicleDescriptor(THREE,v.root),obstacles=[...getVehicles().map(o=>vehicleDescriptor(THREE,o.group)),...vehicles.filter(o=>o!==v&&o.ready).map(o=>vehicleDescriptor(THREE,o.root))];if(vehiclePoseBlocked(own,path.pickup.x,path.pickup.z,path.heading,obstacles))continue;
     close();requested=v;v.path=path;v.progress=0;v.speed=0;v.state='pickup';v.destination={...point,name:'your roadside pickup'};v.pickup=path.pickup.clone();pickupMarker.position.set(path.pickup.x,getHeight(path.pickup.x,path.pickup.z)+.035,path.pickup.z);pickupMarker.visible=true;onPickupState('enroute');onMessage('Your Z Cab is on its way. Meet it at the gold marker on the nearest road.');return true;
    }
   }onMessage('No clear roadside pickup is available right now. Please try again shortly.');return false;
  }finally{calling=false;}
 }
 function arrivePickup(v){v.state='waiting';v.speed=0;v.hailUntil=time+120;v.ignoreUntil=time+120;onHonk(v.root,{count:2});onPickupState('arrived');onMessage('Your Z Cab is here. Walk to it and choose your destination.');}
 function close(){panel.style.display='none';if(selected)selected.hailUntil=time+2;selected=null;}
 function driveTo(v,destination){const path=roadPath(v,destination);if(!path||path.length<.1)return false;v.path=path;v.progress=0;v.destination=destination;return true;}
 function cruise(v){v.cruiseIndex=(v.cruiseIndex+1)%cruises[v.id].length;driveTo(v,cruises[v.id][v.cruiseIndex]);v.state='cruising';}
 function book(destination){if(!selected||!canUse())return;const v=selected;if(requested===v){requested=null;pickupMarker.visible=false;onPickupState('idle');}if(!driveTo(v,destination)){const near=network.nearest(destination);if(Math.hypot(v.root.position.x-near.x,v.root.position.z-near.z)<5){close();onStop();active=v;v.destination=destination;alight(true);return;}onMessage('That drop-off is unavailable. Please choose another location.');return;}close();onStop();active=v;v.state='hired';v.destination=destination;v.speed=0;ridePanel.style.display='block';ridePanel.querySelector('button')?.focus();status.textContent='Z Cab to '+destination.name;onMessage('Z Cab · Next stop: '+destination.name);}
 function alight(arrived){if(!active)return;const v=active;active=null;v.speed=0;v.hailUntil=time+7;v.ignoreUntil=time+12;v.state='waiting';ridePanel.style.display='none';const right=new THREE.Vector3(Math.cos(v.heading),0,-Math.sin(v.heading));const exit=v.root.position.clone().addScaledVector(right,3.4);onAlight({x:exit.x,z:exit.z,yaw:v.heading,destination:v.destination,arrived});onMessage(arrived?'Z Cab · Arrived near '+v.destination.name+'. Have a great day!':'You have left the Z Cab.');}
 function open(v){if(active||!canUse()||!v.ready)return;selected=v;v.speed=0;v.hailUntil=time+30;panel.style.display='block';list.querySelector('button')?.focus();}
 for(let i=0;i<2;i++){const g=new THREE.Group();g.name='Z Cab '+(i+1);g.position.set(cruises[i][0].x+(i?2.7:-2.7),getHeight(cruises[i][0].x,cruises[i][0].z),cruises[i][0].z);root.add(g);const v={id:i,root:g,heading:i?0:Math.PI,state:'loading',ready:false,speed:0,cruiseIndex:0,hailUntil:0,ignoreUntil:0};vehicles.push(v);const source=document.createElement('button');source.style.display='none';source.onclick=()=>open(v);document.body.append(source);v.root.rotation.y=v.heading;v.button=source;registerTownAction(source,{id:'z-cab-'+i,label:'Ride Z Cab · Choose destination',priority:145,target:()=>({x:g.position.x,y:g.position.y+1.1,z:g.position.z})});}
 const readyPromise=new GLTFLoader().loadAsync(new URL('./assets/z-cab-v180.glb',import.meta.url).href).then(g=>{for(const v of vehicles){const model=installCabBranding(g.scene.clone(true));model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});v.root.add(model);v.ready=true;cruise(v);}return vehicles;}).catch(e=>{onMessage('The Z Cabs are still loading. Please try again shortly.');root.userData.loadError=String(e);return[];});
 function update(dt){dt=Math.min(Math.max(dt,0),.15);time+=dt;const p=getPlayer();for(const v of vehicles){if(!v.ready)continue;const distance=Math.hypot(p.x-v.root.position.x,p.z-v.root.position.z);if(!active&&canUse()&&distance<9&&time>v.ignoreUntil&&v.state==='cruising'){v.hailUntil=Math.max(v.hailUntil,time+8);v.state='waiting';}if(v.state==='waiting'&&time>v.hailUntil&&selected!==v){if(requested===v){requested=null;pickupMarker.visible=false;onPickupState('idle');}v.ignoreUntil=time+10;cruise(v);}if(selected===v&&distance>12)close();const waiting=v.state==='waiting'||selected===v;v.button.style.display=!active&&canUse()&&distance<6.5?'block':'none';let desired=waiting?0:active===v?10.5:7;
 // Keep tight corners and U-turns comfortable while increasing cruising speed.
 if(!waiting&&v.path){const a=v.path.sample(Math.max(0,v.progress-1)),b=v.path.sample(v.progress+1),c=v.path.sample(v.progress+5),ab=b.clone().sub(a).normalize(),bc=c.clone().sub(b).normalize(),bend=Math.acos(THREE.MathUtils.clamp(ab.dot(bc),-1,1));if(bend>.12)desired=Math.min(desired,bend>.45?3.5:5.5);}const candidate=v.path?.sample(v.progress+Math.max(1,v.speed*.5));if(candidate){if(active!==v&&Math.hypot(candidate.x-p.x,candidate.z-p.z)<1.5)desired=0;if(vehicles.some(o=>o!==v&&o.ready&&Math.hypot(candidate.x-o.root.position.x,candidate.z-o.root.position.z)<4.5))desired=0;if(getVehicles().some(o=>Math.hypot(candidate.x-o.x,candidate.z-o.z)<2.5))desired=0;if(getPedestrians().some(p=>Math.hypot(candidate.x-p.x,candidate.z-p.z)<2.2))desired=0;}if(desired===0&&!waiting)v.speed=0;else v.speed=THREE.MathUtils.damp(v.speed,desired,waiting?7:1.4,dt);if(v.path&&v.speed>.02){const nextProgress=Math.min(v.path.length,v.progress+v.speed*dt),pos=v.path.sample(nextProgress),ahead=v.path.sample(Math.min(v.path.length,nextProgress+1.3)),behind=v.path.sample(Math.max(0,nextProgress-1.3)),heading=Math.atan2(ahead.x-behind.x,ahead.z-behind.z),nextHeading=v.heading+Math.atan2(Math.sin(heading-v.heading),Math.cos(heading-v.heading))*Math.min(1,dt*6);
 const own=vehicleDescriptor(THREE,v.root),obstacles=[...getVehicles().map(o=>({...o,...vehicleDescriptor(THREE,o.group)})),...vehicles.filter(o=>o!==v&&o.ready).map(o=>vehicleDescriptor(THREE,o.root))];
 // Sweep the actual cab body along the route while its visual heading turns.
 // Turning the entire body to the displacement direction first can falsely
 // collide with a parked car beside a cab that is safely pulling away.
 const turnAngle=Math.atan2(Math.sin(nextHeading-v.heading),Math.cos(nextHeading-v.heading)),steps=Math.max(1,Math.ceil((nextProgress-v.progress)/.08),Math.ceil(Math.abs(turnAngle)/.02));let blocked=false;
 for(let i=1;i<=steps;i++){const t=i/steps,q=v.path.sample(v.progress+(nextProgress-v.progress)*t);if(vehiclePoseBlocked(own,q.x,q.z,v.heading+turnAngle*t,obstacles)){blocked=true;break;}}
 if(blocked){v.speed=0;}else{v.progress=nextProgress;v.heading=nextHeading;v.root.position.set(pos.x,getHeight(pos.x,pos.z),pos.z);v.root.rotation.set(-Math.atan2(getHeight(ahead.x,ahead.z)-getHeight(behind.x,behind.z),Math.max(1,ahead.distanceTo(behind))),v.heading,0,'YXZ');}if(v.progress>=v.path.length-.02&&!waiting){if(v.state==='pickup')arrivePickup(v);else if(active===v)alight(true);else cruise(v);}}if(active===v){p.x=v.root.position.x;p.z=v.root.position.z;}}}
 function blocks(x,z){return vehicles.some(v=>{if(!v.ready||active===v)return false;const dx=x-v.root.position.x,dz=z-v.root.position.z,c=Math.cos(v.heading),s=Math.sin(v.heading);return Math.abs(c*dx-s*dz)<1.25&&Math.abs(s*dx+c*dz)<2.9;});}
 return{requestPickup,get pickupCab(){return requested;},get collisionVehicles(){return vehicles.filter(v=>v.ready).map(v=>vehicleDescriptor(THREE,v.root));},root,vehicles,readyPromise,network,update,blocks,open,book,close,cancel(){if(active)alight(false);if(requested){const v=requested;requested=null;pickupMarker.visible=false;cruise(v);onPickupState('idle');}close();},get riding(){return !!active},get activeCab(){return active},get panelOpen(){return panel.style.display!=='none'},dispose(){this.cancel();vehicles.forEach(v=>v.button.remove());panel.remove();ridePanel.remove();root.removeFromParent();}};
}
