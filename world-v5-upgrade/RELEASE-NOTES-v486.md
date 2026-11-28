# Zerconda v486

Regression patch: mark the Cityview exterior as intentionally hidden while its interior is active. Distance culling, near-root restoration and alternate window renders respect this ownership flag. This prevents the exterior floor and facade from overlapping the interior, causing flickering floors and duplicate lobby doors/walls. Clear the flag on exit so the tower returns outside. Keep the existing doorway layout and all prior cab/overpass changes.

Move the level10 guest’s initial position from the bedroom to the clear lounge node4.2,0.1, making her visible after arrival.

Validation: real full-game lobby and level10 checks, alternate camera/window visibility, screenshots of one visible floor/shell, guest loaded in lounge, and three consecutive entry/exit cycles. Exterior stays hidden inside and visible outside in every cycle. No new media. Larger tower, character pose and wall finish changes are separate work.
