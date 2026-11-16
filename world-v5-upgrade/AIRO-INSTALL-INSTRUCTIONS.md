# Zerconda V5 plaza integration — Airo instructions

Target existing page only: https://zerconda.com/world-v5/

The files in this repository are NOT automatically installed on GoDaddy. Preview changes before publishing.

## Assets now committed
- `realistic-assets/plaza-assets/`: real Poly Haven CC0 marble bust, planter box, flowering plant, painted wooden bench, lantern, plus required glTF .bin and texture dependencies.
- `realistic-assets/trees-and-vehicles/trees/`: real leafy GLB trees.
- `realistic-assets/trees-and-vehicles/vehicles/`: real generic GLB cars.
- `world-v5-upgrade/plaza-upgrade.js`: new city-center fountain, parking/tree placement and opening-door implementation.

## Install code
1. Copy `plaza-upgrade.js` next to the existing `world.js` in the staging copy of `/world-v5/`.
2. Add near the top of `world.js`:
   `import {installPlazaUpgrade} from './plaza-upgrade.js';`
3. After building construction and BEFORE spawning any trees or cars:
   `const plaza=installPlazaUpgrade({THREE,scene,buildings,cars,treeSpots,carSpots});`
   Ensure the `cars`, `treeSpots` and `carSpots` arrays have already been declared. Move the initialization if needed.
4. REPLACE the old tree spawn loop with:
   `plaza.safeTreeSpots.forEach(([x,z],i)=>{const src=assets[i%3===0?'treeAlt':'tree']||assets.tree||assets.treeAlt;if(src)cloneModel(src,x,z,7+rnd()*3,rnd()*6.28);});`
   This line belongs inside `populate()` AFTER the `assets` object has been loaded. Do not spawn trees in the old unfiltered `treeSpots` loop.
5. REPLACE the old car spawn loop with:
   `plaza.safeCarSpots.slice(0,5).forEach(([x,z,angle],i)=>{const key=i===4?'sports':i%2?'sedanWhite':'sedan';const src=assets[key]||assets.sedan||assets.sedanWhite;if(!src)return;const g=cloneModel(src,x,z,1.6,angle);if(g)cars.push({group:g,x,z,angle,speed:0});});`
   Do not run the original `carSpots.forEach` loop or cars will double-spawn.
6. Inside `animate()`, after computing `dt`, call:
   `plaza.update(dt,player);`
   This animates water and opens/closes building doors as the player approaches.
7. If your buildings already contain a static doorway mesh, remove or hide the mesh in the door opening; otherwise the new moving doors will appear blocked. Add proper doorway openings to the solid wall geometry (CSG or separate wall segments) before claiming walk-through interiors.
8. Replace procedural benches, flower planters, statues, and lanterns around the plaza with the real models in `realistic-assets/plaza-assets/`. Preserve each model's .gltf, .bin and texture-relative paths. Use GLTFLoader and normalize sizes before placement. Position around the plaza outside fountain radius 9 meters; keep 3m-wide accessible pedestrian paths.
9. The fountain is currently procedural geometry with transparent water and animated jets, NOT a downloaded photorealistic fountain asset. Review visual quality and upgrade water shader/normal maps if necessary.
10. Verify cars are separated by at least 8.5 meters, trees are outside roads, doors rotate correctly, fountain is in the block centered at (48,48), player can approach without clipping, and mobile performance is acceptable.
11. Do NOT publish or overwrite the live page until visual testing passes.

## Important limitations
The doors currently animate when the player is nearby but the original solid building wall must be rebuilt with actual doorway openings for entry. This patch does not implement interiors, persistent ownership, or network multiplayer. Vehicle steering and collisions remain the responsibility of the main world.js.
