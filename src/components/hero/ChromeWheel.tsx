"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ChromeWheel – prozedurale 3D-Chromfelge (Platzhalter-Modell).
 * ------------------------------------------------------------------
 * DEIN EIGENES FELGENMODELL EINBINDEN:
 * 1. Lege ein GLB/GLTF-Modell ab: /public/models/felge.glb
 * 2. Ersetze den Inhalt von <group> unten durch:
 *
 *      import { useGLTF } from "@react-three/drei";
 *      const { scene } = useGLTF("/models/felge.glb");
 *      return <primitive object={scene} ref={group} />;
 *
 * Die Rotationslogik (Scroll + Parallax) funktioniert unverändert weiter.
 *
 * `scrollRef` enthält den Scroll-Fortschritt (0..1) und dreht die Felge
 * synchron zum Scrollen. Der Pointer erzeugt einen leichten Parallax.
 */

// Zentrale Chrom-Materialeigenschaften (an einer Stelle anpassbar)
const CHROME = {
  color: "#e9edf3",
  metalness: 1,
  roughness: 0.12,
  envMapIntensity: 1.35,
};

export function ChromeWheel({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const spokeCount = 5;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    // Scroll dreht die Felge, dazu eine dezente Leerlauf-Rotation
    group.current.rotation.z = -scroll * Math.PI * 2.4 - t * 0.12;

    // Pointer-Parallax (weich interpoliert)
    const targetX = state.pointer.y * 0.22 - 0.12;
    const targetY = state.pointer.x * 0.28;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.05
    );
    // rotation.y separat auf einer Hilfsgruppe wäre sauberer; hier bewusst
    // klein gehalten, damit die Felge frontal bleibt.
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      targetY * 0.3,
      0.05
    );
  });

  return (
    <group ref={group} scale={1.15}>
      {/* Reifen */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[2.05, 0.36, 32, 72]} />
        <meshStandardMaterial color="#0c0c0f" roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Chrom-Außenlippe */}
      <mesh>
        <torusGeometry args={[1.82, 0.13, 32, 72]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>

      {/* Felgenbett (Barrel) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.18]}>
        <cylinderGeometry args={[1.86, 1.86, 0.55, 72, 1, true]} />
        <meshStandardMaterial
          color="#b9bec8"
          metalness={1}
          roughness={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Speichen */}
      {Array.from({ length: spokeCount }).map((_, i) => (
        <group key={i} rotation={[0, 0, (i / spokeCount) * Math.PI * 2]}>
          <mesh position={[0, 1.0, 0.06]}>
            <boxGeometry args={[0.32, 1.85, 0.26]} />
            <meshStandardMaterial {...CHROME} />
          </mesh>
          {/* feine Kante für mehr Tiefe */}
          <mesh position={[0, 1.0, 0.19]}>
            <boxGeometry args={[0.1, 1.7, 0.05]} />
            <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.05} />
          </mesh>
        </group>
      ))}

      {/* Nabe */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.14]}>
        <cylinderGeometry args={[0.58, 0.58, 0.34, 48]} />
        <meshStandardMaterial {...CHROME} />
      </mesh>

      {/* Center-Cap (hier später Logo-Textur setzen) */}
      <mesh position={[0, 0, 0.32]}>
        <circleGeometry args={[0.42, 48]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.33]}>
        <ringGeometry args={[0.38, 0.42, 48]} />
        <meshStandardMaterial color="#e11d2a" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Radbolzen */}
      {Array.from({ length: spokeCount }).map((_, i) => {
        const a = (i / spokeCount) * Math.PI * 2 + Math.PI / spokeCount;
        const r = 0.34;
        return (
          <mesh
            key={`bolt-${i}`}
            position={[Math.cos(a) * r, Math.sin(a) * r, 0.34]}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
            <meshStandardMaterial color="#d7dae1" metalness={1} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Bremsscheibe + roter Bremssattel (hinter der Felge) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.35]}>
        <cylinderGeometry args={[1.25, 1.25, 0.12, 48]} />
        <meshStandardMaterial color="#5b5f66" metalness={0.9} roughness={0.5} />
      </mesh>
      <mesh position={[1.0, -0.35, -0.3]}>
        <boxGeometry args={[0.34, 0.7, 0.4]} />
        <meshStandardMaterial
          color="#e11d2a"
          metalness={0.5}
          roughness={0.35}
          emissive="#3a0407"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
