/* ═══════════════════════════════════════════════════════════════════════════
   THE UNIVERSE - Seamless Photorealistic Cosmic Journey
   ═══════════════════════════════════════════════════════════════════════════
   
   A continuous glide through 13.8 billion years of cosmic history.
   Photos blend INTO the environment - you travel THROUGH them.
   NO FOG - pure visibility. Background matches each scene's colors.
   
   ═══════════════════════════════════════════════════════════════════════════ */

import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    // Performance
    STAR_COUNT: 15000,
    PIXEL_RATIO: 1.0,
    TARGET_FPS: 60,
    IDLE_TIMEOUT: 200,

    // Camera
    CAMERA_FOV: 60,
    CAMERA_NEAR: 0.1,
    CAMERA_FAR: 600,

    // Smooth transitions
    LERP_SPEED: 0.035,
    COLOR_LERP_SPEED: 0.02,

    // Photo planes (large scale for immersion)
    PHOTO_SCALE: 50,
    TEXTURE_LOAD_RANGE: 3
};

// ═══════════════════════════════════════════════════════════════════════════
// SCENE DATA - Each scene is a moment in cosmic history
// ═══════════════════════════════════════════════════════════════════════════

const SCENES = [
    {
        src: 'photos/52002778380_50e6f859aa_o.jpg',
        title: 'The Big Bang',
        time: 'T = 0',
        desc: '13.8 billion years ago, spacetime exploded from infinite density.',
        temp: '∞',
        bgColor: 0x1a0800,      // Dark orange-brown
        starTint: 0xffccaa,
        exposure: 1.5
    },
    {
        src: 'photos/28098134687_621b8e892c_o.jpg',
        title: 'Cosmic Inflation',
        time: '10⁻³² seconds',
        desc: 'The universe expands faster than light.',
        temp: '10³²',
        bgColor: 0x000a1a,      // Deep space blue
        starTint: 0xaaccff,
        exposure: 1.2
    },
    {
        src: 'photos/52717339847_02c257ca4a_o.jpg',
        title: 'First Light',
        time: '380,000 years',
        desc: 'Atoms form. Light escapes for the first time.',
        temp: '3000',
        bgColor: 0x120818,      // Purple-black
        starTint: 0xddccff,
        exposure: 1.3
    },
    {
        src: 'photos/27990761686_2819382262_o.jpg',
        title: 'The Dark Ages',
        time: '200 million years',
        desc: 'Before stars, only darkness and gravity.',
        temp: '50',
        bgColor: 0x000208,      // Near black
        starTint: 0x556677,
        exposure: 0.7
    },
    {
        src: 'photos/28109219377_0f21f3e0fd_o.jpg',
        title: 'First Stars',
        time: '400 million years',
        desc: 'Blue giants ignite, ending the dark ages.',
        temp: '10⁵',
        bgColor: 0x001020,      // Dark blue
        starTint: 0x88ccff,
        exposure: 1.4
    },
    {
        src: 'photos/49576591521_1f37d717d0_o.jpg',
        title: 'Galaxies Form',
        time: '1 billion years',
        desc: 'Stars orbit black holes, forming spirals.',
        temp: '10⁶',
        bgColor: 0x0d0800,      // Dark gold
        starTint: 0xffddaa,
        exposure: 1.3
    },
    {
        src: 'photos/52515250436_4618b5216e_k.jpg',
        title: 'Stellar Alchemy',
        time: '5 billion years',
        desc: 'Stars forge elements. Supernovae scatter them.',
        temp: '10⁸',
        bgColor: 0x150500,      // Dark red
        starTint: 0xffaaaa,
        exposure: 1.5
    },
    {
        src: 'photos/53231853596_906631a521_o.jpg',
        title: 'Our Solar System',
        time: '9.2 billion years',
        desc: 'Our Sun and planets take shape.',
        temp: '5778',
        bgColor: 0x0f0a00,      // Dark yellow-brown
        starTint: 0xffffcc,
        exposure: 1.4
    },
    {
        src: 'photos/45738608235_952889a838_o.jpg',
        title: 'Planets Form',
        time: '4.6 billion years ago',
        desc: 'Saturn emerges from the disk.',
        temp: '1500',
        bgColor: 0x080502,      // Dark brown
        starTint: 0xeeddcc,
        exposure: 1.3
    },
    {
        src: 'photos/52001270447_027d7a8692_o.jpg',
        title: 'Cosmic Nurseries',
        time: 'Present Day',
        desc: 'Where new stars are born.',
        temp: '288',
        bgColor: 0x000a0d,      // Dark teal
        starTint: 0xaaffee,
        exposure: 1.4
    },
    {
        src: 'photos/52675793824_c407411765_o.png',
        title: 'Heat Death',
        time: '10¹⁰⁰ years',
        desc: 'The universe fades to silence.',
        temp: '0',
        bgColor: 0x000002,      // Almost pure black
        starTint: 0x222233,
        exposure: 0.5
    }
];

