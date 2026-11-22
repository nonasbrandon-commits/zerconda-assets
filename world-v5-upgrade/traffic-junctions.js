// Shared reservations prevent different traffic systems entering a junction together.
const reservations=new Map(),junctions=new WeakMap();
export function junctionMustYield(vehicle,network,now=performance.now()/1000){
 if(!vehicle.path)return false;let nodes=junctions.get(network);if(!nodes){const degrees=new Map();for(const e of network.edges){degrees.set(e.i,(degrees.get(e.i)||0)+1);degrees.set(e.j,(degrees.get(e.j)||0)+1);}nodes=network.points.filter((_,i)=>(degrees.get(i)||0)>=3);junctions.set(network,nodes);}
 const root=vehicle.root||vehicle.group,p=root.position;
 for(const[key,r]of reservations){if(now-r.stamp>2||r.entered&&Math.hypot(r.root.position.x-r.x,r.root.position.z-r.z)>19)reservations.delete(key);}
 let junction=null;for(const n of nodes){if(Math.hypot(p.x-n.x,p.z-n.z)>24)continue;for(let d=0;d<=12;d+=3){const q=vehicle.path.sample(Math.min(vehicle.path.length,vehicle.progress+d));if(Math.hypot(q.x-n.x,q.z-n.z)<14){junction=n;break;}}if(junction)break;}
 if(!junction)return false;const key=junction.x+','+junction.z,distance=Math.hypot(p.x-junction.x,p.z-junction.z);let r=reservations.get(key);
 if(r?.root===root){r.stamp=now;if(distance<12)r.entered=true;return false;}
 // Vehicles already inside must clear the intersection, even when loading mid-route.
 if(distance<10)return false;
 if(r)return true;
 reservations.set(key,{root,x:junction.x,z:junction.z,entered:distance<12,stamp:now});return false;
}
