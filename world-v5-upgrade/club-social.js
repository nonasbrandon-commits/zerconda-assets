const RELAYS=['wss://nos.lol','wss://relay.primal.net','wss://relay.ditto.pub'];
const TOPIC='nonasbrandon-commits/zerconda/club-v1';

// Live room events use signed, ephemeral relay messages so text and presence
// continue to work on networks that block direct WebRTC connections.
export function createClubSocial({getPose,onPresence,onGame,getGames,onFocus=()=>{}}){
 const panel=document.createElement('section');panel.id='club-social';panel.style.cssText='position:fixed;left:14px;bottom:18px;width:min(330px,90vw);z-index:12000;background:#142329ed;color:#f6ead6;border:1px solid #94784f;border-radius:12px;padding:12px;display:none;font:13px system-ui';
 const title=document.createElement('strong');title.textContent='CLUB ZERCONDA · LIVE LOUNGE';panel.appendChild(title);
 const status=document.createElement('div');status.style.cssText='font-size:12px;color:#bfcfca;margin:7px 0';panel.appendChild(status);
 const row=document.createElement('div');row.style.cssText='display:flex;gap:6px';panel.appendChild(row);
 const name=document.createElement('input');name.maxLength=24;name.placeholder='Your name';name.value=localStorage.getItem('zerconda-club-name')||'Visitor '+Math.floor(Math.random()*900+100);name.style.cssText='width:55%;padding:7px;background:#24383c;color:white;border:1px solid #65736a;border-radius:5px';row.appendChild(name);
 const voice=document.createElement('button');voice.textContent='Enable voice';voice.title='Optional microphone; direct audio may be unavailable on restricted networks.';row.appendChild(voice);
 const retry=document.createElement('button');retry.textContent='Reconnect';retry.style.display='none';row.appendChild(retry);
 const log=document.createElement('div');log.style.cssText='height:125px;overflow:auto;margin:9px 0;overflow-wrap:anywhere';log.setAttribute('aria-live','polite');panel.appendChild(log);
 const form=document.createElement('form');form.style.cssText='display:flex;gap:6px';panel.appendChild(form);
 const input=document.createElement('input');input.placeholder='Message people in the club…';input.maxLength=240;input.style.cssText='flex:1;min-width:0;padding:8px;background:#23363b;color:white;border:1px solid #65736a;border-radius:5px';form.appendChild(input);
 const send=document.createElement('button');send.textContent='Send';form.appendChild(send);
 for(const button of [voice,retry,send])button.style.cssText+=';background:#815f35;color:white;border:0;border-radius:5px;padding:7px;cursor:pointer';
 for(const event of ['keydown','keyup','pointerdown'])panel.addEventListener(event,e=>e.stopPropagation());panel.addEventListener('focusin',onFocus);document.body.appendChild(panel);
 const peers=new Map(),sockets=new Set(),seen=new Set(),audio=new Map();
 let opened=false,loading=false,tools,key,id,room,stream,lastPose=0,lastHeartbeat=0,lastSnapshot='',generation=0,heartbeat=null;
 function nickname(){return name.value.trim().slice(0,24)||'Visitor';}
 function append(who,text){const line=document.createElement('div');line.style.cssText='margin:5px 0';const strong=document.createElement('strong');strong.textContent=String(who).slice(0,24)+': ';line.appendChild(strong);line.appendChild(document.createTextNode(String(text).slice(0,240)));log.appendChild(line);while(log.childNodes.length>80)log.firstChild.remove();log.scrollTop=log.scrollHeight;}
 function connected(){return [...sockets].some(ws=>ws.readyState===WebSocket.OPEN);}
 function count(){status.textContent=!connected()?'Connecting live lounge…':peers.size?(peers.size+1)+' visitors connected':'You are the first visitor online';}
 function publish(type,data={}){
  if(!tools||!key||!connected())return false;
  const event=tools.finalizeEvent({kind:20070,created_at:Math.floor(Date.now()/1000),tags:[['t',TOPIC]],content:JSON.stringify({type,name:nickname(),nonce:crypto.randomUUID(),...data})},key);
  const message=JSON.stringify(['EVENT',event]);for(const ws of sockets)if(ws.readyState===WebSocket.OPEN)ws.send(message);return true;
 }
 function receive(event){
  if(!opened||!event||event.pubkey===id||seen.has(event.id)||event.kind!==20070||Math.abs(Date.now()/1000-event.created_at)>30||typeof event.content!=='string'||event.content.length>24000)return;
  if(!tools.verifyEvent(event)||!event.tags.some(tag=>tag[0]==='t'&&tag[1]===TOPIC))return;
  seen.add(event.id);if(seen.size>4000)seen.delete(seen.values().next().value);
  let message;try{message=JSON.parse(event.content);}catch{return;}
  if(message.type==='bye'){peers.delete(event.pubkey);onPresence(event.pubkey,null);count();return;}
  const fresh=!peers.has(event.pubkey);const previous=peers.get(event.pubkey);peers.set(event.pubkey,{name:String(message.name||'Visitor').slice(0,24),last:Date.now(),pose:message.pose||previous?.pose});
  if(message.pose)onPresence(event.pubkey,message.pose);
  if(message.type==='chat'&&typeof message.text==='string')append(message.name||'Visitor',message.text);
  if(message.type==='game'&&message.game&&typeof message.game==='object')onGame(message.game);
  if(fresh||message.type==='hello'){publish('pose',{pose:{name:nickname(),...getPose()}});publish('game',{game:{type:'sync',...getGames()}});}
  count();
 }
 async function connect(){
  if(loading||connected())return;loading=true;status.textContent='Connecting live lounge…';retry.style.display='none';const token=generation;
  try{
   tools=await import('https://esm.sh/nostr-tools@2.15.0/pure?bundle');if(!opened||token!==generation)return;
   key=tools.generateSecretKey();id=tools.getPublicKey(key);
   for(const url of RELAYS){
    const ws=new WebSocket(url);sockets.add(ws);const sub='club-'+crypto.randomUUID().slice(0,8);
    ws.onopen=()=>{if(!opened||token!==generation){ws.close();return;}ws.send(JSON.stringify(['REQ',sub,{kinds:[20070],'#t':[TOPIC],since:Math.floor(Date.now()/1000)-5}]));publish('hello',{pose:{name:nickname(),...getPose()}});count();};
    ws.onmessage=e=>{if(!opened||token!==generation)return;try{const value=JSON.parse(e.data);if(value[0]==='EVENT')receive(value[2]);}catch(error){console.warn('Club room event',error);}};
    ws.onclose=()=>{sockets.delete(ws);if(opened&&!connected()){status.textContent='Live lounge disconnected · Reconnect';retry.style.display='inline-block';}};
    ws.onerror=()=>{if(!connected()){status.textContent='Live lounge unavailable · Reconnect';retry.style.display='inline-block';}};
   }
  }catch(error){status.textContent='Live lounge unavailable · Reconnect';retry.style.display='inline-block';console.warn('Club live room',error);}
  finally{loading=false;}
 }
 function stopVoice(){if(stream){stream.getTracks().forEach(track=>track.stop());stream=null;}room?.leave();room=null;voice.textContent='Enable voice';for(const player of audio.values())player.remove();audio.clear();}
 voice.onclick=async()=>{
  if(stream){stopVoice();return;}
  try{
   stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true},video:false});
   const {joinRoom}=await import('https://esm.sh/trystero@0.27.0?bundle');if(!opened){stopVoice();return;}
   room=joinRoom({appId:'nonasbrandon-commits.github.io/zerconda-assets',identity:'none',maxUsers:12,relayConfig:{urls:RELAYS,redundancy:3}},'club-zerconda-voice-v1');
   await room.addStream(stream,{metadata:{type:'clubvoice'}});voice.textContent='Voice on · waiting';
   room.onUserJoin(({userId})=>{voice.textContent='Voice on';room.addStream(stream,{target:userId,metadata:{type:'clubvoice'}}).catch(()=>{});});
   room.onPeerStream((remote,{userId})=>{audio.get(userId)?.remove();const player=document.createElement('audio');player.autoplay=true;player.srcObject=remote;document.body.appendChild(player);audio.set(userId,player);player.play().catch(()=>append('Club','Tap Voice to enable incoming audio.'));});
   room.onError(error=>{if(error.code==='peer-connect-failed'){append('Club','Direct voice is blocked on this network. Live text chat still works.');stopVoice();}});
  }catch{append('Club','Microphone unavailable. Live text chat still works.');stopVoice();}
 };
 name.onchange=()=>{localStorage.setItem('zerconda-club-name',nickname());publish('pose',{pose:{name:nickname(),...getPose()}});};
 form.onsubmit=e=>{e.preventDefault();const text=input.value.trim();if(!text)return;if(publish('chat',{text})){append(nickname(),text);input.value='';}else append('Club','The live lounge is not connected yet.');};
 retry.onclick=()=>{for(const ws of sockets)ws.close();sockets.clear();generation++;loading=false;connect();};
 return {panel,get peers(){return peers.size;},get connected(){return connected();},
  open(){opened=true;panel.style.display='block';connect();clearInterval(heartbeat);heartbeat=setInterval(()=>{if(opened){publish('pose',{pose:{name:nickname(),...getPose()}});lastHeartbeat=Date.now();}},2000);},
  close(){publish('bye');opened=false;generation++;clearInterval(heartbeat);heartbeat=null;panel.style.display='none';stopVoice();for(const ws of sockets)ws.close();sockets.clear();for(const peer of peers.keys())onPresence(peer,null);peers.clear();},
  sendGame(game){publish('game',{game});},
  update(dt){
   if(!opened)return;lastPose+=dt;
   if(lastPose>.18){lastPose=0;const pose={name:nickname(),...getPose()},snapshot=JSON.stringify(pose);if(snapshot!==lastSnapshot||Date.now()-lastHeartbeat>2000){publish('pose',{pose});lastSnapshot=snapshot;lastHeartbeat=Date.now();}}
   for(const [peer,data] of peers)if(Date.now()-data.last>12000){peers.delete(peer);onPresence(peer,null);count();}
  }
 };
}
