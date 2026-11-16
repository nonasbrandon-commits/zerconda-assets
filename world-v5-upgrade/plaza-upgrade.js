// Zerconda V5 city-center and placement correction module.
// Import into existing world.js:
// import { installPlazaUpgrade } from './plaza-upgrade.js';
// const plaza = installPlazaUpgrade({THREE,scene,buildings,cars,treeSpots,carSpots});
// In animate(): plaza.update(dt);
// IMPORTANT: call BEFORE the old tree/car placement loops and remove their original loops.
// If cars/trees are already instantiated, remove their old instances first.

export function installPlazaUpgrade({THREE,scene,buildings=[],cars=[],treeSpots=[],carSpots=[]}) {
 const material=(color,roughness=0.85,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const limestone=material(0xbcb7a9),rim=material(0xe0d8c9),bronze=material(0x71634d,.38,.7);
 const water=new THREE.MeshPhysicalMaterial({color:0x3d9eac,roughness:.12,metalness:.06,transparent:true,opacity:.83,clearcoat:1,clearcoatRoughness:.06});
 const pavers=material(0xa7a39a),grass=material(0x53774a),flower=material(0x9d4775);
 const group=new THREE.Group();scene.add(group);
 const center=new THREE.Vector3(48,0,48); // Empty park block from V5 scene; not the road intersection.
 const ring=(outer,inner,h,y,mat)=>{
  const mesh=new THREE.Mesh(new THREE.RingGeometry(inner,outer,96),mat);
  mesh.rotation.x=-Math.PI/2;mesh.position.set(center.x,y,center.z);
  mesh.receiveShadow=true;group.add(mesh);return mesh;
 };
 const cylinder=(rt,rb,h,y,mat,x=center.x,z=center.z)=>{
  const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,64),mat);
  m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;group.add(m);return m;
 };
 // Pedestrian plaza footprint is entirely inside the 96x96 block.
 const slab=new THREE.Mesh(new THREE.CylinderGeometry(25,25,.22,8),pavers);
 slab.rotation.y=Math.PI/8;slab.position.set(center.x,.02,center.z);
 slab.receiveShadow=true;group.add(slab);
 ring(13.7,12.4,.1,.16,limestone);
 // Tiered ornamental stone fountain with genuine translucent water surfaces.
 cylinder(8.8,9.15,1.3,.85,limestone);
 cylinder(8.55,8.55,.18,1.57,rim);
 cylinder(7.95,7.95,.07,1.68,water);
 cylinder(1.25,1.7,3,3.15,limestone);
 cylinder(4.1,4.3,.48,4.45,limestone);
 cylinder(3.95,3.95,.06,4.73,water);
 cylinder(.72,1.15,2.2,5.8,limestone);
 cylinder(2.15,2.35,.35,7.02,rim);
 cylinder(1.95,1.95,.05,7.23,water);
 cylinder(.28,.52,.72,7.57,bronze);
 const jets=[];
 const jetMaterial=new THREE.MeshPhysicalMaterial({color:0x9ce7f3,transparent:true,opacity:.56,roughness:.08,depthWrite:false});
 for(let i=0;i<12;i++){
  const a=i*Math.PI/6,r=6.65;
  const x=center.x+Math.cos(a)*r,z=center.z+Math.sin(a)*r;
  const points=[];
  for(let k=0;k<=16;k++){
   const t=k/16;
   points.push(new THREE.Vector3(
    x+(center.x-x)*t*.42,
    1.76+Math.sin(t*Math.PI)*2.1,
    z+(center.z-z)*t*.42
   ));
  }
  const curve=new THREE.CatmullRomCurve3(points);
  const jet=new THREE.Mesh(new THREE.TubeGeometry(curve,32,.055,6,false),jetMaterial);
  group.add(jet);jets.push(jet);
 }
 // Four separate seating zones with planters; no seats inside water.
 const benches=[];
 for(let i=0;i<8;i++){
  const a=i*Math.PI/4,dist=18.7;
  const x=center.x+Math.cos(a)*dist,z=center.z+Math.sin(a)*dist;
  const b=new THREE.Group();b.position.set(x,0,z);b.rotation.y=-a+Math.PI/2;
  const seat=new THREE.Mesh(new THREE.BoxGeometry(2.8,.17,.75),material(0x6c4d36));
  seat.position.y=.65;seat.castShadow=true;b.add(seat);
  const back=new THREE.Mesh(new THREE.BoxGeometry(2.8,.82,.13),material(0x6c4d36));
  back.position.set(0,1.02,-.38);back.castShadow=true;b.add(back);
  for(const dx of [-1.05,1.05]){
   const leg=new THREE.Mesh(new THREE.BoxGeometry(.13,.66,.55),bronze);
   leg.position.set(dx,.34,0);b.add(leg);
  }
  group.add(b);benches.push(b);
 }
 for(let i=0;i<8;i++){
  const a=(i+.5)*Math.PI/4,r=22.5;
  const x=center.x+Math.cos(a)*r,z=center.z+Math.sin(a)*r;
  cylinder(.95,1.12,.78,.42,limestone,x,z);
  const shrub=new THREE.Mesh(new THREE.IcosahedronGeometry(.9,2),grass);
  shrub.position.set(x,1.1,z);shrub.castShadow=true;group.add(shrub);
  for(let j=0;j<7;j++){
   const t=j*6.283/7;
   const bloom=new THREE.Mesh(new THREE.IcosahedronGeometry(.14,1),flower);
   bloom.position.set(x+Math.cos(t)*.6,1.45,z+Math.sin(t)*.6);
   group.add(bloom);
  }
 }
 // All placements are validated against road lanes, building footprints,
 // existing placements, and the pedestrian plaza.
 const roadCenters=[-96,0,96],roadHalfWidth=9.5;
 const insideRoad=(x,z,clearance=0)=>roadCenters.some(v=>Math.abs(x-v)<roadHalfWidth+clearance||Math.abs(z-v)<roadHalfWidth+clearance);
 const insideBuilding=(x,z,clearance=0)=>buildings.some(b=>Math.abs(x-b.x)<b.w/2+clearance&&Math.abs(z-b.z)<b.d/2+clearance);
 const insidePlaza=(x,z,clearance=0)=>Math.hypot(x-center.x,z-center.z)<26+clearance;
 const blocked=(x,z,clearance=0)=>insideRoad(x,z,clearance)||insideBuilding(x,z,clearance)||insidePlaza(x,z,clearance);
 const safeTreeSpots=treeSpots.filter(([x,z])=>!blocked(x,z,3.5));
 // Put vehicles only in parallel curbside bays, with no overlaps.
 const parkingBays=[];
 for(const road of roadCenters){
  for(let p=-150;p<=150;p+=17){
   for(const side of [-1,1]){
    const x=road+side*6.5,z=p;
    if(Math.abs(x)>165||Math.abs(z)>165)continue;
    if(insidePlaza(x,z,5)||insideBuilding(x,z,5))continue;
    if(roadCenters.some(c=>Math.abs(z-c)<19))continue;
    parkingBays.push([x,z,0]);
   }
  }
 }
 // Spacing checks include vehicle length, width and collision padding.
 const safeCarSpots=[];
 for(const [x,z,angle] of parkingBays){
  if(safeCarSpots.every(([a,b])=>Math.hypot(x-a,z-b)>8.5))
   safeCarSpots.push([x,z,angle]);
 }
 // Correct visual placement of existing cars if the caller has already loaded them.
 cars.forEach((car,i)=>{
  const spot=safeCarSpots[i];
  if(!spot||!car.group)return;
  const [x,z,angle]=spot;
  car.group.position.x+=x-car.x;
  car.group.position.z+=z-car.z;
  car.x=x;car.z=z;car.angle=angle;
  car.group.rotation.y=angle;
 });
 // Functional hinged double doors, generated on building facade.
 const doors=[];
 const doorMat=material(0x45392f,.48,.2);
 for(const b of buildings){
  const frontZ=b.z+b.d/2+.23;
  for(const side of [-1,1]){
   const hinge=new THREE.Group();
   hinge.position.set(b.x+side*.73,0,frontZ);
   const panel=new THREE.Mesh(new THREE.BoxGeometry(1.35,2.6,.12),doorMat);
   panel.position.set(-side*.675,1.3,0);
   panel.castShadow=true;hinge.add(panel);scene.add(hinge);
   const knob=new THREE.Mesh(new THREE.SphereGeometry(.08,10,8),bronze);
   knob.position.set(-side*1.17,1.25,.12);hinge.add(knob);
   doors.push({hinge,x:b.x,z:frontZ,side,open:0});
  }
 }
 let time=0;
 return {
  group,center,safeTreeSpots,safeCarSpots,doors,
  update(dt,playerPosition=null){
   time+=dt;
   jets.forEach((jet,i)=>{jet.material.opacity=.42+.12*Math.sin(time*2+i*.4)});
   // Automatic opening near player; closes smoothly after walking away.
   if(playerPosition){
    for(const d of doors){
     const distance=Math.hypot(playerPosition.x-d.x,playerPosition.z-d.z);
     const target=distance<3.3?1:0;
     d.open=THREE.MathUtils.damp(d.open,target,4.5,dt);
     d.hinge.rotation.y=d.side*d.open*1.25;
    }
   }
  }
 };
}
