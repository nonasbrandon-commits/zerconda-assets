export const AREA_DESTINATIONS=[
 {id:'brick-apartments',name:'Brick Apartments',group:'Homes',x:-632,z:-480,yaw:-Math.PI/2},
 {id:'guns-ammo',name:'Zerconda Guns & Ammo',group:'Town & shops',x:-632,z:-366,yaw:-Math.PI/2},
 {id:'hospital',name:'Zerconda Hospital',group:'Town & shops',x:-518,z:-360,yaw:-Math.PI/2},
 {id:'canopy',name:'Zerconda Tag Warehouse',group:'Town & shops',x:-483,z:-470,yaw:-Math.PI/2},
 {id:'powersports',name:'Zerconda Powersports Center',group:'Town & shops',x:-448,z:-178,yaw:0},
 {id:'fortune',name:'Z Fortune',group:'Town & shops',x:-56,z:-111,yaw:Math.PI},
 {id:'z-store',name:'Z Store',group:'Town & shops',x:155,z:80,yaw:Math.PI},
 {id:'museum',name:'Zerconda Museum',group:'Town & shops',x:-346,z:-134,yaw:Math.PI},
 {id:'tattoo',name:'Z Tattoo',group:'Town & shops',x:-390,z:-12.5,yaw:Math.PI},
 {id:'west',name:'West Extension',group:'Town & shops',x:-400,z:48,yaw:-Math.PI/2},
 {id:'plaza',name:'Town Plaza',group:'Town & shops',x:48,z:69},
 {id:'club',name:'Club Zerconda',group:'Town & shops',x:-48,z:-10.5,yaw:Math.PI},
 {id:'needle',name:'Z-View',group:'Town & shops',x:48,z:-30,yaw:Math.PI},
 {id:'coffee',name:'Brewstone Coffee',group:'Town & shops',x:-28,z:-111,yaw:Math.PI},
 {id:'news',name:'Zerconda News',group:'Town & shops',x:136,z:-20,yaw:Math.PI},
 {id:'business',name:'Skyline Business Centre',group:'Town & shops',x:188,z:-25,yaw:Math.PI},
 {id:'bowling',name:'Luxe Lanes Bowling',group:'Town & shops',x:115,z:35,yaw:Math.PI/2},
 {id:'boutique',name:'Thread & Coast Clothing',group:'Town & shops',x:188,z:78,yaw:Math.PI},
 {id:'barber',name:'Style Cuts',group:'Town & shops',x:-72,z:-31,yaw:Math.PI},
 {id:'apartments',name:'Zerconda Apartments',group:'Town & shops',x:-48,z:77,yaw:Math.PI},
 {id:'homes',name:'Residential Neighborhood',group:'Town & shops',x:-142,z:-145},
 {id:'boardwalk',name:'Boardwalk',group:'Beach & recreation',x:0,z:186,yaw:Math.PI/2},
 {id:'hotdogs',name:'Boardwalk Hot Dog Cart',group:'Beach & recreation',x:-78,z:187,yaw:Math.PI},
 {id:'beach',name:'South Beach',group:'Beach & recreation',x:0,z:225},
 {id:'pier',name:'Seaside Pier',group:'Beach & recreation',x:0,z:250},
 {id:'carnival',name:'Seaside Carnival',group:'Beach & recreation',x:188,z:177,yaw:Math.PI},
 {id:'golf',name:'Golf Club',group:'Beach & recreation',x:310,z:123},
 {id:'sports',name:'Sports Park',group:'Beach & recreation',x:48,z:-146,yaw:Math.PI},
 {id:'skate',name:'Skate Park',group:'Beach & recreation',x:210,z:22,yaw:-Math.PI/2},
 {id:'scooters',name:'Scooter Rentals',group:'Beach & recreation',x:126,z:81,yaw:Math.PI},
 {id:'airport',name:'North Airfield',group:'Forest & airfield',x:-96,z:-307,yaw:Math.PI},
 {id:'camp',name:'Forest Campground',group:'Forest & airfield',x:-111,z:-168,yaw:-Math.PI/2},
 {id:'rv',name:'Tall Pines Cabins',group:'Forest & airfield',x:-82,z:-154,yaw:Math.PI/2},
 {id:'forest',name:'North Woods Trails',group:'Forest & airfield',x:-220,z:-580,yaw:Math.PI},
 {id:'military',name:'Military Checkpoint',group:'Forest & airfield',x:465,z:-1048,yaw:Math.PI}
];
export function createAreaTravel({onCall,onCancel=()=>{},onStop=()=>{}}){
 document.getElementById('town-area-travel')?.remove();
 const style=document.createElement('style');style.textContent=`
 #town-area-travel{position:fixed;top:66px;right:max(12px,env(safe-area-inset-right));z-index:13000;box-sizing:border-box;width:240px;max-width:calc(100vw - 24px);padding:10px 12px;border:1px solid #91adb9;border-radius:12px;background:#102b3bec;box-shadow:0 4px 20px #0004;color:#f3f0e5;font:13px system-ui}
 #town-area-travel label{display:block;font-weight:600;margin:0 0 6px;letter-spacing:.3px}
 #town-area-travel select,#town-area-travel button{display:block;box-sizing:border-box;width:100%;min-height:44px;padding:9px 28px 9px 10px;border:1px solid #9cb6b3;border-radius:7px;background:#e7eee7;color:#153442;font:14px system-ui;touch-action:manipulation;cursor:pointer}
 #town-area-travel select:focus-visible,#town-area-travel button:focus-visible{outline:3px solid #79d7ed;outline-offset:2px}
 #golf-score{top:auto!important;bottom:54px!important;left:12px!important;max-width:calc(100vw - 48px)!important}
 #zerconda-v5-map.zerconda-left-map{box-sizing:border-box;width:372px;top:max(12px,env(safe-area-inset-top))!important;left:max(12px,env(safe-area-inset-left))!important;right:auto!important;max-width:calc(100vw - 24px)!important}
 #zerconda-v5-map.zerconda-left-map canvas{width:350px!important;max-width:100%!important}
 @media(max-width:700px){#town-toast{top:auto!important;bottom:104px!important}#town-area-travel{top:64px;width:190px;padding:8px 10px}#town-area-travel label{font-size:12px;margin-bottom:4px}#golf-score{top:auto!important;bottom:54px!important;left:12px!important;max-width:calc(100vw - 48px)!important}
 #zerconda-v5-map.zerconda-left-map{box-sizing:border-box;width:372px;top:155px!important}#zerconda-v5-map.zerconda-left-map canvas{width:100%!important}}
 `;document.head.appendChild(style);
 const panel=document.createElement('nav');panel.id='town-area-travel';panel.setAttribute('aria-label','Request Z Cab');
 const label=document.createElement('label');label.htmlFor='town-cab-call';label.textContent='Request Z Cab';panel.appendChild(label);
 const callButton=document.createElement('button');callButton.type='button';callButton.id='town-cab-call';callButton.textContent='Request pickup';callButton.setAttribute('aria-label','Request Z Cab to the nearest road');const row=document.createElement('div');row.style.cssText='display:flex;gap:6px;min-width:0';callButton.style.cssText='flex:1;min-width:0;padding:9px 6px';const cancelButton=document.createElement('button');cancelButton.id='town-cab-cancel';cancelButton.type='button';cancelButton.textContent='Cancel cab';cancelButton.style.cssText='display:none;flex:0 0 88px;width:88px;padding:9px 6px;background:#f2d9cb';cancelButton.onclick=()=>{onStop();onCancel();cancelButton.blur();};row.append(callButton,cancelButton);panel.append(row);document.body.appendChild(panel);
 callButton.onclick=()=>{onStop();onCall();callButton.blur();};
 for(const event of ['pointerdown','pointerup','click','keydown','keyup'])panel.addEventListener(event,e=>{e.stopPropagation();if(event==='pointerdown')onStop();});
 return {element:panel,callButton,cancelButton,setCabState(state){const pending=['finding','enroute','arrived','riding'].includes(state);cancelButton.style.display=pending?'block':'none';callButton.disabled=['finding','enroute','riding'].includes(state);callButton.textContent=state==='finding'?'Finding cab…':state==='enroute'?'Cab on its way…':state==='arrived'?'Cab arrived':state==='riding'?'In Z Cab':'Request pickup';callButton.setAttribute('aria-label',callButton.textContent);},destinations:AREA_DESTINATIONS};
}
