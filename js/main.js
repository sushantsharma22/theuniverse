/* ═══════════════════════════════════════════════════════════════════════════
   UNIVERSE - Performance-Optimized Cosmic Journey
   60 FPS minimum | Photorealistic | Zero Lag
   ═══════════════════════════════════════════════════════════════════════════ */

import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    STAR_COUNT: 35000,              // Optimized star count
    TEXTURE_MAX_SIZE: 2048,         // Max texture resolution
    PIXEL_RATIO_CAP: 1.5,           // Limit for retina displays
    FOG_DENSITY: 0.012,             // Exponential fog for depth
    CAMERA_FOV: 55,                 // Cinematic FOV
    CAMERA_NEAR: 0.1,
    CAMERA_FAR: 500,
    LERP_SPEED: 0.06,               // Camera smoothing
    TEXTURE_LOAD_DISTANCE: 3,       // Waypoints ahead to preload
    TEXTURE_UNLOAD_DISTANCE: 5      // Waypoints behind to unload
};

// All 11 NASA/Hubble photos with metadata
const PHOTOS = [
    { src: 'photos/52002778380_50e6f859aa_o.jpg', title: 'The Big Bang', time: 'T = 0', desc: '13.8 billion years ago, all of spacetime exploded from an infinitely dense singularity.', temp: '∞' },
    { src: 'photos/28098134687_621b8e892c_o.jpg', title: 'Cosmic Inflation', time: 'T = 10⁻³² seconds', desc: 'The universe expands faster than light, stretching quantum fluctuations across the cosmos.', temp: '10³²' },
    { src: 'photos/52717339847_02c257ca4a_o.jpg', title: 'First Light', time: 'T = 380,000 years', desc: 'Atoms form. The universe becomes transparent. Light escapes for the first time.', temp: '3000' },
    { src: 'photos/27990761686_2819382262_o.jpg', title: 'The Dark Ages', time: 'T = 200 million years', desc: 'Before the first stars, only darkness. Gravity slowly pulls matter together.', temp: '50' },
    { src: 'photos/28109219377_0f21f3e0fd_o.jpg', title: 'First Stars', time: 'T = 400 million years', desc: 'Massive blue giants ignite, ending the cosmic dark ages with brilliant light.', temp: '10⁵' },
    { src: 'photos/49576591521_1f37d717d0_o.jpg', title: 'Galaxies Form', time: 'T = 1 billion years', desc: 'Billions of stars orbit supermassive black holes, forming spiral galaxies.', temp: '10⁶' },
    { src: 'photos/52515250436_4618b5216e_k.jpg', title: 'Stellar Alchemy', time: 'T = 5 billion years', desc: 'Stars forge carbon, oxygen, iron. Supernovae scatter elements across space.', temp: '10⁸' },
    { src: 'photos/53231853596_906631a521_o.jpg', title: 'Our Solar System', time: 'T = 9.2 billion years', desc: 'From a spinning disk of gas and dust, our Sun and planets take shape.', temp: '5778' },
    { src: 'photos/45738608235_952889a838_o.jpg', title: 'Planets Form', time: '4.6 billion years ago', desc: 'Saturn and other worlds emerge from the protoplanetary disk.', temp: '1500' },
    { src: 'photos/52001270447_027d7a8692_o.jpg', title: 'Cosmic Nurseries', time: 'Present Day', desc: 'Pillars of Creation - where new stars are born from cosmic dust.', temp: '288' },
    { src: 'photos/52675793824_c407411765_o.png', title: 'The Far Future', time: '10¹⁰⁰ years', desc: 'Black holes evaporate. The universe fades to silence. Heat Death.', temp: '0' }
];

