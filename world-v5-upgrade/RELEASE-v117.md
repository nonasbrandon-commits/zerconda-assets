# Level outdoor ground surfaces · v117

Use one shared outdoor datum (0.02m) for city grass, sidewalks, curbs, road corridors, tower/plaza paving, museum forecourt, apartment approaches, family-home lawns and paths, villa lawns and front drives, campground trails, RV paths, sports courts/promenades, and the Zen garden's two grass sections and stone paths. Update rendered geometry and authored walking heights together.

The continuous city lawn replaces overlapping patches at different elevations. Villa pool openings are cut into the new lawn; real pool interiors and building stairs/floors keep their authored elevations. Distinct grass textures use stable depth ordering without raised edges. The sports garden's flagstones and connecting paths share the promenade height, with connector clipping retained. Ground court markings are now thin flat paint geometry.

Museum fountain and bench elevations follow the leveled forecourt, including usable seat heights. Julie Brown's photographic portrait and upbeat female news narration from v116 are retained.

Validation: 13 JavaScript syntax checks; full-town initialization without page errors; 14 sampled grass/paving/sidewalk/curb/street/park/airport-loop/plaza walking heights all equal 0.02m, with foot support at 0.024m; direct rendered-geometry raycasts on the two sports-garden grass types both equal 0.02m; all registered town walking slabs share the datum; museum stair elevation remains correct, fountain seats track the new ground, and villa pool floors/openings remain below grade. Visual review of the former two-grass seam confirms no step.
