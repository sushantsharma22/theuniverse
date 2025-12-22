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
        position: new Vector3(0, 0, -600), // Pushed WAY back for "3-4 scrolls nothing"
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
        position: new Vector3(0, 0, -1400), // Deep separation
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
        position: new Vector3(0, -100, -2200), // Abyss
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

// Camera path waypoints - SCRIPTED CINEMA
export const WAYPOINTS: Vector3[] = [
    // 1. "START UNIVERSE FOR 3-4 SCROLLS NOTHING" 
    // Just traveling through stars
    new Vector3(0, 0, 100),         // START
    new Vector3(0, 0, -100),        // Straight...
    new Vector3(-20, 5, -300),      // Slight drift left...

    // 2. "5 SCROLL IS SHARP RIGHT"
    new Vector3(60, -2, -450),      // SHARP RIGHT TURN
    new Vector3(40, 0, -500),       // Banking...

    // 3. "6TH SCROLL WE SEE DISTANT CREATION IN MIDDLE"
    // "GO STRAIGHT AND IT APPEAR"
    new Vector3(0, 0, -550),        // CENTERED & STRAIGHT (Aligning for -600)
    new Vector3(0, 0, -600),        // PILLARS FOCUS

    // 4. "THROUGH WE GO 2 SCROLLS STRAIGHTS"
    new Vector3(0, 0, -800),        // Flying straight through...

    // 5. "THEN ON 3 SCROLL SHARP LEFT"
    new Vector3(-60, 5, -950),      // SHARP LEFT TURN
    new Vector3(-40, -5, -1100),    // Banking...

    // 6. "THEN STRAIGHT 1 SCROLL... 2ND SCROLL WE SEE EYE IN MIDDLE"
    new Vector3(0, 0, -1250),       // CENTERED & STRAIGHT (Aligning for -1400)
    new Vector3(0, 0, -1400),       // EYE FOCUS

    // 7. "THROUGH WE GO 2 SCROLLS STRAIGHT"
    new Vector3(0, 0, -1600),       // Flying straight through...

    // 8. "THEN 3 BOTTOM DIVE"
    new Vector3(0, -20, -1700),     // Start Dive
    new Vector3(0, -100, -1900),    // DEEP DIVE

    // 9. "4 LITTLE STRAIGHT... 5 WE START SEEING NEBULA"
    new Vector3(0, -100, -2050),    // Straight leveling at bottom...
    new Vector3(0, -100, -2200)     // BUTTERFLY FOCUS
];
