# Museum stone forecourt and apartment glazing · v115

- Change the museum's tan masonry to neutral gray stone. Replace the wide white forecourt with one stone-paved surface aligned to the staircase frontage, including the sidewalk connector.
- Remove the side ramp, rails, bridge, and ramp collision/height rules. The portico now has a full stone foundation down to ground level; the staircase is one closed solid extrusion.
- Remove the coplanar stone and marble landing faces that caused flashing. The foundation top is below the paving cap; the doorway threshold has its own small, consistent elevation.
- Add an exterior circular stone fountain with animated ripples, sky-like highlights, water arcs and moving droplets. Four stone benches provide eight usable seats through the existing C / nearby Sit and Stand controls. Basin and benches have authored collision. Museum travel now arrives clear of the fountain at the foot of the stairs. The museum interior remains empty.
- Finish the requested apartment-window update: subtle blue-gray tint, a soft glass highlight, darker gasket/sash details, and real see-through panes on all apartment shells. New sash geometry is batched per building.

Validation: six production modules pass syntax checks; window exterior/interior render checks (49 transparent panes and one sash batch per three-storey building); museum geometry, doorway, column, partition, stair, camera, ramp-removal, paving-boundary, fountain collision and animated water checks; raycasts agree with landing, stair, threshold and forecourt walking elevations, with one top surface at each sample; full-town walking into the museum and fountain Sit/Stand checks pass without page errors. The v114 bounded startup and rendering budget are retained.
