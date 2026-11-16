# Zerconda V5 visual asset upgrade — November 2026

## New deployable facade textures
- `realistic-assets/facades/brick-residential-premium.svg`
- `realistic-assets/facades/limestone-residential-premium.svg`
- `realistic-assets/facades/glass-office-premium.svg`

These original, repeatable 1024px facade images contain individual window panes, mullions, reflective gradients, frames, stone trim and masonry detail. They are now loaded by `world-v5-upgrade/world-v5-complete-replacement.js` via `facadeMats` and rotate across city buildings. The images are authored as SVG textures and not actual 3D geometry. Existing real CC0 PBR asphalt, paving and grass remain in use.

## Install with Airo
Deploy the latest `world-v5-complete-replacement.js` as `/world-v5/world.js`. The facade images are fetched from GitHub raw URLs; verify all three requests return 200, with correct MIME and CORS. Hard refresh / cache bust the JS. Inspect apartment facades and skyline on desktop and mobile, check UV stretching, and verify existing entry interactions.

## Honest quality status
This is an asset integration milestone, **not** completion of the photorealistic city. Realistic human avatars, physically accurate water, high-detail vehicle meshes, detailed storefront geometry, city lighting, road traffic and mobile performance remain separate development tasks. Do not promise photo-realism from SVG textures alone.
