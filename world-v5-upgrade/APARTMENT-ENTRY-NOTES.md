# Apartment entry, camera and startup v406

The public glass lobby keeps the actual outside world visible. Only the private upstairs unit isolates exterior rendering. The lobby floor ends exactly at the porch landing, removing the coplanar overlap at the threshold.

Apartment cameras resolve exact wall geometry before smoothing and use a damped boom length. Removed the quantized walking-grid camera clamp and the second competing camera correction. Close head geometry is hidden when a wall requires a short boom. Camera collision still includes bedroom/bathroom sliding leaves.

Kitchen refrigerator is against the rear wall. Table and two stools are against the left wall; their colliders move with them. Standalone armchair removed. Narrow wall gap closed by extending the bathroom wall to the bedroom wall, preserving access via the main room. Lamp now has a fabric drum shade, metal base/stem/rims and warm glow. Toilet has a hollow ceramic bowl, oval seat, rounded pedestal/tank/lid, water and flush handle. Batched geometry, no high-resolution external models.

## Packed loading (important for future releases)

The launch page now loads eleven checksum-verified binary pieces of one gzip-compressed, self-contained ESM build. This replaces the 444-module dependency graph, including Three.js, with 1,080,298 compressed bytes. The Blob module retains original asset URL bases via the build's import.meta.url definition. Existing models/textures and saved-area storage remain. Browsers without DecompressionStream use the normal source module.

The source main/module files remain authoritative editable sources, but edits do not update the packed launch until rebuilt. Local build.cjs uses esbuild, the launch import map, a module cache and local overrides. Rebuild world-bundle, gzip with mtime=0, split into 98,304-byte parts and regenerate launch checksum metadata after changes. A future release must use new versioned pack filenames and launch URL. Do not overwrite pack chunks used by older cached launches. ES module legal comments, including Three.js notices, are preserved in the packed code.

Validation: isolated room rendering and reachability, sliders/elevator/ownership checks; actual full-world lobby outside visibility, exactly one threshold floor surface, 2,394 road samples, precise camera wall clearance plus stationary stability, Admin Homes/signout/fast travel. A test running two full worlds exceeded the environment's 8GB memory cap; full-world tests must run sequentially. Packed startup is tested independently without readiness overrides.
