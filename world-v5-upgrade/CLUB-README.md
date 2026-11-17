# Club Zerconda

Two-floor club behind Zerconda Motors, centered at world (-48, -24), with the entrance on the west side at (-79, -24). The building footprint stays between existing streets and behind the dealership.

Controls: E enters/exits; C sits/stands near a lounge sofa; B toggles the authored dance animation on the dance floor. Walk up the east stairway to the games floor. Pool and darts show a play button nearby. Escape closes a game.

Games: casual 8-ball uses sixteen balls, collision impulses, cushions, friction, six pockets, scratches, solids/stripes and an 8-ball finish. Darts uses the standard sector order, doubles/triples/bulls and 301 double-out. Shared room events synchronize table state; these are casual games rather than an authoritative competitive server.

Social: live text, visitor positions and game snapshots use signed ephemeral Nostr events through three public WebSocket relays. No app-side message history is stored. Visitors choose a display name; this room does not create an authenticated account. Optional microphone audio uses Trystero/WebRTC; a direct-connection failure leaves text working and reports that voice is blocked. Production voice across restrictive networks needs configured TURN service.

The public relay connections are made only while a visitor is in the club; microphone capture starts only when Enable voice is pressed. Leaving stops microphone tracks and closes room connections. Exterior rendering is reduced while inside, then restored on exit.

The dance animation is Microsoft (2020), MIT, from the same CodeLove conversion collection as the existing rigged characters. Its license remains in realistic-assets/characters/casual-human/LICENSE.txt. Runtime libraries: nostr-tools 2.15.0 and Trystero 0.27.0, loaded from esm.sh.

Run game regressions with `node --test world-v5-upgrade/club-games.test.mjs`.
