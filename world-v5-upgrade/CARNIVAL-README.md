# Seaside Carnival and continuous coast — v93

The open beachside lot between the ocean cottages and golf clubhouse now contains a small public carnival at x=188..274, z=112..174, with paths to the street and beach. It includes a 12-horse merry-go-round, an eight-gondola Ferris wheel, four game booths, lighting details, and midway benches. The map labels CARNIVAL. Golf tree placements reserve the whole carnival area.

Nearby tap/click actions board either ride. The merry-go-round rotates and horses rise and fall; the Ferris wheel carries the player above town while gondolas counter-rotate to stay upright. Look controls remain available. End carnival ride returns the player to its boarding point, and each ride also ends automatically after its circuit. Reset and Beach stop rides and close games.

Basketball shootout, baseball can knockdown, balloon darts, and ring toss are playable, free five-throw rounds. Tap or click the canvas to aim, adjust the power slider, then Throw. Projectiles animate and resolve against targets; scoring depends on aim and power. The basketball hoop moves. Games support misses, target removal/knockdowns, completed rounds, replay and locally saved personal bests. Baseball is a carnival can-knockdown game, not a full baseball match.

Shore repair: sand now extends continuously across the city from x=-276 to 570. Removed the two water patches that intruded north to z=155 beside the golf clubhouse and west coast. Ocean begins continuously at z=234, meeting the sand instead of leaving an exposed sky gap. Beach foot support uses matching expanded bounds; existing boardwalk support is preserved.

Validation: JavaScript syntax checks; isolated real WebGL carnival, game stalls and repaired-coast previews with no page errors. Phone-sized touch interaction tests board, move with and safely leave both rides, verify level Ferris gondolas and automatic carousel exit, play all four games through scoring hits and misses, complete rounds, replay and leave. Terrain checks report no unsupported beach sample and no ocean patch north of z=234. Existing RV park remains present. No new multiplayer backend is introduced.
