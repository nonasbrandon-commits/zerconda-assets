export const GRILL_DOGS=[{x:-.84,y:1.265,z:-.25},{x:-.84,y:1.265,z:-.13},{x:-.43,y:1.265,z:-.25},{x:-.43,y:1.265,z:-.13}];
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
// One shared cycle drives the hand, tong jaws, and the sausage being turned.
export function grillingCycle(time){const cycle=time/4,index=Math.floor(cycle)%4,p=cycle%1,dog=GRILL_DOGS[index],previous=GRILL_DOGS[(index+3)%4];const travel=smooth(p/.22),roll=smooth((p-.4)/.25),release=smooth((p-.70)/.12),contact=p>=.3&&p<=.72;
 const lift=p<.22?.13:p<.32?.13*(1-smooth((p-.22)/.1)):p>.72?.13*smooth((p-.72)/.2):0;
 return{index,contact,roll:roll*Math.PI,grip:smooth((p-.28)/.1)*(1-release),tip:{x:previous.x+(dog.x-previous.x)*travel,y:dog.y+.012+lift,z:previous.z+(dog.z-previous.z)*travel},hand:{x:previous.x+(dog.x-previous.x)*travel,y:dog.y+.212+lift,z:previous.z+(dog.z-previous.z)*travel}};
}
