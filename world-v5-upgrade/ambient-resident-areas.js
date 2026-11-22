// Ambient town residents stay in town. Forest occupants must be explicitly placed.
export function ambientResidentsAllowed(x,z){return z>=-568&&x>-660&&x<564&&!(x>-266&&x< -116&&z> -274&&z< -151);}
