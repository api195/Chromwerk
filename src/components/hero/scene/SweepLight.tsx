"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroDrivers } from "./types";

/**
 * SweepLight – der "Politur-Lichtsweep" aus Szene 5.
 * ------------------------------------------------------------------
 * Ein wanderndes Licht streicht über die (noch matte) Felgenoberfläche
 * und erzeugt einen sichtbaren, laufenden Glanz-Highlight – während das
 * Material parallel von matt zu Hochglanz morpht. Zusätzlich eine feine,
 * additive Lichtlinie, die (mit Bloom) als sichtbarer Strahl über das
 * Bild zieht.
 *
 * Gesteuert über drivers.sweep (0→1).
 */
export function SweepLight({ drivers }: { drivers: HeroDrivers }) {
  const light = useRef<THREE.PointLight>(null);
  const bar = useRef<THREE.Mesh>(null);
  const barMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    const s = drivers.sweep.current;
    // Sichtbarkeit: nur während des Sweeps, an den Rändern ausgeblendet
    const vis = Math.sin(Math.PI * THREE.MathUtils.clamp(s, 0, 1));
    const x = THREE.MathUtils.lerp(-3.2, 3.2, s);

    if (light.current) {
      light.current.position.x = x;
      light.current.intensity = vis * 26;
    }
    if (bar.current && barMat.current) {
      bar.current.position.x = THREE.MathUtils.lerp(-2.6, 2.6, s);
      bar.current.rotation.z = 0.12; // leicht schräger Lichtstrich
      barMat.current.opacity = vis * 0.9;
      bar.current.visible = vis > 0.01;
    }
  });

  return (
    <group>
      {/* Wanderndes Licht (erzeugt laufenden Glanz auf der Oberfläche) */}
      <pointLight
        ref={light}
        position={[0, 0.4, 2.6]}
        intensity={0}
        distance={14}
        decay={2}
        color="#fff4e6"
      />
      {/* Sichtbare, additive Lichtlinie (Lichtstrich) – zeichnet über allem */}
      <mesh ref={bar} position={[0, 0, 0.6]} visible={false} renderOrder={999}>
        <planeGeometry args={[0.2, 7]} />
        <meshBasicMaterial
          ref={barMat}
          color="#ffffff"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
