"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Dust – feine, langsam schwebende Staubpartikel, die das Licht einfangen.
 * Erzeugt zusammen mit Bloom die "Partikel in Lichtstrahlen"-Atmosphäre.
 */
export function Dust({ count = 380 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  // Weiche runde Partikel-Textur (per Canvas erzeugt – kein externes Asset)
  const texture = useMemo(() => {
    const size = 64;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,255,255,0.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      speeds[i] = 0.02 + Math.random() * 0.06;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta; // langsam nach oben treiben
      arr[i * 3] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.0006;
      if (arr[i * 3 + 1] > 4.6) arr[i * 3 + 1] = -4.6; // zurücksetzen
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#cdd6e6"
      />
    </points>
  );
}
