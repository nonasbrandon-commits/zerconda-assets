// Right-button drag is a steering wheel; ordinary left-button look stays with town controls.
export function createMouseVehicleSteering({canvas,getVehicle,isLocked=()=>false}={}){
 let pointer=null,vehicle=null,originX=0,steering=0;
 function reset(){const id=pointer;pointer=null;vehicle=null;steering=0;if(id!==null&&canvas.hasPointerCapture?.(id))try{canvas.releasePointerCapture(id);}catch{}}
 function valid(){return pointer!==null&&getVehicle()===vehicle&&!isLocked();}
 canvas.addEventListener('pointerdown',e=>{if(pointer!==null&&e.button===0){e.preventDefault();e.stopImmediatePropagation();return;}if(e.button!==2||e.pointerType==='touch'||!getVehicle()||isLocked())return;e.preventDefault();e.stopImmediatePropagation();canvas.dispatchEvent(new PointerEvent('pointercancel',{pointerId:e.pointerId,pointerType:'mouse',bubbles:false}));reset();pointer=e.pointerId;vehicle=getVehicle();originX=e.clientX;steering=0;canvas.setPointerCapture(e.pointerId);},true);
 canvas.addEventListener('pointermove',e=>{if(pointer===null||e.pointerId!==pointer)return;if(!valid()||!(e.buttons&2)){reset();return;}e.preventDefault();e.stopImmediatePropagation();steering=Math.max(-1,Math.min(1,(e.clientX-originX)/110));},true);
 addEventListener('pointerup',e=>{if(pointer===null||e.pointerId!==pointer||e.button!==2)return;e.preventDefault();e.stopImmediatePropagation();reset();},true);
 canvas.addEventListener('pointercancel',e=>{if(e.pointerId===pointer)reset();},true);
 canvas.addEventListener('lostpointercapture',e=>{if(e.pointerId===pointer)reset();},true);
 canvas.addEventListener('contextmenu',e=>{if(getVehicle())e.preventDefault();});
 addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 return{reset,get active(){if(pointer!==null&&!valid())reset();return pointer!==null;},get steer(){if(pointer!==null&&!valid())reset();return steering;}};
}
