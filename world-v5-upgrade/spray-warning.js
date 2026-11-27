// Hand-drawn spray strokes, rather than typeset letters. Deterministic paint texture.
export function createSprayWarning(){
 const canvas=document.createElement('canvas');canvas.width=1536;canvas.height=640;
 const mask=document.createElement('canvas');mask.width=1536;mask.height=640;
 const m=mask.getContext('2d'),a=canvas.getContext('2d');let seed=450;
 const rnd=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
 const glyphs={D:[[[.05,0],[.05,1]],[[.05,0],[.55,.02],[.87,.23],[.93,.56],[.7,.91],[.05,1]]],O:[[[.52,0],[.18,.06],[0,.42],[.09,.83],[.42,1],[.81,.91],[.96,.52],[.84,.14],[.52,0]]],N:[[[0,1],[.04,0],[.9,1],[.95,0]]],T:[[[0,.04],[1,0]],[[.52,.02],[.43,1]]],G:[[[.88,.17],[.61,0],[.21,.1],[0,.46],[.12,.88],[.52,1],[.9,.78],[.92,.5],[.55,.53]]],I:[[[.49,0],[.4,1]]],H:[[[.08,0],[0,1]],[[.92,0],[.84,1]],[[.04,.51],[.88,.45]]],E:[[[.95,0],[.08,.03],[0,1],[.91,.96]],[[.04,.5],[.75,.46]]],R:[[[.05,1],[.1,0],[.66,.02],[.93,.2],[.81,.47],[.08,.52]],[[.48,.5],[.96,1]]]};
 const lines=[{text:"DON'T GO",y:72},{text:'IN HERE!',y:345}];
 m.strokeStyle='#b51c20';m.fillStyle='#b51c20';m.lineCap='round';m.lineJoin='round';
 for(const row of lines){const widths=[...row.text].map(c=>c===' '?62:c==="'"?34:c==='I'?55:c==='!'?55:137),total=widths.reduce((s,v)=>s+v,0)+18*(widths.length-1);let x=(1536-total)/2;
  for(let i=0;i<row.text.length;i++){const ch=row.text[i],w=widths[i],h=170+rnd()*23;m.save();m.translate(x,row.y+(rnd()-.5)*17);m.transform(1,(rnd()-.5)*.11,-.08-rnd()*.10,1,0,0);m.lineWidth=27+rnd()*12;
   if(ch==="'"){m.beginPath();m.moveTo(18,0);m.lineTo(8,34);m.stroke();}
   else if(ch==='!'){m.beginPath();m.moveTo(35,0);m.lineTo(18,118);m.stroke();m.beginPath();m.arc(12,177,17,0,Math.PI*2);m.fill();}
   else for(const path of glyphs[ch]||[]){m.beginPath();path.forEach(([px,py],j)=>j?m.lineTo(px*w,py*h):m.moveTo(px*w,py*h));m.stroke();}
   m.restore();x+=w+18;
  }
 }
 const data=m.getImageData(0,0,1536,640).data;
 // Fine droplets follow actual stroke edges and include a wider, sparse spray halo.
 for(let i=0;i<72000;i++){const x=rnd()*1536|0,y=rnd()*640|0;if(data[(y*1536+x)*4+3]<170)continue;const angle=rnd()*Math.PI*2,r=5+Math.pow(rnd(),2)*28,px=x+Math.cos(angle)*r,py=y+Math.sin(angle)*r;if(px<0||py<0||px>=1536||py>=640)continue;if(data[((py|0)*1536+(px|0))*4+3]>100)continue;a.globalAlpha=.12+rnd()*.48;a.fillStyle='#ad1c20';a.beginPath();a.arc(px,py,.3+rnd()*1.05,0,Math.PI*2);a.fill();}
 a.globalAlpha=1;a.drawImage(mask,0,0);
 // Runs start at real painted bottom edges, with pooled rounded tips.
 for(let x=135;x<1400;x+=38+rnd()*55){let y=-1;const start=rnd()<.5?70:340,end=start+240;for(let yy=start;yy<Math.min(end,585);yy++)if(data[(yy*1536+(x|0))*4+3]>200)y=yy;if(y<0)continue;const len=13+rnd()*57,width=3+rnd()*5;a.strokeStyle='#b21b20';a.lineWidth=width;a.lineCap='round';a.beginPath();a.moveTo(x,y-5);a.bezierCurveTo(x+2,y+len*.3,x-3,y+len*.7,x-1,y+len);a.stroke();}
 // Tiny dry pores let the wall show through without turning letters into a stencil.
 a.globalCompositeOperation='destination-out';for(let i=0;i<7000;i++){a.globalAlpha=.08+rnd()*.24;a.fillRect(rnd()*1536,rnd()*640,.7+rnd()*1.9,.5+rnd()*1.4);}a.globalCompositeOperation='source-over';a.globalAlpha=1;
 return canvas;
}
