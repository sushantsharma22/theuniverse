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
            uniform float uTime;

            void main() {
                vUv = uv;
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

        // Animate
        (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;

        // Distance logic
        const dist = camera.position.distanceTo(meshRef.current.position);

        // 1. DYNAMIC SCALE (Small -> Big)
        // Similar logic to Cloud.tsx but generic
        const proximityLimit = 250;
        const proximityFactor = Math.max(0, proximityLimit - dist);
        // Grow up to 2.5x base scale
        const targetScale = data.scale + (proximityFactor * (data.scale / 100));

        currentScale.current += (targetScale - currentScale.current) * 0.04;
        meshRef.current.scale.setScalar(currentScale.current);

        // 2. FADE & UI LOGIC
        let targetOpacity = 0;
        let mistIntensity = 0;
        let uiOpacity = 0;

        if (dist > 400) {
            targetOpacity = 0;
        } else if (dist > 150) {
            // Approach
            targetOpacity = 0.8 * (1.0 - (dist - 150) / 250);
        } else if (dist > 20) {
            // Close - Trigger UI
            targetOpacity = 0.9;
            mistIntensity = (150 - dist) / 130;

            // UI Opacity (fades in when closer than distanceTrigger)
            if (dist < data.distanceTrigger) {
                uiOpacity = Math.min(1, (data.distanceTrigger - dist) / 20);
                // Inform store we are active
                setLandmark(data, uiOpacity);
            } else {
                setLandmark(null, 0);
            }
        } else {
            // Inside
            targetOpacity = dist / 20;
            setLandmark(data, 0); // Hide UI when too close/inside
        }

        const mat = meshRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(mat.uniforms.uOpacity.value, targetOpacity, 0.05);
        mat.uniforms.uMist.value = mistIntensity;

        meshRef.current.lookAt(camera.position);
    });

    return (
        <mesh ref={meshRef} position={data.position}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <primitive object={new THREE.ShaderMaterial(shaderArgs)} attach="material" />
        </mesh>
    );
}