// Camera path waypoints - smooth curve through space
const WAYPOINTS = [
    new THREE.Vector3(0, 0, 100),        // START - far out
    new THREE.Vector3(-8, 5, 70),        // Toward Big Bang
    new THREE.Vector3(6, -4, 40),        // Inflation
    new THREE.Vector3(-5, 6, 10),        // First Light
    new THREE.Vector3(7, -5, -20),       // Dark Ages
    new THREE.Vector3(-6, 4, -50),       // First Stars
    new THREE.Vector3(5, -6, -80),       // Galaxies
    new THREE.Vector3(-4, 5, -110),      // Stellar Alchemy
    new THREE.Vector3(6, -4, -140),      // Solar System
    new THREE.Vector3(-5, 6, -170),      // Planets
    new THREE.Vector3(4, -5, -200),      // Cosmic Nurseries
    new THREE.Vector3(0, 0, -240)        // END - Heat Death
];

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO SHADER - Soft edges that blend into space
// ═══════════════════════════════════════════════════════════════════════════

const PhotoShader = {
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uOpacity;
        uniform vec3 uTint;
        
        varying vec2 vUv;
        
        void main() {
            vec4 tex = texture2D(uTexture, vUv);
            
            // Soft radial fade - center visible, edges blend to space
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            
            // Gentle falloff - visible until 40% from center, then smooth fade
            float fade = 1.0 - smoothstep(0.35, 0.5, dist);
            
            // Apply tint for color harmony with background
            vec3 color = mix(tex.rgb, tex.rgb * uTint, 0.15);
            
            float alpha = tex.a * uOpacity * fade;
            gl_FragColor = vec4(color, alpha);
        }
    `
};

// ═══════════════════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════════════════

let scene, camera, renderer;
let starField, starMaterial;
let photoMeshes = [];
let cameraPath;
let scrollProgress = 0;
let targetScrollProgress = 0;
let currentSceneIndex = 0;
let textureLoadStatus = new Array(SCENES.length).fill(false);

// Color state
let currentBgColor = new THREE.Color(0x000208);
let targetBgColor = new THREE.Color(0x000208);
let currentStarTint = new THREE.Color(0xffffff);
let targetStarTint = new THREE.Color(0xffffff);
let currentExposure = 1.0;
let targetExposure = 1.0;

// Rendering control
let isScrolling = false;
let scrollTimeout;
let lastFrameTime = 0;
let hasScrolled = false;
let needsRender = true;

const frameInterval = 1000 / CONFIG.TARGET_FPS;
let animationFrameId = null;

// DOM
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const loadingPhase = document.getElementById('loading-phase');
const startScreen = document.getElementById('start-screen');

const textureLoader = new THREE.TextureLoader();

// ═══════════════════════════════════════════════════════════════════════════
// TEXTURE LOADER
// ═══════════════════════════════════════════════════════════════════════════

function loadTexture(url) {
    return new Promise((resolve, reject) => {
        textureLoader.load(url, (texture) => {
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.colorSpace = THREE.SRGBColorSpace;
            resolve(texture);
        }, undefined, reject);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// STARFIELD - Tinted to match environment
// ═══════════════════════════════════════════════════════════════════════════

function createStarField() {
    const geometry = new THREE.SphereGeometry(0.1, 4, 4);

    starMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.85
    });

    starField = new THREE.InstancedMesh(geometry, starMaterial, CONFIG.STAR_COUNT);
    starField.frustumCulled = false;

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
        // Spread stars in a cylinder around the camera path
        const radius = 80 + Math.random() * 200;
        const theta = Math.random() * Math.PI * 2;

        const x = radius * Math.cos(theta);
        const y = radius * Math.sin(theta);
        const z = 150 - Math.random() * 450; // From start to end

        const scale = 0.3 + Math.random() * 1.2;
        matrix.makeScale(scale, scale, scale);
        matrix.setPosition(x, y, z);
        starField.setMatrixAt(i, matrix);

        // Varied brightness
        const brightness = 0.5 + Math.random() * 0.5;
        color.setRGB(brightness, brightness, brightness * 1.1);
        starField.setColorAt(i, color);
    }

    starField.instanceMatrix.needsUpdate = true;
    if (starField.instanceColor) starField.instanceColor.needsUpdate = true;

    scene.add(starField);
}

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO PLANES - Large, immersive, with soft edges
// ═══════════════════════════════════════════════════════════════════════════

function createPhotoMeshes() {
    for (let i = 0; i < SCENES.length; i++) {
        const sceneData = SCENES[i];

        // Large plane for immersive effect
        const geometry = new THREE.PlaneGeometry(CONFIG.PHOTO_SCALE * 1.6, CONFIG.PHOTO_SCALE);

        // Shader material with soft edges
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: null },
                uOpacity: { value: 0 },
                uTint: { value: new THREE.Color(1, 1, 1) }
            },
            vertexShader: PhotoShader.vertexShader,
            fragmentShader: PhotoShader.fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Position at waypoint
        const wp = WAYPOINTS[i + 1] || WAYPOINTS[WAYPOINTS.length - 1];
        mesh.position.set(wp.x, wp.y, wp.z);

        mesh.userData = {
            index: i,
            loaded: false,
            sceneData: sceneData
        };

        scene.add(mesh);
        photoMeshes.push(mesh);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESSIVE TEXTURE LOADING
// ═══════════════════════════════════════════════════════════════════════════

async function updateTextures() {
    const current = Math.floor(currentSceneIndex);

    for (let i = 0; i < SCENES.length; i++) {
        const distance = Math.abs(current - i);
        const mesh = photoMeshes[i];

        if (distance <= CONFIG.TEXTURE_LOAD_RANGE && !textureLoadStatus[i]) {
            textureLoadStatus[i] = true;
            try {
                const texture = await loadTexture(SCENES[i].src);
                mesh.material.uniforms.uTexture.value = texture;
                mesh.userData.loaded = true;

                // Adjust aspect ratio
                if (texture.image) {
                    const aspect = texture.image.width / texture.image.height;
                    mesh.geometry.dispose();
                    mesh.geometry = new THREE.PlaneGeometry(
                        CONFIG.PHOTO_SCALE * aspect,
                        CONFIG.PHOTO_SCALE
                    );
                }
            } catch (e) {
                console.warn(`Failed: ${SCENES[i].src}`);
                textureLoadStatus[i] = false;
            }
        }

        // Unload distant textures
        if (distance > CONFIG.TEXTURE_LOAD_RANGE + 2 && mesh.userData.loaded) {
            const tex = mesh.material.uniforms.uTexture.value;
            if (tex) {
                tex.dispose();
                mesh.material.uniforms.uTexture.value = null;
            }
            mesh.userData.loaded = false;
            textureLoadStatus[i] = false;
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO VISIBILITY - Fade in as approach, fade out as pass
// ═══════════════════════════════════════════════════════════════════════════

function updatePhotos() {
    photoMeshes.forEach((mesh, i) => {
        const dist = camera.position.distanceTo(mesh.position);

        let opacity;

        // Visibility based on distance
        if (dist > 60) {
            opacity = 0;
        } else if (dist > 40) {
            // Fade in from distance
            opacity = (60 - dist) / 20;
        } else if (dist > 15) {
            // Full visibility zone
            opacity = 1.0;
        } else if (dist > 5) {
            // Fade out as passing through
            opacity = (dist - 5) / 10;
        } else {
            opacity = 0;
        }

        // Smooth transition
        const current = mesh.material.uniforms.uOpacity.value;
        mesh.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(current, opacity, 0.12);

        // Scale up slightly as we approach
        const scale = THREE.MathUtils.clamp(1.0 + (50 - dist) / 40, 0.8, 1.8);
        mesh.scale.setScalar(scale);

        // Always face camera
        mesh.lookAt(camera.position);

        // Tint to match scene colors
        const sceneData = mesh.userData.sceneData;
        if (sceneData) {
            const tint = new THREE.Color(sceneData.starTint);
            mesh.material.uniforms.uTint.value.lerp(tint, 0.05);
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// ENVIRONMENT - Background color changes per scene (NO FOG!)
// ═══════════════════════════════════════════════════════════════════════════

function updateEnvironment() {
    // Find which scenes we're between
    let nearestIdx = 0;
    let nearestDist = Infinity;

    photoMeshes.forEach((mesh, i) => {
        const d = camera.position.distanceTo(mesh.position);
        if (d < nearestDist) {
            nearestDist = d;
            nearestIdx = i;
        }
    });

    currentSceneIndex = nearestIdx;
    const sceneData = SCENES[nearestIdx];

    if (sceneData) {
        // Target colors from nearest scene
        targetBgColor.set(sceneData.bgColor);
        targetStarTint.set(sceneData.starTint);
        targetExposure = sceneData.exposure;
    }

    // Smooth transitions
    currentBgColor.lerp(targetBgColor, CONFIG.COLOR_LERP_SPEED);
    currentStarTint.lerp(targetStarTint, CONFIG.COLOR_LERP_SPEED);
    currentExposure = THREE.MathUtils.lerp(currentExposure, targetExposure, CONFIG.LERP_SPEED);

    // Apply
    scene.background = currentBgColor.clone();
    starMaterial.color.copy(currentStarTint);
    renderer.toneMappingExposure = currentExposure;
}

// ═══════════════════════════════════════════════════════════════════════════
// CAMERA PATH
// ═══════════════════════════════════════════════════════════════════════════

function createCameraPath() {
    cameraPath = new THREE.CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.5);
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL
// ═══════════════════════════════════════════════════════════════════════════

function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;

    if (!hasScrolled && scrollTop > 50) {
        hasScrolled = true;
        if (startScreen) startScreen.classList.add('hidden');
    }

    isScrolling = true;
    needsRender = true;

    // ✅ Restart animation if stopped
    if (!animationFrameId) {
        console.log('🚀 GPU ACTIVE');
        animationFrameId = requestAnimationFrame(animate);
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, CONFIG.IDLE_TIMEOUT);
}

// ═══════════════════════════════════════════════════════════════════════════
// UI
// ═══════════════════════════════════════════════════════════════════════════

function updateUI() {
    const idx = Math.min(Math.floor(currentSceneIndex), SCENES.length - 1);

    document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i <= idx);
    });

    const tempEl = document.getElementById('temp-value');
    if (tempEl && SCENES[idx]) tempEl.textContent = SCENES[idx].temp;

    document.querySelectorAll('section').forEach((section, i) => {
        section.classList.toggle('active', Math.abs(currentSceneIndex - i) < 0.7);
    });

    const endScreen = document.getElementById('end-screen');
    if (endScreen) endScreen.classList.toggle('visible', scrollProgress > 0.95);
}

function updateProgress(percent, phase) {
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (loadingPhase && phase) loadingPhase.textContent = phase;
}

function setupTimeline() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    timeline.innerHTML = '';
    for (let i = 0; i < SCENES.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.title = SCENES[i].title;
        dot.addEventListener('click', () => {
            const targetScroll = (i / (SCENES.length - 1)) *
                (document.documentElement.scrollHeight - window.innerHeight);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        });
        timeline.appendChild(dot);
    }
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    needsRender = true;
}

// ═══════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════

async function init() {
    updateProgress(5, 'Initializing...');

    // Scene - NO FOG!
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000208);

    // Camera
    camera = new THREE.PerspectiveCamera(
        CONFIG.CAMERA_FOV,
        window.innerWidth / window.innerHeight,
        CONFIG.CAMERA_NEAR,
        CONFIG.CAMERA_FAR
    );

    // Renderer with ACES tone mapping
    const canvas = document.getElementById('universe-canvas');
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        powerPreference: 'low-power',
        alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(CONFIG.PIXEL_RATIO);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    updateProgress(15, 'Creating starfield...');
    createStarField();

    updateProgress(25, 'Setting up camera path...');
    createCameraPath();
    camera.position.copy(cameraPath.getPointAt(0));

    updateProgress(35, 'Creating photo frames...');
    createPhotoMeshes();

    updateProgress(45, 'Loading photos...');

    // Preload first 3
    for (let i = 0; i < Math.min(3, SCENES.length); i++) {
        try {
            const texture = await loadTexture(SCENES[i].src);
            const mesh = photoMeshes[i];
            mesh.material.uniforms.uTexture.value = texture;
            mesh.userData.loaded = true;
            textureLoadStatus[i] = true;

            if (texture.image) {
                const aspect = texture.image.width / texture.image.height;
                mesh.geometry.dispose();
                mesh.geometry = new THREE.PlaneGeometry(
                    CONFIG.PHOTO_SCALE * aspect,
                    CONFIG.PHOTO_SCALE
                );
            }
            updateProgress(45 + (i + 1) * 15, `Loaded ${SCENES[i].title}...`);
        } catch (e) {
            console.warn(`Failed: ${SCENES[i].src}`);
        }
    }

    updateProgress(95, 'Ready');

    // Events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onResize);

    setupTimeline();

    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Start
    setTimeout(() => {
        if (loadingScreen) loadingScreen.classList.add('hidden');
        needsRender = true;
        animate(0);
    }, 300);
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION
// ═══════════════════════════════════════════════════════════════════════════

function animate(currentTime) {
    // ✅ NEW (stops when idle):
    animationFrameId = null;

    // FPS cap
    if (currentTime - lastFrameTime < frameInterval) {
        if (isScrolling || needsRender) {
            animationFrameId = requestAnimationFrame(animate);
        }
        return;
    }
    lastFrameTime = currentTime;

    // Only render when needed
    if (!isScrolling && !needsRender) {
        // GPU IDLE
        return;
    }

    // Smooth scroll
    scrollProgress += (targetScrollProgress - scrollProgress) * CONFIG.LERP_SPEED;

    // Camera follows path
    const t = Math.min(Math.max(scrollProgress, 0), 1);
    const targetPos = cameraPath.getPointAt(t);
    camera.position.lerp(targetPos, CONFIG.LERP_SPEED);

    // Look ahead
    const lookT = Math.min(t + 0.04, 1);
    const lookTarget = cameraPath.getPointAt(lookT);
    camera.lookAt(lookTarget);

    // Updates
    updateEnvironment();
    updatePhotos();
    if (isScrolling) updateTextures();
    updateUI();

    // Render
    renderer.render(scene, camera);

    if (!isScrolling) needsRender = false;

    // ✅ Only schedule next frame if still scrolling
    if (isScrolling || needsRender) {
        animationFrameId = requestAnimationFrame(animate);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// START
// ═══════════════════════════════════════════════════════════════════════════

init();
