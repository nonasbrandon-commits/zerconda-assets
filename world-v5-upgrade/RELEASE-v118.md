# Entrance footing, mouse controls and plaza surface repair · v118

The news entrance was a separate 0.16m platform left above the shared outdoor grade. Lower it to the shared datum and join it to the sidewalk. Level and trim the external approach slabs at Skyline, bowling, clothing, the salon/dealership forecourt, and Z Tattoo. Their indoor floors remain authored separately.

The news security officer's animation controller aligns feet to its parent's elevation, so assigning elevation directly to the animated root was being overwritten. Put the officer in a dedicated ground-positioned anchor, with the badge relative to that anchor. Apply the same stationary anchor correction to the tattoo artist.

Desktop car mouse controls: hold the right mouse button and drag left/right to steer. Left-drag continues to look around. Releasing right mouse, losing pointer capture, changing vehicle, or losing focus clears steering. Keyboard and on-screen controls retain priority and remain available.

Desktop skateboard controls: hold left mouse to push, drag to turn, or scroll up for a push. Release to coast; existing keyboard and touch controls still work. Mouse pushes no longer fall through into the walking-only wheel impulse. Space/Ollie remains available. Pointer release does not accidentally activate the Return Board action.

The Needle plaza's old loop extended into the city sidewalks and its concrete island, producing black/concrete coplanar overlap after leveling. Fit the road ring between 68m outer and 53m inner bounds, remove the black connector overlays across existing sidewalks, and keep landscape circles inside the island.

Validation: 11 production syntax checks; 15 full-town entrance/sidewalk/grass walking-height samples agree with shared grade; direct surface raycasts at the news forecourt, lawn, sidewalk and guard position agree; animated guard shoe vertices stay within 0.6mm of grade across 45 idle updates; real browser pointer/keyboard events verify car steering in both directions without head movement, left-drag look, release/focus reset, skateboard mouse pushing/turning/coasting/wheel propulsion and jumping; geometric area tests find no road-ring overlap with the plaza concrete or street sidewalks; no page errors in these checks. Julie Brown, museum, fountain, window tint and bounded startup remain included.
