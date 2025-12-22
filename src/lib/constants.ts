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
        id: 'black_hole',
        position: new Vector3(0, 50, -1800), // New Discovery
        texture: '/textures/firstblackhole.jpg',
        scale: 400,
        title: 'Supermassive Black Hole',
        type: 'Black Hole',
        distance: '55 million light-years',
        constellation: 'Virgo',
        description: 'This is the first direct image of a black hole, located in Messier 87. It captures the shadow of the supermassive black hole and its accretion disk of superheated gas. The black hole has a mass 6.5 billion times that of our Sun.',
        distanceTrigger: 90
    },
    {
        id: 'galaxy',
        position: new Vector3(0, 0, -2400), // Final Frontier
        texture: '/textures/The Sombrero Galaxy.jpg',
        scale: 500,
        title: 'Sombrero Galaxy',
        type: 'Spiral Galaxy',
        distance: '29 million light-years',
        constellation: 'Virgo',
        description: 'The Sombrero Galaxy (M104) is a spiral galaxy in the constellation Virgo. It has a bright nucleus, an unusually large central bulge, and a prominent dust lane in its inclined disk, giving it the appearance of a sombrero.',
        distanceTrigger: 100
    }
];

// Camera path waypoints - 5 STAGE EPIC JOURNEY
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
    new Vector3(-40, -5, -650),     // Banking...
    new Vector3(0, 0, -750),        // Eye Reveal Approach
    new Vector3(0, 0, -800),        // EYE FOCUS

    // 4. "LOOK LEFT / SHEER SIZE" MOMENT (At the Eye)
    new Vector3(0, 0, -820),        // Close to Eye
    new Vector3(-30, 0, -820),      // PAN LEFT (Look at size)
    new Vector3(0, 0, -820),        // PAN BACK CENTER
    new Vector3(0, 0, -900),        // Fly Through Straight

    // 5. TO BUTTERFLY
    new Vector3(0, -20, -1000),     // Start Dive
    new Vector3(0, -100, -1150),    // DEEP DIVE
    new Vector3(0, -100, -1250),    // BUTTERFLY REVEAL
    new Vector3(0, -100, -1350),    // Fly Through Base

    // 6. TO BLACK HOLE (Rise Up)
    new Vector3(0, 0, -1500),       // Rise back to plane
    new Vector3(40, 20, -1650),     // Bank Right/Up
    new Vector3(0, 50, -1800),      // BLACK HOLE REVEAL (High Angle)

    // 7. TO GALAXY (Straight Shot)
    new Vector3(0, 50, -2000),      // Fly Through
    new Vector3(0, 0, -2200),       // Level Out
    new Vector3(0, 0, -2400)        // SOMBRERO GALAXY REVEAL
];
