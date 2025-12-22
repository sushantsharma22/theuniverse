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
        position: new Vector3(0, 0, -250), // Moved closer from -320
        texture: '/textures/pillars_of_creation.png',
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
        position: new Vector3(0, 0, -550),
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
        position: new Vector3(0, -100, -850), // DEEP & DOWN (Dive target)
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

// Camera path waypoints - SHARP DIVE CHOREOGRAPHY
export const WAYPOINTS: Vector3[] = [
    new Vector3(0, 0, 100),         // START
    new Vector3(-25, 5, 50),        // Sharp Left Weave
    new Vector3(25, -5, -20),       // Sharp Right Weave
    new Vector3(-5, 5, -80),        // Center Adjust

    // SHARP RIGHT TO PILLARS
    new Vector3(60, -2, -150),      // Extreme Right Drift
    new Vector3(30, 0, -200),       // Banking In
    new Vector3(0, 0, -250),        // PILLARS CENTER

    // FLY THROUGH & SHARP LEFT
    new Vector3(0, 0, -300),        // Fly Through
    new Vector3(-60, 5, -380),      // Extreme Left (Deep Space Void)
    new Vector3(-30, -5, -450),     // Banking In

    // STRAIGHT APPROACH TO EYE
    new Vector3(0, 0, -500),        // Dead Center Reveal
    new Vector3(0, 0, -550),        // EYE FOCUS

    // STRAIGHT -> SHARP DIVE
    new Vector3(0, 0, -620),        // Fly Through Eye (Straight)
    new Vector3(0, -20, -680),      // Start Dive
    new Vector3(0, -80, -750),      // STEEP DIVE DOWN
    new Vector3(0, -100, -850)      // BUTTERFLY FOCUS (Bottom)
];
