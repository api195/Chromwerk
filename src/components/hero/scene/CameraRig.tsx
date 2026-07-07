"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroDrivers } from "./types";

/**
 * CameraRig – steuert die Kamera cinematisch aus mehreren Eingaben:
 *  • introRef  (0→1, GSAP): Kamera fährt aus der Nahaufnahme der
 *    spiegelnden Oberfläche langsam zurück und enthüllt die ganze Felge.
 *  • scrollRef (0→1): Kamera fährt beim Scrollen elegant an der Felge
 *    vorbei; Reflexionen verändern sich.
 *  • pointerRef: bewegt primär die Reflexe über das Chrom
 *    (Environment-Rotation), nicht die Felge selbst.
 *
 * Reduzierte Bewegung: Intro/Parallax werden übersprungen (statische Pose).
 */

// Kamera-Posen (Position + Blickziel)
const INTRO_POS = new THREE.Vector3(0.4, -0.12, 2.55);
const INTRO_TARGET = new THREE.Vector3(0.75, 0.28, 0.55);
const BASE_POS = new THREE.Vector3(0, 0.1, 7.1);
const BASE_TARGET = new THREE.Vector3(0, 0, 0);
const SCROLL_POS = new THREE.Vector3(-2.9, 0.7, 4.5);
const SCROLL_TARGET = new THREE.Vector3(0.5, -0.15, 0);

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

// Frameratenunabhängiges Dämpfen
function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

const _pos = new THREE.Vector3();
const _tgt = new THREE.Vector3();
const _a = new THREE.Vector3();

export function CameraRig({ drivers }: { drivers: HeroDrivers }) {
  const { camera, scene } = useThree();
  const px = useRef(0);
  const py = useRef(0);
  const envX = useRef(0);
  const envY = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const introP = drivers.reduced ? 1 : drivers.intro.current;
    const scrollP = smoothstep(drivers.scroll.current);

    // Position: intro (nah → basis), dann scroll (basis → vorbei)
    _pos.copy(INTRO_POS).lerp(BASE_POS, introP);
    _a.copy(BASE_POS).lerp(SCROLL_POS, scrollP);
    _pos.lerp(_a, scrollP);

    // Blickziel analog
    _tgt.copy(INTRO_TARGET).lerp(BASE_TARGET, introP);
    _a.copy(BASE_TARGET).lerp(SCROLL_TARGET, scrollP);
    _tgt.lerp(_a, scrollP);

    // Sanfter Maus-Parallax (nur nach Intro, dezent)
    if (!drivers.reduced) {
      const infl = introP * (1 - scrollP * 0.6);
      px.current = damp(px.current, drivers.pointer.current.x, 3, dt);
      py.current = damp(py.current, drivers.pointer.current.y, 3, dt);
      _pos.x += px.current * 0.28 * infl;
      _pos.y += -py.current * 0.2 * infl;
    }

    // Kamera weich nachführen
    camera.position.x = damp(camera.position.x, _pos.x, 6, dt);
    camera.position.y = damp(camera.position.y, _pos.y, 6, dt);
    camera.position.z = damp(camera.position.z, _pos.z, 6, dt);
    camera.lookAt(_tgt);

    // Reflexe über das Chrom wandern lassen (Environment-Rotation)
    if (!drivers.reduced && scene.environmentRotation) {
      envX.current = damp(envX.current, drivers.pointer.current.y * 0.15, 2, dt);
      envY.current = damp(
        envY.current,
        drivers.pointer.current.x * 0.3 + scrollP * 0.5,
        2,
        dt
      );
      scene.environmentRotation.set(envX.current, envY.current, 0);
    }
  });

  return null;
}
