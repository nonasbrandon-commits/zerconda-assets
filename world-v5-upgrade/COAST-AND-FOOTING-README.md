# Pedestrian footing, clubhouse clearance and wall-to-wall boardwalk — v94

The scooter rental foundation, porch and courtyard now report their actual slab tops (.20m, .15m and .03m). Pedestrians use the same sampled shoe support as the player and reverse direction before blocked shop walls; actors initially inside a blocked footprint relocate to the adjacent sidewalk. Actual animated shoe vertices stay .004m above support on the shop porch, scooter court and sidewalk.

The golf clubhouse moved from (294,140) to (360,145), farther along the coast and away from the carnival. The visible stone cart loop and its automated carts share one rerouted curve, keeping the entire carnival footprint clear and passing outside the clubhouse and porch. Golf groves reserve the relocated clubhouse's space.

The beach boardwalk spans the inner wall faces from x=-275.1 to 569.1 at z=181..191. Its 402 planks use a single instanced mesh. Ground support matches the .215m plank top across the full width and takes precedence over the lower carnival access slab at their join. The town map includes the extended boardwalk.

Validation: syntax checks; full-world runtime tests of animated shoe vertices on three surfaces, pedestrian wall avoidance, preservation of the carnival; 20,000 samples of the complete cart curve find no carnival or clubhouse conflicts and at least 10m clearance from the clubhouse structure. Full-length boardwalk samples find no blocked or unsupported walking points. Isolated WebGL previews verify boardwalk extension and clubhouse spacing. Test-only world inspection hooks are not published.
