'use client';

// ═══════════════════════════════════════════════════════════════════════════
// PHOTO PLANE - With proper texture/geometry disposal
// ═══════════════════════════════════════════════════════════════════════════

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { PhotoData } from '@/lib/types';
import { PHOTO_POSITIONS, CONFIG } from '@/lib/constants';
import { useScrollStore } from '@/store/scrollStore';

// Custom shader material for soft edges
const PhotoMaterial = shaderMaterial(
    {
        uTexture: null,
        uOpacity: 0,
        uTint: new THREE.Color(1, 1, 1),
    },
  // Vertex shader
  /*glsl*/`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader with radial gradient fade
  /*glsl*/`
    uniform sampler2D uTexture;
    uniform float uOpacity;
    uniform vec3 uTint;
    varying vec2 vUv;

    void main() {
      vec4 tex = texture2D(uTexture, vUv);
      
      // Radial fade - smooth edges
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      float fade = 1.0 - smoothstep(0.35, 0.52, dist);
      
      // Apply subtle tint
      vec3 color = mix(tex.rgb, tex.rgb * uTint, 0.1);
      
      float alpha = tex.a * uOpacity * fade;
      gl_FragColor = vec4(color, alpha);
    }
  `
);

// Extend R3F with custom material
extend({ PhotoMaterial });

// Type declaration for custom material
declare module '@react-three/fiber' {
    interface ThreeElements {
        photoMaterial: {
            ref?: React.Ref<THREE.ShaderMaterial>;
            uTexture?: THREE.Texture | null;
            uOpacity?: number;
            uTint?: THREE.Color;
            transparent?: boolean;
            side?: THREE.Side;
            depthWrite?: boolean;
            attach?: string;
        };
    }
}

interface PhotoPlaneProps {
    data: PhotoData;
    index: number;
}

export default function PhotoPlane({ data, index }: PhotoPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
    const { camera, invalidate } = useThree();
    const isScrolling = useScrollStore(state => state.isScrolling);

    // Load texture
    const texture = useTexture(data.src);

    // Get position
    const position = PHOTO_POSITIONS[index] || new THREE.Vector3(0, 0, -index * 30);

    // Calculate aspect ratio and create geometry ONCE
    const aspect = useMemo(() => {
        const img = texture.image as HTMLImageElement | undefined;
        if (img && img.width && img.height) {
            return img.width / img.height;
        }
        return 1.6;
    }, [texture]);

    // Create geometry once
    useEffect(() => {
        geometryRef.current = new THREE.PlaneGeometry(CONFIG.PHOTO_SCALE * aspect, CONFIG.PHOTO_SCALE);

        // ✅ CRITICAL: Dispose geometry on unmount - prevents memory leaks
        return () => {
            if (geometryRef.current) {
                geometryRef.current.dispose();
                geometryRef.current = null;
            }
        };
    }, [aspect]);

    // ✅ CRITICAL: Dispose texture on unmount
    useEffect(() => {
        return () => {
            if (texture) {
                texture.dispose();
            }
        };
    }, [texture]);

    useFrame(() => {
        // ✅ Skip if not scrolling
        if (!isScrolling) return;
        if (!meshRef.current || !materialRef.current) return;

        const dist = camera.position.distanceTo(meshRef.current.position);

        // Visibility based on distance
        let targetOpacity: number;
        if (dist > 55) {
            targetOpacity = 0;
        } else if (dist > 35) {
            targetOpacity = (55 - dist) / 20;
        } else if (dist > 12) {
            targetOpacity = 1.0;
        } else if (dist > 4) {
            targetOpacity = (dist - 4) / 8;
        } else {
            targetOpacity = 0;
        }

        // Smooth opacity transition
        const currentOpacity = materialRef.current.uniforms.uOpacity.value;
        materialRef.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
            currentOpacity,
            targetOpacity,
            0.1
        );

        // Scale up as approach
        const scale = THREE.MathUtils.clamp(1.0 + (45 - dist) / 35, 0.9, 1.6);
        meshRef.current.scale.setScalar(scale);

        // Billboard - always face camera
        meshRef.current.lookAt(camera.position);

        // Update tint
        const targetTint = new THREE.Color(data.starTint);
        materialRef.current.uniforms.uTint.value.lerp(targetTint, 0.03);

        // Request next frame
        invalidate();
    });

    return (
        <mesh ref={meshRef} position={[position.x, position.y, position.z]}>
            <planeGeometry args={[CONFIG.PHOTO_SCALE * aspect, CONFIG.PHOTO_SCALE]} />
            <photoMaterial
                ref={materialRef}
                uTexture={texture}
                uOpacity={0}
                uTint={new THREE.Color(1, 1, 1)}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
}
