# Apartment visibility repair

The street-facing apartment entrance paths deliberately reach the public sidewalk. The generic road-intrusion cleanup used the bounds of the whole building group, including that path, and consequently removed all four apartment groups after creation. The apartment records and interactive interiors still existed, which masked the deletion in earlier navigation tests.

Apartment exteriors now declare an authored building/canopy envelope. Road cleanup validates that structural envelope, while allowing the pedestrian path to meet the sidewalk. It still rejects real building intrusions. This does not disable road safety or remove the spacious interiors, real town-view windows, street entrances, saved claims, or modern homes.

Regression checks run after the full town startup/cleanup: all four exterior groups must remain attached to the scene and visible; repeated cleanup removes zero apartments; entering/leaving apartments, the boutique, and bowling restores their visibility; a synthetic building placed in a road must still be removed.
