# REQUIRED: Zerconda character and apartment deployment (2026-11-17)

The screenshot showing BUILD 2026-11-17-clean-brick-windows-casual-shirt-trousers is the OLD code. Do not report the fix installed while that label appears.

## Install to the ACTUAL live world directory
First identify whether the user opens /world/ or /world-v5/. Deploy to the directory the live page actually uses; do not assume they are interchangeable. Back up the live directory.

Copy these files from this repository's main branch to the same live directory, preserving exact filenames:
- world-v5-upgrade/index.html -> index.html
- world-v5-upgrade/world-v5-complete-replacement.js -> world-v5-complete-replacement.js
- world-v5-upgrade/clothed-player.js -> clothed-player.js
- world-v5-upgrade/signature-apartment-buildings.js -> signature-apartment-buildings.js

Keep all other modules imported by world-v5-complete-replacement.js in that directory as well. The entrypoint is index.html importing world-v5-complete-replacement.js, NOT an older world.js. Do not mix an old HTML entrypoint with new modules.

## Acceptance criteria
1. On load, diagnostics must say BUILD 2026-11-17-original-clothed-player-v2. If the old BUILD appears, STOP: wrong deployment path, old HTML/script, or caching.
2. Inspect Network tab: world-v5-complete-replacement.js, clothed-player.js, signature-apartment-buildings.js must return HTTP 200, not 404.
3. Player must have separately modeled collared shirt, trousers and shoes; old painted-on blue bodysuit must not appear.
4. Brick apartment should have one dark pane per window bay and no floating blue geometry. Inspect both street-facing and side walls.
5. Verify desktop/mobile walking and turning, no console errors, no broken world features.
6. Publish only after screenshot verification. A code commit alone is not proof of the deployed result.

Important quality note: clothed-player.js is an original lightweight procedural character, not a photorealistic downloaded human. For photorealistic clothing and animation, a properly licensed rigged GLB must be obtained and integrated separately.
