# Zerconda v440

Replaced all four small sanitation bins with branded commercial dumpsters on paved pullout bays beside four continuous service alleys. Each alley joins two existing public roads, with original sidewalk and curb geometry cut at the mouths, a flush asphalt surface, and a separate paved dumpster bay. Nothing is placed on the grass or boardwalk. Alleys share the existing asphalt material so the town map and road-tree clearance system recognize them.

| Travel-list name | Route | Dumpster position (x,z) |
| --- | --- | --- |
| Services / Z Tattoo Alley | From the road in front of Z Tattoo, between Z Tattoo and Services, around the back of Services and along Cityview’s east side to the road north of Cityview | -371.05, -26 |
| Town Plaza East Alley | North–south along the east side of the plaza block, connecting the cross streets | 79.45, 58 |
| West Extension Service Alley | North–south beside the western premises, just east of the west boulevard, connecting the cross streets | -394.55, 52 |
| Beach Cottage Rear Alley | West–east behind the beach cottages, connecting the roads at x=-96 and x=0 | -48, 154.55 |

Added four rear-loader sanitation trucks based on the supplied PNG reference sheets. Each follows a continuous loop through its alley and back on existing public roads. Trucks stop for collection; a worker leaves the cab, opens the dumpster lid, collects a sack, carries it to the rear hopper, returns to the cab, and boards before the truck leaves. Crews are no longer stationed permanently beside bins. Trucks and dumpsters participate in player/vehicle collision; trucks yield to people and vehicles. Player cars, cabs and resident traffic recognize the sanitation trucks and workers.

Mobile keeps the nearest worker loaded, releases distant workers, serializes worker loads and starts none during player transport movement. Truck/dumpster geometry and materials are shared, distant models are hidden, and no new model/image downloads or dynamic lights are introduced. ZIP/PNG originals are not published. Existing reference-adapted MIT Rocketbox gardener rigs and fitted reflective uniforms are retained.

Validation: component simulation of truck arrival, collection/lid animation, rear loading, boarding, departure, one-worker mobile cap and unloading; truck turning clearance against neighboring building bounds; sidewalk/curb mouth cuts; full packed world boot, touch controls, actual lane clearance samples and truck movement; inline-script parse and packed/privacy audit. Native iPhone Safari validation remains pending. Services, apartment gardens and Trail SUVs remain included.
