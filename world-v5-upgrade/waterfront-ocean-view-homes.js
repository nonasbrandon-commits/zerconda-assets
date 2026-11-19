import {createDetailedBathroom,createDetailedBed} from './residential-furnishings.js?v=20261119-residential-v130';
import {createRealtySign} from './property-signs.js?v=20261119-residential-v130';
import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
// Real, furnished shells in the town: windows and decks share the actual ocean view.
export function addWaterfrontHomes(scene,{count=12,getPlayer=()=>({x:0,z:0}),canInteract=()=>true,onMessage=()=>{}}={}){
 const root=new THREE.Group();root.name='Fenced ocean cottages';root.userData.customInterior=true;scene.add(root);
 const mat=(c,r=.9)=>new THREE.MeshStandardMaterial({color:c,roughness:r});
 const trim=mat(0xe9e4d9),stone=mat(0xa4a498),wood=mat(0x9a7a57),iron=mat(0x384544,.5),roof=mat(0x56605d),counter=mat(0xd6d6ca),ceramic=mat(0xe7e5dc),bedlinen=mat(0xe8e4d6),leaf=mat(0x486346);
 const glass=new THREE.MeshPhysicalMaterial({color:0xb6d2d5,roughness:.08,metalness:0,transparent:true,opacity:.12,depthWrite:false,side:THREE.DoubleSide});
 function grain(base){const c=document.createElement('canvas');c.width=256;c.height=512;const a=c.getContext('2d');a.fillStyle=base;a.fillRect(0,0,256,512);for(let i=0;i<380;i++){a.strokeStyle=`rgba(45,35,20,${.02+i%7*.012})`;a.beginPath();for(let y=0;y<=512;y+=16){const x=i*37%256+Math.sin(y*.02+i)*1.7;y?a.lineTo(x,y):a.moveTo(x,y);}a.stroke();}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}wood.map=grain('#bba582');
 const palette=['#d8d0ba','#b8c6bd','#c4b29e','#cbd2ca','#bfcad0','#cfb9a8'],key='zerconda-coastal-home-v1';let owned=null;try{const s=JSON.parse(localStorage.getItem(key)||'null');if(s&&Number.isInteger(s.id)&&s.id>=1&&s.id<=12)owned={id:s.id,name:String(s.name||'Resident').slice(0,24),paint:/^#[0-9a-f]{6}$/i.test(s.paint)?s.paint:palette[(s.id-1)%6],fabric:/^#[0-9a-f]{6}$/i.test(s.fabric)?s.fabric:'#829b91'};}catch{}
 const homes=[],buttons=[],seats=[];
 function box(g,w,h,d,x,y,z,m){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=h>.15;o.receiveShadow=true;g.add(o);return o;}
 function pane(g,w,h,x,y,z,angle=0){const f=new THREE.Group();f.position.set(x,y,z);f.rotation.y=angle;g.add(f);box(f,w,h,.035,0,0,0,glass);for(const side of [-1,1]){box(f,.085,h+.16,.13,side*(w/2+.035),0,0,trim);box(f,w+.2,.085,.13,0,side*(h/2+.035),0,trim);}return f;}
 function label(text,w=2.5,h=.85){const c=document.createElement('canvas');c.width=640;c.height=208;const a=c.getContext('2d');a.fillStyle='#25483f';a.fillRect(0,0,640,208);a.strokeStyle='#e7e0cc';a.lineWidth=5;a.strokeRect(6,6,628,196);a.textAlign='center';a.fillStyle='#faf5e6';a.font='bold 55px system-ui';a.fillText(text,320,87,600);a.font='27px system-ui';a.fillText('OCEAN COTTAGE',320,155);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));}
 const spots=[-166,-144,-122,-70,-48,-26,26,48,70,122,144,166];
 function addAction(home,id,label,target,handler,range=3.0){const b=document.createElement('button');b.style.display='none';document.body.appendChild(b);b.onclick=handler;const record={b,home,target,range};buttons.push(record);registerTownAction(b,{id:'coastal-'+home.id+'-'+id,priority:id==='options'?99:120,label,target:()=>({x:home.x+target.x,y:1.4,z:home.z+target.z})});return record;}
 for(let i=0;i<Math.min(count,spots.length);i++){
  const h={id:i+1,x:spots[i],z:135,doors:[],colliders:[],entryX:spots[i]+1.8,entryZ:128.1};homes.push(h);const g=h.group=new THREE.Group();g.position.set(h.x,0,h.z);g.name='Ocean cottage '+h.id;root.add(g);
  const wall=h.wall=mat(owned?.id===h.id?owned.paint:palette[i%6]),fabric=h.fabric=mat(owned?.id===h.id?owned.fabric:'#829b91');
  box(g,10.3,.55,11.3,0,-.075,0,stone);box(g,10,.14,11,0,.14,0,wood);
  // Front and rear walls have real openings, not opaque blocks behind painted windows.
  function horizontalWall(z,holes){let prev=-5;for(const o of [...holes].sort((a,b)=>a.x0-b.x0)){if(o.x0>prev)box(g,o.x0-prev,3.15,.18,(o.x0+prev)/2,1.775,z,wall);if(o.bottom>.2)box(g,o.x1-o.x0,o.bottom-.2,.18,(o.x0+o.x1)/2,(o.bottom+.2)/2,z,wall);if(o.top<3.35)box(g,o.x1-o.x0,3.35-o.top,.18,(o.x0+o.x1)/2,(o.top+3.35)/2,z,wall);prev=o.x1;}if(prev<5)box(g,5-prev,3.15,.18,(5+prev)/2,1.775,z,wall);}
  horizontalWall(-5.5,[{x0:-4.1,x1:-1.9,bottom:1.25,top:2.9},{x0:1.25,x1:2.35,bottom:.2,top:2.4}]);
  horizontalWall(5.5,[{x0:-4.3,x1:-1.1,bottom:.85,top:3.0},{x0:1.2,x1:3.8,bottom:.2,top:2.95}]);
  pane(g,2.2,1.65,-3,2.075,-5.51);pane(g,3.2,2.15,-2.7,1.925,5.51);
  for(const side of [-1,1]){const xx=side*5;box(g,.18,3.15,1.5,xx,1.775,-4.75,wall);box(g,.18,3.15,1.5,xx,1.775,4.75,wall);box(g,.18,3.15,2,xx,1.775,0,wall);for(const zz of [-2.5,2.5]){box(g,.18,.75,3,xx,.575,zz,wall);box(g,.18,.4,3,xx,3.15,zz,wall);pane(g,3,2,xx,1.95,zz,Math.PI/2);}}
  // Simple, correctly pitched coastal roof with a full ceiling and neat fascia.
  box(g,10.4,.15,11.5,0,3.41,0,trim);for(const side of [-1,1]){const span=Math.hypot(5.45,1.5),r=box(g,span,.16,11.9,side*2.725,4.22,0,roof);r.rotation.z=-side*Math.atan2(1.5,5.45);box(g,.15,.22,11.9,side*5.45,3.5,0,trim);}for(const z of [-5.6,5.6]){const s=new THREE.Shape();s.moveTo(-5.2,0);s.lineTo(0,1.45);s.lineTo(5.2,0);s.closePath();const o=new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshStandardMaterial({color:wall.color,side:THREE.DoubleSide}));o.position.set(0,3.5,z);g.add(o);}
  // Front porch, a flush ocean deck and short, gentle approaches to the ground.
  box(g,4,.28,1.7,1.8,.07,-6.35,wood);box(g,10.3,.3,4,0,.05,7.5,wood);for(let z=5.6;z<9.5;z+=.23)box(g,10.25,.016,.015,0,.208,z,stone);
  function approach(x,z0,z1,width,up){const len=z1-z0,r=box(g,width,.15,len,x,.035,(z0+z1)/2,stone);r.rotation.x=(up?-1:1)*Math.atan2(.2,len);}
  approach(1.8,-12,-7.2,2.4,true);approach(0,9.5,12,2.4,false);
  // Deck rails protect the sides, while the center opening leads down to the beach.
  function deckrail(x0,z0,x1,z1){const dx=x1-x0,dz=z1-z0,len=Math.hypot(dx,dz),r=box(g,len,.07,.08,(x0+x1)/2,1.28,(z0+z1)/2,iron);r.rotation.y=-Math.atan2(dz,dx);for(let j=0;j<=Math.ceil(len/.75);j++){const t=j/Math.ceil(len/.75);box(g,.045,1.05,.045,x0+dx*t,.74,z0+dz*t,iron);}}
  deckrail(-5.05,5.5,-5.05,9.4);deckrail(5.05,5.5,5.05,9.4);deckrail(-5.05,9.4,-1.3,9.4);deckrail(1.3,9.4,5.05,9.4);
  // Compact front door swings outward; interior room doors slide along the partition.
  function door(id,x,z,width,axis='z'){
   const sliding=axis==='x',height=2.2,pivot=new THREE.Group();pivot.name='Cottage '+h.id+' '+id+' door';pivot.position.set(axis==='z'?x-width/2:x+.14,.2,axis==='x'?z+width/2:z);g.add(pivot);
   box(pivot,width,height,.08,width/2,height/2,0,wood);for(const sx of[.02,width-.02])box(pivot,.035,height,.10,sx,height/2,0,trim);for(const yy of[.02,height-.02])box(pivot,width,.035,.10,width/2,yy,0,trim);box(pivot,.04,.16,.07,width-.13,1.05,-.07,iron);
   const base=axis==='x'?Math.PI/2:0;pivot.rotation.y=base;
   // Stationary jambs overlap the wall opening so there are no daylight gaps.
   const frame=new THREE.Group();frame.position.set(x,.2,z);frame.rotation.y=base;g.add(frame);for(const side of[-1,1])box(frame,.075,height+.08,.20,side*(width/2+.025),height/2,0,trim);box(frame,width+.15,.075,.20,0,height+.015,0,trim);
   const d={id,x,z,width,axis,pivot,base,sliding,closedZ:pivot.position.z,progress:0,open:false};h.doors.push(d);addAction(h,id,()=>`${d.open?'Close':'Open'} ${id==='front'?'front door':id==='bedroom'?'bedroom sliding door':'bathroom sliding door'}`,{x,z},()=>{d.open=!d.open});return d;
  }
  door('front',1.8,-5.5,1.04);
  // Full-height glazed beach slider: one fixed panel and one overlapping sliding leaf.
  const deckFrame=new THREE.Group();deckFrame.name='Cottage '+h.id+' sealed beach slider frame';deckFrame.position.set(2.5,.2,5.5);g.add(deckFrame);
  for(const side of[-1,1])box(deckFrame,.08,2.83,.19,side*1.3,1.375,0,trim);for(const y of[.025,2.745])box(deckFrame,2.68,.065,.19,0,y,0,trim);
  function deckLeaf(cx,z,sliding){const leaf=new THREE.Group();leaf.name=sliding?'Beach sliding glass door':'Beach fixed glass panel';leaf.position.set(cx,.2,z);g.add(leaf);box(leaf,1.34,2.75,.045,0,1.375,0,glass);for(const side of[-1,1])box(leaf,.045,2.75,.08,side*.65,1.375,0,trim);for(const y of[.025,2.725])box(leaf,1.34,.045,.08,0,y,0,trim);return leaf;}
  deckLeaf(3.15,5.54,false);const deckPivot=deckLeaf(1.85,5.44,true);box(deckPivot,.035,.30,.06,-.48,1.10,-.07,iron);
  const deck={id:'deck',x:1.85,z:5.5,width:1.3,axis:'z',pivot:deckPivot,base:0,sliding:true,closedX:1.85,progress:0,open:false};h.doors.push(deck);addAction(h,'deck',()=>`${deck.open?'Close':'Open'} beach sliding door`,{x:1.85,z:5.5},()=>{deck.open=!deck.open});
  // Smaller openings and pocket doors preserve living-room space.
  function partition(z0,z1){box(g,.15,3.15,z1-z0,-.6,1.775,(z0+z1)/2,wall);}
  partition(-5.5,-3.13);partition(-2.07,.97);partition(2.03,5.5);for(const z of[-2.6,1.5])box(g,.15,.95,1.06,-.6,2.875,z,wall);
  door('bathroom',-.6,-2.6,1.0,'x');door('bedroom',-.6,1.5,1.0,'x');box(g,4.4,3.15,.15,-2.8,1.775,-.55,wall);
  function obstacle(x,z,w,d){h.colliders.push({x,z,w,d});}function furniture(w,hh,d,x,y,z,m){box(g,w,hh,d,x,y,z,m);obstacle(x,z,w,d);}
  // Headboard rests against the west wall, leaving the bedroom window unobstructed.
  createDetailedBed(g,{x:-3,y:.2,z:2.6,angle:Math.PI/2,width:1.8,length:3.0,compact:true});obstacle(-3,2.6,3.3,2);
  const bath=createDetailedBathroom(g,{x:-2.8,y:.2,z:-3.0,width:4.35,depth:4.65,tub:false,wallWindows:{back:[{x:-1.1,y:1.6,w:1.8,h:1.8}]}});h.colliders.push(...bath.solids);
  // Identical starter kitchen, dining and lounge furniture in every cottage.
  furniture(1.1,1.9,.95,4.1,1.15,-4.6,ceramic);furniture(.75,.85,2.8,4.4,.625,-2.7,wood);box(g,.8,.08,2.85,4.4,1.09,-2.7,counter);box(g,.55,.04,.8,4.4,1.15,-3.45,iron);for(const x of [4.22,4.57])for(const z of [-2.25,-1.9]){const b=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.025,14),iron);b.position.set(x,1.15,z);g.add(b);}
  // Compact dining nook against the kitchen-side wall, outside the entry route.
  furniture(1.15,.09,.85,3.95,.99,-.05,wood);for(const x of[3.5,4.4])for(const z of[-.35,.25])box(g,.065,.75,.065,x,.58,z,wood);
  furniture(.56,.12,.58,2.85,.64,-.05,fabric);box(g,.08,.62,.58,2.61,.96,-.05,wood);for(const x of[2.65,3.05])for(const z of[-.26,.16])box(g,.055,.38,.055,x,.4,z,wood);
  // Sofa back rests against the east wall instead of dividing the living room.
  const sofa=new THREE.Group();sofa.name='Cottage '+h.id+' wall sofa';sofa.position.set(4.3,0,2.30);sofa.rotation.y=-Math.PI/2;g.add(sofa);
  box(sofa,2.8,.38,.9,0,.52,0,wood);box(sofa,2.5,.20,.80,0,.82,0,fabric);box(sofa,2.8,.65,.18,0,1.02,-.39,fabric);for(const x of[-1.35,1.35])box(sofa,.22,.42,.9,x,.96,0,fabric);obstacle(4.3,2.3,.9,2.8);
  // A small side table replaces the coffee table that obstructed the beach exit.
  furniture(.65,.10,.65,4.25,.74,4.35,wood);for(const x of[4.01,4.49])for(const z of[4.11,4.59])box(g,.055,.5,.055,x,.44,z,wood);
  for(const x of [-3.1,3.1]){furniture(.8,.10,.85,x,.72,8,wood);box(g,.8,.62,.10,x,1.02,7.62,wood);for(const xx of [x-.3,x+.3])box(g,.07,.45,.07,xx,.45,8,wood);seats.push({x:h.x+x,z:h.z+8,kind:'ocean deck chair',facing:0,sitHeight:.83});}
  // Side parking is separated from the pedestrian porch and connects to the city sidewalk.
  box(g,3.45,.16,30,7.25,-.035,-8,stone);for(const x of [5.9,8.6])box(g,.06,.01,5.7,x,.052,2.5,trim);box(g,2.76,.01,.06,7.25,.052,5.35,trim);h.parking={x:h.x+7.25,z:h.z+2.5,w:2.7,d:5.7};
  // Grounded timber boundary fences separate adjacent cottages without hiding the sea.
  const fenceGeo=[];function fp(w,hh,d,x,y,z){const b=new THREE.BoxGeometry(w,hh,d);b.translate(x,y,z);fenceGeo.push(b.toNonIndexed());b.dispose();}for(const x of [-10.15,10.15]){for(let z=-22;z<=12;z+=.22)fp(.065,1.45,.20,x,.65,z);for(let z=-22;z<=12;z+=2.6)fp(.13,1.6,.13,x,.7,z);for(const y of [.35,1.05])fp(.09,.08,34,x,y,-5);}const f=new THREE.Mesh(mergeGeometries(fenceGeo),wood);f.castShadow=true;f.receiveShadow=true;g.add(f);fenceGeo.forEach(o=>o.dispose());
  // Sale boards are on posts at the street and the beach, never floating.
  h.saleBoards=[createRealtySign(g,{x:-2.8,y:-.1,z:-20.8,rotation:Math.PI,scale:.85})];
  h.plate=label('COTTAGE '+h.id,2.4,.65);h.plate.position.set(1.8,3.05,-5.63);h.plate.rotation.y=Math.PI;g.add(h.plate);
  addAction(h,'options',()=>owned?.id===h.id?'My ocean cottage · Options':'Ocean cottage '+h.id+' · For sale',{x:-2.8,z:-20.8},()=>showPanel(h),3.6);addAction(h,'beach-options',()=>owned?.id===h.id?'My ocean cottage · Options':'Ocean cottage '+h.id+' · For sale',{x:-6.5,z:10.5},()=>showPanel(h),3.6);addAction(h,'inside-options',()=>owned?.id===h.id?'Customize ocean cottage':'Claim ocean cottage '+h.id,{x:1.8,z:-3.4},()=>showPanel(h),2.5);
  // Batch the static shell and furniture, leaving doors and sale boards independent.
  const batches=new Map();for(const o of [...g.children])if(o.isMesh&&o!==h.plate){o.updateMatrix();const geo=o.geometry.clone().applyMatrix4(o.matrix),arr=batches.get(o.material)||[];arr.push(geo.index?geo.toNonIndexed():geo);batches.set(o.material,arr);g.remove(o);o.geometry.dispose();}for(const [m,geos]of batches){const o=new THREE.Mesh(mergeGeometries(geos),m);o.castShadow=m!==glass;o.receiveShadow=true;g.add(o);geos.forEach(o=>o.dispose());}
 }
 function save(){try{localStorage.setItem(key,JSON.stringify(owned));return true;}catch{return false;}}
 function syncSale(){for(const h of homes)for(const s of h.saleBoards)s.visible=owned?.id!==h.id;}syncSale();
 const panel=document.createElement('section');panel.id='coastal-home-options';panel.setAttribute('aria-label','Ocean cottage options');panel.style.cssText='display:none;position:fixed;z-index:12000;top:80px;right:12px;width:min(330px,calc(100vw - 48px));max-height:72vh;overflow:auto;background:#193c39f5;color:#fff;padding:18px;border:1px solid #d7d4ba;border-radius:12px;font:14px system-ui';document.body.appendChild(panel);let panelHome=null;
 function element(tag,text,parent=panel){const e=document.createElement(tag);e.textContent=text||'';parent.appendChild(e);return e;}function button(text,fn){const b=element('button',text);b.style.cssText='min-height:46px;padding:9px 15px;margin:8px 6px 0 0;border:0;border-radius:7px;cursor:pointer;background:#e3dfcc;color:#193c39';b.onclick=fn;return b;}
 function claim(h,name){if(owned&&owned.id!==h.id)return {ok:false,message:'You already have Ocean Cottage '+owned.id+'.'};if(!owned){owned={id:h.id,name:String(name||'Resident').trim().slice(0,24)||'Resident',paint:palette[(h.id-1)%6],fabric:'#829b91'};const ok=save();syncSale();return {ok:true,message:ok?'Cottage claimed.':'Claimed for this visit; browser storage is unavailable.'};}return {ok:true,message:'This is your cottage.'};}
 function showPanel(h){panelHome=h;panel.replaceChildren();element('h3','Ocean Cottage '+h.id);element('p','One bedroom, bathroom, furnished living space, ocean deck and side parking.');element('p','Claims and changes are saved in this browser.');if(owned?.id===h.id){for(const [field,title]of [['paint','Exterior color'],['fabric','Furniture & bedding']]){const l=element('label',title+' ');l.style.display='block';l.style.margin='14px 0';const input=element('input','',l);input.type='color';input.value=owned[field];input.oninput=()=>{owned[field]=input.value;(field==='paint'?h.wall:h.fabric).color.set(input.value);save();};}}else if(!owned){const l=element('label','Resident name '),name=element('input','',l);name.maxLength=24;name.style.cssText='display:block;width:92%;padding:10px;margin:8px 0';button('Claim this cottage',()=>{const result=claim(h,name.value);if(result.ok)showPanel(h);onMessage(result.message);});}else element('p','You already have Ocean Cottage '+owned.id+'. You can still visit this cottage.');button('Close',()=>{panel.style.display='none';});panel.style.display='block';}
 panel.addEventListener('pointerdown',e=>e.stopPropagation());panel.addEventListener('keydown',e=>{e.stopPropagation();if(e.code==='Escape')panel.style.display='none';});
 function homeAt(x,z){return homes.find(h=>Math.abs(x-h.x)<4.8&&Math.abs(z-h.z)<5.3)||null;}
 function doorBlocks(d,x,z){if(d.progress>.9)return false;return d.axis==='z'?Math.abs(z-d.z)<.36&&Math.abs(x-d.x)<d.width/2+.2:Math.abs(x-d.x)<.36&&Math.abs(z-d.z)<d.width/2+.2;}
 function blocks(x,z,vehicle=false){for(const h of homes){const lx=x-h.x,lz=z-h.z;if(Math.abs(lx)>10.6||lz< -23||lz>12.5)continue;if(Math.abs(Math.abs(lx)-10.15)<.28&&lz> -22.3&&lz<12.3)return true;if(vehicle){if(Math.abs(lx)<5.65&&lz> -7.4&&lz<9.8)return true;continue;}if(Math.abs(lx)<5.4&&Math.abs(lz)<5.9){if(Math.abs(lx)>4.65)return true;if(lz< -5.12&&!(lx>1.53&&lx<2.07))return true;if(lz>5.12&&!(lx>1.48&&lx<2.22))return true;if(Math.abs(lx+.6)<.36&&!(lz> -2.85&&lz< -2.35)&&!(lz>1.25&&lz<1.75))return true;if(Math.abs(lz+.55)<.35&&lx<-.35)return true;if(h.doors.some(d=>doorBlocks(d,lx,lz)))return true;if(h.colliders.some(c=>Math.abs(lx-c.x)<c.w/2+.28&&Math.abs(lz-c.z)<c.d/2+.28))return true;}if(lz>5.5&&lz<9.8){if(Math.abs(Math.abs(lx)-5.05)<.3)return true;if(Math.abs(lz-9.4)<.3&&Math.abs(lx)>1.0&&Math.abs(lx)<5.4)return true;if(h.colliders.some(c=>Math.abs(lx-c.x)<c.w/2+.28&&Math.abs(lz-c.z)<c.d/2+.28))return true;}}return false;}
 function heightAt(x,z){for(const h of homes){const lx=x-h.x,lz=z-h.z;if(Math.abs(lx)<5.2&&lz>=-5.6&&lz<=9.5)return .21;if(Math.abs(lx-1.8)<2&&lz>=-7.2&&lz< -5.5)return .21;if(Math.abs(lx-1.8)<1.2&&lz>=-12&&lz< -7.2)return .21*(lz+12)/4.8;if(Math.abs(lx)<1.2&&lz>9.5&&lz<12)return .21*(12-lz)/2.5;if(lx>5.5&&lx<9&&lz> -23&&lz<7)return .045;}return null;}
 function update(dt,player){for(const r of buttons){const p=r.target;r.b.style.display=canInteract()&&Math.hypot(player.x-r.home.x-p.x,player.z-r.home.z-p.z)<r.range?'block':'none';}for(const h of homes)for(const d of h.doors){d.progress=THREE.MathUtils.damp(d.progress,d.open?1:0,9,dt);if(d.id==='deck'){d.pivot.position.x=d.closedX+d.progress*1.30;}else if(d.sliding){d.pivot.position.z=d.closedZ+d.progress*1.10;}else d.pivot.rotation.y=d.base+d.progress*1.45;}}

 function clampCamera(p,player){const h=homeAt(player.x,player.z);if(!h)return;p.x=THREE.MathUtils.clamp(p.x,h.x-4.65,h.x+4.65);p.z=THREE.MathUtils.clamp(p.z,h.z-5.1,h.z+5.1);p.y=THREE.MathUtils.clamp(p.y,1.5,3.05);const lx=player.x-h.x,lz=player.z-h.z;if(lx<-.95){p.x=Math.min(p.x,h.x-.95);p.z=lz<-.55?Math.min(p.z,h.z-.9):Math.max(p.z,h.z-.2);}else if(p.x<h.x-.25)p.x=h.x-.25;}
 return {root,homes:homes.length,homesList:homes,blocks,heightAt,homeAt,update,clampCamera,claim,showPanel,get owned(){return owned},get panelOpen(){return panel.style.display!=='none'},nearestSeat(x,z,max=2.3){let best=null;for(const s of seats){const d=Math.hypot(x-s.x,z-s.z);if(d<max){max=d;best=s;}}return best;}};
}

