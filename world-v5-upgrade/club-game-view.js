import {DART_SECTORS,POOL,shootPool,throwDart,rackPool,createDarts} from './club-games.js?v=20261117-club-v70';
export const BALL_COLORS=['#faf8e9','#dfb924','#31549e','#bd302d','#704a9e','#da7130','#368d62','#7a242a','#171a1e','#dfb924','#31549e','#bd302d','#704a9e','#da7130','#368d62','#7a242a'];
export function drawDartBoard(ctx,size=520,hits=[]){
 const c=size/2,r=size*.395;ctx.fillStyle='#17221f';ctx.fillRect(0,0,size,size);
 const ring=(from,to,index,color)=>{const a=-Math.PI/2-Math.PI/20+index*Math.PI/10,b=a+Math.PI/10;ctx.beginPath();ctx.arc(c,c,r*to,a,b);ctx.arc(c,c,r*from,b,a,true);ctx.closePath();ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#a4a09a';ctx.lineWidth=.6;ctx.stroke();};
 for(let i=0;i<20;i++){
  ring(.094,.57,i,i%2?'#e6d7b4':'#242626');ring(.63,.94,i,i%2?'#e6d7b4':'#242626');ring(.57,.63,i,i%2?'#337c60':'#bc3b37');ring(.94,1,i,i%2?'#337c60':'#bc3b37');
  const a=-Math.PI/2+i*Math.PI/10;ctx.fillStyle='#f5eee0';ctx.font=`bold ${size*.043}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(DART_SECTORS[i],c+Math.cos(a)*r*1.1,c+Math.sin(a)*r*1.1);
 }
 for(const [radius,color] of [[.094,'#34795e'],[.037,'#bd3639']]){ctx.beginPath();ctx.arc(c,c,r*radius,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
 for(const hit of hits){const x=c+hit.x*r,y=c+hit.y*r;ctx.strokeStyle='#eef7ff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-5,y-5);ctx.lineTo(x+5,y+5);ctx.moveTo(x+5,y-5);ctx.lineTo(x-5,y+5);ctx.stroke();}
}
export function createClubGameView({getPool,setPool,getDarts,setDarts,changed,onDart,stopMovement}){
 let mode=null,aim=0;
 const shell=document.createElement('div');shell.id='club-game';shell.style.cssText='display:none;position:fixed;inset:0;background:#071012e8;z-index:21000;align-items:center;justify-content:center;padding:12px;box-sizing:border-box';
 const card=document.createElement('section');card.style.cssText='width:min(960px,96vw);max-height:95vh;overflow:auto;background:#17282c;color:#fff0d6;border:1px solid #9a794c;border-radius:14px;padding:16px;font:14px system-ui';shell.appendChild(card);
 const head=document.createElement('div');head.style.cssText='display:flex;justify-content:space-between;align-items:center';card.appendChild(head);
 const title=document.createElement('h2');title.style.margin='0';head.appendChild(title);
 const close=document.createElement('button');close.textContent='Return to club · Esc';head.appendChild(close);
 const status=document.createElement('p');card.appendChild(status);
 const canvas=document.createElement('canvas');canvas.style.cssText='display:block;position:static;inset:auto;height:auto;width:100%;max-height:63vh;object-fit:contain;touch-action:none;border-radius:8px;cursor:crosshair';canvas.width=960;canvas.height=500;card.appendChild(canvas);const ctx=canvas.getContext('2d');
 const controls=document.createElement('div');controls.style.cssText='display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px';card.appendChild(controls);
 const powerLabel=document.createElement('label');powerLabel.textContent='Shot strength ';controls.appendChild(powerLabel);
 const power=document.createElement('input');power.type='range';power.min='.4';power.max='3.5';power.step='.05';power.value='1.8';powerLabel.appendChild(power);
 const shoot=document.createElement('button');shoot.textContent='Shoot cue ball';controls.appendChild(shoot);
 const reset=document.createElement('button');reset.textContent='New game';controls.appendChild(reset);
 const help=document.createElement('p');help.style.cssText='font-size:12px;color:#b9c8c5';card.appendChild(help);
 for(const button of [close,shoot,reset])button.style.cssText='background:#876239;color:white;border:0;padding:10px 14px;border-radius:7px;cursor:pointer';
 for(const event of ['keydown','keyup','pointerdown'])shell.addEventListener(event,e=>e.stopPropagation());
 close.onclick=()=>{mode=null;shell.style.display='none';stopMovement();};
 addEventListener('keydown',e=>{if(mode&&e.code==='Escape'){e.stopImmediatePropagation();close.click();}},true);
 document.body.appendChild(shell);
 const px=x=>480+x*290,pz=z=>250+z*290;
 function drawPool(){
  const state=getPool();ctx.fillStyle='#26373a';ctx.fillRect(0,0,960,500);ctx.fillStyle='#503826';ctx.fillRect(px(-1.48),pz(-.80),2.96*290,1.60*290);ctx.fillStyle='#1c6857';ctx.fillRect(px(-POOL.halfX),pz(-POOL.halfZ),POOL.halfX*580,POOL.halfZ*580);
  for(const [x,z] of POOL.pockets){ctx.beginPath();ctx.arc(px(x),pz(z),24,0,Math.PI*2);ctx.fillStyle='#080e10';ctx.fill();}
  const cue=state.balls.find(b=>b.id===0);
  if(!state.moving&&!cue.pocketed&&state.winner===null){ctx.strokeStyle='#fff9d3aa';ctx.setLineDash([8,8]);ctx.beginPath();ctx.moveTo(px(cue.x),pz(cue.z));ctx.lineTo(px(cue.x+Math.cos(aim)*2),pz(cue.z+Math.sin(aim)*2));ctx.stroke();ctx.setLineDash([]);}
  for(const ball of state.balls){if(ball.pocketed)continue;const x=px(ball.x),y=pz(ball.z),r=POOL.radius*290;ctx.fillStyle=ball.id>8?'#f4f0dc':BALL_COLORS[ball.id];ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
   if(ball.id>8){ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();ctx.fillStyle=BALL_COLORS[ball.id];ctx.fillRect(x-r,y-r*.45,r*2,r*.9);ctx.restore();}
   if(ball.id){ctx.fillStyle='#fff9e4';ctx.beginPath();ctx.arc(x,y,r*.45,0,Math.PI*2);ctx.fill();ctx.fillStyle='#152125';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(ball.id,x,y);}
  }
  status.textContent=state.last+' · Solids/stripes: '+(state.groups[0]||'unassigned')+' / '+(state.groups[1]||'unassigned');shoot.disabled=state.moving||state.winner!==null;
 }
 canvas.onpointerdown=e=>{
  const rect=canvas.getBoundingClientRect(),x=(e.clientX-rect.left)*canvas.width/rect.width,y=(e.clientY-rect.top)*canvas.height/rect.height;
  if(mode==='pool'){const cue=getPool().balls.find(b=>b.id===0);aim=Math.atan2((y-250)/290-cue.z,(x-480)/290-cue.x);}
  else if(mode==='darts'){
   const r=canvas.width*.395,nx=(x-canvas.width/2)/r,ny=(y-canvas.height/2)/r;
   if(Math.hypot(nx,ny)>1.18)return;
   const state=getDarts();if(state.winner!==null)return;throwDart(state,nx,ny);onDart(nx,ny);changed('darts');
  }
 };
 shoot.onclick=()=>{if(shootPool(getPool(),aim,Number(power.value)))changed('pool');};
 reset.onclick=()=>{if(mode==='pool')setPool(rackPool());else setDarts(createDarts());changed(mode);};
 return {get open(){return !!mode;},show(next){mode=next;stopMovement();shell.style.display='flex';title.textContent=next==='pool'?'Club Zerconda · 8-ball pool':'Club Zerconda · 301 darts';canvas.width=next==='pool'?960:520;canvas.height=next==='pool'?500:520;canvas.style.width=next==='pool'?'min(100%,116vh)':'min(520px,60vh,100%)';canvas.style.margin='auto';powerLabel.style.display=shoot.style.display=next==='pool'?'inline-block':'none';help.textContent=next==='pool'?'Click the table to aim, set the strength and shoot. Cushions, ball collisions, six pockets, scratches and 8-ball wins are active. Take turns at this table.':'Click the board to throw. Three darts per turn, double-out, doubles, triples and bullseyes. A bust restores the score at the start of the turn.';},close:()=>close.click(),update(){if(mode==='pool')drawPool();else if(mode==='darts'){const d=getDarts();drawDartBoard(ctx,520,d.hits);status.textContent='Player 1: '+d.scores[0]+' · Player 2: '+d.scores[1]+' · '+d.last+' · Player '+(d.turn+1)+' · Dart '+(d.throws+1);}}};
}
