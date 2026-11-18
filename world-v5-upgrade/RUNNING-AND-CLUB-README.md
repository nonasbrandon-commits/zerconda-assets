# Running and club update — v103

Player running cadence increased to match visible travel better, with a stable walk/run threshold. Two lightweight shoe-contact shadows remain visible when mobile shadow maps are disabled; raised feet fade their contact. Existing shoe-vertex ground alignment remains in place. DJ arm aiming uses mixer-height targets.

Club DJ booth replaced with neon edging, animated equalizer bars, detailed decks/mixer, large speaker stacks, a lighting truss, five slowly moving colored beams, one accent light, headphones, and a DJ. Four distinct existing adult female resident models dance on the floor alongside two male residents. Female model loading is serialized and starts only while inside the ground floor; models unload after leaving the visible stage for an extended period. No new binary assets.

Front-entry couch/table moved from x3 to x6, speakers moved away from the entry, and the central front post replaced by two supports at x±4.8. The stage's backdrop post was moved beside the stage. Doorway and entry-seat checks pass.

Validation: JS syntax; isolated running animation across 48 frames (moving knee, shoe minima at ground, two visible contact shadows); rendered club scene and entrance; four distinct adult female models, a ready DJ, changing dance-leg poses, no entry seats, and no page errors. This verifies animation and visual placement, not a general frame-rate improvement.
