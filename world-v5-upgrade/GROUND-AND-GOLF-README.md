# Foot support and golf landscape

Skate park standing heights now cover the entire visible concrete slab, entry pad and curbs, rather than only the smaller ride boundary. Exterior surface heights reconcile overlapping sidewalk slabs. Standing placement samples the shoe footprint, allowing small steps/edges and adding 4mm sole clearance while retaining separate riding/seated placement. Golf floor height queries use a spatial index of the actual rendered/clipped turf and path triangles.

The nine-hole course adds 91 trees, approximately 18–31m tall, across two modeled broadleaf types and 3D evergreens. Geometry is instanced (five batches) and reuses existing self-hosted assets. Trees are kept clear of fairways, greens, roads, paths and clubhouse access. Existing smaller trees remain.

The stone route is widened with edging; additional branches reach each green alongside the fairways. Existing tee branches are widened. Path geometry stops at sidewalks while turf retains the wider road clearance; asphalt remains uncovered.

Validation: syntax checks; actual WebGL golf/path previews and both modeled tree loads; phone viewport full-town test measured animated character sole vertices against standing height at park slab/curbs/entry, sidewalk seam, ramp, green, tee and path. All soles matched support height. All nine tee/green connections, three tree types, tree/path clearances and uncovered roads passed without page errors. This does not add terrain deformation or inverse-kinematics foot planting.
