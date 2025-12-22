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
        position: new Vector3(120, -80, -950),  // Emerges from SHARP RIGHT + DOWN
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
        position: new Vector3(-120, 100, -1550), // Emerges from SHARP LEFT + UP
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
        position: new Vector3(0, -150, -2150),  // Emerges from DEEP DIVE DOWN
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
        position: new Vector3(100, 80, -2750), // Emerges from SHARP RIGHT + UP
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
        position: new Vector3(-100, -80, -3350), // Emerges from SHARP LEFT + DOWN
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
        position: new Vector3(80, 100, -3950),  // Emerges from SHARP RIGHT + UP
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
        position: new Vector3(-80, -120, -4550), // Emerges from SHARP LEFT + DOWN
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
        position: new Vector3(100, 80, -5150), // Emerges from SHARP RIGHT + UP
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
// CAMERA WAYPOINTS - 12-Stage SHARP TURN Choreography
// Each landmark EMERGES from the direction of the sharp turn
// ═══════════════════════════════════════════════════════════════════════════
export const WAYPOINTS: Vector3[] = [
    // 1. START - Centered drift
    new Vector3(0, 0, 100),
    new Vector3(0, 0, -100),
    new Vector3(0, 0, -350),        // BIG BANG (centered)

    // 2. SHARP RIGHT + DOWN → Carbon Nebula emerges from x:120, y:-80
    new Vector3(30, -20, -500),
    new Vector3(80, -50, -700),     // Banking RIGHT + DIVING
    new Vector3(120, -80, -950),    // CARBON NEBULA REVEAL

    // 3. SHARP LEFT + UP → Starbirth emerges from x:-120, y:100
    new Vector3(60, -20, -1100),
    new Vector3(-40, 40, -1300),    // Banking LEFT + RISING
    new Vector3(-120, 100, -1550),  // STARBIRTH REVEAL

    // 4. DEEP DIVE DOWN → Pillars emerges from y:-150
    new Vector3(-60, 40, -1700),
    new Vector3(0, -50, -1900),     // DIVING
    new Vector3(0, -150, -2150),    // PILLARS REVEAL (Deep)

    // 5. SHARP RIGHT + UP → Saturn emerges from x:100, y:80
    new Vector3(0, -100, -2350),
    new Vector3(50, -20, -2550),    // RISING + RIGHT
    new Vector3(100, 80, -2750),    // SATURN REVEAL

    // 6. SHARP LEFT + DOWN → Earth emerges from x:-100, y:-80
    new Vector3(50, 40, -2900),
    new Vector3(-30, -20, -3100),   // LEFT + DIVING
    new Vector3(-100, -80, -3350),  // EARTH REVEAL

    // 7. SHARP RIGHT + UP → Eye of God emerges from x:80, y:100
    new Vector3(-50, -30, -3550),
    new Vector3(20, 40, -3750),     // RIGHT + RISING
    new Vector3(80, 100, -3950),    // EYE OF GOD REVEAL

    // 8. SHARP LEFT + DOWN → Butterfly emerges from x:-80, y:-120
    new Vector3(40, 50, -4150),
    new Vector3(-30, -40, -4350),   // LEFT + DIVING
    new Vector3(-80, -120, -4550),  // BUTTERFLY REVEAL

    // 9. SHARP RIGHT + UP → Sombrero emerges from x:100, y:80
    new Vector3(-40, -60, -4750),
    new Vector3(30, 20, -4950),     // RIGHT + RISING
    new Vector3(100, 80, -5150),    // SOMBRERO REVEAL

    // 10. CENTER → Black Hole (centered, ominous)
    new Vector3(60, 50, -5350),
    new Vector3(20, 20, -5550),     // Centering
    new Vector3(0, 0, -5750),       // BLACK HOLE REVEAL

    // 11. CENTER → Quasar (straight approach)
    new Vector3(0, 0, -5950),
    new Vector3(0, 0, -6150),
    new Vector3(0, 0, -6350),       // QUASAR REVEAL

    // 12. CENTER → Wormhole (final approach)
    new Vector3(0, 0, -6550),
    new Vector3(0, 0, -6750),
    new Vector3(0, 0, -6950),       // WORMHOLE REVEAL

    // 13. INTO THE VOID → The End (with flash)
    new Vector3(0, 0, -7050),
    new Vector3(0, 0, -7150),
    new Vector3(0, 0, -7200)        // UNIVERSE END
];
