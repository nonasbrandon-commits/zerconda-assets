// Symmetric proximity with hysteresis: open before collision and stay open in the passage.
// An optional existing access check is requested once per approach, never bypassed.
export function updateAutomaticSlide(door,{along,across,enabled=true,unlock=null}){
 const near=enabled&&Math.abs(across)<1.65&&Math.abs(along)<(door.width||1.3)/2+.45;
 const clear=!enabled||Math.abs(across)>2.15||Math.abs(along)>(door.width||1.3)/2+.85;
 if(clear){door.autoRequested=false;door.autoPermit=false;if(!(door.passageHold>0))door.open=false;return;}
 if(!near)return;
 if(unlock&&!door.autoPermit){if(door.autoRequested)return;door.autoRequested=true;const approve=()=>{if(door.autoRequested){door.autoPermit=true;door.open=true;}};if(unlock(approve))approve();return;}
 door.open=true;
}
