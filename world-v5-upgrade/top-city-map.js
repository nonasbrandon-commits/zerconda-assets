// Top-center live Zerconda city map. Canvas overlay uses the same world coordinates as player movement.
export function createCityMap({player,beach={x:0,z:212}}){
 const shell=document.createElement('div');shell.style.cssText='position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:9997;background:rgba(12,27,40,.88);border:1px solid #7a9cb0;border-radius:12px;padding:6px 10px;color:white;box-shadow:0 4px 20px #0005;font:12px Arial;max-width:95vw';
 const heading=document.createElement('div');heading.textContent='ZERCONDA  •  CITY MAP';heading.style.cssText='font-weight:700;text-align:center;letter-spacing:1px;margin-bottom:3px';shell.appendChild(heading);
 const canvas=document.createElement('canvas');canvas.width=360;canvas.height=170;canvas.style.cssText='width:min(360px,85vw);height:auto;display:block;border-radius:6px';shell.appendChild(canvas);document.body.appendChild(shell);
 const ctx=canvas.getContext('2d');
 const scale=170/520,tx=x=>180+x*scale,tz=z=>26+(z+175)*scale;
 function label(x,z,name,color='#f7fafc'){ctx.fillStyle=color;ctx.font='bold 10px Arial';ctx.fillText(name,tx(x)+5,tz(z)-5);}
 function draw(){
  ctx.fillStyle='#284c3b';ctx.fillRect(0,0,360,170);
  ctx.fillStyle='#c9b287';ctx.fillRect(0,tz(175),360,170-tz(175));
  ctx.fillStyle='#187c9e';ctx.fillRect(0,tz(240),360,170-tz(240));
  ctx.strokeStyle='#737e83';ctx.lineWidth=7;
  for(const n of [-144,-48,48,144]){ctx.beginPath();ctx.moveTo(tx(n),tz(-175));ctx.lineTo(tx(n),tz(175));ctx.stroke();ctx.beginPath();ctx.moveTo(0,tz(n));ctx.lineTo(360,tz(n));ctx.stroke();}
  ctx.fillStyle='#b4c6d1';for(const [x,z,w,h] of [[-72,-48,24,28],[-34,-48,24,25]])ctx.fillRect(tx(x-w/2),tz(z-h/2),w*scale,h*scale);
  ctx.fillStyle='#3fbbe8';ctx.beginPath();ctx.arc(tx(48),tz(-48),6,0,Math.PI*2);ctx.fill();label(48,-48,'NEEDLE');
  ctx.fillStyle='#f5f6e9';ctx.beginPath();ctx.arc(tx(48),tz(48),6,0,Math.PI*2);ctx.fill();label(48,48,'PLAZA');
  label(-72,-48,'AUTO');label(-34,-48,'COFFEE');label(-20,212,'BEACH','#ffffff');
  ctx.fillStyle='#ffe36d';ctx.beginPath();ctx.arc(tx(player.x),tz(player.z),5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#13202b';ctx.lineWidth=2;ctx.stroke();
 }
 draw();return {draw,element:shell};
}
