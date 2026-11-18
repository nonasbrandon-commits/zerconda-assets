# Fort Zerconda — v102

Northern wall moved from z=-1000 to -1350. The forest now extends to the new wall, with 3800 instanced desktop trees (1800 mobile), additional undergrowth, a broad North Ridge loop, and a rerouted Hidden Pines trail. Trees and shrubs avoid the base, perimeter patrol routes, and its 12m gravel access road.

The compound is x315..545, z-1270..-1060, tucked into the northeast forest. A 506m gravel driveway joins the airport perimeter road. The compound includes a command center, five curved-roof barracks/hangars, guardhouse, four watchtowers, water tower, supply crates, three utility trucks, and a helicopter pad. Static geometry is batched by material; six realistic guards load only when approaching and animate only nearby.

The front gate starts closed. The checkpoint action calls the host's synchronous `window.zercondaAccess.hasClearance('military-base')` and requires a strict `true`. Missing or failing checks deny entry. Approved checks open the gate for 16 seconds; it stays open while an approved visitor is inside. Revocation closes the gate and returns the player to the checkpoint. Perimeter collision and building collision apply to ordinary game movement. No player-facing control grants clearance.

This static GitHub Pages game has no authoritative account/role backend. The clearance callback is an integration point for that system; client-side checks alone cannot secure multiplayer access against a modified client. A multiplayer host must validate clearance and position server-side.

Validation: syntax checks; isolated render at aerial and checkpoint angles; six loaded guards; denied/approved/revoked clearance; gate/fence/building collision; no trees or shrubs in reserved areas; no walking paths inside the base; sampled public paths and gravel road clear. Full-world mobile emulation verified the new wall boundary, public North Ridge path, access road, ground heights, and denied base entry without page errors.
