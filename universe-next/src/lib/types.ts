// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE JOURNEY - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

import { Vector3 } from 'three';

export interface PhotoData {
    src: string;
    title: string;
    time: string;
    desc: string;
    temp: string;
    themeColor: string;
    fogDensity: number;
    starTint: string;
    exposure: number;
}

export interface ScrollState {
    progress: number;
    currentPhotoIndex: number;
    setProgress: (progress: number) => void;
}

export interface WaypointData {
    position: Vector3;
    lookAt: Vector3;
}
