import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createDetailedBed} from './residential-furnishings.js?v=20261119-performance-v147';
import {createCraftedSofa} from './crafted-sofa.js?v=20261122-walnut-v221';
import {createCraftedCoffeeTable} from './crafted-coffee-table.js?v=20261122-walnut-v221';
import {createCraftedDiningSet} from './crafted-dining.js?v=20261122-dining-v224';
import {createFrenchDoorFridge} from './french-door-fridge.js?v=20261119-performance-v147';
import {createReferenceRange} from './reference-range.js?v=20261119-performance-v147';
let oak;
function oakMaterial(){if(oak)return oak;const c=document.createElement('canvas');c.width=1024;c.height=512;const a=c.getContext('2d');let seed=236;const rand=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);a.fillStyle='#b59a75';a.fillRect(0,0,1024,512);for(let row=0;row<8;row++){const y=row*64;for(let j=-1;j<3;j++){const x=j*512+(row%3)*170;a.fillStyle=`hsl(35 27% ${61+rand()*7}%)`;a.fillRect(x,y,512,64);for(let k=0;k<90;k++){a.strokeStyle=k%3?'#6e533614':'#f8e4c824';a.lineWidth=.4+rand();a.beginPath();const yy=y+rand()*64;for(let n=0;n<=16;n++){const px=x+n*32,py=yy+Math.sin(n*.6+row)*1.7;n?a.lineTo(px,py):a.moveTo(px,py);}a.stroke();}a.strokeStyle='#5c4a353b';a.lineWidth=1;a.strokeRect(x,y,512,64);}}const map=new THREE.CanvasTexture(c);map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.anisotropy=8;oak=new THREE.MeshStandardMaterial({name:'Stanwood pale natural oak',map,roughness:.48});return oak;}
// Concept plan fitted to the existing exterior envelope; coordinates remain house-local.
export function createStanwoodInterior({root,solids,box,wall,pipe,cyl,M,trim,wood,steel,glass,stone}){
 const wallMat=M('#eeeae1'),linen=M('#d8d0c0'),white=M('#f1f0e9',.38),dark=M('#303a3b'),brass=M('#ae9362',.3,.65),quartz=M('#e5dfd1',.27),floorMat=oakMaterial(),rug=M('#bbb19d'),tile=M('#b6b6ad'),black=M('#172024'),glow=M('#fff0cf');glow.emissive.set('#ffdf9e');glow.emissiveIntensity=.55;
 const rooms=[],upperFloors=[],leafDark=M('#496e46'),leafLight=M('#64834a'),stem=M('#42634a'),artMats=['#7e8d80','#a3ada0','#c2b898','#8b9988','#6e8279'].map(c=>M(c));
 function solid(x,z,w,d,lo,hi){solids.push({x,z,w,d,lo,hi});}
 function slab(x0,x1,z0,z1,y,mat=floorMat){const o=box(x1-x0,.14,z1-z0,(x0+x1)/2,y-.07,(z0+z1)/2,mat);const p=o.geometry.attributes.position,u=o.geometry.attributes.uv;for(let i=0;i<p.count;i++)u.setXY(i,(p.getX(i)+o.position.x)/4,(p.getZ(i)+o.position.z)/2);if(y>3)upperFloors.push({x0,x1,z0,z1});return o;}
 function partition(axis,pos,a,b,y,doors=[],base=y){const h=2.25;wall(axis,pos,a,b,base,y===.65?3.51:6.99,doors.map(c=>({c,b:y,w:1.05,h})),wallMat,.14);const len=b-a;box(axis==='z'?len:.03,.10,axis==='z'?.03:len,axis==='z'?(a+b)/2:pos+.085,y===.65?3.43:6.90,axis==='z'?pos+.085:(a+b)/2,trim);for(const c of doors){for(const side of[-1,1])box(axis==='z'?.075:.22,h+.08,axis==='z'?.22:.075,axis==='z'?c+side*.56:pos,y+h/2,axis==='z'?pos:c+side*.56,trim);box(axis==='z'?1.19:.22,.09,axis==='z'?.22:1.19,axis==='z'?c:pos,y+h+.025,axis==='z'?pos:c,trim);}}
 function room(name,x0,x1,z0,z1,level){rooms.push({name,x0,x1,z0,z1,level});}
 function carpet(x0,x1,z0,z1,y){slab(x0,x1,z0,z1,y,linen);}
 function rounded(w,h,d,x,y,z,m=linen,r=.04){const o=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/3,h/3,d/3)),m);o.position.set(x,y,z);root.add(o);return o;}
 function pendant(x,z,y){pipe([x,3.47,z],[x,y+.18,z],.012,dark);cyl(.16,.28,x,y,z,white);cyl(.13,.016,x,y-.148,z,glow);}
 function downlight(x,z,y=3.48){cyl(.09,.018,x,y,z,glow);}
 function plant(x,z,y=.65){cyl(.24,.45,x,y+.225,z,dark,.28);for(let i=0;i<9;i++){const a=i*2.399,h=.55+(i%3)*.12;pipe([x,y+.4,z],[x+Math.cos(a)*.25,y+h+.4,z+Math.sin(a)*.25],.012,stem);const leaf=new THREE.Mesh(new THREE.SphereGeometry(1,8,6),(i%2?leafDark:leafLight));leaf.scale.set(.10,.31,.035);leaf.position.set(x+Math.cos(a)*.25,y+h+.32,z+Math.sin(a)*.25);leaf.rotation.set(.4,a,-.35);root.add(leaf);}solid(x,z,.52,.52,y,y+1.3);}
 function art(x,y,z,w=1.1,h=.7){box(w+.08,h+.08,.05,x,y,z,wood);box(w,h,.012,x,y,z+.032,linen);for(let i=0;i<5;i++)box(w*(.9-i*.14),h*.08,.014,x,y-h*.32+i*h*.12,z+.041,artMats[i]);}
 // Continuous, non-overlapping slabs. The garage is lower than the house.
 slab(-7.1,1.25,-8.4,8.4,.65);slab(1.25,7.1,-8.4,.30,.65);slab(1.25,7.1,.30,8.4,.09,stone);
 slab(.70,7.1,-8.4,1.10,3.65);slab(-7.1,7.1,1.10,8.4,3.65);slab(-2.75,.70,-1.70,1.10,3.65);
 // Flush ceilings meet every partition; only the great room remains full height.
 box(14.12,.10,16.82,0,7.04,0,wallMat);box(14.12,.01,7.30,0,3.505,4.75,wallMat);box(6.4,.01,9.5,3.9,3.505,-3.65,wallMat);box(3.45,.01,2.8,-1.025,3.505,-.3,wallMat);
 partition('x',1.25,.30,8.4,.65,[2.7],.09);partition('z',.30,1.25,7.1,.65,[2.45],.09);for(const [xx,top]of[[1.83,.46],[2.21,.27]])box(.38,top-.09,1.0,xx,(top+.09)/2,2.7,floorMat);box(.38,.56,1.0,1.44,.37,2.7,floorMat);for(const [zz,top]of[[.86,.46],[1.24,.27]])box(1.0,top-.09,.38,2.45,(top+.09)/2,zz,floorMat);box(1,.56,.38,2.45,.37,.48,floorMat);
 // Separate dining room with a broad cased opening off the foyer and kitchen.
 partition('x',1.25,-3.4,.30,.65,[-1.55]);wall('z',-3.4,1.25,7.1,.65,3.51,[{c:3.9,b:.65,w:3.6,h:2.55}],wallMat,.14);
 // Bedroom 4 and powder room are downstairs, beside an open front foyer.
 partition('z',6.50,-7.1,-3.2,.65,[-4.8]);partition('x',-3.20,2.8,6.50,.65,[]);partition('z',2.80,-7.1,-3.2,.65,[]);
 partition('x',-4.3,1.1,2.80,.65,[1.95]);partition('z',1.10,-7.1,-4.3,.65,[]);
 room('Great room',-7.1,.7,-8.4,-1.7,0);room('Kitchen',.7,7.1,-8.4,-3.4,0);room('Dining / game room',1.25,7.1,-3.4,.3,0);room('Foyer',-3.2,1.25,2.8,8.4,0);room('Bedroom 4',-7.1,-3.2,2.8,6.5,0);room('Powder room',-7.1,-4.3,1.1,2.8,0);room('Garage / workshop',1.25,7.1,.3,8.4,0);
 // Two-flight stair, with a landing: bottom east/front, top east/rear.
 const lowZ=.50,highZ=-.95,west=-6.15,east=-2.75,run=3.4,rise=1.5;
 for(let i=0;i<9;i++){const h=(i+1)*rise/9,x=east-(i+.5)*run/9;slab(x-run/18,x+run/18,lowZ-.55,lowZ+.55,.65+h);}
 slab(-6.90,-6.15,-1.51,1.06,2.15);
 for(let i=0;i<9;i++){const h=(i+1)*rise/9,x=west+(i+.5)*run/9;slab(x-run/18,x+run/18,highZ-.55,highZ+.55,2.15+h);}
 function rail(a,b){pipe(a,b,.035,wood);const n=Math.ceil(Math.hypot(a[0]-b[0],a[2]-b[2])/.17);for(let i=0;i<=n;i++){const t=i/n,xx=a[0]+(b[0]-a[0])*t,zz=a[2]+(b[2]-a[2])*t,top=a[1]+(b[1]-a[1])*t;box(.028,.87,.028,xx,top-.435,zz,dark);}solid((a[0]+b[0])/2,(a[2]+b[2])/2,Math.abs(a[0]-b[0])+.05,Math.abs(a[2]-b[2])+.05,Math.min(a[1],b[1])-.9,Math.max(a[1],b[1]));}
 rail([east,1.56,1.08],[west,3.06,1.08]);rail([west,3.06,-1.53],[east,4.56,-1.53]);rail([-6.93,3.06,1.08],[-6.93,3.06,-1.53]);
 // Upper hall, three bedrooms, two baths, walk-in closet and laundry.
 partition('z',3,-7.1,-1,3.65,[-2.2]);partition('z',3,1.3,7.1,3.65,[2.4]);partition('x',-1,3,8.4,3.65,[]);partition('x',1.3,3,8.4,3.65,[]);partition('z',4.3,-1,1.3,3.65,[.15]);
 partition('x',.7,-8.4,1.1,3.65,[]);partition('z',1.1,.7,4.6,3.65,[1.65]);partition('x',4.6,-8.4,1.1,3.65,[-4.2,-1.75]);partition('z',-3.2,4.6,7.1,3.65,[]);partition('z',-.5,4.6,7.1,3.65,[]);partition('x',4.6,1.1,2.85,3.65,[1.95]);partition('z',2.85,4.6,7.1,3.65,[]);
 // The primary bedroom connects to both its bathroom and closet; laundry opens to hall.
 room('Primary bedroom',.7,4.6,-8.4,1.1,1);room('En-suite bath',4.6,7.1,-8.4,-3.2,1);room('Walk-in closet',4.6,7.1,-3.2,-.5,1);room('Laundry / utility',4.6,7.1,-.5,2.85,1);room('Bedroom 2',-7.1,-1,3,8.4,1);room('Family bath',-1,1.3,4.3,8.4,1);room('Bedroom 3',1.3,7.1,3,8.4,1);room('Landing',-2.35,4.6,-1.7,3,1);
 rail([-.0,4.57,-1.73],[-2.35,4.57,-1.73]);rail([-6.9,4.57,1.1],[-2.75,4.57,1.1]);
 // Great room, with the seating grouped around a stone hearth on the west wall.
 slab(-6.9,-.15,-8.15,-1.9,.658,linen);box(4.7,.012,4.0,-3.55,.674,-5.1,rug);
 for(const [x,z,w,a]of[[-4.1,-6.8,2.5,0],[-1.65,-5.1,3.0,Math.PI/2],[-4.1,-2.65,1.8,Math.PI]]){createCraftedSofa(root,{x,y:.68,z,width:w,angle:a});solid(x,z,Math.abs(Math.cos(a))*w+Math.abs(Math.sin(a))*1.25,Math.abs(Math.sin(a))*w+Math.abs(Math.cos(a))*1.25,.65,1.75);}
 createCraftedCoffeeTable(root,{x:-4.0,y:.68,z:-5.0,width:1.5,depth:.85});solid(-4,-5,1.5,.85,.65,1.25);
 box(.32,5.9,1.95,-6.90,3.60,-5.0,stone);box(.38,1.1,1.35,-6.70,1.4,-5.0,black);box(.045,.38,.85,-6.49,1.25,-5.0,glow);box(.56,.13,2.2,-6.7,2.08,-5,wood);solid(-6.75,-5,.65,2.2,.65,6.6);
 plant(-6.55,-7.8);plant(-.15,-2.7);
 // Kitchen: oak cabinetry, pale quartz, open island with breakfast seating.
 function cabinet(x,z,w=1.1,a=0){const g=new THREE.Group();g.position.set(x,.65,z);g.rotation.y=a;root.add(g);const b=(w,h,d,x,y,z,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);g.add(o);return o;};b(w,.80,.65,0,.43,0,wood);b(w+.04,.06,.71,0,.87,0,quartz);for(const sign of[-1,1]){b(w/2-.035,.65,.025,sign*w/4,.44,.34,wood);b(.08,.012,.025,sign*w/4,.64,.366,brass);}solid(x,z,Math.abs(Math.cos(a))*w+Math.abs(Math.sin(a))*.71,Math.abs(Math.sin(a))*w+Math.abs(Math.cos(a))*.71,.65,1.57);}
 for(const x of[1.4,2.6,3.8,5.0,6.2])cabinet(x,-7.95,1.16);for(const z of[-6.8,-5.6])cabinet(6.7,z,1.16,-Math.PI/2);
 box(5.9,.62,.025,3.8,1.91,-8.36,quartz);for(const x of[1.4,2.6,5.0,6.2]){box(1.08,.80,.34,x,2.64,-8.15,wood);box(1,.72,.025,x,2.64,-7.965,wood);box(.16,.015,.03,x,2.4,-7.94,brass);}
 createReferenceRange(root,{x:3.8,y:.65,z:-7.91,width:1.08,height:.91,depth:.66});solid(3.8,-7.9,1.1,.72,.65,1.6);box(1.18,.19,.64,3.8,2.50,-8.03,steel);box(.45,.55,.35,3.8,2.87,-8.15,steel);
 createFrenchDoorFridge(root,{x:6.62,y:.65,z:-4.2,width:1.0,height:2.0,depth:.88,angle:-Math.PI/2});solid(6.62,-4.2,.95,1.05,.65,2.7);
 cabinet(3.8,-5.45,2.9);box(3.15,.075,1.2,3.8,1.56,-5.34,quartz);for(const x of[2.8,3.8,4.8]){cyl(.22,.10,x,1.20,-4.15,linen);for(const dx of[-.15,.15])for(const dz of[-.15,.15])box(.035,.49,.035,x+dx,.905,-4.15+dz,wood);solid(x,-4.15,.48,.48,.65,1.25);pendant(x,-5.35,2.65);}
 // Open inset sink and arched faucet at the rear window.
 box(.84,.025,.47,2.6,1.565,-7.92,steel);box(.66,.026,.32,2.6,1.58,-7.90,black);pipe([2.6,1.58,-8.17],[2.6,1.94,-8.17],.023,steel);pipe([2.6,1.94,-8.17],[2.6,1.94,-7.92],.023,steel);
 // Breakfast table between the great room and kitchen, plus the separate dining room.
 const breakfast=createCraftedDiningSet(root,{x:.15,y:.65,z:-6.50,width:1.65,depth:1.0});breakfast.scale.set(.70,.85,.70);solid(.15,-6.5,1.6,2.05,.65,1.6);
 box(4.8,.012,2.95,4.1,.665,-1.50,rug);const dining=createCraftedDiningSet(root,{x:4.1,y:.68,z:-1.5,width:2.65,depth:1.10});dining.scale.z=.70;solid(4.1,-1.5,2.9,2.05,.65,1.8);pendant(4.1,-1.5,2.65);art(4.2,2.35,.205,1.6,.65);
 // Bedroom furniture keeps door approaches and the central hall unobstructed.
 function bedroom(name,x,z,w,l,y,a=0){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=a;root.add(g);createDetailedBed(g,{width:w,length:l});solid(x,z,Math.abs(Math.cos(a))*w+Math.abs(Math.sin(a))*l,Math.abs(Math.sin(a))*w+Math.abs(Math.cos(a))*l,y,y+1.1);for(const side of[-1,1]){const dx=side*(w/2+.31),dz=-l/2+.2,xx=x+Math.cos(a)*dx+Math.sin(a)*dz,zz=z-Math.sin(a)*dx+Math.cos(a)*dz;box(.43,.45,.43,xx,y+.225,zz,wood);cyl(.08,.18,xx,y+.54,zz,brass);cyl(.13,.18,xx,y+.72,zz,white);}root.userData[name]={x,z,y};}
 carpet(-6.98,-3.29,2.89,6.40,.66);bedroom('downstairsBed',-5.3,4.6,1.5,2.1,.68,Math.PI/2);art(-5.0,2.18,2.89,1.1,.65);
 carpet(.80,4.50,-8.30,1.0,3.66);bedroom('primaryBed',2.7,-5.8,1.9,2.3,3.68);box(1.45,.8,.45,2.75,4.05,-.55,wood);solid(2.75,-.55,1.45,.45,3.65,4.5);
 carpet(-6.98,-1.09,3.10,8.30,3.66);bedroom('bedroom2Bed',-4.9,6.3,1.55,2.2,3.68);box(1.6,1.8,.58,-6.55,4.55,3.7,wood);solid(-6.55,3.7,1.0,.6,3.65,5.5);
 carpet(1.40,6.98,3.10,8.30,3.66);bedroom('bedroom3Bed',4.75,6.3,1.55,2.2,3.68);box(1.5,1.7,.58,6.45,4.5,3.75,wood);solid(6.45,3.75,.65,1.6,3.65,5.4);
 // Real fixtures sized for the compact bathrooms, with clear center aisles.
 function toilet(x,z,y,a=0){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=a;root.add(g);const b=(w,h,d,x,yy,z,m=white)=>{const o=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,.03),m);o.position.set(x,yy,z);g.add(o);};b(.37,.32,.50,0,.18,0);b(.48,.18,.62,0,.43,.02);b(.42,.48,.14,0,.55,-.25);b(.12,.015,.045,0,.80,-.25,steel);solid(x,z,.55,.73,y,y+.9);}
 function vanity(x,z,w,y,a=0){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=a;root.add(g);const b=(ww,h,d,x,yy,z,m)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(ww,h,d),m);o.position.set(x,yy,z);g.add(o);};b(w,.72,.52,0,.43,0,wood);b(w+.04,.06,.58,0,.82,0,quartz);b(w-.16,.55,.025,0,.45,.28,wood);b(.20,.018,.025,0,.63,.31,brass);const bowl=new THREE.Mesh(new THREE.TorusGeometry(.17,.035,8,24),white);bowl.rotation.x=-Math.PI/2;bowl.scale.y=1.35;bowl.position.set(0,.87,0);g.add(bowl);b(.05,.23,.04,0,.97,-.17,steel);b(.05,.03,.19,0,1.09,-.08,steel);b(w-.02,.70,.035,0,1.65,-.27,dark);b(w-.10,.62,.012,0,1.65,-.245,glass);solid(x,z,a? .62:w+.05,a?w+.05:.62,y,y+1.1);}
 function tub(x,z,y,angle=0){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=angle;root.add(g);const points=[[0,.10],[.45,.10],[.54,.18],[.60,.57],[.60,.64],[.52,.64],[.46,.22],[0,.22]].map(p=>new THREE.Vector2(...p));const o=new THREE.Mesh(new THREE.LatheGeometry(points,32),white);o.scale.set(1,1,1.60);g.add(o);solid(x,z,angle?1.95:1.25,angle?1.25:1.95,y,y+.65);}
 slab(-7.0,-4.4,1.19,2.7,.668,tile);vanity(-5.35,1.48,.70,.69);toilet(-6.50,2.18,.69,Math.PI/2);downlight(-5.6,1.9);
 slab(4.70,7.0,-8.3,-3.3,3.668,tile);vanity(5.85,-7.95,1.8,3.69);tub(6.25,-5.90,3.69);toilet(6.55,-3.8,3.69,-Math.PI/2);
 // Glass shower sits against the opposite solid wall, away from the entry.
 box(.95,.06,1.1,5.25,3.72,-5.8,white);box(.025,1.95,1.1,5.72,4.70,-5.8,glass);pipe([4.80,4.8,-6.2],[4.80,5.65,-6.2],.02,steel);pipe([4.80,5.65,-6.2],[5.1,5.65,-6.2],.02,steel);solid(5.25,-5.8,.95,1.1,3.65,5.7);
 slab(-.90,1.20,4.4,8.30,3.668,tile);vanity(-.58,5.65,.75,3.69,Math.PI/2);toilet(.78,5.15,3.69,-Math.PI/2);tub(.15,7.45,3.69,Math.PI/2);downlight(.15,6.15,6.96);
 // Walk-in wardrobe and laundry have physical depth, not blank door props.
 for(const xx of[6.78]){box(.38,.08,2.30,xx,5.70,-1.85,wood);pipe([xx,5.48,-2.9],[xx,5.48,-.80],.018,steel);for(let j=0;j<8;j++)box(.25,.65,.07,xx,5.10,-2.75+j*.25,j%2?linen:dark);solid(xx,-1.85,.4,2.3,3.65,5.8);}
 for(const xx of[5.35,6.35]){rounded(.85,.9,.78,xx,4.13,.15,white);const drum=new THREE.Mesh(new THREE.TorusGeometry(.245,.035,10,32),steel);drum.position.set(xx,4.16,.56);root.add(drum);cyl(.04,.02,xx+.22,4.44,.56,black);box(.70,.05,.46,xx,5.60,.0,wood);solid(xx,.15,.88,.8,3.65,4.65);}vanity(6.75,2.1,.70,3.69,-Math.PI/2);
 // Landing reading area and a useful foyer console.
 for(const xx of[-6.25]){rounded(.65,.18,.70,xx,4.15,2.1,linen);rounded(.65,.65,.15,xx,4.44,2.38,linen);for(const dx of[-.25,.25])box(.05,.40,.05,xx+dx,3.85,2.1,wood);solid(xx,2.15,.7,.8,3.65,4.8);}
 box(1.45,.07,.38,-2.30,1.38,7.80,wood);for(const xx of[-2.90,-1.70])box(.07,.70,.30,xx,1.0,7.80,wood);solid(-2.3,7.8,1.45,.40,.65,1.5);art(-2.3,2.15,8.30,1.25,.7);
 // Garage workshop is tucked along the back wall, preserving the driveway opening.
 box(2.7,.10,.65,5.3,1.02,.75,wood);for(const xx of[4.15,6.45])box(.10,.85,.55,xx,.55,.75,dark);box(2.7,.9,.045,5.3,1.7,.43,wood);for(let i=0;i<7;i++)pipe([4.35+i*.3,1.55,.47],[4.35+i*.3,1.95,.47],.016,steel);solid(5.3,.75,2.7,.7,.09,2.2);
 for(const [xx,zz]of[[-1.5,5.7],[-5,4.7],[4.1,-1.5],[2.0,-7.0],[5.7,5.5]])downlight(xx,zz,zz>3&&xx>1?6.96:3.48);
 root.userData.interiorPlan={rooms,upperFloors,openGreatRoom:{x0:-7.1,x1:.70,z0:-8.4,z1:-1.70},stair:{west,east,lowZ,highZ,run}};
 function stairAt(x,z){if(x>=west&&x<=east&&Math.abs(z-lowZ)<.56)return{height:.65+Math.min(1,Math.max(0,(east-x)/run))*rise,progress:(east-x)/run*.5};if(x>=-6.9&&x<west&&z>-1.51&&z<1.07)return{height:2.15,progress:.5};if(x>=west&&x<=east&&Math.abs(z-highZ)<.56)return{height:2.15+Math.min(1,Math.max(0,(x-west)/run))*rise,progress:.5+(x-west)/run*.5};return null;}
 return{stairAt,groundHeightAt:(x,z)=>x>1.25&&x<2.40&&Math.abs(z-2.7)<.50?.65-Math.max(0,x-1.62)/.78*.56:(z>.30&&z<1.44&&Math.abs(x-2.45)<.5?.65-Math.max(0,z-.66)/.78*.56:(x>1.33&&z>.38?.09:.65)),upperFloorAt:(x,z)=>upperFloors.some(r=>x>=r.x0&&x<=r.x1&&z>=r.z0&&z<=r.z1),garageAt:(x,z)=>x>1.33&&z>.38,rooms};
}
