/* ═══════════════════════════════════════════════════════════════════════════
   THE UNIVERSE - Zero-Lag Cosmic Journey
   Aggressive Heat Optimization | Zoom/Blend Transitions | 60 FPS Cap
   ═══════════════════════════════════════════════════════════════════════════ */

import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════
// AGGRESSIVE OPTIMIZATION CONFIG
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    STAR_COUNT: 20000,              // Reduced for heat
    PIXEL_RATIO: 1.0,               // Capped at 1.0 for laptops
    TARGET_FPS: 60,
    FOG_DENSITY: 0.008,
    CAMERA_FOV: 55,
    CAMERA_NEAR: 0.1,
    CAMERA_FAR: 300,
    LERP_SPEED: 0.05,
    TEXTURE_LOAD_RANGE: 2,          // Only 2 ahead/behind
    PHOTO_SCALE: 18,                // Large enough to fill screen
    IDLE_TIMEOUT: 150               // Stop rendering after 150ms idle
};

// NASA Photos
const PHOTOS = [
    { src: 'photos/52002778380_50e6f859aa_o.jpg', title: 'The Big Bang', time: 'T = 0', desc: '13.8 billion years ago, spacetime exploded from infinite density.', temp: '∞' },
    { src: 'photos/28098134687_621b8e892c_o.jpg', title: 'Cosmic Inflation', time: '10⁻³² seconds', desc: 'The universe expands faster than light.', temp: '10³²' },
    { src: 'photos/52717339847_02c257ca4a_o.jpg', title: 'First Light', time: '380,000 years', desc: 'Atoms form. Light escapes for the first time.', temp: '3000' },
    { src: 'photos/27990761686_2819382262_o.jpg', title: 'The Dark Ages', time: '200 million years', desc: 'Before stars, only darkness and gravity.', temp: '50' },
    { src: 'photos/28109219377_0f21f3e0fd_o.jpg', title: 'First Stars', time: '400 million years', desc: 'Blue giants ignite, ending the dark ages.', temp: '10⁵' },
    { src: 'photos/49576591521_1f37d717d0_o.jpg', title: 'Galaxies Form', time: '1 billion years', desc: 'Stars orbit black holes, forming spirals.', temp: '10⁶' },
    { src: 'photos/52515250436_4618b5216e_k.jpg', title: 'Stellar Alchemy', time: '5 billion years', desc: 'Stars forge elements. Supernovae scatter them.', temp: '10⁸' },
    { src: 'photos/53231853596_906631a521_o.jpg', title: 'Our Solar System', time: '9.2 billion years', desc: 'Our Sun and planets take shape.', temp: '5778' },
    { src: 'photos/45738608235_952889a838_o.jpg', title: 'Planets Form', time: '4.6 billion years ago', desc: 'Saturn emerges from the disk.', temp: '1500' },
    { src: 'photos/52001270447_027d7a8692_o.jpg', title: 'Cosmic Nurseries', time: 'Present Day', desc: 'Where new stars are born.', temp: '288' },
    { src: 'photos/52675793824_c407411765_o.png', title: 'Heat Death', time: '10¹⁰⁰ years', desc: 'The universe fades to silence.', temp: '0' }
];

// Camera waypoints with X/Y/Z movement
const CAMERA_WAYPOINTS = [
    new THREE.Vector3(0, 0, 60),        // START
    new THREE.Vector3(-18, 10, 48),     // Big Bang
    new THREE.Vector3(15, -8, 36),      // Inflation
    new THREE.Vector3(-12, 12, 24),     // First Light
    new THREE.Vector3(14, -10, 12),     // Dark Ages
    new THREE.Vector3(-16, 8, 0),       // First Stars
    new THREE.Vector3(12, -10, -12),    // Galaxies
    new THREE.Vector3(-10, 10, -24),    // Stellar Alchemy
    new THREE.Vector3(10, -6, -36),     // Solar System
    new THREE.Vector3(-14, 10, -48),    // Planets
    new THREE.Vector3(0, 0, -60)        // END
];

// Photo positions (offset from camera path)
const PHOTO_POSITIONS = CAMERA_WAYPOINTS.map((wp, i) => {
    if (i === 0) return new THREE.Vector3(0, 0, 52);
    return new THREE.Vector3(wp.x * 0.7, wp.y * 0.7, wp.z - 6);
});

// ═══════════════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════════════

let scene, camera, renderer;
let starField;
let photoMeshes = [];
let cameraPath;
let scrollProgress = 0;
let targetScrollProgress = 0;
let currentPhotoIndex = 0;
let textureLoadStatus = new Array(PHOTOS.length).fill(false);

// Lazy rendering state
let isScrolling = false;
let scrollTimeout;
let lastFrameTime = 0;
let hasScrolled = false;
let needsRender = true;

const frameInterval = 1000 / CONFIG.TARGET_FPS;

// DOM
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const loadingPhase = document.getElementById('loading-phase');
const startScreen = document.getElementById('start-screen');

