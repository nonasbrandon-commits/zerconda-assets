# Twenty realistic residents and shoreline shading — v97

Replaces the old repeated pedestrian population with twenty distinct adult residents: ten men and ten women. Eight walk town sidewalks, four cycle, four ride original unbranded electric scooters, and four run the wall-to-wall boardwalk. Each activity group is evenly split between men and women. Characters have varied face meshes, physiques, skin tones, hair, heights, and summer outfits, including dresses, skirts, leggings, shorts, sports bras, sneakers and shirtless male running outfits. Models are local MIT-licensed Microsoft Rocketbox adaptations, matching the current player's animation family. Full license and source mapping are included alongside the twenty optimized models.

Cyclists pedal with two-bone leg placement; both cyclists and scooter riders aim their hands at controls. Foot planting follows actual ground and boardwalk support. Bots yield near the player and only advance through walkable points; blocked walkers reverse. Wheels, frames and material details are batched to limit draw calls. Four runners use separate boardwalk lanes.

Removed the obsolete shore shader rule that treated x beyond +/-181m and z below 238m as a deep side channel. It caused the hard rectangular blue patch at the otherwise continuous sandy coast. Shore shading now uses one consistent world-space shoreline across its entire width.

Validation: JavaScript syntax checks; full-world phone-sized runtime test loads all twenty unique models, confirms ten men and ten women, all four activity assignments, upright animated bodies, movement on valid routes and correct runner support across the boardwalk. Hand-placement checks cover bikes and scooters; isolated real WebGL previews inspect the distinct summer characters and riding poses. No page errors in runtime checks. The shoreline shader no longer contains the channel discontinuity. Existing player customization, attendants, wildlife and property systems remain in the scene.

Resident models total approximately 4.5 MB transferred and share existing idle/walk/run clips. These are local game bots; no multiplayer backend is added.
