"use client";

// ChromeRimScroll
// ============================================================
// Hochglanz-Chrom-Felge als Scroll-Animation (React Three Fiber).
// Die Felge überschlägt sich beim Scrollen (2 volle Flips über die Seite)
// und dient als fixierter 3D-Hintergrund, über den der Inhalt scrollt.
//
// Qualitätsstufen (Auswahl in WheelBackground.tsx):
//  • "high" – volle Szene: Clearcoat-Chrom, Bloom, Bodenschatten.
//             Für Apple Silicon und dedizierte Grafikkarten.
//  • "lite" – gleiche Szene ohne Bloom/Schatten, einfacheres Material,
//             niedrigere Pixeldichte. Für integrierte Grafik (Iris Xe …).
//
// Performance-Konzept:
//  • frameloop="demand" – es wird NUR gerendert, wenn sich wirklich etwas
//    bewegt (Scrollen + Nachlauf der Glättung). Im Ruhezustand kostet die
//    Szene 0 % GPU/CPU.
//  • Keine Shadow-Maps: der Bodenschatten kommt von ContactShadows, eine
//    zusätzliche Schattenkarte pro Bild wäre reine Verschwendung.
//  • Bildraten-Wächter (FrameGuard): Bevor die Felge eingeblendet wird,
//    misst die Szene unsichtbar, wie lange das Gerät wirklich pro Bild
//    braucht. Ist es zu langsam, wird still auf "lite" bzw. ganz auf den
//    statischen Hintergrund zurückgeschaltet – der Besucher sieht nie eine
//    ruckelnde Felge. Während des Scrollens wird weiter gemessen.
//  • Scroll-Position kommt aus der zentralen Scroll-Quelle (kein eigener
//    Listener, kein Layout-Read pro Frame).
//
// Modell: /public/chrom_felge.glb  (austauschbar)
// ============================================================

import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { Canvas, addAfterEffect, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { subscribeScroll } from "@/lib/scroll";
import { MODEL_URL, type WheelQuality } from "./wheelConfig";

// ---------- Chrom-Material (ein Material für ALLE Felgen-Meshes) ----------
const CHROME = {
  color: new THREE.Color("#f4f6f8"),
  metalness: 1.0,
  roughness: 0.05,
  envMapIntensity: 1.1,
};
// Clearcoat berechnet eine zweite Glanzschicht pro Pixel – schön, aber auf
// integrierter Grafik spürbar teuer. Die "lite"-Stufe nutzt deshalb das
// einfachere Standard-Material (optisch fast gleich bei Metall).
const chromeMaterialHigh = new THREE.MeshPhysicalMaterial({
  ...CHROME,
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
});
const chromeMaterialLite = new THREE.MeshStandardMaterial(CHROME);

// ---------- Kontinuierlicher Überschlag (oryzo-Style) ----------
const FLIPS = 2;
const SPIN_AXIS = new THREE.Vector3(1, 0.35, 0).normalize();
const BASE_QUAT = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.12, 0, -0.08));
const _spin = new THREE.Quaternion();

/** Ab dieser Restdifferenz gilt die Animation als „angekommen". */
const SETTLE_EPSILON = 0.00015;

// ---------- Bildraten-Wächter ----------
/**
 * Aufwärmphase: maximale echte Kosten (CPU + Grafikkarte) pro Bild. Mehr als
 * ~18 ms nur für den Hintergrund lassen bei 60 Hz keine Luft mehr für den
 * Rest der Seite.
 */
const SLOW_COST_MS = 18;
/** Deutlich zu langsam → schon nach wenigen Bildern abbrechen. */
const VERY_SLOW_COST_MS = 35;
/** Beim Scrollen: Median-Bildabstand, ab dem es ruckelt (≈ unter 36 fps). */
const SLOW_FRAME_MS = 28;
/** Anzahl Bilder pro Messfenster. */
const SAMPLE_WINDOW = 30;
/** Die ersten Bilder enthalten Shader-Kompilierung & Uploads → ignorieren. */
const WARMUP_SKIP = 3;
/** Längere Abstände sind Ruhephasen der Szene, keine langsamen Bilder. */
const IDLE_GAP_MS = 250;
/** Dauer des Ausblendens, bevor bei Überlastung umgeschaltet wird. */
const FADE_OUT_MS = 700;

