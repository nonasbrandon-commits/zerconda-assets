const common={left:'Move',right:'Look',lt:'Run',rt:'—',a:'Nearby action',b:'Back',x:'Sit / stand',y:'Enter / exit vehicle'};
const modes={
 weapons:{rt:'Fire',x:'Reload'},tag:{rt:'Swing bopper',x:'Swing bopper',b:'Return bopper'},
 driving:{left:'Steer',lt:'Reverse',rt:'Accelerate',a:'—',b:'Exit vehicle',x:'Brake',y:'Exit vehicle'},
 'military-driving':{left:'Move / steer',lt:'Reverse',rt:'Forward',a:'—',b:'—',x:'Brake',y:'Park / exit'},
 boat:{left:'Steer / throttle',lt:'Reverse',rt:'Forward',a:'—',b:'Dock / step off',x:'—',y:'—'},
 scooter:{left:'Move / steer',lt:'Reverse',rt:'Forward',a:'—',b:'End ride',x:'—',y:'—'},
 skate:{left:'Move / steer',lt:'—',rt:'Push',a:'Ollie',b:'End ride',x:'—',y:'—'},
 tennis:{left:'Move',right:'—',lt:'—',rt:'Serve / swing',a:'Serve / swing',b:'Back',x:'—',y:'—'},
 helicopter:{left:'Speed / turn',right:'—',lt:'—',rt:'—',a:'Climb',b:'Descend',x:'Slow',y:'End flight'},
 plane:{left:'Speed / turn',right:'—',lt:'—',rt:'—',a:'Climb once moving',b:'Descend',x:'Slow',y:'End flight'},
 cab:{left:'—',lt:'—',rt:'—',a:'Nearby action',b:'Get out',x:'—',y:'—'},
 passenger:{lt:'—',rt:'—',a:'Cabin action',b:'Leave aircraft',x:'—',y:'—'},
 game:{left:'Navigate',right:'Scroll panel',lt:'—',rt:'—',a:'Confirm',b:'Back',x:'—',y:'—'}
};
export function controllerDiagram(mode='walking'){
 const m={...common,...modes[mode]},root=document.createElement('section');root.className='controller-guide';
 const h=document.createElement('h3');h.textContent='Controller button guide';root.append(h);
 const note=document.createElement('p');note.textContent='Xbox / PlayStation · USB or Bluetooth. Press a controller button to connect.';root.append(note);
 const image=document.createElement('div');image.innerHTML=`<svg viewBox="0 0 600 265" role="img" aria-label="Controller layout: shoulder buttons and triggers at top, left stick and directional pad on left, right stick and four action buttons on right, View and Menu in centre" style="display:block;width:100%;max-width:560px;margin:12px auto"><g fill="#233e51" stroke="#9bb8c8" stroke-width="3"><path d="M142 46 Q102 42 82 84 L35 218 Q31 254 65 251 Q83 249 119 205 L180 169 H420 L481 205 Q517 249 535 251 Q569 254 565 218 L518 84 Q498 42 458 46Z"/><rect x="117" y="12" width="100" height="29" rx="10"/><rect x="383" y="12" width="100" height="29" rx="10"/><circle cx="166" cy="106" r="34"/><circle cx="373" cy="172" r="30"/><circle cx="463" cy="108" r="48"/><path d="M219 145 H239 V165 H259 V185 H239 V205 H219 V185 H199 V165 H219Z"/><rect x="269" y="92" width="22" height="16" rx="3"/><rect x="309" y="92" width="22" height="16" rx="3"/></g><g fill="#f4f8fc" font-family="system-ui" font-size="14" text-anchor="middle"><text x="167" y="32">LT / L2</text><text x="433" y="32">RT / R2</text><text x="167" y="65">LB / L1</text><text x="433" y="65">RB / R1</text><text x="166" y="111">L stick</text><text x="373" y="177">R stick</text><text x="463" y="88" fill="#ffde73">Y / △</text><text x="430" y="113" fill="#9fd4ff">X / □</text><text x="496" y="113" fill="#ffaaa8">B / ○</text><text x="463" y="140" fill="#aff3b8">A / ✕</text><text x="280" y="132" font-size="11">View</text><text x="320" y="147" font-size="11">Menu</text></g></svg>`;root.append(image);
 const list=document.createElement('dl');list.style.cssText='display:grid;grid-template-columns:minmax(115px,0.8fr) 1.6fr;gap:5px 12px;margin:8px 0;font-size:13px';
 const entries=[['Left stick',m.left],['Right stick',m.right],['LT / L2',m.lt],['RT / R2',m.rt],['A / ✕ Cross',m.a],['B / ○ Circle',m.b],['X / □ Square',m.x],['Y / △ Triangle',m.y],['D-pad',mode==='game'?'Navigate / adjust':'Select nearby action ↑ / ↓'],['LB / L1 · RB / R1','Previous / next control in menus'],['View / Create / Share','Open Controls'],['Menu / Options','Open player menu']];
 for(const [key,value]of entries){if(value==='—')continue;const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dt.style.fontWeight='700';dd.textContent=value;dd.style.margin='0';list.append(dt,dd);}root.append(list);return root;
}
