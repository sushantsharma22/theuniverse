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
        texture: '/textures/pillars_of_creation.png', // New high-res texture
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

// Camera path waypoints - REFINED STRAIGHTS
export const WAYPOINTS: Vector3[] = [
    new Vector3(0, 0, 100),         // START
    new Vector3(-10, 2, 50),        // Gentle Left
    new Vector3(10, -2, 0),         // Gentle Right
    new Vector3(0, 0, -50),         // CENTER STRAIGHT

    // APPROACHING PILLARS (Sharp turn -> Straighten)
    new Vector3(35, -2, -120),      // Sharp Right Turn (Reduced from 60)
    new Vector3(15, 0, -180),       // Aligning...
    new Vector3(0, 0, -220),        // STRAIGHT ON (Before Pillars)
    new Vector3(0, 0, -250),        // PILLARS FOCUS (Center)

    // THROUGH PILLARS & TRANSIT (Sharp Left -> Straighten)
    new Vector3(0, 0, -300),        // Fly Through Straight
    new Vector3(-35, 5, -380),      // Sharp Left Turn (Reduced from 60)
    new Vector3(-10, 0, -450),      // Aligning...

    // STRAIGHT APPROACH TO EYE
    new Vector3(0, 0, -500),        // STRAIGHT ON (Long approach)
    new Vector3(0, 0, -550),        // EYE FOCUS

    // STRAIGHT -> SMOOTH DIVE
    new Vector3(0, 0, -650),        // Fly Through Eye (Straight Long)
    new Vector3(0, -30, -750),      // Start Dive Smoothly
    new Vector3(0, -100, -850)      // BUTTERFLY FOCUS (Bottom)
];
