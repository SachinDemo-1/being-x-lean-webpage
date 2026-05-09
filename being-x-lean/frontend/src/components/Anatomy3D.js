import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import './Anatomy3D.css';

/**
 * 3D anatomy that spins in place around its own vertical axis.
 *  - Loads /models/male_body.glb
 *  - Auto-rotates 360° on a fixed point (no drift)
 *  - Hover pauses → leaving cursor resumes
 *  - Click any region → that mesh flashes RED and onMuscleClick(group) fires
 *  - Black background + responsive layout
 */

function muscleFromPoint(nx, ny, nz) {
  const front = nz >= 0;
  const ax = Math.abs(nx);
  if (ny > 0.94) return null;
  if (ny > 0.86) return front ? 'neck' : 'back';
  if (ax > 0.22 && ny > 0.45 && ny < 0.86) return 'arms';
  if (ny > 0.68 && ny <= 0.86) return front ? 'chest' : 'back';
  if (ny > 0.45 && ny <= 0.68) return front ? 'core' : 'back';
  if (ny > 0.38 && ny <= 0.45) return front ? 'core' : 'legs';
  return 'legs';
}

function Body({ rotating, onPick, setHovered, onCenter }) {
  const gltf = useLoader(GLTFLoader, '/models/male_body.glb');
  const pivot = useRef();
  const flashedMesh = useRef(null);
  const flashedOriginal = useRef(null);
  const flashStart = useRef(0);

  // Scale FIRST, then center the model so it spins in place.
  // The inner <primitive> is offset; the outer <group ref=pivot> sits at origin
  // and only rotates — that's what keeps the body stable on one axis.
  const { scene: body, offset, bbox, size } = useMemo(() => {
    const s = gltf.scene.clone(true);

    // 1) measure raw, scale to a target height
    let box = new THREE.Box3().setFromObject(s);
    const sz = new THREE.Vector3(); box.getSize(sz);
    const targetH = 3.2;
    const scale = targetH / sz.y;
    s.scale.setScalar(scale);

    // 2) measure scaled, compute offset that puts xz-center at 0 and feet at 0
    box = new THREE.Box3().setFromObject(s);
    const ctr = new THREE.Vector3(); box.getCenter(ctr);
    const newSize = new THREE.Vector3(); box.getSize(newSize);
    const off = new THREE.Vector3(-ctr.x, -box.min.y, -ctr.z);

    // 3) clone materials so we can tint individual meshes safely
    s.traverse((o) => {
      if (o.isMesh) {
        if (Array.isArray(o.material)) o.material = o.material.map((m) => m.clone());
        else if (o.material) o.material = o.material.clone();
      }
    });

    // local bbox after offset (model space inside the pivot)
    const localBox = box.clone();
    localBox.min.add(off); localBox.max.add(off);

    return { scene: s, offset: off, bbox: localBox, size: newSize };
  }, [gltf]);

  // Tell parent the vertical center so OrbitControls can target it
  useEffect(() => {
    if (onCenter) onCenter(size.y / 2);
  }, [size, onCenter]);

  useFrame((_, dt) => {
    if (rotating && pivot.current) pivot.current.rotation.y += dt * 0.55;

    if (flashedMesh.current) {
      const t = (performance.now() - flashStart.current) / 1500;
      const mesh = flashedMesh.current;
      if (t >= 1) {
        if (flashedOriginal.current) {
          mesh.material.color.copy(flashedOriginal.current);
          if ('emissive' in mesh.material) mesh.material.emissive.set(0x000000);
        }
        flashedMesh.current = null;
        flashedOriginal.current = null;
      } else {
        const k = 1 - t;
        const red = new THREE.Color(0xff2030);
        mesh.material.color.copy(flashedOriginal.current).lerp(red, k);
        if ('emissive' in mesh.material) mesh.material.emissive.setRGB(0.6 * k, 0, 0);
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    const p = e.point.clone();
    if (pivot.current) pivot.current.worldToLocal(p);
    const ny = (p.y - bbox.min.y) / size.y;
    const nx = p.x / (size.x / 2);
    const nz = p.z;
    const group = muscleFromPoint(nx, ny, nz);

    const mesh = e.object;
    if (mesh && mesh.isMesh && mesh.material && mesh.material.color) {
      if (flashedMesh.current && flashedOriginal.current) {
        flashedMesh.current.material.color.copy(flashedOriginal.current);
        if ('emissive' in flashedMesh.current.material) flashedMesh.current.material.emissive.set(0x000000);
      }
      flashedMesh.current = mesh;
      flashedOriginal.current = mesh.material.color.clone();
      flashStart.current = performance.now();
    }

    if (group && onPick) onPick(group);
  };

  return (
    // Pivot lives at origin; only its rotation changes → spin-in-place.
    <group ref={pivot}>
      <primitive
        object={body}
        position={[offset.x, offset.y, offset.z]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={handleClick}
      />
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div style={{ color: '#fff', fontSize: 13, opacity: 0.8 }}>Loading 3D body…</div>
    </Html>
  );
}

export default function Anatomy3D({ onMuscleClick }) {
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused]   = useState(false);
  const [centerY, setCenterY] = useState(1.5);
  const rotating = !hovered && !paused;

  useEffect(() => () => { document.body.style.cursor = 'auto'; }, []);

  return (
    <div className="a3d-wrap">
      <div className="a3d-stage">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 1.7, 5.6], fov: 32 }}
          style={{ background: '#000' }}
        >
          <color attach="background" args={[0, 0, 0]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 5, 4]} intensity={1.2} castShadow />
          <directionalLight position={[-4, 3, -3]} intensity={0.4} color="#88aaff" />
          <pointLight position={[0, 2, 5]} intensity={0.4} />
          <Suspense fallback={<Loader />}>
            <Body
              rotating={rotating}
              setHovered={setHovered}
              onCenter={setCenterY}
              onPick={(g) => onMuscleClick && onMuscleClick(g)}
            />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableDamping
            minDistance={3}
            maxDistance={9}
            target={[0, centerY, 0]}
            onStart={() => setPaused(true)}
          />
        </Canvas>
        <div className="a3d-floor" />
      </div>

      <div className="a3d-hud">
        <button className="a3d-toggle" onClick={() => setPaused((p) => !p)}>
          {paused ? '▶ PLAY' : '❚❚ PAUSE'}
        </button>
        <span className="a3d-status">
          <span className={`a3d-dot ${rotating ? 'live' : ''}`} />
          {paused ? 'Paused' : hovered ? 'Hovering' : 'Auto-Rotating'}
        </span>
      </div>
    </div>
  );
}