function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[sorted.length >> 1];
}

function Rim({ quality }: { quality: WheelQuality }) {
  const group = useRef<THREE.Object3D>(null);
  const shadow = useRef<THREE.Group>(null);
  const smoothed = useRef(0);
  const target = useRef(0);
  const { scene } = useGLTF(MODEL_URL);
  const invalidate = useThree((s) => s.invalidate);
  const [reducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  // Scroll-Fortschritt aus der zentralen Quelle; jede Änderung fordert
  // genau ein neues Bild an (frameloop="demand").
  useEffect(() => {
    return subscribeScroll((_y, progress) => {
      target.current = progress;
      invalidate();
    });
  }, [invalidate]);

  // Alle Meshes bekommen dasselbe Chrom-Material; Modell zentrieren & normieren
  useEffect(() => {
    const material = quality === "high" ? chromeMaterialHigh : chromeMaterialLite;
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = material;
        // Ohne Shadow-Map im Renderer bringt castShadow nichts – aus.
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
    scene.scale.setScalar(2.4 / Math.max(size.x, size.y, size.z));
    // Environment/Composer brauchen nach dem Laden garantiert ein Bild.
    invalidate();
  }, [scene, quality, invalidate]);

  useFrame(({ camera }) => {
    if (!group.current) return;
    const ease = reducedMotion ? 1 : 0.075;
    const delta = target.current - smoothed.current;
    smoothed.current += delta * ease;
    const p = smoothed.current;

    _spin.setFromAxisAngle(SPIN_AXIS, p * Math.PI * 2 * FLIPS);
    group.current.quaternion.copy(_spin).multiply(BASE_QUAT);

    group.current.position.set(
      Math.sin(p * Math.PI * 2) * 1.1,
      Math.sin(p * Math.PI) * 0.18,
      p * 1.2
    );
    group.current.scale.setScalar(1 + p * 0.08);

    if (shadow.current) shadow.current.position.x = group.current.position.x;

    camera.position.set(Math.sin(p * Math.PI) * 0.15, 0.9 - p * 0.3, 6.2);
    camera.lookAt(group.current.position.x * 0.3, 0, 0);

    // Solange die Glättung nachläuft: nächstes Bild anfordern.
    // Danach schläft die Szene wieder komplett ein.
    if (Math.abs(delta) > SETTLE_EPSILON) invalidate();
  });

  return (
    <>
      <primitive ref={group} object={scene} />
      {quality === "high" && (
        <group ref={shadow}>
          <ContactShadows
            position={[0, -1.85, 0]}
            opacity={0.55}
            scale={9}
            blur={2.6}
            far={3.2}
            resolution={256}
          />
        </group>
      )}
    </>
  );
}

// ---------- sichtbare Neon-Strips in der Szene (für Bloom-Glow) ----------
function NeonStrip({
  position,
  rotation = [0, 0, 0],
  size = [8, 0.05],
  color = "white",
  intensity = 2.2,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  color?: string;
  intensity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial
        color={new THREE.Color(color).multiplyScalar(intensity)}
        toneMapped={false}
      />
    </mesh>
  );
}

/**
 * FrameGuard – misst, ob das Gerät die Szene flüssig zeichnet.
 *
 * 1. Aufwärmphase (Felge noch unsichtbar): Die Szene wird ~30 Mal am Stück
 *    gezeichnet. Nach jedem Bild wird per 1-Pixel-`readPixels` auf die
 *    Grafikkarte gewartet – so ergibt sich die ECHTE Zeit pro Bild, egal
 *    ob der Browser Bilder puffert oder wie hoch die Bildwiederholrate ist.
 *    Liegt der Median über SLOW_COST_MS, meldet der Wächter „zu langsam" –
 *    bevor der Besucher überhaupt etwas sieht.
 * 2. Danach (sichtbar) wird ohne Warten gemessen, nur über den Abstand
 *    zwischen zwei Bildern beim Scrollen. Zwei langsame Messfenster in
 *    Folge lösen ebenfalls das Herunterschalten aus.
 *
 * Der Median ist unempfindlich gegen einzelne Ausreißer (Bild-Dekodierung,
 * Tab-Wechsel, Shader-Kompilierung).
 */
function FrameGuard({
  onVerdict,
  onSlowLater,
}: {
  onVerdict: (fastEnough: boolean) => void;
  onSlowLater: () => void;
}) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const state = useRef({
    frameStart: 0,
    last: 0,
    samples: [] as number[],
    warm: true,
    skip: WARMUP_SKIP,
    strikes: 0,
    done: false,
  });

  // Aufwärmphase: nach dem Zeichnen auf die Grafikkarte warten und messen.
  useEffect(() => {
    const ctx = gl.getContext();
    const pixel = new Uint8Array(4);
    return addAfterEffect(() => {
      const s = state.current;
      if (!s.warm || s.done || !s.frameStart) return;
      // readPixels kehrt erst zurück, wenn alle Zeichenbefehle dieses
      // Bildes ausgeführt sind (nur in der unsichtbaren Aufwärmphase).
      gl.setRenderTarget(null);
      ctx.readPixels(0, 0, 1, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, pixel);
      const cost = performance.now() - s.frameStart;
      s.frameStart = 0;
      if (s.skip > 0) {
        s.skip--;
        return;
      }
      s.samples.push(cost);
      // Deutlich zu langsam? Dann nicht erst das ganze Fenster abwarten –
      // jede weitere Messung würde die Seite nur unnötig belasten.
      const early = s.samples.length === 5 && median(s.samples) > VERY_SLOW_COST_MS;
      if (!early && s.samples.length < SAMPLE_WINDOW) return;
      const fastEnough = !early && median(s.samples) <= SLOW_COST_MS;
      s.samples = [];
      s.warm = false;
      if (!fastEnough) s.done = true;
      onVerdict(fastEnough);
    });
  }, [gl, onVerdict]);

  useFrame(() => {
    const s = state.current;
    if (s.done) return;
    const now = performance.now();

    if (s.warm) {
      s.frameStart = now;
      // Durchgehend zeichnen, bis die Messung steht.
      invalidate();
      return;
    }

    // Sichtbar: Abstand zwischen zwei gezeichneten Bildern.
    const dt = s.last ? now - s.last : 0;
    s.last = now;
    // Lange Abstände sind Ruhepausen der Szene, keine langsamen Bilder.
    if (dt <= 0 || dt > IDLE_GAP_MS) return;
    s.samples.push(dt);
    if (s.samples.length < SAMPLE_WINDOW) return;
    const slow = median(s.samples) > SLOW_FRAME_MS;
    s.samples = [];
    s.strikes = slow ? s.strikes + 1 : 0;
    if (s.strikes >= 2) {
      s.done = true;
      onSlowLater();
    }
  });

  return null;
}

