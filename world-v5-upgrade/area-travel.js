export const AREA_DESTINATIONS=[
 {id:'plaza',name:'Town Plaza',group:'Town & shops',x:48,z:69},
 {id:'club',name:'Club Zerconda',group:'Town & shops',x:-48,z:-10.5,yaw:Math.PI},
 {id:'needle',name:'Z-Needle',group:'Town & shops',x:48,z:-30,yaw:Math.PI},
 {id:'coffee',name:'Brewstone Coffee',group:'Town & shops',x:-48,z:-111,yaw:Math.PI},
 {id:'news',name:'Zerconda News',group:'Town & shops',x:136,z:-20,yaw:Math.PI},
 {id:'business',name:'Skyline Business Centre',group:'Town & shops',x:188,z:-25,yaw:Math.PI},
 {id:'bowling',name:'Luxe Lanes Bowling',group:'Town & shops',x:115,z:35,yaw:Math.PI/2},
 {id:'boutique',name:'Thread & Coast Clothing',group:'Town & shops',x:188,z:78,yaw:Math.PI},
 {id:'barber',name:'Style Cuts',group:'Town & shops',x:-72,z:-31,yaw:Math.PI},
 {id:'apartments',name:'Zerconda Apartments',group:'Town & shops',x:-48,z:77,yaw:Math.PI},
 {id:'homes',name:'Residential Neighborhood',group:'Town & shops',x:-142,z:-145},
 {id:'boardwalk',name:'Boardwalk',group:'Beach & recreation',x:0,z:186,yaw:Math.PI/2},
 {id:'beach',name:'South Beach',group:'Beach & recreation',x:0,z:225},
 {id:'pier',name:'Seaside Pier',group:'Beach & recreation',x:0,z:250},
 {id:'carnival',name:'Seaside Carnival',group:'Beach & recreation',x:188,z:177,yaw:Math.PI},
 {id:'golf',name:'Golf Club',group:'Beach & recreation',x:310,z:123},
 {id:'sports',name:'Sports Park',group:'Beach & recreation',x:48,z:-108,yaw:Math.PI},
 {id:'skate',name:'Skate Park',group:'Beach & recreation',x:210,z:22,yaw:-Math.PI/2},
 {id:'scooters',name:'Scooter Rentals',group:'Beach & recreation',x:126,z:81,yaw:Math.PI},
 {id:'airport',name:'North Airfield',group:'Forest & airfield',x:-96,z:-307,yaw:Math.PI},
 {id:'camp',name:'Forest Campground',group:'Forest & airfield',x:-111,z:-168,yaw:-Math.PI/2},
 {id:'rv',name:'RV Park',group:'Forest & airfield',x:-82,z:-154,yaw:Math.PI/2},
 {id:'forest',name:'North Woods Trails',group:'Forest & airfield',x:-220,z:-580,yaw:Math.PI},
 {id:'military',name:'Military Checkpoint',group:'Forest & airfield',x:465,z:-1048,yaw:Math.PI}
];
export function createAreaTravel({onTravel,onStop=()=>{}}){
 document.getElementById('town-area-travel')?.remove();
 const style=document.createElement('style');style.textContent=`
 #town-area-travel{position:fixed;top:66px;right:max(12px,env(safe-area-inset-right));z-index:13000;box-sizing:border-box;width:240px;max-width:calc(100vw - 24px);padding:10px 12px;border:1px solid #91adb9;border-radius:12px;background:#102b3bec;box-shadow:0 4px 20px #0004;color:#f3f0e5;font:13px system-ui}
 #town-area-travel label{display:block;font-weight:600;margin:0 0 6px;letter-spacing:.3px}
 #town-area-travel select{display:block;box-sizing:border-box;width:100%;min-height:44px;padding:9px 28px 9px 10px;border:1px solid #9cb6b3;border-radius:7px;background:#e7eee7;color:#153442;font:14px system-ui;touch-action:manipulation;cursor:pointer}
 #town-area-travel select:focus-visible{outline:3px solid #79d7ed;outline-offset:2px}
 #golf-score{top:auto!important;bottom:54px!important;left:12px!important;max-width:calc(100vw - 48px)!important}
 #zerconda-v5-map.zerconda-left-map{box-sizing:border-box;width:372px;top:max(12px,env(safe-area-inset-top))!important;left:max(12px,env(safe-area-inset-left))!important;right:auto!important;max-width:calc(100vw - 24px)!important}
 #zerconda-v5-map.zerconda-left-map canvas{width:350px!important;max-width:100%!important}
 @media(max-width:700px){#town-toast{top:auto!important;bottom:104px!important}#town-area-travel{top:64px;width:190px;padding:8px 10px}#town-area-travel label{font-size:12px;margin-bottom:4px}#golf-score{top:auto!important;bottom:54px!important;left:12px!important;max-width:calc(100vw - 48px)!important}
 #zerconda-v5-map.zerconda-left-map{box-sizing:border-box;width:372px;top:155px!important}#zerconda-v5-map.zerconda-left-map canvas{width:100%!important}}
 `;document.head.appendChild(style);
 const panel=document.createElement('nav');panel.id='town-area-travel';panel.setAttribute('aria-label','Area travel');
 const label=document.createElement('label');label.htmlFor='town-area-select';label.textContent='Go to an area';panel.appendChild(label);
 const select=document.createElement('select');select.id='town-area-select';select.setAttribute('aria-label','Choose an area to travel to');const prompt=new Option('Choose an area…','');select.add(prompt);
 for(const group of [...new Set(AREA_DESTINATIONS.map(d=>d.group))]){const optgroup=document.createElement('optgroup');optgroup.label=group;for(const d of AREA_DESTINATIONS.filter(d=>d.group===group))optgroup.appendChild(new Option(d.name,d.id));select.appendChild(optgroup);}
 panel.appendChild(select);document.body.appendChild(panel);
 for(const event of ['pointerdown','pointerup','click','keydown','keyup'])panel.addEventListener(event,e=>{e.stopPropagation();if(event==='pointerdown')onStop();});
 select.addEventListener('focus',onStop);
 select.addEventListener('change',()=>{const destination=AREA_DESTINATIONS.find(d=>d.id===select.value);if(!destination)return;onStop();try{onTravel(destination);}finally{select.value='';select.blur();}});
 return {element:panel,select,destinations:AREA_DESTINATIONS};
}
