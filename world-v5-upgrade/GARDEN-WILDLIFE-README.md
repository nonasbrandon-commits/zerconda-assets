# Clear garden paths and reactive wildlife — v96

Pond foliage placement reserves the full leaf reach around the stone loop, connecting paths, external park paving and benches. Seventy-one planting clusters remain on soft ground; shallow reeds move away from the rock edging into the pond. Shrubs also respect path and bench clearance. The two bird perches that overlapped benches move onto clear grass. Birds have small legs and toes for ground contact.

The garden's three birds, two frogs and two new squirrels react to the player's proximity. Birds fly away and land in clear areas, frogs hop toward sheltered pond edges, and squirrels run through available garden ground. Destination and movement checks avoid bench footprints and inappropriate paths. Animals settle after fleeing and can flee again if approached. Wildlife groups are marked as dynamic scenery so the outdoor obstacle index cannot leave a stationary invisible collider at their former locations.

The park receives the actual player location after scene initialization; initial garden creation remains safe before the player is constructed. Existing koi remain swimming scenery.

Validation: syntax checks; full-world phone-sized runtime checks find no foliage vertices over the paths, no bird home inside a bench, and all seven tested animals increase their distance from an approaching player. No dynamic-animal object enters the static collision index. A real WebGL garden preview confirms clear stone paths and benches, with no page errors.
