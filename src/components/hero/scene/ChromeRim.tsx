"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroDrivers } from "./types";

// Materialzustände für den Vorher/Nachher-Morph
const MATTE = {
  color: new THREE.Color("#42444a"), // stumpfes, dunkel-oxidiertes Gunmetal
  roughness: 0.74,
  metalness: 0.65,
  env: 0.3,
};
const MIRROR = {
  color: new THREE.Color("#ffffff"), // perfektes Hochglanz-Chrom
  roughness: 0.02,
  metalness: 1,
  env: 2.6,
};
const _col = new THREE.Color();

/**
 * ChromeRim – fotorealistische Chromfelge (prozedural, PBR).
 * ------------------------------------------------------------------
 * • Spiegelndes Chrom (metalness 1, roughness ~0.02) – die Reflexionen
 *   kommen aus der kontraststarken Studio-Umgebung (StudioEnvironment).
 * • 3/4-Ansicht (geneigt) für Tiefe; elegante, schlanke Twin-Speichen.
 * • Echte Tiefe: zurückgesetztes Felgenbett (Lathe-Dish), Lippe, Nabe,
 *   Radbolzen, Bremsscheibe + roter Bremssattel, Reifen.
 *
 * EIGENES MODELL: Inhalt durch useGLTF("/models/felge.glb") ersetzen –
 * Neige-/Schwebe-/Rotationslogik bleibt nutzbar.
 */

// Schlanke, sich verjüngende Speiche als 2D-Form (wird extrudiert)
function makeArmShape(
  rInner: number,
  rOuter: number,
  wInner: number,
  wOuter: number
) {
  const s = new THREE.Shape();
  s.moveTo(-wInner / 2, rInner);
  s.lineTo(-wOuter / 2, rOuter);
  s.quadraticCurveTo(0, rOuter + wOuter * 0.6, wOuter / 2, rOuter);
  s.lineTo(wInner / 2, rInner);
  s.quadraticCurveTo(0, rInner - wInner * 0.4, -wInner / 2, rInner);
  return s;
}

// Felgenbett (Dish) + Lippe als LatheGeometry-Profil (Radius, Achsposition)
function makeRimProfile() {
  return [
    new THREE.Vector2(0.62, 0.3),
    new THREE.Vector2(1.2, 0.16),
    new THREE.Vector2(1.55, 0.06),
    new THREE.Vector2(1.78, 0.14),
    new THREE.Vector2(1.9, 0.24),
    new THREE.Vector2(1.94, 0.12),
    new THREE.Vector2(1.94, -0.16),
    new THREE.Vector2(1.86, -0.5),
    new THREE.Vector2(1.7, -0.74),
    new THREE.Vector2(1.5, -0.8),
  ];
}

