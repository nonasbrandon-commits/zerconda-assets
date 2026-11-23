// Matches the physical perimeter in world-v5-complete-replacement.js.
// The beach has no southern wall; retain the east gate and west passage gaps.
export const MAP_WALL_SEGMENTS=[[-720,-1398,618,-1398],[-720,-1398,-720,-613.1],[-720,-610.9,-720,350],[618,-1398,618,-18],[618,18,618,350]];
export function drawMapWalls(ctx,project,{width,height,scale=1}={}){
 ctx.save();ctx.beginPath();ctx.rect(0,0,width,height);ctx.clip();ctx.lineCap='butt';ctx.lineJoin='miter';ctx.setLineDash([]);
 for(const [x1,z1,x2,z2] of MAP_WALL_SEGMENTS){const a=project(x1,z1),b=project(x2,z2);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle='#403a31';ctx.lineWidth=Math.max(5,2.6*scale+2);ctx.stroke();ctx.strokeStyle='#e6cda5';ctx.lineWidth=Math.max(2.5,2.6*scale);ctx.stroke();}
 ctx.restore();
}
