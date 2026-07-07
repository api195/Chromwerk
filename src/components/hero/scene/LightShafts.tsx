"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * LightShafts – weiche, additive Lichtstrahlen (Volumen-Licht-Eindruck).
 * Zusammen mit Bloom entsteht der cinematische "Studio-Nebel"-Look.
 */
export function LightShafts() {
  const group = useRef<THREE.Group>(null);

  // Vertikaler Gradient als Alpha (per Canvas erzeugt)
  const texture = useMemo(() => {
    const w = 32;
    const h = 256;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "rgba(255,255,255,0.0)");
    g.addColorStop(0.5, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0.0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // horizontale weiche Kanten
    const g2 = ctx.createLinearGradient(0, 0, w, 0);
    g2.addColorStop(0, "rgba(0,0,0,1)");
    g2.addColorStop(0.5, "rgba(0,0,0,0)");
    g2.addColorStop(1, "rgba(0,0,0,1)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);
    return new THREE.CanvasTexture(c);
  }, []);

  const shafts = useMemo(
    () => [
      { pos: [-2.4, 1.5, -2] as const, rot: 0.35, scale: [1.4, 9, 1] as const, o: 0.1 },
      { pos: [1.8, 2, -2.5] as const, rot: -0.25, scale: [1.8, 10, 1] as const, o: 0.08 },
      { pos: [0.2, 1, -1.5] as const, rot: 0.1, scale: [1.1, 8, 1] as const, o: 0.06 },
    ],
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    // sehr langsames "Atmen" der Strahlen
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = shafts[i].o * (0.7 + Math.sin(t * 0.3 + i) * 0.3);
    });
  });

  return (
    <group ref={group}>
      {shafts.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={[0, 0, s.rot]} scale={s.scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={s.o}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            color="#dfe6f5"
          />
        </mesh>
      ))}
    </group>
  );
}
