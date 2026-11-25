# Account apartment preview

The existing west-side brick apartment building now has a compact ground-floor elevator lobby. The elevator opens directly into a furnished one-bedroom apartment, with no residential corridors or unit numbers. The shared apartment template is approximately 78.5 m² / 845 ft² after the requested circulation expansion, with living room, kitchenette, bedroom, bathroom, seating, automatic bedroom/bathroom sliding doors and a rest-enabled upholstered bed with draped quilt and throw. Furniture is original procedural geometry, batched by material; scenic artwork reuses the existing garden image.

## Admin access

Player menu → Homes → Go to my free apartment. Use the existing Admin access code when prompted. The same destination also appears in Admin properties as “Admin · Free apartment.” Walking into the brick building and using its elevator reaches the same home. The return elevator leads to the lobby; walk through the entrance to return outdoors. Sign-out exits the private apartment.

The preview is bound to the reserved `admin` identity and home key `starter/admin`. Display names do not determine this key. The assignment record is browser-local, like the existing Cityview ownership system; the Admin preview can be recreated using the same Admin sign-in on another browser, but local state does not synchronize.

## Online account integration still required

The current game has browser-saved profiles and local Admin PIN validation, not server-authenticated resident accounts. This release does not claim to create permanent email accounts, enforce paid/free billing tiers, or provide server-secured cross-device ownership. The access adapter deliberately does not assign a home from an editable profile name or a browser-generated guest ID. A future backend must supply a verified account subject and enforce ownership server-side before enabling automatic free-user provisioning, persistence and multiplayer instance authorization. The geometry and elevator can reuse one interior without expanding the exterior building.

Existing paid homes and Cityview remain available. No new network service, billing system, email collection or signup flow is introduced.

## Furniture references

The user supplied Zerconda_Studio_Apartment_Assets.zip (8 room-view PNGs, 6 isolated item PNGs and the original image). These are visual references, not downloadable GLB/FBX meshes. The worn brown leather sofa/foam wear, aged table finish and three-drawer bedside cabinet were adapted in the original procedural furnishings. The later requested cream quilted bedroom reference takes precedence over the ZIP's plaid bedspread.
