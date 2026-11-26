// Tile the road/sidewalk union once: no pavement slabs underneath traffic lanes.
export function buildWesthavenRoads({box,asphalt,paving}){const vertical=[-646,-562,-478],rows=[-283,-192,-96,0,96,175],cityRows=[-96,0,96],otherRows=[-283,-192,175];const xs=[-521.3,-510.6,-660,-655,-468.5,-432,-427.5,...vertical.flatMap(x=>[x-14,x-9.5,x+9.5,x+14])].filter(x=>x>=-660&&x<=-427.5),zs=[-297,189,...rows.flatMap(z=>[z-14,z-9.5,z+9.5,z+14])].filter(z=>z>=-297&&z<=189),unique=a=>[...new Set(a)].sort((a,b)=>a-b),xCuts=unique(xs),zCuts=unique(zs),surfaces=[];
 for(let i=1;i<xCuts.length;i++)for(let j=1;j<zCuts.length;j++){const a=xCuts[i-1],b=xCuts[i],c=zCuts[j-1],d=zCuts[j],x=(a+b)/2,z=(c+d)/2,w=b-a,depth=d-c;const v=Math.min(...vertical.map(k=>Math.abs(x-k))),h=Math.min(...rows.map(k=>Math.abs(z-k))),city=cityRows.some(k=>Math.abs(z-k)<14),other=otherRows.some(k=>Math.abs(z-k)<14),road=v<9.5&&z>=rows[0]-9.5&&z<=rows.at(-1)+9.5||x>=-655&&h<9.5;
 if(road){if(x>=-468.5&&cityRows.some(k=>Math.abs(z-k)<9.5))continue;box(w,.004,depth,x,.002,z,asphalt);surfaces.push({x,z,w,d:depth,kind:'road'});}
 else if(v<14||x>=-655&&h<14){if(x>-521.3&&x<-510.6&&z>-110&&z<-105.5)continue;if(x>=-468.5&&city||x>=-432&&!other)continue;box(w,.004,depth,x,.004,z,paving);surfaces.push({x,z,w,d:depth,kind:'sidewalk'});}}
 return surfaces;
}
