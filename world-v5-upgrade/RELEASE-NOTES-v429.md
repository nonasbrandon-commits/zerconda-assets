Zerconda v429 — tighter mobile texture allocation

The v428 native iPhone crash remains user-confirmed unresolved. This candidate lowers coarse-pointer model/photo decoding from 256px to 128px, preserving aspect ratios, and caps the startup world texture pass at 256px instead of 512px on mobile. The latter includes generated canvas textures, which are not covered by the bitmap decode limit. Desktop texture limits remain unchanged.

Preserves v428 resident lifecycle limits, serialized model/image decoding, authored scenery and gameplay, and golf lawn cutouts. No new world geometry or external media assets.

Validation includes encoded-image header/128px sizing, option/aspect preservation, unsupported-decoder fallback, packed mobile boot and extended area travel. Actual memory measurements are in mobile-texture-qa.log. Browser emulation does not confirm native iPhone stability; physical Safari retest is required. Gate upgrade and warehouse road-edge repair remain queued behind phone stability.

Existing licensed embedded character and credits unchanged. No standalone model export. Private user recording excluded.
