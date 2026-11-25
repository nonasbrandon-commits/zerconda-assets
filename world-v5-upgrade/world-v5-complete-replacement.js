import {enhanceMajorSurfaces} from './surface-detail.js?v=20261125-graphics-v410';
import {createRenderingUpgrade} from './rendering-upgrade.js?v=20261125-graphics-v410';
import {createStarterApartments} from './starter-apartments.js?v=20261125-entry-v410';
import {createBrickApartmentsExterior} from './brick-apartments-exterior.js?v=20261125-campus-v404';
import {createVenueAccessRoads} from './venue-access-roads.js?v=20261125-straight-v410';
import {createGunsAmmoStore} from './zerconda-guns-ammo.js?v=20261125-facade-v410';
import {createWeaponGame} from './weapon-game.js?v=20261125-story-v410';
import {createZercondaHospital} from './zerconda-hospital.js?v=20261125-service-v410';
import {createOutdoorVisibility} from './outdoor-visibility.js?v=20261125-graphics-v410';
import {createBeachKate} from './beach-kate.js?v=20261125-indoor-v387';
import {posePoleSlide} from './pole-slide-pose.js?v=20261125-pole-v379';
import {createGamepadControls} from './gamepad-controls.js?v=20261125-store-v389';
import {createPlaywarehouseGame} from './tag-playwarehouse-game.js?v=20261125-slide-controls-v379';
import {createVenueRenderIsolation} from './venue-render-isolation.js?v=20261125-transition-v379';
import {createCanopyVenue} from './canopy-venue.js?v=20261125-campus-v404';
import {createBoardwalkFitness} from './boardwalk-fitness.js?v=20261124-repairs-v369';
import {createCoffeeCustomers} from './coffee-customers.js?v=20261124-customers-v358';
import {createCharacterThumbnails} from './character-thumbnail.js?v=20261124-portraits-v360';
import {collectAdminCharacters,deleteAdminCharacter,restoreAdminCharacters,deletedAdminCharacterCount,enforceAdminCharacterDeletions} from './admin-character-roster.js?v=20261125-filters-v382';
import {createPropertyThumbnails} from './property-thumbnail.js?v=20261124-menu-v352';
import {createAdminDashboard} from './admin-dashboard.js?v=20261125-filters-v382';
import {createAdminWorldControls} from './admin-world-controls.js?v=20261124-menu-v352';
import {createStyleCutsGrove} from './style-cuts-grove.js?v=20261124-helmets-camera-v341';
import {applyPowersportsRiderPose} from './powersports-rider-pose.js?v=20261124-driving-v339';
import {createCityviewApartments} from './cityview-apartments.js?v=20261125-starter-v403';
import {createAdminAccount} from './admin-account.js?v=20261125-access-v410';
import {getManagedPrivateHomes,managePrivateHome} from './private-home-locks.js?v=20261124-cityview-v326';
import {collectHomeLocations} from './home-location-names.js?v=20261124-homes-v322';
import {createNeighborhoodResidents} from './neighborhood-residents.js?v=20261124-neighborhood-v316';
import {installPremiumGameUI} from './premium-game-ui.js?v=20261124-boardwalk-v314';
import {createSunglassesHut} from './sunglasses-hut.js?v=20261124-repairs-v369';
import {createMountainWilderness,updateMountainWilderness,mountainHeightAt,mountainWalkable,extraForestBlocks} from './mountain-wilderness.js?v=20261124-trails-v307';
import {trackTrailExploration} from './trail-discovery.js?v=20261124-trails-v307';
import {updateCaveLife} from './cave-life.js?v=20261124-remains-v306';
import {createWatercraftMouseControls} from './watercraft-mouse-controls.js?v=20261123-waterfront-v285';
import {createChessPartner} from './chess-partner.js?v=20261123-town-v282';
import {clearPedestrianPathMarkings} from './path-markings.js?v=20261123-pier-reference-v274';
import {createPowersportsCenter} from './zerconda-powersports.js?v=20261123-powersports-v273';
import {createFortuneShadeTrees} from './fortune-shade-trees.js?v=20261124-garden-v365';
import {createKateConversation} from './kate-conversation.js?v=20261123-town-v282';
import {createNeedlePlaidResident} from './needle-plaid-resident.js?v=20261123-town-v282';
import {createBoardwalkWalker} from './boardwalk-walker.js?v=20261124-repairs-v369';
import {createCrowdSpacing} from './crowd-spacing.js?v=20261123-space-v265';
import {applyPlayerSeatPose} from './player-seat-pose.js?v=20261123-boardwalk-v269';
import {createFountainResident} from './fountain-resident.js?v=20261123-boardwalk-v269';
import {hiddenPassageHeightAt,cutCaveTerrain} from './concealed-cavern.js?v=20261124-trails-v307';
import {createHiddenForestPassage} from './hidden-forest-passage.js?v=20261123-floor-v295';
import {createForestGroundCover,unifyForestGround} from './forest-ground-cover.js?v=20261125-budget-v380';
import {clearRoadSidewalkOverlaps} from './road-surface-joins.js?v=20261123-town-v282';
import {createForestLandmarkRock} from './forest-landmark-rock.js?v=20261123-roads-v261';
import {createAbandonedTransport} from './abandoned-transport.js?v=20261123-return-v258';
import {loadConceptSUV,createConceptSUV} from './concept-suv.js?v=20261122-concept-suv-v256';
import {yieldStartup} from './startup-yield.js?v=20261122-startup-v253';
import {createControlGuide} from './control-guide.js?v=20261125-store-v389';
import {createAdminTransport} from './admin-transport.js?v=20261122-admin-transport-v245';
import {createForestGravelRoads} from './forest-gravel-roads.js?v=20261123-natural-v264';
import {ambientResidentsAllowed} from './ambient-resident-areas.js?v=20261122-listings-v238';
import {createMilitaryAdminAccess} from './military-admin-access.js?v=20261122-listings-v238';
import {createGravelTireAudio} from './gravel-tire-audio.js?v=20261122-listings-v238';
import {availablePropertyListings} from './property-listings.js?v=20261122-controls-v246';
import {createResidentialShadeTrees} from './residential-shade-trees.js?v=20261122-trail-v228';
import {createBedRest} from './bed-rest.js?v=20261122-private-homes-v214';
import {allowPrivateHomeAt,allowPrivateHome,privateHomeBlocks,updatePrivateHomes} from './private-home-locks.js?v=20261122-private-homes-v214';
import {installOwnedHomeLocks} from './property-lock-setup.js?v=20261122-balcony-v220';
import {createMuseumGardenTrees} from './museum-garden-trees.js?v=20261125-porch-v390';
import {createHouseSunShadows} from './house-sun-shadows.js?v=20261121-house-realism-v212';
import {createRoadTreeMaintenance} from './road-tree-maintenance.js?v=20261122-apartments-v229';
import {createChessTables} from './chess-tables.js?v=20261123-town-v282';
import {createRealEstate} from './real-estate.js?v=20261122-listings-v238';
import {loadStreetTree} from './street-tree-assets.js?v=20261121-fast-start-v205';
import {createAmbientTraffic} from './ambient-traffic.js?v=20261123-traffic-v272';
import {createRoadMapGeometry} from './road-map-geometry.js?v=20261123-waterfront-v271';
import {createAreaResume,createSceneryYield} from './resume-area.js?v=20261121-fast-start-v205';
import {createCityResidents} from './city-residents.js?v=20261124-proportions-v353';
import {createPerimeterForest} from './perimeter-forest.js?v=20261123-hidden-v262';
import {updateTreeBreeze} from './tree-breeze.js?v=20261121-forest-airfield-v193';
import {createTownSidewalkMaterial} from './town-sidewalks.js?v=20261121-forest-airfield-v193';
import {createPlayerCameraGuard} from './player-camera-guard.js?v=20261121-town-v191';
import {applyRealisticGrass,createRealisticGrass} from './realistic-grass.js?v=20261121-town-v191';
import {createCabPassengerCamera} from './cab-passenger-camera.js?v=20261121-town-v191';
import {createVehicleHorns} from './vehicle-horns.js?v=20261121-town-v191';
import {measureVehicleFootprint,vehicleDescriptor,vehiclePoseBlocked,sweepVehiclePose} from './vehicle-collision.js?v=20261121-town-v191';
import {createShaderWarmup} from './shader-warmup.js?v=20261125-access-v410';
import {loadReferenceProp} from './reference-props.js?v=20261120-reference-props-v180';
import {createZCabs}from './z-cabs.js?v=20261125-cab-map-v379';
import {createLuxurySedan,loadLuxurySedan,sedanColors} from './luxury-sedan.js?v=20261120-restore-silver-v185';
import {createBeachVisitors} from './beach-visitors.js?v=20261124-repairs-v369';
import {positionBeachLoungeCamera} from './beach-lounge-camera.js?v=20261119-coastal-breeze-v154';
import {applyBeachLoungePose} from './beach-lounge-pose.js?v=20261119-beach-seating-v151';
import {addVehicleLOD} from './vehicle-lod.js?v=20261120-z-cabs-v178';
import {optimizeStaticModel} from './static-model-batching.js?v=20261121-tree-geometry-v209';
import {beginHomePassage,updateHomePassage,homePassageActive,cancelHomePassage} from './home-passage.js?v=20261119-performance-v147';
import {updateReferenceLampLights} from './reference-lamp.js?v=20261119-performance-v147';
import {improveVehicleCabin} from './vehicle-cabins.js?v=20261119-cabin-v137';
import {createPlayerAppearance} from './player-appearance.js?v=20261122-shirt-mask-v219';
import {createCameraClearance} from './camera-clearance.js?v=20261122-apartments-v229';
import {createSignBackMaintenance} from './readable-signs.js?v=20261122-rug-v248';
import {createZFortune} from './z-fortune.js?v=20261124-garden-v365';
import {createZStore} from './z-store.js?v=20261124-orders-v316';
import {createPlayerMenu} from './player-menu.js?v=20261125-graphics-v410';
import {createMouseSkateControls} from './mouse-skate-controls.js?v=20261119-entrance-steering-v118';
import {createMouseVehicleSteering} from './mouse-vehicle-steering.js?v=20261123-driving-v258';
import {GROUND_LEVEL} from './ground-level.js?v=20261119-level-ground-v117';
import {createRenderBudget} from './render-budget.js?v=20261125-graphics-v410';
import {createClothedPlayer} from './clothed-player.js';
import {createZercondaMuseum} from './zerconda-museum.js?v=20261121-entry-fix-v198';
import {installAvatarTattoos} from './avatar-tattoos.js?v=20261120-attribute-compat-v181';
import {createZTattoo} from './z-tattoo.js?v=20261119-entrance-steering-v118';
import {treeBoundsOverlapRoad} from './tree-road-clearance.js?v=20261118-clear-roads-v112';
import {createCourtGames} from './court-games.js?v=20261125-fence-v381';
import {createHotDogVendor} from './boardwalk-hotdogs.js?v=20261123-waterfront-v271';
import {createVehicleControls} from './vehicle-controls.js?v=20261123-driving-v258';
import {createDamagedWallPanel,createBlockedWallOpening,WALL_OPENING} from './blocked-wall-opening.js?v=20261122-listings-v238';
import {createAreaTravel} from './area-travel.js?v=20261125-warehouse-v379';
import {createMilitaryBase} from './military-base.js?v=20261122-admin-transport-v245';
import {upgradeMobileControls} from './mobile-controls.js?v=20261118-z-needle-v107';
import {createAirportLoop} from './airport-loop.js?v=20261125-entry-v375';
import {createNorthernForest} from './northern-forest.js?v=20261123-roads-v261';
import {createMobilePerformance} from './mobile-performance.js?v=20261120-player-detail-v181-20261119-rv-junction-v128';
import {createTownObstacles} from './town-obstacles.js?v=20261124-cache-v371';
import {createSeasideCarnival} from './seaside-carnival.js?v=20261121-cab-v188';
import {createRVPark} from './rv-park.js?v=20261123-cabins-v277';
import {createShowroomPickup} from './showroom-pickup.js?v=20261119-reference-trucks-v126';
import {createLuxuryVillas} from './luxury-villas.js?v=20261125-fence-v381';
import {createStyleCuts} from './style-cuts.js?v=20261124-public-doors-v369';
import {createBusinessCentre} from './business-centre.js?v=20261124-public-doors-v369';
import {createSkatePark} from './skate-park.js?v=20261119-entrance-steering-v118';
import {createAirfield} from './airfield.js?v=20261125-grass-seam-v379';
import * as THREE from 'three';
import {createForestCampground} from './forest-campground.js?v=20261123-natural-v264';
import {createPremierHomes} from './premier-homes.js?v=20261122-controls-v246';
import {createZercondaNews} from './zerconda-news.js?v=20261125-headline-v381';
import {createClothingBoutique} from './clothing-boutique.js?v=20261124-public-doors-v369';
import {createBowlingAlley} from './bowling-alley.js?v=20261124-public-doors-v369';
import {createScooterRentals} from './electric-scooter-rentals.js?v=20261124-public-doors-v369';
import {createSeasidePier} from './seaside-pier.js?v=20261123-waterfront-v285';
import {createTownInteractions,registerTownAction} from './town-interactions.js?v=20261117-touch-v75';
import {createWildernessLandscape,wildernessHeight} from './wilderness-landscape.js?v=20261124-trails-v307';
import {createClubZerconda} from './club-zerconda.js?v=20261124-public-doors-v369';
import {createRealisticHuman} from './realistic-human.js?v=20261118-faster-town-v106';
import {createEastForestGate} from './east-forest-gate.js?v=20261121-city-life-v196';
import {createZercondaAvatar} from './zerconda-avatar-upgrade.js?v=20261117-natural-walk-v68';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {installRealisticFountain} from './realistic-fountain.js?v=20261119-fountain-seating-v135';
import {createObservationNeedle} from './observation-needle.js?v=20261123-town-v282';
import {createCloudSky} from './cloud-sky.js?v=20261122-rug-v248';
import {addCityDepth} from './city-depth-assets.js?v=20261121-entry-fix-v198';
import {addBuildingIdentity} from './nine-building-styles.js';
import {createCoffeeShop} from './brewstone-coffee.js?v=20261124-customers-v358';
import {createApartmentExperience,apartmentCapacity,apartmentStreet,createApartmentExterior} from './apartment-interiors.js?v=20261124-lift-v303';
import {createUniversalInteriors} from './universal-furnished-interiors.js?v=20261119-fridge-v142';
// Dealership loads separately so a failed asset cannot blank the entire city.
import {addPremiumPlazaFurniture} from './premium-plaza-furniture.js?v=20261121-entry-fix-v198';
import {addAirDancers} from './air-dancers.js?v=20261120-facing-v184';
import {createZercondaBeach} from './zerconda-beach.js?v=20261123-waterfront-v271';
import {createCityMap} from './top-city-map.js?v=20261125-campus-v404';
import {addSignatureArchitecture} from './signature-apartment-buildings.js?v=20261119-performance-v147';
import {addWaterfrontHomes} from './waterfront-ocean-view-homes.js?v=20261123-town-v282';
import {createOwnableHomes} from './ownable-suburban-homes.js?v=20261122-controls-v246';
import {createPedestrians} from './animated-pedestrians.js?v=20261124-repairs-v369';
import {createEastsideGolfDistrict} from './eastside-golf-district.js?v=20261121-forest-airfield-v193';
import {createNeedleSportsPark} from './needle-sports-park.js?v=20261123-town-v282';

// ZERCONDA V5 — COMPLETE REPLACEMENT SCENE, NOT A PATCH.
const BOOT=stage=>globalThis.zercondaBootStage?.(stage);let LOW_GRAPHICS=new URLSearchParams(location.search).get('graphics')==='low';const RECOVERY_PLAZA=new URLSearchParams(location.search).get('resume')==='0';BOOT('Creating the scene');
const cameraClearance=createCameraClearance();
await yieldStartup();

const ZERCONDA_BUILD='2026-11-25-recovery-v410';
await yieldStartup();

document.documentElement.dataset.zercondaBuild=ZERCONDA_BUILD;
await yieldStartup();

console.info('ZERCONDA BUILD',ZERCONDA_BUILD);
await yieldStartup();

// Keep existing index.html importmap and <script type="module" src="./world.js">.
// Does not call any old tree/lamp/car spawn loops.
const BASE='https://raw.githubusercontent.com/nonasbrandon-commits/zerconda-assets/main/';
await yieldStartup();

const PATH={
 tree:new URL('./assets/street-tree-small-v205.glb',import.meta.url).href,
 tree2:new URL('./assets/street-tree-island-v205.glb',import.meta.url).href,
 sedan:'realistic-assets/trees-and-vehicles/vehicles/starter-graphite-sedan.glb',
 white:'realistic-assets/trees-and-vehicles/vehicles/starter-white-sedan.glb',
 sport:'realistic-assets/trees-and-vehicles/vehicles/sports-supercar.glb',
 lamp:'realistic-assets/expanded-models/street-lamp/street_lamp_01_1k.gltf',
 bench:'realistic-assets/plaza-assets/plaza-bench/painted_wooden_bench_1k.gltf',
 planter:'realistic-assets/plaza-assets/planter/planter_box_01_1k.gltf',
 statue:'realistic-assets/plaza-assets/statue/marble_bust_01_1k.gltf',
 flower:'realistic-assets/plaza-assets/flowering-plant/flower_empodium_1k.gltf'
};
await yieldStartup();

const status=document.getElementById('status');
await yieldStartup();

const scene=new THREE.Scene();
await yieldStartup();
scene.background=new THREE.Color(0x8eb7d3);
await yieldStartup();

const cloudSky=createCloudSky(scene,{count:LOW_GRAPHICS?6:matchMedia('(pointer:coarse)').matches?16:26});
await yieldStartup();

cloudSky.dome.scale.setScalar(6);
await yieldStartup();
 // Keep the atmosphere behind the distant terrain.
scene.fog=new THREE.FogExp2(0xa9c8dc,.00055);
await yieldStartup();

const camera=new THREE.PerspectiveCamera(66,innerWidth/innerHeight,.25,14000);
await yieldStartup();

const MOBILE=matchMedia('(pointer:coarse)').matches;
await yieldStartup();
let lastMobileFrame=0;
await yieldStartup();

BOOT('Starting graphics');
const renderer=new THREE.WebGLRenderer({antialias:false,powerPreference:LOW_GRAPHICS||MOBILE?'low-power':'high-performance'});
await yieldStartup();

try{const gl=renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info'),name=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):'';if(/swiftshader|llvmpipe|software/i.test(name)&&new URLSearchParams(location.search).get('graphics')!=='normal'){LOW_GRAPHICS=true;globalThis.zercondaBootGraphics?.('reduced (automatic)');BOOT('Software graphics detected · using Low');}}catch{}
renderer.debug.checkShaderErrors=new URLSearchParams(location.search).get('debugShaders')==='1';
await yieldStartup();

renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();window.dispatchEvent(new CustomEvent('zerconda-load-failed',{detail:'Graphics memory was lost. Try reduced graphics.'}));});
let graphicsEngine=null;
const shaderWarmup=createShaderWarmup(renderer);
await yieldStartup();

let preferredPixelRatio=Math.min(devicePixelRatio,LOW_GRAPHICS?.5:MOBILE?.7:.85),slowRenderFrames=0,lastRenderTime=performance.now();
await yieldStartup();
renderer.setPixelRatio(preferredPixelRatio);
await yieldStartup();
renderer.setSize(innerWidth,innerHeight);
await yieldStartup();

renderer.outputColorSpace=THREE.SRGBColorSpace;
await yieldStartup();

renderer.toneMapping=THREE.ACESFilmicToneMapping;
await yieldStartup();
renderer.toneMappingExposure=1.05;
await yieldStartup();

// Static house shadows are cached locally; the rest of town keeps its existing render budget.
renderer.shadowMap.enabled=false;
await yieldStartup();
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
await yieldStartup();

document.body.prepend(renderer.domElement);
await yieldStartup();

const hemisphere=new THREE.HemisphereLight(0xe6f4ff,0x737569,1.3);
await yieldStartup();
scene.add(hemisphere);
await yieldStartup();
let forestShade=0;
await yieldStartup();
const daylightFog=new THREE.Color(0xa9c8dc),forestFog=new THREE.Color(0x74846f);
await yieldStartup();

const sun=new THREE.DirectionalLight(0xffefdc,2.8);
await yieldStartup();
sun.position.set(-70,135,85);
await yieldStartup();
sun.castShadow=!MOBILE;
await yieldStartup();

const shadowSize=matchMedia('(pointer:coarse)').matches?1024:2048;
await yieldStartup();
sun.shadow.mapSize.set(shadowSize,shadowSize);
await yieldStartup();
sun.shadow.camera.left=-70;
await yieldStartup();
sun.shadow.camera.right=70;
await yieldStartup();

sun.shadow.camera.top=70;
await yieldStartup();
sun.shadow.camera.bottom=-70;
await yieldStartup();
sun.shadow.normalBias=.025;
await yieldStartup();
scene.add(sun);
await yieldStartup();
scene.add(sun.target);
await yieldStartup();

const houseSunShadows=createHouseSunShadows({scene,renderer,sun,getHome:()=>realEstate?.stanwood?.root,getPlayer:()=>player,enabled:false});
await yieldStartup();

const M=(color,roughness=.86,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
await yieldStartup();

// Existing photographic CC0 PBR textures already in GitHub (no cartoon flat ground).
const groundLoader=new THREE.TextureLoader();
await yieldStartup();

function groundTexture(path,repeat,color=false){
 const t=groundLoader.load(BASE+path,undefined,undefined,e=>console.warn('PBR ground texture unavailable',path,e));
 t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);
 t.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);
 if(color)t.colorSpace=THREE.SRGBColorSpace;
 return t;
}
function groundPBR(folder,name,repeat,tint=0xffffff){
 const prefix='realistic-assets/pbr/'+folder+'/'+name+'_1K-JPG_';
 return new THREE.MeshStandardMaterial({
  color:tint,
  map:groundTexture(prefix+'Color.jpg',repeat,true),
  normalMap:groundTexture(prefix+'NormalGL.jpg',repeat),
  roughnessMap:groundTexture(prefix+'Roughness.jpg',repeat),
  roughness:1,metalness:0
 });
}
// Neutral procedural asphalt: previous RoadLines001 photograph contained painted
// markings that repeated across the ENTIRE road, causing a giant zebra pattern.
// Solid asphalt prevents repeated high-frequency canvas grain from creating
// horizontal moire/striping across road surfaces at grazing camera angles.
const asphalt=new THREE.MeshStandardMaterial({color:0x333638,roughness:0.98,metalness:0,polygonOffset:false});
await yieldStartup();

 // Fine, low-contrast aggregate gives asphalt material detail without repeated painted lines.
 const asphaltCanvas=document.createElement('canvas');
await yieldStartup();
asphaltCanvas.width=asphaltCanvas.height=256;
await yieldStartup();

 const ac=asphaltCanvas.getContext('2d');
await yieldStartup();
let aggregateSeed=835;
await yieldStartup();

 ac.fillStyle='#a0a0a0';
await yieldStartup();
ac.fillRect(0,0,256,256);
await yieldStartup();

 for(let i=0;i<17000;i++){aggregateSeed=(Math.imul(aggregateSeed,1664525)+1013904223)>>>0;const x=(aggregateSeed>>>16)&255;aggregateSeed=(Math.imul(aggregateSeed,1664525)+1013904223)>>>0;const z=(aggregateSeed>>>16)&255,v=140+((aggregateSeed>>>8)%31);ac.fillStyle='rgb('+v+','+v+','+v+')';ac.fillRect(x,z,1,1);}
await yieldStartup();

 const aggregate=new THREE.CanvasTexture(asphaltCanvas);
await yieldStartup();
aggregate.wrapS=aggregate.wrapT=THREE.RepeatWrapping;
await yieldStartup();
aggregate.repeat.set(12,12);
await yieldStartup();
aggregate.anisotropy=4;
await yieldStartup();
asphalt.map=aggregate;
await yieldStartup();
asphalt.bumpMap=aggregate;
await yieldStartup();
asphalt.bumpScale=.012;
await yieldStartup();

const paving=createTownSidewalkMaterial();
await yieldStartup();

const curb=M(0xd7d2c8);
await yieldStartup();

const grass=createRealisticGrass();
await yieldStartup();
grass.polygonOffset=true;
await yieldStartup();
grass.polygonOffsetFactor=2;
await yieldStartup();
grass.polygonOffsetUnits=4;
await yieldStartup();

const lane=M(0xeae5d7),yellow=M(0xc4ad62),dark=M(0x252a2d),stone=M(0xc4bcae);
await yieldStartup();

const bronze=M(0x6b5c48,.38,.62),wood=M(0x6a4a31);
await yieldStartup();

const glassCanvas=document.createElement('canvas');
await yieldStartup();
glassCanvas.width=512;
await yieldStartup();
glassCanvas.height=512;
await yieldStartup();

 const gc=glassCanvas.getContext('2d'),gr=gc.createLinearGradient(0,0,512,512);
await yieldStartup();

 gr.addColorStop(0,'#28485e');
await yieldStartup();
gr.addColorStop(.38,'#8ab4c8');
await yieldStartup();
gr.addColorStop(.7,'#476b82');
await yieldStartup();
gr.addColorStop(1,'#1d3649');
await yieldStartup();

 gc.fillStyle=gr;
await yieldStartup();
gc.fillRect(0,0,512,512);
await yieldStartup();

 gc.globalAlpha=.26;
await yieldStartup();
for(let i=0;i<28;i++){const xx=(i*73)%512,yy=220+(i*47)%180;gc.fillStyle=i%3?'#243b50':'#c6dce5';gc.fillRect(xx,yy,14+(i%5)*8,512-yy);}
await yieldStartup();

 gc.globalAlpha=.22;
await yieldStartup();
gc.fillStyle='#f8fafc';
await yieldStartup();
for(let i=0;i<11;i++){gc.beginPath();gc.ellipse((i*97)%512,55+(i*41)%150,52,9,-.25,0,Math.PI*2);gc.fill();}
await yieldStartup();

 gc.globalAlpha=.48;
await yieldStartup();
gc.strokeStyle='#d8e9ef';
await yieldStartup();
gc.lineWidth=4;
await yieldStartup();
gc.beginPath();
await yieldStartup();
gc.moveTo(32,0);
await yieldStartup();
gc.lineTo(260,512);
await yieldStartup();
gc.stroke();
await yieldStartup();
gc.globalAlpha=1;
await yieldStartup();

 const glassTexture=new THREE.CanvasTexture(glassCanvas);
await yieldStartup();
glassTexture.colorSpace=THREE.SRGBColorSpace;
await yieldStartup();
glassTexture.anisotropy=8;
await yieldStartup();

 // Do not overlay the reflection SVG on window glazing: it creates duplicate window patterns.
 const glass=new THREE.MeshPhysicalMaterial({map:glassTexture,color:0xffffff,metalness:.12,roughness:.25,transparent:false,opacity:1,clearcoat:.2,clearcoatRoughness:.2,side:THREE.FrontSide,depthWrite:true});
await yieldStartup();

const windowMat=glass,doorMat=M(0x655343,.42,.18);
await yieldStartup();

const windowFrame=M(0x43494a,.42,.5),windowSill=M(0xd7cec0,.9);
await yieldStartup();

const windowReflection=new THREE.MeshBasicMaterial({color:0xd8f0ff,transparent:true,opacity:.055,depthWrite:false,side:THREE.FrontSide});
await yieldStartup();

function architecturalWindow(group,cx,cy,cz,width,height,face='front'){
 const outer=new THREE.Group();outer.position.set(cx,cy,cz);
 if(face==='side')outer.rotation.y=Math.PI/2;
 group.add(outer);
 // A bright interior backing, glazing, highlights and actual raised frame.
 box(width,height,.035,0,0,-.11,new THREE.MeshBasicMaterial({color:0x78909a}),outer);
 box(width-.12,height-.12,.045,0,0,.015,glass,outer);
 box(.075,height+.12,.18,-width/2,0,.08,windowFrame,outer);
 box(.075,height+.12,.18,width/2,0,.08,windowFrame,outer);
 box(width+.12,.075,.18,0,height/2,.08,windowFrame,outer);
 box(width+.12,.075,.18,0,-height/2,.08,windowFrame,outer);
 box(.06,height,.09,0,0,.12,windowFrame,outer);
 box(width,.06,.09,0,-height*.06,.12,windowFrame,outer);
 box(width+.34,.14,.31,0,-height/2-.11,.06,windowSill,outer);
 const glint=box(width*.16,height*.81,.006,-width*.25,0,.153,windowReflection,outer);
 glint.rotation.z=-.13;glint.castShadow=false;glint.receiveShadow=false;
}
const geo=new THREE.BoxGeometry(1,1,1);
await yieldStartup();

