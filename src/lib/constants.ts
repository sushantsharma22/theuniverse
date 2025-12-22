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
        position: new Vector3(0, 0, -350), // Unchanged (Start pacing is good)
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
        position: new Vector3(0, 0, -800), // Shifted closer (was -1150)
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
        position: new Vector3(0, -100, -1250), // Shifted closer (was -1950)
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

// Camera path waypoints - SCRIPTED CINEMA (COMPRESSED GAPS)
export const WAYPOINTS: Vector3[] = [
    // 1. START (Unchanged)
    new Vector3(0, 0, 100),
    new Vector3(0, 0, -50),

    // 2. TURN (Unchanged)
    new Vector3(60, -2, -200),      // SHARP RIGHT TURN
    new Vector3(40, 0, -250),

    // 3. PILLARS REVEAL (Unchanged -350)
    new Vector3(0, 0, -300),
    new Vector3(0, 0, -350),        // PILLARS FOCUS

    // 4. TRANSIT TO EYE (Accelerated)
    new Vector3(0, 0, -450),        // Fly Through

    // 5. TURN TO EYE (Earlier)
    // Eye is at -800. Reveal starts ~-650. Turn ~-600.
    new Vector3(-60, 5, -550),      // SHARP LEFT TURN
    new Vector3(-40, -5, -650),     // Banking...

    // 6. EYE REVEAL
    new Vector3(0, 0, -750),        // CENTERED & STRAIGHT
    new Vector3(0, 0, -800),        // EYE FOCUS

    // 7. TRANSIT TO NEBULA (Accelerated)
    new Vector3(0, 0, -900),        // Fly Through

    // 8. DIVE (Earlier)
    // Butterfly at -1250. Dive start ~-1000.
    new Vector3(0, -20, -1000),     // Start Dive
    new Vector3(0, -100, -1150),    // DEEP DIVE

    // 9. BUTTERFLY REVEAL
    new Vector3(0, -100, -1200),    // Straight leveling...
    new Vector3(0, -100, -1250)     // BUTTERFLY FOCUS
];
