"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * StudioEnvironment – prozedurale HDRI-artige Studioumgebung.
 * ------------------------------------------------------------------
 * KONTRASTSTARK: helle Lichtbänder auf dunklem Grund. Genau dieser
 * Kontrast erzeugt den echten CHROM-Look (helle Streifen + tiefe dunkle
 * Zonen), statt einer flach-grauen Oberfläche.
 *
 * Enthält eine als Lichtstreifen geformte KÖLN-SKYLINE (mit zwei hohen
 * Dom-Spitzen), die sich auf der Felge spiegelt – die "Stadt-Reflexion".
 *
 * ECHTES HDRI SPÄTER: <Environment files="/hdri/studio.hdr" /> nutzen.
 */

const skyline = [
  0.5, 0.9, 0.6, 1.2, 0.7, 1.5, 0.9, 2.6, 2.9, 1.0, 1.4, 0.7, 1.1, 0.6, 0.9,
  1.3, 0.65, 1.0,
];

export function StudioEnvironment({
  resolution = 512,
}: {
  resolution?: number;
}) {
  return (
    <Environment resolution={resolution} frames={1} background={false}>
      {/* dunkler Studio-Grund */}
      <color attach="background" args={["#040405"]} />

      {/* Sehr helle Key-Softbox von oben (breiter Lichtbogen im Chrom) */}
      <Lightformer
        form="rect"
        intensity={8}
        position={[0, 7, 2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[15, 9, 1]}
        color="#ffffff"
      />

      {/* Großer weicher Fill HINTER der Kamera – hellt die kamerazugewandten
          Chromflächen zu hellem Silber auf (verhindert "dunkles" Chrom) */}
      <Lightformer
        form="rect"
        intensity={2.7}
        position={[0, 1, 9]}
        scale={[20, 13, 1]}
        color="#e9eef6"
      />

      {/* Scharfe horizontale Strip-Lights → knackige Highlight-Bänder */}
      <Lightformer
        form="rect"
        intensity={18}
        position={[0, 2.2, 3.5]}
        scale={[9, 0.35, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={12}
        position={[0, -1.6, 3.2]}
        scale={[7, 0.25, 1]}
        color="#eaf0f8"
      />

      {/* Vertikale Seiten-Strips für Kanten-Reflexe */}
      <Lightformer
        form="rect"
        intensity={10}
        position={[-4.5, 0.5, 2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[6, 0.5, 1]}
        color="#ffffff"
      />
      <Lightformer
        form="rect"
        intensity={10}
        position={[4.5, 0.5, 2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6, 0.5, 1]}
        color="#ffffff"
      />

      {/* Heller Bodenreflex (Bounce) */}
      <Lightformer
        form="rect"
        intensity={2.4}
        position={[0, -5, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 6, 1]}
        color="#9aa3b2"
      />

      {/* KÖLN-SKYLINE als Reflexion (helle Lichtstreifen) */}
      <group position={[0, -1.2, -4]}>
        {skyline.map((h, i) => {
          const spread = (i / (skyline.length - 1) - 0.5) * 13;
          const isDom = h > 2.3;
          return (
            <Lightformer
              key={i}
              form="rect"
              intensity={isDom ? 3.2 : 2.2}
              position={[spread, h * 0.5 - 0.4, 0]}
              scale={[0.22, h, 1]}
              color={isDom ? "#f0f4fb" : "#cdd6e6"}
            />
          );
        })}
      </group>

      {/* Marken-Akzente (dezent, für Farbe im Chrom) */}
      <Lightformer
        form="circle"
        intensity={2.2}
        position={[3.8, -2.2, 3]}
        scale={1.8}
        color="#ff2a3a"
      />
      <Lightformer
        form="circle"
        intensity={1.2}
        position={[-4.2, 2.5, 2]}
        scale={1.4}
        color="#4f83c8"
      />
    </Environment>
  );
}
