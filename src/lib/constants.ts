import { Vector3 } from 'three';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const CONFIG = {
    STAR_COUNT: 200000,
    PIXEL_RATIO: 1.5,
    TARGET_FPS: 60,
    LERP_SPEED: 0.035,
    COLOR_LERP_SPEED: 0.02,

    // Camera
    BASE_FOV: 60,
    NEAR: 0.1,
    FAR: 8000,
};

// Camera path waypoints - Weaving through space to the Pillars
export const WAYPOINTS: Vector3[] = [
    new Vector3(0, 0, 0),          // START
    new Vector3(-30, 20, -80),     // High Left - exciting start
    new Vector3(40, -15, -160),    // Low Right - swoop down
    new Vector3(-20, 10, -250),    // Mid Left - approach
    new Vector3(0, 30, -350),      // TARGET: INSIDE PILLARS (Matches Pillars Position)
    new Vector3(30, -30, -450),    // Dive out to Right
    new Vector3(0, 0, -600),       // Center - Deep Space
];