// 3D Camera path waypoints (X, Y, Z movement)
const CAMERA_WAYPOINTS = [
    new THREE.Vector3(0, 0, 50),          // Big Bang: center start
    new THREE.Vector3(-15, 8, 38),        // Inflation: swoop left-up
    new THREE.Vector3(12, -5, 26),        // First Light: right-down
    new THREE.Vector3(-8, 12, 14),        // Dark Ages: left-up
    new THREE.Vector3(16, -10, 2),        // First Stars: dive right-down
    new THREE.Vector3(-12, 6, -10),       // Galaxies: left-up-forward
    new THREE.Vector3(10, -4, -22),       // Stellar Alchemy: right-down
    new THREE.Vector3(0, 8, -34),         // Solar System: rise center
    new THREE.Vector3(-14, -6, -46),      // Planets: left-down
    new THREE.Vector3(8, 10, -58),        // Cosmic Nurseries: right-up
    new THREE.Vector3(0, 0, -70)          // Heat Death: center end
];

// Photo positions (offset from camera path for parallax)
const PHOTO_POSITIONS = [
    new THREE.Vector3(0, 0, 42),
    new THREE.Vector3(-18, 10, 30),
    new THREE.Vector3(16, -8, 18),
    new THREE.Vector3(-12, 14, 6),
    new THREE.Vector3(20, -12, -6),
    new THREE.Vector3(-16, 8, -18),
    new THREE.Vector3(14, -6, -30),
    new THREE.Vector3(0, 10, -42),
    new THREE.Vector3(-18, -8, -54),
    new THREE.Vector3(12, 12, -66),
    new THREE.Vector3(0, 0, -78)
];

// ═══════════════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════════════

let scene, camera, renderer;
let starField;
let photoMeshes = [];
let cameraPath;
let scrollProgress = 0;
let targetScrollProgress = 0;
let currentWaypoint = 0;
let textureLoadStatus = new Array(PHOTOS.length).fill(false);
let isScrolling = false;
let scrollTimeout;

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const loadingPhase = document.getElementById('loading-phase');

// ═══════════════════════════════════════════════════════════════════════════
// TEXTURE LOADER WITH OPTIMIZATION
// ═══════════════════════════════════════════════════════════════════════════

const textureLoader = new THREE.TextureLoader();

function loadOptimizedTexture(url) {
    return new Promise((resolve, reject) => {
        textureLoader.load(
            url,
            (texture) => {
                // Apply performance optimizations
                texture.minFilter = THREE.LinearMipmapLinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.generateMipmaps = true;
                texture.colorSpace = THREE.SRGBColorSpace;

                // Anisotropic filtering applied after renderer exists
                if (renderer) {
                    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
                }

                resolve(texture);
            },
            undefined,
            reject
        );
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD (Optimized InstancedMesh)
// ═══════════════════════════════════════════════════════════════════════════

function createStarField() {
    // Low-poly sphere for each star - single draw call
    const starGeometry = new THREE.SphereGeometry(0.03, 4, 4);
    const starMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
    });

    starField = new THREE.InstancedMesh(starGeometry, starMaterial, CONFIG.STAR_COUNT);
    starField.frustumCulled = true;

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
        // Distribute stars in a large volume around camera path
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 150;
        const z = (Math.random() - 0.5) * 300 - 20;

        // Random size variation
        const scale = 0.5 + Math.random() * 1.5;
        matrix.makeScale(scale, scale, scale);
        matrix.setPosition(x, y, z);
        starField.setMatrixAt(i, matrix);

        // Subtle color variation (white to blue-white)
        const colorVariation = 0.9 + Math.random() * 0.1;
        color.setRGB(colorVariation, colorVariation, 1);
        starField.setColorAt(i, color);
    }

    starField.instanceMatrix.needsUpdate = true;
    if (starField.instanceColor) starField.instanceColor.needsUpdate = true;

    scene.add(starField);
}

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO MESHES (Optimized with MeshBasicMaterial)
// ═══════════════════════════════════════════════════════════════════════════

