# Areas, patio planting and trail joins v110

City map moved to upper left, preserving the Map toggle. A native labeled Go to an area dropdown at upper right immediately travels to24 landmarks and clear outdoor entrances, stopping current movement and exiting activities/interiors. Military destination stays outside the clearance checkpoint. Map/dropdown adapt to narrow screens; mobile toast and golf status move below the map to keep the selector clear.

Brewstone Coffee had cloned a whole six-plant botanical display into each planter. It now fits three individually centered variants within each soil bed, with hollow white planter walls and recessed soil.

Forest paths and rest pads are clipped against earlier footprints through a spatial index. Wide gravel paths have priority at narrow-track junctions. All surfaces are at .055m with common world-space UVs; no stacked gravel/track triangles. Driveway cutouts remain. No new asset downloads or external geometry dependencies.

Validation: all24 native dropdown selections arrive on walkable ground; traveling out of a moving Skyline lift and boarded aircraft clears their state. Desktop1440x900 and mobile390x844 map/dropdown bounds do not overlap or overflow. Four planters each contain3 plants with max half-width.525m inside1.25m soil beds.975 ray samples across13 trail junctions find no overlapping surfaces or gaps, all normals face up, UVs are world aligned. Both scene screenshots reviewed; no browser page errors. Six JavaScript syntax checks pass.
