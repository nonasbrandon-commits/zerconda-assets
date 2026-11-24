import {createLobbyMarbleFloor} from './lobby-marble-floor.js?v=20261124-marble-v336';
// Reuse the established vein texture, with room-sized UV repetition and its own finish.
export function createCoffeeMarbleFloor(){const material=createLobbyMarbleFloor().clone();material.map=material.map.clone();material.map.repeat.set(24/4.8,18/4.8);material.map.needsUpdate=true;material.roughness=.17;material.metalness=.035;material.clearcoat=.85;material.clearcoatRoughness=.13;material.name='Brewstone · polished dark marble · 1.2m square tiles';return material;}
