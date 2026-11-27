export function suburbanExitPoint(home,fallback={},{garage=false}={}){
 const angle=Number(home.angle)||0,localX=garage?-3.75:3.5,entry=(garage?home.garageEntry:home.entry)||{x:home.x+Math.cos(angle)*localX-Math.sin(angle)*10.7,z:home.z-Math.sin(angle)*localX-Math.cos(angle)*10.7};
 const door=(garage?home.garageDoor:home.door)||{x:home.x+Math.cos(angle)*localX-Math.sin(angle)*7.82,z:home.z-Math.sin(angle)*localX-Math.cos(angle)*7.82};
 return{x:Number.isFinite(entry.x)?entry.x:fallback.x,z:Number.isFinite(entry.z)?entry.z:fallback.z,heading:Math.atan2(entry.x-door.x,entry.z-door.z)};
}
export function createSuburbanExitGuard(){let home=null;return{mark(value,{garage=false}={}){home={id:value.id,door:garage?value.garageDoor:value.door}},clear(){home=null},update(player){if(home&&Math.hypot(player.x-home.door.x,player.z-home.door.z)>3.8)home=null;},blocks(value){return !!home&&home.id===value.id;}};}
