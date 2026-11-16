# Zerconda V5 — GoDaddy Airo installation

Target URL: https://zerconda.com/world-v5/

## Deploy these ten files

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
| `world-v5-upgrade/brewstone-coffee.js` | `/world-v5/brewstone-coffee.js` |
| `world-v5-upgrade/apartment-interiors.js` | `/world-v5/apartment-interiors.js` |
| `world-v5-upgrade/zerconda-dealership.js` | `/world-v5/zerconda-dealership.js` |

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


## Zerconda Motors showroom
Deploy `zerconda-dealership.js` alongside `world.js`. Its sign texture loads from `realistic-assets/dealership/zerconda-motors-sign.svg` on the GitHub raw URL. Verify E ENTER DEALERSHIP beside Brewstone Coffee, all three showroom vehicles, and E EXIT DEALERSHIP. This is a 3D showroom, not a flat image billboard.

## Commercial block layout and entry controls
The newest `world-v5-complete-replacement.js` reserves the block west of the Observation Needle for Brewstone Coffee and Zerconda Motors. An 8m access road separates the two buildings. Remove all old duplicated world spawn scripts. The coffee shop requires E ENTER before C SIT; the dealership requires E ENTER before inspecting display cars; apartment buildings require F ENTER. Check brick facade proportions and ensure no building overlaps either business. Keep the same import map and deploy the newest complete file, not partial snippets.


## Dealership visual upgrade — November 16, 2026
Install these files alongside world.js (ES module relative imports):
- `world-v5-upgrade/zerconda-dealership.js` -> `/world-v5/zerconda-dealership.js`
- `world-v5-upgrade/detailed-fictional-cars.js` -> `/world-v5/detailed-fictional-cars.js`
- `world-v5-upgrade/air-dancers.js` -> `/world-v5/air-dancers.js`
- `world-v5-upgrade/observation-needle.js` -> `/world-v5/observation-needle.js`
- `world-v5-upgrade/world-v5-complete-replacement.js` -> `/world-v5/world.js`
- Sign image: `realistic-assets/dealership/zerconda-auto-center-sign.svg` (loads from GitHub raw URL).
Verify five cars (three indoors, two outdoors), E entry/exit, sign loads without 404, three moving orange inflatable figures, observation deck access, and no collision with cafe or roads. The inflatable dancers are modeled animation, not photographic assets. These vehicle meshes are a geometry upgrade, not photo-real car scans. Clear cache and check browser console errors.
