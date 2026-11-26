export function createMobileHud({getMode=()=> 'walking'}={}){
 const media=matchMedia('(pointer:coarse)'),style=document.createElement('style');style.id='mobile-compact-hud';style.textContent=`
 @media(pointer:coarse){
 body #town-area-travel#town-area-travel{position:fixed!important;top:max(8px,env(safe-area-inset-top))!important;left:8px!important;right:8px!important;width:calc(100vw - 16px)!important;max-width:none!important;min-height:0!important;height:auto!important;display:flex!important;flex-wrap:nowrap!important;align-items:center!important;gap:5px!important;padding:5px!important;box-sizing:border-box!important;border-radius:12px!important}
 body #town-area-travel#town-area-travel>div{padding:0!important;margin:0!important;background:transparent!important;border:0!important;box-shadow:none!important;min-width:0!important;min-height:0!important;height:auto!important}
 body #town-area-travel#town-area-travel label{display:none!important}
 body #town-area-travel#town-area-travel>.travel-column{flex:1!important;width:auto!important}
 body #town-area-travel#town-area-travel>.menu-column{width:88px!important;flex:0 0 88px!important}
 body #town-area-travel#town-area-travel>.hand-column{width:112px!important;flex:0 0 112px!important;display:block!important}
 body #town-area-travel#town-area-travel button,body #town-area-travel#town-area-travel select{min-height:44px!important;height:44px!important;min-width:0!important;width:100%!important;margin:0!important;padding:6px!important;font-size:12px!important;letter-spacing:normal!important;box-sizing:border-box!important}
 body #z-player-panel#z-player-panel{top:72px!important;max-height:calc(100dvh - 84px)!important}
 body #vehicle-controls#vehicle-controls{left:8px!important;bottom:max(8px,env(safe-area-inset-bottom))!important;width:214px!important;padding:7px!important;box-sizing:border-box!important;border-radius:12px!important}
 body #vehicle-controls#vehicle-controls>p{display:none!important}
 body #vehicle-controls#vehicle-controls .pedals{grid-template-columns:48px 86px 48px!important;gap:4px!important}
 body #vehicle-controls#vehicle-controls .pedals button{min-height:44px!important;height:44px!important;min-width:44px!important;padding:4px!important;font-size:13px!important}
 body #vehicle-controls#vehicle-controls .exit-car{display:inline-block!important;width:calc(50% - 3px)!important;min-height:44px!important;height:44px!important;padding:3px!important;margin:5px 0 0!important;font-size:11px!important;vertical-align:top!important;box-sizing:border-box!important}
 body #vehicle-controls#vehicle-controls .exit-car:last-child{margin-left:6px!important}
 body #vehicle-horn#vehicle-horn{right:8px!important;bottom:max(8px,env(safe-area-inset-bottom))!important;min-height:48px!important;min-width:76px!important;padding:8px!important;font-size:13px!important;border-radius:12px!important}
 body.mobile-driving-hud #town-area-travel#town-area-travel{left:auto!important;width:110px!important}
 body.mobile-driving-hud #town-area-travel#town-area-travel>.travel-column,body.mobile-driving-hud #town-area-travel#town-area-travel>.hand-column,body.mobile-driving-hud #town-actions#town-actions,body.mobile-driving-hud #town-gesture-help#town-gesture-help,body.mobile-driving-hud #world-controls-button#world-controls-button,body.mobile-driving-hud #controller-status-chip#controller-status-chip{display:none!important}
 body.mobile-driving-hud #town-area-travel#town-area-travel>.menu-column{flex:1!important;width:auto!important}
 }
 `;document.head.append(style);let last=null;
 function update(){const mobile=media.matches,driving=mobile&&getMode()==='driving';if(driving!==last){last=driving;document.body.classList.toggle('mobile-driving-hud',driving);}const horn=document.getElementById('vehicle-horn');if(horn){const label=mobile?'Horn':'H · Horn';if(horn.textContent!==label)horn.textContent=label;}const hand=document.getElementById('z-held-item');if(hand){const option=[...hand.options].find(o=>!o.value);if(option&&/^(Nothing in hand|Hand: empty)$/.test(option.textContent))option.textContent=mobile?'Hand: empty':'Nothing in hand';}}
 update();return{update,dispose(){style.remove();document.body.classList.remove('mobile-driving-hud');}};
}
