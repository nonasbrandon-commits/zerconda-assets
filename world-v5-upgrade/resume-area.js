export const RESUME_KEY='zerconda-last-safe-area-v1';
function browserStorage(){try{return globalThis.localStorage;}catch{return null;}}
const defaults={x:34,z:34,yaw:0,pitch:0};
export function readSavedArea(storage=browserStorage()){try{const p=JSON.parse(storage?.getItem(RESUME_KEY));if(!p||p.version!==1||![p.x,p.z,p.yaw,p.pitch].every(Number.isFinite)||p.x< -719||p.x>617||p.z< -1397||p.z>1200)return null;return{x:p.x,z:p.z,yaw:Math.atan2(Math.sin(p.yaw),Math.cos(p.yaw)),pitch:Math.max(-1.25,Math.min(1.25,p.pitch))};}catch{return null;}}
export function findResumePoint(saved,isSafe,fallback=defaults){if(saved){if(isSafe(saved.x,saved.z))return{...saved};for(const radius of[.6,1.2,2.4,4,7,12,20])for(let i=0;i<16;i++){const a=i*Math.PI/8,x=saved.x+Math.cos(a)*radius,z=saved.z+Math.sin(a)*radius;if(isSafe(x,z))return{...saved,x,z};}}return{...fallback};}
export function createAreaResume({getPose,isSafe,canSave=()=>true,applyPose,storage=browserStorage(),now=()=>performance.now(),events=globalThis}={}){
 let last=readSavedArea(storage),lastWrite=-Infinity,lastCheck=-Infinity;
 function save(force=false){const t=now();if(!force&&t-lastCheck<1000)return false;lastCheck=t;if(!canSave())return false;const p=getPose();if(![p.x,p.z,p.yaw,p.pitch].every(Number.isFinite)||!isSafe(p.x,p.z))return false;if(!force&&last&&Math.hypot(p.x-last.x,p.z-last.z)<.3&&Math.abs(p.yaw-last.yaw)<.04&&Math.abs(p.pitch-last.pitch)<.04)return false;if(!storage?.setItem)return false;try{const record={version:1,...p,savedAt:Date.now()};storage?.setItem(RESUME_KEY,JSON.stringify(record));last={...p};lastWrite=t;return true;}catch{return false;}}
 function restore(){const pose=findResumePoint(last,isSafe);applyPose(pose);last={...pose};return pose;}
 const flush=()=>save(true),visibility=()=>{if(events.document?.visibilityState==='hidden')flush();};events.addEventListener?.('pagehide',flush);events.document?.addEventListener?.('visibilitychange',visibility);
 return{restore,save,get last(){return last&&{...last}},get lastWrite(){return lastWrite},dispose(){events.removeEventListener?.('pagehide',flush);events.document?.removeEventListener?.('visibilitychange',visibility);}};
}
// Yield after a small work budget, rather than imposing a delay on every prop.
export function createSceneryYield({moving=()=>false,now=()=>performance.now(),raf=cb=>requestAnimationFrame(cb)}={}){let last=now();return async()=>{if(now()-last<(moving()?4:8))return;await new Promise(r=>raf(()=>setTimeout(r,0)));last=now();};}
