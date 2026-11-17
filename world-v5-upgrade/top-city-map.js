// Top-center live Zerconda city map. Canvas overlay uses the same world coordinates as player movement.
export function createCityMap({player,beach={x:0,z:212}}){
 // Remove previous map instances if Airo accidentally loads both old and new map scripts.
 document.querySelectorAll('#zerconda-v5-map').forEach(node=>node.remove());
 const shell=document.createElement('div');shell.id='zerconda-v5-map';shell.style.cssText='position:fixed;top:52px;right:16px;left:auto;z-index:9997;background:rgba(12,27,40,.88);border:1px solid #7a9cb0;border-radius:12px;padding:6px 10px;color:white;box-shadow:0 4px 20px #0005;font:12px Arial;max-width:95vw';
 const heading=document.createElement('div');heading.textContent='ZERCONDA  •  CITY MAP';heading.style.cssText='font-weight:700;text-align:center;letter-spacing:1px;margin-bottom:3px';shell.appendChild(heading);
 const canvas=document.createElement('canvas');canvas.width=420;canvas.height=270;canvas.style.cssText='width:min(350px,48vw);height:auto;display:block;border-radius:6px';shell.appendChild(canvas);document.body.appendChild(shell);
 const ctx=canvas.getContext('2d');
 const legend=document.createElement('div');legend.textContent='🔵 YOU   ▰ PERIMETER WALL   🟠 POLICE GATE · CLOSED';legend.style.cssText='text-align:center;font-weight:bold;color:#9ce8ff;margin-top:4px;letter-spacing:.5px';shell.appendChild(legend);
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
  const atSea=player.z>238&&player.z<950&&Math.abs(player.x)<230,title=atSea?'ZERCONDA • PIER & OCEAN':'ZERCONDA • CITY MAP';if(heading.textContent!==title)heading.textContent=title;const legendText=atSea?'YOU · PIER · BUOY BOUNDARY':'🔵 YOU   ▰ PERIMETER WALL   🟠 POLICE GATE · CLOSED';if(legend.textContent!==legendText)legend.textContent=legendText;
  if(atSea){
   ctx.clearRect(0,0,420,270);const gradient=ctx.createLinearGradient(0,0,0,270);gradient.addColorStop(0,'#409f9e');gradient.addColorStop(1,'#134e6b');ctx.fillStyle=gradient;ctx.fillRect(0,0,420,270);
   const sx=x=>(x+230)*420/460,sz=z=>(z-220)*270/720;
   ctx.fillStyle='#ccb58c';ctx.fillRect(0,0,420,sz(240));ctx.fillStyle='#ae9672';ctx.fillRect(sx(-7),sz(238),14*420/460,(382-238)*270/720);ctx.fillRect(sx(-22),sz(374),44*420/460,26*270/720);ctx.fillRect(sx(-24),sz(242),18*420/460,32*270/720);ctx.fillRect(sx(-30),sz(286),12*420/460,20*270/720);
   ctx.strokeStyle='#d2c3a6';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(sx(-13),sz(272));ctx.lineTo(sx(-23),sz(288));ctx.stroke();
   ctx.fillStyle='#fff2ce';ctx.font='bold 10px Arial';ctx.fillText('PIER · FREE BOATS & FISHING',sx(14),sz(310));ctx.fillText('BOATING AREA',sx(-75),sz(650));
   ctx.strokeStyle='#e7c38b';ctx.setLineDash([3,7]);ctx.strokeRect(sx(-210),sz(270),420*420/460,645*270/720);ctx.setLineDash([]);
   ctx.fillStyle='#00baff';ctx.beginPath();ctx.arc(sx(player.x),sz(player.z),6,0,Math.PI*2);ctx.fill();ctx.strokeStyle='white';ctx.lineWidth=2;ctx.stroke();
   return;
  }

  ctx.fillStyle='#284c3b';ctx.fillRect(0,0,420,270);
  ctx.fillStyle='#c9b287';ctx.fillRect(0,tz(175),420,270-tz(175));
  ctx.fillStyle='#187c9e';ctx.fillRect(0,tz(240),420,270-tz(240));
  ctx.strokeStyle='#737e83';ctx.lineWidth=7;
  for(const n of [-96,0,96]){ctx.beginPath();ctx.moveTo(tx(n),tz(-175));ctx.lineTo(tx(n),tz(175));ctx.stroke();ctx.beginPath();ctx.moveTo(0,tz(n));ctx.lineTo(420,tz(n));ctx.stroke();}
  // Security gate matches the relocated entrance on the z=0 city street.
  ctx.strokeStyle='#b9bdb6';ctx.lineWidth=5;ctx.setLineDash([]);
  ctx.beginPath();ctx.moveTo(tx(-276),tz(174));ctx.lineTo(tx(-276),tz(-285));ctx.lineTo(tx(570),tz(-285));ctx.lineTo(tx(570),tz(174));ctx.stroke();
  ctx.fillStyle='#9de0e8';ctx.font='bold 11px Arial';ctx.textAlign='center';ctx.fillText('OPEN BEACH / OCEAN',tx(147),tz(225));ctx.textAlign='start';
  const gateX=tx(570)-3,gateY=tz(0);
  ctx.strokeStyle='#f5a23b';ctx.lineWidth=7;
  ctx.beginPath();ctx.moveTo(gateX,gateY-12);ctx.lineTo(gateX,gateY+12);ctx.stroke();
  ctx.fillStyle='#ffd08a';ctx.font='bold 11px Arial';ctx.textAlign='right';
  ctx.fillText('POLICE GATE',gateX-9,gateY-5);
  ctx.fillText('CLOSED',gateX-9,gateY+9);
  ctx.textAlign='start';
  ctx.fillStyle='#b4c6d1';for(const [x,z,w,h] of [[-48,-48,28,24],[-48,-132,24,18]])ctx.fillRect(tx(x-w/2),tz(z-h/2),w*scale,h*270/527);
  ctx.fillStyle='#3fbbe8';ctx.beginPath();ctx.arc(tx(48),tz(-48),6,0,Math.PI*2);ctx.fill();label(48,-48,'NEEDLE');
  ctx.fillStyle='#f5f6e9';ctx.beginPath();ctx.arc(tx(48),tz(48),6,0,Math.PI*2);ctx.fill();label(48,48,'PLAZA');
  ctx.fillStyle='#b9dcb6';ctx.fillRect(tx(117),tz(62),18*scale,14*270/527);label(126,70,'SCOOTERS','#d4f6cb');ctx.fillStyle='#d0b482';ctx.fillRect(tx(119),tz(19),42*scale,32*270/527);label(140,35,'BOWLING','#ffe3a7');label(-63,48,'APTS','#efe4c2');
  ctx.fillStyle='#659647';
  for(const [lo,hi] of [[-265,-113],[-79,-17],[17,79],[113,166]])ctx.fillRect(tx(240),tz(lo),316*scale,(hi-lo)*270/527);
  ctx.fillStyle='#b5d37b';
  for(let row=0;row<3;row++)for(let col=0;col<3;col++){
   const gx=291+col*96+(col%2?-9:9),gz=[-135,-69,69][row];
   ctx.beginPath();ctx.ellipse(tx(gx),tz(gz),6,3,0,0,Math.PI*2);ctx.fill();
   label(gx,gz,String(row*3+col+1),'#ffffff');
  }
  label(310,-240,'9-HOLE GOLF CLUB','#ffffff');
  ctx.fillStyle='#5cae5a';ctx.fillRect(tx(-20),tz(-190),136*scale,105*270/527);
  label(48,-139,'SPORTS PARK','#ffffff');
  label(294,140,'CLUBHOUSE','#ffffff');
  ctx.fillStyle='#a789b4';ctx.fillRect(tx(-78),tz(-32),60*scale,16*270/527);
  label(-82,-8,'CLUB','#ead4ff');
  label(-48,-48,'AUTO');label(-48,-132,'COFFEE');label(-20,212,'BEACH','#ffffff');
  // Street-facing, evenly spaced western residential lots.
  ctx.fillStyle='#cbbd9e';for(const hx of [-246,-220,-194,-168,-142])for(const hz of [-128,-64,-32,32])ctx.fillRect(tx(hx-7),tz(hz-7.7),14*scale,15.4*270/527);
  label(-253,-145,'HOMES','#f5eddb');
  // Highly visible live player marker, drawn last so roads and labels never cover it.
  const px=tx(player.x),py=tz(player.z);frame++;
  const pulse=8+3*Math.sin(frame*.08);
  ctx.beginPath();ctx.arc(px,py,pulse,0,Math.PI*2);ctx.fillStyle='rgba(0,183,255,.2)';ctx.fill();
  ctx.beginPath();ctx.arc(px,py,6,0,Math.PI*2);ctx.fillStyle='#00baff';ctx.fill();ctx.lineWidth=2.5;ctx.strokeStyle='#ffffff';ctx.stroke();
  ctx.fillStyle='#ffffff';ctx.font='bold 10px Arial';ctx.textAlign='center';ctx.fillText('YOU',px,py-13);ctx.textAlign='start';
 }
 draw();return {draw,element:shell};
}

