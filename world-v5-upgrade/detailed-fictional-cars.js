import * as THREE from 'three';
// Fictional unbranded mid-detail vehicle geometry. Separate body, greenhouse, lamps, grille, wheels and trim.
export function createDetailedCar({color=0x1d5d9a,type='sedan'}={}){
 const g=new THREE.Group();g.name='Fictional '+type;
 const mat=(c,metal=.0,rough=.55)=>new THREE.MeshStandardMaterial({color:c,metalness:metal,roughness:rough});
 const paint=new THREE.MeshPhysicalMaterial({color,metalness:.64,roughness:.19,clearcoat:1,clearcoatRoughness:.12});
 const glass=new THREE.MeshPhysicalMaterial({color:0x1e3f52,metalness:.26,roughness:.09,clearcoat:1,transparent:true,opacity:.92,side:THREE.DoubleSide});
 const chrome=mat(0xbac6cc,.82,.24),black=mat(0x171b20,.18,.75),lamp=new THREE.MeshBasicMaterial({color:0xe3f4ff}),rear=new THREE.MeshBasicMaterial({color:0xd52630});
 const len=type==='suv'?5.05:type==='coupe'?4.55:4.8,roof=type==='suv'?1.91:type==='coupe'?1.44:1.62;
 function box(w,h,d,x,y,z,m){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;g.add(o);return o}
 function panel(points,m){const sh=new THREE.Shape();sh.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)sh.lineTo(points[i][0],points[i][1]);sh.closePath();const geo=new THREE.ExtrudeGeometry(sh,{depth:1.83,bevelEnabled:true,bevelThickness:.045,bevelSize:.035,bevelSegments:2});geo.rotateY(Math.PI/2);const o=new THREE.Mesh(geo,m);g.add(o);return o}
 // Smooth wedge-like vehicle silhouette, tapered hood, boot, windshield and roof.
 const body=new THREE.Mesh(new THREE.BoxGeometry(1.92,.58,len),paint);body.position.y=.83;body.castShadow=true;g.add(body);
 // Rounded bumper corners and sculpted rocker panels add real silhouette detail.
 for(const side of [-1,1]){box(.12,.22,len*.86,side*.94,.65,0,paint);box(.12,.08,len*.78,side*.98,.49,0,black);}
 box(1.88,.13,len*.92,0,1.13,0,paint);
 const roofLen=type==='coupe'?2.12:type==='suv'?3.22:2.65;
 // Tapered glass greenhouse rather than a rectangular box.
 const lower=1.23,upper=roof-.065,front=roofLen*.51,rear=-roofLen*.51;
 const topFront=type==='suv'?front-.32:front-.58;
 const topRear=type==='suv'?rear+.24:rear+.48;
 const pts=[
 [-.84,lower,rear],[.84,lower,rear],[.84,lower,front],[-.84,lower,front],
 [-.74,upper,topRear],[.74,upper,topRear],[.74,upper,topFront],[-.74,upper,topFront]
 ];
 const faces=[0,1,5,0,5,4, 1,2,6,1,6,5, 2,3,7,2,7,6, 3,0,4,3,4,7, 4,5,6,4,6,7];
 const vertices=[];for(const index of faces)vertices.push(...pts[index]);
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.computeVertexNormals();
 const canopy=new THREE.Mesh(geometry,glass);canopy.material.side=THREE.DoubleSide;g.add(canopy);
 box(1.49,.07,topFront-topRear,0,upper+.015,(topFront+topRear)/2,paint);
 // Front and rear glazing highlights, dashboard and dark side window seals.
 const interior=mat(0x25282a,.08,.83);
 box(1.46,.055,1.35,0,1.27,-.12,interior);
 // Pillars, windows, window surround.
 for(const sx of [-1,1]){
  for(const zz of [-roofLen*.47,0,roofLen*.47])box(.07,roof-1.18,.065,sx*.86,(roof+1.21)/2,zz,chrome);
  box(.1,.07,roofLen,sx*.87,1.2,-.15,chrome);
  box(.085,.09,roofLen*.76,sx*.86,roof-.035,-.15,chrome);
  // door seams and handles
  for(const zz of [-.65,.7])box(.06,.065,.27,sx*.99,1.15,zz,chrome);
  const mirror=box(.26,.17,.3,sx*1.04,1.31,roofLen*.37,paint);
  box(.28,.035,.18,sx*1.04,1.38,roofLen*.37,black);
 }
 // Front grille, bumper, DRL headlamps and rear clusters.
 box(1.18,.3,.07,0,.73,len/2+.045,black);
 for(let i=0;i<7;i++)box(.015,.21,.08,-.47+i*.155,.74,len/2+.095,chrome);
 box(1.85,.13,.12,0,.5,len/2+.045,paint);
 for(const xx of [-.73,.73]){
  box(.43,.13,.09,xx,1.02,len/2+.06,lamp);
  box(.48,.18,.085,xx,.88,-len/2-.06,rear);
  box(.31,.06,.09,xx,.65,len/2+.08,chrome);
 }
 box(1.83,.1,.12,0,.48,-len/2-.04,black);
 // Distinct tires, alloy rims, brake discs and hubs.
 for(const sx of [-1,1])for(const sz of [-1,1]){
  const zz=sz*(len*.32);
  const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.405,.405,.23,48),black);wheel.rotation.z=Math.PI/2;wheel.position.set(sx*.99,.42,zz);g.add(wheel);
  const rim=new THREE.Mesh(new THREE.CylinderGeometry(.29,.29,.235,48),chrome);rim.rotation.z=Math.PI/2;rim.position.copy(wheel.position);g.add(rim);
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.25,20),black);hub.rotation.z=Math.PI/2;hub.position.copy(wheel.position);g.add(hub);
  for(let k=0;k<7;k++){const a=k*Math.PI*2/7;const spoke=box(.04,.18,.04,sx*1.115,.42+Math.sin(a)*.15,zz+Math.cos(a)*.15,black);spoke.rotation.x=a;}
 }
 // Fog lights, rear reflectors and license plate recess.
 for(const xx of [-.78,.78]){box(.23,.09,.08,xx,.59,len/2+.1,lamp);box(.22,.08,.08,xx,.56,-len/2-.09,rear);}
 box(.58,.16,.08,0,.75,-len/2-.09,black);
 box(1.5,.035,1.5,0,.5,0,black);
 return g;
}
