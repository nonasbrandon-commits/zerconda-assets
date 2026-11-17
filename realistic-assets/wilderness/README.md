# Wilderness texture sources

Both assets are from Poly Haven, under CC0: https://creativecommons.org/publicdomain/zero/1.0/ .

- `pine-sprig.webp`: a crop from the Pine Tree 01 twig diffuse and opacity maps, combined into transparent WebP. https://polyhaven.com/a/pine_tree_01
- `rock-face.webp`: Rock Face 03 diffuse, converted to WebP. https://polyhaven.com/a/rock_face_03

The terrain geometry, erosion folds, snow patches, fallback rock texture, 3D branch arrangement and forest placement are generated in `world-v5-upgrade/wilderness-landscape.js`. Trees use instancing to share geometry and materials. The north, east and west boundaries are wooded; the southern ocean horizon remains open. The guarded gate and dirt route remain clear.