const walkSurfaces=[];
await yieldStartup();

let controlsGuide=null,controllerInput=null;
await yieldStartup();
let adminTransport=null;
await yieldStartup();
let forestGravelRoads=null,styleCutsGrove=null;
await yieldStartup();
let residentialShadeTrees=null;
await yieldStartup();
let museumGardenTrees=null;
await yieldStartup();
let realEstate=null;
await yieldStartup();
let courtEquipmentChanging=false;
await yieldStartup();
let ambientTraffic=null;
await yieldStartup();
let zCabs=null;
await yieldStartup();
let adminDashboard=null,adminWorld=null;
let freeApartments=null,brickApartments=null,venueAccessRoads=null,gunStore=null,gunGame=null,hospital=null,beachKate=null,tagGame=null,venueRenderIsolation=null,canopyVenue=null,boardwalkFitness=null,coffeeCustomers=null,cityview=null,adminAccount=null,powersports=null,signBacks=null,zFortune=null,zStore=null,playerMenu=null,museum=null,tattooShop=null,courtGames=null,hotDogVendor=null,sunglassesHut=null,neighborhoodResidents=null,club=null,needleSportsPark=null,ownableHomes=null,marine=null,coastal=null,scooters=null,bowling=null,boutique=null,news=null,apartmentExperience=null,premier=null,camp=null,airfield=null,skate=null,eastsideGolf=null,office=null,barber=null,villas=null,rvPark=null,carnival=null,townObstacles=null,airportLoop=null,northernForest=null,militaryBase=null,militaryAccess=null,mobilePerformance=null,wildlifePlayer=null,southBeach=null,observationNeedle=null;
await yieldStartup();
const apartmentExteriors=[];
await yieldStartup();
let onObservationDeck=false,insideNeedleLobby=false;
await yieldStartup();
let dealerInside=false;
await yieldStartup();

function authoredGroundHeightAt(x,z){
 const starterY=freeApartments?.heightAt(x,z);if(starterY!==null&&starterY!==undefined)return starterY;const brickY=brickApartments?.heightAt(x,z);if(brickY!==null&&brickY!==undefined)return brickY;const gunY=gunStore?.heightAt(x,z);if(gunY!==null&&gunY!==undefined)return gunY;const hospitalY=hospital?.heightAt(x,z);if(hospitalY!==null&&hospitalY!==undefined)return hospitalY;const canopyY=canopyVenue?.heightAt(x,z);if(canopyY!==null&&canopyY!==undefined)return canopyY;const cvY=cityview?.heightAt(x,z);if(cvY!==null&&cvY!==undefined)return cvY;
 // Elevated pier and gangways take precedence over the underlying beach/ocean.
 if(marine?.riding)return marine.riderY;
 const deckY=marine?.heightAt(x,z);if(deckY!==null&&deckY!==undefined)return deckY;
 const museumY=museum?.heightAt(x,z);if(museumY!==null&&museumY!==undefined)return museumY;
 const powersportsY=powersports?.heightAt(x,z);if(powersportsY!==null&&powersportsY!==undefined)return powersportsY;
 const fortuneY=zFortune?.heightAt(x,z);if(fortuneY!==null&&fortuneY!==undefined)return fortuneY;
 const storeY=zStore?.heightAt(x,z);if(storeY!==null&&storeY!==undefined)return storeY;
 const tattooY=tattooShop?.heightAt(x,z);if(tattooY!==null&&tattooY!==undefined)return tattooY;
 if(observationNeedle?.riding)return observationNeedle.riderY;
 if(onObservationDeck)return observationNeedle.deckY;
 if(insideNeedleLobby)return observationNeedle.lobbyY;const needleGround=observationNeedle?.groundHeightAt(x,z);if(needleGround!==null&&needleGround!==undefined)return needleGround;
 const loopY=airportLoop?.heightAt(x,z);if(loopY!==null&&loopY!==undefined)return loopY;
 const baseY=militaryBase?.heightAt(x,z);if(baseY!==null&&baseY!==undefined)return baseY;
 const groveY=styleCutsGrove?.heightAt(x,z);if(groveY!==null&&groveY!==undefined)return groveY;const roadGravelY=forestGravelRoads?.heightAt(x,z);if(roadGravelY!==null&&roadGravelY!==undefined)return roadGravelY;const forestY=northernForest?.heightAt(x,z);if(forestY!==null&&forestY!==undefined)return forestY;
 const boardwalk=southBeach?.boardwalkBounds;
 if(boardwalk&&x>=boardwalk.minX&&x<=boardwalk.maxX&&z>=boardwalk.minZ&&z<=boardwalk.maxZ)return boardwalk.y;
 const scooterY=scooters?.heightAt(x,z);if(scooterY!==null&&scooterY!==undefined)return scooterY;
 const carnivalY=carnival?.heightAt(x,z);if(carnivalY!==null&&carnivalY!==undefined)return carnivalY;
 const rvY=rvPark?.heightAt(x,z);if(rvY!==null&&rvY!==undefined)return rvY;
 const beachY=southBeach?.heightAt(x,z);if(beachY!==null&&beachY!==undefined)return beachY;
 const villaY=villas?.heightAt(x,z);if(villaY!==null&&villaY!==undefined)return villaY;
 const barberY=barber?.heightAt(x,z);if(barberY!==null&&barberY!==undefined)return barberY;
 if(dealerInside)return .025;
 const officeY=office?.heightAt(x,z);if(officeY!==null&&officeY!==undefined)return officeY;
 const golfY=eastsideGolf?.heightAt(x,z);if(golfY!==null&&golfY!==undefined)return golfY;
 const skateY=skate?.heightAt(x,z);if(skateY!==null&&skateY!==undefined)return skateY;
 const airY=airfield?.heightAt(x,z);if(airY!==null&&airY!==undefined)return airY;
 const campY=camp?.heightAt(x,z);if(campY!==null&&campY!==undefined)return campY;
 const premiumY=premier?.heightAt(x,z);if(premiumY!==null&&premiumY!==undefined)return premiumY;
 if(apartmentExperience?.active){const y=apartmentExperience.heightAt(x,z);if(y!==null)return y;}
 for(const b of apartmentExteriors){const y=b.approachHeight(x,z);if(y!==null)return y;}
 if(marine?.riding)return marine.riderY;
 if(bowling?.active)return bowling.heightAt(x,z)??.065;
 if(boutique?.active)return boutique.heightAt(x,z)??0;
 const newsY=news?.heightAt(x,z);if(newsY!==null&&newsY!==undefined)return newsY;
 const shopY=boutique?.heightAt(x,z);if(shopY!==null&&shopY!==undefined)return shopY;
 const bowlY=bowling?.heightAt(x,z);if(bowlY!==null&&bowlY!==undefined)return bowlY;
 const pierY=marine?.heightAt(x,z);if(pierY!==null&&pierY!==undefined)return pierY;
 if(club?.active)return club.heightAt(x,z);
 const coastalY=coastal?.heightAt(x,z);if(coastalY!==null&&coastalY!==undefined)return coastalY;
 if(ownableHomes?.active)return ownableHomes.heightAt(x,z);
 let height=ownableHomes?.heightAt(x,z)??needleSportsPark?.heightAt(x,z)??-Infinity;
 for(const s of walkSurfaces)if(Math.abs(x-s.x)<=s.w/2&&Math.abs(z-s.z)<=s.d/2)height=Math.max(height,s.y);
 return Number.isFinite(height)?height:GROUND_LEVEL;
}
// Exterior modules and sidewalk slabs may overlap at their physical edges.
function groundHeightAt(x,z){const mountainY=mountainHeightAt(x,z);if(mountainY!==null)return mountainY;
 const estateY=realEstate?.heightAt(x,z);if(estateY!==null&&estateY!==undefined)return estateY;
 let height=authoredGroundHeightAt(x,z);
 if(barber?.active||office?.active||apartmentExperience?.active||bowling?.active||boutique?.active||club?.active||ownableHomes?.active||marine?.riding||airfield?.boarded)return height;
 for(const surface of walkSurfaces)if(Math.abs(x-surface.x)<=surface.w/2&&Math.abs(z-surface.z)<=surface.d/2)height=Math.max(height,surface.y);
 return height;
}
const soleSamples=[[0,0],[.16,0],[-.16,0],[0,.18],[0,-.14],[.11,.12],[-.11,.12],[.11,-.1],[-.11,-.1]];
await yieldStartup();

function standingHeightAt(x,z){const caveY=hiddenPassageHeightAt(x,z);if(caveY!==null)return caveY;
 const center=groundHeightAt(x,z);let support=center;
 for(const [dx,dz]of soleSamples){const y=groundHeightAt(x+dx,z+dz);if(y<=center+.34)support=Math.max(support,y);}
 return support+.004;
}
function box(w,h,d,x,y,z,material,parent=scene){
 if(parent===scene&&h<=.3&&[asphalt,paving,curb].includes(material))y=GROUND_LEVEL-h/2;
 const o=new THREE.Mesh(geo,material);o.scale.set(w,h,d);o.position.set(x,y,z);
 o.castShadow=true;o.receiveShadow=true;
 // Horizontal road/sidewalk slabs must not cast shadows on themselves or each other.
 if(material===asphalt||material===paving||material===curb){o.castShadow=false;o.receiveShadow=true;}
 if(material===lane||material===yellow){o.castShadow=false;o.receiveShadow=false;}
 if(h<=.3&&parent===scene&&[asphalt,paving,curb].includes(material))o.userData.startupEssential=true;
 if(h<=.3&&parent===scene&&[asphalt,paving,curb].includes(material))walkSurfaces.push({x,z,w,d,y:y+h/2});
 parent.add(o);return o;
}
function cylinder(rt,rb,h,x,y,z,material,parent=scene,n=48){
 const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),material);
 o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;
}
let seed=2451;
await yieldStartup();
function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
const roadLines=[-96,0,96],ROAD_HALF=9.5,SIDEWALK_EDGE=14;
await yieldStartup();

const nearRoad=(x,z,margin=0)=>roadLines.some(v=>Math.abs(x-v)<ROAD_HALF+margin||Math.abs(z-v)<ROAD_HALF+margin);
await yieldStartup();

const inIntersection=(x,z,margin=0)=>roadLines.some(a=>Math.abs(x-a)<ROAD_HALF+margin)&&roadLines.some(b=>Math.abs(z-b)<ROAD_HALF+margin);
await yieldStartup();

const buildings=[],doors=[],trees=[],lamps=[],cars=[],loaded={};
await yieldStartup();

const entranceClearance=5.8;
await yieldStartup();

const plazaCenter={x:48,z:48},plazaRadius=24;
await yieldStartup();

const inPlaza=(x,z,extra=0)=>Math.hypot(x-plazaCenter.x,z-plazaCenter.z)<plazaRadius+extra;
await yieldStartup();

const insideBuilding=(x,z,pad=0)=>buildings.some(b=>Math.abs(x-b.x)<b.w/2+pad&&Math.abs(z-b.z)<b.d/2+pad);
await yieldStartup();


// Entire city road/sidewalk grid. Roads are continuous; sidewalks NEVER cross lanes.
// Seamless mainland under the skyline: stops the blue sky void and floating towers.
// Southern edge ends before the beach/ocean; city roads and landscaping sit above it.
const mainlandGround=box(1250,.18,1180,165,-.28,-425,grass);
await yieldStartup();

// Keep the lawn below flush pavement rather than relying on depth bias.
const cityLawn=box(1014,.12,743,63,GROUND_LEVEL-.078,-196.5,grass);
await yieldStartup();
cityLawn.userData.startupEssential=true;
await yieldStartup();

// All three original road corridors now run continuously to the perimeter fence.
// East-west roads: x=-276..570. North-south roads: z=-285..242.
const roadWest=-468.5,roadEast=618,roadNorth=-273.5,roadSouth=242;
await yieldStartup();

for(const c of roadLines){
 // Build non-overlapping asphalt slabs: a single surface owns each intersection.
 // Previously horizontal and vertical slabs overlapped at different heights,
 // leaving a diagonal seam and exposed grass triangles.
 // Restore the continuous original x=96 grid road.
 box(19,.12,roadSouth-roadNorth,c,-.04,(roadNorth+roadSouth)/2,asphalt);
 const cuts=[roadWest,-427.5,-408.5,...roadLines.flatMap(v=>[v-9.5,v+9.5]),roadEast];
 for(let j=0;j<cuts.length-1;j+=2){
  const left=cuts[j],right=cuts[j+1];if(right<=left)continue;
  box(right-left,.12,19,(left+right)/2,-.04,c,asphalt);
 }
 for(const side of [-1,1]){
  // Sidewalks and curbs end at each junction; no raised slabs across traffic.
  const zStops=[-269,...roadLines.flatMap(v=>[v-14,v+14]),roadSouth];
  const xStops=[roadWest,-432,-404,...roadLines.flatMap(v=>[v-14,v+14]),roadEast];
  for(let i=0;i<zStops.length-1;i+=2){
   const lo=zStops[i],hi=zStops[i+1];if(hi<=lo)continue;
   const mid=(lo+hi)/2,len=hi-lo;
   box(4.28,.24,len,c+side*11.86,.025,mid,paving);
   box(.22,.27,len,c+side*9.61,.03,mid,curb);
  }
  for(let i=0;i<xStops.length-1;i+=2){
   const lo=xStops[i],hi=xStops[i+1];if(hi<=lo)continue;
   const mid=(lo+hi)/2,len=hi-lo;
   box(len,.24,4.28,mid,.025,c+side*11.86,paving);
   box(len,.27,.22,mid,.03,c+side*9.61,curb);
  }
 }
 for(let p=roadNorth+10;p<roadSouth-10;p+=12){
  if(!roadLines.some(k=>Math.abs(p-k)<15))box(.14,.014,5,c,.035,p,yellow);
 }
 for(let p=roadWest+10;p<roadEast-10;p+=12){
  if(![-418,...roadLines].some(k=>Math.abs(p-k)<15))box(5,.014,.14,p,.038,c,yellow);
 }
}
await yieldStartup();

// New west boulevard joins the airport loop, every extended city street, and the beach approach.
box(19,.12,448.5,-418,-.04,-49.25,asphalt);
await yieldStartup();

for(const side of [-1,1]){const stops=[-269,-110,-82,-14,14,82,110,161];for(let i=0;i<stops.length-1;i+=2){const lo=stops[i],hi=stops[i+1];box(4.28,.24,hi-lo,-418+side*11.86,.025,(lo+hi)/2,paving);box(.22,.27,hi-lo,-418+side*9.61,.03,(lo+hi)/2,curb);}}
await yieldStartup();

for(let z=-260;z<165;z+=12)if(!roadLines.some(v=>Math.abs(z-v)<15))box(.14,.014,5,-418,.035,z,yellow);
await yieldStartup();

// Non-overlapping sidewalk corners meet the straight runs exactly at 14m.
// Curb occupies 9.50..9.72m; paving begins at 9.72m. Its top is 2cm lower.
// Previously both materials occupied y=.145, causing distance-dependent flicker.
for(const ix of [-418,...roadLines])for(const iz of roadLines){
 for(const sx of [-1,1])for(const sz of [-1,1]){
  const pad=box(4.28,.24,4.28,ix+sx*11.86,.025,iz+sz*11.86,paving);
  pad.castShadow=false;pad.receiveShadow=false;
  // The first curb owns the corner square; the second ends against its side.
  const edgeX=box(.22,.27,4.5,ix+sx*9.61,.03,iz+sz*11.75,curb);
  const edgeZ=box(4.28,.27,.22,ix+sx*11.86,.03,iz+sz*9.61,curb);
  edgeX.castShadow=false;edgeZ.castShadow=false;
 }
}
await yieldStartup();

// Four consistent zebra crossings per intersection, set back from the
// junction centre. The old two crossing strips formed a disconnected L.
// Each crossing spans the asphalt and meets the sidewalk approaches.
for(const x of [-418,...roadLines])for(const z of roadLines){
 for(const side of [-1,1]){
  for(let i=-4;i<=4;i++){
   const offset=i*2.0;
   // East/west-running stripes cross the north/south road.
   const ns=box(1.25,.016,2.65,x+offset,.045,z+side*18,lane);
   // North/south-running stripes cross the east/west road.
   const ew=box(2.65,.016,1.25,x+side*18,.045,z+offset,lane);
   ns.castShadow=false;ns.receiveShadow=false;
   ew.castShadow=false;ew.receiveShadow=false;
  }
 }
}
await yieldStartup();

// Tall solid concrete/stone perimeter barrier. Original 3D geometry and
// textured PBR-style surface, not the copyrighted photographic reference.
const wallCanvas=document.createElement('canvas');
await yieldStartup();
wallCanvas.width=512;
await yieldStartup();
wallCanvas.height=512;
await yieldStartup();

const wc=wallCanvas.getContext('2d');
await yieldStartup();
wc.fillStyle='#8e918b';
await yieldStartup();
wc.fillRect(0,0,512,512);
await yieldStartup();

let ws=75431;
await yieldStartup();
function wr(){ws=(Math.imul(ws,1664525)+1013904223)>>>0;return ws/4294967296;}
for(let i=0;i<14000;i++){
 const v=Math.floor(85+wr()*80);wc.fillStyle='rgba('+v+','+(v+3)+','+v+','+(.015+wr()*.08)+')';
 wc.fillRect(wr()*512,wr()*512,1+wr()*8,2+wr()*16);
}
await yieldStartup();

for(let x=0;x<512;x+=64){wc.fillStyle='rgba(35,40,38,.15)';wc.fillRect(x,0,2,512);}
await yieldStartup();

const wallTex=new THREE.CanvasTexture(wallCanvas);
await yieldStartup();
wallTex.colorSpace=THREE.SRGBColorSpace;
await yieldStartup();

wallTex.wrapS=wallTex.wrapT=THREE.RepeatWrapping;
await yieldStartup();
wallTex.repeat.set(1,1);
await yieldStartup();

const wallStone=new THREE.MeshStandardMaterial({map:wallTex,color:0xc9c9c3,roughness:.97,metalness:0});
await yieldStartup();

const wallCap=new THREE.MeshStandardMaterial({color:0x92948e,roughness:.95});
await yieldStartup();

const WALL_HEIGHT=12.5,WALL_THICKNESS=1.8;
await yieldStartup();

function wallSegment(x1,z1,x2,z2){
 const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),angle=Math.atan2(dz,dx);
 const group=new THREE.Group();group.position.set(x1,0,z1);group.rotation.y=-angle;scene.add(group);
 for(let pos=0;pos<len;pos+=12){
  const w=Math.min(12,len-pos);
  if(x1===-720&&x2===-720&&Math.abs(z1+pos+w/2+612)<.01){const side=(w-2.2)/2;box(side,WALL_HEIGHT,WALL_THICKNESS,pos+side/2,WALL_HEIGHT/2,0,wallStone,group);box(side,WALL_HEIGHT,WALL_THICKNESS,pos+w-side/2,WALL_HEIGHT/2,0,wallStone,group);box(2.2,WALL_HEIGHT-3.2,WALL_THICKNESS,pos+w/2,3.2+(WALL_HEIGHT-3.2)/2,0,wallStone,group);}else if(z1===WALL_OPENING.z&&z2===z1&&Math.abs(x1+pos+w/2-WALL_OPENING.x)<.01){const panel=createDamagedWallPanel(w,WALL_HEIGHT,WALL_THICKNESS,wallStone);panel.position.set(pos+w/2,0,0);group.add(panel);}else box(w,WALL_HEIGHT,WALL_THICKNESS,pos+w/2,WALL_HEIGHT/2,0,wallStone,group);
  box(w+.03,.32,WALL_THICKNESS+.3,pos+w/2,WALL_HEIGHT+.16,0,wallCap,group);
  box(.15,WALL_HEIGHT,.06,pos, WALL_HEIGHT/2,WALL_THICKNESS/2+.03,wallCap,group);
 }
}
// The southern coastline is intentionally OPEN: no wall across the beach or ocean.
wallSegment(-720,-1398,618,-1398);
await yieldStartup();

wallSegment(-720,-1398,-720,350);
await yieldStartup();
 // Extend the west wall deep into the ocean; no beach bypass.
// East gate aligns with the existing eastbound city street at z=0.
// Close the old golf access opening; keep road and sidewalks clear.
wallSegment(618,-1398,618,-18);
await yieldStartup();
wallSegment(618,18,618,350);
await yieldStartup();
 // East perimeter also continues offshore.

 // East security entrance, spanning the 36m opening at z=-18..18.
 // The arch is high enough for vehicles; posts sit OUTSIDE the driving lane.
 const security=new THREE.Group();
await yieldStartup();
security.name='East perimeter security gate';
await yieldStartup();
security.userData.roadInfrastructure=true;
await yieldStartup();
security.position.x=48;
await yieldStartup();
scene.add(security);
await yieldStartup();

 const gateSteel=new THREE.MeshStandardMaterial({color:0x263e4b,metalness:.72,roughness:.35});
await yieldStartup();

 const gateWhite=new THREE.MeshStandardMaterial({color:0xe2e8e9,metalness:.18,roughness:.55});
await yieldStartup();

 const gateGlass=new THREE.MeshStandardMaterial({color:0x76b5ce,metalness:.18,roughness:.23});
await yieldStartup();

 for(const z of [-18,18]){
  box(1.4,5,1.4,570,2.5,z,gateSteel,security);
  box(1.75,.35,1.75,570,5.15,z,gateWhite,security);
 }
await yieldStartup();

 box(1.5,1.2,37,570,6.1,0,gateSteel,security);
await yieldStartup();

 box(1.55,.52,27,570,6.15,0,gateWhite,security);
await yieldStartup();

 // Guard kiosks face the approach, with no obstruction in the opening.
 for(const z of [-25,25]){
  box(4,2.6,4,562,1.3,z,gateWhite,security);
  box(4.1,1.1,4.1,562,2.65,z,gateSteel,security);
  box(.12,.95,2.5,559.92,1.8,z,gateGlass,security);

 }
await yieldStartup();

 const forestCheckpoint=createEastForestGate(scene,{createAvatar:createZercondaAvatar,getPlayer:()=>({...player,x:player.x-36})});
await yieldStartup();
forestCheckpoint.root.position.x=36;
await yieldStartup();

 console.info('ZERCONDA closed police gate and forest checkpoint installed');
await yieldStartup();


// Gate geometry is loaded after core scene setup to avoid blocking world startup.
// Connected eroded ridges and instanced forest around all landward boundaries.
const wilderness=createWildernessLandscape(scene);
await yieldStartup();

const hiddenForestPassage=createHiddenForestPassage(scene,{wallMaterial:wallStone,getPlayer:()=>player,onStop:()=>{keys.clear();townControls.stop();movement.vx=movement.vz=movement.wheelImpulse=0;}});
const perimeterForest=createPerimeterForest(scene,{grass});const mountainWilderness=createMountainWilderness(scene);
await yieldStartup();
forestGravelRoads=createForestGravelRoads(scene);
await yieldStartup();

