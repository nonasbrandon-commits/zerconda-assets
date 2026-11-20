import * as THREE from 'three';
const texture=new THREE.TextureLoader().load(new URL('./assets/pier-rental-attendants-v159.png',import.meta.url).href);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;
export function addRentalAttendant(kiosk){
 // Only the upper body is visible above the counter. Fixed in the hut, never a camera-facing billboard.
 const height=2.25,base=.13,bottom=1.31,top=base+height,width=height*.75;
 const geometry=new THREE.PlaneGeometry(width,top-bottom),uv=geometry.attributes.uv,half=kiosk.kind==='fishing'?0:.5;
 for(let i=0;i<uv.count;i++)uv.setXY(i,half+uv.getX(i)*.5,(bottom-base)/height+uv.getY(i)*(top-bottom)/height);
 const person=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.18,side:THREE.FrontSide,toneMapped:false}));
 person.name=kiosk.kind==='fishing'?'Fishing pole attendant':'Boat rental attendant';person.position.set(-.25,(top+bottom)/2,3.455);person.userData.referenceAsset='assets/pier-rental-attendants-v159.png';kiosk.root.add(person);return person;
}
export function createRentalConversation({getPlayer,canInteract,desks,onYes}){
 const panel=document.createElement('section');panel.id='pier-rental-conversation';panel.setAttribute('role','region');panel.setAttribute('aria-label','Pier rental attendant');panel.style.cssText='display:none;position:fixed;left:50%;bottom:72px;transform:translateX(-50%);z-index:17000;box-sizing:border-box;width:min(390px,calc(100vw - 28px));padding:18px;background:#17373af5;color:#fff8e6;border:1px solid #c5be91;border-radius:14px;box-shadow:0 6px 24px #0005;font:16px system-ui';
 const title=document.createElement('strong'),message=document.createElement('p'),row=document.createElement('div');message.setAttribute('aria-live','polite');message.style.cssText='line-height:1.45;margin:10px 0 16px';row.style.cssText='display:flex;gap:12px';panel.append(title,message,row);
 let current=null,inside=new Set(),lastSpeech=null;
 function hide(){panel.style.display='none';current=null;if(lastSpeech&&globalThis.speechSynthesis){speechSynthesis.cancel();lastSpeech=null;}}
 function speak(text,kind){if(!globalThis.speechSynthesis||!globalThis.SpeechSynthesisUtterance)return;try{if(speechSynthesis.speaking)return;const utterance=new SpeechSynthesisUtterance(text);utterance.rate=.94;utterance.pitch=kind==='boat'?1.12:.93;const voices=speechSynthesis.getVoices().filter(v=>v.lang.startsWith('en'));const preferred=voices.find(v=>kind==='boat'?/female|samantha|zira|jenny/i.test(v.name):/male|david|daniel|guy/i.test(v.name));if(preferred)utterance.voice=preferred;lastSpeech=utterance;speechSynthesis.speak(utterance);}catch{}}
 function show(kind){if(!canInteract())return;current=kind;inside.add(kind);title.textContent=kind==='boat'?'Boat Rental':'Fishing Poles';message.textContent=kind==='boat'?'Hi Hun, Would you like to rent a boat?':'Would you like to rent a fishing pole?';panel.style.display='block';speak(message.textContent,kind);}
 for(const [label,yes]of [['Yes',true],['No',false]]){const button=document.createElement('button');button.textContent=label;button.type='button';button.style.cssText='flex:1;min-height:46px;border:0;border-radius:8px;background:#d8e4c9;color:#183735;font:600 16px system-ui;cursor:pointer';button.onclick=()=>{const kind=current;hide();if(yes&&kind&&canInteract())onYes(kind);};row.appendChild(button);}
 for(const event of ['pointerdown','pointerup','click','keydown','keyup','wheel'])panel.addEventListener(event,e=>{e.stopPropagation();if(event==='keydown'&&e.key==='Escape'){e.preventDefault();hide();}});
 document.body.appendChild(panel);
 return {panel,show,hide,get active(){return current;},update(){const p=getPlayer(),allowed=canInteract();for(const[kind,desk]of Object.entries(desks)){const distance=Math.hypot(p.x-desk.x,p.z-desk.z);if(distance>6)inside.delete(kind);if(current===kind&&(!allowed||distance>5.6))hide();}if(!allowed)return;for(const[kind,desk]of Object.entries(desks))if(!current&&!inside.has(kind)&&Math.hypot(p.x-desk.x,p.z-desk.z)<4.8){show(kind);break;}},reset(){hide();inside.clear();}};
}