/**
 * Sorgt dafür, dass nach Mount/Resize sicher ein Bild gezeichnet wird, und
 * fängt einen Verlust des WebGL-Kontexts ab (z. B. Grafiktreiber-Reset
 * unter Windows) – dann bleibt der statische Hintergrund stehen.
 */
function KeepAlive({ onContextLost }: { onContextLost: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    // Erstes Bild anstoßen; die Aufwärmphase des FrameGuard übernimmt dann.
    const frame = requestAnimationFrame(() => invalidate());

    const onResize = () => invalidate();
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onResize);
    };
  }, [invalidate]);

  useEffect(() => {
    // Der Listener wird beim Unmount entfernt, BEVOR R3F den Kontext beim
    // Aufräumen selbst freigibt – ein Qualitätswechsel löst ihn also nicht aus.
    const canvas = gl.domElement;
    const lost = (e: Event) => {
      e.preventDefault();
      onContextLost();
    };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onContextLost]);

  return null;
}

export default function ChromeRimScroll({
  quality,
  onTooSlow,
  onContextLost,
}: {
  quality: WheelQuality;
  /** Szene läuft auf diesem Gerät nicht flüssig → eine Stufe herunter. */
  onTooSlow: () => void;
  /** WebGL-Kontext verloren → 3D ganz abschalten. */
  onContextLost: () => void;
}) {
  // Eingeblendet wird erst, wenn das Modell geladen ist UND die Aufwärm-
  // messung ergeben hat, dass das Gerät die Szene flüssig zeichnet.
  // (Solange das Modell lädt, ist der ganze Canvas-Inhalt per Suspense
  // pausiert – der FrameGuard startet also erst mit fertigem Modell.)
  const [visible, setVisible] = useState(false);
  const leaving = useRef(false);

  const onVerdict = useCallback(
    (fastEnough: boolean) => {
      if (fastEnough) setVisible(true);
      // Noch unsichtbar → ohne Ausblenden sofort herunterschalten.
      else onTooSlow();
    },
    [onTooSlow]
  );

  const onSlowLater = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    setVisible(false);
    window.setTimeout(onTooSlow, FADE_OUT_MS);
  }, [onTooSlow]);

  const high = quality === "high";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "#050507",
        opacity: visible ? 1 : 0,
        transition: `opacity ${visible ? 1.2 : FADE_OUT_MS / 1000}s ease-out`,
      }}
    >
      <Canvas
        // Nur rendern, wenn sich etwas bewegt – im Ruhezustand 0 % Last.
        frameloop="demand"
        camera={{ position: [0, 0.9, 6.2], fov: 38 }}
        gl={{
          // Mit Post-Processing glättet der Composer die Kanten selbst –
          // eine zusätzliche Kantenglättung des Canvas wäre doppelte Arbeit.
          antialias: !high,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
          // Der Hintergrund ist deckend – kein Alpha-Blending nötig.
          alpha: false,
          stencil: false,
          depth: true,
        }}
        // Pixeldichte deckeln: Die Füllrate steigt quadratisch mit der DPR.
        dpr={high ? [1, 1.75] : [1, 1.25]}
      >
        <color attach="background" args={["#050507"]} />
        <fog attach="fog" args={["#050507", 9, 22]} />

        <Environment resolution={high ? 256 : 128}>
          <Lightformer intensity={16} color="#dbeaff" position={[2.5, 5, 2]} scale={[9, 0.3, 1]} />
          <Lightformer intensity={10} color="#cce0ff" position={[-6, 1.2, 1]} scale={[11, 0.28, 1]} />
          <Lightformer intensity={6} color="#b8d2ff" position={[4.5, -2.5, -2]} scale={[8, 0.22, 1]} />
          <Lightformer
            intensity={0.07}
            color="#8099cc"
            position={[0, 7, 0]}
            rotation-x={Math.PI / 2}
            scale={[18, 9, 1]}
          />
        </Environment>

        {/* Ohne Shadow-Map: kein castShadow, keine shadow-mapSize nötig */}
        <directionalLight intensity={0.25} color="#dfe9ff" position={[4, 7, 5]} />
        <directionalLight intensity={0.15} color="#9db8ff" position={[-5, 2, -4]} />
        <ambientLight intensity={0.02} color="#aebfdd" />

        <Rim quality={quality} />
        <KeepAlive onContextLost={onContextLost} />
        <FrameGuard onVerdict={onVerdict} onSlowLater={onSlowLater} />

        <NeonStrip position={[2.2, 2.8, -4.5]} rotation={[0, -0.25, 0.05]} size={[8, 0.04]} color="#dbeaff" intensity={1.8} />
        <NeonStrip position={[-4.4, 0.2, -3.8]} rotation={[0, 0.5, 0]} size={[6, 0.035]} color="#cce0ff" intensity={1.5} />

        {/* Bloom nur in der vollen Stufe. 4× Multisampling statt der
            Voreinstellung 8× – optisch gleich, halbe Speicherbandbreite. */}
        {high && (
          <EffectComposer multisampling={4}>
            <Bloom intensity={0.28} luminanceThreshold={1.15} luminanceSmoothing={0.25} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
