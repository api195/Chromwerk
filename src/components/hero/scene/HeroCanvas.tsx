"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { ChromeRim } from "./ChromeRim";
import { StudioEnvironment } from "./StudioEnvironment";
import { Dust } from "./Dust";
import { LightShafts } from "./LightShafts";
import { SweepLight } from "./SweepLight";
import { Effects } from "./Effects";
import { CameraRig } from "./CameraRig";
import type { HeroDrivers } from "./types";
import type { DeviceTier } from "@/lib/useDeviceTier";

/**
 * HeroCanvas – komponiert die komplette 3D-Bühne.
 * Qualität passt sich der Geräteeinstufung an (tier).
 */
export function HeroCanvas({
  drivers,
  device,
  disableFx = false,
}: {
  drivers: HeroDrivers;
  device: DeviceTier;
  /** Debug: Post-Processing abschalten (?nofx=1) */
  disableFx?: boolean;
}) {
  const high = device.tier === "high";

  return (
    <Canvas
      dpr={[1, device.maxDpr]}
      shadows={high}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0.4, -0.12, 2.55], fov: 34, near: 0.1, far: 100 }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color("#050506");
        scene.fog = new THREE.FogExp2("#050506", 0.055);
      }}
    >
      <CameraRig drivers={drivers} />

      {/* Grund-/Studiolicht (Reflexionen kommen aus dem Environment) */}
      <ambientLight intensity={0.15} />
      <spotLight
        position={[6, 8, 6]}
        angle={0.35}
        penumbra={1}
        intensity={high ? 2.4 : 1.6}
        color="#ffffff"
        castShadow={high}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />
      <spotLight
        position={[-7, 3, 2]}
        angle={0.5}
        penumbra={1}
        intensity={1.1}
        color="#ffd9dc"
      />

      <ChromeRim animate={!device.reduced} drivers={drivers} />

      {/* Politur-Lichtsweep (Szene 5) */}
      <SweepLight drivers={drivers} />

      {/* Weicher Kontaktschatten als "Studioboden" */}
      <ContactShadows
        position={[0, -2.55, 0]}
        opacity={0.6}
        scale={16}
        blur={3}
        far={6}
        resolution={high ? 1024 : 512}
        color="#000000"
      />

      {/* Atmosphäre */}
      {!device.reduced && <Dust count={high ? 380 : 140} />}
      <LightShafts />

      <StudioEnvironment resolution={high ? 512 : 256} />

      {/* Cinematisches Post-Processing */}
      {!disableFx && <Effects tier={device.tier} />}

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
