// Per-resident randomness and recent destinations prevent synchronized repeats.
export function residentRandom(a){let n=a.varietySeed??((a.id??a.profile?.id??1)+17)*2654435761;n^=n<<13;n^=n>>>17;n^=n<<5;a.varietySeed=n>>>0;return(n>>>0)/4294967296;}
export function variedSeats(a,items,position,seatOf=s=>s){const recent=a.recentSeats||[];return items.map(item=>{const s=seatOf(item),key=s.x.toFixed(2)+','+s.z.toFixed(2);return{item,score:Math.hypot(s.x-position.x,s.z-position.z)*.15+residentRandom(a)*18+(recent.includes(key)?1000:0)}}).sort((a,b)=>a.score-b.score).map(o=>o.item);}
export function rememberSeat(a,seat){const key=seat.x.toFixed(2)+','+seat.z.toFixed(2);a.recentSeats=[key,...(a.recentSeats||[]).filter(k=>k!==key)].slice(0,3);}

export function residentStalled(a,position,goal,dt){const key=goal.x.toFixed(1)+','+goal.z.toFixed(1),distance=Math.hypot(goal.x-position.x,goal.z-position.z);let r=a.progressWatch;if(!r||r.key!==key){a.progressWatch={key,time:0,distance};return false;}r.time+=dt;if(r.time<5)return false;const stalled=r.distance-distance<.6;r.time=0;r.distance=distance;return stalled;}
