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


const BASE_PATH = '';

export const LANDMARKS: LandmarkData[] = [
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 1: THE BEGINNING
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'big_bang',
        position: new Vector3(0, 0, -350),
        texture: `${BASE_PATH}/textures/big bang.jpg`,
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
        texture: `${BASE_PATH}/textures/carbnebula.jpg`,
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
        texture: `${BASE_PATH}/textures/starbirth.jpg`,
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
        position: new Vector3(0, 0, -2150),
        texture: `${BASE_PATH}/textures/pillars_of_creation.jpg`,
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
        texture: `${BASE_PATH}/textures/saturn.jpg`,
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
        texture: `${BASE_PATH}/textures/earth.jpg`,
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
        texture: `${BASE_PATH}/textures/eye_of_god.png`,
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
        position: new Vector3(0, 0, -4550),
        texture: `${BASE_PATH}/textures/Butterfly_nebula.jpg`,
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
        texture: `${BASE_PATH}/textures/The Sombrero Galaxy.jpg`,
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
        texture: `${BASE_PATH}/textures/blackhole.jpg`,
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
    // STAGE 11: COSMIC LIGHTHOUSE
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'quasar',
        position: new Vector3(0, 0, -6350),
        texture: `${BASE_PATH}/textures/quasar.jpg`,
        scale: 420,
        scaleX: 1.78,
        title: 'Quasar',
        type: 'Active Galactic Nucleus',
        distance: '2.4 billion light-years',
        constellation: 'Ursa Major',
        description: 'Quasars are the brightest objects in the universe, powered by supermassive black holes consuming matter at incredible rates. They outshine entire galaxies, serving as cosmic lighthouses visible across billions of light-years.',
        distanceTrigger: 100,
        visibilityRange: 700
    },
    // ═══════════════════════════════════════════════════════════════════════════
    // STAGE 12: THE BEYOND - FINAL STAGE
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'wormhole',
        position: new Vector3(0, 0, -6950),
        texture: `${BASE_PATH}/textures/wormhole.png`,
        scale: 500,
        scaleX: 1.78,
        title: 'Wormhole',
        type: 'Einstein-Rosen Bridge',
        distance: 'Beyond Space-Time',
        constellation: 'Unknown',
        description: 'A wormhole, or Einstein-Rosen bridge, is a theoretical passage through space-time. It represents the ultimate frontier—a gateway to other universes, distant galaxies, or perhaps the next cycle of cosmic creation.',
        distanceTrigger: 100,
        visibilityRange: 700
    }
];


