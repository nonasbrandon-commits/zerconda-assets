import * as THREE from 'three';
// Original Zerconda avatar v46. Rear view is the primary camera angle.
export function createZercondaAvatar(){
 const root=new THREE.Group();
 const material=(color,roughness=0.88)=>new THREE.MeshStandardMaterial({color,roughness,metalness:0,side:THREE.DoubleSide});
 const skin=material(0xb98262), skinShade=material(0xa97050), shirt=material(0x246d9b),shirtLight=material(0x327eae),shirtDark=material(0x185477),stitch=material(0x4e8cb0),pants=material(0x93714e),pantsDark=material(0x745638),hair=material(0x39271e),hairLight=material(0x513629),shoe=material(0x292d31),sole=material(0x181c20);
 const add=(g,m,x,y,z)=>{const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;root.add(o);return o;};
 const sphere=(x,y,z,a,b,c,m,seg=18)=>{const o=add(new THREE.SphereGeometry(1,seg,12),m,x,y,z);o.scale.set(a,b,c);return o;};
 const tube=(a,b,top,bottom,m,segments=12)=>{const p=new THREE.Vector3(...a),q=new THREE.Vector3(...b),d=q.clone().sub(p);const o=add(new THREE.CylinderGeometry(top,bottom,d.length(),segments,1),m,...p.clone().add(q).multiplyScalar(.5).toArray());o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return o;};
 // Shoes, anatomical trousers, fitted waistband, and independent legs.
 for(const s of [-1,1]){
   sphere(s*.105,.09,.065,.09,.075,.155,shoe);
   sphere(s*.105,.043,.076,.094,.022,.155,sole);
   tube([s*.103,.16,0],[s*.113,.64,0],.073,.087,pants,14);
   sphere(s*.108,.58,0,.087,.125,.094,pants);
   tube([s*.113,.63,0],[s*.102,.98,0],.099,.106,pants,14);
   tube([s*.106,.23,-.074],[s*.108,.55,-.077],.004,.004,pantsDark,5);
 }
 sphere(0,.96,0,.202,.13,.116,pants);
 tube([0,.975,0],[0,1.045,0],.205,.202,pantsDark,20);
 // Shirt is a shaped garment, not a floating spherical torso.
 tube([0,1.035,0],[0,1.48,0],.177,.225,shirt,24);
 sphere(0,1.48,0,.222,.112,.119,shirt,24);
 sphere(0,1.09,0,.182,.063,.117,shirt,24);
 // Back yoke, collar, vertical seam and sleeve cuffs.
 tube([-.174,1.475,-.115],[.174,1.475,-.115],.006,.006,stitch,6);
 tube([0,1.075,-.18],[0,1.475,-.115],.0028,.0028,stitch,5);
 tube([0,1.56,0],[0,1.62,0],.093,.099,shirtDark,18);
 tube([0,1.605,0],[0,1.635,0],.106,.092,shirtLight,18);
 for(const s of [-1,1]){
   sphere(s*.228,1.463,0,.084,.088,.104,shirt,16);
   tube([s*.235,1.455,0],[s*.278,1.225,.005],.087,.066,shirt,16);
   tube([s*.278,1.225,.005],[s*.282,1.203,.005],.068,.067,shirtDark,16);
   tube([s*.282,1.19,.005],[s*.302,.963,.018],.051,.037,skin,14);
   sphere(s*.304,.93,.022,.044,.074,.036,skin,14);
   sphere(s*.309,.918,.025,.04,.058,.027,skinShade,12);
 }
 // Head, ears, natural nape, textured short brown hairstyle.
 tube([0,1.605,0],[0,1.693,0],.065,.069,skin,16);
 sphere(0,1.77,0,.109,.138,.104,skin,24);
 sphere(0,1.707,-.074,.087,.071,.052,skin,20);
 for(const s of [-1,1])sphere(s*.108,1.762,.008,.023,.042,.019,skin,12);
 sphere(0,1.855,-.006,.112,.079,.108,hair,24);
 sphere(0,1.818,-.078,.105,.06,.053,hair,20);
 for(let i=0;i<42;i++){
   const t=i*2.39996,rad=Math.sqrt((i+.5)/42);
   const x=Math.cos(t)*rad*.101,z=Math.sin(t)*rad*.09;
   const y=1.91-.036*rad+.006*Math.sin(i*5.3);
   const strand=sphere(x,y,z,.013,.017,.022,i%3===0?hairLight:hair,8);
   strand.rotation.y=t;
 }
 // Back hairline is tapered instead of a hard bowl-shaped edge.
 for(let i=0;i<13;i++){const x=(i-6)*.014;sphere(x,1.765,-.092+Math.abs(x)*.18,.012,.021,.012,i%4===0?hairLight:hair,8);}
 root.userData.animationParts={};
 return root;
}
