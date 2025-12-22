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
        position: new Vector3(0, 0, -320),
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
        position: new Vector3(0, 0, -750), // Much deeper for separation
        texture: '/textures/eye_of_god.png',
        scale: 250,
        title: 'Eye of God',
        type: 'Planetary Nebula',
        distance: '650 light-years',
        constellation: 'Aquarius',
        description: 'The Helix Nebula, often referred to as the Eye of God, is a large planetary nebula located in the constellation Aquarius. It is one of the closest to Earth of all the bright planetary nebulae. The estimated age is 10,600 years, based on its expansion rate.',
        distanceTrigger: 70
    }
];

// Camera path waypoints - Choreographed Journey
export const WAYPOINTS: Vector3[] = [
    new Vector3(0, 0, 100),         // START
    new Vector3(-10, 5, 50),        // Left Weave
    new Vector3(10, -5, 0),         // Right Weave
    new Vector3(-5, 5, -50),        // Center/Left Adjustment

    // APPROACHING PILLARS (Go Right)
    new Vector3(15, -2, -150),      // Drifting Right
    new Vector3(8, 0, -250),        // Aligning from Right
    new Vector3(0, 0, -320),        // PILLARS FOCUS (Center)

    // THROUGH PILLARS & TRANSIT (Go Left -> Straight)
    new Vector3(0, 0, -380),        // Fly Through
    new Vector3(-15, 5, -450),      // Drift Left (Deep Space)
    new Vector3(-10, -5, -550),     // Holding Left/Down

    // APPROACHING EYE (Straighten Out)
    new Vector3(0, 0, -650),        // Center/Straight
    new Vector3(0, 0, -750)         // EYE FOCUS
];
