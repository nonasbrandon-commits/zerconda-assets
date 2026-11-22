// Stationed guards use a small dedicated queue, independent of ambient crowds and movement.
const pending=[];let scheduled=false;function next(){scheduled=false;const task=pending.shift();if(!task)return;try{task.resolve(task.work());}catch(error){task.reject(error);}if(pending.length){scheduled=true;requestAnimationFrame(next);}}
export function scheduleNpcSetup(work){return new Promise((resolve,reject)=>{pending.push({work,resolve,reject});if(!scheduled){scheduled=true;requestAnimationFrame(next);}});}
