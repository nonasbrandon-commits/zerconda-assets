# Zerconda V5 — GoDaddy Airo installation

Target URL: https://zerconda.com/world-v5/

## Deploy these seven files

Source repository: https://github.com/nonasbrandon-commits/zerconda-assets

| GitHub source | Destination on GoDaddy |
|---|---|
| `world-v5-upgrade/index.html` | `/world-v5/index.html` |
| `world-v5-upgrade/world-v5-complete-replacement.js` | `/world-v5/world-v5-complete-replacement.js` |
| `world-v5-upgrade/realistic-fountain.js` | `/world-v5/realistic-fountain.js` |
| `world-v5-upgrade/observation-needle.js` | `/world-v5/observation-needle.js` |
| `world-v5-upgrade/cloud-sky.js` | `/world-v5/cloud-sky.js` |
| `world-v5-upgrade/city-depth-assets.js` | `/world-v5/city-depth-assets.js` |
| `world-v5-upgrade/nine-building-styles.js` | `/world-v5/nine-building-styles.js` |

The Observation Needle near (48,-48) has a ground elevator. Walk near its entrance and press T (or tap the on-screen button) to travel to the 90-meter viewing deck. Press T again to descend. The deck has 360-degree views and a walkable safety-railed perimeter.

Do not mix this build with an old `world.js` or old `index.html`. The new HTML already includes a pinned Three.js import map, desktop/mobile controls and the correct module entry point. Keep the paths and filenames identical. The 3D assets and photo textures are loaded from the public GitHub repository by absolute URL and do not need to be copied to GoDaddy.

## Acceptance test

1. The scene renders city roads, textured buildings, cars and leafy trees within 15 seconds.
2. The fountain loads at (48,48), with stone paving and water jets.
3. No JavaScript errors or blue-sky-only screen. The on-screen diagnostics must show nonzero draw calls and triangles.
4. WASD, drag-to-look, R to reset, E to enter car and mobile movement buttons work.
5. The fountain basin blocks movement, but paving remains walkable.
6. Check a desktop browser and a phone; hard-refresh after deployment.

If a check fails, report the exact browser console error and screenshot. Do not replace missing assets with primitives, disable WebGL, or publish a broken build.

## Current quality boundary

The old fountain GLB is deliberately no longer loaded because it rendered as a solid black shape. The replacement fountain is generated from textured stone geometry. The tower has been reshaped to better match the homepage reference; neither model is a photogrammetric replica. Do not advertise it as photorealistic until visually reviewed.

## Source verification

GitHub Actions workflow `Browser render test for Zerconda V5` launches Chromium, renders the exact HTML entry point and uploads a screenshot. Review its latest result before installing. Workflow `Verify Zerconda V5 scene and assets` checks syntax and required files.
