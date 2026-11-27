import {registerTownAction} from './town-interactions.js?v=447';

export const ELLIS_LINES={
 greeting:'Beautiful day!',
 hiking:"You should go hiking, but be careful in those woods. I hear some strange things happen out there. And whatever you do, don't go beyond the gate.",
 plans:"I'll enjoy the weather and the views. It's nice to be somewhere safe from those aggressive animals. Stay within the walls, if you know what's good for you."
};
const CHOICES=[['hiking',"It's amazing out—a nice day for a hike!"],['plans','It is! What are your plans for today, sir?']];
const clips=Object.fromEntries(['hello','hiking','plans'].map(k=>[k,new URL('./ellis-'+k+'-v472.mp3',import.meta.url).href]));
export function createEllisConversation({person,getPlayer,canTalk=()=>true,onStop=()=>{},onMessage=()=>{},audioFactory=url=>new Audio(url)}={}){
 let active=false,unlocked=false,time=0,armed=true,lastGreeting=-100,holdUntil=0,audio=null,lastAudio='',previousFocus=null,branch='greeting',voiceBlocked=false;
 const button=document.createElement('button');button.style.display='none';button.textContent='Talk to Ellis';document.body.append(button);
 const disposeAction=registerTownAction(button,{id:'talk-ellis',label:'Talk to Ellis',priority:115,when:()=>near(3.3)&&!active,target:()=>({x:person.worldPosition.x,y:person.worldPosition.y+1.35,z:person.worldPosition.z})});
 const style=document.createElement('style');style.textContent=`#ellis-conversation{color:#f4f3e9;background:#102c3df5;border:1px solid #89b9ca;border-radius:15px;box-shadow:0 12px 50px #0008;width:min(480px,calc(100vw - 28px));box-sizing:border-box;padding:22px;font:16px/1.55 system-ui;max-height:80dvh;overflow:auto}#ellis-conversation::backdrop{background:#07142155}#ellis-conversation h2{margin:0 0 12px;font-size:22px}#ellis-conversation p{margin:12px 0}#ellis-conversation .ellis-reply{color:#bdd7e1;font-size:14px}#ellis-conversation button{display:block;width:100%;text-align:left;color:white;background:#244b61;border:1px solid #7ba3b9;border-radius:8px;padding:11px 13px;min-height:46px;margin:9px 0;font:inherit;cursor:pointer}#ellis-conversation button:focus-visible{outline:3px solid #ffdf91;outline-offset:2px}#ellis-conversation .ellis-goodbye{background:#1b3544}`;document.head.append(style);
 const panel=document.createElement('dialog');panel.id='ellis-conversation';panel.setAttribute('aria-label','Talk with Ellis');panel.setAttribute('aria-modal','true');document.body.append(panel);
 for(const type of['pointerdown','pointerup','click','keydown','keyup','wheel'])panel.addEventListener(type,e=>e.stopPropagation());
 panel.addEventListener('cancel',e=>{e.preventDefault();close();});panel.addEventListener('keydown',e=>{if(e.code==='Escape'){e.preventDefault();close();}});
 function ready(){return !!person?.loaded&&person.group.visible&&!person.group.userData.adminDeleted;}
 function distance(){const p=getPlayer(),q=person.worldPosition;return Math.hypot(p.x-q.x,p.z-q.z);}
 function near(max){return ready()&&distance()<max&&canTalk();}
 function stopAudio(){if(audio){audio.pause();audio.removeAttribute?.('src');audio.load?.();audio=null;}}
 function speak(key){stopAudio();voiceBlocked=false;lastAudio=key;audio=audioFactory(clips[key]);audio.preload='none';audio.volume=.65;audio.play()?.then(()=>{delete panel.dataset.voiceUnavailable;}).catch(()=>{voiceBlocked=true;panel.dataset.voiceUnavailable='true';});}
 function unlock(e){if(e.isTrusted)unlocked=true;}
 document.addEventListener('pointerdown',unlock,{capture:true,passive:true});document.addEventListener('keydown',unlock,{capture:true,passive:true});
 function render(){panel.replaceChildren();const heading=document.createElement('h2');heading.textContent='Ellis';const line=document.createElement('p');line.setAttribute('aria-live','polite');line.textContent=ELLIS_LINES[branch];panel.append(heading);if(branch!=='greeting'){const reply=document.createElement('p');reply.className='ellis-reply';reply.textContent='You: '+CHOICES.find(c=>c[0]===branch)[1];panel.append(reply);}panel.append(line);for(const[key,label]of CHOICES){const b=document.createElement('button');b.textContent=label;b.dataset.ellisChoice=key;b.onclick=()=>{branch=key;render();speak(key);panel.querySelector('[data-ellis-choice="'+key+'"]').focus();};panel.append(b);}const goodbye=document.createElement('button');goodbye.className='ellis-goodbye';goodbye.textContent='Goodbye';goodbye.onclick=close;panel.append(goodbye);}
 function open(){if(!near(3.3))return;unlocked=true;onStop();previousFocus=document.activeElement;active=true;button.style.display='none';branch='greeting';render();panel.showModal();panel.querySelector('button')?.focus();if(time-lastGreeting>5||voiceBlocked){speak('hello');lastGreeting=time;armed=false;}}
 function close(){if(!active)return;active=false;stopAudio();panel.close();onStop();person.roam.remaining=Math.max(person.roam.remaining,2);if(previousFocus?.isConnected&&!previousFocus.classList.contains('town-action-source'))previousFocus.focus();}
 button.onclick=open;
 const visibility=()=>{if(document.hidden){close();stopAudio();}};document.addEventListener('visibilitychange',visibility);
 return{open,close,button,panel,get panelOpen(){return active;},get engaged(){return active||time<holdUntil;},get state(){return{active,branch,lastAudio,lastGreeting,unlocked};},update(dt=.016){time+=Math.max(0,Math.min(.15,dt));const visible=near(3.3);button.style.display=visible&&!active?'block':'none';if(active&&(!ready()||distance()>7||!canTalk()))close();if(!ready())return;const d=distance();if(d>12)armed=true;if(!active&&unlocked&&armed&&time-lastGreeting>90&&near(4.5)&&!document.hidden){armed=false;lastGreeting=time;holdUntil=time+2.2;speak('hello');onMessage('Ellis: '+ELLIS_LINES.greeting,2600);}},dispose(){close();stopAudio();disposeAction();button.remove();panel.remove();style.remove();document.removeEventListener('pointerdown',unlock,true);document.removeEventListener('keydown',unlock,true);document.removeEventListener('visibilitychange',visibility);}};
}
