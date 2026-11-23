import * as THREE from 'three';
export function passageFloor(d){return .065+Math.max(-8,Math.min(0,(d+12)*.25));}
export function passageFootprint(x,d){return d<=1.9&&d>=-47&&Math.abs(x)<=1.05||d< -45&&d> -51&&Math.abs(x)<1.8||((x/8.6)**2+((d+62)/15.5)**2<1);}
export function hiddenPassageHeightAt(x,z){const lateral=-(z+612),depth=x+720;return passageFootprint(lateral,depth)?passageFloor(depth):null;}
export function addConcealedCavern(root){
 const texture=new THREE.TextureLoader().load(new URL('./assets/alpine-granite-v259.webp',import.meta.url).href);texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;const rock=new THREE.MeshStandardMaterial({map:texture,color:0xaaa59a,roughness:1,side:THREE.DoubleSide}),floor=new THREE.MeshStandardMaterial({map:texture,color:0x827c6b,roughness:.93,side:THREE.DoubleSide});
 function mesh(vertices,mat){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));const uv=[];for(let i=0;i<vertices.length;i+=3)uv.push((vertices[i]+vertices[i+1]*.7)/2,vertices[i+2]/2);g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.computeVertexNormals();const o=new THREE.Mesh(g,mat);root.add(o);return o;}
 function slab(z0,z1,w,offset,mat){const a=passageFloor(z0)-.02+offset,b=passageFloor(z1)-.02+offset;mesh([-w,a,z0,w,a,z0,w,b,z1,-w,a,z0,w,b,z1,-w,b,z1],mat);}
 for(let d=-12;d> -48;d-=4){slab(d,d-4,1.28,0,floor);slab(d,d-4,1.5,3.3,rock);for(const side of[-1,1]){const a=passageFloor(d)-.02,b=passageFloor(d-4)-.02,x=side*1.4;mesh([x,a,d,x,b,d-4,x,b+3.3,d-4,x,a,d,x,b+3.3,d-4,x,a+3.3,d],rock);}}
 const bottom=passageFloor(-62)-.02,wall=[],ceiling=[],ground=[],ring=32;for(let i=0;i<ring;i++){const a=i*Math.PI*2/ring,b=(i+1)*Math.PI*2/ring,point=t=>[Math.cos(t)*(9.1+Math.sin(t*7)*.3),bottom,-62+Math.sin(t)*(16+Math.cos(t*5)*.25)],p=point(a),q=point(b),h=5.6+Math.sin(a*3)*.6,hh=5.6+Math.sin(b*3)*.6;if(!(p[2]>-49&&q[2]>-49&&Math.abs((p[0]+q[0])/2)<2.4))wall.push(...p,...q,q[0],bottom+hh,q[2],...p,q[0],bottom+hh,q[2],p[0],bottom+h,p[2]);ground.push(0,bottom,-62,...q,...p);ceiling.push(0,bottom+6.5,-62,p[0],bottom+h,p[2],q[0],bottom+hh,q[2]);}
 mesh(wall,rock).name='Enclosed mountain cavern walls';mesh(ceiling,rock).name='Solid cave ceiling';mesh(ground,floor).name='Walkable stone cavern floor';
 for(let i=0;i<12;i++){const a=i*Math.PI*2/12;if(Math.sin(a)>.8)continue;const o=new THREE.Mesh(new THREE.DodecahedronGeometry(.5+i%3*.2,0),rock);o.position.set(Math.cos(a)*8.9,bottom+.35,-62+Math.sin(a)*15.8);o.scale.set(1,1.2+i%2,1);root.add(o);}
 for(const d of[-17,-27,-38,-52,-65,-73]){const light=new THREE.PointLight(0xffbd74,1.6,d< -48?18:8,1.5);light.position.set(d< -48?3:0,passageFloor(d)+2.2,d);root.add(light);const marker=new THREE.Mesh(new THREE.SphereGeometry(.045,8,5),new THREE.MeshBasicMaterial({color:0xffca79}));marker.position.copy(light.position);root.add(marker);}
 return{root};
}
