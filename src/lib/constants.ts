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
    description: string;
    year: string;
    distanceTrigger: number; // Distance at which UI appears
}

export const LANDMARKS: LandmarkData[] = [
    {
        id: 'pillars',
        position: new Vector3(0, 0, -280),
        texture: '/textures/pillars_of_creation.png',
        scale: 150, // Base scale
        title: 'Pillars of Creation',
        description: 'Vast towers of interstellar gas and dust in the Eagle Nebula. These iconic structures are incubators for new stars, located approximately 6,500 light-years from Earth.',
        year: 'Discovery: 1995',
        distanceTrigger: 80
    }
];

// Camera path waypoints - smooth curve through space
export const WAYPOINTS: Vector3[] = [
    new Vector3(0, 0, 100),        // START
    new Vector3(-8, 5, 70),
    new Vector3(6, -4, 40),
    new Vector3(-5, 6, 10),
    new Vector3(7, -5, -20),
    new Vector3(-6, 4, -50),
    new Vector3(5, -6, -80),
    new Vector3(-4, 5, -110),
    new Vector3(6, -4, -140),
    new Vector3(-5, 6, -170),
    new Vector3(4, -5, -200),
    new Vector3(0, 0, -240)        // END
];