// Position where the universe ends and "The End" appears
export const UNIVERSE_END_POSITION = -7200;

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA WAYPOINTS - Sharp turns in STARFIELD, centered at each landmark
// Pattern: Leave landmark → Sharp turn in void → Gradually center → Next landmark
// ═══════════════════════════════════════════════════════════════════════════
export const WAYPOINTS: Vector3[] = [
    // 1. START - Centered
    new Vector3(0, 0, 100),
    new Vector3(0, 0, -100),
    new Vector3(0, 0, -350),        // BIG BANG (centered)


    // BIG BANG - straight approach
    new Vector3(0, 0, -350),        // BIG BANG - pass through center
    new Vector3(0, 0, -450),        // Buffer straight (100u)

    // UPWARD TURN (User Request: "going upwards camera")
    new Vector3(0, 40, -550),       // Start rising
    new Vector3(0, 60, -675),       // Peak height (Smoother arc)
    new Vector3(0, 20, -800),       // Descent

    // STRAIGHT to Carbon Nebula - EXTENDED RUNWAY
    new Vector3(0, 0, -850),        // *** TOUCHDOWN TO ZERO EARLY ***
    new Vector3(0, 0, -900),        // Buffer BEFORE (-950)
    new Vector3(0, 0, -950),        // CARBON NEBULA - pass through center
    new Vector3(0, 0, -1000),       // Buffer AFTER (Force Z-axis tangent)

    // Turn
    new Vector3(25, -20, -1100),    // Turn AFTER passing
    new Vector3(45, -35, -1150),    // Peak
    new Vector3(25, -20, -1250),    // Coming back

    // STRAIGHT to Starbirth
    new Vector3(0, 0, -1400),       // Approaching straight
    new Vector3(0, 0, -1500),       // Buffer BEFORE
    new Vector3(0, 0, -1550),       // STARBIRTH - pass through center
    new Vector3(0, 0, -1600),       // Buffer AFTER

    // Turn
    new Vector3(-25, 25, -1700),    // Turn AFTER passing
    new Vector3(-45, 40, -1750),    // Peak
    new Vector3(-25, 20, -1850),    // Coming back

    // STRAIGHT to Pillars
    new Vector3(0, 0, -2000),       // Approaching straight
    new Vector3(0, 0, -2100),       // Buffer BEFORE
    new Vector3(0, 0, -2150),       // PILLARS - pass through center
    new Vector3(0, 0, -2200),       // Buffer AFTER

    // Turn
    new Vector3(0, -25, -2300),     // Dive AFTER passing
    new Vector3(0, -40, -2350),     // Peak
    new Vector3(0, -20, -2450),     // Coming back

    // STRAIGHT to Saturn
    new Vector3(0, 0, -2600),       // Approaching straight
    new Vector3(0, 0, -2700),       // Buffer BEFORE
    new Vector3(0, 0, -2750),       // SATURN - pass through center
    new Vector3(0, 0, -2800),       // Buffer AFTER

    // Turn
    new Vector3(30, 25, -2900),     // Turn AFTER passing
    new Vector3(50, 40, -2950),     // Peak
    new Vector3(25, 20, -3050),     // Coming back

    // STRAIGHT to Earth
    new Vector3(0, 0, -3200),       // Approaching straight
    new Vector3(0, 0, -3300),       // Buffer BEFORE
    new Vector3(0, 0, -3350),       // EARTH - pass through center
    new Vector3(0, 0, -3400),       // Buffer AFTER

    // Turn
    new Vector3(-25, -20, -3500),   // Turn AFTER passing
    new Vector3(-40, -35, -3550),   // Peak
    new Vector3(-20, -15, -3650),   // Coming back

    // STRAIGHT to Eye of God
    new Vector3(0, 0, -3800),       // Approaching straight
    new Vector3(0, 0, -3900),       // Buffer BEFORE
    new Vector3(0, 0, -3950),       // EYE OF GOD - pass through center
    new Vector3(0, 0, -4000),       // Buffer AFTER

    // Turn
    new Vector3(25, 25, -4100),     // Turn AFTER passing
    new Vector3(40, 40, -4150),     // Peak
    new Vector3(20, 20, -4250),     // Coming back

    // STRAIGHT to Butterfly
    new Vector3(0, 0, -4400),       // Approaching straight
    new Vector3(0, 0, -4500),       // Buffer BEFORE
    new Vector3(0, 0, -4550),       // BUTTERFLY - pass through center
    new Vector3(0, 0, -4600),       // Buffer AFTER

    // FIXED: STRAIGHT LINE between Butterfly and Sombrero (User Request)
    new Vector3(0, 0, -4700),       // VOID: Straight
    new Vector3(0, 0, -4850),       // VOID: Straight
    new Vector3(0, 0, -5000),       // VOID: Straight

    // STRAIGHT to Sombrero
    new Vector3(0, 0, -5100),       // Buffer BEFORE
    new Vector3(0, 0, -5150),       // SOMBRERO - pass through center
    new Vector3(0, 0, -5200),       // Buffer AFTER

    // Turn between Sombrero and Black Hole (Requested)
    new Vector3(25, 20, -5300),     // Turn AFTER passing
    new Vector3(40, 35, -5350),     // Peak
    new Vector3(20, 15, -5450),     // Coming back

    // STRAIGHT to Black Hole
    new Vector3(0, 0, -5600),       // Approaching
    new Vector3(0, 0, -5700),       // Buffer BEFORE
    new Vector3(0, 0, -5750),       // BLACK HOLE - pass through center
    new Vector3(0, 0, -5800),       // Buffer AFTER

    // STRAIGHT from here - Quasar, Wormhole, End
    new Vector3(0, 0, -5950),
    new Vector3(0, 0, -6150),
    new Vector3(0, 0, -6350),       // QUASAR - pass through center

    new Vector3(0, 0, -6550),
    new Vector3(0, 0, -6750),
    new Vector3(0, 0, -6950),       // WORMHOLE - pass through center

    // INTO THE VOID - Flash + End
    new Vector3(0, 0, -7050),
    new Vector3(0, 0, -7150),
    new Vector3(0, 0, -7200)        // UNIVERSE END
];
