// The rear guard protects the upstairs opening; descending residents pass below it.
export function rearLandingGuardBlocks(home,p){return home.floor===1&&!home.stairActive&&Math.abs(p.z-4.6)<.28&&p.x>5.1&&p.x<7.9;}
export function recoverPremierRailPosition(home,p){if(rearLandingGuardBlocks(home,p))return{x:6.5,z:5.2};if(p.z>-1.4&&p.z<4.4){if(Math.abs(p.x-5.1)<.26)return{x:home.stairActive?6.5:4.65,z:p.z};if(Math.abs(p.x-7.9)<.26)return{x:home.stairActive?6.5:8.35,z:p.z};}return null;}
