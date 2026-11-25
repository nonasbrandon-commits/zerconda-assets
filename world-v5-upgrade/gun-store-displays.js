import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
export function createGunStoreDisplays(parent,{add,solid,text,materials:m,weapons,makeWeapon}){
 const green=new THREE.MeshStandardMaterial({color:'#58613b',metalness:.32,roughness:.66}),red=new THREE.MeshStandardMaterial({color:'#9b231e',roughness:.68}),yellow=new THREE.MeshStandardMaterial({color:'#d2a62e',roughness:.75}),felt=new THREE.MeshStandardMaterial({color:'#171e20',roughness:.98}),warm=new THREE.MeshStandardMaterial({color:'#ffcf8d',emissive:'#ffad4e',emissiveIntensity:1.4,roughness:.5});warm.userData.selectiveBloom=true;
 const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=512;const c=canvas.getContext('2d');for(let i=0;i<4;i++){const x=(i%2)*512,y=Math.floor(i/2)*256;c.fillStyle=['#232729','#96241f','#d3aa2b','#505d35'][i];c.fillRect(x,y,512,256);c.strokeStyle=i===2?'#4c391e':'#c5beb0';c.lineWidth=3;c.strokeRect(x+8,y+8,496,240);c.fillStyle=i===2?'#1c211e':'#efeee7';c.font='700 26px Arial';c.fillText('Z SERIES',x+25,y+42);c.font='900 92px Arial';c.fillText(i===3?'SUPPLY':'AMMO',x+22,y+148,300);c.font='700 22px Arial';c.fillText(i===3?'STORAGE CASE':'VIRTUAL WORLD EQUIPMENT',x+25,y+222,450);for(let j=0;j<3;j++){c.fillStyle='#d5b46a';c.fillRect(x+344+j*48,y+98,24,95);c.beginPath();c.moveTo(x+344+j*48,y+98);c.quadraticCurveTo(x+356+j*48,y+58,x+368+j*48,y+98);c.fill();}}
 const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=4;const labelMaterial=new THREE.MeshBasicMaterial({map,toneMapped:false});
 const box=(w,h,d,x,y,z,mat=m.black)=>add(new RoundedBoxGeometry(w,h,d,2,Math.min(.018,w*.25,h*.25,d*.25)),mat,x,y,z);
 function label(kind,w,h,x,y,z,ry=0){const g=new THREE.PlaneGeometry(w,h),uv=g.attributes.uv,col=kind%2,row=Math.floor(kind/2);for(let i=0;i<uv.count;i++)uv.setXY(i,(col+uv.getX(i))/2,(1-row+uv.getY(i))/2);add(g,labelMaterial,x,y,z,ry);}
 let packageCount=0;
 for(const cx of[-14,-7,0]){
  box(6.0,3.75,.16,cx,1.975,-12.7);for(const dx of[-2.98,2.98])box(.13,3.75,.88,cx+dx,1.975,-12.25,m.dark);box(6.0,.14,.90,cx,.14,-12.25,m.dark);box(6.0,.20,.90,cx,3.78,-12.25,m.dark);
  for(const y of[.25,1.00,1.75,2.50]){box(5.82,.065,.86,cx,y,-12.15,m.metal);box(5.68,.018,.022,cx,y-.048,-11.73,warm);solid(cx,-11.9,5.7,.65);}
  box(5.70,.025,.035,cx,3.52,-12.15,warm);
  for(let j=0;j<3;j++){const x=cx+(j-1)*1.80;box(1.52,.63,.62,x,2.85,-12.1,green);box(1.59,.09,.68,x,3.19,-12.1,green);box(1.54,.025,.65,x,3.12,-12.1,m.black);for(const side of[-1,1]){box(.07,.22,.045,x+side*.52,3.03,-11.765,m.metal);box(.09,.045,.045,x+side*.52,2.93,-11.73,m.metal);}box(.28,.18,.025,x,2.88,-11.77,m.dark);box(.20,.025,.035,x,2.91,-11.73,m.metal);box(.025,.12,.035,x-.09,2.86,-11.73,m.metal);box(.025,.12,.035,x+.09,2.86,-11.73,m.metal);label(3,.60,.21,x,2.70,-11.773);}
  for(let level=0;level<3;level++)for(let j=0;j<5;j++){const kind=(j+level)%3,mat=[m.dark,red,yellow][kind],x=cx+(j-2)*1.07,y=.285+level*.75+.245;box(.96,.46,.60,x,y,-12.08,mat);box(.99,.035,.62,x,y+.235,-12.08,m.dark);label(kind,.90,.40,x,y,-11.773);packageCount++;if(level===1&&j%2===0){box(.89,.22,.55,x,y+.355,-12.10,mat);label(kind,.82,.18,x,y+.355,-11.818);packageCount++;}}
 }
 const caseGlass=new THREE.MeshStandardMaterial({color:'#b8d2cf',transparent:true,opacity:.09,roughness:.12,metalness:.10,depthWrite:false,side:THREE.DoubleSide});caseGlass.name='Clear Z weapon display glass';
 const cases=[],displayModels=[];
 for(let i=0;i<4;i++){const x=-16.53,z=-8.7+i*2.5;box(.20,2.48,2.26,-16.73,1.95,z,m.dark);box(.035,2.22,2.02,-16.605,1.95,z,felt);solid(x,z,.58,2.26);
  // Shallow wall cabinets; weapons lie against the vertical padded back, behind clear glazing.
  box(.018,2.30,2.14,-16.22,1.95,z,caseGlass);for(const side of[-1,1]){box(.50,.045,2.20,x,1.95+side*1.18,z,m.metal);box(.50,2.38,.045,x,1.95,z+side*1.10,m.metal);}box(.018,.018,1.97,-16.40,3.10,z,warm);
  let sharedLED=null;for(let j=0;j<3;j++){const model=makeWeapon(weapons[i].id,{locked:true,statusMaterial:sharedLED});sharedLED=model.root.userData.statusMaterial;model.root.scale.setScalar(1.10);model.root.position.set(-16.47,1.15+j*.75,z);model.root.userData.distanceManaged=true;model.root.name=weapons[i].name+' · wall case reference display';model.root.updateMatrixWorld(true);model.root.traverse(o=>{if(o.isMesh)add(o.geometry.clone().applyMatrix4(o.matrixWorld),o.material);});displayModels.push(model);}
  text(weapons[i].name.toUpperCase()+' · Z SERIES',-16.18,.72,z,2.0,.18,{ry:Math.PI/2,font:60});cases.push({x,z,width:.58,depth:2.26,weaponId:weapons[i].id});
 }
 text('Z SERIES',-16.7,3.5,-4.95,10,.55,{ry:Math.PI/2,font:82});
 return{caseCount:4,cases,packageCount,displayModels,setLightState(id,state){for(const model of displayModels)if(model.root.userData.weaponId===id)model.setStatus(state);}};
}
