# Existing-world rendering upgrade — internal build v409

This updates the existing game and entry links. No second world or new public launch page is created. Buildings, roads, coordinate systems, movement, interaction, inventory, economy, account checks and existing network code remain. The earlier requested furniture moves are the only authored layout edits in this change: living side table at the wall, breakfast table/stools to the wall beside the kitchen, bedside drawers facing the room, dark four-pane sky-view windows, shower curtain/rail removed.

## Rendering audit and changes

The game already used Three.js r160, MeshStandardMaterial PBR, ACES filmic tone mapping, sRGB output, several normal/roughness maps, distance-managed models, frustum culling and instancing. These are retained rather than replacing the city or its detailed assets.

Added an asynchronous HDRI/PMREM environment for exterior reflections and diffuse lighting, with a room environment probe for interiors/fallback. HDRI loading does not block the first playable frame. Existing sky, time/light direction and authored scene textures are retained. High/Ultra upgrade eligible transparent building glass to a clearcoat physical material without an expensive full-scene transmission pass. Metallic surfaces gain environment reflections. Missing major-surface normal/roughness detail is added without replacing photographic/albedo textures.

Presets in the existing Player → Settings panel:

| Preset | Effects |
| --- | --- |
| Low | PBR/environment lighting, original detailed assets, reduced resolution/light cost; no post-processing or sun-shadow map |
| Medium | Local 1024px soft sun-shadow map, shadow receivers, FXAA, adaptive resolution |
| High | 2048px local soft shadows, physical glass, selective emissive/sign bloom, FXAA |
| Ultra | High features plus screen-space ambient occlusion for contact/corner shading |

Bloom extraction restores all original materials and background even on errors; ordinary surfaces and sprites are excluded. Unsupported HDR render targets/depth textures skip their corresponding optional effects. The HDR render chain applies ACES/sRGB once at output. Sun shadows follow the player, use a small local frustum and bounded nearby casters; instanced forest batches do not all become shadow casters. Shadow/caster bounds and shared materials are cached. Existing forest/model assets and instancing remain. Forest tile visibility now uses actual bounds and per-preset distance caps, with preserved authored LOD distances scaled by quality; adaptive overload also tightens the distance budget. Interior local-light selection now refreshes while walking and when lazy-built rooms add fixtures. Collision geometry and coordinates are unchanged.

Frame time controls resolution with hysteresis. Sustained slow rendering disables expensive post effects/shadows, with later recovery. The first visibility classification is processed cooperatively with a1.2second cap before first draw, instead of spending early frames drawing far-away roots while the incremental queue catches up. Shader warmup is excluded briefly after a manual preset change. Long active stalls are counted; auth-dialog pauses explicitly suspend timing. Software renderers automatically start in safe Low rather than attempting desktop post effects. Mobile resolution is capped; Ultra AO is not enabled on mobile. Presets can still be selected from the existing settings.

## Assets and compression

New asphalt normal/roughness maps are UASTC KTX2 with mipmaps, loaded asynchronously with canvas fallbacks; authored albedo textures stay unchanged. KTX2/Basis decoding is connected to the central GLTF loader and has been tested with an actual compressed texture through transcode and GPU upload. Local versioned Basis JS/WASM files avoid relying on a decoder CDN. Existing detailed GLBs remain. The ambulance already uses EXT_meshopt_compression, EXT_texture_webp and KHR_mesh_quantization. Re-encoding preserved all 50,000 triangles/bounds but increased its file size by160bytes, so the original was retained. The new road-detail maps are compressed; this release does not claim every existing texture was converted to KTX2. The offline encoder script uses the upstream Basis Universal encoder; the 3.4MB build-time encoder is not shipped to browsers.

- HDR environment: Royal Esplanade, HDRI Haven/Poly Haven, CC0; distributed with three.js examples. Source: https://raw.githubusercontent.com/mrdoob/three.js/r160/examples/textures/equirectangular/royal_esplanade_1k.hdr
- Three.js and examples: MIT, existing dependency. Source: https://github.com/mrdoob/three.js/tree/r160
- Basis Universal transcoder: upstream Apache2.0 license retained in assets/basis-v409/LICENSE.txt. Source: https://github.com/BinomialLLC/basis_universal
- All previous model/texture credits remain applicable.

## Startup recovery

The loader shows the internal build, actual download count, named construction/graphics stage and elapsed seconds. Global startup errors and context loss become visible instead of leaving an unexplained wait. Reduced-graphics reload and a town-plaza recovery option are available. Plaza recovery bypasses the saved position for that session and does not overwrite it. Ordinary saves are also blocked before the game is playable. No code, owner ID or profile is erased.

## Validation and limits

Actual WebGL preset screenshots and GL error checks cover HDRI, metal, physical glass, shadow receivers, FXAA, emissive-only bloom and Ultra SSAO. A real KTX2 file is transcoded and uploaded. A slow-frame simulation lowers resolution and disables expensive effects. Full production packed startup, access input, all four Settings options and safe software-renderer Low have been tested; plaza recovery is checked against an unchanged saved pose. Apartment reachability, lift reset/return, drawers/table/window visuals remain checked.

Test scenes are fixtures, not replacements for the city. Headless software rendering is not a user-hardware FPS benchmark. Ultra is optional and can fall back when the device cannot sustain it. No claim is made that browser rendering matches GTA's native renderer or that an online account/multiplayer backend was added.

## Build/deployment

The current existing game page and all legacy launch aliases receive the new HTML. No launch-v409.html is published; that filename is a local staging fixture only. The entry continues to load checksum-verified compressed ESM chunks with versioned filenames. Source changes require rebuilding/repacking; keep every older release's chunks for cached pages. The build and pack scripts accept the existing launch-v408.html when the local staging HTML is absent. Asset/model/texture coordinates are not regenerated by the graphics pipeline.
