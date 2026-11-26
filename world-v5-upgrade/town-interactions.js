// Shared nearby-action presentation and pointer controls for the whole town.
const actions=new Map();let sequence=0;
export function registerTownAction(element,options={}){
 const id=options.id||element.id||'town-action-'+(++sequence);element.classList.add('town-action-source');element.setAttribute('aria-hidden','true');element.tabIndex=-1;const action={id,element,priority:50,...options};actions.set(id,action);return ()=>actions.delete(id);
}
const cleanLabel=value=>String(value||'').replace(/^[A-Z]\s*[·:.–-]\s*/,'').replace(/\s*\(DEMO\)/gi,'').trim().toLowerCase().replace(/(^|[·] )\w/g,s=>s.toUpperCase());
export function createTownInteractions({canvas,isLocked=()=>false,onStop=()=>{},onLook=()=>{},onTap=()=>{},onStartWalk=()=>{}}={}){
 const style=document.createElement('style');style.textContent=`
 .town-action-source{display:none!important}.town-source-panel{display:none!important}
 #mobile,#help,#hud,#zerconda-diagnostics{display:none!important}
 body.town-map-closed #zerconda-v5-map{display:none!important}
 #town-actions{position:fixed;z-index:13000;right:max(14px,env(safe-area-inset-right));bottom:max(24px,env(safe-area-inset-bottom));width:min(310px,calc(100vw - 28px));padding:12px;box-sizing:border-box;background:#142b30ed;color:#f4f2e7;border:1px solid #a1b5ad;border-radius:14px;box-shadow:0 8px 30px #0005;font:14px system-ui;display:none;pointer-events:auto}
 #town-actions h2{font-size:12px;text-transform:uppercase;letter-spacing:.11em;color:#c0d7cd;margin:0 0 8px;font-weight:600}
 #town-action-list{display:grid;gap:8px;max-height:min(370px,48dvh);overflow:auto;overscroll-behavior:contain;touch-action:pan-y}
 .town-action{min-height:50px;box-sizing:border-box;width:100%;border-radius:9px;border:1px solid #78958c;background:#2c4a4e;color:#fffdf1;text-align:left;padding:11px 13px;font:600 15px system-ui;cursor:pointer;touch-action:manipulation;line-height:1.35}
 .town-action:first-child{background:#d6e4cf;color:#203d36;border-color:#e2ecd9}.town-action:hover{filter:brightness(1.1)}.town-action:active{transform:translateY(1px)}.town-action:focus-visible{outline:3px solid #ffe8a4;outline-offset:2px}
 #town-tools{position:fixed;z-index:13000;top:max(10px,env(safe-area-inset-top));right:max(12px,env(safe-area-inset-right));display:flex;gap:6px;font:14px system-ui}
 .town-utility{position:static!important;inset:auto!important;min-width:48px;min-height:44px;margin:0!important;padding:8px 9px!important;background:#19363ce8!important;color:white!important;border:1px solid #9cb6b3!important;border-radius:9px!important;font:600 13px system-ui!important;cursor:pointer;touch-action:manipulation}
 #town-gesture-help{position:fixed;bottom:max(10px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);z-index:12500;padding:9px 14px;border-radius:24px;background:#14272cce;color:#e6f0e4;font:12px system-ui;text-align:center;pointer-events:none;white-space:nowrap}
 #town-walk-indicator{position:fixed;z-index:12501;display:none;width:42px;height:42px;margin:-21px;border:2px solid #e2f3d1;border-radius:50%;background:#b8d8b42b;pointer-events:none;box-shadow:0 0 0 7px #d7edd323}
 #town-toast{position:fixed;z-index:22000;left:50%;top:70px;transform:translateX(-50%);max-width:min(440px,85vw);padding:12px 18px;border-radius:10px;background:#193931ef;color:#fff;font:14px system-ui;text-align:center;display:none;pointer-events:none}
 #zerconda-home-customizer button,#club-game button,#club-social button{min-height:44px;min-width:44px;touch-action:manipulation}
 #zerconda-home-customizer input,#zerconda-home-customizer select,#club-social input{font-size:16px!important;min-height:40px;box-sizing:border-box}
 #club-game input[type=range]{height:44px;min-width:160px;touch-action:pan-x}
 #club-game section{box-sizing:border-box;max-height:calc(var(--town-vh,100dvh) - 20px)!important}
 #club-social{touch-action:pan-y;max-height:calc(var(--town-vh,100dvh) - 110px);overflow:auto;box-sizing:border-box}
 body.town-chat-closed #club-social{display:none!important}
 #zerconda-v5-map{top:66px!important;pointer-events:auto!important}
 #zerconda-v5-map canvas{position:static!important;inset:auto!important;height:auto!important;touch-action:auto}
 #town-debug-toggle{display:none}
 @media(max-width:700px),(pointer:coarse){
 #town-actions{bottom:calc(max(12px,env(safe-area-inset-bottom)) + 46px);width:min(310px,calc(100vw - 28px));padding:10px}
 #town-action-list{max-height:38dvh}
 #town-gesture-help{font-size:11px;max-width:calc(100vw - 24px);white-space:normal;width:max-content;box-sizing:border-box}
 body.town-map-closed #zerconda-v5-map{display:none!important}
 #zerconda-v5-map{right:12px!important;max-width:calc(100vw - 24px)!important}
 #zerconda-v5-map canvas{width:min(300px,75vw)!important}
 #club-social{left:12px!important;top:68px!important;bottom:auto!important;width:min(350px,calc(100vw - 24px))!important}
 #club-banner{left:12px!important;top:68px!important;transform:none!important;max-width:calc(100vw - 48px);font-size:11px!important;padding:7px 10px!important}
 #golf-score{top:70px!important;left:12px!important;font-size:11px!important;max-width:calc(100vw - 48px)}
 #zerconda-home-customizer{top:68px!important;max-height:calc(var(--town-vh,100dvh) - 88px)!important;right:12px!important}
 }
 @media(max-height:480px) and (pointer:coarse){#town-actions{width:270px;bottom:44px}#town-action-list{max-height:44dvh}.town-action{min-height:46px;padding:9px 12px}#town-gesture-help{left:12px;transform:none;max-width:48vw;font-size:10px}}
 `;document.head.appendChild(style);
 const touchMode=()=>matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0;
 if(touchMode()||innerWidth<700)document.body.classList.add('town-map-closed');document.body.classList.add('town-chat-closed');
 const panel=document.createElement('section');panel.id='town-actions';panel.setAttribute('aria-label','Nearby actions');const title=document.createElement('h2');title.textContent=touchMode()?'Nearby · Tap':'Nearby · Tap or click';panel.appendChild(title);const list=document.createElement('div');list.id='town-action-list';panel.appendChild(list);document.body.appendChild(panel);
 const toolbar=document.createElement('nav');toolbar.id='town-tools';toolbar.setAttribute('aria-label','World tools');document.body.appendChild(toolbar);
 function utility(text,callback){const b=document.createElement('button');b.type='button';b.className='town-utility';b.textContent=text;b.onclick=()=>{stop();callback();};toolbar.appendChild(b);return b;}
 const mapButton=utility('Map',()=>{const closed=document.body.classList.toggle('town-map-closed');mapButton.setAttribute('aria-expanded',String(!closed));});mapButton.setAttribute('aria-controls','zerconda-v5-map');mapButton.setAttribute('aria-expanded',String(!document.body.classList.contains('town-map-closed')));
 const runButton=utility('Walk',()=>{running=!running;runButton.textContent=running?'Run':'Walk';runButton.setAttribute('aria-pressed',String(running));});runButton.setAttribute('aria-label','Toggle walking or running');runButton.setAttribute('aria-pressed','false');
 const chatButton=utility('Chat',()=>{const closed=document.body.classList.toggle('town-chat-closed');chatButton.setAttribute('aria-expanded',String(!closed));});chatButton.style.display='none';chatButton.setAttribute('aria-controls','club-social');
 const help=document.createElement('div');help.id='town-gesture-help';help.textContent=touchMode()?'Hold scene to walk · Drag to look · Tap actions':'WASD to move · Drag to look · Click nearby actions';document.body.appendChild(help);
 const indicator=document.createElement('div');indicator.id='town-walk-indicator';document.body.appendChild(indicator);
 const toast=document.createElement('div');toast.id='town-toast';toast.setAttribute('role','status');document.body.appendChild(toast);let toastTimer;
 let pointer=null,holdTimer=null,walking=false,running=false,lastUpdate=0,shown=[],signature='',wasSocial=false;
 const proxies=new Map();
 function stop(){clearTimeout(holdTimer);holdTimer=null;walking=false;indicator.style.display='none';if(pointer)pointer.held=false;onStop();}
 function available(action){try{return action.element.isConnected&&!action.element.disabled&&(action.when?action.when():action.element.style.display!=='none');}catch{return false;}}
 function current(){return [...actions.values()].filter(available).map(a=>({...a,label:typeof a.label==='function'?a.label():a.label||cleanLabel(a.element.textContent)})).filter(a=>a.label).sort((a,b)=>b.priority-a.priority||a.id.localeCompare(b.id));}
 function activate(action){if(!available(action)||isLocked())return false;stop();action.element.click();signature='';return true;}
 function update(force=false){const now=performance.now();if(!force&&now-lastUpdate<100)return;lastUpdate=now;const locked=isLocked();if(locked&&walking)stop();help.style.display=locked?'none':'block';if(!locked&&!walking)indicator.style.display='none';runButton.style.display=touchMode()?'block':'none';const social=document.getElementById('club-social'),socialOpen=!!social&&social.style.display!=='none';chatButton.style.display=socialOpen?'block':'none';if(socialOpen&&!wasSocial&&touchMode())document.body.classList.add('town-chat-closed');wasSocial=socialOpen;
  for(const [id,text]of [['zerconda-reset-view','Reset'],['zerconda-beach','Beach']]){const source=document.getElementById(id);if(source&&source.parentElement!==toolbar){source.classList.add('town-utility');source.textContent=text;source.addEventListener('click',stop,true);toolbar.appendChild(source);}}
  shown=locked?[]:current();panel.style.display=shown.length?'block':'none';const next=shown.map(a=>a.id+':'+a.label).join('|');if(next===signature)return;signature=next;const ids=new Set(shown.map(a=>a.id));for(const [id,b]of proxies)if(!ids.has(id)){b.remove();proxies.delete(id);}for(const action of shown){let b=proxies.get(action.id);if(!b){b=document.createElement('button');b.type='button';b.className='town-action';b.dataset.actionId=action.id;b.onclick=()=>activate(actions.get(action.id));proxies.set(action.id,b);}b.textContent=action.label;b.setAttribute('aria-label',action.label);list.appendChild(b);}
 }
 canvas.style.touchAction='none';
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;if(document.activeElement?.matches('input,textarea,select'))document.activeElement.blur();if(isLocked())return;if(pointer){stop();pointer=null;return;}e.preventDefault();pointer={id:e.pointerId,type:e.pointerType,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,moved:false,held:false};canvas.setPointerCapture(e.pointerId);if(e.pointerType==='touch'||e.pointerType==='pen'){holdTimer=setTimeout(()=>{if(!pointer||pointer.id!==e.pointerId||isLocked())return;pointer.held=true;walking=true;onStartWalk();indicator.style.left=pointer.startX+'px';indicator.style.top=pointer.startY+'px';indicator.style.display='block';},240);}});
 canvas.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;e.preventDefault();const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;if(Math.hypot(e.clientX-pointer.startX,e.clientY-pointer.startY)>7)pointer.moved=true;pointer.x=e.clientX;pointer.y=e.clientY;if(!isLocked())onLook(dx,dy,e.pointerType);});
 function release(e,cancelled){if(!pointer||pointer.id!==e.pointerId)return;const tap=!cancelled&&!pointer.moved&&!pointer.held;const x=e.clientX,y=e.clientY;const type=pointer.type;if(type==='mouse'){clearTimeout(holdTimer);walking=false;indicator.style.display='none';}else stop();pointer=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(tap&&!isLocked())onTap(x,y,type,current(),activate);}
 canvas.addEventListener('pointerup',e=>release(e,false));canvas.addEventListener('pointercancel',e=>release(e,true));canvas.addEventListener('lostpointercapture',e=>{if(pointer?.id===e.pointerId){stop();pointer=null;}});canvas.addEventListener('contextmenu',e=>e.preventDefault());
 for(const event of ['blur','pagehide'])addEventListener(event,()=>{stop();pointer=null;});document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();pointer=null;}});document.addEventListener('focusin',e=>{if(e.target.matches('input,textarea,select,[contenteditable=true]'))stop();});
 function viewport(){document.documentElement.style.setProperty('--town-vh',(visualViewport?.height||innerHeight)+'px');}viewport();visualViewport?.addEventListener('resize',viewport);addEventListener('resize',()=>{viewport();signature='';});
 return {update,stop,get walking(){return walking&&!isLocked()},get running(){return running},get activeActions(){return current()},activate(id){const a=actions.get(id);return a?activate(a):false;},notify(message,duration=3500){toast.textContent=message;toast.style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.style.display='none',Math.max(3500,Math.min(20000,duration)));}};
}
