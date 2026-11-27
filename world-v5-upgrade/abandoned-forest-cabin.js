import {createRuinedChimney} from './ruined-chimney.js?v=448';
import {createRustedBarrel} from './rusted-barrel.js?v=448';
import {nearForestGravelRoad} from './forest-gravel-roads.js?v=20261123-natural-v264';
import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {loadStreetTree} from './street-tree-assets.js?v=20261121-fast-start-v205';
import {addNaturalFerns} from './forest-natural-details.js?v=20261121-forest-airfield-v193';
import {mountainHeightAt,nearMountainTrail,MOUNTAIN_CABIN_SITE} from './mountain-wilderness.js?v=20261124-trails-v307';
// Authored, static ruin inspired by the supplied reference; no reference photographs are shipped.
export function createAbandonedForestCabin(scene,{site=MOUNTAIN_CABIN_SITE,compact=false,withTruck=true}={}){
 const S=site,Y=mountainHeightAt(S.x,S.z)??.02,root=new T.Group();root.name='Abandoned cedar cabin and rusted pickup';root.position.set(S.x,Y,S.z);root.userData.distanceManaged=true;scene.add(root);const batches=new Map(),solids=[];let seed=44703;const rnd=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/4294967296);
 function texture(kind){const c=document.createElement('canvas');c.width=c.height=256;const p=c.getContext('2d');p.fillStyle=kind==='rust'?'#657f79':'#514a37';p.fillRect(0,0,256,256);for(let i=0;i<14000;i++){const x=rnd()*256,y=rnd()*256;p.fillStyle=kind==='rust'?['#59382a','#885132','#ad7044','#273a34','#68837c'][i%5]:['#242b22','#8c8270','#615c4c','#333d26','#696d3a'][i%5];p.globalAlpha=.2+rnd()*.55;p.fillRect(x,y,kind==='rust'?2+rnd()*9:.5+rnd()*2,kind==='rust'?1+rnd()*6:5+rnd()*60);}p.globalAlpha=1;const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
 const loadSurface=name=>{const t=new T.TextureLoader().load(new URL('./assets/'+name,import.meta.url).href);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;},woodMap=loadSurface('weathered-wood-v447.jpg'),rustMap=loadSurface('rusted-metal-v447.jpg');
 const wood=new T.MeshStandardMaterial({map:woodMap,bumpMap:woodMap,bumpScale:.045,color:'#969184',roughness:.99}),rust=new T.MeshStandardMaterial({map:rustMap,bumpMap:rustMap,bumpScale:.025,roughness:.92,metalness:.35}),roof=new T.MeshStandardMaterial({color:'#4e4538',map:rustMap,bumpMap:rustMap,bumpScale:.035,roughness:.95,metalness:.2}),dark=new T.MeshStandardMaterial({color:'#292b25',roughness:1}),stone=new T.MeshStandardMaterial({color:'#77766a',roughness:1}),moss=new T.MeshStandardMaterial({color:'#526038',roughness:1}),glass=new T.MeshStandardMaterial({color:'#9ba6a0',transparent:true,opacity:.35,roughness:.7,side:T.DoubleSide}),metal=new T.MeshStandardMaterial({color:'#746b54',roughness:.8,metalness:.4});
 function part(g,m,x,y,z,rx=0,ry=0,rz=0){g.applyMatrix4(new T.Matrix4().compose(new T.Vector3(x,y,z),new T.Quaternion().setFromEuler(new T.Euler(rx,ry,rz)),new T.Vector3(1,1,1)));const a=batches.get(m)||[];if(m===wood){const p=g.attributes.position,n=g.attributes.normal,u=g.attributes.uv;for(let i=0;i<p.count;i++){const side=Math.abs(n.getX(i))>.7,floor=Math.abs(n.getY(i))>.7;u.setXY(i,(side?p.getZ(i):p.getX(i))*.23,(floor?p.getZ(i):p.getY(i))*.62);}}if(g.index){const n=g.toNonIndexed();g.dispose();g=n;}a.push(g);batches.set(m,a);}
 const box=(w,h,d,x,y,z,m=wood,rz=0)=>part(new T.BoxGeometry(w,h,d),m,x,y,z,0,0,rz);
 const solid=(x,z,w,d)=>solids.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2});
 // Raised weathered floor; front doorway and two genuine empty window openings.
 for(let x=-3.9;x<4;x+=.24)box(.225,.18,6,x,.18,0);for(let x=-3.9;x<4;x+=.24)box(.225,.16,2.2,x,.18,4.15);
 for(let row=0;row<15;row++){const y=.45+row*.2,cut=[];if(y<2.55)cut.push([(compact?1.5:0)-.78,(compact?1.5:0)+.78]);if(y>1.1&&y<2.35)for(const x of(compact?[-2.3]:[-2.5,2.5]))cut.push([x-.8,x+.8]);cut.sort((a,b)=>a[0]-b[0]);let left=-4;for(const [a,b]of [...cut,[4,4]]){if(a>left)box(a-left-.02,.183,.16,(left+a)/2,y,3,wood,(rnd()-.5)*.006);left=Math.max(left,b);}box(7.96,.183,.16,0,y,-3);for(const x of[-4,4])box(.16,.183,5.97,x,y,0);}
 for(let y=3.3;y<4.55;y+=.2){const w=Math.max(.3,(4.6-y)/.34*2);for(const z of[-3,3]){if(z===3&&y>3.8){box(w*.27,.18,.13,-w*.34,y,z);box(w*.27,.18,.13,w*.34,y,z);}else box(w,.18,.13,0,y,z);}}

 solid(-4,0,.18,6);solid(4,0,.18,6);solid(0,-3,8,.18);if(compact){solid(-1.6,3,4.8,.18);solid(3.2,3,1.6,.18);}else{solid(-2.4,3,3.2,.18);solid(2.4,3,3.2,.18);}
 for(const x of[-4,4]){box(.24,3.15,.24,x,1.75,3.05);box(.18,3.05,.18,x,1.7,5.15);solid(x,5.15,.2,.2);}box(8.2,.2,.24,0,3.15,5.15);
 for(const side of[-1,1])for(let row=0;row<8;row++)for(let z=-3.2;z<3.4;z+=.52){if(rnd()<.21)continue;const x=side*(.28+row*.51),y=4.6-Math.abs(x)*.34;box(.55,.12,.5,x,y,z,roof,-side*.328);if(rnd()<.3)box(.35,.035,.4,x,y+.09,z,moss,-side*.328);}
 for(const side of[-1,1])for(let x=0;x<4.2;x+=.5)box(.09,.12,6.8,side*x,4.59-x*.34,0,dark,-side*.328);
 for(let x=-3.8;x<4;x+=.54){if(rnd()<.28)continue;box(.57,.1,2.6,x,3.18,4.25,roof,.03);}
 for(const x of(compact?[-2.3]:[-2.5,2.5])){for(const dx of[-.83,.83])box(.1,1.45,.2,x+dx,1.75,3.04);box(1.76,.12,.2,x,1.05,3.04);box(1.76,.12,.2,x,2.45,3.04);box(1.8,.15,.12,x,1.7,3.15,wood,x<0?.16:-.2);part(new T.PlaneGeometry(.35,.55),glass,x+.38,2.1,3.03,0,0,.13);}
 for(const x of(compact?[]:[-3.4,-2.9,-2.4,2.4,2.9,3.4])){box(.065,.8,.065,x,.72,5.15,wood,(rnd()-.5)*.2);}for(const x of(compact?[]:[-2.8,2.8]))box(2.3,.1,.1,x,1.15,5.15);
 for(let i=0;i<3;i++)box(1.8,.1,.42,compact?1.5:0,.21-i*.065,5.25+i*.4);
 // Crumbling stone chimney and rubble, a rusty barrel and a collapsed porch chair.
 const chimney=createRuinedChimney();chimney.position.set(-3.32,0,-2.3);root.add(chimney);
 for(let i=0;i<22;i++){const a=rnd()*6.28,r=4+rnd()*8;part(new T.DodecahedronGeometry(.14+rnd()*.25,0),i%3?stone:moss,Math.cos(a)*r,.12,Math.sin(a)*r);}
 const barrel=createRustedBarrel();barrel.position.set(-5.1,0,4.7);root.add(barrel);solid(-5.1,4.7,.75,.75);
 box(.7,.1,.7,2.7,.48,4.2,wood,.18);box(.7,.8,.08,2.7,.85,3.9,wood,.2);for(const x of[2.4,3])for(const z of[3.9,4.5])box(.065,.4,.065,x,.22,z,wood,.17);solid(2.7,4.2,.9,1);
 // Faded 1950s pickup with rounded hood/fenders, open bed and a broken windshield.
 const truck=new T.Group();truck.name='Static abandoned rusted pickup';truck.position.set(9,.0,1);truck.rotation.y=.35;if(withTruck)root.add(truck);const truckParts=[];
 function tbox(w,h,d,x,y,z,m=rust,r=.08){const o=new T.Mesh(new RoundedBoxGeometry(w,h,d,2,r),m);o.position.set(x,y,z);truck.add(o);truckParts.push(o);return o;}
 tbox(2.1,.3,5.3,0,.52,0,dark);tbox(2,.65,1.8,0,1.1,1.4);tbox(2.08,.18,1.9,0,1.46,1.4);tbox(2.05,.9,1.45,0,1.05,-.3);tbox(2.1,.15,1.65,0,2.16,-.3);
 for(const x of[-.96,.96]){tbox(.13,.68,.12,x,1.8,.4);tbox(.13,.68,.12,x,1.8,-1);tbox(.12,.5,2.2,x,1.05,-1.9);tbox(.12,.14,2.3,x,1.38,-1.9);tbox(.1,.62,1.1,x,1.1,-.3);}
 tbox(2,.1,2.1,0,.77,-1.9);tbox(2,.52,.13,0,1.06,-2.98);tbox(2.2,.17,.18,0,.57,2.5,metal);tbox(2.15,.17,.18,0,.57,-3.1,metal);for(let y=.75;y<1.24;y+=.14)tbox(1.5,.055,.15,0,y,2.32,metal);
 for(const x of[-.8,.8]){const light=new T.Mesh(new T.CylinderGeometry(.22,.22,.08,16),metal);light.rotation.x=Math.PI/2;light.position.set(x,1.2,2.35);truck.add(light);}
 for(const x of[-1.02,1.02])for(const z of[-1.95,1.65]){const tire=new T.Mesh(new T.CylinderGeometry(.5,.5,.28,20),dark);tire.rotation.z=Math.PI/2;tire.position.set(x,.46,z);tire.scale.x=.8;truck.add(tire);tbox(.33,.28,1.24,x,.95,z,rust,.12);const hub=new T.Mesh(new T.CylinderGeometry(.27,.27,.30,12),rust);hub.rotation.z=Math.PI/2;hub.position.copy(tire.position);truck.add(hub);}
 // Small separate panes leave the center visibly broken, with pale crack edges.
 for(const [x,w]of[[-.67,.5],[.69,.45]]){const o=new T.Mesh(new T.PlaneGeometry(w,.57),glass);o.position.set(x,1.8,.47);truck.add(o);}for(let i=0;i<9;i++){const o=new T.Mesh(new T.BoxGeometry(.015,.3,.015),stone);o.position.set(-.7+rnd()*1.4,1.6+rnd()*.4,.485);o.rotation.z=rnd()*3;truck.add(o);}
 for(let i=0;i<18;i++)tbox(.15+rnd()*.2,.02,.14+rnd()*.3,(rnd()-.5)*1.7,1.57,1.1+rnd(),moss,.005);if(withTruck)solid(9,1,4.1,7.5);
 if(compact){
 const linen=new T.MeshStandardMaterial({color:'#635b46',roughness:1});box(1.7,.18,2.4,2,.55,-1.1);box(1.6,.23,2.3,2,.76,-1.1,linen);box(1.3,.16,.55,2,.98,-1.9,linen);for(const x of[1.3,2.7])for(const z of[-2.1,-.1])box(.12,.5,.12,x,.25,z);solid(2,-1.1,1.7,2.4);
 box(1.1,.12,.8,-.3,.9,-.3);for(const x of[-.72,.12])for(const z of[-.6,0])box(.08,.85,.08,x,.43,z);solid(-.3,-.3,1.1,.8);
 // Sagging corrugated awning, broken rake trim and a small threshold over the shifted door.
 for(let x=-4;x<=4;x+=.16){const y=3.25+Math.sin(x*40)*.025;box(.16,.045,2.25,x,y,4.15,roof);}for(const side of[-1,1])box(.17,.14,6.8,side*2.1,3.92,0,wood,-side*.328);
 }
 // Ground plants and additional detailed trees form a clearing, never intersecting the ruin.
 const fernPoints=[];for(let i=0;i<130;i++){const a=rnd()*6.28,r=10+rnd()*20,x=Math.cos(a)*r,z=Math.sin(a)*r;if(x>4&&x<15&&Math.abs(z-1)<6||Math.abs(x)<2&&z>3&&z<13)continue;fernPoints.push({x,z,y:(mountainHeightAt(S.x+x,S.z+z)??Y)-Y,scale:1+rnd(),angle:rnd()*6.28});}addNaturalFerns(root,fernPoints);
 const treeReady=loadStreetTree('small').then(source=>{source.updateMatrixWorld(true);const b=new T.Box3().setFromObject(source),height=b.max.y-b.min.y,width=Math.max(b.max.x-b.min.x,b.max.z-b.min.z);for(let i=0;i<18;i++){const a=i/18*Math.PI*2+.08,r=23+rnd()*10,x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)<4&&z>0)continue;const tree=source.clone(true),h=7+rnd()*5,scale=h/height;if(S.x>-720&&S.x+x-width*scale/2< -718||nearForestGravelRoad(S.x+x,S.z+z,width*scale/2+1)||nearMountainTrail(S.x+x,S.z+z,width*scale/2+1))continue;tree.scale.multiplyScalar(scale);tree.updateMatrixWorld(true);const q=new T.Box3().setFromObject(tree),c=q.getCenter(new T.Vector3());tree.position.set(x-c.x,(mountainHeightAt(S.x+x,S.z+z)??Y)-Y-q.min.y,z-c.z);tree.rotation.y=rnd()*6.28;tree.userData.abandonedClearingTree=true;tree.userData.roadCleared=true;root.add(tree);solid(x,z,.65,.65);}return true;}).catch(e=>{console.warn('Cabin clearing trees',e.message);return false;});
 for(const [m,list]of batches){const g=mergeGeometries(list);list.forEach(g=>g.dispose());const o=new T.Mesh(g,m);o.receiveShadow=true;root.add(o);}root.updateMatrixWorld(true);
 return{root,treeReady,blocks(x,z){x-=S.x;z-=S.z;return solids.some(b=>x>b.x0-.27&&x<b.x1+.27&&z>b.z0-.27&&z<b.z1+.27);},heightAt(x,z){x-=S.x;z-=S.z;if(Math.abs(x)<4&&z> -3&&z<5.2)return Y+.27;if(Math.abs(x-(compact?1.5:0))<.9&&z>=5.2&&z<6.5)return Y+.27*(6.5-z)/1.3;return null;},update(player){root.visible=Math.hypot(player.x-S.x,player.z-S.z)<250;},stats:()=>({site:S,cabin:true,staticTruck:withTruck,extraTrees:root.children.filter(o=>o.userData.abandonedClearingTree).length,ferns:fernPoints.length})};
}
