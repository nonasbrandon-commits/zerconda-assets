// Canvas roundRect compatibility for browsers predating native rounded paths.
(function(){
 function roundRect(x,y,w,h,radii=0){
  x=Number(x);y=Number(y);w=Number(w);h=Number(h);
  const list=typeof radii==='object'&&radii!==null&&typeof radii[Symbol.iterator]==='function'?Array.from(radii):[radii];
  if(list.length<1||list.length>4)throw new RangeError('roundRect requires one to four radii');
  const r=list.map(v=>typeof v==='object'&&v!==null?{x:Number(v.x??0),y:Number(v.y??0)}:{x:Number(v),y:Number(v)});
  if(r.some(v=>v.x<0||v.y<0))throw new RangeError('roundRect radii must be nonnegative');
  if(![x,y,w,h,...r.flatMap(v=>[v.x,v.y])].every(Number.isFinite))return;
  let [tl,tr,br,bl]=r.length===1?[r[0],r[0],r[0],r[0]]:r.length===2?[r[0],r[1],r[0],r[1]]:r.length===3?[r[0],r[1],r[2],r[1]]:r;
  if(w<0){x+=w;w=-w;[tl,tr,br,bl]=[tr,tl,bl,br];}
  if(h<0){y+=h;h=-h;[tl,tr,br,bl]=[bl,br,tr,tl];}
  const ratio=(a,b)=>b?a/b:Infinity;const scale=Math.min(1,ratio(w,tl.x+tr.x),ratio(w,bl.x+br.x),ratio(h,tl.y+bl.y),ratio(h,tr.y+br.y));
  [tl,tr,br,bl]=[tl,tr,br,bl].map(v=>({x:v.x*scale,y:v.y*scale}));
  const corner=(cx,cy,r,a,b,ex,ey)=>{if(r.x&&r.y)this.ellipse(cx,cy,r.x,r.y,0,a,b);else this.lineTo(ex,ey);};
  this.moveTo(x+tl.x,y);this.lineTo(x+w-tr.x,y);corner(x+w-tr.x,y+tr.y,tr,-Math.PI/2,0,x+w,y);
  this.lineTo(x+w,y+h-br.y);corner(x+w-br.x,y+h-br.y,br,0,Math.PI/2,x+w,y+h);
  this.lineTo(x+bl.x,y+h);corner(x+bl.x,y+h-bl.y,bl,Math.PI/2,Math.PI,x,y+h);
  this.lineTo(x,y+tl.y);corner(x+tl.x,y+tl.y,tl,Math.PI,Math.PI*1.5,x,y);this.closePath();this.moveTo(x,y);
 }
 for(const name of['CanvasRenderingContext2D','OffscreenCanvasRenderingContext2D','Path2D']){
  const proto=globalThis[name]?.prototype;
  if(proto&&!proto.roundRect&&proto.ellipse)Object.defineProperty(proto,'roundRect',{value:roundRect,writable:true,configurable:true});
 }
})();
