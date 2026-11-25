// Military proximity permission. Re-evaluate at the moment of every shot.
export function weaponPermission({x,z},rangeContains=()=>false){
 if(!Number.isFinite(x)||!Number.isFinite(z))return{allowed:false,zone:'No signal'};
 if(rangeContains(x,z))return{allowed:true,zone:'Target range'};
 // The garrison and its controlled approach are not woodland firing zones.
 if((x>309&&x<551&&z>-1276&&z<-1054)||(Math.abs(x-465)<7&&z>=-1060&&z<-554))return{allowed:false,zone:'Military proximity lock'};
 // North Woods and the wooded western mountain trails. The town itself is excluded.
 if((x>=-720&&x<=618&&z>=-1398&&z<=-568))return{allowed:true,zone:'Woods'};
 if(x< -720||x>618||z< -1398||z>350)return{allowed:true,zone:'Outside perimeter'};
 return{allowed:false,zone:'Military proximity lock'};
}

// Story light follows boundaries, without the supervised target-range gameplay override.
export function weaponLightState(point){const rule=weaponPermission(point);return{...rule,state:rule.allowed?'active':'locked',color:rule.allowed?'green':'red'};}
