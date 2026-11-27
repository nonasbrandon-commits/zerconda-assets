// CC0 field recording: Joseph Sardin, Feet in Leaves #1 (BigSoundBank #137).
export function warningIsInView(player,view,target){
 if(!player||!view||view.active===false)return false;
 const dx=target.x-view.x,dy=target.y-view.y,dz=target.z-view.z,d=Math.hypot(dx,dy,dz);
 return Math.hypot(player.x-target.x,player.z-target.z)<13&&player.z>target.z+.95&&d>.1&&(dx*view.fx+dy*view.fy+dz*view.fz)/d>.90;
}
export function createWarningRustle({getPlayer,getView,target,random=Math.random,now=()=>performance.now()/1000}={}){
 let context,master,buffer,loading,inside=false,next=0,disposed=false,anchor;const voices=new Set();
 function unlock(){if(disposed||document.hidden)return;try{const AC=globalThis.AudioContext||globalThis.webkitAudioContext;if(!AC)return;context??=new AC();if(!master){master=context.createGain();master.gain.value=0;master.connect(context.destination);}if(context.state==='suspended')context.resume().catch(()=>{});}catch{}}
 const events=['pointerdown','keydown','touchstart'];for(const e of events)globalThis.addEventListener(e,unlock,{passive:true});
 function listener(v){const l=context.listener,t=context.currentTime;for(const [name,value]of Object.entries({positionX:v.x,positionY:v.y,positionZ:v.z,forwardX:v.fx,forwardY:v.fy,forwardZ:v.fz,upX:0,upY:1,upZ:0}))if(l[name])l[name].setValueAtTime(value,t);if(!l.positionX){l.setPosition(v.x,v.y,v.z);l.setOrientation(v.fx,v.fy,v.fz,0,1,0);}}
 function load(){if(buffer||loading||!context)return;loading=fetch(new URL('./assets/leaf-footsteps-v450.mp3',import.meta.url)).then(r=>{if(!r.ok)throw Error('Footstep audio unavailable');return r.arrayBuffer();}).then(b=>context.decodeAudioData(b)).then(b=>{if(!disposed)buffer=b;}).catch(()=>{}).finally(()=>{loading=null;});}
 function emit(){const source=context.createBufferSource(),gain=context.createGain(),panner=context.createPanner();source.buffer=buffer;panner.panningModel='HRTF';panner.distanceModel='inverse';panner.refDistance=2;panner.maxDistance=18;panner.rolloffFactor=.8;
  panner.setPosition(anchor.x,.35,anchor.z);gain.gain.value=.7;source.connect(gain);gain.connect(panner);panner.connect(master);voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();gain.disconnect();panner.disconnect();};source.start();
 }
 function update(){if(disposed)return;const t=now(),p=getPlayer(),v=getView(),active=!document.hidden&&warningIsInView(p,v,target);if(active&&!inside)next=t+1.6;inside=active;
  if(context&&master&&v){listener(v);master.gain.setTargetAtTime(active?.65:0,context.currentTime,.18);}
  if(!active){for(const s of voices)try{s.stop(context.currentTime+.65);}catch{}return;}
  load();if(!buffer||!context||context.state!=='running'||t<next||voices.size)return;
  const n=Math.hypot(v.fx,v.fz)||1,fx=v.fx/n,fz=v.fz/n,side=(random()-.5)*1.2;anchor={x:p.x-fx*3.6-fz*side,z:p.z-fz*3.6+fx*side};emit();next=t+buffer.duration+11+random()*8;
 }
 function dispose(){disposed=true;for(const e of events)globalThis.removeEventListener(e,unlock);for(const s of voices)try{s.stop();}catch{}voices.clear();context?.close().catch(()=>{});}
 return{update,dispose,get stats(){return{looking:inside,activeVoices:voices.size,audioState:context?.state||'locked'};}};
}
