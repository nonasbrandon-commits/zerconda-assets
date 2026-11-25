# Startup staging v405

Core buildings, collision and the saved-area restore still initialize before entry. Optional populate() work now waits until 1.2 seconds after the first playable frame. It no longer competes with loading-screen shader and texture preparation, and optional scenery completion is not an entry prerequisite. Character readiness and actual painted frames remain required; no timer forcibly dismisses the loading screen. The loading message identifies character/first-view preparation and offers retry after 30 seconds instead of 90. No save data is deleted. Roads, apartment entrance and account logic remain unchanged.

Normal unforced full-world startup verified in Chromium, with no overlay removal, readiness overrides or page errors. Cold software-rendered startup is still substantial, roughly a minute in this environment; this is a staging improvement, not a promise of instant loading.
