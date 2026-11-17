# Continuous street curbs — v91

The white curb strip and paving previously shared a top plane at y=.145 and overlapped in footprint. The renderer therefore alternated their visibility at different distances. Straight sidewalk paving now starts exactly at the curb's outer edge, and the curb top is 2cm above the sidewalk. Intersection corners meet the straight runs at 14m rather than overlapping them. The two curb returns share a clean butt joint without coincident surfaces.

Validation: syntax check; geometry regression compares 264 old curb/paving overlaps with zero after the fix; 14,808 sampled street-edge positions all return a continuous curb at its expected height. Isolated WebGL near, far, and intersection views render without page errors. The game launch aliases use the v91 cache key.
