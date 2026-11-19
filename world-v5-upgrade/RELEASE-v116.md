# Julie Brown · local news anchor

Replace the cartoon presenter with the user-supplied portrait processed to remove the background, stored as a transparent PNG. Julie Brown appears on the Zerconda Tonight broadcast screen and the written bulletin panel. Rename the anchor, on-screen credit, audio controls, and spoken introduction throughout.

Make female narration more upbeat: conversational 1.04 pace, moderate 1.13 pitch, and 0.95 volume. Prefer natural/enhanced English female system voices, with a friendly local-news introduction. The audio remains device speech synthesis, not a recording or imitation of the person in the portrait. No male default fallback is selected if a female voice is unavailable.

The photo loads asynchronously without gating town entry. Main-screen and ticker textures reconnect to their live canvases after mobile texture optimization. The portrait and nameplate stay within their own screen column without covering headlines or the footer. All museum, fountain, apartment window, and startup updates are retained.

Validation: JavaScript syntax checks; real PNG loading and billboard rendering; bulletin portrait/alt text, Julie Brown identity, absence of the former presenter name; mocked speech API confirms selection of a natural female voice and the revised pace/pitch; stop/close controls; mobile panel bounds; live canvas reconnection after a simulated texture replacement. Actual voice availability and sound depend on the user's device.
