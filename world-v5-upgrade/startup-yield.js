let lastYield=performance.now();
export async function yieldStartup(){if(performance.now()-lastYield<8)return;globalThis.zercondaCompactStartup?.();await new Promise(resolve=>setTimeout(resolve,0));lastYield=performance.now();}
