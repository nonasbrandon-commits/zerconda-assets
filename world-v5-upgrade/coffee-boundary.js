// Analytic wall/camera bounds stay reliable from either side of thin wall meshes.
export function createCoffeeBoundary({x,z,ground=0}){
 const local=(px,pz)=>({x:px-x,z:pz-z});
 function canWalk(px,pz){const p=local(px,pz),ax=Math.abs(p.x);if(ax>12.6||p.z< -9.6||p.z>18)return null;
 if(p.z> -9.5&&p.z<9.5&&ax>11.50&&ax<12.50)return false;
 if(p.z> -9.5&&p.z< -8.50&&ax<12.50)return false;
 if(p.z>8.65&&p.z<9.45&&ax>.67&&ax<12.50)return false;
 // Solid slatted back bar protrudes in front of the brick wall.
 if(ax<4.38&&p.z< -8.24&&p.z> -9.5)return false;
 return true;}
 function clampCamera(camera,player){const p=local(player.x,player.z);if(Math.abs(p.x)>11.7||p.z< -8.7||p.z>8.65)return false;const o={x:Math.max(-11.45,Math.min(11.45,p.x)),y:ground+1.65,z:Math.max(-8.44,Math.min(8.57,p.z))},end={x:camera.x-x,y:camera.y,z:camera.z-z},d={x:end.x-o.x,y:end.y-o.y,z:end.z-o.z};if(Math.abs(o.x)<4.4&&o.z< -8.205)o.z=-8.205;d.z=end.z-o.z;let t=1;
 const limit=(axis,min,max)=>{if(d[axis]>0&&end[axis]>max)t=Math.min(t,Math.max(0,(max-o[axis])/d[axis]));else if(d[axis]<0&&end[axis]<min)t=Math.min(t,Math.max(0,(min-o[axis])/d[axis]));};
 limit('x',-11.45,11.45);limit('z',-8.44,Infinity);limit('y',ground+.30,ground+6.10);
 const cross=d.z>0?(9.15-o.z)/d.z:Infinity,throughDoor=p.z>6.5&&cross>=0&&cross<=1&&Math.abs(o.x+d.x*cross)<.57;if(!throughDoor)limit('z',-Infinity,8.57);
 // Clip against the padded back-bar volume as well as the outer room shell.
 let near=0,far=1;const lo={x:-4.4,y:ground-.1,z:-9.6},hi={x:4.4,y:ground+3.7,z:-8.22};for(const axis of['x','y','z']){if(Math.abs(d[axis])<1e-9){if(o[axis]<lo[axis]||o[axis]>hi[axis]){far=-1;break;}}else{const a=(lo[axis]-o[axis])/d[axis],b=(hi[axis]-o[axis])/d[axis];near=Math.max(near,Math.min(a,b));far=Math.min(far,Math.max(a,b));}}
 if(near<=far&&far>=0&&near<=1)t=Math.min(t,Math.max(0,near-.015));if(t>=1)return false;camera.x=x+o.x+d.x*t;camera.y=o.y+d.y*t;camera.z=z+o.z+d.z*t;return true;}
 return{canWalk,clampCamera};}
