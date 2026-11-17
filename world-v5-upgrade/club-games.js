export const DART_SECTORS=[20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];
export function dartScore(x,y){
 const radius=Math.hypot(x,y);if(radius>1)return {points:0,label:'Miss',double:false};
 if(radius<.037)return {points:50,label:'Bull · 50',double:true};
 if(radius<.094)return {points:25,label:'Outer bull · 25',double:false};
 const angle=(Math.atan2(x,-y)+Math.PI*2+Math.PI/20)%(Math.PI*2);
 const base=DART_SECTORS[Math.floor(angle/(Math.PI/10))%20];
 const multiplier=radius>.94?2:radius>.57&&radius<.63?3:1;
 return {points:base*multiplier,label:(multiplier===3?'Triple ':multiplier===2?'Double ':'')+base,double:multiplier===2};
}
export function createDarts(){return {scores:[301,301],turn:0,throws:0,start:301,last:'301 · Double out',winner:null,hits:[]};}
export function throwDart(game,x,y){
 if(game.winner!==null)return;
 const hit=dartScore(x,y),remaining=game.scores[game.turn]-hit.points;
 game.hits.push({x,y});game.hits=game.hits.slice(-3);game.throws++;
 if(remaining===0&&hit.double){game.scores[game.turn]=0;game.winner=game.turn;game.last='Player '+(game.turn+1)+' wins!';return;}
 const bust=remaining<2;
 if(bust){game.scores[game.turn]=game.start;game.last='Bust · score restored';}
 else{game.scores[game.turn]=remaining;game.last=hit.label;}
 if(bust||game.throws===3){game.turn=1-game.turn;game.throws=0;game.start=game.scores[game.turn];game.hits=[];}
 return hit;
}

const R=.028575,HX=1.35,HZ=.675;
const pockets=[[-HX,-HZ],[0,-HZ],[HX,-HZ],[-HX,HZ],[0,HZ],[HX,HZ]];
export function rackPool(){
 const balls=[{id:0,x:-.82,z:0,vx:0,vz:0,pocketed:false}];
 const order=[1,9,2,10,8,3,11,4,12,5,13,6,14,7,15];let n=0;
 for(let row=0;row<5;row++)for(let col=0;col<=row;col++)balls.push({id:order[n++],x:.38+row*R*1.76,z:(col-row/2)*R*2.04,vx:0,vz:0,pocketed:false});
 return {balls,turn:0,groups:[null,null],moving:false,winner:null,last:'Aim from the cue ball, then shoot.',potted:[],scratch:false,revision:0};
}
export function shootPool(state,angle,power){
 if(state.moving||state.winner!==null||!Number.isFinite(angle)||!Number.isFinite(power))return false;
 const cue=state.balls.find(b=>b.id===0);cue.vx=Math.cos(angle)*Math.max(.3,Math.min(3.5,power));cue.vz=Math.sin(angle)*Math.max(.3,Math.min(3.5,power));
 state.moving=true;state.potted=[];state.scratch=false;state.revision++;state.last='Balls moving…';return true;
}
export function stepPool(state,dt){
 if(!state.moving)return false;
 const steps=Math.max(1,Math.ceil(Math.min(dt,.08)*240)),h=Math.min(dt,.08)/steps;
 for(let step=0;step<steps;step++){
  for(const b of state.balls){if(b.pocketed)continue;
   b.x+=b.vx*h;b.z+=b.vz*h;
   if(pockets.some(([x,z])=>Math.hypot(b.x-x,b.z-z)<.078)){
    b.pocketed=true;b.vx=b.vz=0;if(b.id===0)state.scratch=true;else state.potted.push(b.id);continue;
   }
   if(Math.abs(b.x)>HX-R){b.x=Math.sign(b.x)*(HX-R);b.vx*=-.86;}
   if(Math.abs(b.z)>HZ-R){b.z=Math.sign(b.z)*(HZ-R);b.vz*=-.86;}
   const speed=Math.hypot(b.vx,b.vz),next=Math.max(0,speed-.20*h);
   if(speed){b.vx*=next/speed;b.vz*=next/speed;}if(next<.018)b.vx=b.vz=0;
  }
  for(let i=0;i<state.balls.length;i++)for(let j=i+1;j<state.balls.length;j++){
   const a=state.balls[i],b=state.balls[j];if(a.pocketed||b.pocketed)continue;
   const dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz);if(d>=R*2||d<1e-8)continue;
   const nx=dx/d,nz=dz/d,overlap=(R*2-d)/2+.00001;
   a.x-=nx*overlap;a.z-=nz*overlap;b.x+=nx*overlap;b.z+=nz*overlap;
   const closing=(a.vx-b.vx)*nx+(a.vz-b.vz)*nz;
   if(closing>0){const impulse=closing*.98;a.vx-=impulse*nx;a.vz-=impulse*nz;b.vx+=impulse*nx;b.vz+=impulse*nz;}
  }
 }
 if(state.balls.some(b=>!b.pocketed&&Math.hypot(b.vx,b.vz)>.001))return false;
 state.moving=false;
 const own=(id,group)=>group==='solids'?id>0&&id<8:id>8;
 if(!state.groups[0]){const first=state.potted.find(id=>id!==8);if(first){state.groups[state.turn]=first<8?'solids':'stripes';state.groups[1-state.turn]=first<8?'stripes':'solids';}}
 if(state.potted.includes(8)){
  const group=state.groups[state.turn],cleared=group&&!state.balls.some(b=>!b.pocketed&&own(b.id,group));
  state.winner=cleared&&!state.scratch?state.turn:1-state.turn;state.last='Player '+(state.winner+1)+' wins!';return true;
 }
 if(state.scratch){const cue=state.balls.find(b=>b.id===0);cue.pocketed=false;cue.x=-.82;cue.z=0;while(state.balls.some(b=>b.id!==0&&!b.pocketed&&Math.hypot(b.x-cue.x,b.z-cue.z)<R*2.2)&&cue.z<.5)cue.z+=R*2.3;}
 const keep=!state.scratch&&state.potted.some(id=>own(id,state.groups[state.turn]));if(!keep)state.turn=1-state.turn;
 state.last=(state.scratch?'Scratch · cue ball returned. ':'')+'Player '+(state.turn+1)+' · '+(state.groups[state.turn]||'open table');state.revision++;return true;
}
export const POOL={radius:R,halfX:HX,halfZ:HZ,pockets};
