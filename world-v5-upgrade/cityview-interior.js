import * as THREE from 'three';
import {CITYVIEW,cityviewFloorY,cityviewMaterials,cityviewBox,cityviewText,cityviewPlant} from './cityview-building.js?v=20261124-cityview-v326';
import {createDetailedBathroom,createDetailedBed} from './residential-furnishings.js?v=20261122-bath-fit-v221';
import {createCraftedSofa} from './crafted-sofa.js?v=20261122-walnut-v221';
import {createCraftedCoffeeTable} from './crafted-coffee-table.js?v=20261122-walnut-v221';
import {createCraftedDiningSet} from './crafted-dining.js?v=20261122-dining-v224';
import {createReferenceRange,createShakerCabinet} from './reference-range.js?v=20261119-performance-v147';
import {createFrenchDoorFridge} from './french-door-fridge.js?v=20261119-performance-v147';
import {createKitchenSink} from './kitchen-sink.js?v=20261122-private-homes-v214';
import {applyGrayWoodFloor} from './gray-wood-floor.js?v=20261122-gray-oak-v225';
import {createTuftedCornerChaise} from './tufted-corner-chaise.js?v=20261124-chaise-v323';
export function buildCityviewInterior(scene,level){const root=new THREE.Group();root.userData.customInterior=true;root.name='Cityview '+(level?'level '+level+' full-floor apartment':'public lobby');root.position.set(CITYVIEW.x,cityviewFloorY(level),CITYVIEW.z);root.rotation.y=CITYVIEW.angle;scene.add(root);const m=cityviewMaterials(),solids=[],doors=[];const box=(...a)=>cityviewBox(root,...a),solid=(x,z,w,d)=>solids.push({x,z,w,d});const H=level?3.32:3.9;
const floor=box(28,.12,20,0,-.06,0,m.cream);if(level)applyGrayWoodFloor(floor);else floor.material=m.stone;
box(28,.12,20,0,H+.06,0,m.cream);for(const x of[-13.9,13.9]){box(.2,.5,20,x,.25,0,m.cream);box(.2,.4,20,x,H-.2,0,m.cream);box(.03,H-.9,20,x,H/2+.05,0,m.glass);for(const z of[-9,-5,-1,3,7,9.8])box(.10,H,.12,x,H/2,z,m.dark);}
box(28,H,.20,0,H/2,-9.9,m.cream);for(const x of[-11,-7,-3,3,7,11]){if(level&&Math.abs(x)===7)continue;box(3.7,2.2,.035,x,1.8,9.93,m.glass);box(.08,H,.12,x+1.9,H/2,9.9,m.dark);}for(const y of(level?[H-.15]:[.25,H-.15]))box(28,.3,.18,0,y,9.9,m.cream);
for(const x of[-10,-4,4,10])for(const z of[-6,2,8]){box(.20,.018,.20,x,H-.02,z,m.warm);}
const ambient=new THREE.HemisphereLight('#f5f4ee','#8c8b85',1.8);root.add(ambient);for(const x of[-7,7]){const light=new THREE.PointLight('#fff2dd',35,22,2);light.position.set(x,H-.35,0);root.add(light);}
function door(x,z,width=1.5,angle=0,label='room',glass=false){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=angle;root.add(g);const leaf=new THREE.Group();g.add(leaf);cityviewBox(leaf,width,2.6,.08,0,1.3,0,glass?m.glass:m.wood,.01);for(const y of(glass?[]:[.55,1.1,1.65,2.2]))for(const side of[-1,1])cityviewBox(leaf,width-.08,.018,.012,0,y,side*.046,m.metal);for(const side of[-1,1]){cityviewBox(leaf,.19,.03,.04,width*.35,1.07,side*.075,m.metal);cityviewBox(g,.1,2.75,.19,-width/2-.05,1.37,side*.01,m.dark);cityviewBox(g,.1,2.75,.19,width/2+.05,1.37,side*.01,m.dark);}cityviewBox(g,width+.2,.14,.2,0,2.73,0,m.dark);const d={x,z,width,angle,label,open:false,leaf,update(){leaf.position.x=this.open?-width-.10:0;}};doors.push(d);return d;}
// A stainless cabin and call panel are present on every stop.
const liftZ=level?8.8:-8.6;box(3.8,3,.15,0,1.5,liftZ-1.0,m.dark);for(const x of[-1.9,1.9])box(.12,3,2.3,x,1.5,liftZ,m.metal);box(3.8,.08,2.3,0,.04,liftZ,m.stone);box(3.8,.08,2.3,0,3,liftZ,m.metal);for(const x of[-.91,.91])box(1.78,2.75,.06,x,1.4,liftZ-1.08,m.metal);box(.22,.5,.08,2.15,1.3,liftZ+.8,m.dark);const liftSign=cityviewText(root,level?'APARTMENT ELEVATOR':'LOBBY',2.8,.35,0,2.8,liftZ+(level?-1.22:1.18));if(level)liftSign.rotation.y=Math.PI;solid(0,liftZ-1.0,3.8,.2);
if(!level){for(const x of[-9,9]){createCraftedSofa(root,{x,z:3.8,angle:Math.PI,width:3.8});solid(x,3.8,3.9,1.3);createCraftedCoffeeTable(root,{x,z:1.8,width:2.5});solid(x,1.8,2.6,1.2);}box(4.4,1.05,1.2,-8,.525,-5,m.wood,.04);solid(-8,-5,4.4,1.2);cityviewText(root,'CITYVIEW · RESIDENCES',9,.7,0,3.2,-9.74);for(const x of[-12,12])for(const z of[-7,7]){cityviewPlant(root,x,0,z,1.8);solid(x,z,.9,.9);}return{root,solids,doors,lift:{x:0,z:-5.8},entry:{x:0,z:8.5}};}
// Bedroom and bathroom walls are split around real doorways.
for(const [x,z,w,d]of[[-3.3,-.55,.18,5.9],[-3.3,7.0,.18,6],[-10.1,-3.5,7.6,.18],[-6.35,-7.68,.18,4.25],[-6.35,-3.83,.18,.65]]){box(w,H,d,x,H/2,z,m.cream);solid(x,z,w,d);}door(-3.3,3.2,1.6,Math.PI/2,'bedroom');door(-6.35,-4.85,1.4,Math.PI/2,'bathroom');for(const x of[-7,7])door(x,9.9,3.7,0,'balcony',true);
const bath=createDetailedBathroom(root,{x:-10.1,z:-6.7,width:7.2,depth:6.1,tub:true,wallHeight:H-.05});solids.push(...bath.solids);
createDetailedBed(root,{x:-9,z:-1.5,width:2.0,length:2.8});solid(-9,-1.5,2.3,3.1);
const chaise=createTuftedCornerChaise();chaise.position.set(-11,0,7.1);chaise.rotation.y=Math.PI;root.add(chaise);solid(-11,7.1,2.6,3.0);
box(.65,2.6,3,-13.3,1.3,3,m.wood,.02);solid(-13.3,3,.7,3);for(const z of[2.3,3.7])box(.03,.7,.03,-12.95,1.3,z,m.metal);
createCraftedSofa(root,{x:7,z:5,width:4,angle:Math.PI});solid(7,5,4.1,1.4);createCraftedCoffeeTable(root,{x:7,z:2.7,width:2.7});solid(7,2.7,2.8,1.2);
// Slim television and walnut media console, with an unobstructed route around it.
box(.45,.55,3.2,13,.275,3.5,m.wood,.02);solid(13,3.5,.6,3.3);box(.07,1.3,2.5,12.74,1.5,3.5,m.dark,.02);box(.012,1.16,2.34,12.697,1.5,3.5,new THREE.MeshBasicMaterial({color:'#17334a'}));
createCraftedDiningSet(root,{x:6.7,z:-1,width:2.7,depth:1.5});solid(6.7,-1,4.0,3.2);
for(const [x,w]of[[3.8,2.2],[7.9,2.1],[10.15,2.2]]){createShakerCabinet(root,{x,z:-9,width:w});solid(x,-9,w,.85);}createReferenceRange(root,{x:5.75,z:-9,width:1.3});solid(5.75,-9,1.35,.9);createFrenchDoorFridge(root,{x:12.5,z:-9,width:1.15,height:2.2});solid(12.5,-9,1.25,1.0);
// Sink cabinet: open central countertop cutout rather than a solid counter through the bowl.
box(2.2,.86,.8,7,.43,-5.4,m.wood,.015);solid(7,-5.4,2.3,.9);for(const x of[6.19,7.81])box(.58,.06,.86,x,.91,-5.4,m.cream);for(const z of[-5.75,-5.05])box(1.04,.06,.12,7,.91,z,m.cream);createKitchenSink(root,{x:7,y:.94,z:-5.4,width:1.02,depth:.58});
for(const x of[-9,8.8]){box(10,.15,2.8,x,-.075,11.4,m.stone);box(10,1.1,.025,x,.6,12.75,m.glass);box(10,.045,.06,x,1.16,12.77,m.metal);for(const sx of[-1,1])box(.04,1.15,2.8,x+sx*5,.6,11.4,m.metal);cityviewPlant(root,x+3.8,0,11.6,1.1);}
for(const x of[-10,11.7])cityviewPlant(root,x,0,8.8,1.2);const sign=cityviewText(root,level===10?'ADMIN · LEVEL 10':'CITYVIEW · LEVEL '+level,4,.35,3,2.8,9.77);sign.rotation.y=Math.PI;
return{root,solids,doors,setLevel(n){root.position.y=cityviewFloorY(n);const canvas=sign.material.map.image,a=canvas.getContext('2d');a.fillStyle='#16222a';a.fillRect(0,0,1024,192);a.fillStyle='#fff2db';a.font='bold 85px Arial';a.textAlign='center';a.textBaseline='middle';a.fillText(n===10?'ADMIN · LEVEL 10':'CITYVIEW · LEVEL '+n,512,100,990);sign.material.map.needsUpdate=true;},lift:{x:0,z:7.4},entry:{x:0,z:5.5}};}
