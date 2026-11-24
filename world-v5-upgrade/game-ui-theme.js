// Shared presentation for current and dynamically created game interfaces.
const style=document.createElement('style');style.id='zerconda-game-ui-theme';style.textContent=`
:root{--z-ink:#07131e;--z-blue:#00baff;--z-silver:#ccd8e2}
.z-game-panel{background:radial-gradient(ellipse at 50% 0%,#16436488,transparent 65%),repeating-linear-gradient(135deg,#ffffff03 0 1px,transparent 1px 4px),linear-gradient(145deg,#132635,#030b12 80%)!important;color:#f4f8ff!important;border:2px solid #b7c9d8!important;border-radius:18px!important;box-shadow:inset 0 0 0 2px #182a39,inset 0 0 0 4px #647d91,inset 0 0 20px #008acc38,0 0 0 2px #07111d,0 0 0 3px #748a9b,0 0 14px #00adff77,0 8px 24px #0009!important;text-shadow:0 1px 2px #000;scrollbar-color:#557c96 #081520;scrollbar-width:thin;}
.z-game-panel h1,.z-game-panel h2,.z-game-panel h3{color:#f2f7ff!important;font-weight:800!important;letter-spacing:.025em;text-shadow:0 2px 2px #000,0 0 12px #22b9ff55;}
.z-game-panel h2{padding-bottom:12px;border-bottom:1px solid #3bc9ff;box-shadow:0 4px 7px -6px #00baff;margin-top:6px!important}
.z-game-panel p,.z-game-panel label{line-height:1.45;color:#e7f0fa!important}
.z-game-panel button:not([data-square]),.z-game-control{background:linear-gradient(#24465f 0%,#102b40 48%,#061725 52%,#102e44)!important;color:#f5f9ff!important;border:1px solid #9abbd2!important;border-radius:9px!important;box-shadow:inset 0 1px 2px #fff7,inset 0 -2px 4px #008cd477,0 2px 4px #0007!important;font-weight:700!important;text-shadow:0 1px 2px #000;cursor:pointer;transition:box-shadow .15s,border-color .15s;}
.z-game-panel button:not([data-square]):hover,.z-game-control:hover{border-color:#85e5ff!important;box-shadow:inset 0 0 8px #00a6ff77,0 0 8px #00baff99!important}
.z-game-panel button:not([data-square]):active,.z-game-control:active{background:linear-gradient(#00406b,#007db3)!important}
.z-game-panel button[aria-pressed="true"]:not([data-square]),.z-game-panel button[aria-selected="true"]{border-color:#74e8ff!important;background:linear-gradient(#168ec4,#023a66)!important;box-shadow:inset 0 0 7px #02caff,0 0 6px #00baff!important}
.z-game-panel button:disabled{opacity:.45;cursor:default;box-shadow:none!important}
.z-game-panel select{appearance:auto;background:linear-gradient(#f4f7fa,#b7c4d0)!important;color:#0a1b2c!important;border:1px solid #b3c6d7!important;border-radius:8px!important;box-shadow:inset 0 1px 2px #ffffff55,0 2px 4px #0008!important;padding-right:24px!important;min-height:40px;font-weight:650!important;color-scheme:light;text-shadow:none;}
.z-game-panel option{background:#0e2334!important;color:#fff!important}
.z-game-panel input:not([type=range]):not([type=color]):not([type=checkbox]):not([type=radio]),.z-game-panel textarea{background:#e7eef4!important;color:#101f2e!important;border:1px solid #7db7d9!important;border-radius:6px!important;text-shadow:none;}
.z-game-panel :is(button,select,input,textarea):focus-visible,.z-game-control:focus-visible{outline:3px solid #6ce4ff!important;outline-offset:3px}
#town-gesture-help{padding:12px 22px 12px 66px!important;min-height:24px;font-weight:700!important;border-radius:18px!important;max-width:calc(100vw - 30px)!important;box-sizing:border-box;white-space:normal!important;}
#town-gesture-help::before{content:'';position:absolute;left:18px;top:50%;transform:translateY(-50%) rotate(-22deg);width:27px;height:38px;border:2px solid #c0d8e6;border-radius:15px;background:linear-gradient(90deg,#95aaba,#f8fcff 45%,#a6bac9);box-shadow:0 0 8px #00baff99,inset -3px -4px 5px #163c5c66;}
#town-gesture-help::after{content:'';position:absolute;left:30px;top:calc(50% - 13px);width:4px;height:10px;border-radius:4px;background:#007dc0;border:1px solid #e4f6ff;transform:rotate(-22deg);}
#zerconda-v5-map{padding:12px!important}#zerconda-v5-map canvas{border:1px solid #b8d5e5!important;box-shadow:0 0 6px #00aeff77;border-radius:10px!important}
#zerconda-v5-map strong{color:#e6f7ff;letter-spacing:.05em;text-shadow:0 0 8px #00baff}
#zerconda-v5-map button{min-height:32px!important}#zerconda-v5-map>div:last-child{color:#e0ebf4!important}
.z-game-panel [data-square]{text-shadow:none}.z-game-panel [data-square]:focus-visible{outline-offset:-3px!important}
@media(max-width:600px){.z-game-panel{border-radius:12px!important;box-shadow:inset 0 0 0 2px #52718a,0 0 8px #00aaff66,0 5px 12px #0008!important}.z-game-panel h2{font-size:1.25rem!important}.z-game-panel button:not([data-square]){min-height:40px}}
@media(prefers-reduced-motion:reduce){.z-game-panel button,.z-game-control{transition:none!important}}
`;document.head.append(style);
function mark(el){if(!(el instanceof HTMLElement)||el.matches('canvas,script,style,#boot-status,#mobile'))return;const cs=getComputedStyle(el);if(cs.position==='fixed'){
 const full=el.style.inset==='0px'||el.style.inset==='0';
 if(!full&& !el.matches('button,input,select'))el.classList.add('z-game-panel');
 if(el.matches('button'))el.classList.add('z-game-control');
 if(full){for(const child of el.children)if(child instanceof HTMLElement&&child.matches('section,article,div')&&!child.matches('[hidden]')&&getComputedStyle(child).backgroundColor!=='rgba(0, 0, 0, 0)')child.classList.add('z-game-panel');}
 }if(el.matches('[role="dialog"],dialog,.loading-card'))el.classList.add('z-game-panel');}
function scan(node){if(!(node instanceof HTMLElement))return;mark(node);for(const e of node.querySelectorAll('[style*="fixed"],[role="dialog"],dialog,.loading-card'))mark(e);}
scan(document.body);const observer=new MutationObserver(records=>{for(const r of records){if(r.type==='childList')for(const n of r.addedNodes)scan(n);else if(r.target instanceof HTMLElement)mark(r.target);}});observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});
