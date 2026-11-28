// Original filtered-noise leaf swishes, triggered by movement through real shrubs.
export function createBushRustle({getBushes,enabled=()=>true,audioFactory}={}) {
  let context,noise,last=null,travel=0,cooldown=0,played=0,disposed=false;
  const voices=new Set();
  function unlock(){if(disposed)return;try{const Audio=audioFactory||globalThis.AudioContext||globalThis.webkitAudioContext;if(!Audio)return;context??=new Audio();if(context.state==='suspended')context.resume().catch(()=>{});}catch{}}
  globalThis.addEventListener?.('pointerdown',unlock,{passive:true});
  globalThis.addEventListener?.('keydown',unlock);
  function swish(speed){
    if(!context||context.state!=='running')return;
    if(!noise){noise=context.createBuffer(1,Math.ceil(context.sampleRate*.6),context.sampleRate);const data=noise.getChannelData(0);let brown=0;for(let i=0;i<data.length;i++){brown=(brown+(Math.random()*2-1)*.12)/1.04;data[i]=brown*2+(Math.random()*2-1)*.25;}}
    const source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain(),t=context.currentTime;
    source.buffer=noise;source.playbackRate.value=.85+Math.random()*.3;
    filter.type='bandpass';filter.frequency.value=1400+Math.random()*1200;filter.Q.value=.55;
    const volume=Math.min(.17,.04+speed*.018);gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(volume,t+.035);gain.gain.exponentialRampToValueAtTime(.0001,t+.29);
    source.connect(filter);filter.connect(gain);gain.connect(context.destination);voices.add(source);
    source.onended=()=>{voices.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};source.start(t,Math.random()*.1,.36);played++;
  }
  function update(dt,p){
    const previous=last;last={x:p.x,z:p.z};cooldown=Math.max(0,cooldown-Math.max(0,dt));
    if(!previous||!(dt>0)||!enabled()||globalThis.document?.hidden){travel=0;return;}
    const dx=p.x-previous.x,dz=p.z-previous.z,distance=Math.hypot(dx,dz),speed=distance/dt;
    if(distance<.002||distance>2||speed>14){travel=0;return;}
    let contact=false;
    for(const b of getBushes()){
      if(Number.isFinite(p.y)&&(p.y>b.y+b.height+.3||p.y+1.5<b.y))continue;
      const t=Math.max(0,Math.min(1,((b.x-previous.x)*dx+(b.z-previous.z)*dz)/(distance*distance)));
      if(Math.hypot(b.x-previous.x-t*dx,b.z-previous.z-t*dz)<b.r+.23){contact=true;break;}
    }
    if(!contact){travel=0;return;}travel+=distance;
    if(cooldown===0&&travel>.12){swish(speed);travel=0;cooldown=Math.max(.17,.34-speed*.02);}
  }
  return {update,stats:()=>({played}),dispose(){disposed=true;globalThis.removeEventListener?.('pointerdown',unlock);globalThis.removeEventListener?.('keydown',unlock);for(const v of voices)try{v.stop();}catch{}context?.close().catch(()=>{});}};
}
