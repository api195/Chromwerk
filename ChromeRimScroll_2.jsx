// ChromeRimScroll.jsx
// ============================================================
// Hochglanz-Chrom-Felge als Scroll-Animation (React Three Fiber)
//
// Install:
//   npm i three @react-three/fiber @react-three/drei @react-three/postprocessing
//
// Nutzung:
//   1. chrom_felge.glb in /public legen
//   2. <ChromeRimScroll /> als fixierten Hintergrund rendern,
//      der Seiteninhalt scrollt normal darüber (position: relative; z-index > 0)
// ============================================================

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  Lightformer,
  ContactShadows,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const MODEL_URL = '/chrom_felge.glb';

// ---------- Chrom-Material (ein Material für ALLE Felgen-Meshes) ----------
const chromeMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color('#f4f6f8'), // sehr helles Silber/Weiß — kein dunkles Grau
  metalness: 1.0,
  roughness: 0.05,                   // 0.03–0.08
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
  envMapIntensity: 1.1,              // Kontrast statt Helligkeit — sonst brennt das Chrom aus
});

// ---------- Scroll-Progress (0..1 über die gesamte Seite) ----------
function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

// ---------- Kontinuierlicher Überschlag (oryzo-Style) ----------
// Der Korken springt nicht zwischen Posen und dreht nicht um die Hochachse:
// er ÜBERSCHLÄGT sich gleichmäßig um eine leicht gekippte, überwiegend
// horizontale Achse — 1:1 an den Scrollweg gekoppelt.
const FLIPS = 2;                                              // volle Überschläge über die Seite
const SPIN_AXIS = new THREE.Vector3(1, 0.35, 0).normalize();  // leicht diagonale Flip-Achse
const BASE_QUAT = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.12, 0, -0.08));
const _spin = new THREE.Quaternion();

// ---------- Felge ----------
function Rim({ scroll }) {
  const group = useRef();
  const shadow = useRef();
  const smoothed = useRef(0);
  const { scene } = useGLTF(MODEL_URL);
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Alle Meshes bekommen dasselbe Chrom-Material; Modell zentrieren & normieren
  useEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.material = chromeMaterial;
        o.castShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
    scene.scale.setScalar(2.4 / Math.max(size.x, size.y, size.z)); // Felgen-Größe (vorher 3.4)
  }, [scene]);

  useFrame(({ camera }) => {
    const ease = reducedMotion ? 1 : 0.075;
    smoothed.current += (scroll.current - smoothed.current) * ease;
    const p = smoothed.current;

    // Überschlag: lineare Kopplung an den Scrollweg, kein Posen-Easing
    _spin.setFromAxisAngle(SPIN_AXIS, p * Math.PI * 2 * FLIPS);
    group.current.quaternion.copy(_spin).multiply(BASE_QUAT);

    // dezente Flugbahn: leicht seitlich pendeln, minimal auf die Kamera zu
    group.current.position.set(
      Math.sin(p * Math.PI * 2) * 1.1,
      Math.sin(p * Math.PI) * 0.18,
      p * 1.2
    );
    group.current.scale.setScalar(1 + p * 0.08);

    // Kontaktschatten folgt
    if (shadow.current) shadow.current.position.x = group.current.position.x;

    // Kamera bleibt ruhig — das Objekt macht die Arbeit
    camera.position.set(Math.sin(p * Math.PI) * 0.15, 0.9 - p * 0.3, 6.2);
    camera.lookAt(group.current.position.x * 0.3, 0, 0);
  });

  return (
    <>
      <primitive ref={group} object={scene} />
      <group ref={shadow}>
        <ContactShadows position={[0, -1.85, 0]} opacity={0.55} scale={9} blur={2.6} far={3.2} />
      </group>
    </>
  );
}

// ---------- sichtbare Neon-Strips in der Szene (für Bloom-Glow) ----------
function NeonStrip({ position, rotation = [0, 0, 0], size = [8, 0.05], color = 'white', intensity = 2.2 }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial color={new THREE.Color(color).multiplyScalar(intensity)} toneMapped={false} />
    </mesh>
  );
}

export default function ChromeRimScroll() {
  const scroll = useScrollProgress();

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#050507' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0.9, 6.2], fov: 38 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050507']} />
        <fog attach="fog" args={['#050507', 9, 22]} />

        {/*
          Dark-Studio-Environment: fast komplett schwarz, nur wenige DÜNNE,
          sehr helle, kühle Strips. Chrom wirkt wie im Referenzfoto dunkel,
          weil es überwiegend Dunkelheit spiegelt — die Strips liefern die
          scharfen weißen Kanten-Highlights.
        */}
        <Environment resolution={512}>
          {/* Haupt-Highlight oben rechts ("Sonnenstern") */}
          <Lightformer intensity={16} color="#dbeaff" position={[2.5, 5, 2]} target={[0, 0, 0]} scale={[9, 0.3, 1]} />
          {/* linke Kante */}
          <Lightformer intensity={10} color="#cce0ff" position={[-6, 1.2, 1]} target={[0, 0, 0]} scale={[11, 0.28, 1]} />
          {/* schwacher Gegen-Strip rechts unten */}
          <Lightformer intensity={6} color="#b8d2ff" position={[4.5, -2.5, -2]} target={[0, 0, 0]} scale={[8, 0.22, 1]} />
          {/* hauchdünnes Fülllicht gegen absaufende Schatten */}
          <Lightformer intensity={0.07} color="#8099cc" position={[0, 7, 0]} rotation-x={Math.PI / 2} scale={[18, 9, 1]} />
        </Environment>

        {/* sehr zurückhaltendes Direktlicht — das Chrom lebt von der Env-Map */}
        <directionalLight castShadow intensity={0.25} color="#dfe9ff" position={[4, 7, 5]} shadow-mapSize={[2048, 2048]} />
        <directionalLight intensity={0.15} color="#9db8ff" position={[-5, 2, -4]} />
        <ambientLight intensity={0.02} color="#aebfdd" />

        <Rim scroll={scroll} />

        {/* zwei dezente Strips im Hintergrund → feiner Glow */}
        <NeonStrip position={[2.2, 2.8, -4.5]} rotation={[0, -0.25, 0.05]} size={[8, 0.04]} color="#dbeaff" intensity={1.8} />
        <NeonStrip position={[-4.4, 0.2, -3.8]} rotation={[0, 0.5, 0]} size={[6, 0.035]} color="#cce0ff" intensity={1.5} />

        <EffectComposer>
          <Bloom intensity={0.28} luminanceThreshold={1.15} luminanceSmoothing={0.25} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
