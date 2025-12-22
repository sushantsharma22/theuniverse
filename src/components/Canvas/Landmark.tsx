'use client';

// ═══════════════════════════════════════════════════════════════════════════
// LANDMARK - Generic component for cosmic discoveries (Nebulas, etc.)
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '@/store/scrollStore';
import { LandmarkData } from '@/lib/constants';

interface LandmarkProps {
    data: LandmarkData;
}

export default function Landmark({ data }: LandmarkProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(data.texture);
    const { camera } = useThree();
    const setLandmark = useScrollStore(state => state.setLandmark);

    const shaderArgs = useMemo(() => ({
        uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uColor: { value: new THREE.Color('#aaddff') },
            uMist: { value: 0 }
        },
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
            uniform vec3 uColor;
            uniform float uMist;
            varying vec2 vUv;

            void main() {
                vec4 texColor = texture2D(uTexture, vUv);
                
                // Glass/Cloud effect
                vec3 finalColor = mix(texColor.rgb, uColor, 0.15);
                
                // Radial fade
                float dist = distance(vUv, vec2(0.5));
                float edgeFade = 1.0 - smoothstep(0.2, 0.5, dist);
                
                // Mist interaction
                float alpha = texColor.a * edgeFade;
                
                // Internal glow
                finalColor *= 1.3 + uMist * 0.5;
                
                gl_FragColor = vec4(finalColor, alpha * uOpacity);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    }), [texture]);

    const currentScale = useRef(data.scale);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Animate shader time
        (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;

        // Distance logic
        const dist = camera.position.distanceTo(meshRef.current.position);
        const originalPos = data.position;

        // CINEMATIC LOGIC STATE MACHINE
        // 1. Far Away (> 400): Invisible/Small
        // 2. Approach (150 - 400): Growing, Centered
        // 3. Focus Zone (60 - 150): Slide Right, Text Left, Full Size
        // 4. Fly Through (< 60): Re-center, Fade Out, Fly Through

        let targetScale = data.scale;
        let targetOpacity = 0;
        let mistIntensity = 0;
        let targetX = originalPos.x;
        let uiOpacity = 0;

        if (dist > 350) {
            targetOpacity = 0;
            setLandmark(null, 0); // Ensure UI is hidden
        }
        else if (dist > 150) {
            // APPROACH PHASE
            // Grow from base scale to 2x base scale
            // Range: 150 to 350
            const approachProgress = 1.0 - ((dist - 150) / 200);
            targetScale = data.scale + (approachProgress * data.scale * 1.5);
            targetOpacity = 0.8 * approachProgress;
            targetX = originalPos.x;
            setLandmark(null, 0); // Ensure UI is hidden during approach
        }
        else if (dist > 60) {
            // FOCUS PHASE (Cinematic Moment)
            // Slide to Right (+30 units) so text can be on Left
            targetX = originalPos.x + 40;
            targetScale = data.scale * 3.5; // Massive
            targetOpacity = 1.0;

            // UI Fades in
            uiOpacity = 1.0;
            setLandmark(data, uiOpacity);
        }
        else {
            // EXIT / FLY THROUGH PHASE
            targetX = originalPos.x; // Back to center to fly through
            targetOpacity = dist / 60; // Fade out as we get very close
            mistIntensity = (60 - dist) / 50; // Mist increases
            setLandmark(null, 0); // Hide UI
        }

        // Smooth Interpolation for Cinematic Feel
        const lerpSpeed = 0.04;

        // Position X (Using simple lerp for smooth slide)
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, lerpSpeed);

        // Scale
        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, lerpSpeed);
        meshRef.current.scale.setScalar(currentScale.current);

        // Opacity & Mist
        const mat = meshRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, targetOpacity, 0.05);
        mat.uniforms.uMist.value = mistIntensity;

        // Always face camera
        meshRef.current.lookAt(camera.position);
    });

    return (
        <mesh ref={meshRef} position={data.position}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <primitive object={new THREE.ShaderMaterial(shaderArgs)} attach="material" />
        </mesh>
    );
}
