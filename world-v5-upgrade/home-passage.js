let passage=null;
export function homePassageActive(){return !!passage;}
export function beginHomePassage({open,move,close}){if(passage)return false;open();passage={elapsed:0,moved:false,move,close};return true;}
export function cancelHomePassage(){if(passage)passage.close();passage=null;}
export function updateHomePassage(dt){if(!passage)return;const p=passage;p.elapsed+=dt;if(!p.moved&&p.elapsed>=.32){p.moved=true;p.move();}if(p.elapsed>=1.05){p.close();if(passage===p)passage=null;}}
