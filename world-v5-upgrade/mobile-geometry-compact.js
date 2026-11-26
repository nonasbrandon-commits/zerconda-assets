import * as THREE from 'three';
const mobile=typeof matchMedia==='function'&&matchMedia('(pointer:coarse)').matches;
const stats={geometries:0,bytesBefore:0,bytesAfter:0};
// Exact indexing: retain every authored vertex value, seam, triangle and material group.
// Run at merge time so repeated furnishings never accumulate expanded triangle copies.
export function compactMobileGeometry(g,{force=false}={}){
 if(!g||(!mobile&&!force)||g.index||Object.keys(g.morphAttributes).length)return g;
 const attrs=Object.values(g.attributes),count=g.attributes.position?.count;
 if(!count||count<96||attrs.some(a=>a.isInterleavedBufferAttribute||a.count!==count||a.array.BYTES_PER_ELEMENT!==4))return g;
 const words=attrs.map(a=>new Uint32Array(a.array.buffer,a.array.byteOffset,a.array.length));
 let capacity=1;while(capacity<count*1.5)capacity*=2;
 const table=new Uint32Array(capacity),representatives=new Uint32Array(count),indices=new Uint32Array(count);let unique=0;
 function equal(a,b){for(let k=0;k<attrs.length;k++){const size=attrs[k].itemSize,w=words[k];for(let j=0;j<size;j++)if(w[a*size+j]!==w[b*size+j])return false;}return true;}
 for(let i=0;i<count;i++){let hash=2166136261;for(let k=0;k<attrs.length;k++){const size=attrs[k].itemSize,w=words[k];for(let j=0;j<size;j++)hash=Math.imul(hash^w[i*size+j],16777619);}let slot=hash&(capacity-1);while(table[slot]&&!equal(i,table[slot]-1))slot=(slot+1)&(capacity-1);if(!table[slot]){table[slot]=i+1;representatives[unique]=i;indices[i]=unique++;}else indices[i]=indices[table[slot]-1];}
 const before=attrs.reduce((n,a)=>n+a.array.byteLength,0),indexBytes=count*(unique<=65535?2:4),after=attrs.reduce((n,a)=>n+unique*a.itemSize*a.array.BYTES_PER_ELEMENT,0)+indexBytes;
 if(after>=before*.92)return g;
 for(const [name,a]of Object.entries(g.attributes)){const array=new a.array.constructor(unique*a.itemSize),src=a.array;for(let i=0;i<unique;i++)for(let j=0;j<a.itemSize;j++)array[i*a.itemSize+j]=src[representatives[i]*a.itemSize+j];const replacement=new THREE.BufferAttribute(array,a.itemSize,a.normalized);replacement.name=a.name;replacement.setUsage(a.usage);replacement.gpuType=a.gpuType;g.setAttribute(name,replacement);}
 g.setIndex(new THREE.BufferAttribute(unique<=65535?new Uint16Array(indices):indices,1));stats.geometries++;stats.bytesBefore+=before;stats.bytesAfter+=after;return g;
}
export function mobileGeometryStatus(){return{...stats,savedMB:+((stats.bytesBefore-stats.bytesAfter)/1048576).toFixed(1)}};
