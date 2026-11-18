# Mouse running and clear club entrance — v104

Repeated mouse-wheel movement previously exceeded a displacement threshold intended to detect teleports. The avatar was consequently animated as idle while still moving. Locomotion animation now measures distance produced by the walking/scroll controls during that frame, excluding teleports by construction. Mouse input and combined inputs are limited to the existing 5.3 m/s running speed so the body cannot move faster than its run cycle.

Ground fallback previously began at zero and used maximum surface heights. Negative-height grass surfaces (-0.10 m in the central district and -0.19 m on the mainland) could never lower this value, leaving feet above the visible turf. The fallback now starts at negative infinity and selects the actual surface height. Avatar surface height is assigned before foot alignment.

The streetlight at the club's arrival lane (-48,-11.5) moved to (-58,-11.5). Removed the WELCOME · WALK IN OR PRESS E banner. Club stage, dancers, and previously cleared interior entrance remain intact.

Validation: syntax checks and full-world Chromium test with repeated actual wheel events, fixed 30 Hz simulation steps, no page errors. Recorded movement 5.3 m/s, nonzero knee-cycle motion, rendered-pose shoe height matching support height, negative-height grass correctly resolved, no lamp in the door lane, and relocated lamp present. Rendered entrance confirms clear access and removed banner. Actual user-device confirmation is still useful for subjective movement feel.