// ═══════════════════════════════════════════════════════════════════════════
// TEXTURE LOADER (Optimized - No Mipmaps)
// ═══════════════════════════════════════════════════════════════════════════

const textureLoader = new THREE.TextureLoader();

function loadTexture(url) {
    return new Promise((resolve, reject) => {
        textureLoader.load(url, (texture) => {
            // Disable mipmaps for less GPU memory
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.colorSpace = THREE.SRGBColorSpace;
            resolve(texture);
        }, undefined, reject);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD (20K stars, spherical distribution)
// ═══════════════════════════════════════════════════════════════════════════

function createStarField() {
    const geometry = new THREE.SphereGeometry(0.06, 3, 3);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.85
    });

    starField = new THREE.InstancedMesh(geometry, material, CONFIG.STAR_COUNT);
    starField.frustumCulled = true;

    const matrix = new THREE.Matrix4();

    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
        // Spherical distribution around camera path
        const radius = 80 + Math.random() * 120;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = (Math.random() - 0.5) * 200; // Spread along Z

        const scale = 0.5 + Math.random() * 1.2;
        matrix.makeScale(scale, scale, scale);
        matrix.setPosition(x, y, z);
        starField.setMatrixAt(i, matrix);
    }

    starField.instanceMatrix.needsUpdate = true;
    scene.add(starField);
}

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO MESHES (With zoom/blend material)
// ═══════════════════════════════════════════════════════════════════════════

