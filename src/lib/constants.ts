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
        position: new Vector3(0, 0, -850), // Pushed even deeper for longer straight approach
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

// Camera path waypoints - SHARP CHOREOGRAPHY
export const WAYPOINTS: Vector3[] = [
    new Vector3(0, 0, 100),         // START
    new Vector3(-20, 5, 50),        // Sharp Left Weave
    new Vector3(20, -5, 0),         // Sharp Right Weave
    new Vector3(-10, 5, -50),       // Center Adjustment

    // SHARP RIGHT TURN TO PILLARS
    new Vector3(80, -2, -150),      // Extreme Right (Drift)
    new Vector3(40, 0, -250),       // Banking In
    new Vector3(0, 0, -320),        // PILLARS CENTER

    // FLY THROUGH & SHARP LEFT
    new Vector3(0, 0, -380),        // Fly Through
    new Vector3(-80, 5, -500),      // Extreme Left (Deep Space - "Nothingness")
    new Vector3(-40, -5, -650),     // Banking In (Still nothing visible)

    // STRAIGHT APPROACH TO EYE
    new Vector3(0, 0, -750),        // Dead Center (Eye fades in here)
    new Vector3(0, 0, -850)         // EYE FOCUS
];
