// The 3D smartphone (desktop experience). A fixed, full-viewport canvas behind
// the page content; the phone's pose comes from the scroll director and the
// screen is the live React app UI placed on the glass with drei <Html transform>.
import { Environment, Html, Lightformer } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { director, usePhoneHidden, usePhoneShot } from '../../animations/phoneDirector';
import PhoneApp from '../../demo/PhoneApp';
import './phone.css';

// Geometry (world units). The screen is the app's 390 × 844 frame.
const PX = 1 / 40; // drei Html transform: 1 CSS px = 1/40 unit
const SCREEN_W = 0.73;
const SCREEN_SCALE = SCREEN_W / (390 * PX);
const SCREEN_H = 844 * PX * SCREEN_SCALE;
const BEZEL = 0.036;
const W = SCREEN_W + BEZEL * 2;
const H = SCREEN_H + BEZEL * 2;
const R = 0.118;
const DEPTH = 0.062;
const BEVEL = 0.016;
const FRONT_Z = DEPTH / 2 + BEVEL;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const g = c.getContext('2d')!;
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, 'rgba(164,42,82,0.42)');
    grd.addColorStop(0.45, 'rgba(42,69,132,0.16)');
    grd.addColorStop(1, 'rgba(42,69,132,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

const damp = (a: number, b: number, k: number, dt: number) => a + (b - a) * (1 - Math.exp(-k * dt));

function Phone() {
  const group = useRef<THREE.Group>(null);
  const glare = useRef<HTMLDivElement>(null);
  const cur = useRef({ ...director.target });
  const { viewport, size } = useThree();
  const shot = usePhoneShot();
  const hidden = usePhoneHidden();
  const glow = useGlowTexture();

  const body = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(W - BEVEL * 2, H - BEVEL * 2, R - BEVEL), {
      depth: DEPTH,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL,
      bevelSegments: 8,
      curveSegments: 24,
    });
    g.translate(0, 0, -DEPTH / 2);
    return g;
  }, []);
  const front = useMemo(() => new THREE.ShapeGeometry(roundedRect(W - 0.006, H - 0.006, R - 0.004), 24), []);
  useEffect(() => () => {
    body.dispose();
    front.dispose();
    glow.dispose();
  }, [body, front, glow]);

  useFrame((state, dtRaw) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(dtRaw, 0.05);
    const t = director.target;
    const c = cur.current;
    const sw = director.sway;
    const k = 5.5;
    c.x = damp(c.x, t.x + sw.x, k, dt);
    c.y = damp(c.y, t.y, k, dt);
    c.rx = damp(c.rx, t.rx, k, dt);
    c.ry = damp(c.ry, t.ry + sw.ry, k, dt);
    c.rz = damp(c.rz, t.rz, k, dt);
    c.s = damp(c.s, t.s + sw.s, k, dt);
    const intro = director.intro.v;
    const time = state.clock.elapsedTime;
    const float = Math.sin(time * 1.1) * 0.022;
    const p = director.pointer;
    g.position.set(c.x * viewport.width, c.y * viewport.height + float - (1 - intro) * 0.5, 0);
    g.rotation.set(
      c.rx + Math.sin(time * 0.7) * 0.015 + p.y * 0.05,
      c.ry - (1 - intro) * 1.1 + p.x * 0.07,
      c.rz + Math.sin(time * 0.9 + 1) * 0.008,
    );
    g.scale.setScalar(c.s * (0.82 + 0.18 * intro));
    // Where the phone is on screen (CSS px) — the AI robot rides beside it.
    const ppu = size.height / viewport.height;
    const sc = g.scale.x;
    director.phoneRect = {
      cx: size.width / 2 + g.position.x * ppu,
      cy: size.height / 2 - g.position.y * ppu,
      w: W * sc * ppu * Math.abs(Math.cos(g.rotation.y)),
      h: H * sc * ppu,
    };
    if (glare.current) {
      glare.current.style.transform = `translate3d(${(g.rotation.y * 160).toFixed(1)}px, ${(g.rotation.x * -120).toFixed(1)}px, 0)`;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.05, -0.45]} scale={[3.4, 3.4, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={glow} transparent depthWrite={false} />
      </mesh>
      <mesh geometry={body}>
        <meshPhysicalMaterial color="#2c303b" metalness={0.95} roughness={0.3} clearcoat={0.7} clearcoatRoughness={0.25} envMapIntensity={1.25} />
      </mesh>
      <mesh geometry={front} position={[0, 0, FRONT_Z + 0.0005]}>
        <meshPhysicalMaterial color="#05070b" metalness={0.3} roughness={0.08} clearcoat={1} envMapIntensity={0.9} />
      </mesh>
      {[
        [-W / 2 - 0.004, 0.42, 0.075],
        [-W / 2 - 0.004, 0.26, 0.15],
        [W / 2 + 0.004, 0.3, 0.2],
      ].map(([x, y, h], i) => (
        <mesh key={i} position={[x!, y!, 0]}>
          <boxGeometry args={[0.014, h!, 0.03]} />
          <meshStandardMaterial color="#3a3f4b" metalness={0.9} roughness={0.35} />
        </mesh>
      ))}
      <group position={[0, 0, FRONT_Z + 0.002]} scale={SCREEN_SCALE}>
        <Html transform zIndexRange={[2, 0]} pointerEvents="none" style={{ display: hidden ? 'none' : 'block' }}>
          <div className="phone3d-screen">
            <PhoneApp screen={shot.screen} params={shot.params} />
            <span className="cssphone-island" />
            <div ref={glare} className="phone3d-glare" />
          </div>
        </Html>
      </group>
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, -1, 2]} intensity={0.6} color="#c9b5ff" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#f0d3df" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#bcd3f8" position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={1.2} position={[0, -3, 4]} scale={2} />
      </Environment>
    </>
  );
}

export default function PhoneStage() {
  const hidden = usePhoneHidden();
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      director.pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      director.pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return (
    <div ref={wrap} className="phone-stage" aria-hidden="true" style={{ visibility: hidden ? 'hidden' : 'visible' }}>
      <Canvas
        frameloop={hidden ? 'never' : 'always'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.4], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Lighting />
        <Phone />
      </Canvas>
    </div>
  );
}
