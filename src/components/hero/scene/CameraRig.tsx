"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroDrivers } from "./types";

/**
 * CameraRig – cinematische Kameraführung aus mehreren Eingaben:
 *  • intro (0→1, GSAP): Kamera fährt aus der Nahaufnahme der spiegelnden
 *    Oberfläche zurück und enthüllt die ganze Felge (Szene 1–2).
 *  • scroll (0→1): mehrere Kamera-Beats (Präsentation → Zoom → Morph-
 *    Ansicht → Ausfahrt), Szene 3–5.
 *  • pointer: bewegt primär die Reflexe über das Chrom (Environment-
 *    Rotation), nicht die Felge selbst.
 *
 * Reduzierte Bewegung: Intro/Parallax werden übersprungen.
 */

const INTRO_POS = new THREE.Vector3(0.4, -0.12, 2.55);
const INTRO_TARGET = new THREE.Vector3(0.75, 0.28, 0.55);

// Kamera-Keyframes entlang des Scroll-Fortschritts (Szene 3 → 5)
type Key = { t: number; pos: THREE.Vector3; target: THREE.Vector3 };
const KEYS: Key[] = [
  // Szene 3 – elegante Präsentation
  { t: 0.0, pos: new THREE.Vector3(0, 0.1, 7.1), target: new THREE.Vector3(0, 0, 0) },
  // Szene 4 – cinematischer Zoom auf die Chromoberfläche
  { t: 0.34, pos: new THREE.Vector3(0.55, 0.05, 3.7), target: new THREE.Vector3(0.35, 0.08, 0.2) },
  // Szene 5 – Beauty-Ansicht für den Vorher/Nachher-Morph
  { t: 0.56, pos: new THREE.Vector3(-0.1, 0.05, 5.2), target: new THREE.Vector3(0, 0, 0) },
  { t: 0.8, pos: new THREE.Vector3(-0.1, 0.05, 5.2), target: new THREE.Vector3(0, 0, 0) },
  // Ausfahrt – Übergabe an den nächsten Abschnitt
  { t: 1.0, pos: new THREE.Vector3(-2.9, 0.7, 4.6), target: new THREE.Vector3(0.5, -0.15, 0) },
];

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}
function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

// Interpoliert Position/Ziel entlang der Keyframes
function sampleKeys(p: number, outPos: THREE.Vector3, outTgt: THREE.Vector3) {
  if (p <= KEYS[0].t) {
    outPos.copy(KEYS[0].pos);
    outTgt.copy(KEYS[0].target);
    return;
  }
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (p >= a.t && p <= b.t) {
      const k = smoothstep((p - a.t) / (b.t - a.t));
      outPos.copy(a.pos).lerp(b.pos, k);
      outTgt.copy(a.target).lerp(b.target, k);
      return;
    }
  }
  outPos.copy(KEYS[KEYS.length - 1].pos);
  outTgt.copy(KEYS[KEYS.length - 1].target);
}

const _pos = new THREE.Vector3();
const _tgt = new THREE.Vector3();

export function CameraRig({ drivers }: { drivers: HeroDrivers }) {
  const { camera, scene } = useThree();
  const px = useRef(0);
  const py = useRef(0);
  const envX = useRef(0);
  const envY = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const introP = drivers.reduced ? 1 : drivers.intro.current;
    const scrollP = drivers.scroll.current;

    // Scroll-Beats
    sampleKeys(scrollP, _pos, _tgt);

    // Intro-Blend: aus der Nahaufnahme in die Szene-3-Pose
    _pos.lerp(INTRO_POS, 1 - introP);
    _tgt.lerp(INTRO_TARGET, 1 - introP);

    // Sanfter Maus-Parallax (dezent, klingt beim Scrollen aus)
    if (!drivers.reduced) {
      const infl = introP * (1 - smoothstep(scrollP) * 0.7);
      px.current = damp(px.current, drivers.pointer.current.x, 3, dt);
      py.current = damp(py.current, drivers.pointer.current.y, 3, dt);
      _pos.x += px.current * 0.26 * infl;
      _pos.y += -py.current * 0.18 * infl;
    }

    camera.position.x = damp(camera.position.x, _pos.x, 6, dt);
    camera.position.y = damp(camera.position.y, _pos.y, 6, dt);
    camera.position.z = damp(camera.position.z, _pos.z, 6, dt);
    camera.lookAt(_tgt);

    // Reflexe über das Chrom wandern lassen (Environment-Rotation)
    if (!drivers.reduced && scene.environmentRotation) {
      envX.current = damp(envX.current, drivers.pointer.current.y * 0.15, 2, dt);
      envY.current = damp(
        envY.current,
        drivers.pointer.current.x * 0.3 + smoothstep(scrollP) * 0.4,
        2,
        dt
      );
      scene.environmentRotation.set(envX.current, envY.current, 0);
    }
  });

  return null;
}