const sceneryYield=createSceneryYield({moving:()=>globalThis.zercondaTransportMoving===true||townControls.walking||townControls.backward||Math.hypot(movement.vx,movement.vz)>.15||['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].some(k=>keys.has(k))});
await yieldStartup();

globalThis.zercondaIsMoving=()=>globalThis.zercondaTransportMoving===true||townControls.walking||townControls.backward||Math.hypot(movement.vx,movement.vz)>.15||['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].some(k=>keys.has(k));
await yieldStartup();

async function waitForScenerySlot(){while(globalThis.zercondaIsMoving?.()||adminAccount?.panelOpen||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))await new Promise(resolve=>setTimeout(resolve,150));await sceneryYield();}
async function prepareScenery(object){if(object)await sceneryYield();}
async function populateOuterForest(){
 const source=loaded.tree||loaded.tree2;if(!source)return;
 // Photographic broadleaf assets break up the near evergreen forest edge.
 for(let i=0;i<72;i++){while(globalThis.zercondaIsMoving?.()||adminAccount?.panelOpen||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))await new Promise(r=>setTimeout(r,150));await waitForScenerySlot();
  const side=i%3,x=side===0?-701-rand()*75:side===1?605+rand()*85:-280+rand()*960;
  const z=side===2?-567-rand()*65:-260+rand()*345;
  if(side===1&&Math.abs(z)<24)continue;
  const tree=cloneNormalized(loaded[i%2?'tree2':'tree']||source,x,z,24+rand()*15,rand()*Math.PI*2);
  if(tree&&treeBoundsOverlapRoad(new THREE.Box3().setFromObject(tree))){scene.remove(tree);continue;}
  if(tree){tree.name='Road-cleared outer tree';tree.userData.roadCleared=true;tree.position.y+=wildernessHeight(x,z);tree.traverse(o=>{if(o.isMesh)o.castShadow=false;});optimizeStaticModel(tree,'outer-tree-'+(i%2));treeRoadMaintenance.checkRoot(tree);await prepareScenery(tree);}
 }
}
// Facade texture generator: architectural materials, varied stonework,
// window frames, lintels, sills, masonry joints and shopfronts.
function facadeTexture(base,trimColor,glassColor,cols=5,floors=5){
 const cv=document.createElement('canvas');cv.width=1024;cv.height=1024;
 const ctx=cv.getContext('2d');ctx.fillStyle=base;ctx.fillRect(0,0,1024,1024);
 const fw=1024/cols,fh=1024/floors;
 for(let f=0;f<floors;f++){
  const y=f*fh;
  ctx.fillStyle=trimColor;ctx.globalAlpha=.3;ctx.fillRect(0,y,1024,7);ctx.globalAlpha=1;
  for(let c=0;c<cols;c++){
   const x=c*fw;
   ctx.strokeStyle='rgba(35,35,35,.18)';ctx.lineWidth=2;
   for(let j=0;j<4;j++)ctx.strokeRect(x+j*fw/4,y,fw/4,fh);
   const ww=fw*.56,wh=fh*.62,wx=x+(fw-ww)/2,wy=y+fh*.17;
   ctx.fillStyle=trimColor;ctx.fillRect(wx-7,wy-9,ww+14,wh+18);
   ctx.fillStyle=glassColor;ctx.fillRect(wx,wy,ww,wh);
   ctx.fillStyle='rgba(190,216,225,.12)';ctx.fillRect(wx+ww*.12,wy,ww*.19,wh);
   ctx.fillStyle=trimColor;ctx.fillRect(wx+ww*.48,wy,5,wh);
   ctx.fillRect(wx,wy+wh*.54,ww,4);
   ctx.fillRect(wx-14,wy+wh+5,ww+28,11);
   ctx.fillRect(wx-9,wy-12,ww+18,8);
  }
 }
 const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;
 return t;
}
// Real CC0 architectural photographs replace hand-painted cartoon windows.
const facadeMats=[
 'realistic-assets/facades/brick-residential-premium.svg',
 'realistic-assets/facades/limestone-residential-premium.svg',
 'realistic-assets/facades/glass-office-premium.svg',
 'realistic-assets/facades/classic-brick-residences.svg',
 'realistic-assets/expanded-models/brick-building/textures/modular_factory_facade_brick_diff_1k.jpg',
 'realistic-assets/expanded-models/urban-building/textures/modular_urban_apartments_facade_plaster_diff_1k.jpg',
 'realistic-assets/expanded-models/urban-building/textures/modular_urban_apartments_facade_trim_01_diff_1k.jpg'
].map((path,i)=>{
 const t=groundLoader.load(BASE+path);
 t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;
 t.repeat.set(1,1);t.anisotropy=8; // prevent crushed/over-tiled facade photography
 return new THREE.MeshStandardMaterial({map:t,roughness:.93,color:0xffffff});
});
await yieldStartup();

const roof=M(0x34373a),metal=M(0x565c5e,.42,.55);
await yieldStartup();

const brickNormal=groundTexture('realistic-assets/expanded-models/brick-building/textures/modular_factory_facade_brick_nor_gl_1k.jpg',3);
await yieldStartup();

facadeMats[4].normalMap=brickNormal;
await yieldStartup();
facadeMats[4].normalScale.set(.35,.35);
await yieldStartup();

const plasterNormal=groundTexture('realistic-assets/expanded-models/urban-building/textures/modular_urban_apartments_facade_plaster_nor_gl_1k.jpg',3);
await yieldStartup();

facadeMats[5].normalMap=plasterNormal;
await yieldStartup();
facadeMats[5].normalScale.set(.4,.4);
await yieldStartup();

const entranceAwning=new THREE.MeshStandardMaterial({color:0x3d4c50,metalness:.6,roughness:.38});
await yieldStartup();

const castStone=new THREE.MeshStandardMaterial({color:0xc9c1b2,roughness:.94});
await yieldStartup();


function makeBuilding(x,z,w,d,h,type){
 // Reject the entire structure including facade trim, balconies and entrance steps.
 // Road corridors are centered at -96, 0, 96; their paved surface ends 9.5m
 // from center, and sidewalks extend to 14m. Keep a further 3m buffer.
 const clearance=17;
 if(roadLines.some(c=>Math.abs(x-c)<w/2+clearance||Math.abs(z-c)<d/2+clearance))return;

 const residence={x,z,w,d,h:10.9,id:'A-'+x+'-'+z,name:'Zerconda Apartments '+(buildings.length+1)};const street=apartmentStreet(residence);residence.angle=street.angle;residence.street=street.road;createApartmentExterior(scene,residence);apartmentExteriors.push(residence);buildings.push(residence);
}

const blocks=[
 [-48,-48],[48,-48],[-48,48],[48,48],
 [-144,-48],[144,-48],[-48,144],[48,144],
 [-144,48],[144,48],[-48,-144],[48,-144]
];
await yieldStartup();

// Two full-width apartment buildings fit this block without overlapping one
// another or the street corridor. Exterior width includes the furnished units.
for(const z of [33,63])makeBuilding(-48,z,39.8,19.2,10.9,0);
await yieldStartup();


// Ocean-view residential neighborhood: homes face the southern beach.
function passHomeDoor(p){if(!allowPrivateHomeAt(p.x,p.z,()=>passHomeDoor(p)))return;player.x=p.x;player.z=p.z;yaw=p.heading;keys.clear();movement.vx=movement.vz=movement.wheelImpulse=0;camera.position.set(p.x-Math.sin(yaw)*1.4,groundHeightAt(p.x,p.z)+2.1,p.z-Math.cos(yaw)*1.4);}
const waterfrontHomes=coastal=addWaterfrontHomes(scene,{onPassage:passHomeDoor,count:12,getPlayer:()=>player,canInteract:()=>!barber?.active&&!office?.active&&!boutique?.active&&!bowling?.active&&!scooters?.riding&&!powersports?.riding&&!skate?.riding&&!activeCar&&!club?.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes?.active,onMessage:message=>townControls.notify(message)});
await yieldStartup();

eastsideGolf=createEastsideGolfDistrict(scene,{x:425,z:-48,getPlayer:()=>player});
await yieldStartup();

ownableHomes=createOwnableHomes(scene);
await yieldStartup();

const universalInteriors=createUniversalInteriors(scene);
await yieldStartup();

let universalSession=null;
await yieldStartup();


// Dedicated tower island in its own city block (0..96, -96..0).
// The 7.5m loop road surrounds the landscaped tower plaza and connects
// to the city street grid through north/south access lanes.
const towerDistrict={x:48,z:-48,outer:37,inner:29};
await yieldStartup();

const loopRoadMaterial=paving;
await yieldStartup();

const towerPavingMaterial=paving;
await yieldStartup();

const towerLawnMaterial=grass;
await yieldStartup();

function towerSurface(w,d,x,z,material,y=GROUND_LEVEL){
 y=GROUND_LEVEL;
 const geometry=new THREE.PlaneGeometry(w,d),positions=geometry.attributes.position,uv=geometry.attributes.uv;for(let i=0;i<positions.count;i++)uv.setXY(i,(x+positions.getX(i)-21.5)/53,(26.5+positions.getY(i)-(z+48))/53);
 const mesh=new THREE.Mesh(geometry,material);
 mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);
 walkSurfaces.push({x,z,w,d,y,source:'needle-loop',kind:material===asphalt?'road':'paving'});
 mesh.name=material===asphalt?'Z-View plaza loop road':'Z-View plaza stone paving';mesh.receiveShadow=true;scene.add(mesh);return mesh;
}
// The loop ends at the city sidewalk edges. Its inner edge also meets the paving exactly.
// No black access strip is drawn over an existing concrete sidewalk.
for(const dz of[-30.25,30.25])towerSurface(68,7.5,48,-48+dz,loopRoadMaterial);
await yieldStartup();

for(const dx of[-30.25,30.25])towerSurface(7.5,53,48+dx,-48,loopRoadMaterial);
await yieldStartup();

towerSurface(53,53,48,-48,towerPavingMaterial);
await yieldStartup();

// Landscape pockets at the four corners of the tower island.
for(const dx of [-20,20])for(const dz of [-20,20]){
 const insetLawnMaterial=applyRealisticGrass(towerLawnMaterial.clone());insetLawnMaterial.polygonOffsetFactor=-2;insetLawnMaterial.polygonOffsetUnits=-4;const bed=new THREE.Mesh(new THREE.CircleGeometry(5.5,32),insetLawnMaterial);
 bed.rotation.x=-Math.PI/2;bed.position.set(48+dx,GROUND_LEVEL,-48+dz);
 bed.receiveShadow=true;scene.add(bed);
}
await yieldStartup();

// Removed elevated decorative curb strips around the tower loop.
// They projected as stray white lines across nearby roadway and sidewalk.
// Existing sidewalk edges remain defined by the road grid.
observationNeedle=createObservationNeedle(scene,{x:48,z:-48,getPlayer:()=>player,inLobby:()=>insideNeedleLobby,onMessage:m=>townControls.notify(m),onTravel:(x,y,z)=>{player.x=x;player.z=z;}});
await yieldStartup();

// Place Brewstone on the north side of the east-west street, opposite the dealership.
// Its south-facing entrance and patio face the road; the showroom stays unobstructed.
zFortune=createZFortune(scene,{getPlayer:()=>player,onMessage:m=>townControls.notify(m)});
const fortuneShadeTrees=createFortuneShadeTrees(scene);styleCutsGrove=createStyleCutsGrove(scene);
powersports=createPowersportsCenter(scene,{getPlayer:()=>player,getHeight:groundHeightAt,canMove:(x,z)=>walkable(x,z)&&!southBeach?.blocksVehicle(x,z)&&!cars.some(c=>Math.hypot(x-c.x,z-c.z)<1.7),canInteract:()=>!activeCar&&!scooters?.riding&&!powersports?.riding&&!skate?.riding&&!marine?.riding&&!zCabs?.riding&&!insideHouse()&&!airfield?.boarded&&!carnival?.riding&&!observationNeedle?.riding&&!sittingSeat&&!bedRest?.active,onStop:()=>{keys.clear();movement.vx=movement.vz=movement.wheelImpulse=0;townControls.stop();driverWheelThrottle=rideWheelThrottle=0;drivingControls?.reset();mouseVehicleSteering?.reset();},onMount:heading=>{sittingSeat=null;seatReturn=null;yaw=heading;pitch=-.04;driverLookYaw=driverLookPitch=0;},onMessage:m=>townControls.notify(m)});
await yieldStartup();

const coffeeShop=createCoffeeShop(scene,{x:-28,z:-132,getPlayer:()=>player,getOccupiedSeats:()=>coffeeCustomers?.reservedSeats||[]});
await yieldStartup();

 // Connect the commercial forecourt and cafe patio to their respective sidewalks.
 // Removed the obsolete central slab overlapping the shared salon/dealership forecourt.
 // The full cafe stone terrace now meets the sidewalk directly.
 // Removed the oversized mid-block stripe crossing at the old cafe approach.
// Walk-in showroom just west of Brewstone Coffee, with three fictional display vehicles.
const dealership={
 x:-31,z:-48,insidePoint:{x:-31,z:-57},exitPoint:{x:-31,z:-64},inside:()=>false,blocks:()=>false,isNear:(x,z,r=5.5)=>Math.hypot(x+31,z+62)<r,
 nearestCar:()=>null
};
await yieldStartup();

import('./zerconda-dealership.js?v=20261120-four-trucks-v184')
 .then(({createDealership})=>Object.assign(dealership,createDealership(scene,{x:-31,z:-48,rotation:Math.PI/2,getPlayer:()=>player})))
 .catch(err=>{console.error('Dealership asset failed (city continues):',err);
   if(status)status.textContent='City loaded; dealership asset unavailable: '+err.message;
 });
await yieldStartup();

const airDancers=addAirDancers(scene,{x:-31,z:-48});
await yieldStartup();

club=createClubZerconda(scene,{
 getPlayer:()=>player,getYaw:()=>yaw,
 pauseMovement:()=>{keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;},
 canEnter:()=>!barber?.active&&!office?.active&&!boutique?.active&&!bowling?.active&&!scooters?.riding&&!powersports?.riding&&!skate?.riding&&!activeCar&&!apartmentSession&&!universalSession&&!onObservationDeck,
 stopMovement:()=>{keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;sittingSeat=null;seatReturn=null;player.clubSeated=false;}
});
await yieldStartup();

BOOT('Building the hospital and apartments');
brickApartments=createBrickApartmentsExterior(scene,{walkMaterial:paving,lobbyOpening:true});venueAccessRoads=createVenueAccessRoads(scene,{asphalt,paving});
canopyVenue=createCanopyVenue(scene,{roadMaterial:asphalt,getPlayer:()=>player,onFace:heading=>{yaw=heading;},registerAction:registerTownAction,stopMovement:()=>{keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;sittingSeat=null;},canEnter:()=>!activeCar&&!scooters?.riding&&!powersports?.riding&&!marine?.riding});
await yieldStartup();

venueRenderIsolation=createVenueRenderIsolation(scene,{isInside:()=>freeApartments?.mode==='home'||!!gunStore?.active||!!hospital?.active||!!canopyVenue?.active||(!!cityview?.active&&!cityview.balcony),getKeep:()=>freeApartments?.mode==='home'?[freeApartments.root,avatar,...(freeApartments.mode==='lobby'?[brickApartments.root]:[])]:gunStore?.active?[gunStore.root,avatar,...(gunGame?.renderRoots||[]),...scene.children.filter(n=>/sky|cloud|mountain backdrop|alpine horizon/i.test(n.name))]:hospital?.active?[hospital.root,avatar,...scene.children.filter(n=>/sky|cloud|mountain backdrop|alpine horizon/i.test(n.name))]:cityview?.active?[cityview.renderRoot,cityview.exterior,avatar,...scene.children.filter(n=>/sky|cloud|mountain backdrop|alpine horizon/i.test(n.name))]:[canopyVenue?.root,canopyVenue?.access,avatar],getContext:()=>canopyVenue?.active?canopyVenue.context:null,getFillLights:()=>canopyVenue?.renderFillLights||[],getLightBudget:()=>renderBudget.stats(),maxPointLights:MOBILE?2:4,maxSpotLights:1});
southBeach=createZercondaBeach(scene,{prepareModel:prepareScenery,roadMaterial:asphalt,roadCenters:[-418,...roadLines]});
beachKate=createBeachKate(scene,{beach:southBeach,getPlayer:()=>player});
hospital=createZercondaHospital(scene,{walkMaterial:paving,getPlayer:()=>player,roadMaterial:asphalt,canEnter:()=>!activeCar&&!scooters?.riding&&!powersports?.riding&&!marine?.riding});
gunStore=createGunsAmmoStore(scene,{getPlayer:()=>player,roadMaterial:asphalt,canEnter:()=>!activeCar&&!scooters?.riding&&!powersports?.riding&&!marine?.riding});

await yieldStartup();


// Ocean safety: remove legacy oversized pyramid/mountain meshes if a previous
// scene module adds them. Never remove the observation needle or beach umbrellas.
function removeLegacyOceanPyramids(){
 const rejected=[];
 scene.updateMatrixWorld(true);
 scene.traverse(object=>{
  if(!object.isMesh||!object.geometry)return;
  const geo=object.geometry;
  if(!geo.boundingBox)geo.computeBoundingBox();
  const bb=geo.boundingBox;if(!bb)return;
  const size=bb.getSize(new THREE.Vector3());
  const worldPos=object.getWorldPosition(new THREE.Vector3());
  const scale=object.getWorldScale(new THREE.Vector3());
  const height=size.y*Math.abs(scale.y),width=Math.max(size.x*Math.abs(scale.x),size.z*Math.abs(scale.z));
  const pyramidShape=/ConeGeometry|TetrahedronGeometry|CylinderGeometry/.test(geo.type);
  if(pyramidShape&&width>25&&height>18&&worldPos.z>155)rejected.push(object);
 });
 for(const object of rejected){object.parent?.remove(object);}
 if(rejected.length)console.warn('Removed legacy ocean pyramids:',rejected.length);
}
removeLegacyOceanPyramids();
await yieldStartup();



// Removed the obsolete dead-end commercial access road and its two sidewalks.
// This corridor ended directly at a building and overlapped the landscaped block.
// The main city street grid remains intact; no replacement road is drawn here.
// Keep the cafe south-facing across the east-west road from the dealership.
// No rotation: furniture, collision bounds and seating coordinates remain aligned.
// Populate tower surroundings and distant horizon with detailed 3D architecture.
const cityDepth=addCityDepth({scene,asphalt,paving,grass});
await yieldStartup();


/* Road safety pass: inspect actual world-space mesh bounds, not just building
   origin coordinates. This catches balconies, rotated houses, and skyline kits. */
function clearRoadIntrusions(){
 scene.updateMatrixWorld(true);
 const roadCenters=[-96,0,96],safeHalf=15.25;
 const bounds=new THREE.Box3(),size=new THREE.Vector3(),center=new THREE.Vector3();
 let removed=0;
 function conflicts(b){
  return roadCenters.some(c=>
   (b.min.x<c+safeHalf&&b.max.x>c-safeHalf&&b.min.z<242&&b.max.z>-285)||
   (b.min.z<c+safeHalf&&b.max.z>c-safeHalf&&b.min.x<570&&b.max.x>-276));
 }
 function inspect(parent){
  for(const obj of [...parent.children]){
   if(!obj.isGroup||obj.userData.roadInfrastructure||obj.userData.wilderness||obj.userData.customInterior){continue;}
   // Apartment entrance paths may meet the sidewalk. Validate the building/canopy
   // envelope separately so a legal pedestrian connection cannot delete its building.
   if(obj.userData.residentialExterior&&obj.userData.roadClearanceBounds){
    const f=obj.userData.roadClearanceBounds;
    bounds.min.set(-f.w/2,0,-f.d/2);bounds.max.set(f.w/2,f.h,f.d/2);bounds.applyMatrix4(obj.matrixWorld);
    if(conflicts(bounds)){parent.remove(obj);removed++;}
    continue;
   }
   // Inspect individual authored building / tree groups, never whole districts.
   bounds.setFromObject(obj);if(bounds.isEmpty())continue;
   bounds.getSize(size);bounds.getCenter(center);
   if(size.y>3.5&&size.y<110&&size.x>1&&size.x<65&&size.z>1&&size.z<65){
    // Building body or a street tree: clear the full footprint, including
    // steps, balcony projections and canopy, from the driving corridor.
    if(conflicts(bounds)){
     parent.remove(obj);removed++;continue;
    }
   }
   inspect(obj);
  }
 }
 inspect(scene);
 console.info('ZERCONDA road intrusion cleanup:',removed,'objects removed');
 return removed;
}
clearRoadIntrusions();
await yieldStartup();


// Dedicated green space behind Z-View, outside the downtown building grid.
needleSportsPark=createNeedleSportsPark(scene,{x:48,z:-190,getPlayer:()=>wildlifePlayer});
await yieldStartup();

// Extend pedestrian access north from the existing street grid to the park entrance.
box(4,.065,37,48,.005,-123,paving);
await yieldStartup();

for(const zz of [-112,-123,-134]){box(.18,.025,2,48,.06,zz,yellow);}
await yieldStartup();

const apartments=apartmentExperience=createApartmentExperience({scene,x:1050,z:1050,getPlayer:()=>player,onMessage:message=>townControls.notify(message),onTeleport:(x,y,z,heading)=>{yaw=heading;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;camera.position.set(x,y+1.68,z);}});
await yieldStartup();

apartments.root.visible=false;
await yieldStartup();

let apartmentSession=null,apartmentFloor=0;
await yieldStartup();

// The old cartoon fountain, tiled boxes, sphere bushes, and procedural benches
// have been REMOVED. The GLB supplies the entire detailed plaza instead.
let realisticPlaza=null;
await yieldStartup();

installRealisticFountain({scene,centerX:48,centerZ:48,renderer})
 .then(plaza=>{realisticPlaza=plaza;walkSurfaces.push({x:48,z:48,w:54,d:54,y:GROUND_LEVEL});
  if(status)status.textContent='Real 3D fountain plaza loaded at (48,48)';
 })
 .catch(err=>{console.error('Real fountain asset unavailable:',err);
  if(status)status.textContent='Fountain GLB missing: upload the model to GitHub first';
 });
await yieldStartup();


// Trees are only placed in designated landscape strips on blocks.
// NEVER on road, parking lanes, intersections, or inside fountain plaza.
const treeSpots=[];
await yieldStartup();

for(const c of roadLines){
 for(let p=-145;p<=145;p+=23){
  if(roadLines.some(v=>Math.abs(p-v)<22))continue;
  for(const side of [-1,1]){
   // Leave room for the full tree base beyond the road, sidewalk and corner returns.
   for(const [x,z] of [[c+side*19,p],[p,c+side*19]]){
    if(Math.abs(x)>162||Math.abs(z)>162)continue;
    // Coastal houses occupy z=135, with walls and balconies extending beyond the lot.
    // Reserve the complete residential frontage plus tree-canopy clearance.
    if(x>110&&x<220&&z> -270&&z< -121)continue;
    if(x> -82&&x< -15&&z> -84&&z< -34)continue;
    if(x> -82&&x< -14&&z> -153&&z< -109)continue; // Clear the relocated cafe, its entrance and the future building lot.
    if(z>72&&z<172&&Math.abs(x)<185)continue; // Protect entire beachside residential blocks, including full tree canopies
    if(x>12&&x<84&&z> -250&&z< -135||Math.abs(x+51.5)<12&&Math.abs(z+48)<44||Math.abs(x+72)<17&&Math.abs(z+48)<19||nearRoad(x,z,8.5)||insideBuilding(x,z,1.5)||inPlaza(x,z,2)||Math.abs(x-48)<39&&Math.abs(z+48)<39||doors.some(d=>Math.hypot(x-d.x,z-d.z)<entranceClearance)||Math.abs(x+34)<22&&Math.abs(z+48)<23)continue;
    if(club?.blocks(x,z)||ownableHomes.inLot(x,z)||apartmentExteriors.some(b=>Math.hypot(x-b.entry.x,z-b.entry.z)<5)||Math.abs(x-126)<17&&Math.abs(z-69)<18||Math.abs(x-140)<28&&Math.abs(z-35)<23||Math.abs(x-188)<23&&Math.abs(z-61)<21||Math.abs(x-136)<25&&Math.abs(z+49)<25||x< -125&&x> -270&&z>48&&z<84)continue;
    if(Math.abs(x-115)<1&&Math.abs(z+76)<1)continue; // Reserve one tree at the news lawn corner.
    if(treeSpots.some(([a,b])=>Math.hypot(x-a,z-b)<10))continue;
    // Move the rear news-wall tree to the intersection lawn corner.
    const newsRearCorner=Math.abs(x-131)<1&&Math.abs(z+77)<1;
    treeSpots.push(newsRearCorner?[115,-77]:[Math.abs(x-136)<8&&z>-35&&z<-12?114:x,z]);
   }
  }
 }
}
await yieldStartup();

// Streetlights placed in 4m sidewalks (offset 11.5 from road centers).
// Avoid crossings/intersections and keep at least 3m from tree trunks.
const lampSpots=[];
await yieldStartup();

for(const c of roadLines){
 for(let p=-144;p<=144;p+=32){
  if(roadLines.some(v=>Math.abs(p-v)<22))continue;
  for(const side of [-1,1]){
   const a=[c+side*11.5,p],b=[p,c+side*11.5];
   for(const [x,z] of [a,b]){
    if(x>12&&x<84&&z> -220&&z< -105||nearRoad(x,z,.6)||inPlaza(x,z,3)||insideBuilding(x,z,2)||Math.abs(x-48)<39&&Math.abs(z+48)<39)continue;
    if(ownableHomes.isApproach(x,z))continue;
    if(treeSpots.some(([tx,tz])=>Math.hypot(x-tx,z-tz)<4))continue;
    if(lampSpots.some(([lx,lz])=>Math.hypot(x-lx,z-lz)<8))continue;
    // Keep the club's front-door arrival lane free; light it from the side.
    lampSpots.push([Math.abs(x+48)<6&&Math.abs(z+11.5)<1?-58:x,z]);
   }
  }
 }
}
await yieldStartup();

// Parallel curbside parking: vehicles sit alongside sidewalks, never in travel lanes.
// Road asphalt half-width is 9.5m; car centers are 8.55m from centerline,
// leaving approximately 0.95m for the outer half of a 1.9m-wide vehicle.
const parking=[];
await yieldStartup();

const curbOffset=8.48;
await yieldStartup();

const parkingSamples=[-160,-152,-144,-136,-128,-120,-112,-80,-72,-64,-56,-48,-40,-32,-24,24,32,40,48,56,64,72,80,112,120,128,136,144,152,160];
await yieldStartup();

for(const center of roadLines){
 for(const along of parkingSamples){
  // No parking at intersections or across pedestrian crossings.
  if(roadLines.some(cross=>Math.abs(along-cross)<24))continue;
  if(center===0&&along> -57&&along< -39)continue; // Keep the club entrance approach clear.
  if(center===-96&&along> -61&&along< -35)continue; // Commercial mid-block crossing.
  for(const side of [-1,1]){
   for(const vertical of [true,false]){
    const x=vertical?center+side*curbOffset:along;
    const z=vertical?along:center+side*curbOffset;
    if(Math.abs(x)>160||Math.abs(z)>160)continue;
    if(inIntersection(x,z,16)||inPlaza(x,z,7))continue;
    if(doors.some(d=>Math.hypot(x-d.x,z-d.z)<9))continue;
    if(ownableHomes.isApproach(x,z))continue;
    if(parking.some(p=>Math.hypot(x-p[0],z-p[1])<7.2))continue;
    // Cars follow the street direction, parallel to the curb.
    parking.push([x,z,vertical?0:Math.PI/2]);
   }
  }
 }
}
await yieldStartup();

parking.sort((a,b)=>Math.hypot(a[0]-48,a[1]-48)-Math.hypot(b[0]-48,b[1]-48));
await yieldStartup();

for(const index of [4,12]){const p=parking[index];if(!p)continue;const [x,z,angle]=p,g=createShowroomPickup({name:index===4?'Zerconda Ridge Sandstone':'Zerconda Ridge Graphite',color:index===4?'#c7bb96':'#49535c'});g.position.set(x,.02,z);g.rotation.y=angle;improveVehicleCabin(g);scene.add(g);cars.push({group:g,x,z,angle,speed:0,eyeHeight:1.9,type:'pickup'});}
await yieldStartup();


const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
await yieldStartup();

function load(key){
 if(key==='tree'||key==='tree2')return loadStreetTree(key==='tree'?'small':'island');
 return new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('Optional model timed out: '+key)),15000);loader.load(PATH[key].startsWith('http')?PATH[key]:BASE+PATH[key],g=>{clearTimeout(timeout);resolve(g.scene);},undefined,error=>{clearTimeout(timeout);reject(error);});});
}
function cloneNormalized(source,x,z,targetHeight,angle=0){
 const g=source.clone(true),bounds=new THREE.Box3().setFromObject(g);
 const size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
 if(size.y<.0001)return null;
 const s=targetHeight/size.y;
 g.scale.setScalar(s);
 g.position.set(0,0,0);
 // Align the vehicle's actual long axis with the road, regardless of GLB export orientation.
 const longAxisX=size.x>size.z;
 // Imported vehicles can have either local X or local Z as their forward axis.
 // Preserve curb-parallel alignment by mapping the measured long axis to the road.
 g.rotation.y=angle+(longAxisX?Math.PI/2:0);
 // Imported origins can be far from the mesh. Center AFTER rotation so
 // rotating an off-center tree cannot move its base into the street.
 g.updateMatrixWorld(true);
 const placedBounds=new THREE.Box3().setFromObject(g);
 const placedCenter=placedBounds.getCenter(new THREE.Vector3());
 g.position.set(x-placedCenter.x,-placedBounds.min.y,z-placedCenter.z);
 g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});
 scene.add(g);return g;
}
async function populate(){
 await waitForScenerySlot();const assets=await Promise.allSettled([loadReferenceProp('sport'),loadLuxurySedan(),load('tree'),load('tree2'),loadConceptSUV()]);const sportTemplate=assets[0].status==='fulfilled'?assets[0].value:null;for(const [i,key]of[[2,'tree'],[3,'tree2']])if(assets[i].status==='fulfilled')loaded[key]=assets[i].value;
 // Two Concept SUVs use existing curbside spaces nearest Zerconda Motors.
 const suvSlots=new Set();
 if(assets[4].status==='fulfilled'){
  const candidates=parking.map((slot,i)=>({slot,i})).filter(o=>o.i!==4&&o.i!==12&&Math.hypot(o.slot[0]-player.x,o.slot[1]-player.z)>=6).sort((a,b)=>Math.hypot(a.slot[0]+31,a.slot[1]+48)-Math.hypot(b.slot[0]+31,b.slot[1]+48));
  for(const{slot,i}of candidates){if(suvSlots.size===2)break;await waitForScenerySlot();const[x,z,angle]=slot,model=createConceptSUV(),pivot=new THREE.Group();pivot.name='Drivable Zerconda Concept SUV';pivot.userData.vehicleType='concept-suv';pivot.userData.cabinImproved=true;pivot.add(model);pivot.position.set(x,0,z);pivot.rotation.y=angle;addVehicleLOD(pivot,'concept-suv-graphite');const footprint=measureVehicleFootprint(THREE,pivot);if(vehiclePoseBlocked({group:pivot,x,z,angle,footprint},x,z,angle,cars.map(c=>({...c,footprint:measureVehicleFootprint(THREE,c.group)}))))continue;await prepareScenery(pivot);scene.add(pivot);cars.push({group:pivot,x,z,angle,speed:0,eyeHeight:1.48,type:'concept-suv'});suvSlots.add(i);}
 }
 const carModels=Array.from({length:MOBILE?16:32},(_,i)=>['sedan','white','sport','white','sedan'][i%5]);
 const luxuryReady=assets[1].status==='fulfilled';let luxuryIndex=0,luxurySlot=0;const nearbyParking=parking.map((slot,i)=>({slot,i})).slice(0,carModels.length).sort((a,b)=>Math.hypot(a.slot[0]-player.x,a.slot[1]-player.z)-Math.hypot(b.slot[0]-player.x,b.slot[1]-player.z));for(const {slot,i}of nearbyParking){await waitForScenerySlot();
  if(i===4||i===12||suvSlots.has(i))continue;
  const [x,z,angle]=slot,src=loaded[carModels[i]];if(Math.hypot(x-player.x,z-player.z)<6)continue;
  const luxury=carModels[i]==='sedan'||carModels[i]==='white';
  // Keep alternating silver-car spaces open; retain sports cars and both truck slots.
  if(luxury&&(luxurySlot++%2===1))continue;
  if(luxury&&!luxuryReady||!luxury&&carModels[i]==='sport'&&!sportTemplate||!luxury&&carModels[i]!=='sport'&&!src)continue;
  const model=luxury?createLuxurySedan({color:sedanColors[(luxuryIndex++)%sedanColors.length]}):carModels[i]==='sport'?sportTemplate.clone(true):cloneNormalized(src,0,0,1.55,0);
  if(model){const pivot=new THREE.Group();pivot.name='Drivable passenger car';pivot.position.set(x,0,z);pivot.rotation.y=angle;pivot.add(model);if(luxury||carModels[i]==='sport')pivot.userData.cabinImproved=true;else improveVehicleCabin(pivot);const variantKey=luxury?'luxury-'+model.userData.paint:carModels[i];pivot.userData.vehicleType=luxury?'luxury-sedan':carModels[i];optimizeStaticModel(pivot,'passenger-'+variantKey);addVehicleLOD(pivot,variantKey);await prepareScenery(pivot);const footprint=measureVehicleFootprint(THREE,pivot);if(vehiclePoseBlocked({group:pivot,x,z,angle,footprint},x,z,angle,cars.map(o=>({...o,footprint:measureVehicleFootprint(THREE,o.group)}))))continue;scene.add(pivot);cars.push({group:pivot,x,z,angle,speed:0,eyeHeight:luxury?1.22:carModels[i]==='sport'?.95:1.58});}
 }
 const assetKeys=[];
 for(const key of assetKeys){await waitForScenerySlot();try{loaded[key]=await load(key);}catch(error){console.warn('Optional model unavailable',key,error);}}
 // Nearby street trees go in before distant boundary props.

 const nearbyTrees=treeSpots.map((slot,i)=>({slot,i})).filter(o=>!MOBILE||o.i%2===0).sort((a,b)=>Math.hypot(a.slot[0]-player.x,a.slot[1]-player.z)-Math.hypot(b.slot[0]-player.x,b.slot[1]-player.z));for(const {slot,i}of nearbyTrees){await waitForScenerySlot();
  const [x,z]=slot;if(Math.hypot(x-player.x,z-player.z)<6)continue;const src=loaded[i%2?'tree2':'tree']||loaded.tree||loaded.tree2;
  if(x>110&&x<220&&z> -270&&z< -121)continue;
    if(x> -82&&x< -15&&z> -84&&z< -34)continue;
    if(x> -82&&x< -14&&z> -153&&z< -109)continue; // Clear the relocated cafe, its entrance and the future building lot.
    if(z>72&&z<172&&Math.abs(x)<185)continue; // Protect entire beachside residential blocks, including full tree canopies
  if(src&&!doors.some(d=>Math.hypot(x-d.x,z-d.z)<13)&&!(Math.abs(x+34)<24&&Math.abs(z+48)<24)){const tree=cloneNormalized(src,x,z,7+rand()*2.5,rand()*6.28);if(tree){tree.name='Road-cleared street tree';tree.userData.roadCleared=true;if(treeBoundsOverlapRoad(new THREE.Box3().setFromObject(tree)))scene.remove(tree);else {optimizeStaticModel(tree,'street-tree-'+(i%2));treeRoadMaintenance.checkRoot(tree);await prepareScenery(tree);}}}
 }
 nearbySceneryReady=true;
 await populateOuterForest();try{loaded.lamp=await load('lamp');}catch{loaded.lamp=null;}
 let lampBatch=0;for(const [x,z] of lampSpots){await waitForScenerySlot();if(Math.hypot(x-player.x,z-player.z)<3)continue;lampBatch++;
  if(loaded.lamp){const lamp=cloneNormalized(loaded.lamp,x,z,4.4);await prepareScenery(lamp);}
  else {cylinder(.09,.12,4.3,x,2.15,z,dark,scene,12);
    box(.5,.55,.5,x,4.6,z,stone);}
 }
 if(status)status.textContent='Zerconda · Fountain plaza at (48,48)';
}
let resolveScenery;
await yieldStartup();
const initialSceneryReady=new Promise(resolve=>{resolveScenery=resolve;});
await yieldStartup();
let sceneryStarted=false,sceneryFinished=false,nearbySceneryReady=false;
await yieldStartup();
// Core buildings and collision are already present. Stream optional scenery after entry.
function startScenery(){if(sceneryStarted)return;sceneryStarted=true;populate().then(()=>{sceneryFinished=true;resolveScenery();},error=>{sceneryFinished=true;console.warn('Some optional scenery could not load',error);resolveScenery();});}
addEventListener('zerconda-playable',()=>setTimeout(startScenery,1200),{once:true});

