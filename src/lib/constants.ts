import { Vector3 } from 'three';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const CONFIG = {
    STAR_COUNT: 50000,
    PIXEL_RATIO: 1.5,
    TARGET_FPS: 60,
    LERP_SPEED: 0.035,
    COLOR_LERP_SPEED: 0.02,

    // Camera
    BASE_FOV: 60,
    NEAR: 0.1,
    FAR: 1000,
};



export interface LandmarkData {
    id: string;
    position: Vector3;
    texture: string;
    scale: number;
    title: string;
    description: string; // Scientific/Adult description
    type: string;        // e.g. "Emission Nebula"
    distance: string;    // e.g. "6,500 ly"
    constellation: string; // e.g. "Serpens"
    distanceTrigger: number;
}

export const LANDMARKS: LandmarkData[] = [
    {
        id: 'pillars',
        position: new Vector3(0, 0, -350), // Shifted closer (was -600)
        texture: '/textures/pillars_of_creation.jpg',
        scale: 150,
        title: 'Pillars of Creation',
        type: 'Emission Nebula',
        distance: '6,500 light-years',
        constellation: 'Serpens',
        description: 'The Pillars of Creation are vast trunks of interstellar gas and dust in the Eagle Nebula (Messier 16). They are active stellar nurseries where new stars are being born, simultaneously eroded by the intense ultraviolet light from nearby massive stars. The leftmost pillar is about four light-years in length.',
        distanceTrigger: 70
    },
    {
        id: 'eye_of_god',
        position: new Vector3(0, 0, -1150), // Shifted closer (was -1400)
        texture: '/textures/eye_of_god.png',
        scale: 250,
        title: 'Eye of God',
        type: 'Planetary Nebula',
        distance: '650 light-years',
        constellation: 'Aquarius',
        description: 'The Helix Nebula, often referred to as the Eye of God, is a large planetary nebula located in the constellation Aquarius. It is one of the closest to Earth of all the bright planetary nebulae. The estimated age is 10,600 years, based on its expansion rate.',
        distanceTrigger: 70
    },
    {
        id: 'butterfly',
        position: new Vector3(0, -100, -1950), // Shifted closer (was -2200)
        texture: '/textures/Butterfly_nebula.jpg',
        scale: 300,
        title: 'Butterfly Nebula',
        type: 'Planetary Nebula',
        distance: '3,392 light-years',
        constellation: 'Scorpius',
        description: 'The Butterfly Nebula (NGC 6302) exhibits a complex, bipolar structure reminiscent of butterfly wings. Its central star is one of the hottest known, with a surface temperature exceeding 250,000 degrees Celsius, driving the high-energy expansion of the nebula.',
        distanceTrigger: 80
    }
];

// Camera path waypoints - SCRIPTED CINEMA (ADJUSTED START)
export const WAYPOINTS: Vector3[] = [
    // 1. "START UNIVERSE... JUST 2 SCROLLS" 
    // Reduced void duration significantly
    new Vector3(0, 0, 100),         // START
    new Vector3(0, 0, -50),         // Short straight...

    // 2. "DEEP DIVE EITHER LEFT OR RIGHT" (Turn happens much sooner)
    // Target Turn at -200 (was -450)
    new Vector3(60, -2, -200),      // SHARP RIGHT TURN
    new Vector3(40, 0, -250),       // Banking...

    // 3. "NEXT IMAGE STARTS VISIBLE" (Pillars at -350)
    new Vector3(0, 0, -300),        // CENTERED & STRAIGHT (Aligning for -350)
    new Vector3(0, 0, -350),        // PILLARS FOCUS

    // 4. "THROUGH WE GO 2 SCROLLS STRAIGHTS"
    new Vector3(0, 0, -550),        // Flying straight through...

    // 5. "THEN ON 3 SCROLL SHARP LEFT"
    new Vector3(-60, 5, -700),      // SHARP LEFT TURN
    new Vector3(-40, -5, -850),     // Banking...

    // 6. "THEN STRAIGHT 1 SCROLL... 2ND SCROLL WE SEE EYE"
    // Eye at -1150
    new Vector3(0, 0, -1000),       // CENTERED & STRAIGHT
    new Vector3(0, 0, -1150),       // EYE FOCUS

    // 7. "THROUGH WE GO 2 SCROLLS STRAIGHT"
    new Vector3(0, 0, -1350),       // Flying straight through...

    // 8. "THEN 3 BOTTOM DIVE"
    new Vector3(0, -20, -1450),     // Start Dive
    new Vector3(0, -100, -1650),    // DEEP DIVE

    // 9. "5 WE START SEEING NEBULA"
    // Butterfly at -1950
    new Vector3(0, -100, -1800),    // Straight leveling at bottom...
    new Vector3(0, -100, -1950)     // BUTTERFLY FOCUS
];
