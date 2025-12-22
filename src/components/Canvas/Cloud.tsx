'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CLOUD STRUCTURE - Pillars of Creation with massive scale and soft mist
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Cloud() {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture('/textures/pillars_of_creation.png');
    const { camera } = useThree();

    const shaderArgs = useMemo(() => ({
        uniforms: {
            uTexture: { value: texture },
            uTime: { value: 0 },
            uOpacity: { value: 0 },
            uColor: { value: new THREE.Color('#aaddff') },
            uMist: { value: 0 } // New mist density control
        },
        vertexShader: `
            varying vec2 vUv;
            varying float vElevation;
            uniform float uTime;

            void main() {
                vUv = uv;
                
                // Slow, deep breathing movement
                vec3 pos = position;
                // Warping the plane slightly like a nebula
                float warp = sin(pos.x * 1.5 + uTime * 0.3) * sin(pos.y * 1.5 + uTime * 0.2);
                pos.z += warp * 5.0; 
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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
                
                // Radial fade for soft edges
                float dist = distance(vUv, vec2(0.5));
                float edgeFade = 1.0 - smoothstep(0.2, 0.5, dist);
                
                // Mist interaction - texture gets "softer" with more mist
                float alpha = texColor.a * edgeFade;
                
                // Boost brightness for "internal glow"
                finalColor *= 1.3 + uMist * 0.5;
                
                // Final alpha fade
                gl_FragColor = vec4(finalColor, alpha * uOpacity);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    }), [texture]);

    // Scale ref to smoothly animate size
    const currentScale = useRef(150);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Animate time
        (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;

        const dist = camera.position.distanceTo(meshRef.current.position);

        // 1. DYNAMIC SCALE - "Small to Big"
        // Base scale 150. As we get closer (dist < 200), it grows MASSIVELY
        // Formula: closer = bigger. 
        // At 200m away -> scale 150
        // At 50m away -> scale 300
        const proximityFactor = Math.max(0, 250 - dist);
        const targetScale = 150 + (proximityFactor * 1.2);

        currentScale.current += (targetScale - currentScale.current) * 0.04;
        meshRef.current.scale.setScalar(currentScale.current);

        // 2. FADE MODE - "Mist"
        // Logic: fully visible at distance, but as we fly INTO it (dist < 60), it fades out softly
        let targetOpacity = 0;
        let mistIntensity = 0;

        if (dist > 300) {
            targetOpacity = 0; // Too far
        } else if (dist > 100) {
            // Approach: Fade in gradually
            // 300 -> 0 opacity
            // 100 -> 0.8 opacity
            targetOpacity = 0.8 * (1.0 - (dist - 100) / 200);
            mistIntensity = 0;
        } else if (dist > 20) {
            // Close: Full glory
            targetOpacity = 0.9;
            // Mist increases as we get close
            mistIntensity = (100 - dist) / 80;
        } else {
            // Inside/Passing: Fade out
            targetOpacity = dist / 20;
        }

        // Smooth opacity transition
        const mat = meshRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, targetOpacity, 0.05);
        mat.uniforms.uMist.value = mistIntensity;

        // Always face camera
        meshRef.current.lookAt(camera.position);
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -260]}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <primitive object={new THREE.ShaderMaterial(shaderArgs)} attach="material" />
        </mesh>
    );
}
