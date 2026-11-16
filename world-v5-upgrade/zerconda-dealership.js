import * as THREE from 'three';
// Zerconda Motors: original interactive 3D showroom with three fictional unbranded cars.
export function createDealership(scene,{x=-62,z=-48}={}){
 const root=new THREE.Group();root.position.set(x,0,z);root.name='Zerconda Motors - walk-in dealership';scene.add(root);
 const mat=(color,roughness=.65,metalness=.05)=>new THREE.MeshStandardMaterial({color,roughness,metalness,side:THREE.DoubleSide});
 const steel=mat(0x273746,.34,.62),silver=mat(0xb4c3cd,.28,.6),floor=mat(0x929da3,.33,.14),glass=new THREE.MeshPhysicalMaterial({color:0x8ac5e2,roughness:.075,metalness:.06,transparent:true,opacity:.22,depthWrite:false,side:THREE.DoubleSide,clearcoat:1}),white=mat(0xf1f4f5),dark=mat(0x182733),wood=mat(0x82614b);
 const cube=new THREE.BoxGeometry(1,1,1);
 function box(parent,w,h,d,px,py,pz,m){const o=new THREE.Mesh(cube,m);o.position.set(px,py,pz);o.scale.set(w,h,d);o.receiveShadow=true;parent.add(o);return o;}
 // 30m frontage x 23m depth. The front faces EAST toward the cafe and tower.
 box(root,24,.25,28,0,-.1,0,floor);box(root,24,.28,28,0,8.8,0,dark);
 box(root,.32,8.7,28,-12,4.35,0,white);
 for(const zz of [-14,14])box(root,24,8.7,.3,0,4.35,zz,white);
 // Transparent front glazing with a 4.8m-wide unobstructed pedestrian entry.
 for(const zz of [-10.5,-7,-3.5,3.5,7,10.5]){
  box(root,.1,7.6,3.3,11.95,4.15,zz,glass);
  box(root,.18,8.3,.12,12,4.2,zz+1.7,steel);
 }
 box(root,.28,8.5,2.1,12,4.25,-12.9,steel);box(root,.28,8.5,2.1,12,4.25,12.9,steel);
 box(root,.35,.25,28,12,8.45,0,steel);
 // Entrance threshold, planters, and canopy.
 box(root,3.3,.14,5,13.1,.04,0,white);
 box(root,3.4,.25,8,12.5,7.7,0,steel);
 for(const zz of [-12.2,12.2]){box(root,1.1,1,1.1,13,.5,zz,wood);
  const p=new THREE.Mesh(new THREE.IcosahedronGeometry(.85,2),mat(0x347747));p.position.set(13,1.5,zz);root.add(p);}
 // Realistic dealership sign as authored image asset loaded from GitHub.
 const sign=new THREE.Mesh(new THREE.PlaneGeometry(19,3.4),new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}));
 sign.position.set(12.22,7.15,0);sign.rotation.y=Math.PI/2;root.add(sign);
 const url='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/realistic-assets/dealership/zerconda-motors-sign.svg';
 new THREE.TextureLoader().load(url,t=>{t.colorSpace=THREE.SRGBColorSpace;sign.material.map=t;sign.material.needsUpdate=true;},undefined,()=>{sign.material.color.set(0x0b314f);});
 // Three cars, each a distinctly styled fictional model (no real logos).
 const cars=[];const worldZ=z;
 function car({name,color,z,bodyHeight=1.25,roofHeight=.62,length=4.9}){
  const g=new THREE.Group();g.position.set(-2.5,0,z);g.rotation.y=-Math.PI/2;root.add(g);
  const paint=new THREE.MeshPhysicalMaterial({color,metalness:.66,roughness:.22,clearcoat:1,clearcoatRoughness:.12});
  const windowMat=new THREE.MeshPhysicalMaterial({color:0x1c3d51,metalness:.3,roughness:.08,transparent:true,opacity:.84,clearcoat:1});
  const rubber=mat(0x161b20,.96),wheelMetal=mat(0xb4bcc4,.26,.75);
  box(g,2.05,bodyHeight,length,0,.76,0,paint);
  box(g,1.77,roofHeight,length*.48,0,1.33+roofHeight*.25,-.12,paint);
  box(g,1.79,roofHeight*.72,length*.43,0,1.37+roofHeight*.24,-.12,windowMat);
  for(const sx of [-1,1])for(const sz of [-1,1]){
   const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.44,.44,.22,24),rubber);
   wheel.rotation.z=Math.PI/2;wheel.position.set(sx*1.04,.43,sz*(length*.34));g.add(wheel);
   const hub=new THREE.Mesh(new THREE.CylinderGeometry(.23,.23,.24,20),wheelMetal);
   hub.rotation.z=Math.PI/2;hub.position.copy(wheel.position);g.add(hub);
  }
  for(const sx of [-.7,.7]){box(g,.46,.2,.08,sx,.9,length/2+.05,white);box(g,.48,.17,.08,sx,.8,-length/2-.05,mat(0x9d1d20));}
  // Raised display platform and placard.
  const podium=new THREE.Mesh(new THREE.CylinderGeometry(3.6,3.6,.12,48),mat(0xd9e0e4,.3));podium.position.set(-2.5,.015,z);root.add(podium);
  const placard=box(root,2.7,1.2,.14,2.5,.9,z,steel);
  cars.push({name,position:{x:x-2.5,z:worldZ+z}});
 }
 car({name:'Zerconda City Sedan',color:0xe4e7e8,z:-8,length:4.8});
 car({name:'Zerconda Sport Coupe',color:0x1766a6,z:0,length:4.55,bodyHeight:1.05,roofHeight:.5});
 car({name:'Zerconda Touring SUV',color:0x991f28,z:8,length:5.1,bodyHeight:1.6,roofHeight:.8});
 // Reception, lounge, illuminated ceiling fixtures, offices and showroom plants.
 box(root,5,1.15,1.6,-8, .6,0,wood);box(root,5.4,.16,1.85,-8,1.25,0,white);
 for(const zz of [-10,10]){box(root,2.6,.65,1.25,-8,.45,zz,mat(0x526779));box(root,2.6,.7,.24,-8,.96,zz-.65,mat(0x526779));box(root,1.4,.38,1.1,-5.2,.4,zz,wood);}
 for(const zz of [-9,0,9]){const light=new THREE.PointLight(0xf1f6ff,2.1,14);light.position.set(0,7.8,zz);root.add(light);box(root,1.6,.08,5.4,0,8.25,zz,new THREE.MeshBasicMaterial({color:0xe8f5ff}));}
 // Exterior road-facing banner.
 const banner=box(root,.2,4.5,1.5,15,2.35,12.7,steel);
 return {root,x,z,cars,entrance:{x:x+14,z},isNear(px,pz,r=4.5){return Math.hypot(px-(x+14),pz-z)<r;},inside(px,pz){return px>x-11.4&&px<x+11.7&&Math.abs(pz-z)<13.6},nearestCar(px,pz,max=4.5){let best=null,d=max;for(const c of cars){const dist=Math.hypot(px-c.position.x,pz-c.position.z);if(dist<d){d=dist;best=c;}}return best;}};
}
