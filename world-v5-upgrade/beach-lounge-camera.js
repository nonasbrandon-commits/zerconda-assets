import {Vector3} from 'three';
// Seat-eye view stays below the parasol. The walking camera resumes on standing.
export function positionBeachLoungeCamera(camera,seat){const facing=seat.facing||0;camera.position.set(seat.x+Math.sin(facing)*.18,seat.sitHeight+.98,seat.z+Math.cos(facing)*.18);return camera.position;}
export function beachLoungeViewDirection(yaw,pitch=-.035){return new Vector3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));}
