"use client";

// ChromeRimScroll
// ============================================================
// Hochglanz-Chrom-Felge als Scroll-Animation (React Three Fiber).
// Die Felge überschlägt sich beim Scrollen (2 volle Flips über die Seite)
// und dient als fixierter 3D-Hintergrund, über den der Inhalt scrollt.
//
// Performance-Konzept:
//  • frameloop="demand" – es wird NUR gerendert, wenn sich wirklich etwas
//    bewegt (Scrollen + Nachlauf der Glättung). Im Ruhezustand kostet die
//    Szene 0 % GPU/CPU, wodurch das Scrollen im restlichen Seiteninhalt
//    spürbar flüssiger bleibt.
//  • Keine Shadow-Maps: der Bodenschatten kommt von ContactShadows, eine
//    zusätzliche Schattenkarte pro Bild wäre reine Verschwendung.
//  • Scroll-Position kommt aus der zentralen Scroll-Quelle (kein eigener
//    Listener, kein Layout-Read pro Frame).
//
// Modell: /public/chrom_felge.glb  (austauschbar)
// ============================================================

import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { subscribeScroll } from "@/lib/scroll";

const MODEL_URL = "/chrom_felge.glb";

// ---------- Chrom-Material (ein Material für ALLE Felgen-Meshes) ----------
const chromeMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#f4f6f8"),
  metalness: 1.0,
  roughness: 0.05,
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  envMapIntensity: 1.1,
});

// ---------- Kontinuierlicher Überschlag (oryzo-Style) ----------
const FLIPS = 2;
const SPIN_AXIS = new THREE.Vector3(1, 0.35, 0).normalize();
const BASE_QUAT = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.12, 0, -0.08));
const _spin = new THREE.Quaternion();

/** Ab dieser Restdifferenz gilt die Animation als „angekommen". */
const SETTLE_EPSILON = 0.00015;

function Rim({
  onReady,
  lite = false,
}: {
  onReady?: () => void;
  lite?: boolean;
}) {
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
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = chromeMaterial;
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
    // Modell ist geladen & vorbereitet → weiches Einblenden auslösen
    onReady?.();
    // Environment/Composer brauchen nach dem Laden garantiert ein Bild.
    invalidate();
  }, [scene, onReady, invalidate]);

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
      {!lite && (
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

/** Sorgt dafür, dass nach Mount/Resize sicher ein Bild gezeichnet wird. */
function KeepAlive() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    // Mehrere Ticks: Environment (drei) rendert seine Reflexions-Map im
    // ersten useFrame – ohne garantiertes Bild bliebe die Felge dunkel.
    let ticks = 0;
    let frame = 0;
    const pump = () => {
      invalidate();
      if (++ticks < 5) frame = requestAnimationFrame(pump);
    };
    frame = requestAnimationFrame(pump);

    const onResize = () => invalidate();
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onResize);
    };
  }, [invalidate]);
  return null;
}

export default function ChromeRimScroll({ lite = false }: { lite?: boolean }) {
  // Weiches Einblenden, sobald das Modell geladen ist (kein hartes Aufploppen)
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "#050507",
        opacity: ready ? 1 : 0,
        transition: "opacity 1.2s ease-out",
      }}
    >
      <Canvas
        // Nur rendern, wenn sich etwas bewegt – im Ruhezustand 0 % Last.
        frameloop="demand"
        camera={{ position: [0, 0.9, 6.2], fov: 38 }}
        gl={{
          antialias: !lite,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
          // Der Hintergrund ist deckend – kein Alpha-Blending nötig.
          alpha: false,
          stencil: false,
          depth: true,
        }}
        // Pixeldichte deckeln: über ~1.75 ist der Unterschied kaum sichtbar,
        // die Füllrate steigt aber quadratisch.
        dpr={lite ? [1, 1.25] : [1, 1.75]}
      >
        <color attach="background" args={["#050507"]} />
        <fog attach="fog" args={["#050507", 9, 22]} />

        <Environment resolution={lite ? 128 : 256}>
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

        <Rim onReady={onReady} lite={lite} />
        <KeepAlive />

        <NeonStrip position={[2.2, 2.8, -4.5]} rotation={[0, -0.25, 0.05]} size={[8, 0.04]} color="#dbeaff" intensity={1.8} />
        <NeonStrip position={[-4.4, 0.2, -3.8]} rotation={[0, 0.5, 0]} size={[6, 0.035]} color="#cce0ff" intensity={1.5} />

        {/* Bloom ist teuer – nur auf Desktop/leistungsfähigen Geräten */}
        {!lite && (
          <EffectComposer>
            <Bloom intensity={0.28} luminanceThreshold={1.15} luminanceSmoothing={0.25} mipmapBlur />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
