// Shared road-and-sidewalk reservations, including the expanded western boulevard.
// Each rectangle covers the complete paved corridor, not just its center line.
export const TREE_ROAD_CORRIDORS=[
 ...[-96,0,96].map(z=>({x0:-444,x1:570,z0:z-14,z1:z+14})),
 ...[-96,0,96].map(x=>({x0:x-14,x1:x+14,z0:-283,z1:154})),
 {x0:-432,x1:-404,z0:-568,z1:175},
 ...[-554,-283].map(z=>({x0:-418,x1:542,z0:z-14,z1:z+14})),
 {x0:528,x1:556,z0:-554,z1:-283},
 {x0:459,x1:471,z0:-1060,z1:-554}
];
export function treeOverlapsRoad(x,z,radius=0){return TREE_ROAD_CORRIDORS.some(r=>x+radius>r.x0&&x-radius<r.x1&&z+radius>r.z0&&z-radius<r.z1);}
export function treeBoundsOverlapRoad(bounds){return TREE_ROAD_CORRIDORS.some(r=>bounds.max.x>r.x0&&bounds.min.x<r.x1&&bounds.max.z>r.z0&&bounds.min.z<r.z1);}
