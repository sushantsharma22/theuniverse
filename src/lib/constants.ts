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
    scaleX?: number;      // Optional multiplier for non-square textures
    visibilityRange?: number; // Distance at which landmark starts fading in (Default: 400)
}

export const LANDMARKS: LandmarkData[] = [
    {
        id: 'pillars',
        position: new Vector3(0, 0, -350),
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
        position: new Vector3(0, 0, -800),
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
        position: new Vector3(0, -100, -1250),
        texture: '/textures/Butterfly_nebula.jpg',
        scale: 300,
        title: 'Butterfly Nebula',
        type: 'Planetary Nebula',
        distance: '3,392 light-years',
        constellation: 'Scorpius',
        description: 'The Butterfly Nebula (NGC 6302) exhibits a complex, bipolar structure reminiscent of butterfly wings. Its central star is one of the hottest known, with a surface temperature exceeding 250,000 degrees Celsius, driving the high-energy expansion of the nebula.',
        distanceTrigger: 80
    },
    {
        id: 'galaxy',
        position: new Vector3(0, 0, -2000), // PUSHED BACK (750u gap from Nebula)
        texture: '/textures/The Sombrero Galaxy.jpg',
        scale: 500,
        scaleX: 1.8,
        title: 'Sombrero Galaxy',
        type: 'Spiral Galaxy',
        distance: '29 million light-years',
        constellation: 'Virgo',
        description: 'The Sombrero Galaxy (M104) is a spiral galaxy in the constellation Virgo. It has a bright nucleus, an unusually large central bulge, and a prominent dust lane in its inclined disk, giving it the appearance of a sombrero.',
        distanceTrigger: 100,
        visibilityRange: 600 // REDUCED: Only visible after clearing Nebula area
    },
    {
        id: 'black_hole',
        position: new Vector3(0, 0, -2600), // FINAL BOSS (Deepest)
        texture: '/textures/blackhole_v2.jpg',
        scale: 400,
        scaleX: 1.78,
        title: 'Supermassive Black Hole',
        type: 'Black Hole',
        distance: '55 million light-years',
        constellation: 'Virgo',
        description: 'This is the first direct image of a black hole, located in Messier 87. It captures the shadow of the supermassive black hole and its accretion disk of superheated gas. The black hole has a mass 6.5 billion times that of our Sun.',
        distanceTrigger: 100,
        visibilityRange: 1000
    }
];

// Camera path waypoints - 5 STAGE EPIC JOURNEY (DEEP SPACED FINALE)
export const WAYPOINTS: Vector3[] = [
    // 1. START 
    new Vector3(0, 0, 100),
    new Vector3(0, 0, -50),

    // 2. TURN TO PILLARS
    new Vector3(60, -2, -200),      // SHARP RIGHT TURN
    new Vector3(40, 0, -250),
    new Vector3(0, 0, -300),
    new Vector3(0, 0, -350),        // PILLARS REVEAL

    // 3. TRANSIT TO EYE
    new Vector3(0, 0, -450),        // Fly Through
    new Vector3(-60, 5, -550),      // SHARP LEFT TURN
    new Vector3(-40, -5, -600),     // Banking...

    // 4. EYE REVEAL
    new Vector3(0, 0, -700),        // Center Approach
    new Vector3(0, 0, -750),        // Straight...
    new Vector3(0, 0, -800),        // FLY THROUGH THE EYE

    // 5. TO BUTTERFLY
    new Vector3(0, 0, -900),        // Straight out
    new Vector3(0, -20, -1000),     // Start Dive
    new Vector3(0, -100, -1150),    // DEEP DIVE
    new Vector3(0, -100, -1250),    // BUTTERFLY REVEAL

    // 6. TO GALAXY (Specific Timing: Void -> Rise -> Reveal)
    new Vector3(0, -100, -1450),    // Void Scroll 1 (Deep)
    new Vector3(0, -100, -1650),    // Void Scroll 2 (Deep - "2 scrolls in starfield")
    new Vector3(0, 0, -1800),       // Scroll 3 (UPWARDS to Center)
    new Vector3(0, 0, -2000),       // SOMBRERO GALAXY REVEAL (Visible slowing closing)

    // 7. TO BLACK HOLE (Gap -> Final Boss)
    new Vector3(0, 0, -2100),       // Fly Through Galaxy
    new Vector3(0, 0, -2300),       // Void Gap Scroll 1
    new Vector3(0, 0, -2600)        // BLACK HOLE REVEAL (2-3 scrolls later)
];
