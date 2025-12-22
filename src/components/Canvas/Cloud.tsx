'use client';

// ═══════════════════════════════════════════════════════════════════════════
// CLOUD STRUCTURE - Pillars of Creation with glass/nebula effect
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
            uColor: { value: new THREE.Color('#aaddff') }
        },
        vertexShader: `
            varying vec2 vUv;
            varying float vElevation;
            uniform float uTime;

            void main() {
                vUv = uv;
                
                // Subtle breathing movement
                vec3 pos = position;
                pos.z += sin(pos.x * 2.0 + uTime * 0.5) * 2.0;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D uTexture;
            uniform float uOpacity;
            uniform vec3 uColor;
            varying vec2 vUv;

            void main() {
                vec4 texColor = texture2D(uTexture, vUv);
                
                // Glass/Cloud effect
                // Mix texture with a soft color tint
                vec3 finalColor = mix(texColor.rgb, uColor, 0.2);
                
                // Soft edges
                float dist = distance(vUv, vec2(0.5));
                float alpha = texColor.a * (1.0 - smoothstep(0.3, 0.5, dist));
                
                // Boost brightness for "glowing" look
                finalColor *= 1.2;
                
                gl_FragColor = vec4(finalColor, alpha * uOpacity);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    }), [texture]);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Animate time
        (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;

        // Fade in based on distance
        const dist = camera.position.distanceTo(meshRef.current.position);

        // Visibility logic
        let targetOpacity = 0;
        if (dist < 150) {
            // Fade in as we get closer
            targetOpacity = Math.min(1.0, (150 - dist) / 50);
        }

        // Lerp opacity
        const currentOpacity = (meshRef.current.material as THREE.ShaderMaterial).uniforms.uOpacity.value;
        (meshRef.current.material as THREE.ShaderMaterial).uniforms.uOpacity.value =
            THREE.MathUtils.lerp(currentOpacity, targetOpacity, 0.05);

        // Always face camera
        meshRef.current.lookAt(camera.position);
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -280]} scale={[100, 100, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <primitive object={new THREE.ShaderMaterial(shaderArgs)} attach="material" />
        </mesh>
    );
}
