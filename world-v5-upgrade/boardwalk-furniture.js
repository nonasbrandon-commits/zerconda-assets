import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {batchApplianceParts} from './appliance-batching.js?v=20261119-performance-v147';
import {createPierFernPlanter} from './pier-fern-planter.js?v=20261120-coastal-v166';
const deckMap=new THREE.TextureLoader().load(new URL('./assets/weathered-pier-wood-v151.png',import.meta.url).href);deckMap.colorSpace=THREE.SRGBColorSpace;deckMap.wrapS=deckMap.wrapT=THREE.RepeatWrapping;deckMap.anisotropy=8;
const deckMaterial=new THREE.MeshStandardMaterial({name:'Weathered boardwalk · long timber planks, grain and nails',map:deckMap,bumpMap:deckMap,bumpScale:.010,roughness:.91});
const timber=new THREE.MeshStandardMaterial({color:'#c5a07c',map:deckMap,bumpMap:deckMap,bumpScale:.003,roughness:.72}),iron=new THREE.MeshStandardMaterial({color:'#252c30',metalness:.68,roughness:.52}),bolts=new THREE.MeshStandardMaterial({color:'#b5bec1',metalness:.85,roughness:.28});
function makeBench(){const g=new THREE.Group();g.name='Curved cast-iron and timber bench';const add=(geo,m,x,y,z)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o;},box=(w,h,d,x,y,z,m)=>{const geo=new RoundedBoxGeometry(w,h,d,3,Math.min(.018,h*.22));if(m===timber){const p=geo.attributes.position,n=geo.attributes.normal,uv=geo.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,.025+(Math.abs(n.getY(i))>.5?p.getZ(i)*.10:p.getY(i)*.14),p.getX(i)/2.12+.5);}return add(geo,m,x,y,z);},curve=(points,r=.035)=>add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),28,r,8,false),iron,0,0,0);
 for(const z of[-.105,.145])box(2.12,.065,.235,0,.515,z,timber);
 for(let i=0;i<4;i++){const y=.66+i*.135,z=-.285-(y-.66)*.11;const slat=box(2.12,.105,.055,0,y,z,timber);slat.rotation.x=-.11;for(const x of[-.91,.91]){const bolt=add(new THREE.SphereGeometry(.012,8,6),bolts,x,y,z+.034);bolt.scale.z=.35;}}
 for(const side of[-1,1]){const x=side*1.03;curve([[x,.035,-.38],[x,.25,-.27],[x,.51,-.26],[x,.85,-.31],[x,1.13,-.40]],.042);curve([[x,.035,.37],[x,.22,.31],[x,.48,.28],[x,.66,.25],[x,.75,.14],[x,.76,-.10],[x,.88,-.29]],.041);curve([[x,.14,-.31],[x,.31,-.18],[x,.39,.08],[x,.22,.31]],.025);curve([[x,.52,-.27],[x,.47,-.09],[x,.48,.12],[x,.54,.26]],.032);for(const z of[-.38,.37]){box(.23,.035,.17,x,.022,z,iron);for(const dx of[-.075,.075])add(new THREE.SphereGeometry(.012,8,6),bolts,x+dx,.047,z);}
  const scroll=[];for(let i=0;i<=24;i++){const a=i/24*Math.PI*1.7,r=.045*(1-i/38);scroll.push([x,.1+1.03+Math.sin(a)*r,-.4+Math.cos(a)*r]);}curve(scroll,.012);
 }
 for(const x of[-.91,.91])for(const z of[-.105,.145]){const o=add(new THREE.SphereGeometry(.012,8,6),bolts,x,.552,z);o.scale.y=.35;}
 batchApplianceParts(g);return g;
}
const benchTemplate=makeBench();
export function createBoardwalkFurniture(parent){const root=new THREE.Group();root.name='Boardwalk · weathered decking, ocean-view benches and fern planters';parent.add(root);
 const geo=new THREE.BoxGeometry(1012.2,.16,10),pos=geo.attributes.position,uv=geo.attributes.uv;for(let i=0;i<pos.count;i++)uv.setXY(i,(pos.getZ(i)+186)/3.6,(pos.getX(i)+63)/4.8);const deck=new THREE.Mesh(geo,deckMaterial);deck.name='Detailed grounded boardwalk planks';deck.position.set(63,.135,186);deck.receiveShadow=true;root.add(deck);
 const benches=[],planters=[],seats=[],positions=[-402,-362,-322,-282,-242,-202,-162,-122,-42,38,78,118,158,198,238,278,318,358,398,438,478,518,558];
 const edgeZ=181.65;
 for(const x of positions){const bench=benchTemplate.clone(true);bench.position.set(x,.215,edgeZ);bench.name='Ocean-facing cast-iron bench';bench.userData.referenceAsset='assets/wood-cast-iron-bench-v158.png';root.add(bench);benches.push({root:bench,x,z:edgeZ});for(const dx of[-.44,.44])seats.push({x:x+dx,z:edgeZ+.03,facing:0,sitHeight:.765,kind:'boardwalk bench'});const planter=createPierFernPlanter(root,{x:x+4.7,z:edgeZ,y:.215,height:2.45});planter.root.name='Boardwalk fern tree planter';planters.push(planter);}
 return{root,deck,benches,planters,seats,blocks(x,z){return benches.some(b=>Math.abs(x-b.x)<1.20&&Math.abs(z-b.z)<.43)||planters.some(p=>Math.hypot(x-p.x,z-p.z)<.57);}};
}