export function ChromeRim({
  animate = true,
  drivers,
}: {
  animate?: boolean;
  drivers?: HeroDrivers;
}) {
  const tilt = useRef<THREE.Group>(null); // statische 3/4-Neigung + Schweben
  const spin = useRef<THREE.Group>(null); // langsame Eigenrotation

  const geo = useMemo(() => {
    const opts: THREE.ExtrudeGeometryOptions = {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 5,
      steps: 1,
      curveSegments: 8,
    };
    const arm = new THREE.ExtrudeGeometry(
      makeArmShape(0.5, 1.72, 0.09, 0.2),
      opts
    );
    arm.translate(0, 0, -opts.depth! / 2);
    arm.computeVertexNormals();

    const rim = new THREE.LatheGeometry(makeRimProfile(), 160);
    rim.computeVertexNormals();

    return { arm, rim };
  }, []);

  // Spiegelndes Chrom-Material (zentral anpassbar)
  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        metalness: 1,
        roughness: 0.02,
        envMapIntensity: 2.6,
      }),
    []
  );
  const chromeSoft = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#eef1f6"),
        metalness: 1,
        roughness: 0.12,
        envMapIntensity: 2.0,
      }),
    []
  );
  const tire = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0b0b0d"),
        metalness: 0.1,
        roughness: 0.9,
      }),
    []
  );
  const caliper = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#d81322"),
        metalness: 0.3,
        roughness: 0.35,
        clearcoat: 1,
        clearcoatRoughness: 0.25,
      }),
    []
  );

  // 5 Doppelspeichen (10 Arme), leicht divergierend
  const arms = useMemo(() => {
    const out: number[] = [];
    const div = 0.14; // Divergenz der Paare (rad)
    for (let i = 0; i < 5; i++) {
      const base = (i / 5) * Math.PI * 2;
      out.push(base - div, base + div);
    }
    return out;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (tilt.current) {
      // Sanftes Schweben
      tilt.current.position.y = Math.sin(t * 0.5) * 0.05;
      // Minimales "Leben" in der Neigung
      tilt.current.rotation.x = -0.42 + Math.sin(t * 0.3) * 0.02;
      tilt.current.rotation.y = 0.38 + Math.cos(t * 0.25) * 0.02;
    }
    if (spin.current && animate) {
      spin.current.rotation.z = t * 0.045; // sehr langsam & elegant
    }

    // Vorher/Nachher-Morph: Material zwischen matt und Hochglanz überblenden
    if (drivers) {
      const m = drivers.morph.current;
      chrome.roughness = THREE.MathUtils.lerp(MATTE.roughness, MIRROR.roughness, m);
      chrome.metalness = THREE.MathUtils.lerp(MATTE.metalness, MIRROR.metalness, m);
      chrome.envMapIntensity = THREE.MathUtils.lerp(MATTE.env, MIRROR.env, m);
      chrome.color.copy(_col.copy(MATTE.color).lerp(MIRROR.color, m));
      // Nabe/Cap folgt dezent mit
      chromeSoft.roughness = THREE.MathUtils.lerp(0.5, 0.12, m);
      chromeSoft.envMapIntensity = THREE.MathUtils.lerp(0.5, 2.0, m);
    }
  });

  return (
    // Äußere Gruppe: 3/4-Neigung + Schweben
    <group ref={tilt} rotation={[-0.42, 0.38, 0]} scale={0.84}>
      {/* Reifen (schlanke Flanke – die Felge dominiert) */}
      <mesh material={tire} castShadow receiveShadow>
        <torusGeometry args={[1.98, 0.17, 32, 140]} />
      </mesh>
      <mesh material={tire} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.3, 140, 1, true]} />
      </mesh>

      {/* Innere Gruppe: rotierende Felge */}
      <group ref={spin}>
        {/* Felgenbett + Lippe (Chrom) */}
        <mesh
          material={chrome}
          geometry={geo.rim}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        />

        {/* Doppelspeichen */}
        {arms.map((a, i) => (
          <mesh
            key={i}
            geometry={geo.arm}
            material={chrome}
            rotation={[0, 0, a]}
            position={[0, 0, 0.16]}
            castShadow
            receiveShadow
          />
        ))}

        {/* Nabe */}
        <mesh material={chrome} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.56, 0.64, 0.42, 64]} />
        </mesh>

        {/* Center-Cap (Logo-Platzhalter) */}
        <mesh material={chromeSoft} position={[0, 0, 0.42]}>
          <cylinderGeometry args={[0.42, 0.42, 0.05, 64]} />
        </mesh>
        <mesh position={[0, 0, 0.455]}>
          <ringGeometry args={[0.36, 0.42, 64]} />
          <meshStandardMaterial color="#d81322" metalness={0.5} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.456]}>
          <ringGeometry args={[0.08, 0.11, 48]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.08} side={THREE.DoubleSide} />
        </mesh>

        {/* Radbolzen */}
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2 + Math.PI / 5;
          const r = 0.4;
          return (
            <mesh
              key={`bolt-${i}`}
              material={chrome}
              position={[Math.cos(a) * r, Math.sin(a) * r, 0.4]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.055, 0.055, 0.1, 6]} />
            </mesh>
          );
        })}
      </group>

      {/* Bremsscheibe + roter Bremssattel (hinter der Felge, dreht nicht) */}
      <mesh material={chromeSoft} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.62]}>
        <cylinderGeometry args={[1.4, 1.4, 0.1, 64]} />
      </mesh>
      <mesh material={caliper} position={[1.15, -0.4, -0.48]}>
        <boxGeometry args={[0.34, 0.82, 0.44]} />
      </mesh>
    </group>
  );
}