addPremiumPlazaFurniture(scene,{cx:48,cz:48});
await yieldStartup();

const START_X=34,START_Z=34;
await yieldStartup();
 // Open southwest edge of fountain plaza, clear of the central lamp and fountain.
const keys=new Set(),player={x:START_X,z:START_Z},clock=new THREE.Clock();
await yieldStartup();
wildlifePlayer=player;
await yieldStartup();

realEstate=createRealEstate(scene,{asphalt,paving,getPlayer:()=>player,onStop:()=>{keys.clear();townControls.stop();movement.vx=0;movement.vz=0;},onMessage:(m,duration)=>townControls.notify(m,duration),getListings:()=>availablePropertyListings({starter:ownableHomes,coastal,premier,villas,apartments:apartmentExteriors,apartmentOwned:apartments.owned}),onVisit:p=>travelToArea({name:p.title,x:p.x,z:p.z,yaw:p.yaw}),canUse:()=>!activeCar&&!zCabs?.riding&&!airfield?.boarded});
await yieldStartup();

const chessTables=createChessTables(scene,{getPlayer:()=>player,onSit:seat=>{if(!sittingSeat)seatReturn={x:player.x,z:player.z};sittingSeat=seat;player.x=seat.x;player.z=seat.z;yaw=seat.facing;movement.vx=movement.vz=movement.wheelImpulse=0;},onStop:()=>{keys.clear();townControls.stop();movement.vx=0;movement.vz=0;},canUse:()=>!activeCar&&!zCabs?.riding});
const chessPartner=createChessPartner(scene,{getPlayer:()=>player,getHeight:standingHeightAt,getSeat:()=>chessTables.seats.find(s=>s.tableId===8&&s.side===-1)});
await yieldStartup();

const treeRoadMaintenance=createRoadTreeMaintenance(scene,{asphalt,paving});
await yieldStartup();

const roadMap=createRoadMapGeometry(scene,asphalt);
await yieldStartup();
roadMap.scan();
await yieldStartup();
const cityMap=createCityMap({player,getHomes:()=>[...collectHomeLocations({starter:ownableHomes,premier,villas,coastal,apartments:apartmentExteriors,apartmentExperience}),...(cityview?[cityview.mapLocation()]:[])],getRoadPolygons:()=>roadMap.polygons,getLots:()=>realEstate.mapLots(),getNavigation:()=>{const cab=zCabs?.activeCab;if(!cab)return null;return{destination:cab.destination,points:[cab.root.position,...cab.path.points.filter((p,i)=>cab.path.lengths[i]>=cab.progress)]};}});
await yieldStartup();

// Third-person walking avatar: forward-facing, visible from the default camera.
// Kept lightweight so mobile devices do not need an additional model download.
const pedestrianSystem=createPedestrians(scene,{count:20,getPlayer:()=>player,getPeople:()=>[...cityResidents.collisionPeople,...(boardwalkFitness?.collisionPeople||[]),...(coffeeCustomers?.collisionPeople||[]),...(neighborhoodResidents?.collisionPeople||[]),...(needlePlaidResident.group.visible?[needlePlaidResident.group.position]:[]),...(boardwalkWalker.group.visible?[boardwalkWalker.group.position]:[]),...(whiteFitnessWalker.group.visible?[whiteFitnessWalker.group.position]:[]),...(curlyFitnessWalker.group.visible?[curlyFitnessWalker.group.position]:[]),...(curlyBusinessWalker.group.visible?[curlyBusinessWalker.group.position]:[]),...(fountainResident.group.visible?[fountainResident.group.position]:[])],groundHeightAt:(x,z)=>groundHeightAt(x,z)+.004,canWalk:(x,z)=>ambientResidentsAllowed(x,z)&&walkable(x,z)});
await yieldStartup();

const playerRig=pedestrianSystem.createHuman(0);
await yieldStartup();

const avatar=playerRig.root;
await yieldStartup();
avatar.name='Zerconda player avatar';
await yieldStartup();
avatar.userData.startupEssential=true;
await yieldStartup();
scene.add(avatar);
await yieldStartup();

let realAvatar=null,realAvatarMixer=null,realAvatarWalk=null,realAvatarIdle=null;
await yieldStartup();

const avatarBones={};
await yieldStartup();

const avatarRest={};
await yieldStartup();

// The old recolored GLB is intentionally retired. Use actual clothing meshes.
const dressedPlayer={root:new THREE.Group(),update:()=>{}};
await yieldStartup();

const realisticPlayer=createPlayerAppearance();
await yieldStartup();
const avatarTattoos=installAvatarTattoos(realisticPlayer);
await yieldStartup();
dressedPlayer.root.add(realisticPlayer.root);
await yieldStartup();

const fallbackPlayer=createClothedPlayer();
await yieldStartup();
dressedPlayer.root.add(fallbackPlayer.root);
await yieldStartup();
realisticPlayer.readyPromise.then(()=>{fallbackPlayer.root.visible=!realisticPlayer.ready;});
await yieldStartup();
let fallbackTime=0;
await yieldStartup();

dressedPlayer.root.userData.animate=(dt,speed,options)=>{if(realisticPlayer.ready){fallbackPlayer.root.visible=false;realisticPlayer.update(dt,speed,options);}else{fallbackTime+=dt;fallbackPlayer.update(fallbackTime,speed);}};
await yieldStartup();

avatar.add(dressedPlayer.root);
await yieldStartup();

const playerSoleOffset=0;
await yieldStartup();

// Hide ALL primitive pedestrian parts, including the old head, ears, neck and hands.
// Previously the old head remained visible over the detailed replacement.
for(const child of [...avatar.children])if(child!==dressedPlayer.root)child.visible=false;
await yieldStartup();

function updateRealAvatar(dt,time,speed){dressedPlayer.root.userData.animate?.(dt,speed,{seated:!!sittingSeat||!!powersports?.riding||!!marine?.riding,driving:!!powersports?.riding||!!marine?.riding||!!scooters?.riding&&!powersports?.riding,skating:!!skate?.riding,dancing:club?.dancing,backwards:movement.vx*Math.sin(yaw)+movement.vz*Math.cos(yaw)<-.03});}



let activeCar=null,yaw=0,pitch=0,drag=false,lastX=0,lastY=0;
await yieldStartup();

const cabPassengerCamera=createCabPassengerCamera();
await yieldStartup();
const playerCameraGuard=createPlayerCameraGuard();
await yieldStartup();

let boatMouseControls=null,boatLookYaw=0;
let driverLookYaw=0,driverLookPitch=0,driverSteer=0,driverWheelThrottle=0,drivingControls=null,mouseVehicleSteering=null,mouseSkateControls=null,rideWheelThrottle=0;
await yieldStartup();


// Initialize camera BEFORE the first frame. A blank sky must never be the default.
camera.position.set(START_X,5,START_Z-8);
await yieldStartup();

camera.lookAt(48,2,48);
await yieldStartup();

function resetView(){
 freeApartments?.leave();
 if(powersports?.riding&&!powersports.end())return;zCabs?.cancel();cancelHomePassage();
 zStore?.close();playerMenu?.close();tattooShop?.close();
 courtGames?.close();
 carnival?.close();camp?.stopRest();airfield?.exit();skate?.end();office?.exit();barber?.exit();villas?.close();observationNeedle?.reset();
 news?.close();
 if(boutique?.active)boutique.exit();
 if(bowling?.active)bowling.exit();
 scooters?.end();
 marine?.reset();
 sittingSeat=null;seatReturn=null;cafeInside=false;dealerInside=false;document.getElementById('zerconda-home-customizer').style.display='none';
 if(club?.active)club.toggle();
 if(universalSession)exitUniversalInterior(true);
 if(apartmentSession){apartmentSession=null;apartments.hide();floorPanel.style.display='none';}
 activeCar=null;driverLookYaw=0;driverLookPitch=0;driverSteer=0;mouseVehicleSteering?.reset();onObservationDeck=false;insideNeedleLobby=false;player.x=START_X;player.z=START_Z;yaw=0;pitch=0;
 camera.position.set(START_X,5,START_Z-8);camera.lookAt(48,2,48);
 if(status)status.textContent='View reset · Walk forward with W';
}
addEventListener('keydown',e=>{if(cityview?.panelOpen||cityview?.riding||adminAccount?.panelOpen||controlsGuide?.panelOpen||adminTransport?.active||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||zCabs?.riding||zCabs?.panelOpen||(hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen)return;if(!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)&&!club?.gameOpen&&e.code==='KeyR')resetView();});
await yieldStartup();

const resetButton=document.createElement('button');
await yieldStartup();
resetButton.textContent='RESET VIEW';
await yieldStartup();

resetButton.id='zerconda-reset-view';
await yieldStartup();
resetButton.type='button';
await yieldStartup();
resetButton.style.cssText='position:fixed;right:12px;top:12px;z-index:9999;padding:12px 16px;background:#203b49;color:white;border:1px solid #9ab5c4;border-radius:8px;cursor:pointer';
await yieldStartup();

resetButton.addEventListener('click',resetView);
await yieldStartup();
document.body.appendChild(resetButton);
await yieldStartup();

const movement={vx:0,vz:0,wheelImpulse:0};
await yieldStartup();

 // Explicit ocean-facing beach arrival. The ocean is at positive Z.
 // The normal plaza camera can look inland and mistakenly appear to show
 // the beach wall; this provides a reproducible shoreline viewpoint.
 const beachButton=document.createElement('button');
await yieldStartup();

 beachButton.textContent='GO TO BEACH';
await yieldStartup();

 beachButton.id='zerconda-beach';
await yieldStartup();
beachButton.type='button';
await yieldStartup();

 beachButton.style.cssText='position:fixed;right:12px;top:66px;z-index:9999;padding:12px 16px;background:#126879;color:white;border:1px solid #9ed6dd;border-radius:8px;cursor:pointer';
await yieldStartup();

 beachButton.addEventListener('click',()=>{carnival?.close();camp?.stopRest();airfield?.exit();skate?.end();office?.exit();barber?.exit();villas?.close();observationNeedle?.reset();news?.close();if(boutique?.active)boutique.exit();if(bowling?.active)bowling.exit();scooters?.end();
  marine?.reset();
  sittingSeat=null;seatReturn=null;dealerInside=false;document.getElementById('zerconda-home-customizer').style.display='none';
  if(universalSession)exitUniversalInterior(true);
  if(club?.active)club.toggle();
  if(apartmentSession){apartmentSession=null;apartments.hide();}
  activeCar=null;insideNeedleLobby=false;onObservationDeck=false;cafeInside=false;
  player.x=0;player.z=225;yaw=0;pitch=-.04;
  movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
  camera.position.set(0,4.5,218);
  camera.lookAt(0,1.6,280);
  if(status)status.textContent='South Beach · Ocean straight ahead · W to walk toward the water';
 });
await yieldStartup();

 document.body.appendChild(beachButton);
await yieldStartup();


const WALK_SPEED=3.6,RUN_SPEED=7.8,ACCELERATION=9,DECELERATION=12;
await yieldStartup();

const WHEEL_STEP=1.5,WHEEL_MAX=4;
await yieldStartup();

// Live diagnostics: distinguish a blank render from a covered/lost WebGL canvas.
const diag=document.createElement('div');
await yieldStartup();

diag.id='zerconda-render-diagnostics';
await yieldStartup();

diag.id='zerconda-diagnostics';
await yieldStartup();
diag.style.cssText='position:fixed;left:8px;bottom:10px;z-index:99999;background:rgba(0,0,0,.82);color:#c5ffcf;padding:8px 11px;font:12px monospace;pointer-events:none;white-space:pre-line;border-radius:5px;max-width:95vw';
await yieldStartup();

document.body.appendChild(diag);
await yieldStartup();

let contextLost=false,renderFailure='';
await yieldStartup();

renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;renderFailure='WebGL context lost';});
await yieldStartup();

renderer.domElement.addEventListener('webglcontextrestored',()=>{contextLost=false;renderFailure='WebGL context restored';});
await yieldStartup();

// Unlit diagnostic marker at (48,2,29), in front of the player.
// If this is invisible despite nonzero draw calls, investigate canvas overlay/CSS.
let diagnosticFrames=0;
await yieldStartup();

renderer.domElement.addEventListener('wheel',e=>{
 e.preventDefault();
 if(courtGames?.tennisActive)return;
 if(powersports?.riding||skate?.riding||scooters?.riding){rideWheelThrottle=THREE.MathUtils.clamp(rideWheelThrottle+Math.sign(-e.deltaY)*.75,-1,1);return;}
 if(activeCar){driverWheelThrottle=THREE.MathUtils.clamp(driverWheelThrottle+Math.sign(-e.deltaY)*.4,-1,1);return;}
 const dir=Math.sign(-e.deltaY);
 if(!dir)return;
 movement.wheelImpulse=THREE.MathUtils.clamp(
  movement.wheelImpulse+dir*WHEEL_STEP,-WHEEL_MAX,WHEEL_MAX);
},{passive:false});
await yieldStartup();

