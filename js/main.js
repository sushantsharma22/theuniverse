/* ═══════════════════════════════════════════════════════════════════
   UNIVERSE - Lightweight Photo Journey
   Glides through NASA/Hubble images with minimal GPU usage
   ═══════════════════════════════════════════════════════════════════ */

import * as THREE from 'three';

// All 11 NASA photos
const PHOTOS = [
    { src: 'photos/52002778380_50e6f859aa_o.jpg', title: 'The Big Bang', time: 'T = 0', desc: '13.8 billion years ago, all of spacetime exploded from an infinitely dense singularity.' },
    { src: 'photos/28098134687_621b8e892c_o.jpg', title: 'Cosmic Inflation', time: 'T = 10⁻³² seconds', desc: 'The universe expands faster than light, stretching quantum fluctuations across the cosmos.' },
    { src: 'photos/52717339847_02c257ca4a_o.jpg', title: 'First Light', time: 'T = 380,000 years', desc: 'Atoms form. The universe becomes transparent. Light escapes for the first time.' },
    { src: 'photos/27990761686_2819382262_o.jpg', title: 'The Dark Ages', time: 'T = 200 million years', desc: 'Before the first stars, only darkness. Gravity slowly pulls matter together.' },
    { src: 'photos/28109219377_0f21f3e0fd_o.jpg', title: 'First Stars', time: 'T = 400 million years', desc: 'Massive blue giants ignite, ending the cosmic dark ages with brilliant light.' },
    { src: 'photos/49576591521_1f37d717d0_o.jpg', title: 'Galaxies Form', time: 'T = 1 billion years', desc: 'Billions of stars orbit supermassive black holes, forming spiral galaxies.' },
    { src: 'photos/52515250436_4618b5216e_k.jpg', title: 'Stellar Alchemy', time: 'T = 5 billion years', desc: 'Stars forge carbon, oxygen, iron. Supernovae scatter elements across space.' },
    { src: 'photos/53231853596_906631a521_o.jpg', title: 'Our Solar System', time: 'T = 9.2 billion years', desc: 'From a spinning disk of gas and dust, our Sun and planets take shape.' },
    { src: 'photos/45738608235_952889a838_o.jpg', title: 'Planets Form', time: '4.6 billion years ago', desc: 'Saturn and other worlds emerge from the protoplanetary disk.' },
    { src: 'photos/52001270447_027d7a8692_o.jpg', title: 'Cosmic Nurseries', time: 'Present Day', desc: 'Pillars of Creation - where new stars are born from cosmic dust.' },
    { src: 'photos/52675793824_c407411765_o.png', title: 'The Far Future', time: '10¹⁰⁰ years', desc: 'Black holes evaporate. The universe fades to silence. Heat Death.' }
];

let scene, camera, renderer;
let photoMeshes = [];
let scrollProgress = 0;
let currentPhoto = 0;

const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const loadingPhase = document.getElementById('loading-phase');

function updateProgress(percent, phase) {
    progressBar.style.width = `${percent}%`;
    if (phase) loadingPhase.textContent = phase;
}

async function init() {
    updateProgress(5, 'Setting up...');

    // Simple scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const canvas = document.getElementById('universe-canvas');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Load textures
    const loader = new THREE.TextureLoader();

    for (let i = 0; i < PHOTOS.length; i++) {
        updateProgress(10 + (i / PHOTOS.length) * 80, `Loading ${PHOTOS[i].title}...`);

        try {
            const texture = await new Promise((resolve, reject) => {
                loader.load(PHOTOS[i].src, resolve, undefined, reject);
            });

            texture.colorSpace = THREE.SRGBColorSpace;

            // Create plane for each photo
            const aspect = texture.image.width / texture.image.height;
            const height = 8;
            const width = height * aspect;

            const geo = new THREE.PlaneGeometry(width, height);
            const mat = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: i === 0 ? 1 : 0
            });

            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.z = -i * 15;
            mesh.userData = { index: i, baseZ: -i * 15 };

            scene.add(mesh);
            photoMeshes.push(mesh);
        } catch (e) {
            console.warn(`Failed to load: ${PHOTOS[i].src}`);
        }
    }

    updateProgress(95, 'Ready');

    // Setup scroll
    setupScroll();

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        animate();
    }, 500);

    window.addEventListener('resize', onResize);
}

function setupScroll() {
    const container = document.getElementById('scroll-container');
    const sections = container.querySelectorAll('section');

    // Update section content with photo data
    sections.forEach((section, i) => {
        if (PHOTOS[i]) {
            const content = section.querySelector('.section-content');
            if (content) {
                const marker = content.querySelector('.epoch-marker');
                const h2 = content.querySelector('h2');
                const p = content.querySelector('p');

                if (marker) marker.textContent = PHOTOS[i].time;
                if (h2) h2.textContent = PHOTOS[i].title;
                if (p) p.textContent = PHOTOS[i].desc;
            }
        }
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = Math.min(scrollTop / docHeight, 1);
        currentPhoto = Math.floor(scrollProgress * PHOTOS.length);

        updateUI();
    });
}

function updateUI() {
    // Update timeline
    document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i <= currentPhoto);
    });

    // Update temperature display
    const temps = ['∞', '10³²', '10⁹', '3000', '50', '10⁶', '10⁸', '5778', '1500', '288', '0'];
    const tempEl = document.getElementById('temp-value');
    if (tempEl) tempEl.textContent = temps[Math.min(currentPhoto, temps.length - 1)];

    // Section activation
    document.querySelectorAll('section').forEach((s, i) => {
        const sectionProgress = scrollProgress * PHOTOS.length;
        const isActive = Math.abs(sectionProgress - i) < 0.6;
        s.classList.toggle('active', isActive);
    });

    // End screen
    const endScreen = document.getElementById('end-screen');
    if (endScreen) endScreen.classList.toggle('visible', scrollProgress > 0.95);
}

function animate() {
    requestAnimationFrame(animate);

    // Move camera through photos
    const targetZ = 5 - scrollProgress * (PHOTOS.length - 1) * 15;
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    // Fade photos based on camera distance
    photoMeshes.forEach((mesh, i) => {
        const dist = Math.abs(camera.position.z - mesh.position.z - 5);
        const opacity = Math.max(0, 1 - dist / 10);
        mesh.material.opacity = opacity;

        // Subtle parallax
        mesh.position.x = Math.sin(scrollProgress * Math.PI * 2 + i) * 0.3;
        mesh.position.y = Math.cos(scrollProgress * Math.PI * 2 + i * 0.5) * 0.2;
    });

    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Setup timeline
const timeline = document.getElementById('timeline');
if (timeline) {
    timeline.innerHTML = '';
    for (let i = 0; i < PHOTOS.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.addEventListener('click', () => {
            window.scrollTo({
                top: (i / PHOTOS.length) * (document.documentElement.scrollHeight - window.innerHeight),
                behavior: 'smooth'
            });
        });
        timeline.appendChild(dot);
    }
}

// Restart button
const restartBtn = document.getElementById('restart-btn');
if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

init();
