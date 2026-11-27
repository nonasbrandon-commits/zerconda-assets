import * as T from 'three';
// Folded serrated leaves and short fallen needle sprays share instanced geometry.
export function dryLeafGeometry(){
 const edge=[[-.095,0,0],[-.055,.003,-.028],[-.025,.001,-.035],[0,.004,-.028],[.025,.002,-.033],[.060,.003,-.018],[.11,0,0],[.055,.002,.025],[.022,0,.032],[-.005,.003,.027],[-.04,.001,.034],[-.068,.002,.021]],pos=[],colors=[];
 for(let leaf=0;leaf<7;leaf++){const a=leaf*2.399,r=leaf===0?0:.045+(leaf%3)*.035,cx=Math.cos(a)*r,cz=Math.sin(a)*r,cs=Math.cos(a+.6),sn=Math.sin(a+.6),shade=.72+(leaf%4)*.09;
 for(let i=0;i<edge.length;i++)for(const [j,p]of [[0,[0,.014,0]],[1,edge[i]],[2,edge[(i+1)%edge.length]]]){pos.push(cx+p[0]*cs-p[2]*sn,p[1]+leaf*.0006,cz+p[0]*sn+p[2]*cs);const v=(j===0?.8:1)*shade;colors.push(.40*v,.25*v,.105*v);}}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.computeVertexNormals();return g;
}
export function needleGeometry(){const pos=[];for(let i=0;i<13;i++){const a=i*2.399,x=Math.sin(i*5.1)*.12,z=Math.cos(i*3.7)*.10,l=.045+(i%4)*.012;pos.push(x,.002,z,x+Math.cos(a)*l,.003,z+Math.sin(a)*l,x+Math.cos(a)*l-Math.sin(a)*.002,.003,z+Math.sin(a)*l+Math.cos(a)*.002);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.computeVertexNormals();return g;}
export function coneGeometry(){const g=new T.SphereGeometry(1,8,7).scale(.032,.062,.032),p=g.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i),factor=1+Math.sin(y*260)*.14;p.setXYZ(i,p.getX(i)*factor,y,p.getZ(i)*factor);}g.computeVertexNormals();return g;}
