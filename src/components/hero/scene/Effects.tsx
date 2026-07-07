"use client";

import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  SMAA,
  N8AO,
} from "@react-three/postprocessing";

/**
 * Effects – cinematisches Post-Processing.
 * ------------------------------------------------------------------
 * high-Tier (Desktop): AO + Bloom + Depth of Field + Vignette + SMAA
 * low-Tier (Mobil):    nur dezentes Bloom + Vignette (Performance)
 *
 * Bloom bringt die Chrom-Glanzlichter & Partikel zum Leuchten,
 * Depth of Field erzeugt die filmische Tiefenunschärfe.
 */
export function Effects({ tier }: { tier: "high" | "low" }) {
  if (tier === "low") {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.75}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={0} enableNormalPass>
      <N8AO
        aoRadius={1.0}
        intensity={1.5}
        distanceFalloff={1}
        halfRes
        color="#000000"
      />
      <Bloom
        intensity={0.42}
        luminanceThreshold={0.85}
        luminanceSmoothing={0.2}
        mipmapBlur
        radius={0.5}
      />
      <DepthOfField
        target={[0, 0, 0]}
        focalLength={0.012}
        bokehScale={2}
        height={420}
      />
      <Vignette eskil={false} offset={0.2} darkness={0.92} />
      <SMAA />
    </EffectComposer>
  );
}
