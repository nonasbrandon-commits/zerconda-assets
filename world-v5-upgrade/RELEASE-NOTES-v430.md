Zerconda v430 — driving memory lifetime and mobile controls

The user clarified that v429 opens on iPhone but Safari still drops out during driving. The sharper rendering candidate is held. This release keeps v429's renderer settings,128px model/photo images and256px generated-world texture budget.

During movement, full compression scans remain paused to prevent stutters. Restored distant static geometry can now reuse its existing lossless archive and release decoded/GPU buffers in a bounded per-frame sweep. No compression runs in that movement sweep. Archives retained for this purpose are limited to geometry restored after startup; startup restores retain v429's prior memory behavior. Shared geometry stays resident while any owner is nearby, and changed attribute versions are not restored from obsolete archives. Skinned, instanced and dynamic-usage geometry retain their existing exclusions. Meshes and authored vertex bytes remain available and restore when needed.

A continuous-movement fixture reproduces the prior accumulation:20regions retain28.8MB of decoded geometry in v429. The same run with this release retains1.44MB after leaving the regions and releases27.36MB without recompressing during movement. Shared visible geometry and changed vertex data remain correct. These are fixture measurements, not native-process RAM measurements. Full packed-world movement and touch checks are recorded separately. Physical iPhone driving retest is still required.

Controls includes a Mobile / touch controls overview. Every activity shows touch instructions on phones, including context hints and driving/flight panels. Desktop mouse/keyboard instructions remain available. Vehicle entry points to Exit vehicle rather than a keyboard shortcut.

Mobile HUD: the top bar is compact on foot and collapses to Menu while driving. Instructions stay in Controls. Pedals, View and Exit sit in a compact lower-left panel; Horn sits lower-right. The duplicate nearby Exit action and driving hint are hidden while the direct Exit button remains. Full walking controls return after leaving the car. Touch targets remain at least44px. Portrait/landscape/small-phone layout tests verify the compact bounds and action callbacks.

No new media. Existing licensed incorporated character/credits unchanged. Private user video excluded. Graphics sharpness, warehouse road edge and gate upgrade remain pending until native stability is confirmed.
