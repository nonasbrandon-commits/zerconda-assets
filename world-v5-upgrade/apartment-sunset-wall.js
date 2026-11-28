import * as T from 'three';
export function createSunsetFeatureWall(parent){
  const root=new T.Group();root.name='Warm backlit sunset feature wall';root.position.set(-3.18,1.72,-.55);root.rotation.y=Math.PI/2;parent.add(root);
  const image=new T.TextureLoader().load(new URL('./feature-sunset-v487.jpg',import.meta.url).href);image.colorSpace=T.SRGBColorSpace;
  const frame=new T.Mesh(new T.BoxGeometry(5.02,1.99,.075),new T.MeshStandardMaterial({color:0x171b1d,roughness:.6}));root.add(frame);
  const art=new T.Mesh(new T.PlaneGeometry(4.84,1.81),new T.MeshStandardMaterial({map:image,emissiveMap:image,emissive:0xffffff,emissiveIntensity:.25,roughness:.95}));art.position.z=.043;root.add(art);
  // Soft halo layers sit against the existing wall, without adding a wall or door.
  for(let i=0;i<5;i++){const halo=new T.Mesh(new T.PlaneGeometry(5.08+i*.075,2.05+i*.075),new T.MeshBasicMaterial({color:0xffc97a,transparent:true,opacity:.065,depthWrite:false}));halo.position.z=-.024-i*.001;root.add(halo);}
  const ceilingY=3.18;
  for(const z of[-2.1,-.55,1]){
    const trim=new T.Mesh(new T.CylinderGeometry(.09,.09,.018,20),new T.MeshStandardMaterial({color:0xffe5bb,emissive:0xffd09a,emissiveIntensity:1}));trim.position.set(-2.9,ceilingY,z);parent.add(trim);
    const light=new T.SpotLight(0xffd1a0,3,4,Math.PI/4,.8,1.5);light.position.set(-2.5,ceilingY-.04,z);light.target.position.set(-3.18,1.9,z);parent.add(light,light.target);
  }
  return root;
}
