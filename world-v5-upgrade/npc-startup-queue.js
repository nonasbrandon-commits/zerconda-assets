const pending=[];let running=false,ready=!globalThis.zercondaBooting;
function schedule(next){if(globalThis.zercondaIsMoving?.()){setTimeout(()=>schedule(next),250);return;}if(globalThis.requestIdleCallback)requestIdleCallback(deadline=>{if(globalThis.zercondaIsMoving?.()||(!deadline.didTimeout&&deadline.timeRemaining()<8)){setTimeout(()=>schedule(next),100);return;}next();},{timeout:1500});else setTimeout(next,100);}
function run(){if(running||!ready||!pending.length)return;running=true;const next=()=>{if(globalThis.zercondaIsMoving?.()){schedule(next);return;}const task=pending.shift();if(!task){running=false;return;}try{task.resolve(task.work());}catch(e){task.reject(e);}schedule(next);};schedule(next);}
addEventListener('zerconda-playable',()=>{ready=true;run();},{once:true});
export function scheduleNpcSetup(work){if(!globalThis.zercondaBooting)ready=true;return new Promise((resolve,reject)=>{pending.push({work,resolve,reject});run();});}
