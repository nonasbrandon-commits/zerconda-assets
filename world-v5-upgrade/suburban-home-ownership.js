// One-time release of the explicitly retired browser-local H01 demo claim.
// A local backup precedes removal. Later purchases and other claims stay intact.
export const H01_RELEASE_KEY='zerconda.migration.release-brandon-h01.v1';
export const H01_BACKUP_KEY=H01_RELEASE_KEY+'.backup';
export function readSuburbanHomeOwnership(storage,key='zerconda-v5-demo-home'){
 let saved=null,complete=false;try{saved=JSON.parse(storage.getItem(key)||'null');}catch{}try{complete=JSON.parse(storage.getItem(H01_RELEASE_KEY)||'null')?.complete===true;}catch{}if(complete)return saved;
 const legacy=saved?.id===1&&String(saved.username||'').trim().toLowerCase()==='brandon'&&(!saved.ownerId||saved.ownerId==='admin')&&(!saved.provider||saved.provider==='existing-admin');
 if(!legacy){try{storage.setItem(H01_RELEASE_KEY,JSON.stringify({version:1,complete:true,released:false}));}catch{}return saved;}
 let released=false;try{if(!storage.getItem(H01_BACKUP_KEY))storage.setItem(H01_BACKUP_KEY,JSON.stringify({version:1,homeId:'H01',previous:saved}));storage.removeItem(key);released=true;storage.setItem(H01_RELEASE_KEY,JSON.stringify({version:1,complete:true,released:true}));}catch{}
 return released?null:saved;
}
