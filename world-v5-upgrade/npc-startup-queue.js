const pending=[];let running=false,ready=!globalThis.zercondaBooting;
function run(){if(running||!ready||!pending.length)return;running=true;const next=()=>{const task=pending.shift();if(!task){running=false;return;}try{task.resolve(task.work());}catch(e){task.reject(e);}setTimeout(next,60);};if(globalThis.requestIdleCallback)requestIdleCallback(next,{timeout:300});else setTimeout(next,0);}
addEventListener('zerconda-playable',()=>{ready=true;run();},{once:true});
export function scheduleNpcSetup(work){if(!globalThis.zercondaBooting)ready=true;return new Promise((resolve,reject)=>{pending.push({work,resolve,reject});run();});}
