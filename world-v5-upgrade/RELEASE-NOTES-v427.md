Zerconda v427 — mobile startup decode limits

- Limit mobile external GLTF model-file loads to one at a time and bitmap fetch/decode jobs to two at a time, with callback/error handling that drains the queue.
- Read PNG, JPEG and WebP dimensions from encoded headers and pass the existing 256px mobile image cap into the native bitmap decoder. Preserve aspect ratio, orientation and alpha options; retain the normal decoding fallback when resize options are unsupported.
- Release completed mobile GLTF parser references without changing the authored scene, geometry, materials or animation results.
- Show Reduced graphics enabled from the start on mobile and disable redundant mode-button reloads. A real Retry loading remains available for failed or stalled loads.
- Make the loading status easier to read and split hospital/apartment/forest setup into more specific progress messages.

All v426 golf-surface repairs and v425 driving, pedestrian, scenery and mobile changes remain. No new media assets or runtime libraries. Native iPhone crash resolution requires a physical-device retest; desktop browser emulation does not establish that result.

Validation: queue limits/callbacks/error draining/parser release; PNG, progressive-JPEG and three WebP header formats; aspect-ratio/option preservation and unsupported-resize fallback; mobile/normal/reduced/error/stall loader controls; real minified packed Safari-UA mobile startup, walking, vehicle entry/driving/camera/exit with no page errors. The packed-world test recorded model load peak1, bitmap peak2, and136 bitmap resizes at the256px limit, with no ignored resize options/fallbacks in that browser. These are browser-test results, not native iPhone confirmation.
