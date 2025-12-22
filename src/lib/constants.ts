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
        position: new Vector3(60, -30, -950),  // Appears from RIGHT+DOWN
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
        position: new Vector3(-60, 40, -1550), // Appears from LEFT+UP
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
        position: new Vector3(50, -60, -2750), // Appears from RIGHT (after dive)
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
        position: new Vector3(-50, 20, -3350), // Appears from LEFT+UP
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
        position: new Vector3(40, 30, -3950),  // Appears from RIGHT+UP
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
        position: new Vector3(40, -40, -5150), // Appears from RIGHT (after rise)
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
    // STAGE 11: COSMIC LIGHTHOUSE
    // ═══════════════════════════════════════════════════════════════════════════
    {
        id: 'quasar',
        position: new Vector3(0, 0, -6350),
        texture: '/textures/quasar.jpg',
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
        texture: '/textures/wormhole.png',
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
// CAMERA WAYPOINTS - 12-Stage Epic Journey with DIRECTIONAL Choreography
// Camera travels TOWARDS where landmarks appear, then centers on them
// ═══════════════════════════════════════════════════════════════════════════
export const WAYPOINTS: Vector3[] = [
    // 1. START - Gentle drift into the cosmos
    new Vector3(0, 0, 100),
    new Vector3(0, 0, -50),
    new Vector3(0, 0, -200),
    new Vector3(0, 0, -350),        // BIG BANG REVEAL (centered)

    // 2. TO CARBON NEBULA - Travel RIGHT + DOWN (landmark at x:60, y:-30)
    new Vector3(20, -10, -500),
    new Vector3(50, -25, -650),     // DIVING RIGHT + DOWN
    new Vector3(60, -30, -800),     // Near landmark position
    new Vector3(60, -30, -950),     // CARBON NEBULA REVEAL

    // 3. TO STARBIRTH - Travel LEFT + UP (landmark at x:-60, y:40)
    new Vector3(30, 0, -1050),
    new Vector3(-20, 20, -1200),    // BANKING LEFT + RISING
    new Vector3(-50, 35, -1350),    // Climbing higher
    new Vector3(-60, 40, -1450),    // Near landmark
    new Vector3(-60, 40, -1550),    // STARBIRTH REVEAL

    // 4. TO PILLARS - Travel CENTER + DEEP DOWN (landmark at x:0, y:-80)
    new Vector3(-30, 20, -1650),
    new Vector3(0, -20, -1800),     // DIVING DOWN
    new Vector3(0, -60, -1950),     // DEEPER
    new Vector3(0, -80, -2080),     // Approaching depth
    new Vector3(0, -80, -2150),     // PILLARS REVEAL (Deep)

    // 5. TO SATURN - Travel RIGHT + UP slightly (landmark at x:50, y:-60)
    new Vector3(15, -75, -2300),
    new Vector3(35, -70, -2450),    // RISING + BANKING RIGHT
    new Vector3(50, -65, -2600),    // Nearing
    new Vector3(50, -60, -2750),    // SATURN REVEAL

    // 6. TO EARTH - Travel LEFT + UP (landmark at x:-50, y:20)
    new Vector3(25, -40, -2850),
    new Vector3(-10, -10, -3000),   // SHARP LEFT + RISING
    new Vector3(-40, 10, -3150),    // Continuing climb
    new Vector3(-50, 20, -3350),    // EARTH REVEAL

    // 7. TO EYE OF GOD - Travel RIGHT + UP (landmark at x:40, y:30)
    new Vector3(-25, 20, -3500),
    new Vector3(10, 25, -3650),     // BANKING RIGHT
    new Vector3(30, 28, -3800),     // Rising right
    new Vector3(40, 30, -3950),     // EYE OF GOD REVEAL

    // 8. TO BUTTERFLY - Travel LEFT + DOWN (landmark at x:0, y:-60)
    new Vector3(20, 15, -4100),
    new Vector3(-10, -10, -4250),   // LEFT + DIVING
    new Vector3(-5, -40, -4400),    // Deeper dive
    new Vector3(0, -55, -4480),     // Approaching
    new Vector3(0, -60, -4550),     // BUTTERFLY REVEAL (Low)

    // 9. TO SOMBRERO GALAXY - Travel RIGHT + RISE (landmark at x:40, y:-40)
    new Vector3(10, -55, -4650),
    new Vector3(25, -50, -4800),    // RISING + RIGHT
    new Vector3(35, -45, -4950),    // Continuing
    new Vector3(40, -40, -5150),    // SOMBRERO REVEAL

    // 10. TO BLACK HOLE - Travel CENTER (landmark at x:0, y:0)
    new Vector3(25, -30, -5300),
    new Vector3(10, -15, -5450),    // Centering
    new Vector3(0, -5, -5600),      // Almost centered
    new Vector3(0, 0, -5750),       // BLACK HOLE REVEAL

    // 11. TO QUASAR - Travel CENTER (landmark at x:0, y:0)
    new Vector3(0, 0, -5900),
    new Vector3(0, 0, -6050),       // Straight
    new Vector3(0, 0, -6200),
    new Vector3(0, 0, -6350),       // QUASAR REVEAL

    // 12. TO WORMHOLE - Travel CENTER (landmark at x:0, y:0)
    new Vector3(0, 0, -6500),
    new Vector3(0, 0, -6700),       // Final approach
    new Vector3(0, 0, -6850),
    new Vector3(0, 0, -6950),       // WORMHOLE REVEAL

    // 13. INTO THE VOID - The End
    new Vector3(0, 0, -7050),
    new Vector3(0, 0, -7150),
    new Vector3(0, 0, -7200)        // UNIVERSE END - Pitch Black
];
