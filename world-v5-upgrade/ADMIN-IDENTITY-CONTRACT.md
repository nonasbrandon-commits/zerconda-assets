# Zerconda Admin identity and private markers

Preserve this contract when updating through Airo or other build tools. Deployment versions and display names must not become user IDs.

Existing owner identity: ownerId `admin`, provider `existing-admin`. This is the current client-side apartment identity, not a newly connected website-account ID.

Marker storage key (localStorage): `zerconda.map.markers.v2:existing-admin%3Aadmin`. Envelope: `{ownerId:"admin",provider:"existing-admin",markers:[{id,x,z,text}]}`. Keep every marker and its ID. Text limit: 20 graphemes. Other verified accounts use their own immutable provider and owner ID. Never expose Admin pins to anonymous profiles or other IDs.

Remembered login key: `zerconda.admin.remembered-session.v1`. Set only after the existing code verifier accepts the code. Reloads and deployments restore that existing browser login; explicit sign-out removes it. Do not automatically grant Admin to every player or because a marker record exists.

Legacy `zerconda.map.markers.v1` pins are merged into the Admin envelope only while the current identity is Admin. Deduplicate by marker ID. Keep legacy data as a backup; do not clear localStorage during upgrades.

These records are browser-local and scoped to the site's origin. A code update on the same origin preserves them. Moving domains, browsers, clearing storage or using a different device does not transfer them. Website account IDs and cross-device storage require the actual authenticated backend adapter; this release does not implement that connection. Airo cannot inspect a player's private localStorage merely by reading this repository.
