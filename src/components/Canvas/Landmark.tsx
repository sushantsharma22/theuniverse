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
                
                // Final alpha fade
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
        // 2. Approach (100 - 400): Growing, Centered, Dimly Visible
        // 3. Focus Zone (20 - 100): Full Size, Centered, massive growth
        // 4. Fly Through (< 20): Fade Out, Fly Through

        let targetScale = data.scale;
        let targetOpacity = 0;
        let mistIntensity = 0;
        let targetX = originalPos.x;
        let uiOpacity = 0;

        if (dist > 600) {
            // Far away but starting to appear
            targetOpacity = 0;
            setLandmark(null, 0);
        }
        else if (dist > 100) {
            // APPROACH PHASE - Long visibility
            // Visible from 600 down to 100
            const approachRange = 500;
            const approachProgress = 1.0 - ((dist - 100) / approachRange);

            // Dynamic Growth: Start SMALL (0.3x) and grow to Normal (1.0x)
            currentScale.current = data.scale * (0.3 + (0.7 * approachProgress));

            // High Contrast Fade In
            targetOpacity = 1.0 * approachProgress;

            targetX = originalPos.x; // STRICTLY CENTERED
            setLandmark(null, 0);

            // Override lerp for scale to specific calculated value
            targetScale = currentScale.current;
            setLandmark(null, 0);
        }
        else if (dist > 20) {
            // FOCUS PHASE - "Huge" and "Fully on Screen"
            // Visible from 100 down to 20
            const focusProgress = 1.0 - ((dist - 20) / 80);

            // Massive Scale at the end
            targetScale = data.scale * (2.0 + focusProgress * 2.0); // Up to 4x size
            targetOpacity = 1.0; // Fully visible

            // Keep Centered (User requested "middle creation")
            targetX = originalPos.x;

            // UI Fades in
            uiOpacity = 1.0;
            setLandmark(data, uiOpacity);
        }
        else {
            // EXIT / FLY THROUGH PHASE (Very close)
            targetX = originalPos.x;
            targetOpacity = dist / 20; // Rapid fade only at very end
            mistIntensity = (20 - dist) / 20;
            setLandmark(null, 0);
        }

        // Smooth Interpolation for Cinematic Feel
        const lerpSpeed = 0.04;

        // Position X (Using simple lerp)
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, lerpSpeed);

        // Scale
        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, lerpSpeed);

        // Apply Uniform Scale + optional Aspect Ratio stretch
        const aspectMultiplier = data.scaleX || 1.0;
        meshRef.current.scale.set(
            currentScale.current * aspectMultiplier,
            currentScale.current,
            currentScale.current
        );

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
