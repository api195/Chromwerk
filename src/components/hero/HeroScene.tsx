"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { ChromeWheel } from "./ChromeWheel";

/**
 * HeroScene – 3D-Bühne für die Chromfelge.
 * ------------------------------------------------------------------
 * Die Reflexionen (Chrom-Look) entstehen aus prozeduralen Lightformern –
 * KEINE externen HDR-Dateien nötig, funktioniert komplett offline.
 *
 * Für ECHTE Spiegelungen (z. B. eine Köln-Skyline auf dem Chrom):
 * Lege eine equirectangulare Textur ab und nutze:
 *   <Environment files="/textures/koeln-hdr.jpg" />
 * anstelle des <Environment>-Blocks mit Lightformern.
 */
export function HeroScene({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={1.3} />
      <spotLight
        position={[-6, 4, 4]}
        angle={0.4}
        penumbra={1}
        intensity={1.1}
        color="#ffd0d4"
      />

      <ChromeWheel scrollRef={scrollRef} />

      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.55}
        scale={12}
        blur={2.6}
        far={5}
        color="#000000"
      />

      {/* Prozedurale Studio-Umgebung für Chrom-Reflexionen */}
      <Environment resolution={256}>
        <group rotation={[0, 0, 0]}>
          {/* Große weiche Lichtflächen = Softbox-Reflexe */}
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[0, 4, 3]}
            scale={[8, 3, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            position={[-5, 1, 2]}
            scale={[3, 6, 1]}
            color="#cdd3dc"
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            position={[5, 1, 2]}
            scale={[3, 6, 1]}
            color="#cdd3dc"
          />
          {/* Warme Akzent-Reflexe (Chromwerk-Rot) */}
          <Lightformer
            form="circle"
            intensity={1.8}
            position={[3, -2, 4]}
            scale={2}
            color="#ff3b48"
          />
          {/* Streifen-Highlights, die beim Drehen über das Chrom wandern */}
          <Lightformer
            form="ring"
            intensity={1.2}
            position={[0, 0, 6]}
            scale={5}
            color="#ffffff"
          />
        </group>
      </Environment>
    </Canvas>
  );
}
