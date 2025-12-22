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
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 1: THE BEGINNING
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'big_bang',
        position: new Vector3(0, 0, -350),
        texture: '/textures/big bang.jpg',
        scale: 200,
        title: 'The Big Bang',
        type: 'Cosmic Origin',
        distance: '13.8 billion years ago',
        constellation: 'Universe',
        description: 'The Big Bang was the explosive birth of the universe approximately 13.8 billion years ago. In an instant, all matter, energy, space, and time emerged from an infinitely dense singularity, setting the stage for everything that would follow.',
        distanceTrigger: 100,
        visibilityRange: 500
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 2: RAW MATERIALS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'carbon_nebula',
        position: new Vector3(0, 0, -950),
        texture: '/textures/carbnebula.jpg',
        scale: 250,
        title: 'Carbon Nebula',
        type: 'Molecular Cloud',
        distance: '7,500 light-years',
        constellation: 'Centaurus',
        description: 'Molecular clouds like this Carbon Nebula are the raw materials of the cosmos. Rich in carbon compounds and heavy elements forged in ancient stars, these clouds contain the building blocks for new stars, planets, and eventually life itself.',
        distanceTrigger: 100,
        visibilityRange: 600
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 3: STAR FORMATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'starbirth',
        position: new Vector3(0, 0, -1550),
        texture: '/textures/starbirth.jpg',
        scale: 280,
        title: 'Seagull Nebula',
        type: 'Star-Forming Region',
        distance: '3,650 light-years',
        constellation: 'Monoceros',
        description: 'The Seagull Nebula is an active stellar nursery where new stars are being born. Gravity pulls together gas and dust, igniting nuclear fusion and giving birth to brilliant new suns that will shine for billions of years.',
        distanceTrigger: 100,
        visibilityRange: 600
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 4: STELLAR NURSERY
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'pillars',
        position: new Vector3(0, -80, -2150),
        texture: '/textures/pillars_of_creation.jpg',
        scale: 300,
        title: 'Pillars of Creation',
        type: 'Emission Nebula',
        distance: '6,500 light-years',
        constellation: 'Serpens',
        description: 'The Pillars of Creation are vast trunks of interstellar gas and dust in the Eagle Nebula. They are active stellar nurseries where new stars are being born, simultaneously eroded by the intense ultraviolet light from nearby massive stars.',
        distanceTrigger: 100,
        visibilityRange: 600
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 5: PLANETARY SYSTEMS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'saturn',
        position: new Vector3(0, 0, -2750),
        texture: '/textures/saturn.jpg',
        scale: 180,
        title: 'Saturn',
        type: 'Gas Giant',
        distance: '1.2 billion km',
        constellation: 'Solar System',
        description: 'Saturn, the jewel of our solar system, represents the formation of planetary systems around newborn stars. Its magnificent rings, composed of ice and rock, demonstrate the complex dynamics that sculpt worlds over billions of years.',
        distanceTrigger: 80,
        visibilityRange: 500
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 6: LIFE-BEARING WORLD
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'earth',
        position: new Vector3(0, 0, -3350),
        texture: '/textures/earth.jpg',
        scale: 150,
        title: 'Earth',
        type: 'Terrestrial Planet',
        distance: '150 million km',
        constellation: 'Solar System',
        description: 'Earth, our pale blue dot, is the only known world harboring life. Born from cosmic dust, shaped by geology, and transformed by biology, it represents the pinnacle of cosmic evolution—matter becoming aware of itself.',
        distanceTrigger: 80,
        visibilityRange: 500
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 7: STAR DEATH (Planetary Nebula)
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'eye_of_god',
        position: new Vector3(0, 0, -3950),
        texture: '/textures/eye_of_god.png',
        scale: 350,
        title: 'Eye of God',
        type: 'Planetary Nebula',
        distance: '650 light-years',
        constellation: 'Aquarius',
        description: 'The Helix Nebula, often called the Eye of God, is the remnant of a dying star. As stars like our Sun exhaust their fuel, they shed their outer layers, creating these beautiful cosmic structures that seed the universe with heavy elements.',
        distanceTrigger: 100,
        visibilityRange: 600
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 8: TRANSFORMATION
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'butterfly',
        position: new Vector3(0, -60, -4550),
        texture: '/textures/Butterfly_nebula.jpg',
        scale: 380,
        title: 'Butterfly Nebula',
        type: 'Bipolar Nebula',
        distance: '3,392 light-years',
        constellation: 'Scorpius',
        description: 'The Butterfly Nebula represents cosmic transformation. Its central star, one of the hottest known at 250,000°C, drives the expansion of these delicate wings of gas, demonstrating the violent beauty of stellar death.',
        distanceTrigger: 100,
        visibilityRange: 600
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 9: GALACTIC STRUCTURE
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'sombrero',
        position: new Vector3(0, 0, -5150),
        texture: '/textures/The Sombrero Galaxy.jpg',
        scale: 500,
        scaleX: 1.8,
        title: 'Sombrero Galaxy',
        type: 'Spiral Galaxy',
        distance: '29 million light-years',
        constellation: 'Virgo',
        description: 'The Sombrero Galaxy contains hundreds of billions of stars organized into a majestic spiral structure. It represents the mature phase of galactic evolution, where countless stellar life cycles have played out over cosmic time.',
        distanceTrigger: 100,
        visibilityRange: 700
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 10: GRAVITATIONAL DEATH
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'black_hole',
        position: new Vector3(0, 0, -5750),
        texture: '/textures/blackhole.jpg',
        scale: 400,
        scaleX: 1.78,
        title: 'Black Hole M87',
        type: 'Supermassive Black Hole',
        distance: '55 million light-years',
        constellation: 'Virgo',
        description: 'This is the first direct image of a black hole, located in galaxy M87. With a mass 6.5 billion times our Sun, it represents the ultimate fate of massive stars—gravity so intense that not even light can escape.',
        distanceTrigger: 100,
        visibilityRange: 700
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 11: THE BEYOND
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'wormhole',
        position: new Vector3(0, 0, -6350),
        texture: '/textures/wormhole.png',
        scale: 450,
        title: 'Wormhole',
        type: 'Theoretical Construct',
        distance: 'Beyond Space-Time',
        constellation: 'Unknown',
        description: 'A wormhole, or Einstein-Rosen bridge, is a theoretical passage through space-time. It represents the ultimate frontier—a gateway to other universes, distant galaxies, or perhaps the next cycle of cosmic creation.',
        distanceTrigger: 100,
        visibilityRange: 700
    }
];

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA WAYPOINTS - 11-Stage Epic Journey with Dynamic Choreography
// ═══════════════════════════════════════════════════════════════════════════
export const WAYPOINTS: Vector3[] = [
    // 1. START - Gentle drift into the cosmos
    new Vector3(0, 0, 100),
    new Vector3(0, 0, -50),
    new Vector3(0, 0, -200),
    new Vector3(0, 0, -350),        // BIG BANG REVEAL

    // 2. TO CARBON NEBULA - Sharp RIGHT turn
    new Vector3(0, 0, -500),
    new Vector3(80, -10, -650),     // SHARP RIGHT
    new Vector3(60, 0, -800),
    new Vector3(0, 0, -950),        // CARBON NEBULA REVEAL

    // 3. TO STARBIRTH - Sharp LEFT turn + Rising
    new Vector3(0, 0, -1100),
    new Vector3(-80, 20, -1250),    // SHARP LEFT + UP
    new Vector3(-40, 10, -1400),
    new Vector3(0, 0, -1550),       // STARBIRTH REVEAL

    // 4. TO PILLARS - Deep DIVE downward
    new Vector3(0, 0, -1700),
    new Vector3(0, -40, -1850),     // START DIVE
    new Vector3(0, -80, -2000),     // DEEP DIVE
    new Vector3(0, -80, -2150),     // PILLARS REVEAL (Deep)

    // 5. TO SATURN - Rise UP + slight RIGHT
    new Vector3(0, -80, -2300),
    new Vector3(40, -40, -2450),    // RISING + RIGHT
    new Vector3(30, 0, -2600),
    new Vector3(0, 0, -2750),       // SATURN REVEAL

    // 6. TO EARTH - Banking LEFT approach
    new Vector3(0, 0, -2900),
    new Vector3(-60, 10, -3050),    // BANK LEFT
    new Vector3(-40, 0, -3200),
    new Vector3(0, 0, -3350),       // EARTH REVEAL

    // 7. TO EYE OF GOD - Straight centered approach
    new Vector3(0, 0, -3500),
    new Vector3(0, 0, -3650),
    new Vector3(0, 0, -3800),
    new Vector3(0, 0, -3950),       // EYE OF GOD REVEAL

    // 8. TO BUTTERFLY - Gentle LEFT sway + slight dive
    new Vector3(0, 0, -4100),
    new Vector3(-40, -20, -4250),   // LEFT SWAY + DIVE
    new Vector3(-20, -40, -4400),
    new Vector3(0, -60, -4550),     // BUTTERFLY REVEAL (Low)

    // 9. TO SOMBRERO GALAXY - Rise UP to center
    new Vector3(0, -60, -4700),
    new Vector3(0, -30, -4850),     // RISING
    new Vector3(0, 0, -5000),
    new Vector3(0, 0, -5150),       // SOMBRERO REVEAL

    // 10. TO BLACK HOLE - Ominous straight approach
    new Vector3(0, 0, -5300),
    new Vector3(0, 0, -5450),
    new Vector3(0, 0, -5600),
    new Vector3(0, 0, -5750),       // BLACK HOLE REVEAL

    // 11. TO WORMHOLE - Final centered dive into the unknown
    new Vector3(0, 0, -5900),
    new Vector3(0, 0, -6050),
    new Vector3(0, 0, -6200),
    new Vector3(0, 0, -6350)        // WORMHOLE REVEAL - Journey's End
];