function createPhotoPlaceholders() {
    // Create placeholder meshes for all photos
    // Textures will be loaded progressively

    for (let i = 0; i < PHOTOS.length; i++) {
        const geometry = new THREE.PlaneGeometry(16, 10);  // 16:10 aspect ratio
        const material = new THREE.MeshBasicMaterial({
            color: 0x111111,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(PHOTO_POSITIONS[i]);
        mesh.userData = { index: i, loaded: false };

        // Face toward camera path
        const lookTarget = CAMERA_WAYPOINTS[i];
        mesh.lookAt(lookTarget);

        scene.add(mesh);
        photoMeshes.push(mesh);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESSIVE TEXTURE LOADING/UNLOADING
// ═══════════════════════════════════════════════════════════════════════════

async function updateTextureLoading() {
    const current = Math.floor(currentWaypoint);

    for (let i = 0; i < PHOTOS.length; i++) {
        const distance = Math.abs(current - i);
        const mesh = photoMeshes[i];

        // Load texture if within range and not loaded
        if (distance <= CONFIG.TEXTURE_LOAD_DISTANCE && !textureLoadStatus[i]) {
            textureLoadStatus[i] = true;  // Mark as loading

            try {
                const texture = await loadOptimizedTexture(PHOTOS[i].src);

                // Update mesh with loaded texture
                mesh.material.map = texture;
                mesh.material.color.setHex(0xffffff);
                mesh.material.needsUpdate = true;
                mesh.userData.loaded = true;

                // Adjust geometry to match texture aspect ratio
                if (texture.image) {
                    const aspect = texture.image.width / texture.image.height;
                    mesh.geometry.dispose();
                    mesh.geometry = new THREE.PlaneGeometry(10 * aspect, 10);
                }
            } catch (e) {
                console.warn(`Failed to load: ${PHOTOS[i].src}`);
                textureLoadStatus[i] = false;
            }
        }

        // Unload texture if too far away (memory management)
        if (distance > CONFIG.TEXTURE_UNLOAD_DISTANCE && mesh.userData.loaded) {
            if (mesh.material.map) {
                mesh.material.map.dispose();
                mesh.material.map = null;
                mesh.material.color.setHex(0x111111);
                mesh.material.needsUpdate = true;
            }
            mesh.userData.loaded = false;
            textureLoadStatus[i] = false;
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA PATH (CatmullRomCurve3)
// ═══════════════════════════════════════════════════════════════════════════

function createCameraPath() {
    cameraPath = new THREE.CatmullRomCurve3(CAMERA_WAYPOINTS, false, 'catmullrom', 0.5);
}

function getCameraPositionOnPath(t) {
    return cameraPath.getPointAt(Math.min(Math.max(t, 0), 1));
}

function getCameraLookTarget(t) {
    // Look slightly ahead on the path
    const lookAheadT = Math.min(t + 0.05, 1);
    return cameraPath.getPointAt(lookAheadT);
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL HANDLING (Throttled)
// ═══════════════════════════════════════════════════════════════════════════

let lastScrollTime = 0;

function handleScroll() {
    const now = Date.now();
    if (now - lastScrollTime < 16) return;  // Throttle to ~60fps
    lastScrollTime = now;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { isScrolling = false; }, 150);
}

// ═══════════════════════════════════════════════════════════════════════════
// UI UPDATES
// ═══════════════════════════════════════════════════════════════════════════

function updateUI() {
    const waypoint = Math.min(Math.floor(currentWaypoint), PHOTOS.length - 1);

    // Timeline dots
    document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i <= waypoint);
    });

    // Temperature
    const tempEl = document.getElementById('temp-value');
    if (tempEl && PHOTOS[waypoint]) {
        tempEl.textContent = PHOTOS[waypoint].temp;
    }

    // Section activation
    document.querySelectorAll('section').forEach((section, i) => {
        const dist = Math.abs(currentWaypoint - i);
        section.classList.toggle('active', dist < 0.6);
    });

    // End screen
    const endScreen = document.getElementById('end-screen');
    if (endScreen) {
        endScreen.classList.toggle('visible', scrollProgress > 0.95);
    }
}

function updateProgress(percent, phase) {
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (loadingPhase && phase) loadingPhase.textContent = phase;
}

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

async function init() {
    updateProgress(5, 'Initializing renderer...');

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, CONFIG.FOG_DENSITY);

    // Camera
    camera = new THREE.PerspectiveCamera(
        CONFIG.CAMERA_FOV,
        window.innerWidth / window.innerHeight,
        CONFIG.CAMERA_NEAR,
        CONFIG.CAMERA_FAR
    );

    // Renderer (optimized)
    const canvas = document.getElementById('universe-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, CONFIG.PIXEL_RATIO_CAP));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    updateProgress(15, 'Creating star field...');

    // Create starfield
    createStarField();

    updateProgress(30, 'Setting up camera path...');

    // Camera path
    createCameraPath();
    camera.position.copy(getCameraPositionOnPath(0));

    updateProgress(40, 'Creating photo placeholders...');

    // Photo placeholders
    createPhotoPlaceholders();

    updateProgress(50, 'Loading initial photos...');

    // Preload first 3 textures
    for (let i = 0; i < 3; i++) {
        try {
            const texture = await loadOptimizedTexture(PHOTOS[i].src);
            const mesh = photoMeshes[i];
            mesh.material.map = texture;
            mesh.material.color.setHex(0xffffff);
            mesh.material.needsUpdate = true;
            mesh.userData.loaded = true;
            textureLoadStatus[i] = true;

            if (texture.image) {
                const aspect = texture.image.width / texture.image.height;
                mesh.geometry.dispose();
                mesh.geometry = new THREE.PlaneGeometry(10 * aspect, 10);
            }

            updateProgress(50 + (i + 1) * 15, `Loaded ${PHOTOS[i].title}...`);
        } catch (e) {
            console.warn(`Failed to preload: ${PHOTOS[i].src}`);
        }
    }

    updateProgress(95, 'Final setup...');

    // Setup scroll handling
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Setup timeline
    setupTimeline();

    // Setup restart button
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hide loading screen and start animation
    updateProgress(100, 'Ready');
    setTimeout(() => {
        if (loadingScreen) loadingScreen.classList.add('hidden');
        animate();
    }, 300);
}

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE SETUP
// ═══════════════════════════════════════════════════════════════════════════

function setupTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    timeline.innerHTML = '';

    for (let i = 0; i < PHOTOS.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.title = PHOTOS[i].title;

        dot.addEventListener('click', () => {
            const targetScroll = (i / (PHOTOS.length - 1)) *
                (document.documentElement.scrollHeight - window.innerHeight);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        });

        timeline.appendChild(dot);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// RESIZE HANDLER
// ═══════════════════════════════════════════════════════════════════════════

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION LOOP (60 FPS Optimized)
// ═══════════════════════════════════════════════════════════════════════════

let frameCount = 0;
let lastFPSTime = Date.now();

function animate() {
    requestAnimationFrame(animate);

    // FPS monitoring (development only - remove in production)
    frameCount++;
    const now = Date.now();
    if (now - lastFPSTime >= 1000) {
        // console.log(`FPS: ${frameCount}`);
        frameCount = 0;
        lastFPSTime = now;
    }

    // Smooth scroll interpolation (lerp)
    scrollProgress += (targetScrollProgress - scrollProgress) * CONFIG.LERP_SPEED;
    currentWaypoint = scrollProgress * (PHOTOS.length - 1);

    // Camera movement along path
    const targetPos = getCameraPositionOnPath(scrollProgress);
    camera.position.lerp(targetPos, CONFIG.LERP_SPEED);

    // Camera look direction
    const lookTarget = getCameraLookTarget(scrollProgress);
    camera.lookAt(lookTarget);

    // Update photo opacities based on distance
    photoMeshes.forEach((mesh, i) => {
        const dist = Math.abs(currentWaypoint - i);
        const targetOpacity = dist < 2 ? Math.max(0, 1 - dist * 0.5) : 0;
        mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.1;
    });

    // Progressive texture loading (only when scrolling)
    if (isScrolling) {
        updateTextureLoading();
    }

    // Update UI
    updateUI();

    // Render
    renderer.render(scene, camera);
}

// ═══════════════════════════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════════════════════════

init();
