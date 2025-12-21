// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE JOURNEY - CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

import { Vector3 } from 'three';
import { PhotoData } from './types';

// NASA Photos with theme data
export const PHOTOS: PhotoData[] = [
    {
        src: '/photos/52002778380_50e6f859aa_o.jpg',
        title: 'The Big Bang',
        time: 'T = 0',
        desc: '13.8 billion years ago, spacetime exploded from infinite density.',
        temp: '∞',
        themeColor: '#1a0800',
        fogDensity: 0.008,
        starTint: '#ffccaa',
        exposure: 1.5
    },
    {
        src: '/photos/28098134687_621b8e892c_o.jpg',
        title: 'Cosmic Inflation',
        time: '10⁻³² seconds',
        desc: 'The universe expands faster than light.',
        temp: '10³²',
        themeColor: '#000a1a',
        fogDensity: 0.006,
        starTint: '#aaccff',
        exposure: 1.2
    },
    {
        src: '/photos/52717339847_02c257ca4a_o.jpg',
        title: 'First Light',
        time: '380,000 years',
        desc: 'Atoms form. Light escapes for the first time.',
        temp: '3000',
        themeColor: '#120818',
        fogDensity: 0.005,
        starTint: '#ddccff',
        exposure: 1.3
    },
    {
        src: '/photos/27990761686_2819382262_o.jpg',
        title: 'The Dark Ages',
        time: '200 million years',
        desc: 'Before stars, only darkness and gravity.',
        temp: '50',
        themeColor: '#000208',
        fogDensity: 0.002,
        starTint: '#556677',
        exposure: 0.7
    },
    {
        src: '/photos/28109219377_0f21f3e0fd_o.jpg',
        title: 'First Stars',
        time: '400 million years',
        desc: 'Blue giants ignite, ending the dark ages.',
        temp: '10⁵',
        themeColor: '#001020',
        fogDensity: 0.005,
        starTint: '#88ccff',
        exposure: 1.4
    },
    {
        src: '/photos/49576591521_1f37d717d0_o.jpg',
        title: 'Galaxies Form',
        time: '1 billion years',
        desc: 'Stars orbit black holes, forming spirals.',
        temp: '10⁶',
        themeColor: '#0d0800',
        fogDensity: 0.004,
        starTint: '#ffddaa',
        exposure: 1.3
    },
    {
        src: '/photos/52515250436_4618b5216e_k.jpg',
        title: 'Stellar Alchemy',
        time: '5 billion years',
        desc: 'Stars forge elements. Supernovae scatter them.',
        temp: '10⁸',
        themeColor: '#150500',
        fogDensity: 0.006,
        starTint: '#ffaaaa',
        exposure: 1.5
    },
    {
        src: '/photos/53231853596_906631a521_o.jpg',
        title: 'Our Solar System',
        time: '9.2 billion years',
        desc: 'Our Sun and planets take shape.',
        temp: '5778',
        themeColor: '#0f0a00',
        fogDensity: 0.003,
        starTint: '#ffffcc',
        exposure: 1.4
    },
    {
        src: '/photos/45738608235_952889a838_o.jpg',
        title: 'Planets Form',
        time: '4.6 billion years ago',
        desc: 'Saturn emerges from the disk.',
        temp: '1500',
        themeColor: '#080502',
        fogDensity: 0.003,
        starTint: '#eeddcc',
        exposure: 1.3
    },
    {
        src: '/photos/52001270447_027d7a8692_o.jpg',
        title: 'Cosmic Nurseries',
        time: 'Present Day',
        desc: 'Where new stars are born.',
        temp: '288',
        themeColor: '#000a0d',
        fogDensity: 0.005,
        starTint: '#aaffee',
        exposure: 1.4
    },
    {
        src: '/photos/52675793824_c407411765_o.png',
        title: 'Heat Death',
        time: '10¹⁰⁰ years',
        desc: 'The universe fades to silence.',
        temp: '0',
        themeColor: '#000002',
        fogDensity: 0.001,
        starTint: '#222233',
        exposure: 0.5
    }
];

// Camera waypoints along the journey path
export const WAYPOINTS: Vector3[] = [
    new Vector3(0, 0, 100),      // START
    new Vector3(-8, 5, 70),      // Big Bang
    new Vector3(6, -4, 40),      // Inflation
    new Vector3(-5, 6, 10),      // First Light
    new Vector3(7, -5, -20),     // Dark Ages
    new Vector3(-6, 4, -50),     // First Stars
    new Vector3(5, -6, -80),     // Galaxies
    new Vector3(-4, 5, -110),    // Stellar Alchemy
    new Vector3(6, -4, -140),    // Solar System
    new Vector3(-5, 6, -170),    // Planets
    new Vector3(4, -5, -200),    // Cosmic Nurseries
    new Vector3(0, 0, -240)      // END - Heat Death
];

// Photo positions (slightly offset from camera path)
export const PHOTO_POSITIONS: Vector3[] = WAYPOINTS.slice(1).map((wp, i) =>
    new Vector3(wp.x * 0.8, wp.y * 0.8, wp.z)
);

// Performance config
export const CONFIG = {
    STAR_COUNT: 8000,        // Reduced for performance
    PIXEL_RATIO: 1.5,
    TARGET_FPS: 60,
    PHOTO_SCALE: 45,
    LERP_SPEED: 0.12,        // Much faster response (was 0.04)
    COLOR_LERP_SPEED: 0.08   // Faster color transitions
};
