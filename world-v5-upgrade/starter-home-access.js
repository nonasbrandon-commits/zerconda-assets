// This adapter accepts the existing local Admin session. Online resident accounts
// must come from a server-verified auth adapter, never a profile display name.
export function createStarterHomeAccess({isAdmin,getAuthenticatedAccount=()=>null,storage=globalThis.localStorage}){
 function identity(){if(isAdmin())return Object.freeze({id:'admin',name:'Admin',provider:'existing-admin'});const a=getAuthenticatedAccount();return a?.verified&&a.provider==='server'&&a.id?Object.freeze({id:String(a.id),name:String(a.username||'Resident'),provider:'server'}):null;}
 function provision(){const user=identity();if(!user)return null;const key='zerconda-starter-home-v1:'+encodeURIComponent(user.id);let saved={};try{saved=JSON.parse(storage.getItem(key)||'{}');}catch{}const record=Object.freeze({schema:1,homeId:'starter/'+user.id,ownerId:user.id,ownerName:user.name,layout:'one-bedroom-v1',createdAt:typeof saved.createdAt==='string'?saved.createdAt:new Date().toISOString()});try{storage.setItem(key,JSON.stringify(record));}catch{}return record;}
 return{identity,provision};
}
