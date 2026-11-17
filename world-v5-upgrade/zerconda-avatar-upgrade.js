import * as THREE from 'three';
// Zerconda v47: continuous anatomical lofts replace the capsule-and-cylinder avatar.
export function createZercondaAvatar(){
 const root=new THREE.Group();
 const mat=(c,r=.92)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:0,side:THREE.DoubleSide});
 const denim=mat(0x2879a4),denimShade=mat(0x21668e),seam=mat(0x417d9c),khaki=mat(0x9a7854),khakiShade=mat(0x806347),skin=mat(0xb98667),hair=mat(0x34251c),hairHi=mat(0x4b3529),boots=mat(0x303338),sole=mat(0x1f2226);
 function mesh(g,m){const o=new THREE.Mesh(g,m);o.castShadow=true;o.receiveShadow=true;root.add(o);return o;}
 function loft(rings,m,n=24){const p=[],idx=[];for(let i=0;i<rings.length;i++){const [x,y,z,rx,rz]=rings[i];for(let j=0;j<n;j++){const a=2*Math.PI*j/n;p.push(x+Math.cos(a)*rx,y,z+Math.sin(a)*rz);}}
 for(let i=0;i<rings.length-1;i++)for(let j=0;j<n;j++){const a=i*n+j,b=i*n+(j+1)%n,c=(i+1)*n+j,d=(i+1)*n+(j+1)%n;idx.push(a,b,c,b,d,c);}
 idx.push(...Array.from({length:n-2},(_,i)=>[0,i+2,i+1]).flat());const end=(rings.length-1)*n;idx.push(...Array.from({length:n-2},(_,i)=>[end,end+i+1,end+i+2]).flat());
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return mesh(g,m);}
 function line(points,m,r=.0025){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));return mesh(new THREE.TubeGeometry(curve,Math.max(8,points.length*5),r,5,false),m);}
 function ell(x,y,z,rx,ry,rz,m){const o=mesh(new THREE.SphereGeometry(1,20,14),m);o.position.set(x,y,z);o.scale.set(rx,ry,rz);return o;}
 // Trousers have separate tapered thighs, shaped knees and ankles.
 for(const s of [-1,1]){
 loft([[s*.108,.145,0,.060,.071],[s*.11,.25,0,.069,.076],[s*.112,.45,0,.077,.086],[s*.108,.59,0,.081,.09],[s*.104,.78,0,.093,.098],[s*.104,.95,0,.108,.11]],khaki);
 line([[s*.108,.17,-.071],[s*.11,.44,-.085],[s*.108,.70,-.09],[s*.108,.92,-.107]],khakiShade,.002);
 ell(s*.108,.085,.042,.086,.066,.151,boots);
 ell(s*.108,.038,.055,.089,.022,.157,sole);
 }
 loft([[0,.88,0,.17,.102],[0,.96,0,.203,.114],[0,1.018,0,.191,.106]],khaki);
 loft([[0,.995,0,.189,.112],[0,1.035,0,.183,.112]],khakiShade);
 // One continuous shirt body with a shoulder taper, natural waist and back depth.
 loft([[0,1.014,0,.178,.106],[0,1.09,0,.18,.114],[0,1.24,0,.174,.115],[0,1.37,0,.198,.119],[0,1.455,0,.225,.119],[0,1.52,0,.178,.102],[0,1.56,0,.095,.078]],denim);
 // Collar, shoulder yoke, back center stitching and bottom hem.
 loft([[0,1.554,0,.094,.074],[0,1.585,0,.077,.068]],denimShade);
 line([[-.188,1.445,-.067],[-.11,1.442,-.118],[0,1.44,-.12],[.11,1.442,-.118],[.188,1.445,-.067]],seam,.0025);
 line([[0,1.44,-.122],[0,1.26,-.118],[0,1.08,-.116]],seam,.002);
 line([[-.13,1.035,-.082],[0,1.034,-.11],[.13,1.035,-.082]],seam,.0025);
 // Natural arm taper with no spherical shoulder caps or exposed elbow gaps.
 for(const s of [-1,1]){
 loft([[s*.298,1.235,0,.056,.055],[s*.292,1.275,0,.067,.065],[s*.268,1.385,0,.075,.077],[s*.236,1.465,0,.078,.085]],denim);
 loft([[s*.3,1.218,0,.055,.055],[s*.298,1.242,0,.057,.057]],denimShade);
 loft([[s*.315,.98,0,.033,.036],[s*.312,1.07,0,.044,.046],[s*.3,1.205,0,.052,.052]],skin);
 ell(s*.316,.935,.009,.04,.078,.035,skin);
 }
 // Head and neck use continuous organic profiles.
 loft([[0,1.558,0,.064,.064],[0,1.67,0,.067,.065]],skin);
 loft([[0,1.665,0,.069,.065],[0,1.71,0,.095,.087],[0,1.765,0,.106,.095],[0,1.825,0,.102,.092],[0,1.865,0,.079,.08],[0,1.885,0,.04,.05]],skin);
 for(const s of [-1,1])ell(s*.108,1.755,.007,.019,.037,.019,skin);
 // Layered, closely cropped hair follows skull; no helmet-shaped cap.
 loft([[0,1.803,-.014,.088,.082],[0,1.831,-.006,.103,.095],[0,1.87,-.004,.102,.096],[0,1.899,0,.08,.076],[0,1.917,0,.043,.045],[0,1.923,0,.009,.01]],hair);
 for(let i=0;i<85;i++){const t=i*2.399963,rad=Math.sqrt((i+.5)/85),x=Math.cos(t)*rad*.09,z=Math.sin(t)*rad*.085,y=1.919-.047*rad;const o=ell(x,y,z,.006,.011,.013,i%4===0?hairHi:hair);o.rotation.y=t;}
 for(let i=0;i<16;i++){const x=(i-7.5)*.011;ell(x,1.801+Math.abs(x)*.10,-.088+Math.abs(x)*.2,.007,.014,.008,hair);}
 return root;
}
