// Let the browser paint and handle input between synchronous world-building tasks.
let lastYield=performance.now();
export async function yieldStartup(){if(performance.now()-lastYield<8)return;await new Promise(resolve=>setTimeout(resolve,0));lastYield=performance.now();}
