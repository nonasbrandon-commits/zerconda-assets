import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function addNewsSatelliteDishes(parent){
 const root=new THREE.Group();root.name='News rooftop broadcast dishes';parent.add(root);
 const silver=new THREE.MeshStandardMaterial({color:0xe4e8ef,metalness:.45,roughness:.29,side:THREE.DoubleSide}),steel=new THREE.MeshStandardMaterial({color:0x687582,metalness:.8,roughness:.3}),dark=new THREE.MeshStandardMaterial({color:0x26313e,metalness:.6,roughness:.4});
 function mesh(g,geo,m,p=[0,0,0]){const o=new THREE.Mesh(geo,m);o.position.set(...p);o.castShadow=o.receiveShadow=true;g.add(o);return o;}
 function beam(g,a,b,r=.045,m=steel){const v=new THREE.Vector3(...a),w=new THREE.Vector3(...b),o=mesh(g,new THREE.CylinderGeometry(r,r,v.distanceTo(w),10),m);o.position.copy(v).add(w).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),w.sub(v).normalize());return o;}
 const R=2.5,geometry=new THREE.BufferGeometry(),positions=[],uv=[],ids=[],rings=18,segments=72;for(let j=0;j<=rings;j++)for(let i=0;i<=segments;i++){const r=R*j/rings,a=i/segments*Math.PI*2;positions.push(Math.cos(a)*r,Math.sin(a)*r,.43*(r/R)**2);uv.push(i/segments,j/rings);if(j<rings&&i<segments){const k=j*(segments+1)+i;ids.push(k,k+1,k+segments+1,k+1,k+segments+2,k+segments+1);}}geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.setIndex(ids);geometry.computeVertexNormals();
 for(const [i,x]of[135,147].entries()){
  const base=new THREE.Group();base.name=i?'Red rim satellite dish':'Blue rim satellite dish';base.position.set(x,35.35,-53);root.add(base);
  mesh(base,new THREE.CylinderGeometry(.85,1.0,.22,24),steel,[0,.11,0]);mesh(base,new THREE.CylinderGeometry(.42,.60,2.2,24),steel,[0,1.30,0]);for(const angle of [0,Math.PI/2,Math.PI,Math.PI*1.5])beam(base,[Math.cos(angle)*.8,.2,Math.sin(angle)*.8],[0,2.2,0],.075);
  const bowl=new THREE.Group();bowl.position.y=3.1;bowl.rotation.set(-.70,i?-.38:.38,0);base.add(bowl);mesh(bowl,geometry,silver);
  mesh(bowl,new THREE.TorusGeometry(R,.075,10,72),silver,[0,0,.43]);mesh(bowl,new THREE.TorusGeometry(R-.025,.095,10,72),dark,[0,0,.30]);
  const glow=new THREE.MeshStandardMaterial({color:i?0xff2929:0x219cff,emissive:i?0xff1616:0x078cff,emissiveIntensity:2,roughness:.3});for(let k=0;k<16;k++){const segment=mesh(bowl,new THREE.TorusGeometry(R+.035,.032,6,8,Math.PI*2/16*.75),glow,[0,0,.53]);segment.rotation.z=k*Math.PI*2/16;}
  for(let k=0;k<16;k++){const a=k*Math.PI/8,ps=[];for(let j=1;j<=18;j++){const r=R*j/18;ps.push(new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r,.43*(r/R)**2+.008));}mesh(bowl,new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ps),18,.009,5,false),steel);}
  for(let k=0;k<3;k++){const a=k*Math.PI*2/3+Math.PI/2,r=R*.78,p=[Math.cos(a)*r,Math.sin(a)*r,.43*.78**2+.04];beam(bowl,p,[0,0,2.03],.047,silver);const collar=mesh(bowl,new THREE.CylinderGeometry(.115,.115,.06,16),steel,p);collar.rotation.x=Math.PI/2;}
  const feed=mesh(bowl,new THREE.CylinderGeometry(.30,.34,.48,28),silver,[0,0,2.10]);feed.rotation.x=Math.PI/2;const receiver=mesh(bowl,new THREE.CylinderGeometry(.21,.21,.14,24),dark,[0,0,1.80]);receiver.rotation.x=Math.PI/2;mesh(bowl,new THREE.CylinderGeometry(.28,.28,.06,28),silver,[0,0,.035]).rotation.x=Math.PI/2;
 }
 root.updateMatrixWorld(true);const inverse=root.matrixWorld.clone().invert(),groups=new Map();root.traverse(o=>{if(!o.isMesh)return;const g=o.geometry.clone().applyMatrix4(inverse.clone().multiply(o.matrixWorld)),list=groups.get(o.material)||[];list.push(g.index?g.toNonIndexed():g);groups.set(o.material,list);});root.clear();for(const [material,geos]of groups){const merged=new THREE.Mesh(mergeGeometries(geos),material);merged.name='Broadcast dish structure';root.add(merged);geos.forEach(g=>g.dispose());}root.userData.dishCount=2;
 return root;
}
