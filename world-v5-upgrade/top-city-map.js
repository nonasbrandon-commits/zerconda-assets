// Top-center live Zerconda city map. Canvas overlay uses the same world coordinates as player movement.
export function createCityMap({player,beach={x:0,z:212}}){
 // Remove previous map instances if Airo accidentally loads both old and new map scripts.
 document.querySelectorAll('#zerconda-v5-map').forEach(node=>node.remove());
 const shell=document.createElement('div');shell.id='zerconda-v5-map';shell.style.cssText='position:fixed;top:52px;right:16px;left:auto;z-index:9997;background:rgba(12,27,40,.88);border:1px solid #7a9cb0;border-radius:12px;padding:6px 10px;color:white;box-shadow:0 4px 20px #0005;font:12px Arial;max-width:95vw';
 const heading=document.createElement('div');heading.textContent='ZERCONDA  •  CITY MAP';heading.style.cssText='font-weight:700;text-align:center;letter-spacing:1px;margin-bottom:3px';shell.appendChild(heading);
 const canvas=document.createElement('canvas');canvas.width=420;canvas.height=270;canvas.style.cssText='width:min(350px,48vw);height:auto;display:block;border-radius:6px';shell.appendChild(canvas);document.body.appendChild(shell);
 const ctx=canvas.getContext('2d');
 const legend=document.createElement('div');legend.textContent='🔵 YOU   ▰ PERIMETER WALL   🟠 FUTURE GATE (CLOSED)';legend.style.cssText='text-align:center;font-weight:bold;color:#9ce8ff;margin-top:4px;letter-spacing:.5px';shell.appendChild(legend);
 shell.style.pointerEvents='none';
 // Legacy top-left HUD can overlap the map if Airo kept the old markup.
 // Keep the HUD but move only the conflicting old map overlays out of view.
 for(const node of document.querySelectorAll('body > div, body > aside')){
  if(node===shell||node.contains(shell))continue;
  const id=(node.id||'').toLowerCase();
  if((id.includes('minimap')||id==='city-map'||id==='map-overlay')&&node!==shell)node.style.display='none';
 }

 let frame=0;
 const scale=420/846,tx=x=>(x+276)*scale,tz=z=>(z+285)*270/527;
 function label(x,z,name,color='#f7fafc'){ctx.fillStyle=color;ctx.font='bold 10px Arial';ctx.fillText(name,tx(x)+5,tz(z)-5);}
 function draw(){
  ctx.fillStyle='#284c3b';ctx.fillRect(0,0,420,270);
  ctx.fillStyle='#c9b287';ctx.fillRect(0,tz(175),420,270-tz(175));
  ctx.fillStyle='#187c9e';ctx.fillRect(0,tz(240),420,270-tz(240));
  ctx.strokeStyle='#737e83';ctx.lineWidth=7;
  for(const n of [-144,-48,48,144]){ctx.beginPath();ctx.moveTo(tx(n),tz(-175));ctx.lineTo(tx(n),tz(175));ctx.stroke();ctx.beginPath();ctx.moveTo(0,tz(n));ctx.lineTo(420,tz(n));ctx.stroke();}
  // Perimeter wall matches world bounds; mark the proposed eastern expansion
  // checkpoint as CLOSED until an actual gate and access logic are installed.
  ctx.strokeStyle='#b9bdb6';ctx.lineWidth=5;ctx.setLineDash([]);
  ctx.strokeRect(tx(-276)+2,tz(-285)+2,420-4,270-4);
  const gateX=tx(570)-3,gateY=tz(0);
  ctx.strokeStyle='#f5a23b';ctx.lineWidth=7;
  ctx.beginPath();ctx.moveTo(gateX,gateY-12);ctx.lineTo(gateX,gateY+12);ctx.stroke();
  ctx.fillStyle='#ffd08a';ctx.font='bold 11px Arial';ctx.textAlign='right';
  ctx.fillText('FUTURE GATE',gateX-9,gateY-5);
  ctx.fillText('CLOSED',gateX-9,gateY+9);ctx.textAlign='start';
  ctx.fillStyle='#b4c6d1';for(const [x,z,w,h] of [[-72,-48,24,28],[-34,-48,24,25]])ctx.fillRect(tx(x-w/2),tz(z-h/2),w*scale,h*270/527);
  ctx.fillStyle='#3fbbe8';ctx.beginPath();ctx.arc(tx(48),tz(-48),6,0,Math.PI*2);ctx.fill();label(48,-48,'NEEDLE');
  ctx.fillStyle='#f5f6e9';ctx.beginPath();ctx.arc(tx(48),tz(48),6,0,Math.PI*2);ctx.fill();label(48,48,'PLAZA');
  ctx.fillStyle='#81ac59';ctx.beginPath();ctx.ellipse(tx(425),tz(-48),57,32,0,0,Math.PI*2);ctx.fill();
  label(425,-48,'GOLF CLUB','#ffffff');
  ctx.fillStyle='#5cae5a';ctx.fillRect(tx(-20),tz(-190),136*scale,105*270/527);
  label(48,-139,'SPORTS PARK','#ffffff');
  label(245,-20,'HOMES','#ffffff');
  label(-72,-48,'AUTO');label(-34,-48,'COFFEE');label(-20,212,'BEACH','#ffffff');
  // Highly visible live player marker, drawn last so roads and labels never cover it.
  const px=tx(player.x),py=tz(player.z);frame++;
  const pulse=8+3*Math.sin(frame*.08);
  ctx.beginPath();ctx.arc(px,py,pulse,0,Math.PI*2);ctx.fillStyle='rgba(0,183,255,.2)';ctx.fill();
  ctx.beginPath();ctx.arc(px,py,6,0,Math.PI*2);ctx.fillStyle='#00baff';ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle='#ffffff';ctx.stroke();
  ctx.fillStyle='#ffffff';ctx.font='bold 10px Arial';ctx.textAlign='center';ctx.fillText('YOU',px,py-13);ctx.textAlign='start';
 }
 draw();return {draw,element:shell};
}
