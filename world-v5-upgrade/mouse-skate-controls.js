// Desktop left-hold supplies pushes; shared drag-to-look supplies the board's heading.
export function createMouseSkateControls({canvas,isRiding,isLocked=()=>false}={}){
 let pointer=null;
 function reset(){pointer=null;}
 canvas.addEventListener('pointerdown',e=>{if(e.button!==0||e.pointerType!=='mouse'||!isRiding()||isLocked())return;pointer=e.pointerId;},true);
 addEventListener('pointerup',e=>{if(e.button!==0||e.pointerId!==pointer)return;const id=pointer;reset();canvas.dispatchEvent(new PointerEvent('pointercancel',{pointerId:id,pointerType:'mouse',bubbles:false}));},true);
 for(const event of['pointercancel','lostpointercapture'])canvas.addEventListener(event,e=>{if(e.pointerId===pointer)reset();},true);
 addEventListener('blur',reset);document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 return{reset,get pushing(){if(!isRiding()||isLocked())reset();return pointer!==null;}};
}