addEventListener('keydown',e=>{if(cityview?.panelOpen||cityview?.riding||adminAccount?.panelOpen||controlsGuide?.panelOpen||adminTransport?.active||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||zCabs?.riding||zCabs?.panelOpen||(hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen)return;if(carnival?.riding||carnival?.gameOpen||observationNeedle?.riding||villas?.panelOpen||barber?.panelOpen||['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)||club?.gameOpen||(ownableHomes?.panelOpen||coastal?.panelOpen||apartments?.panelOpen||(bowling?.gameOpen||(boutique?.panelOpen||(news?.panelOpen||(camp?.resting||airfield?.controlsLocked)))))||marine?.panelOpen)return;keys.add(e.code);if(e.code==='KeyE'&&!e.repeat){if(powersports?.riding){powersports.end();return;}if(skate?.riding){skate.end();return;}if(scooters?.riding){scooters.end();return;}if(club?.active||(!activeCar&&club?.near()))club.toggle();else if(apartmentSession)apartmentAction();else if(nearCafeEntrance()||cafeInside)enterCafe();else if(dealership.isNear(player.x,player.z,5.5)||dealerInside)visitDealership();else toggleCar();}if(e.code==='KeyF'&&!e.repeat){if(universalSession)exitUniversalInterior();else if(nearestUniversalEntrance())enterUniversalInterior();else toggleNearbyDoor();}if(e.code==='KeyT'&&!e.repeat)toggleObservationDeck();
 if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();});
await yieldStartup();

addEventListener('keyup',e=>keys.delete(e.code));
await yieldStartup();

const enter=document.getElementById('enter');
await yieldStartup();
if(enter){enter.onclick=toggleCar;registerTownAction(enter,{id:'vehicle',priority:80,target:()=>{const c=nearestUsableCar();return c?{x:c.x,y:1,z:c.z}:null;}});}
await yieldStartup();

// Context-sensitive actions: accessible on keyboard and touch screens.
const actionButton=(id,label,bottom,callback)=>{
 const el=document.createElement('button');el.id=id;el.type='button';el.textContent=label;
 el.style.cssText='position:fixed;right:14px;bottom:'+bottom+'px;z-index:9999;padding:12px 15px;background:#203d50;color:white;border:1px solid #a2bac9;border-radius:9px;font:700 13px system-ui;display:none;cursor:pointer';
 el.addEventListener('click',callback);document.body.appendChild(el);
 registerTownAction(el,{id,priority:/door|enter|tower|apartment/.test(id)?100:/cafe-button|showroom/.test(id)?110:65,target:()=>actionTarget(id)});
 return el;
};
await yieldStartup();

function homeAction(){if(boutique?.active||bowling?.active||scooters?.riding)return;const home=ownableHomes.active||ownableHomes.closest(player.x,player.z,11);if(!home)return;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;ownableHomes.customize(home);}
const homeButton=actionButton('zerconda-home-action','H · HOME OPTIONS',365,homeAction);
await yieldStartup();

addEventListener('keydown',e=>{if(cityview?.panelOpen||cityview?.riding||adminAccount?.panelOpen||controlsGuide?.panelOpen||adminTransport?.active||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||zCabs?.riding||zCabs?.panelOpen||(hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen)return;if(e.code==='KeyH'&&!e.repeat&&!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)){homeAction();}});
await yieldStartup();

const towerButton=actionButton('zerconda-tower-button','ENTER TOWER / ELEVATOR',245,toggleObservationDeck);
await yieldStartup();

const towerExitButton=actionButton('zerconda-tower-exit','Exit Z-View',245,()=>{insideNeedleLobby=false;onObservationDeck=false;player.x=observationNeedle.entrance.x;player.z=observationNeedle.entrance.z+2.2;yaw=0;keys.clear();movement.vx=0;movement.vz=0;camera.position.set(player.x,3.2,player.z-4);});
await yieldStartup();

const doorButton=actionButton('zerconda-door-button','F · ENTER BUILDING',305,()=>{if(universalSession)exitUniversalInterior();else if(nearestUniversalEntrance())enterUniversalInterior();else toggleNearbyDoor();});
await yieldStartup();

const apartmentButton=actionButton('zerconda-apartment-action','E · ELEVATOR / EXIT',425,apartmentAction);
await yieldStartup();

const floorPanel=document.createElement('div');
await yieldStartup();
floorPanel.id='zerconda-apartment-floors';
await yieldStartup();

floorPanel.style.cssText='position:fixed;left:14px;top:85px;z-index:10001;background:rgba(15,30,42,.92);color:white;border-radius:10px;padding:12px;display:none;font:13px system-ui;max-width:290px';
await yieldStartup();

floorPanel.classList.add('town-source-panel');
await yieldStartup();
floorPanel.innerHTML='<b>ZERCONDA APARTMENTS</b><p>Choose a floor to visit:</p>';
await yieldStartup();

document.body.appendChild(floorPanel);
await yieldStartup();

function setApartmentFloor(f){if(!apartmentSession)return;apartmentFloor=f;apartments.showFloor(f);apartments.arrive();movement.vx=0;movement.vz=0;}
function apartmentAction(){if(!apartmentSession||apartments.riding)return;if(apartments.currentUnit){apartments.leaveUnit();return;}if(apartments.currentFloor!==0){apartments.rideElevator(0);return;}const back=apartmentSession;apartments.hide();apartmentSession=null;floorPanel.style.display='none';player.x=back.x;player.z=back.z;movement.vx=0;movement.vz=0;camera.position.set(player.x,groundHeightAt(player.x,player.z)+2,player.z-2);}
function enterApartment(d){if(apartmentSession)return;const building=d.building||buildings.find(b=>Math.hypot(d.x-b.entry.x,d.z-b.entry.z)<2);if(!building)return;apartmentSession={x:player.x,z:player.z,building};apartments.configure(building);apartments.root.visible=true;activeCar=null;setApartmentFloor(0);}
// Legacy overlay cleanup: older Airo button can survive alongside the new UI.
const fixLegacyDoorButton=b=>{if(b&&b!==doorButton&&/^(?:F\s*[·:.\-]\s*)?(?:OPEN|CLOSE)\s+DOORS?$/i.test((b.textContent||'').trim())){b.textContent='F · ENTER BUILDING';b.onclick=()=>toggleNearbyDoor();}};
const fixLegacyDoorLabels=()=>document.querySelectorAll('button').forEach(fixLegacyDoorButton);
await yieldStartup();

fixLegacyDoorLabels();
await yieldStartup();

const legacyDoorObserver=new MutationObserver(records=>{for(const r of records){fixLegacyDoorButton(r.target.nodeType===1?r.target.closest('button'):null);for(const n of r.addedNodes)if(n.nodeType===1){if(n.matches('button'))fixLegacyDoorButton(n);n.querySelectorAll('button').forEach(fixLegacyDoorButton);}}});
await yieldStartup();

legacyDoorObserver.observe(document.body,{subtree:true,childList:true});
await yieldStartup();

const cafeButton=actionButton('zerconda-cafe-button','C · SIT DOWN',365,toggleCafeSeat);
await yieldStartup();

const dealerButton=actionButton('zerconda-dealership-button','E · ENTER DEALERSHIP',390,visitDealership);
await yieldStartup();

const showroomButton=actionButton('zerconda-showroom-car','View vehicle',390,()=>{const car=dealership.nearestCar(player.x,player.z,5);if(car)townControls.notify(car.name+' · Showroom display vehicle');});
await yieldStartup();

function visitDealership(){
 if(dealerInside){dealerInside=false;player.x=dealership.exitPoint.x;player.z=dealership.exitPoint.z;movement.vx=0;movement.vz=0;if(status)status.textContent='Exited Zerconda Motors';return;}
 if(!dealerInside&&dealership.isNear(player.x,player.z,5.5)){dealerInside=true;
  player.x=dealership.insidePoint.x;player.z=dealership.insidePoint.z;movement.vx=0;movement.vz=0;
  if(status)status.textContent='Welcome to Zerconda Motors · Meet our sales team and explore the display pickups';return;
 }
 const vehicle=dealership.nearestCar(player.x,player.z,5);
 if(vehicle){if(status)status.textContent=vehicle.name+' · Display vehicle · Visit the vehicle shop for purchases';return;}
 if(dealerInside){dealerInside=false;player.x=dealership.exitPoint.x;player.z=dealership.exitPoint.z;movement.vx=0;movement.vz=0;if(status)status.textContent='Exited Zerconda Motors';}
}
let sittingSeat=null,cafeInside=false;
await yieldStartup();

let bedRest=null;
await yieldStartup();

const cafeEntry={x:coffeeShop.entrance.x,z:coffeeShop.entrance.z};
await yieldStartup();

function nearCafeEntrance(){return Math.hypot(player.x-cafeEntry.x,player.z-cafeEntry.z)<4.5;}
function enterCafe(){if(sittingSeat){sittingSeat=null;}if(cafeInside){cafeInside=false;player.x=cafeEntry.x;player.z=cafeEntry.z+3.3;}else{cafeInside=true;player.x=cafeEntry.x;player.z=cafeEntry.z-3.6;}movement.vx=0;movement.vz=0;if(status)status.textContent=cafeInside?'Inside Brewstone Coffee · Find a table and press C':'Exited Brewstone Coffee';}
const cafeEntryButton=actionButton('zerconda-cafe-enter','E · ENTER COFFEE SHOP',445,enterCafe);
await yieldStartup();

// Public benches in Z-View plaza, fountain square and sports park.
// Positions match the authored benches in city-depth-assets.js and needle-sports-park.js.
function heldGunRoot(){return scene.children.find(n=>n.name==='Held Z game weapon');}
const publicSeats=[
 ...[[28,-28,0],[68,-28,0],[28,-68,Math.PI],[68,-68,Math.PI],[29,26,0],[67,26,0],[29,70,Math.PI],[67,70,Math.PI]].map(([x,z,facing])=>({x,z,facing,kind:'bench'})),
 ...needleSportsPark.seats
];
await yieldStartup();

function nearestPublicSeat(px,pz,max=2.6){
 let best=null,bestD=max;
 for(const seat of [...publicSeats,...(museum?.seats||[]),...(realisticPlaza?.seats||[]).filter((s,i)=>i!==4)]){if(neighborhoodResidents?.isSeatOccupied(seat))continue;const d=Math.hypot(px-seat.x,pz-seat.z);if(d<bestD){best=seat;bestD=d;}}
 return best;
}
function nearestAvailableSeat(){if(freeApartments?.active)return freeApartments.nearestSeat(player.x,player.z);const hospitalSeat=hospital?.nearestSeat(player.x,player.z);if(hospitalSeat)return hospitalSeat;const canopySeat=canopyVenue?.nearestSeat(player.x,player.z);if(canopySeat)return canopySeat;if(cityview?.active)return cityview.nearestSeat(player.x,player.z);if(carnival?.riding||carnival?.gameOpen||observationNeedle?.riding||insideNeedleLobby)return null;const chessSeat=chessTables.nearestSeat(player.x,player.z);if(chessSeat)return chessSeat;if(onObservationDeck)return observationNeedle.nearestSeat(player.x,player.z);const carnivalSeat=carnival?.nearestSeat(player.x,player.z);if(carnivalSeat)return carnivalSeat;const rvSeat=rvPark?.nearestSeat(player.x,player.z);if(rvSeat)return rvSeat;const forestSeat=northernForest?.nearestSeat(player.x,player.z);if(forestSeat)return forestSeat;const villaSeat=villas?.nearestSeat(player.x,player.z);if(villaSeat)return villaSeat;if(barber?.active)return barber.nearestSeat(player.x,player.z);if(office?.active)return office.nearestSeat(player.x,player.z);if(bowling?.active)return bowling.nearestSeat(player.x,player.z);if(scooters?.riding||skate?.riding)return null;const skateSeat=skate?.nearestSeat(player.x,player.z);if(skateSeat)return skateSeat;if(ownableHomes?.active)return ownableHomes.nearestSeat(player.x,player.z);if(club?.active)return club.nearestSeat(player.x,player.z);const campSeat=camp?.nearestSeat(player.x,player.z);if(campSeat)return campSeat;const coastalSeat=coastal?.nearestSeat(player.x,player.z);if(coastalSeat)return coastalSeat;const pierSeat=marine?.nearestSeat(player.x,player.z);if(pierSeat)return pierSeat;const beachSeat=southBeach?.nearestSeat(player.x,player.z);if(beachSeat)return beachSeat;const fortuneSeat=zFortune?.nearestSeat(player.x,player.z);if(fortuneSeat)return fortuneSeat;const cafe=coffeeShop.nearestSeat(player.x,player.z,2.5);const bench=nearestPublicSeat(player.x,player.z,2.6);if(!cafe)return bench;if(!bench)return cafe;return Math.hypot(player.x-cafe.x,player.z-cafe.z)<Math.hypot(player.x-bench.x,player.z-bench.z)?cafe:bench;}
let seatReturn=null;
await yieldStartup();

function toggleCafeSeat(){
 if(barber?.seated){barber.stand();return;}
 if(carnival?.riding||carnival?.gameOpen||observationNeedle?.riding||scooters?.riding||activeCar||apartmentSession)return;
 if(sittingSeat){
  const old=sittingSeat;sittingSeat=null;
  if(seatReturn){player.x=seatReturn.x;player.z=seatReturn.z;seatReturn=null;}
  movement.vx=0;movement.vz=0;
  if(status)status.textContent='Standing up';
  return;
 }
 const seat=nearestAvailableSeat();if(!seat)return;
 seatReturn={x:player.x,z:player.z};
 sittingSeat=seat;player.x=seat.x;player.z=seat.z;
 if(club)club.dancing=false;
 yaw=seat.facing??yaw;if(seat.reclined)pitch=-.035;
 movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 if(status)status.textContent='Seated · Press C or tap STAND UP to stand';
}
addEventListener('keydown',e=>{if(cityview?.panelOpen||cityview?.riding||adminAccount?.panelOpen||controlsGuide?.panelOpen||adminTransport?.active||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||zCabs?.riding||zCabs?.panelOpen||(hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen)return;if(villas?.panelOpen||barber?.panelOpen||(ownableHomes.panelOpen||coastal?.panelOpen||apartments?.panelOpen||(bowling?.gameOpen||(boutique?.panelOpen||(news?.panelOpen||(camp?.resting||airfield?.boarded)))))||marine?.panelOpen||['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;if(e.code==='KeyC'&&!e.repeat&&(sittingSeat||nearestAvailableSeat()))toggleCafeSeat();});
await yieldStartup();

let publicLobbyCooldown=0;
function updatePublicLobbyPassage(dt){publicLobbyCooldown=Math.max(0,publicLobbyCooldown-dt);if(publicLobbyCooldown||activeCar||scooters?.riding||powersports?.riding||marine?.riding||skate?.riding||sittingSeat||homePassageActive()||playerMenu?.panelOpen)return;if(universalSession?.home){if(Math.abs(player.x-ownableHomes.interior.x-3.5)<1.1&&player.z<ownableHomes.interior.z-7.35){publicLobbyCooldown=2;exitUniversalInterior();}return;}if(apartmentSession){if(apartments.currentUnit||apartments.riding||apartments.currentFloor!==0)return;const local=apartments.local(player.x,player.z);if(Math.abs(local.x)<1.6&&local.z>9.15){const building=apartmentSession.building;apartmentAction();const e=building.entry,dx=e.x-building.x,dz=e.z-building.z,len=Math.hypot(dx,dz)||1;player.x=e.x+dx/len;player.z=e.z+dz/len;publicLobbyCooldown=1.2;}return;}const entry=nearestUniversalEntrance();if(entry?.home&&!entry.garage&&Math.hypot(player.x-entry.home.door.x,player.z-entry.home.door.z)<1.4){publicLobbyCooldown=3;enterUniversalInterior();return;}if(entry?.apartment&&!entry.home){const door=entry.building.door||entry.building.entry;if(Math.hypot(player.x-door.x,player.z-door.z)<1.75){enterApartment(entry);publicLobbyCooldown=1.2;}}}
function nearestUniversalEntrance(){
 if(boutique?.active||bowling?.active||scooters?.riding||club?.active||activeCar||onObservationDeck||insideNeedleLobby||apartmentSession||universalSession||cafeInside||dealerInside)return null;
 let best=null,dist=4.7;
 for(const b of buildings){const x=b.entry.x,z=b.entry.z;const d=Math.hypot(player.x-x,player.z-z);if(d<dist){best={x,z,label:b.name,apartment:true,building:b};dist=d;}}
 const home=ownableHomes.nearEntrance(player.x,player.z,4.7);if(home){const d=Math.hypot(player.x-home.entry.x,player.z-home.entry.z);if(d<dist){best={...home.entry,label:'Home '+home.id,home};dist=d;}}
 for(const h of ownableHomes.homes){if(!h.garageOpen)continue;const d=Math.hypot(player.x-h.garageEntry.x,player.z-h.garageEntry.z);if(d<dist){best={...h.garageEntry,label:'Home '+h.id+' garage',home:h,garage:true};dist=d;}}

 return best;
}
function enterUniversalInterior(){const entry=nearestUniversalEntrance();if(!entry||homePassageActive())return;if(!entry.home||entry.garage){finishEnterUniversalInterior(entry);return;}beginHomePassage({open:()=>{entry.home.entryDoorHold=1.1;entry.home.hinge.rotation.y=-1.25;},move:()=>finishEnterUniversalInterior(entry),close:()=>{}});}
function exitUniversalInterior(immediate=false){if(!universalSession)return;if(immediate){cancelHomePassage();finishExitUniversalInterior();return;}if(homePassageActive())return;if(!universalSession.home){finishExitUniversalInterior();return;}beginHomePassage({open:()=>ownableHomes.interior.openFrontDoor(),move:()=>finishExitUniversalInterior(),close:()=>ownableHomes.interior.closeFrontDoor()});}
function finishEnterUniversalInterior(entry=nearestUniversalEntrance()){if(!entry)return;if(entry.home&&!allowPrivateHome('suburban-'+entry.home.id,()=>finishEnterUniversalInterior(entry)))return;if(entry.apartment){enterApartment(entry);return;}sittingSeat=null;seatReturn=null;universalSession={x:player.x,z:player.z,home:entry.home||null};activeCar=null;if(entry.home){ownableHomes.enter(entry.home);player.x=ownableHomes.interior.x+(entry.garage?-3.8:3.5);player.z=ownableHomes.interior.z+(entry.garage?-4.2:-6.0);yaw=0;}else{universalInteriors.show(entry.label);player.x=universalInteriors.x;player.z=universalInteriors.z+5.8;yaw=Math.PI;}keys.clear();movement.vx=0;movement.vz=0;camera.position.set(player.x-Math.sin(yaw)*1.1,groundHeightAt(player.x,player.z)+2.1,player.z-Math.cos(yaw)*1.1);if(status)status.textContent='Inside '+entry.label+' · F to exit · H for home options';}
function finishExitUniversalInterior(){if(!universalSession)return;const back=universalSession;universalSession=null;sittingSeat=null;seatReturn=null;if(back.home)ownableHomes.exit();else universalInteriors.hide();player.x=back.x;player.z=back.z;keys.clear();movement.vx=0;movement.vz=0;camera.position.set(player.x-Math.sin(yaw)*5,groundHeightAt(player.x,player.z)+3.2,player.z-Math.cos(yaw)*5);if(status)status.textContent='Exited building';}
function nearestDoor(){
 if(boutique?.active||bowling?.active||scooters?.riding||activeCar||onObservationDeck||apartmentSession)return null;
 let nearest=null,best=3.7;
 for(const d of doors){const dist=Math.hypot(player.x-d.x,player.z-d.z);if(dist<best){best=dist;nearest=d;}}
 return nearest;
}
function toggleNearbyDoor(){
 const d=nearestDoor();if(!d)return;
 enterApartment(d);
 const next=true;
 for(const leaf of doors){
  if(Math.abs(leaf.x-d.x)<.1&&Math.abs(leaf.z-d.z)<.1){
   leaf.manual=next;leaf.holdUntil=next?elapsed+8:0;
  }
 }
}
// Two-step tower interaction: enter lobby first, then press the elevator button.
function toggleObservationDeck(){
 if(observationNeedle.riding||barber?.active||office?.active||boutique?.active||bowling?.active||scooters?.riding||skate?.riding||activeCar)return;
 const stop=()=>{sittingSeat=null;seatReturn=null;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();};
 if(onObservationDeck){stop();onObservationDeck=false;insideNeedleLobby=false;yaw=0;pitch=-.08;observationNeedle.startRide(false,()=>{insideNeedleLobby=true;player.x=observationNeedle.lobbyArrival.x;player.z=observationNeedle.lobbyArrival.z;stop();yaw=0;pitch=0;camera.position.set(player.x,2.0,player.z-2);townControls.notify('Welcome back to reception.');});return;}
 if(insideNeedleLobby){
  if(!observationNeedle.authorized){townControls.notify('Please speak to the attendant at reception for elevator access.');return;}
  if(!observationNeedle.nearLift(player.x,player.z)){townControls.notify('Walk over to the glass elevator to ride up.');return;}
  if(observationNeedle.calling){townControls.notify('The Z-View elevator is on its way.');return;}
  stop();insideNeedleLobby=false;yaw=0;pitch=-.08;observationNeedle.startRide(true,()=>{onObservationDeck=true;player.x=observationNeedle.arrival.x;player.z=observationNeedle.arrival.z;stop();yaw=Math.PI;pitch=0;camera.position.set(player.x,observationNeedle.deckY+2.7,player.z+2);townControls.notify('Z-View lounge and outdoor skywalk. Walk through any of the four open portals to enjoy the city views.');});return;
 }
 if(Math.hypot(player.x-observationNeedle.entrance.x,player.z-observationNeedle.entrance.z)>7)return;
 stop();insideNeedleLobby=true;player.x=observationNeedle.x;player.z=observationNeedle.z+6.0;yaw=Math.PI;pitch=0;camera.position.set(player.x,2.4,player.z+2);townControls.notify('Welcome to Z-View. The attendant can let you into the scenic glass elevator.');
}

function insideHouse(){return freeApartments?.active||cityview?.active||realEstate.contains(player.x,player.z)||!!(coastal?.homeAt(player.x,player.z)||villas?.at(player.x,player.z)||premier?.at(player.x,player.z)||ownableHomes?.active||universalSession?.home||apartmentSession||camp?.insideCabin||rvPark?.inside);}
function toggleCar(){
 if(powersports?.riding)return;
 if(activeCar){const c=activeCar;c.speed=0;driverWheelThrottle=0;drivingControls?.reset();mouseVehicleSteering?.reset();let exit=null;for(const side of [1,-1]){const x=c.x+Math.cos(c.angle)*3.2*side,z=c.z-Math.sin(c.angle)*3.2*side;if(walkable(x,z)){exit={x,z};break;}}player.x=exit?.x??c.x+3.2;player.z=exit?.z??c.z;activeCar=null;driverLookYaw=0;driverLookPitch=0;driverSteer=0;mouseVehicleSteering?.reset();keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;return;}
 if(insideHouse())return;
 let closest=null,best=5;
 for(const c of cars){const d=Math.hypot(c.x-player.x,c.z-player.z);if(d<best){best=d;closest=c;}}
 if(closest){sittingSeat=null;seatReturn=null;townControls.stop();keys.clear();activeCar=closest;closest.speed=0;player.x=closest.x;player.z=closest.z;yaw=closest.angle;driverLookYaw=0;driverLookPitch=0;driverSteer=0;mouseVehicleSteering?.reset();driverWheelThrottle=0;pitch=0;movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.notify(MOBILE?'Hold Drive to move, and ◀ / ▶ to steer. E to exit.':'W/S or mouse wheel to move. Hold left mouse and drag to steer; right-drag to look. E to exit.');}
}
function nearestUsableCar(){if(insideHouse())return null;let best=null,d=5;for(const c of cars){const distance=Math.hypot(c.x-player.x,c.z-player.z);if(distance<d){best=c;d=distance;}}return best;}
function actionTarget(id){
 if(id==='zerconda-door-button'){if(universalSession?.home)return {x:ownableHomes.interior.x+3.5,y:1.5,z:ownableHomes.interior.z-7.7};const e=nearestUniversalEntrance();return e?{x:(e.garage?e.home.garageDoor.x:e.home?.door.x)??e.x,y:1.5,z:(e.garage?e.home.garageDoor.z:e.home?.door.z)??e.z}:null;}
 if(id==='zerconda-home-action'){const h=ownableHomes.active||ownableHomes.closest(player.x,player.z,11);return h&&!ownableHomes.active?{...h.door,y:1.6}:null;}
 if(id==='zerconda-cafe-enter')return {...cafeEntry,y:1.5};
 if(id==='zerconda-cafe-button'){const seat=nearestAvailableSeat();return seat?{x:seat.x,y:(seat.sitHeight??.5)+.3,z:seat.z}:null;}
 if(id==='zerconda-tower-button')return onObservationDeck?{x:observationNeedle.arrival.x,y:observationNeedle.deckY+1.5,z:observationNeedle.arrival.z}:insideNeedleLobby?{x:observationNeedle.lobbyArrival.x,y:1.5,z:observationNeedle.lobbyArrival.z}:{...observationNeedle.entrance,y:2};
 if(id==='zerconda-tower-exit')return {...observationNeedle.entrance,y:1.5};
 if(id==='zerconda-dealership-button')return {...dealership.exitPoint,y:1.5};
 if(id==='zerconda-showroom-car'){const car=dealership.nearestCar(player.x,player.z,5);return car?{...car.position,y:1}:null;}
 return null;
}
const townControls=createTownInteractions({
 canvas:renderer.domElement,
 isLocked:()=>powersports?.panelOpen||cityview?.panelOpen||cityview?.riding||adminAccount?.panelOpen||controlsGuide?.panelOpen||adminTransport?.active||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||(hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen||tattooShop?.panelOpen||carnival?.gameOpen||villas?.panelOpen||barber?.panelOpen||club.gameOpen||(ownableHomes.panelOpen||coastal?.panelOpen||apartments?.panelOpen||(bowling?.gameOpen||(boutique?.panelOpen||news?.panelOpen)))||marine?.panelOpen||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName),
 onStop:()=>{keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;if(activeCar)activeCar.speed=0;driverWheelThrottle=0;drivingControls?.reset();mouseVehicleSteering?.reset();mouseSkateControls?.reset();rideWheelThrottle=0;marine?.stop();scooters?.stop();skate?.stop();},
 onStartWalk:()=>{if(barber?.seated)barber.stand();if(camp?.resting)camp.stopRest();if(airfield?.seated)airfield.stand();else if(airfield?.boarded&&!airfield.walkingCabin)airfield.exit();marine?.cancelFishing();if(sittingSeat)toggleCafeSeat();if(club)club.dancing=false;},
 onLook:(dx,dy)=>{if(zCabs?.riding){cabPassengerCamera.look(dx,dy,zCabs.activeCab);return;}if(activeCar){if(mouseVehicleSteering?.active)return;driverLookYaw=THREE.MathUtils.clamp(driverLookYaw-dx*.003,-1.25,1.25);driverLookPitch=THREE.MathUtils.clamp(driverLookPitch+dy*.0025,-.45,.55);}else{yaw-=dx*.003;pitch=THREE.MathUtils.clamp(pitch-dy*.004,-1.25,1.25);}},
 onTap:(sx,sy,type,actions,activate)=>{if(tagGame?.joined)return;let best=null,dist=type==='touch'?66:44;const bounds=renderer.domElement.getBoundingClientRect();for(const action of actions){const p=action.target?.();if(!p||Math.hypot(player.x-p.x,player.z-p.z)>6||Math.abs(groundHeightAt(player.x,player.z)+1.2-(p.y??1.2))>2.6)continue;const point=new THREE.Vector3(p.x,p.y??1.2,p.z).project(camera);if(point.z< -1||point.z>1)continue;const px=bounds.left+(point.x+1)*bounds.width/2,py=bounds.top+(1-point.y)*bounds.height/2,d=Math.hypot(sx-px,sy-py);if(d<dist){dist=d;best=action;}}if(best)activate(best);}
});
await yieldStartup();

boatMouseControls=createWatercraftMouseControls({canvas:renderer.domElement,getCraft:()=>marine?.riding?marine:null,isLocked:()=>movementLocked,onLook:(dx,dy)=>{boatLookYaw=THREE.MathUtils.clamp(boatLookYaw-dx*.003,-1.5,1.5);pitch=THREE.MathUtils.clamp(pitch+dy*.0025,-.5,.5);}});
mouseVehicleSteering=createMouseVehicleSteering({canvas:renderer.domElement,getVehicle:()=>activeCar||powersports?.activeVehicle,driveOnHold:()=>!!powersports?.riding,onLook:(dx,dy)=>{if(powersports?.riding){driverLookYaw-=dx*.004;driverLookPitch=THREE.MathUtils.clamp(driverLookPitch-dy*.003,-.25,.85);}else{driverLookYaw=THREE.MathUtils.clamp(driverLookYaw-dx*.003,-1.25,1.25);driverLookPitch=THREE.MathUtils.clamp(driverLookPitch+dy*.0025,-.45,.55);}},isLocked:()=>!!((hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen||tattooShop?.panelOpen||news?.panelOpen||club?.gameOpen||carnival?.gameOpen)||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)});
await yieldStartup();

mouseSkateControls=createMouseSkateControls({canvas:renderer.domElement,isRiding:()=>!!(skate?.riding||scooters?.riding),isLocked:()=>!!((hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen||tattooShop?.panelOpen||news?.panelOpen||club?.gameOpen||carnival?.gameOpen)||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)});
await yieldStartup();

upgradeMobileControls(townControls,renderer.domElement,{onStartBackward:()=>{if(barber?.seated)barber.stand();if(camp?.resting)camp.stopRest();if(airfield?.seated)airfield.stand();else if(airfield?.boarded&&!airfield.walkingCabin)airfield.exit();marine?.cancelFishing();if(sittingSeat)toggleCafeSeat();if(club)club.dancing=false;}});
await yieldStartup();

const beachVisitors=createBeachVisitors(scene,{getPlayer:()=>player,getPlayerSeat:()=>sittingSeat,beach:southBeach});
await yieldStartup();

marine=createSeasidePier(scene,{getPlayer:()=>player,getYaw:()=>yaw,getAvatar:()=>avatar,onRodEquip:()=>zStore?.chooseHand(''),canInteract:()=>!barber?.active&&!office?.active&&!boutique?.active&&!bowling?.active&&!scooters?.riding&&!powersports?.riding&&!skate?.riding&&!activeCar&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!insideNeedleLobby&&!onObservationDeck,onMessage:message=>townControls.notify(message),onTeleport:(x,y,z,heading)=>{boatMouseControls?.reset();boatLookYaw=0;yaw=heading;pitch=-.08;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;camera.position.set(x-Math.sin(yaw)*7,y+3.0,z-Math.cos(yaw)*7);}});
await yieldStartup();

scooters=createScooterRentals(scene,{onTeleport:(x,y,z,heading)=>{sittingSeat=null;seatReturn=null;yaw=heading;pitch=-.04;camera.position.set(x-Math.sin(yaw)*2.4,y+2.1,z-Math.cos(yaw)*2.4);},getPlayer:()=>player,getYaw:()=>yaw,getHeight:groundHeightAt,canInteract:()=>!barber?.active&&!office?.active&&!boutique?.active&&!bowling?.active&&!activeCar&&!marine.riding&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,canMove:(x,z)=>walkable(x,z)&&!southBeach.blocksVehicle(x,z),onMessage:m=>townControls.notify(m),onStop:()=>{keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();}});
await yieldStartup();

bowling=createBowlingAlley(scene,{getHandPosition:()=>realisticPlayer.handPosition('R'),getPlayer:()=>player,canEnter:()=>!barber?.active&&!office?.active&&!boutique?.active&&!activeCar&&!scooters.riding&&!powersports?.riding&&!skate?.riding&&!marine.riding&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onMessage:m=>townControls.notify(m),onTeleport:(x,y,z,heading)=>{sittingSeat=null;seatReturn=null;yaw=heading;pitch=-.04;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();camera.position.set(x-Math.sin(yaw)*1.8,2.2,z-Math.cos(yaw)*1.8);}});
await yieldStartup();

let wardrobeInitialized=false;
await yieldStartup();

boutique=createClothingBoutique(scene,{getPlayer:()=>player,canEnter:()=>!barber?.active&&!office?.active&&!activeCar&&!scooters.riding&&!powersports?.riding&&!skate?.riding&&!marine.riding&&!bowling.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,applyOutfit:o=>{if(!wardrobeInitialized){wardrobeInitialized=true;return;}realisticPlayer.setOutfit(o)},onMessage:m=>townControls.notify(m),onTeleport:(x,y,z,heading)=>{sittingSeat=null;seatReturn=null;yaw=heading;pitch=-.04;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();camera.position.set(x-Math.sin(yaw)*1.8,y+2.2,z-Math.cos(yaw)*1.8);}});
await yieldStartup();

news=createZercondaNews(scene,{getPlayer:()=>player,canInteract:()=>!barber?.active&&!office?.active&&!activeCar&&!scooters.riding&&!powersports?.riding&&!skate?.riding&&!marine.riding&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onMessage:m=>townControls.notify(m)});
await yieldStartup();

premier=createPremierHomes(scene,{onPassage:passHomeDoor,getPlayer:()=>player,canInteract:()=>!barber?.active&&!office?.active&&!activeCar&&!scooters.riding&&!powersports?.riding&&!skate?.riding&&!marine.riding&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onMessage:m=>townControls.notify(m)});
await yieldStartup();

camp=createForestCampground(scene,{getPlayer:()=>player,canUse:()=>!barber?.active&&!office?.active&&!activeCar&&!scooters.riding&&!powersports?.riding&&!skate?.riding&&!marine.riding&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onMessage:m=>townControls.notify(m),onTeleport:(x,y,z,heading)=>{sittingSeat=null;seatReturn=null;yaw=heading;pitch=.02;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();camera.position.set(x,y+1.7,z-2);}});
await yieldStartup();

airfield=createAirfield(scene,{groundMaterial:grass,roadMaterial:asphalt,getPlayer:()=>player,canUse:()=>!adminTransport?.active&&!barber?.active&&!office?.active&&!activeCar&&!scooters.riding&&!powersports?.riding&&!skate?.riding&&!marine.riding&&!camp.resting&&!camp.insideCabin&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onMessage:m=>townControls.notify(m),onTeleport:(x,y,z,heading)=>{sittingSeat=null;seatReturn=null;yaw=heading;pitch=.02;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();camera.position.set(x,y+1.6,z);}});
await yieldStartup();

skate=createSkatePark(scene,{getPlayer:()=>player,getYaw:()=>yaw,getHeight:groundHeightAt,canUse:()=>!barber?.active&&!office?.active&&!activeCar&&!scooters.riding&&!powersports?.riding&&!marine.riding&&!airfield.boarded&&!camp.resting&&!camp.insideCabin&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,canMove:(x,z)=>walkable(x,z)&&!southBeach.blocksVehicle(x,z),onMessage:m=>townControls.notify(m),onStop:()=>{cabPassengerCamera.reset();sittingSeat=null;seatReturn=null;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();}});
await yieldStartup();

addEventListener('keydown',e=>{if(cityview?.panelOpen||cityview?.riding||adminAccount?.panelOpen||controlsGuide?.panelOpen||adminTransport?.active||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||zCabs?.riding||zCabs?.panelOpen||(hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen)return;if(e.code==='Space'&&!e.repeat&&skate.riding&&!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)){e.preventDefault();e.stopImmediatePropagation();skate.ollie();}},true);
await yieldStartup();

office=createBusinessCentre(scene,{getPlayer:()=>player,canEnter:()=>!barber?.active&&!activeCar&&!skate.riding&&!scooters.riding&&!powersports?.riding&&!marine.riding&&!airfield.boarded&&!camp.resting&&!camp.insideCabin&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onMessage:m=>townControls.notify(m),onTeleport:(x,y,z,heading)=>{sittingSeat=null;seatReturn=null;yaw=heading;pitch=.02;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();camera.position.set(x-Math.sin(yaw)*2.4,y+2.1,z-Math.cos(yaw)*2.4);}});
await yieldStartup();

let barberHairInitialized=false;
await yieldStartup();
barber=createStyleCuts(scene,{getPlayer:()=>player,canEnter:()=>!office.active&&!activeCar&&!skate.riding&&!scooters.riding&&!powersports?.riding&&!marine.riding&&!airfield.boarded&&!camp.resting&&!camp.insideCabin&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,applyHair:h=>{if(!barberHairInitialized){barberHairInitialized=true;return;}realisticPlayer.setHair(h)},onMessage:m=>townControls.notify(m),onSeat:seat=>{sittingSeat=seat;seatReturn=null;yaw=seat.facing;keys.clear();movement.vx=0;movement.vz=0;townControls.stop();},onStand:()=>{sittingSeat=null;seatReturn=null;keys.clear();movement.vx=0;movement.vz=0;townControls.stop();},onTeleport:(x,y,z,heading)=>{yaw=heading;pitch=.02;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();camera.position.set(x-Math.sin(yaw)*2.4,y+2.1,z-Math.cos(yaw)*2.4);}});
await yieldStartup();

villas=createLuxuryVillas(scene,{onPassage:passHomeDoor,getPlayer:()=>player,canInteract:()=>!barber.active&&!office.active&&!activeCar&&!skate.riding&&!scooters.riding&&!powersports?.riding&&!marine.riding&&!airfield.boarded&&!camp.resting&&!camp.insideCabin&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onMessage:m=>townControls.notify(m)});
await yieldStartup();
villas.cutGround(mainlandGround);
await yieldStartup();

 // Continuous level grass keeps the real openings into the villa swimming pools.
 {const shape=new THREE.Shape();shape.moveTo(-720,568);shape.lineTo(618,568);shape.lineTo(618,-175);shape.lineTo(-720,-175);shape.closePath();for(const h of villas.homes){const xa=h.x+35.8,xb=h.x+48.2,za=h.z-11.2,zb=h.z+11.2,path=new THREE.Path();path.moveTo(xa,-za);path.lineTo(xa,-zb);path.lineTo(xb,-zb);path.lineTo(xb,-za);path.closePath();shape.holes.push(path);}const g=new THREE.ShapeGeometry(shape),p=g.attributes.position,u=g.attributes.uv;for(let i=0;i<p.count;i++)u.setXY(i,(p.getX(i)+444)/350,(-p.getY(i)+568)/350);g.rotateX(-Math.PI/2);cityLawn.geometry=g;cityLawn.position.set(0,GROUND_LEVEL-.018,0);cityLawn.scale.set(1,1,1);}
await yieldStartup();


rvPark=createRVPark(scene,{getPlayer:()=>player,canUse:()=>!observationNeedle.riding&&!onObservationDeck&&!insideNeedleLobby&&!barber.active&&!office.active&&!activeCar&&!skate.riding&&!scooters.riding&&!powersports?.riding&&!marine.riding&&!airfield.boarded&&!camp.resting&&!camp.insideCabin&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onMessage:m=>townControls.notify(m),onTeleport:(x,y,z,heading)=>{sittingSeat=null;seatReturn=null;yaw=heading;pitch=0;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();camera.position.set(x,y+1.68,z);}});
await yieldStartup();

carnival=createSeasideCarnival(scene,{getPlayer:()=>player,getCamera:()=>camera,getCanvas:()=>renderer.domElement,canUse:()=>!observationNeedle.riding&&!onObservationDeck&&!insideNeedleLobby&&!barber.active&&!office.active&&!activeCar&&!skate.riding&&!scooters.riding&&!powersports?.riding&&!marine.riding&&!airfield.boarded&&!camp.resting&&!camp.insideCabin&&!rvPark.inside&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!ownableHomes.active,onStop:()=>{cabPassengerCamera.reset();sittingSeat=null;seatReturn=null;keys.clear();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;townControls.stop();},onMessage:m=>townControls.notify(m),onTeleport:(x,y,z,heading)=>{yaw=heading;pitch=0;camera.position.set(x,y+1.7,z);}});
await yieldStartup();

const vehicleHorns=createVehicleHorns({getListener:()=>player,getVehicle:()=>activeCar?.group||powersports?.activeVehicle?.root||null});
await yieldStartup();

const cityResidents=createCityResidents(scene,{getPlayer:()=>player,getHeight:standingHeightAt,canWalk:(x,z)=>ambientResidentsAllowed(x,z)&&walkable(x,z),getRoadPolygons:()=>roadMap.polygons,shops:{coffee:coffeeShop.root,boutique:boutique.interior},getVehicles:()=>[...cars,...(zCabs?.collisionVehicles||[]),...(ambientTraffic?.collisionVehicles||[])],existingPeople:()=>[...(boardwalkFitness?.collisionPeople||[]),...(coffeeCustomers?.collisionPeople||[]),...pedestrianSystem.agents.filter(a=>a.human.ready&&a.group.visible).map(a=>a.group.position),...(fountainResident.group.visible?[fountainResident.group.position]:[])],onMessage:m=>townControls.notify(m)});

await yieldStartup();

installOwnedHomeLocks({getPlayer:()=>player,onStop:()=>{keys.clear();townControls.stop();movement.vx=movement.vz=movement.wheelImpulse=0;},onMessage:m=>townControls.notify(m),suburban:ownableHomes,premier,villas,coastal});
await yieldStartup();

zCabs=createZCabs(scene,{getPlayer:()=>player,canRequest:()=>!scooters?.inside&&!universalSession&&!insideHouse()&&!museum?.contains(player.x,player.z)&&!tattooShop?.active&&!dealerInside&&!cafeInside,onHonk:(source,options)=>vehicleHorns.honk(source,options),onPickupState:state=>{areaTravel.setCabState(state)},getHeight:()=>GROUND_LEVEL,getVehicles:()=>[...cars,...(ambientTraffic?.collisionVehicles||[]),...dealership.cars.map(o=>vehicleDescriptor(THREE,o.model))],getPedestrians:()=>[...pedestrianSystem.agents.map(a=>a.group.position),...cityResidents.collisionPeople],canUse:()=>!activeCar&&!marine.riding&&!scooters.riding&&!powersports?.riding&&!skate.riding&&!onObservationDeck&&!insideNeedleLobby&&!barber.active&&!office.active&&!airfield.boarded&&!carnival.riding&&!camp.resting&&!rvPark.inside&&!bowling.active&&!boutique.active&&!club.active&&!universalSession&&!apartmentSession&&!ownableHomes.active,onStop:()=>{cabPassengerCamera.reset();sittingSeat=null;seatReturn=null;keys.clear();movement.vx=movement.vz=movement.wheelImpulse=0;townControls.stop();},onMessage:m=>townControls.notify(m),onAlight:p=>{cabPassengerCamera.reset();let point=null;for(const[dx,dz]of[[0,0],[1,0],[-1,0],[0,1],[0,-1],[2,0],[-2,0]])if(walkable(p.x+dx,p.z+dz)){point={x:p.x+dx,z:p.z+dz};break;}player.x=point?.x??p.x;player.z=point?.z??p.z;yaw=p.yaw;pitch=0;keys.clear();movement.vx=movement.vz=movement.wheelImpulse=0;camera.position.set(player.x-Math.sin(yaw)*3.65,standingHeightAt(player.x,player.z)+1.75,player.z-Math.cos(yaw)*3.65);}});
await yieldStartup();

 townObstacles=createTownObstacles({scene,getFloor:standingHeightAt,getDynamic:()=>cars.filter(c=>c!==activeCar).map(c=>c.group).concat(zCabs?.vehicles.map(v=>v.root)||[]),ignore:o=>o===avatar||o===realisticPlayer.root||o.name==='Cloud sky'||o.name==='Zerconda South Beach'||cars.some(c=>c.group===o)||zCabs?.vehicles.some(v=>v.root===o)});
await yieldStartup();
const forestLandmarkRock=createForestLandmarkRock(scene);
const westForestBoulder=createForestLandmarkRock(scene,{x:-692,z:-625,low:true});westForestBoulder.root.name='Low mossy boulder · western North Woods clearing';
townObstacles.scan();
await yieldStartup();

militaryAccess=createMilitaryAdminAccess({onStop:()=>{keys.clear();townControls.stop();movement.vx=movement.vz=0;},onMessage:m=>townControls.notify(m)});
await yieldStartup();
BOOT('Building the north district');
airportLoop=createAirportLoop(scene,{roadMaterial:asphalt,walkMaterial:paving,walkwayOpenings:[-518,-470,-410,-360,-310].map(z=>({x0:-432,x1:-427.5,z0:z-8,z1:z+8}))});
await yieldStartup();
northernForest=createNorthernForest(scene,{mobile:MOBILE||LOW_GRAPHICS});
const crowdSpacing=createCrowdSpacing({getPeople:()=>[...pedestrianSystem.agents.filter(a=>a.human.ready).map(a=>a.group),...cityResidents.agents.filter(a=>a.human.ready&&!a.staff&&!a.seated).map(a=>a.group)],getAnchors:()=>[player,...(boardwalkFitness?.collisionPeople||[]),...(neighborhoodResidents?.collisionPeople||[]),...(needlePlaidResident.group.visible?[needlePlaidResident.group.position]:[]),...(boardwalkWalker.group.visible?[boardwalkWalker.group.position]:[]),...(whiteFitnessWalker.group.visible?[whiteFitnessWalker.group.position]:[]),...(curlyFitnessWalker.group.visible?[curlyFitnessWalker.group.position]:[]),...(curlyBusinessWalker.group.visible?[curlyBusinessWalker.group.position]:[]),...cityResidents.agents.filter(a=>a.seated&&a.human.ready).map(a=>a.group.position),...(fountainResident.group.visible?[fountainResident.group.position]:[])],canWalk:(x,z)=>ambientResidentsAllowed(x,z)&&walkable(x,z),getHeight:standingHeightAt});
const needlePlaidResident=createNeedlePlaidResident(scene,{getPlayer:()=>player,getHeight:standingHeightAt,canWalk:walkable,canGreet:()=>!activeCar&&!zCabs?.riding&&!playerMenu?.panelOpen,getPeople:()=>[...cityResidents.collisionPeople,...(boardwalkFitness?.collisionPeople||[]),...(coffeeCustomers?.collisionPeople||[]),...(neighborhoodResidents?.collisionPeople||[]),...pedestrianSystem.agents.filter(a=>a.human.ready&&a.group.visible).map(a=>a.group.position)]});
const boardwalkWalker=createBoardwalkWalker(scene,{getPlayer:()=>player,getPeople:()=>[...pedestrianSystem.agents.filter(a=>a.human.ready&&a.group.visible).map(a=>a.group.position),...cityResidents.collisionPeople,...(boardwalkFitness?.collisionPeople||[]),...(neighborhoodResidents?.collisionPeople||[]),...(whiteFitnessWalker.group.visible?[whiteFitnessWalker.group.position]:[]),...(curlyFitnessWalker.group.visible?[curlyFitnessWalker.group.position]:[]),...(curlyBusinessWalker.group.visible?[curlyBusinessWalker.group.position]:[])],canWalk:walkable});
const whiteFitnessWalker=createBoardwalkWalker(scene,{getPlayer:()=>player,modelAsset:'assets/white-fitness-walk-v369.glb',name:'Boardwalk visitor · white shorts',referenceSource:'Zerconda_Two_Fitness_Characters.zip',startDistance:300,loadRadius:100,getPeople:()=>[...pedestrianSystem.agents.filter(a=>a.human.ready&&a.group.visible).map(a=>a.group.position),...cityResidents.collisionPeople,...(boardwalkFitness?.collisionPeople||[]),...(neighborhoodResidents?.collisionPeople||[]),...(boardwalkWalker.group.visible?[boardwalkWalker.group.position]:[])],canWalk:walkable});
const curlyFitnessWalker=createBoardwalkWalker(scene,{getPlayer:()=>player,modelAsset:'assets/curly-updo-fitness-walk-v314.glb',name:'Curly-updo fitness visitor',referenceSource:'User supplied fitness reference sheet · description-based model',startDistance:170,walkingSpeed:1.05,canWalk:walkable,getPeople:()=>[...cityResidents.collisionPeople,...(boardwalkFitness?.collisionPeople||[]),...(coffeeCustomers?.collisionPeople||[]),...(neighborhoodResidents?.collisionPeople||[]),boardwalkWalker.group.position,whiteFitnessWalker.group.position]});
const curlyBusinessWalker=createBoardwalkWalker(scene,{getPlayer:()=>player,modelAsset:'assets/curly-updo-business-walk-v314.glb',name:'Curly-updo Skyline business visitor',referenceSource:'User supplied business reference sheet · description-based model',walkingSpeed:.78,routePoints:[[185,-27],[191,-27],[191,-18],[185,-18]],getGroundHeight:standingHeightAt,canWalk:walkable,getPeople:()=>cityResidents.collisionPeople});
neighborhoodResidents=createNeighborhoodResidents(scene,{getSeats:()=>publicSeats,getOccupiedSeat:()=>sittingSeat,getRoadPolygons:()=>roadMap.polygons,getPlayer:()=>player,getHeight:standingHeightAt,canWalk:(x,z)=>ambientResidentsAllowed(x,z)&&walkable(x,z),getPeople:()=>[...cityResidents.collisionPeople,...(boardwalkFitness?.collisionPeople||[]),...(coffeeCustomers?.collisionPeople||[]),...pedestrianSystem.agents.filter(a=>a.human.ready&&a.group.visible).map(a=>a.group.position),...(curlyFitnessWalker.group.visible?[curlyFitnessWalker.group.position]:[]),...(curlyBusinessWalker.group.visible?[curlyBusinessWalker.group.position]:[])],getVehicles:()=>[...cars,...(zCabs?.collisionVehicles||[]),...(ambientTraffic?.collisionVehicles||[])]});
boardwalkFitness=createBoardwalkFitness(scene,{getPlayer:()=>player,canWalk:walkable,getPeople:()=>[...cityResidents.collisionPeople,...(neighborhoodResidents?.collisionPeople||[]),...pedestrianSystem.agents.filter(a=>a.human.ready&&a.group.visible).map(a=>a.group.position),...(boardwalkWalker.group.visible?[boardwalkWalker.group.position]:[]),...(whiteFitnessWalker.group.visible?[whiteFitnessWalker.group.position]:[]),...(curlyFitnessWalker.group.visible?[curlyFitnessWalker.group.position]:[])]});
const fountainResident=createFountainResident(scene,{getPlayer:()=>player,getHeight:standingHeightAt,getSeat:()=>realisticPlaza?.seats?.[4]||null});fountainResident.group.name='Kate · seated fountain visitor';fountainResident.group.userData.npcIdentity='Kate';
const kateConversation=createKateConversation({getPlayer:()=>player,getKate:()=>fountainResident,canTalk:()=>!activeCar&&!zCabs?.riding&&!playerMenu?.panelOpen&&!cityMap.expanded});
BOOT('Preparing forest detail');
const forestGroundCover=createForestGroundCover(scene,{getPlayer:()=>player,getRoadPolygons:()=>roadMap.polygons,getForestSegments:()=>[...(northernForest?.segments||[]),...(camp?.trailSegments||[]).map(([ax,az,bx,bz])=>({ax,az,bx,bz,width:3.2}))],getHeight:()=>.02,mobile:MOBILE||LOW_GRAPHICS});
await yieldStartup();
militaryBase=createMilitaryBase(scene,{getPlayer:()=>player,hasClearance:militaryAccess.hasClearance,onAccessRequest:militaryAccess.request,onStop:()=>{keys.clear();townControls.stop();movement.vx=movement.vz=0;},canUseTower:()=>!adminTransport?.active&&!activeCar&&!zCabs?.riding,onTeleport:(x,y,z)=>{player.x=x;player.z=z;keys.clear();townControls.stop();movement.vx=movement.vz=0;yaw=0;pitch=0;avatar.position.set(x,y,z);camera.position.set(x,y+1.68,z);},onMessage:m=>townControls.notify(m),onReject:(x,z)=>{player.x=x;player.z=z;movement.vx=0;movement.vz=0;keys.clear();townControls.stop();}});
await yieldStartup();
signBacks=createSignBackMaintenance(scene);
await yieldStartup();
signBacks.scan();
await yieldStartup();
mobilePerformance=createMobilePerformance({scene,renderer,getPlayer:()=>player,mobile:MOBILE||LOW_GRAPHICS});
await yieldStartup();
mobilePerformance.scan();
await yieldStartup();

// Fast travel always arrives outdoors, after leaving any current activity or interior.
function travelToArea(destination){
 cityview?.leave();
 scooters?.leave();
 zCabs?.cancel();
 if(office?.riding)office.move('lobby',0,13);
 ownableHomes?.exit();
 resetView();
 keys.clear();townControls.stop();movement.vx=0;movement.vz=0;movement.wheelImpulse=0;drag=false;driverLookYaw=0;driverLookPitch=0;driverSteer=0;mouseVehicleSteering?.reset();
 let arrival=null;
 for(const radius of [0,.8,1.6,2.4,3.2,4.8,6.4,8]){for(let i=0;i<(radius?16:1);i++){const angle=i*Math.PI/8,x=destination.x+Math.cos(angle)*radius,z=destination.z+Math.sin(angle)*radius;
 if(walkable(x,z)&&Number.isFinite(groundHeightAt(x,z))){arrival={x,z};break;}}if(arrival)break;}
 if(!arrival){townControls.notify('That entrance is unavailable right now. Please choose another area.');return false;}
 player.x=arrival.x;player.z=arrival.z;yaw=destination.yaw??0;pitch=0;
 const ground=standingHeightAt(player.x,player.z);avatar.position.set(player.x,ground,player.z);avatar.visible=true;
 camera.position.set(player.x-Math.sin(yaw)*3.65,ground+1.75,player.z-Math.cos(yaw)*3.65);camera.lookAt(player.x,ground+1.6,player.z);cityMap.draw();
 townControls.notify(destination.name+' · You have arrived');
 if(status)status.textContent=destination.name;
 return true;
}
coffeeCustomers=createCoffeeCustomers(scene,{shop:coffeeShop,getPlayer:()=>player,getOccupiedSeat:()=>sittingSeat,getHeight:()=>coffeeShop.root.position.y,getPeople:()=>[...cityResidents.collisionPeople,...(boardwalkFitness?.collisionPeople||[]),...(neighborhoodResidents?.collisionPeople||[])]});
zStore=createZStore(scene,{getPlayer:()=>player,controller:realisticPlayer,onStop:()=>{keys.clear();townControls.stop();movement.vx=0;movement.vz=0;},onMessage:m=>townControls.notify(m),canUse:()=>!activeCar&&!scooters?.riding&&!powersports?.riding&&!skate?.riding&&!marine?.riding&&!airfield?.boarded&&!office?.active&&!club?.active&&!boutique?.active&&!bowling?.active&&!universalSession&&!apartmentSession&&!onObservationDeck&&!insideNeedleLobby&&!playerMenu?.panelOpen});
await yieldStartup();

museum=createZercondaMuseum(scene,{getPlayer:()=>player});
await yieldStartup();
residentialShadeTrees=createResidentialShadeTrees(scene);
await yieldStartup();
residentialShadeTrees.readyPromise.catch(e=>console.warn("Residential shade trees:",e));
await yieldStartup();
museumGardenTrees=createMuseumGardenTrees(scene);
await yieldStartup();
museumGardenTrees.readyPromise.catch(e=>console.warn('Museum tree assets:',e));
await yieldStartup();

tattooShop=createZTattoo(scene,{getPlayer:()=>player,controller:realisticPlayer,state:avatarTattoos,onStop:()=>{keys.clear();townControls.stop();},onMessage:m=>townControls.notify(m),canUse:()=>!activeCar&&!airfield.boarded&&!club.active&&!office.active&&!onObservationDeck&&!insideNeedleLobby});
await yieldStartup();

courtGames=createCourtGames(needleSportsPark.root,{getPlayer:()=>player,getHeight:groundHeightAt,getYaw:()=>yaw,onFace:value=>{yaw=value;},onEquipmentChange:value=>{courtEquipmentChanging=true;try{if(value){marine?.chooseHand('');zStore?.chooseHand('');}}finally{courtEquipmentChanging=false;}window.dispatchEvent(new Event('zerconda-inventory-change'));},onMessage:m=>townControls.notify(m),canUse:()=>!activeCar&&!club.active&&!office.active&&!airfield.boarded&&!onObservationDeck&&!insideNeedleLobby,onStart:mode=>{keys.clear();townControls.stop();sittingSeat=null;seatReturn=null;if(mode==='tennis')yaw=Math.PI;}});
await yieldStartup();

hotDogVendor=createHotDogVendor(scene,{getPlayer:()=>player,onMessage:m=>townControls.notify(m)});
sunglassesHut=createSunglassesHut(scene,{getPlayer:()=>player,applyStyle:id=>realisticPlayer.setOutfit({...realisticPlayer.outfit,glasses:!!id,sunglassesStyle:id}),onMessage:m=>townControls.notify(m),onOpen:()=>{keys.clear();townControls.stop();movement.vx=movement.vz=movement.wheelImpulse=0;}});
await yieldStartup();

drivingControls=createVehicleControls({onExit:()=>{if(powersports?.riding)powersports.end();else if(activeCar)toggleCar();},onEngage:()=>{keys.clear();townControls.stop();}});
await yieldStartup();

const blockedWallOpening=createBlockedWallOpening(scene,{getPlayer:()=>player,onMessage:m=>townControls.notify(m)});
await yieldStartup();

const areaTravel=createAreaTravel({onCall:()=>{vehicleHorns.unlock();zCabs.requestPickup();},onCancel:()=>zCabs.cancel(),onStop:()=>{keys.clear();townControls.stop();}});
await yieldStartup();

const stopCityview=()=>{keys.clear();townControls.stop();movement.vx=movement.vz=movement.wheelImpulse=0;sittingSeat=null;seatReturn=null;drag=false;};
adminAccount=createAdminAccount({onOpenDashboard:()=>adminDashboard?.open(),isDashboardOpen:()=>!!adminDashboard?.panelOpen,verifyCode:code=>cityview?.ownership.verify(10,code)??false,onStop:stopCityview,onMessage:m=>townControls.notify(m)});
BOOT('Preparing account homes');
cityview=createCityviewApartments(scene,{getPlayer:()=>player,adminAccount,onStop:stopCityview,onMessage:m=>townControls.notify(m),getPlayerName:()=>playerMenu?.state.name||'Resident',getHomes:()=>collectHomeLocations({starter:ownableHomes,premier,villas,coastal,apartments:apartmentExteriors,apartmentExperience}),getManagedHomes:getManagedPrivateHomes,onManageHome:managePrivateHome,onStarterHome:()=>freeApartments?.visitMine(),onVisit:travelToArea,canUse:()=>!activeCar&&!scooters?.riding&&!powersports?.riding&&!skate?.riding&&!marine?.riding&&!airfield?.boarded&&!insideHouse()&&!universalSession&&!apartmentSession,onTeleport:p=>{if(!p.walkThrough)stopCityview();player.x=p.x;player.z=p.z;yaw=p.yaw??yaw;pitch=0;avatar.position.set(p.x,p.y,p.z);avatar.rotation.y=yaw;camera.position.set(p.x-Math.sin(yaw)*3.1,p.y+2.0,p.z-Math.cos(yaw)*3.1);camera.lookAt(p.x,p.y+1.25,p.z);cityMap.draw(true);}});

playerMenu=createPlayerMenu({onHomes:()=>cityview.openHomes(),onAdmin:()=>adminAccount.open(),onControls:()=>controlsGuide?.button.click(),travelElement:areaTravel.element,onStop:()=>{keys.clear();townControls.stop();movement.vx=0;movement.vz=0;},getHandItems:()=>[...(gunGame?.getHandItems()||[]),...(tagGame?.getHandItems()||[]),...zStore.getHandItems(),...marine.getHandItems(),...courtGames.getHandItems()],getHeldItem:()=>gunGame?.heldValue||tagGame?.heldValue||courtGames.heldValue||marine.heldValue||zStore.heldValue,onHandChange:v=>{if(gunGame?.chooseHand(v))return;if(tagGame?.chooseHand(v))return;courtGames.chooseHand(v);if(v==='basketball')return;if(v==='fishing-pole')marine.chooseHand(v);else{marine.chooseHand('');zStore.chooseHand(v);}},getAppearance:()=>realisticPlayer.state,onAppearanceChange:v=>realisticPlayer.setAppearance(v),getTattoos:()=>avatarTattoos.records,getAccessories:()=>zStore.getAccessoryOptions(),onAccessoryChange:(id,v)=>zStore.chooseAccessory(id,v),onBrightness:v=>{renderer.toneMappingExposure=v;},initialQuality:LOW_GRAPHICS?'low':null,onQuality:q=>{if(graphicsEngine){graphicsEngine.setQuality(q);renderBudget.setQuality(q);}else{preferredPixelRatio=Math.min(devicePixelRatio,LOW_GRAPHICS?.5:q==='ultra'?1.35:q==='high'?1.1:q==='low'?.6:.85);renderer.setPixelRatio(preferredPixelRatio);}slowRenderFrames=0;}});
await yieldStartup();

freeApartments=createStarterApartments(scene,{exterior:brickApartments,getPlayer:()=>player,adminAccount,onStop:stopCityview,onMessage:m=>townControls.notify(m),canUse:()=>!activeCar&&!scooters?.riding&&!powersports?.riding&&!marine?.riding&&!freeApartments?.riding&&!playerMenu?.panelOpen&&!cityview?.active,onPrepareVisit:()=>travelToArea({name:'Brick Apartments',x:-632,z:-480}),onTeleport:p=>{stopCityview();player.x=p.x;player.z=p.z;yaw=p.yaw??yaw;pitch=0;avatar.position.set(p.x,p.y,p.z);avatar.rotation.y=yaw;camera.position.set(p.x-Math.sin(yaw)*1.6,p.y+2.05,p.z-Math.cos(yaw)*1.6);cityMap.draw(true);}});
tagGame=createPlaywarehouseGame({venue:canopyVenue,canvas:renderer.domElement,canSwing:()=>!movementLocked&&!canopyVenue.riding,getPlayer:()=>player,getName:()=>playerMenu?.state.name||'Resident',getYaw:()=>yaw,getHeight:(x,z)=>groundHeightAt(x,z),getHandPosition:()=>realisticPlayer.handPosition('R'),onStop:stopCityview,onMessage:m=>townControls.notify(m),registerAction:registerTownAction,clearOtherItems:()=>{courtGames.chooseHand('');marine.chooseHand('');zStore.chooseHand('');}});
await yieldStartup();

window.addEventListener('zerconda-inventory-change',()=>{if(tagGame?.joined&&(courtGames.heldValue||marine.heldValue||zStore.heldValue))tagGame.leave();if(marine.heldValue&&zStore.heldValue)marine.chooseHand('');if(!courtEquipmentChanging&&courtGames.heldValue&&(marine.heldValue||zStore.heldValue))courtGames.chooseHand('');});
await yieldStartup();


addEventListener('keydown',e=>{if(cityview?.panelOpen||cityview?.riding||adminAccount?.panelOpen||controlsGuide?.panelOpen||adminTransport?.active||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||zCabs?.riding||zCabs?.panelOpen||(hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen)return;if(e.code==='Escape'&&!e.repeat){carnival.close();}if(e.code==='KeyF'&&!e.repeat&&(camp?.resting||airfield?.boarded)){e.preventDefault();e.stopImmediatePropagation();camp.stopRest();airfield?.exit();skate?.end();office?.exit();barber?.exit();villas?.close();observationNeedle?.reset();return;}if(e.code!=='KeyF'||e.repeat||carnival?.riding||carnival?.gameOpen||observationNeedle.riding||villas?.panelOpen||barber?.panelOpen||club.gameOpen||(ownableHomes.panelOpen||coastal?.panelOpen||apartments?.panelOpen||(bowling?.gameOpen||(boutique?.panelOpen||(news?.panelOpen||(camp?.resting||airfield?.boarded)))))||marine?.panelOpen||['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;const action=townControls.activeActions[0];if(action){e.preventDefault();e.stopImmediatePropagation();townControls.activate(action.id);}},true);
await yieldStartup();

function walkable(x,z){const starterWalk=freeApartments?.canWalk(x,z,!!activeCar||!!scooters?.riding||!!powersports?.riding||!!marine?.riding);if(starterWalk!==null&&starterWalk!==undefined)return starterWalk;const stairWalk=brickApartments?.canWalk(x,z,!!activeCar||!!scooters?.riding||!!powersports?.riding||!!marine?.riding);if(stairWalk!==null&&stairWalk!==undefined)return stairWalk;const accessWalk=venueAccessRoads?.canWalk(x,z);if(accessWalk)return true;if(beachKate?.blocks(x,z)||brickApartments?.blocks(x,z))return false;const cvWalk=cityview?.canWalk(x,z);if(cvWalk!==null&&cvWalk!==undefined)return cvWalk;const mountainWalk=mountainWalkable(x,z);if(mountainWalk!==null)return !activeCar&&!scooters?.riding&&!powersports?.riding&&mountainWalk;const secretWalk=hiddenForestPassage.canWalk(x,z);if(secretWalk!==null)return !activeCar&&!scooters?.riding&&!powersports?.riding&&secretWalk;if(extraForestBlocks(x,z))return false;const bowlPortal=bowling?.portalWalk(x,z);if(bowlPortal!==null&&bowlPortal!==undefined)return bowlPortal;
 const gunWalk=gunStore?.canWalk(x,z,!!activeCar||!!scooters?.riding||!!powersports?.riding||!!marine?.riding);if(gunWalk!==null&&gunWalk!==undefined)return gunWalk;const hospitalWalk=hospital?.canWalk(x,z,!!activeCar||!!scooters?.riding||!!powersports?.riding||!!marine?.riding);if(hospitalWalk!==null&&hospitalWalk!==undefined)return hospitalWalk;const canopyWalk=canopyVenue?.canWalk(x,z,!!activeCar||!!scooters?.riding||!!powersports?.riding||!!marine?.riding);if(canopyWalk!==null&&canopyWalk!==undefined)return canopyWalk;
 if(privateHomeBlocks(x,z)||residentialShadeTrees?.blocks(x,z)||museumGardenTrees?.blocks(x,z))return false;for(const portal of [barber?.canWalk(x,z),office?.portalWalk(x,z),club?.portalWalk(x,z),news?.canWalk(x,z,!!activeCar||!!scooters?.riding||!!powersports?.riding)])if(portal!==null&&portal!==undefined)return portal;
 if(scooters?.inside)return scooters.canWalkInterior(x,z);
 if(zCabs?.blocks(x,z))return false;if(ambientTraffic?.collisionVehicles.some(v=>Math.hypot(x-v.x,z-v.z)<1.5))return false;
 if(powersports?.blocks(x,z)||styleCutsGrove?.blocks(x,z)||fortuneShadeTrees.blocks(x,z))return false;
 const fortuneWalk=zFortune?.canWalk(x,z);if(fortuneWalk!==null&&fortuneWalk!==undefined)return fortuneWalk;
 const museumWalk=museum?.canWalk(x,z,!!activeCar||!!scooters?.riding&&!powersports?.riding||!!skate?.riding);if(museumWalk!==null&&museumWalk!==undefined)return museumWalk;
 const storeWalk=zStore?.canWalk(x,z);if(storeWalk!==null&&storeWalk!==undefined)return storeWalk;
 const tattooWalk=tattooShop?.canWalk(x,z);if(tattooWalk!==null&&tattooWalk!==undefined)return tattooWalk;
 if(southBeach?.blocks(x,z)||courtGames?.blocks(x,z)||hotDogVendor?.blocks(x,z)||sunglassesHut?.blocks(x,z))return false;
 if(airfield?.walkingCabin)return airfield.contains(x,z);
 if(blockedWallOpening?.blocks(x,z))return false;
 if(observationNeedle.riding)return false;
 if(onObservationDeck)return observationNeedle.isOnDeck(x,z);
 if(insideNeedleLobby)return observationNeedle.isInLobby(x,z);
 if(observationNeedle?.blocksGround(x,z))return false;
 if(militaryBase?.blocks(x,z))return false;
 if(northernForest?.blocks(x,z,!!activeCar||!!scooters?.riding&&!powersports?.riding))return false;
 if(chessTables.blocks(x,z)||realEstate.blocks(x,z)||townObstacles?.hit(x,z))return false;
 if(carnival?.blocks(x,z))return false;
 if(rvPark?.blocks(x,z,!!activeCar||!!scooters?.riding&&!powersports?.riding))return false;
 if(villas?.blocks(x,z,!!activeCar||!!scooters?.riding&&!powersports?.riding))return false;
 if(barber?.active)return barber.contains(x,z);
 if(barber?.blocks(x,z)||airDancers.blocks(x,z))return false;
 if(dealership.root){const e=dealership.entrance,i=dealership.insidePoint,ex=dealership.exitPoint,vx=i.x-ex.x,vz=i.z-ex.z,len=Math.hypot(vx,vz),along=((x-ex.x)*vx+(z-ex.z)*vz)/len,across=Math.abs((x-ex.x)*vz-(z-ex.z)*vx)/len;const portal=across<.75&&along>-.6&&along<len+1;const wasInside=dealership.inside(player.x,player.z);if((wasInside||portal)&&dealership.inside(x,z))return true;if(wasInside&&portal)return true;}
 if(dealerInside&&dealership.inside(x,z))return true;
 if(dealership.root&&dealership.blocks(x,z))return false;
 if(office?.active)return office.contains(x,z);
 if(office?.blocks(x,z))return false;
 if(skate?.blocks(x,z))return false;
 if(airfield?.blocks(x,z))return false;
 if(camp?.blocks(x,z,!!activeCar||!!scooters?.riding&&!powersports?.riding))return false;
 if(premier?.blocks(x,z,!!activeCar||!!scooters?.riding&&!powersports?.riding))return false;
 if(boutique?.active)return boutique.contains(x,z);
 if(boutique?.blocks(x,z)||news?.blocks(x,z))return false;
 if(bowling?.active)return bowling.contains(x,z);
 if(bowling?.blocks(x,z))return false;
 if(marine?.footprint(x,z))return !scooters?.riding&&!powersports?.riding&&!skate?.riding&&!activeCar&&marine.canWalk(x,z);
 if(scooters?.blocks(x,z))return false;
 if(scooters?.riding&&(z>173||x>214||x< -438||z< -523))return false;
 if(club?.active)return club.contains(x,z);
 if(club?.blocks(x,z))return false;
 if(needleSportsPark?.blocks(x,z))return false;
 if(universalSession)return universalSession.home?ownableHomes.contains(x,z):universalInteriors.contains(x,z);
 if(ownableHomes.blocks(x,z)||coastal.blocks(x,z,!!activeCar||!!scooters?.riding&&!powersports?.riding))return false;
 if(apartmentSession)return apartments.contains(x,z);
  if(coffeeShop.canWalk(x,z)===false)return false;
  if(coffeeShop.isInside(x,z))return !activeCar&&!powersports?.riding&&!scooters?.riding&&!skate?.riding;
 if(x< -718.5||x>616.5||z< -1396.5||z>(Math.abs(x)<165?248:242))return false;
 // No movement around the submerged perimeter: shoreline outside the central beach is impassable.
 if(z>234&&Math.abs(x)>260)return false;
 // Eastern expansion is accessed from the city's eastbound road corridor.
 // Residential expansion is accessible on foot; building walls remain solid.
 if(onObservationDeck)return observationNeedle.isOnDeck(x,z);
 if(insideNeedleLobby)return Math.abs(x-observationNeedle.x)<2.2&&z>observationNeedle.z+5.5&&z<observationNeedle.z+9.5;
 if(Math.hypot(x-observationNeedle.x,z-observationNeedle.z)<5.3)return false;
 if(insideBuilding(x,z,.35))return false;
 if(realisticPlaza?!realisticPlaza.canWalk(x,z,.35):Math.hypot(x-48,z-48)<11.3)return false; // actual 3D basin collision
 return true;
}
function safeResumePoint(x,z){if(!walkable(x,z))return false;const h=standingHeightAt(x,z);if(!Number.isFinite(h)||h>25)return false;return [[.32,0],[-.32,0],[0,.32],[0,-.32]].every(([dx,dz])=>walkable(x+dx,z+dz)&&Math.abs(standingHeightAt(x+dx,z+dz)-h)<.12);}
function canSaveArea(){return !RECOVERY_PLAZA&&playable&&!adminTransport?.active&&!bedRest?.active&&!activeCar&&!zCabs?.riding&&!sittingSeat&&!insideHouse()&&!marine?.riding&&!scooters?.riding&&!powersports?.riding&&!scooters?.inside&&!skate?.riding&&!airfield?.boarded&&!camp?.insideCabin&&!camp?.resting&&!rvPark?.inside&&!onObservationDeck&&!insideNeedleLobby&&!observationNeedle?.riding&&!carnival?.riding&&!barber?.active&&!office?.active&&!boutique?.active&&!bowling?.active&&!club?.active&&!ownableHomes?.active&&!universalSession&&!apartmentSession&&!cafeInside&&!dealerInside&&!coffeeShop.isInside(player.x,player.z)&&!museum?.contains(player.x,player.z)&&!premier?.at(player.x,player.z);}
bedRest=createBedRest({scene,getPlayer:()=>player,getHeight:standingHeightAt,canStand:walkable,onStop:()=>{keys.clear();movement.vx=movement.vz=movement.wheelImpulse=0;townControls.stop();},onMessage:m=>townControls.notify(m),canUse:()=>!activeCar&&!sittingSeat&&!marine?.riding&&!scooters?.riding&&!powersports?.riding&&!skate?.riding&&!airfield?.boarded&&!realEstate.panelOpen&&!playerMenu?.panelOpen});
await yieldStartup();

const areaResume=createAreaResume({getPose:()=>({x:player.x,z:player.z,yaw,pitch}),isSafe:safeResumePoint,canSave:canSaveArea,applyPose:p=>{player.x=p.x;player.z=p.z;yaw=p.yaw;pitch=p.pitch;avatar.position.set(p.x,standingHeightAt(p.x,p.z),p.z);avatar.rotation.y=p.yaw;camera.position.set(p.x-Math.sin(yaw)*3.65,standingHeightAt(p.x,p.z)+2.2,p.z-Math.cos(yaw)*3.65);camera.lookAt(p.x,standingHeightAt(p.x,p.z)+1.2,p.z);}});
await yieldStartup();

let playable=false,movementLocked=false,characterPrepared=false,settledFrames=0;
gunGame=createWeaponGame({scene,camera,canvas:renderer.domElement,store:gunStore,getPlayer:()=>player,getHeight:groundHeightAt,actor:realisticPlayer,canControl:()=>playable&&!movementLocked&&!padUIOpen()&&!activeCar&&!powersports?.riding&&!scooters?.riding&&!marine?.riding&&!zCabs?.riding&&!airfield?.boarded,onStop:()=>{keys.clear();movement.vx=movement.vz=movement.wheelImpulse=0;townControls.stop();},clearOtherItems:()=>{tagGame?.chooseHand('');courtGames?.chooseHand('');marine?.chooseHand('');zStore?.chooseHand('');},registerAction:registerTownAction});
await yieldStartup();

function updateAreaLoading(){} // Startup is covered by the screenshot loading screen.
let elapsed=0,townEntered=false,paintedFrame=false;
await yieldStartup();
const outdoorVisibility=createOutdoorVisibility(scene,{getPlayer:()=>player,isInside:()=>freeApartments?.mode==='home'||!!gunStore?.active||!!hospital?.active||!!canopyVenue?.active||(!!cityview?.active&&!cityview.balcony)});
const renderBudget=createRenderBudget(scene,{getPlayer:()=>player,getCamera:()=>camera,getHeight:()=>avatar.position.y,mobile:MOBILE||LOW_GRAPHICS,quality:LOW_GRAPHICS?'low':playerMenu.state.quality,isApartmentInterior:()=>!!freeApartments?.active||!!gunStore?.active||!!hospital?.active||!!canopyVenue?.active||(!!cityview?.active&&!cityview.balcony)});
graphicsEngine=createRenderingUpgrade({scene,camera,renderer,sun,getPlayer:()=>player,getGround:groundHeightAt,mobile:MOBILE,initialQuality:LOW_GRAPHICS?'low':playerMenu.state.quality,onAdaptiveBudget:q=>renderBudget.setQuality(q),isInterior:()=>!!freeApartments?.active||!!hospital?.active||!!gunStore?.active||!!cityview?.active});graphicsEngine.configureLoader(loader);addEventListener('resize',()=>graphicsEngine?.resize());addEventListener('zerconda-playable',()=>setTimeout(()=>{enhanceMajorSurfaces({asphalt,concrete:paving,wood,grass},{loadCompressedTexture:url=>graphicsEngine.loadCompressedTexture(url)});graphicsEngine?.start();},1400),{once:true});
await yieldStartup();

adminTransport=createAdminTransport({getPlayer:()=>player,getMilitary:()=>militaryBase?.vehicleAssets,getAirfield:()=>airfield,hasClearance:()=>militaryAccess?.hasClearance()===true,requestAccess:grant=>militaryAccess.request(grant),canBoard:()=>playable&&!activeCar&&!zCabs?.riding&&!marine?.riding&&!scooters?.riding&&!powersports?.riding&&!skate?.riding&&!airfield?.boarded&&!insideHouse()&&!sittingSeat&&!militaryAccess?.panelOpen,getGround:(x,z)=>standingHeightAt(x,z),canMove:(x,z)=>walkable(x,z)&&!southBeach.blocksVehicle(x,z),onStop:()=>{keys.clear();townControls.stop();movement.vx=movement.vz=movement.wheelImpulse=0;},onMessage:m=>townControls.notify(m,7000),onExit:(x,y,z)=>{player.x=x;player.z=z;avatar.position.set(x,y,z);avatar.visible=true;yaw=0;pitch=0;camera.position.set(x,y+2,z-5);}});
await yieldStartup();

const controlMode=()=>canopyVenue?.active?'tag':adminTransport?.active?(adminTransport.active.kind==='car'?'military-driving':adminTransport.active.kind):activeCar||powersports?.riding?'driving':marine?.riding?'boat':skate?.riding?'skate':scooters?.riding?'scooter':courtGames?.tennisActive?'tennis':zCabs?.riding?'cab':airfield?.boarded?'passenger':club?.gameOpen||bowling?.gameOpen||carnival?.gameOpen?'game':gunGame?.heldValue?'weapons':'walking';
let padMenu=null;function closePadMenu(){padMenu?.remove();padMenu=null;}
function showPadMenu(items=null){closePadMenu();townControls.stop();controllerInput?.release();padMenu=document.createElement('section');padMenu.setAttribute('role','dialog');padMenu.setAttribute('aria-label',items?'Held item':'Player menu');padMenu.style.cssText='position:fixed;z-index:29500;top:50%;left:50%;transform:translate(-50%,-50%);width:min(370px,90vw);max-height:80vh;overflow:auto;background:#112739;color:white;border:1px solid #8fb9d0;border-radius:14px;padding:20px;font:16px system-ui';const h=document.createElement('h2');h.textContent=items?'Item in hand':'Player menu';padMenu.append(h);const choices=items||[['Profile',()=>playerMenu.open('profile')],['Homes',()=>cityview.openHomes()],['Item in hand',()=>{const select=document.getElementById('z-held-item');showPadMenu([...select.options].map(o=>[o.textContent,()=>{select.value=o.value;select.dispatchEvent(new Event('change',{bubbles:true}));}]));}],['Controls',()=>controlsGuide.button.click()],['Settings',()=>playerMenu.open('settings')],['Request cab',()=>areaTravel.callButton.click()]];for(const [label,fn]of [...choices,['Close menu',()=>{}]]){const b=document.createElement('button');b.textContent=label;b.style.cssText='display:block;width:100%;min-height:46px;margin:7px 0;color:white;background:#244860;border:1px solid #8fb9d0;border-radius:7px;font:inherit';b.onclick=()=>{closePadMenu();fn();};padMenu.append(b);}for(const e of['pointerdown','pointerup','keydown','keyup','wheel'])padMenu.addEventListener(e,v=>{if(e==='keydown'&&v.code==='Escape')closePadMenu();v.stopPropagation();});document.body.append(padMenu);padMenu.querySelector('button')?.focus();}
const padUIOpen=()=>gunGame?.panelOpen||!!(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)||padMenu||controlsGuide?.panelOpen||playerMenu?.panelOpen||tagGame?.panelOpen||adminAccount?.panelOpen||cityview?.panelOpen||hiddenForestPassage.panelOpen||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||zCabs?.panelOpen||hotDogVendor?.panelOpen||sunglassesHut?.panelOpen||zStore?.panelOpen||tattooShop?.panelOpen||villas?.panelOpen||barber?.panelOpen||club?.gameOpen||ownableHomes?.panelOpen||coastal?.panelOpen||apartments?.panelOpen||bowling?.gameOpen||boutique?.panelOpen||news?.panelOpen||marine?.panelOpen||carnival?.gameOpen||cityMap.expanded);
controlsGuide=createControlGuide({getMode:controlMode,getController:()=>controllerInput?.status,onStop:()=>{keys.clear();townControls.stop();movement.vx=movement.vz=movement.wheelImpulse=0;drivingControls?.reset();}});
controllerInput=createGamepadControls({target:renderer.domElement,enabled:()=>playable,getMode:controlMode,uiOpen:padUIOpen,onSwing:()=>tagGame?.swing(),onHelp:()=>{closePadMenu();if(controlsGuide.panelOpen)controlsGuide.close();else controlsGuide.button.click();},onMenu:()=>{if(padMenu)closePadMenu();else showPadMenu();},onAction:i=>{const a=townControls.activeActions;if(a.length)townControls.activate(a[i%a.length].id);else controllerInput.press('KeyF');},onBack:mode=>{if(tagGame?.joined){townControls.activate('tag-return-bopper');return;}const exit=townControls.activeActions.find(a=>/exit|leave|end ride|dock|step off|get out/i.test(a.element.textContent));if(exit){townControls.activate(exit.id);return;}if(['plane','helicopter','military-driving'].includes(mode)){const b=[...document.querySelectorAll('button')].find(b=>b.getClientRects().length&&/end flight|park and exit/i.test(b.textContent));b?.click();}else controllerInput.press(['driving','skate','scooter'].includes(mode)?'KeyE':mode==='passenger'?'KeyF':'Escape');},onLook:(dx,dy,mode)=>{if(mode==='cab'){cabPassengerCamera.look(dx,dy,zCabs.activeCab);return;}if(mode==='driving'){driverLookYaw=THREE.MathUtils.clamp(driverLookYaw-dx*.003,-1.25,1.25);driverLookPitch=THREE.MathUtils.clamp(driverLookPitch+dy*.0025,-.45,.55);}else if(mode==='boat'){boatLookYaw=THREE.MathUtils.clamp(boatLookYaw-dx*.003,-1.5,1.5);pitch=THREE.MathUtils.clamp(pitch+dy*.0025,-.5,.5);}else{yaw-=dx*.003;pitch=THREE.MathUtils.clamp(pitch-dy*.004,-1.25,1.25);}},onStatus:s=>{if(s.actionIndex!==undefined){const buttons=[...document.querySelectorAll('#town-action-list button')];buttons.forEach((b,i)=>b.style.outline=i===s.actionIndex%Math.max(1,buttons.length)?'3px solid #ffdc8c':'');}}});
controlsGuide.button.hidden=true;controlsGuide.button.style.display='none';
await yieldStartup();

const transportHomes=new WeakMap();
const abandonedTransport=createAbandonedTransport({getObservers:()=>[{camera,position:player}],getEntries:()=>[
 ...cars.map(c=>{if(!transportHomes.has(c))transportHomes.set(c,{x:c.x,z:c.z,y:c.group.position.y,angle:c.angle});return{id:c,home:transportHomes.get(c),position:()=>({x:c.x,z:c.z,y:c.group.position.y}),occupied:()=>activeCar===c,restore:h=>{c.x=h.x;c.z=h.z;c.angle=h.angle;c.speed=0;c.group.position.set(h.x,h.y,h.z);c.group.rotation.set(0,h.angle,0);}};}),
 ...(scooters?.fleet||[]).map(a=>({id:a,home:{x:118+a.id*1.10,z:77.5,y:0,angle:Math.PI/3},radius:1.5,position:()=>({x:a.x,z:a.z,y:a.model.position.y}),occupied:()=>scooters.activeScooter===a,restore:h=>scooters.returnUnused(a,h)}))
],canReturn:(entry,h)=>!cars.some(c=>c!==entry.id&&Math.hypot(c.x-h.x,c.z-h.z)<5)&&!(zCabs?.collisionVehicles||[]).some(c=>Math.hypot(c.x-h.x,c.z-h.z)<5)&&!(ambientTraffic?.collisionVehicles||[]).some(c=>Math.hypot(c.x-h.x,c.z-h.z)<5)});
const gravelTires=createGravelTireAudio({scene,getVehicle:()=>{if(adminTransport?.driving)return adminTransport.vehicle;const cab=zCabs?.activeCab;if(cab)return{x:cab.root.position.x,y:cab.root.position.y,z:cab.root.position.z,speed:cab.speed};return activeCar?{x:activeCar.x,y:activeCar.group.position.y,z:activeCar.z,speed:activeCar.speed}:null;}});
await yieldStartup();

adminWorld=createAdminWorldControls({scene,sun,hemisphere,sky:cloudSky,renderer,isAdmin:()=>!!adminAccount?.isAdmin});
const propertyThumbnail=createPropertyThumbnails({scene,renderer,avatar}),characterThumbnail=createCharacterThumbnails({scene,renderer});
const adminCharacters=()=>collectAdminCharacters({scene,groups:[{agents:boardwalkFitness?.agents||[],category:'Fitness and beach visitor'},{agents:neighborhoodResidents?.agents||[],category:'Neighborhood resident'},{agents:cityResidents.agents,category:'Town resident'},{agents:coffeeCustomers?.agents||[],category:'Coffee customer'},{agents:pedestrianSystem.agents,category:'Pedestrian'},{agents:beachVisitors.visitors,category:'Beach visitor'}],individuals:[beachKate,zFortune?.fortuneTeller,needlePlaidResident,boardwalkWalker,whiteFitnessWalker,curlyFitnessWalker,curlyBusinessWalker,fountainResident,chessPartner,{group:avatar,name:playerMenu?.state.name||'Resident',role:'Current player',category:'Player'}],extra:[{id:'store-hugo',name:'Hugo',role:'Everyday Finds owner',x:155,y:.15,z:58}]});adminCharacters();
adminDashboard=createAdminDashboard({getCharacterThumbnail:characterThumbnail,getPropertyThumbnail:propertyThumbnail,getCharacters:adminCharacters,onDeleteCharacter:c=>adminAccount?.isAdmin?deleteAdminCharacter(c):false,onRestoreCharacters:()=>{if(adminAccount?.isAdmin)restoreAdminCharacters();},getDeletedCharacterCount:deletedAdminCharacterCount,onVisitCharacter:c=>{if(c.id===beachKate?.group.uuid){travelToArea({name:'Kate · Beach lounger',x:beachKate.group.position.x+1.8,z:beachKate.group.position.z+1.4});return;}travelToArea({name:c.name,x:c.x+1.5,z:c.z+1.5});},isAdmin:()=>!!adminAccount?.isAdmin,onStop:stopCityview,onSignOut:()=>adminAccount.signOut(),world:adminWorld,getPlayer:()=>player,getPlayerName:()=>playerMenu?.state.name||'Resident',getRuntime:()=>{let meshes=0;scene.traverse(o=>{if(o.isMesh)meshes++});return{version:410,renderPixelRatio:renderer.getPixelRatio(),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,sceneMeshes:meshes,vehicles:{powersports:powersports?.models.length||0,cars:cars.length,ambientTraffic:ambientTraffic?.collisionVehicles.length||0},currentActivity:freeApartments?.active?'My free apartment':powersports?.riding?'Powersports vehicle':activeCar?'Car':cityview?.active?'Cityview':'Town'};},getProperties:()=>{const homes=collectHomeLocations({starter:ownableHomes,premier,villas,coastal,apartments:apartmentExteriors,apartmentExperience}).map(h=>({...h,owner:h.id==='H'+String(ownableHomes.owned?.id).padStart(2,'0')?ownableHomes.owned.username:null}));for(const f of cityview.ownership.list())homes.push({id:'CV'+String(f.level).padStart(2,'0'),name:'Cityview · Level '+f.level,x:-378,z:-62,level:f.level,owner:f.owner,ownerId:cityview.ownership.records[f.level]?.ownerId||null});homes.push({id:'FREE-ADMIN',name:'Admin · Free apartment',owner:'Admin',ownerId:'admin',x:-650,z:-480});return homes;},onVisit:h=>{if(h.id==='FREE-ADMIN'){freeApartments?.visitMine();return;}freeApartments?.leave();if(powersports?.riding&&!powersports.end())return;if(activeCar)toggleCar();scooters?.end();skate?.end();marine?.end?.();cityview.leave();stopCityview();const a=h.angle||0,offset=(h.minZ??-14)-3;player.x=h.x+Math.sin(a)*offset;player.z=h.z+Math.cos(a)*offset;yaw=a;pitch=0;cityMap.draw(true);}});
function animate(){
 requestAnimationFrame(animate);if(!townEntered)return;if(playable&&adminAccount?.panelOpen&&!adminAccount.isAdmin){graphicsEngine?.suspend();clock.getDelta();return;}const frameNow=performance.now();if(MOBILE&&frameNow-lastMobileFrame<32)return;lastMobileFrame=frameNow;const motionDt=Math.min(clock.getDelta(),.15),dt=Math.min(motionDt,.05);controllerInput?.update(motionDt);elapsed+=motionDt;gunStore?.update(motionDt);gunGame?.update(motionDt);hospital?.update(motionDt);freeApartments?.update(motionDt);outdoorVisibility.update(motionDt);canopyVenue?.update(motionDt);venueRenderIsolation?.prepare();tagGame?.update(motionDt);enforceAdminCharacterDeletions();const apartmentInteriorActive=!!freeApartments?.active||!!gunStore?.active||!!hospital?.active||!!canopyVenue?.active||!!cityview?.active;globalThis.zercondaTransportMoving=!!powersports?.riding||!!zCabs?.riding||!!activeCar&&Math.abs(activeCar.speed)>.1||!!scooters?.riding&&!powersports?.riding||!!marine?.riding;vehicleHorns.update();hiddenForestPassage.update(dt);updateCaveLife(motionDt,player);updateMountainWilderness(player);trackTrailExploration(motionDt,player,!activeCar&&!marine.riding&&!scooters.riding&&!powersports?.riding&&!airfield.boarded&&!zCabs.riding);forestGroundCover.update();chessPartner.update(motionDt);chessTables.update(motionDt);if(!apartmentInteriorActive)fountainResident.update(dt);if(!apartmentInteriorActive)boardwalkFitness?.update(motionDt);if(!apartmentInteriorActive)boardwalkWalker.update(motionDt);if(!apartmentInteriorActive)whiteFitnessWalker.update(motionDt);if(!apartmentInteriorActive)curlyFitnessWalker.update(motionDt);if(!apartmentInteriorActive)curlyBusinessWalker.update(motionDt);if(!apartmentInteriorActive)needlePlaidResident.update(motionDt);if(!apartmentInteriorActive)kateConversation.update(motionDt);let walkingDistance=0;if(insideHouse()){if(scooters?.riding)scooters.end();if(skate?.riding)skate.end();}
 // Crossing the open entrance naturally activates the authored lobby collision/camera.
 if(!onObservationDeck&&!observationNeedle.riding&&!activeCar&&!scooters.riding&&!powersports?.riding&&!marine.riding&&!club.active&&!apartmentSession&&!universalSession){const nx=player.x-observationNeedle.x,nz=player.z-observationNeedle.z;if(!insideNeedleLobby&&Math.abs(nx)<1.75&&nz>11.7&&nz<13.2)insideNeedleLobby=true;else if(insideNeedleLobby&&nz>=16.0)insideNeedleLobby=false;}
 updateTreeBreeze(elapsed);airDancers.update(elapsed);dealership.update?.(motionDt);dealerInside=!!dealership.root&&dealership.inside(player.x,player.z);coffeeShop.update(motionDt);if(!apartmentInteriorActive)coffeeCustomers?.update(motionDt);cafeInside=coffeeShop.isInside(player.x,player.z);powersports?.update(motionDt);zFortune?.update(motionDt);
 forestShade=THREE.MathUtils.damp(forestShade,Math.max(northernForest?.atmosphereAt(player.x,player.z)??0,perimeterForest.atmosphereAt(player.x,player.z)),1.4,motionDt);hemisphere.intensity=THREE.MathUtils.lerp(1.3,.72,forestShade);sun.intensity=THREE.MathUtils.lerp(2.8,1.35,forestShade);scene.fog.color.copy(daylightFog).lerp(forestFog,forestShade);scene.fog.density=THREE.MathUtils.lerp(.00055,.0020,forestShade);adminWorld?.apply();adminDashboard?.update(motionDt);
 militaryBase?.update(motionDt);
 abandonedTransport.update();observationNeedle.update(dt);zCabs?.update(motionDt);if(!adminWorld?.settings.pauseTraffic)ambientTraffic?.update(motionDt);
 bedRest?.update(motionDt);realEstate.update(motionDt);updatePrivateHomes();if(!apartmentInteriorActive)treeRoadMaintenance.update(motionDt);southBeach.update(motionDt);if(!apartmentInteriorActive)beachVisitors.update(motionDt);
 marine.update(motionDt,southBeach.ocean.time);
 scooters.update(dt);
 bowling.update(dt);
 boutique.update(dt);
 news.update(dt);
 premier.update(dt);
 camp.update(dt);
 rvPark.update(dt);
 carnival.update(dt);
 if(!apartmentInteriorActive)townObstacles.update(dt);
 if(!apartmentInteriorActive)signBacks?.update(dt);mobilePerformance.update(dt);
 airfield.update(dt);
 skate.update(dt);
 office.update(motionDt);
 barber.update(dt);
 villas.update(dt);
 eastsideGolf.update(dt);
 forestCheckpoint.update(dt);
 needleSportsPark.update(elapsed);
 apartments.update(dt);
 updateHomePassage(dt);ownableHomes.update(dt,player,activeCar);
 coastal.update(dt,player);
 player.clubSeated=sittingSeat?.kind==='club';
 club.update(dt,elapsed);
 if(!club.active)if(!apartmentInteriorActive)pedestrianSystem.update(motionDt,elapsed);
 if(!apartmentInteriorActive)cityResidents.update(motionDt);if(!apartmentInteriorActive)neighborhoodResidents?.update(motionDt);if(!apartmentInteriorActive)crowdSpacing.update(motionDt);
 cityview?.update(motionDt);beachKate?.update(motionDt);zStore?.update(motionDt);tattooShop?.update(motionDt);museum?.update(motionDt);
 courtGames?.update(motionDt);hotDogVendor?.update(motionDt);sunglassesHut?.update(motionDt);
 blockedWallOpening.update();
 cityMap.draw();
 if(realisticPlaza)realisticPlaza.update(dt);
 cloudSky.update(dt,player);gravelTires.update(motionDt);
 // Keep detailed sunlight shadows around the player throughout the expanded city.
 sun.position.set(player.x-70,135,player.z+85);sun.target.position.set(player.x,0,player.z);sun.target.updateMatrixWorld();
 const inputLocked=movementLocked=!playable||freeApartments?.riding||gunGame?.panelOpen||!!padMenu||tagGame?.panelOpen||canopyVenue?.riding||hiddenForestPassage.panelOpen||cityview?.panelOpen||cityview?.riding||adminAccount?.panelOpen||controlsGuide?.panelOpen||apartments.riding||chessTables.panelOpen||realEstate.panelOpen||militaryAccess?.panelOpen||zCabs?.riding||zCabs?.panelOpen||homePassageActive()||cityMap.expanded||(hotDogVendor?.panelOpen||sunglassesHut?.panelOpen)||zStore?.panelOpen||playerMenu?.panelOpen||tattooShop?.panelOpen||courtGames?.tennisActive||courtGames?.shooting||airfield?.controlsLocked||office?.riding||carnival?.riding||carnival?.gameOpen||observationNeedle.riding||villas?.panelOpen||barber?.panelOpen||club.gameOpen||(ownableHomes.panelOpen||coastal?.panelOpen||apartments?.panelOpen||(bowling?.gameOpen||(boutique?.panelOpen||(news?.panelOpen||(camp?.resting||airfield?.controlsLocked)))))||marine.panelOpen||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName);
 const padMotion=controllerInput?.values||{forward:0,side:0};
 const f=inputLocked?0:Math.abs(padMotion.forward)>.01?padMotion.forward:townControls.backward?-1:Math.max(Number(keys.has('KeyW')||keys.has('ArrowUp')),Number(townControls.walking))-Number(keys.has('KeyS')||keys.has('ArrowDown'));
 const side=inputLocked?0:Math.abs(padMotion.side)>.01?padMotion.side:Number(keys.has('KeyD')||keys.has('ArrowRight'))-Number(keys.has('KeyA')||keys.has('ArrowLeft'));
 boatMouseControls.update();adminTransport.update(motionDt,{locked:inputLocked});controlsGuide.update(motionDt);
 if(adminTransport.active){movement.vx=movement.vz=movement.wheelImpulse=0;
 }else if(zCabs?.riding){movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 }else if(carnival.riding||carnival.gameOpen){movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 }else if(observationNeedle.riding){
  movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 }else if(skate.riding){
  yaw-=side*dt*2.2;const skateInput=inputLocked?0:(f||Number(mouseSkateControls.pushing)||rideWheelThrottle);if(inputLocked)skate.stop();skate.drive(motionDt,skateInput,yaw);rideWheelThrottle*=Math.exp(-3*motionDt);if(Math.abs(rideWheelThrottle)<.04)rideWheelThrottle=0;movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 }else if(powersports?.riding){
  powersports.drive(motionDt,{throttle:inputLocked?0:(drivingControls.throttle||f||rideWheelThrottle||mouseVehicleSteering.throttle),steer:inputLocked?0:(drivingControls.steer||side||mouseVehicleSteering.steer),brake:keys.has('Space'),locked:inputLocked});yaw=powersports.heading;rideWheelThrottle*=Math.exp(-3*motionDt);movement.vx=movement.vz=movement.wheelImpulse=0;
 }else if(scooters.riding){
  yaw-=side*motionDt*1.65;const scooterInput=inputLocked?0:(f||Number(mouseSkateControls.pushing)||rideWheelThrottle);if(inputLocked)scooters.stop();scooters.drive(motionDt,scooterInput,yaw);rideWheelThrottle*=Math.exp(-3*motionDt);if(Math.abs(rideWheelThrottle)<.04)rideWheelThrottle=0;movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 }else if(marine.riding){
  const boatSteer=inputLocked?0:(side||boatMouseControls.steer),boatThrottle=inputLocked||boatMouseControls.braking?0:(f||boatMouseControls.throttle);yaw-=boatSteer*motionDt*1.1;if(inputLocked||boatMouseControls.braking)marine.stop();marine.drive(motionDt,{forward:boatThrottle,yaw});movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 }else if(activeCar){
  const c=activeCar,throttle=inputLocked?0:(drivingControls.throttle||f||driverWheelThrottle),steering=inputLocked?0:(drivingControls.steer||side||mouseVehicleSteering.steer);
  driverWheelThrottle*=Math.exp(-3*motionDt);
  c.speed=THREE.MathUtils.damp(c.speed,keys.has('Space')?0:throttle*(throttle<0?4.5:11),keys.has('Space')?12:2.6,motionDt);
  const targetAngle=c.angle-steering*motionDt*(.55+Math.abs(c.speed)*.06)*(c.speed<-.05?-1:1);
  c.footprint=measureVehicleFootprint(THREE,c.group);
  const obstacles=cars.filter(o=>o!==c).map(o=>({...o,footprint:measureVehicleFootprint(THREE,o.group)}));
  obstacles.push(...(zCabs?.collisionVehicles||[]),...(ambientTraffic?.collisionVehicles||[]),...dealership.cars.map(o=>vehicleDescriptor(THREE,o.model)));
  const pose=sweepVehiclePose(c,c.speed*motionDt,targetAngle,obstacles,(x,z)=>!walkable(x,z)||southBeach.blocksVehicle(x,z));
  c.group.position.x+=pose.x-c.x;c.group.position.z+=pose.z-c.z;c.x=pose.x;c.z=pose.z;c.angle=pose.angle;
  if(pose.blocked)c.speed=0;
  c.group.rotation.y=c.angle;player.x=c.x;player.z=c.z;yaw=c.angle;
 }else if(sittingSeat||bedRest?.active){
  movement.vx=0;movement.vz=0;movement.wheelImpulse=0;
 }else{
  if((f||side)&&marine.fishing)marine.cancelFishing();
  const len=Math.hypot(f,side)||1;
  const walkingOnly=insideHouse(),movementLimit=walkingOnly?WALK_SPEED:RUN_SPEED;
  const speed=walkingOnly||townControls.backward?WALK_SPEED:keys.has('ShiftLeft')||keys.has('ShiftRight')||townControls.running?RUN_SPEED:WALK_SPEED;
  const desiredX=(Math.sin(yaw)*f-Math.cos(yaw)*side)/len*speed;
  const desiredZ=(Math.cos(yaw)*f+Math.sin(yaw)*side)/len*speed;
  const damping=(f||side)?ACCELERATION:DECELERATION;
  movement.vx=THREE.MathUtils.damp(movement.vx,desiredX,damping,motionDt);
  movement.vz=THREE.MathUtils.damp(movement.vz,desiredZ,damping,motionDt);
  const wheelDistance=Math.sign(movement.wheelImpulse)*Math.min(Math.abs(movement.wheelImpulse)*(1-Math.exp(-11*motionDt)),movementLimit*motionDt);
  movement.wheelImpulse-=wheelDistance;
  let dx=movement.vx*motionDt+Math.sin(yaw)*wheelDistance;
  let dz=movement.vz*motionDt+Math.cos(yaw)*wheelDistance;
  // Scrolling selects a run rather than accelerating past the leg animation.
  const stepLength=Math.hypot(dx,dz),maxStep=movementLimit*motionDt;if(stepLength>maxStep){dx*=maxStep/stepLength;dz*=maxStep/stepLength;}
  const walkStartX=player.x,walkStartZ=player.z;
  const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.12));
  for(let n=0;n<count;n++){
   const next=townObstacles.slide(player.x,player.z,dx/count,dz/count,walkable,{recover:!inputLocked,autoSlide:!inputLocked&&(f>0||wheelDistance>0)&&Math.abs(side)<.1});
   player.x=next.x;player.z=next.z;
  }
  walkingDistance=Math.hypot(player.x-walkStartX,player.z-walkStartZ);
 }
 updatePublicLobbyPassage(dt);canopyVenue?.update(0);
 for(const d of doors){
  const near=Math.hypot(player.x-d.x,player.z-d.z)<3.4;
  d.open=THREE.MathUtils.damp(d.open,near?1:0,6,dt);
  d.hinge.rotation.y=d.side*d.open*1.22;
 }
 // The old procedural fountain's jetMaterial was removed with that fountain.
 // Its stale animation line caused ReferenceError every frame BEFORE renderer.render().
 // Animated water is now updated by realisticPlaza.update(dt) above.
 if(zCabs?.riding){const v=zCabs.activeCab;if(camera.fov!==66){camera.fov=66;camera.updateProjectionMatrix();}cabPassengerCamera.update(camera,v,motionDt);avatar.visible=false;
 }else if(activeCar){
  if(camera.fov!==66){camera.fov=66;camera.updateProjectionMatrix();}
  avatar.visible=false;
  // First-person driver's seat: camera moves with the car and looks through windshield.
  // Car geometry is hidden only for this client while driving to avoid blocking the view.
  const a=activeCar.angle;
  const forward=new THREE.Vector3(Math.sin(a),0,Math.cos(a));
  const right=new THREE.Vector3(Math.cos(a),0,-Math.sin(a));
  const eyePos=new THREE.Vector3(activeCar.x,activeCar.eyeHeight??1.58,activeCar.z).addScaledVector(right,-.34).addScaledVector(forward,.25);
  camera.position.copy(eyePos);
  const heading=a+driverLookYaw;
  const direction=new THREE.Vector3(Math.sin(heading),-Math.sin(driverLookPitch),Math.cos(heading));
  camera.lookAt(eyePos.clone().addScaledVector(direction,25));
 }else{
  const indoors=freeApartments?.active||gunStore?.contains(player.x,player.z)||hospital?.contains(player.x,player.z)||canopyVenue?.contains(player.x,player.z)||news?.contains(player.x,player.z)||zFortune?.contains(player.x,player.z)||cityview?.active||realEstate.contains(player.x,player.z)||scooters.inside||museum?.contains(player.x,player.z)||rvPark.inside||!!villas.at(player.x,player.z)||barber.active||office.lobby||camp.insideCabin||!!premier.at(player.x,player.z)||boutique.active||bowling.active||!!coastal.homeAt(player.x,player.z)||club.active||ownableHomes.active||!!apartmentSession||!!universalSession||cafeInside||dealerInside;
  const hospitalCameraBlend=hospital?.cameraBlend(player.x,player.z)||0;
  const dist=powersports?.riding?4.6:marine.riding?7:indoors?2.4:onObservationDeck?2.8:insideNeedleLobby?1.6:THREE.MathUtils.lerp(3.65,2.4,hospitalCameraBlend),eye=marine.riding?southBeach.ocean.heightAt(player.x,player.z)+1.5:onObservationDeck?observationNeedle.deckY+1.7:(indoors?1.65:THREE.MathUtils.lerp(1.3,1.65,hospitalCameraBlend))+groundHeightAt(player.x,player.z)+(skate.riding?skate.jumpHeight+.2:0);
  const desiredFov=!indoors&&!marine.riding&&!onObservationDeck&&!insideNeedleLobby?THREE.MathUtils.lerp(60,66,hospitalCameraBlend):66;if(camera.fov!==desiredFov){camera.fov=desiredFov;camera.updateProjectionMatrix();}
  const target=new THREE.Vector3(player.x,eye,player.z);
  // Camera elevation and target elevation must not cancel one another.
  // Positive pitch looks UP, negative pitch looks DOWN, with full vertical range.
  const viewYaw=powersports?.riding?yaw+driverLookYaw:marine.riding?yaw+boatLookYaw:yaw;
  const desired=new THREE.Vector3(player.x-Math.sin(viewYaw)*dist,eye+(indoors||!marine.riding&&!onObservationDeck&&!insideNeedleLobby ? .45 : 1.15),player.z-Math.cos(viewYaw)*dist);
  if(powersports?.riding){desired.set(player.x-Math.sin(viewYaw)*dist*Math.cos(driverLookPitch),eye+.45+dist*Math.sin(driverLookPitch),player.z-Math.cos(viewYaw)*dist*Math.cos(driverLookPitch));}
  // Resolve the hospital boom before smoothing, so wall contact never feeds a clipped
  // camera position back into the next frame's desired distance.
  const hospitalCameraRoot=hospital?.cameraRootAt(player.x,player.z);if(hospitalCameraRoot)cameraClearance.resolve({position:desired},target,hospitalCameraRoot);
  if(freeApartments?.active)cameraClearance.resolve({position:desired},target,freeApartments.cameraRootAt());
  if(freeApartments?.active)freeApartments.resolveCamera(camera,target,desired,dt);else camera.position.lerp(desired,Math.min(1,dt*8));
  scooters.clampCamera(camera.position);
  canopyVenue?.clampCamera(camera.position);museum?.clampCamera(camera.position,player);cityview?.clampCamera(camera.position);
  premier.clampCamera(camera.position,player.x,player.z);
  office.clampCamera(camera.position);
  barber.clampCamera(camera.position);
  villas.clampCamera(camera.position,player.x,player.z);
  if(news?.contains(player.x,player.z))news.clampCamera(camera.position);
  if(boutique.active)boutique.clampCamera(camera.position);
  if(bowling.active)bowling.clampCamera(camera.position);
  if(club.active)club.clampCamera(camera.position);
  if(ownableHomes.active)ownableHomes.clampCamera(camera.position);
  coastal.clampCamera(camera.position,player);realEstate.clampCamera(camera.position,player);if(militaryBase.towerActive){camera.position.set(player.x,groundHeightAt(player.x,player.z)+1.68,player.z);militaryBase.clampCamera(camera.position);}
  if(rvPark.inside){camera.position.set(player.x,groundHeightAt(player.x,player.z)+1.68,player.z);rvPark.clampCamera(camera.position);}
  if(camp.insideCabin&&!camp.resting){camera.position.set(player.x,groundHeightAt(player.x,player.z)+1.68,player.z);camp.clampCamera(camera.position);}
  if(apartmentSession){camera.position.set(player.x,groundHeightAt(player.x,player.z)+1.68,player.z);apartments.clampCamera(camera.position);}
  if(universalSession&&!universalSession.home){camera.position.x=THREE.MathUtils.clamp(camera.position.x,universalInteriors.x-7.0,universalInteriors.x+7.0);camera.position.z=THREE.MathUtils.clamp(camera.position.z,universalInteriors.z-8.5,universalInteriors.z+8.5);}
  if(onObservationDeck)observationNeedle.clampCamera(camera.position,'deck');else if(insideNeedleLobby)observationNeedle.clampCamera(camera.position,'lobby');
  camera.position.y=Math.max(onObservationDeck?observationNeedle.deckY+1.25:1.75,camera.position.y);
  if(sittingSeat?.reclined)positionBeachLoungeCamera(camera,sittingSeat);else if(!freeApartments?.active&&!marine.riding&&!rvPark.inside&&!camp.insideCabin&&!apartmentSession)cameraClearance.resolve(camera,target,freeApartments?.cameraRootAt()||gunStore?.cameraRootAt(player.x,player.z)||hospital?.cameraRootAt(player.x,player.z)||(cityview?.active?cityview.renderRoot:(canopyVenue?.cameraRootAt(player.x,player.z)||(ownableHomes.active?ownableHomes.interior.root:scene))));
  coffeeShop.clampCamera(camera.position,player);
  const lookPitch=powersports?.riding?driverLookPitch:pitch;const forward=new THREE.Vector3(Math.sin(powersports?.riding?viewYaw:yaw)*Math.cos(lookPitch),Math.sin(lookPitch),Math.cos(powersports?.riding?viewYaw:yaw)*Math.cos(lookPitch));
  const nextNear=freeApartments?.active?.08:apartmentSession?.05:onObservationDeck?.5:.25;if(camera.near!==nextNear){camera.near=nextNear;camera.updateProjectionMatrix();}
  if(powersports?.riding)camera.lookAt(target);else camera.lookAt(camera.position.clone().addScaledVector(forward,20));
  avatar.visible=!(freeApartments?.active&&camera.position.distanceTo(target)<.65)&&!sittingSeat?.reclined&&!(onObservationDeck&&Math.hypot(camera.position.x-player.x,camera.position.z-player.z)<.85)&&!airfield.boarded&&!camp.resting&&!camp.insideCabin&&!rvPark.inside&&!observationNeedle.riding&&!carnival.riding&&!apartmentSession;
  avatar.position.set(player.x,0,player.z);
  avatar.rotation.y=powersports?.riding?powersports.heading:marine.riding?marine.heading:sittingSeat?(sittingSeat.facing??yaw):yaw;avatar.rotation.x=marine.riding?marine.pitch:sittingSeat?.reclined?-.20:0;avatar.rotation.z=marine.riding?marine.roll:0;
  // Measure only movement produced by this frame's walking/scroll input. Fast
  // scroll steps are legitimate locomotion; teleports never enter this counter.
  const walkingSpeed=Math.min(10,walkingDistance/Math.max(motionDt,.001));
  // Animate the visible clothed model, using actual displacement so blocked
  // movement and teleports cannot produce skating or an in-place run.
  if(powersports?.riding){avatar.position.y=powersports.groundY;}else if(skate.riding){avatar.position.y=skate.riderY;avatar.quaternion.copy(skate.board.quaternion);avatar.rotateY(Math.PI/2);}else if(scooters.riding){avatar.position.y=scooters.riderY;}else if(marine.riding){avatar.position.y=marine.riderY;}else if(sittingSeat){
   // Seated pose: thighs forward, knees bent and torso lowered onto chair height.
   avatar.position.y=standingHeightAt(player.x,player.z);
   if(!realAvatar){playerRig.legs.forEach(leg=>{leg.hip.rotation.x=-1.18;leg.knee.rotation.x=1.48;});playerRig.torso.rotation.x=.05;}
   else{for(const [name,bone] of Object.entries(avatarBones)){
    if(/(upperleg|upleg|thigh)/.test(name))bone.rotation.x=-1.12;
    if(/(lowerleg|calf|shin)/.test(name))bone.rotation.x=1.38;
   }}
  }else avatar.position.y=(apartmentSession||universalSession&&!universalSession.home?0:standingHeightAt(player.x,player.z))+playerSoleOffset;
  // Place the avatar on the current surface before solving the feet.
  avatar.updateMatrixWorld(true);
  updateRealAvatar(motionDt,elapsed,sittingSeat||powersports?.riding||marine.riding||scooters.riding||skate.riding?0:walkingSpeed);
  courtGames?.animatePlayer(realisticPlayer);applyPlayerSeatPose(realisticPlayer,sittingSeat&&!sittingSeat.reclined?sittingSeat:null,standingHeightAt(player.x,player.z),elapsed);
  if(powersports?.riding)applyPowersportsRiderPose(realisticPlayer,powersports.riderSeat,elapsed);
  if(sittingSeat?.reclined)applyBeachLoungePose(avatar,sittingSeat);
  bedRest?.applyPose(avatar);bedRest?.positionCamera(camera);
  gunGame?.animatePlayer();marine.updateHeldRod();if(!canopyVenue?.slidePose)posePoleSlide(realisticPlayer,null);tagGame?.animatePlayer(realisticPlayer);if(canopyVenue?.slidePose)posePoleSlide(realisticPlayer,canopyVenue.slidePose);
 }
 if(!Number.isFinite(camera.position.x)||!Number.isFinite(camera.position.y)||!Number.isFinite(camera.position.z))resetView();
 // Prevent the driven car body from obstructing the first-person windshield view.
 if(activeCar)activeCar.group.visible=false;
 bowling.updateCamera(camera,dt);
 boutique.updateCamera(camera,dt);
 barber.updateCamera(camera,dt);
 camp.updateCamera(camera);
 airfield.updateCamera(camera);
 observationNeedle.updateCamera(camera);
 carnival.updateCamera(camera);
 courtGames?.updateCamera(camera);adminTransport?.updateCamera(camera);if(adminTransport?.active)avatar.visible=false;
 if(hiddenForestPassage.updateCamera(camera,yaw,pitch))avatar.visible=false;
 updateAreaLoading();areaResume.save();
 const restorePlayerVisibility=playerCameraGuard.apply(camera,avatar,!barber?.panelOpen&&!tattooShop?.panelOpen);
 if(deletedAdminCharacterCount()){const hugo=zStore?.root?.getObjectByName('Hugo · Everyday Finds store owner');if(hugo&&!hugo.userData.adminDeleted)collectAdminCharacters({individuals:[{group:hugo,name:'Hugo',category:'Shop staff'}]});}enforceAdminCharacterDeletions();try{if(nearbySceneryReady&&characterPrepared&&!gunGame?.panelOpen&&!tattooShop?.panelOpen&&!playerMenu?.profileOpen){renderBudget.update(motionDt);if(!apartmentInteriorActive)ownableHomes?.renderWindows(renderer,camera);updateReferenceLampLights(camera);const renderNow=performance.now(),renderGap=renderNow-lastRenderTime;lastRenderTime=renderNow;if(renderGap>70)slowRenderFrames++;else slowRenderFrames=Math.max(0,slowRenderFrames-1);if(!graphicsEngine&&slowRenderFrames>=4&&renderer.getPixelRatio()>(MOBILE?.55:.6)){renderer.setPixelRatio(Math.max(MOBILE?.55:.6,renderer.getPixelRatio()*.85));slowRenderFrames=0;}venueRenderIsolation?.update();shaderWarmup.render(scene,camera,()=>{graphicsEngine?graphicsEngine.render():houseSunShadows.render(camera);if(!paintedFrame){paintedFrame=true;window.dispatchEvent(new Event('zerconda-frame'));}if(!playable&&nearbySceneryReady&&characterPrepared&&++settledFrames>=1){playable=true;keys.clear();window.dispatchEvent(new Event('zerconda-playable'));setTimeout(()=>{ambientTraffic=createAmbientTraffic(scene,{getPlayer:()=>player,getHeight:()=>GROUND_LEVEL,getVehicles:()=>[...cars,...(zCabs?.collisionVehicles||[])],getPedestrians:()=>[...pedestrianSystem.agents.map(a=>a.group.position),...cityResidents.collisionPeople],prepareModels:()=>loadLuxurySedan(),createModel:i=>i%2?createShowroomPickup({name:'Resident pickup',color:i===1?'#637e91':'#935746'}):createLuxurySedan()});},2000);}});}}
 catch(err){renderFailure=String(err);console.error('ZERCONDA RENDER ERROR',err);if(!paintedFrame){townEntered=false;window.dispatchEvent(new CustomEvent('zerconda-load-failed',{detail:'The graphics could not start. Please retry.'}));}}
 finally{restorePlayerVisibility();if(activeCar)activeCar.group.visible=true;}
 const nearHome=!boutique.active&&!bowling.active&&!scooters.riding&&!powersports?.riding&&!skate?.riding&&!activeCar?ownableHomes.closest(player.x,player.z,11):null;
 homeButton.style.display=nearHome?'block':'none';
 if(nearHome)homeButton.textContent=ownableHomes.owned?.id===nearHome.id?'H · CUSTOMIZE HOME':'H · CLAIM / HOME OPTIONS';
 const nearTower=!boutique.active&&!bowling.active&&!scooters.riding&&!powersports?.riding&&!skate?.riding&&!activeCar&&Math.hypot(player.x-observationNeedle.entrance.x,player.z-observationNeedle.entrance.z)<7;
 towerButton.style.display=(!observationNeedle.riding&&((onObservationDeck&&observationNeedle.nearLift(player.x,player.z))||(insideNeedleLobby&&observationNeedle.authorized&&observationNeedle.nearLift(player.x,player.z))))?'block':'none';
 towerExitButton.style.display='none';
 towerButton.textContent=onObservationDeck?'T · RIDE Z-VIEW DOWN':insideNeedleLobby?'T · RIDE Z-VIEW UP':'T · ENTER Z-VIEW';
 const universalEntry=universalSession?{label:'EXIT'}:nearestUniversalEntrance();
 const door=universalEntry?null:nearestDoor();doorButton.style.display='none';
 doorButton.textContent=universalSession?(universalSession.home?'Exit Home':'F · EXIT BUILDING'):universalEntry?.garage?'F · ENTER GARAGE':universalEntry?.home?'Enter home':universalEntry?.apartment?'F · ENTER APARTMENTS':'F · ENTER BUILDING';
 const nearSeat=nearestAvailableSeat();
 cafeButton.style.display=(sittingSeat||nearSeat)&&!activeCar?'block':'none';
 cafeButton.textContent=sittingSeat?'C · STAND UP':nearSeat?.kind==='beach lounger'?'Sit on lounger':nearSeat?.kind==='boardwalk bench'?'Sit on bench':'C · SIT DOWN';
 const otherInterior=scooters.inside||carnival.riding||carnival.gameOpen||rvPark.inside||observationNeedle.riding||barber.active||office.active||skate.riding||airfield.boarded||camp.resting||camp.insideCabin||!!premier.at(player.x,player.z)||boutique.active||bowling.active||scooters.riding||marine.riding||club.active||ownableHomes.active||!!universalSession||!!apartmentSession||onObservationDeck||insideNeedleLobby;
 cafeEntryButton.style.display='none';
 cafeEntryButton.textContent=cafeInside?'E · EXIT COFFEE SHOP':'E · ENTER COFFEE SHOP';
 dealerButton.style.display='none';
 dealerButton.textContent=dealerInside?'E · EXIT DEALERSHIP':'E · ENTER DEALERSHIP';
 const showroomCar=dealerInside?dealership.nearestCar(player.x,player.z,5):null;showroomButton.style.display=showroomCar?'block':'none';if(showroomCar)showroomButton.textContent='View '+showroomCar.name;
 apartmentButton.style.display=apartmentSession&&!apartments.currentUnit&&apartments.currentFloor!==0?'block':'none';apartmentButton.textContent=apartments.currentUnit?'Return to apartment corridor':apartments.currentFloor?'Return to ground floor':'Exit apartments';
 if(enter){enter.style.display=!adminTransport?.active&&(activeCar||!otherInterior&&!cafeInside&&!dealerInside&&nearestUsableCar())?'block':'none';enter.textContent=activeCar?'Exit vehicle':'Enter vehicle';}
 townControls.update();
 drivingControls.update(activeCar||powersports?.activeVehicle);
 if((diagnosticFrames++%30)===0){
  const p=camera.position;
  diag.textContent='BUILD '+ZERCONDA_BUILD+'\nRENDER '+(contextLost?'CONTEXT LOST':'ACTIVE')+
   ' | objects '+scene.children.length+
   ' | draw calls '+renderer.info.render.calls+
   ' | triangles '+renderer.info.render.triangles+
   '\nCamera '+p.x.toFixed(1)+','+p.y.toFixed(1)+','+p.z.toFixed(1)+
   ' | player '+player.x.toFixed(1)+','+player.z.toFixed(1)+
   ' | canvas '+renderer.domElement.clientWidth+'x'+renderer.domElement.clientHeight+
   (renderFailure?'\nERROR '+renderFailure:'');
 }

}
requestAnimationFrame(animate);
await yieldStartup();

addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;
 camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
await yieldStartup();




// Keep the screenshot screen up until scenery and the available character are prepared.
export const initialReady=Promise.race([realisticPlayer.readyPromise,new Promise(resolve=>setTimeout(resolve,12000))]).then(()=>undefined).catch(error=>{console.warn('Using the available player while character details load',error);}).finally(()=>{characterPrepared=true;BOOT('Preparing the first view');});
export function startWorld(){if(townEntered)return;BOOT('Preparing roads and local buildings');installPremiumGameUI();townEntered=true;unifyForestGround(scene);cutCaveTerrain(scene);venueAccessRoads.finalize();clearRoadSidewalkOverlaps(scene,{asphalt,paving,curb,gravelRoot:forestGravelRoads?.root});clearPedestrianPathMarkings(scene);clock.getDelta();signBacks?.scan();renderBudget.scan();roadMap.scan();treeRoadMaintenance.scanRoads();treeRoadMaintenance.update(2);nearbySceneryReady=true;}

addEventListener('zerconda-enter',startWorld);
await yieldStartup();

BOOT('Restoring position');
if(RECOVERY_PLAZA){player.x=34;player.z=34;yaw=0;pitch=0;avatar.position.set(34,standingHeightAt(34,34),34);camera.position.set(34,standingHeightAt(34,34)+2.2,30.35);camera.lookAt(34,standingHeightAt(34,34)+1.2,34);}else areaResume.restore();
await yieldStartup();
window.dispatchEvent(new Event('zerconda-core-ready'));
await yieldStartup();
BOOT('Preparing nearby visibility');
await outdoorVisibility.prepareInitial();
startWorld();
await yieldStartup();


export function startupStatus(){return{graphics:LOW_GRAPHICS?'low':'normal',recoveryPlaza:RECOVERY_PLAZA,entered:townEntered,painted:paintedFrame,characterReady:realisticPlayer.ready,fallbackVisible:fallbackPlayer.root.visible,loadingArea:!playable,playable,player:{x:player.x,z:player.z,yaw,pitch},sceneryStarted,sceneryComplete:sceneryFinished,nearbySceneryReady,trafficCount:ambientTraffic?.vehicles.length||0,houseShadows:houseSunShadows.stats(),renderPixelRatio:renderer.getPixelRatio(),...shaderWarmup.stats(),...renderBudget.stats(),...outdoorVisibility.stats(),graphicsQuality:graphicsEngine?.stats()};}

export function movementStatus(x=player.x,z=player.z){return{point:{x,z},walkable:walkable(x,z),hit:townObstacles?.hit(x,z)?.object?.name,locked:movementLocked,keys:[...keys],velocity:{x:movement.vx,z:movement.vz},focus:document.activeElement?.tagName,menu:playerMenu?.panelOpen,car:!!activeCar,cab:zCabs?.riding,house:insideHouse(),villa:villas?.blocks(x,z),park:needleSportsPark?.blocks(x,z)}};
await yieldStartup();




export function cityviewStatus(){return{active:cityview.active,level:cityview.currentFloor,riding:cityview.riding,floors:cityview.ownership.list()};}