function createPhotoMeshes() {
    for (let i = 0; i < PHOTOS.length; i++) {
        // Large plane to fill screen when close
        const geometry = new THREE.PlaneGeometry(CONFIG.PHOTO_SCALE * 1.6, CONFIG.PHOTO_SCALE);

        const material = new THREE.MeshBasicMaterial({
            color: 0x111111,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            depthWrite: false  // Proper blending
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(PHOTO_POSITIONS[i]);
        mesh.userData = { index: i, loaded: false, baseScale: 1 };

        // Face toward camera path
        mesh.lookAt(CAMERA_WAYPOINTS[Math.min(i, CAMERA_WAYPOINTS.length - 1)]);

        scene.add(mesh);
        photoMeshes.push(mesh);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESSIVE TEXTURE LOADING (Only 2 ahead/behind)
// ═══════════════════════════════════════════════════════════════════════════

async function updateTextures() {
    const current = Math.floor(currentPhotoIndex);

    for (let i = 0; i < PHOTOS.length; i++) {
        const distance = Math.abs(current - i);
        const mesh = photoMeshes[i];

        // Load if within range
        if (distance <= CONFIG.TEXTURE_LOAD_RANGE && !textureLoadStatus[i]) {
            textureLoadStatus[i] = true;
            try {
                const texture = await loadTexture(PHOTOS[i].src);
                mesh.material.map = texture;
                mesh.material.color.setHex(0xffffff);
                mesh.material.needsUpdate = true;
                mesh.userData.loaded = true;

                // Adjust aspect ratio
                if (texture.image) {
                    const aspect = texture.image.width / texture.image.height;
                    mesh.geometry.dispose();
                    mesh.geometry = new THREE.PlaneGeometry(CONFIG.PHOTO_SCALE * aspect, CONFIG.PHOTO_SCALE);
                }
            } catch (e) {
                textureLoadStatus[i] = false;
            }
        }

        // Unload if too far (memory management)
        if (distance > CONFIG.TEXTURE_LOAD_RANGE + 1 && mesh.userData.loaded) {
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
// PHOTO ZOOM & BLEND LOGIC
// ═══════════════════════════════════════════════════════════════════════════

function updatePhotoZoomBlend() {
    photoMeshes.forEach((mesh, i) => {
        const distance = camera.position.distanceTo(mesh.position);

        // ZOOM: Scale increases as camera approaches
        const zoomFactor = THREE.MathUtils.clamp(1.0 + (25 - distance) / 15, 0.8, 2.5);
        mesh.scale.setScalar(mesh.userData.baseScale * zoomFactor);

        // BLEND: Opacity based on distance
        let opacity;
        if (distance > 25) {
            opacity = 0;  // Too far - invisible
        } else if (distance > 18) {
            opacity = (25 - distance) / 7;  // Fade in (approaching)
        } else if (distance > 8) {
            opacity = 1.0;  // Full screen
        } else {
            opacity = distance / 8;  // Fade out (passing through)
        }

        // Smooth opacity transition
        mesh.material.opacity += (opacity - mesh.material.opacity) * 0.15;

        // Billboard: Always face camera
        mesh.lookAt(camera.position);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA PATH
// ═══════════════════════════════════════════════════════════════════════════

function createCameraPath() {
    cameraPath = new THREE.CatmullRomCurve3(CAMERA_WAYPOINTS, false, 'catmullrom', 0.5);
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL HANDLING
// ═══════════════════════════════════════════════════════════════════════════

function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

    // Hide start screen on first scroll
    if (!hasScrolled && scrollTop > 50) {
        hasScrolled = true;
        if (startScreen) startScreen.classList.add('hidden');
    }

    // Lazy render trigger
    isScrolling = true;
    needsRender = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, CONFIG.IDLE_TIMEOUT);
}

// ═══════════════════════════════════════════════════════════════════════════
// UI UPDATES
// ═══════════════════════════════════════════════════════════════════════════

function updateUI() {
    const index = Math.min(Math.floor(currentPhotoIndex), PHOTOS.length - 1);

    // Timeline
    document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i <= index);
    });

    // Temperature
    const tempEl = document.getElementById('temp-value');
    if (tempEl && PHOTOS[index]) tempEl.textContent = PHOTOS[index].temp;

    // Sections
    document.querySelectorAll('section').forEach((section, i) => {
        section.classList.toggle('active', Math.abs(currentPhotoIndex - i) < 0.6);
    });

    // End screen
    const endScreen = document.getElementById('end-screen');
    if (endScreen) endScreen.classList.toggle('visible', scrollProgress > 0.95);
}

function updateProgress(percent, phase) {
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (loadingPhase && phase) loadingPhase.textContent = phase;
}

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

async function init() {
    updateProgress(5, 'Initializing...');

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000005);
    scene.fog = new THREE.FogExp2(0x000005, CONFIG.FOG_DENSITY);

    // Camera
    camera = new THREE.PerspectiveCamera(
        CONFIG.CAMERA_FOV,
        window.innerWidth / window.innerHeight,
        CONFIG.CAMERA_NEAR,
        CONFIG.CAMERA_FAR
    );

    // Renderer (OPTIMIZED FOR HEAT)
    const canvas = document.getElementById('universe-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,              // DISABLED for performance
        powerPreference: 'low-power',  // Prefer integrated GPU
        alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(CONFIG.PIXEL_RATIO);  // Capped at 1.0
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    updateProgress(15, 'Creating starfield...');
    createStarField();

    updateProgress(25, 'Setting up camera path...');
    createCameraPath();
    camera.position.copy(cameraPath.getPointAt(0));

    updateProgress(35, 'Creating photo frames...');
    createPhotoMeshes();

    updateProgress(45, 'Loading first photos...');

    // Preload first 3 textures
    for (let i = 0; i < 3; i++) {
        try {
            const texture = await loadTexture(PHOTOS[i].src);
            const mesh = photoMeshes[i];
            mesh.material.map = texture;
            mesh.material.color.setHex(0xffffff);
            mesh.material.needsUpdate = true;
            mesh.userData.loaded = true;
            textureLoadStatus[i] = true;

            if (texture.image) {
                const aspect = texture.image.width / texture.image.height;
                mesh.geometry.dispose();
                mesh.geometry = new THREE.PlaneGeometry(CONFIG.PHOTO_SCALE * aspect, CONFIG.PHOTO_SCALE);
            }
            updateProgress(45 + (i + 1) * 15, `Loaded ${PHOTOS[i].title}...`);
        } catch (e) {
            console.warn(`Failed: ${PHOTOS[i].src}`);
        }
    }

    updateProgress(95, 'Ready');

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onResize);

    setupTimeline();

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Hide loading, start animation
    setTimeout(() => {
        if (loadingScreen) loadingScreen.classList.add('hidden');
        needsRender = true;
        animate(0);
    }, 300);
}

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE
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
// RESIZE
// ═══════════════════════════════════════════════════════════════════════════

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    needsRender = true;
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION LOOP (FPS CAPPED + LAZY RENDERING)
// ═══════════════════════════════════════════════════════════════════════════

function animate(currentTime) {
    requestAnimationFrame(animate);

    // FPS cap - skip frame if too soon
    if (currentTime - lastFrameTime < frameInterval) return;
    lastFrameTime = currentTime;

    // LAZY RENDER: Only render when scrolling or needs update
    if (!isScrolling && !needsRender) return;

    // Smooth scroll interpolation
    scrollProgress += (targetScrollProgress - scrollProgress) * CONFIG.LERP_SPEED;
    currentPhotoIndex = scrollProgress * (PHOTOS.length - 1);

    // Camera movement
    const targetPos = cameraPath.getPointAt(Math.min(Math.max(scrollProgress, 0), 1));
    camera.position.lerp(targetPos, CONFIG.LERP_SPEED);

    // Look ahead on path
    const lookT = Math.min(scrollProgress + 0.05, 1);
    const lookTarget = cameraPath.getPointAt(lookT);
    camera.lookAt(lookTarget);

    // Update photo zoom & blend
    updatePhotoZoomBlend();

    // Load/unload textures
    if (isScrolling) updateTextures();

    // UI
    updateUI();

    // Render
    renderer.render(scene, camera);

    // After first render, only render on scroll
    if (!isScrolling) needsRender = false;
}

// ═══════════════════════════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════════════════════════

init();
