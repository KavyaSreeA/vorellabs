"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { BOOT } from "@/lib/boot";
import {
  clamp01,
  easeInOutCubic,
  easeOutCubic,
  makeShardGeometry,
  makeVGeometry,
  sampleVPoints,
  smoothstep,
} from "./geometry";

const COUNT = 1300;
const SCALE = 1.7;
const Y = 0.35;

type Instance = {
  start: THREE.Vector3;
  rot: THREE.Euler;
  delay: number;
  spin: THREE.Vector3;
};

/**
 * The metallic V for the LOADING SCENE only. Thousands of grains assemble and
 * lock into the shape, a specular highlight sweeps across, it settles a few
 * degrees, then drifts with a slow life. When `exiting`, it eases forward as the
 * whole scene fades — this component never coexists with the hero.
 */
export default function LoaderV({
  reduced,
  exiting,
}: {
  reduced: boolean;
  exiting: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const shards = useRef<THREE.InstancedMesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const spine = useRef<THREE.Mesh>(null);
  const sweep = useRef<THREE.SpotLight>(null);

  const vGeo = useMemo(() => makeVGeometry(), []);
  const shardGeo = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const spineGeo = useMemo(() => makeShardGeometry(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const targets = useMemo(() => sampleVPoints(COUNT, 7), []);
  const data = useMemo<Instance[]>(() => {
    const arr: Instance[] = [];
    for (let i = 0; i < COUNT; i++) {
      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      const r = 2.6 + Math.random() * 3.2;
      arr.push({
        start: dir.multiplyScalar(r),
        rot: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        delay: Math.random() * 0.35,
        spin: new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        ),
      });
    }
    return arr;
  }, []);

  const { pointer } = useThree();
  const shardMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#c9ced4",
        metalness: 1,
        roughness: 0.24,
        transparent: true,
        opacity: 1,
      }),
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const g = group.current;
    const gi = inner.current;
    if (!g || !gi) return;

    // --- assembly (particles → locked shape) ---
    const aStart = reduced ? 0 : BOOT.assembleStart;
    const aEnd = reduced ? 0.3 : BOOT.assembled;
    const p = clamp01((t - aStart) / Math.max(0.001, aEnd - aStart));

    if (shards.current && p < 1) {
      shards.current.visible = true;
      for (let i = 0; i < COUNT; i++) {
        const d = data[i];
        const pe = easeOutCubic(clamp01((p - d.delay) / (1 - d.delay || 1)));
        dummy.position.set(
          THREE.MathUtils.lerp(d.start.x, targets[i * 3], pe),
          THREE.MathUtils.lerp(d.start.y, targets[i * 3 + 1], pe),
          THREE.MathUtils.lerp(d.start.z, targets[i * 3 + 2], pe)
        );
        dummy.rotation.set(
          d.rot.x * (1 - pe) + d.spin.x * (1 - pe) * 0.6,
          d.rot.y * (1 - pe),
          d.rot.z * (1 - pe)
        );
        const s = (1 - smoothstep(0.8, 1, pe)) * 0.05 + 0.004;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        shards.current.setMatrixAt(i, dummy.matrix);
      }
      shards.current.instanceMatrix.needsUpdate = true;
      shardMat.opacity = 1 - smoothstep(0.9, 1, p);
    } else if (shards.current) {
      shards.current.visible = false;
    }

    // --- solid core fade-in ---
    const coreO = reduced ? 1 : smoothstep(BOOT.assembled - 0.4, BOOT.assembled, t);
    if (core.current) {
      (core.current.material as THREE.MeshStandardMaterial).opacity = coreO;
      core.current.visible = coreO > 0.001;
    }
    if (spine.current) {
      (spine.current.material as THREE.MeshStandardMaterial).opacity = coreO;
      spine.current.visible = coreO > 0.001;
    }

    // --- reflection sweep across the metal ---
    if (sweep.current) {
      const rp = clamp01((t - BOOT.reflection) / BOOT.reflectionDur);
      sweep.current.position.x = THREE.MathUtils.lerp(-7, 7, easeInOutCubic(rp));
      sweep.current.intensity =
        rp > 0 && rp < 1 ? 3.2 * Math.sin(rp * Math.PI) : 0;
    }

    // --- rotation: settle ~4.5°, then a slow continuous life ---
    if (t < BOOT.settle + 1.0) {
      const settleP = smoothstep(BOOT.settle, BOOT.settle + 1.0, t);
      gi.rotation.y = THREE.MathUtils.degToRad(4.5) * settleP;
    } else {
      gi.rotation.y += (reduced ? 0 : delta * 0.14);
    }

    // subtle mouse tilt
    const tiltAmt = smoothstep(BOOT.assembled, BOOT.assembled + 1.2, t) * 0.16;
    gi.rotation.x += (pointer.y * tiltAmt - gi.rotation.x) * 0.05;
    gi.rotation.z += (pointer.x * tiltAmt * 0.5 - gi.rotation.z) * 0.04;

    // --- exit: ease forward as the scene fades ---
    const target = exiting ? SCALE * 1.12 : SCALE;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, target, 0.08));
  });

  return (
    <group ref={group} scale={SCALE} position={[0, Y, 0]}>
      <group ref={inner}>
        <instancedMesh
          ref={shards}
          args={[shardGeo, shardMat, COUNT]}
          frustumCulled={false}
        />
        <mesh ref={core} geometry={vGeo} visible={false}>
          <meshStandardMaterial
            color="#d3d8dd"
            metalness={1}
            roughness={0.16}
            envMapIntensity={1.6}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh ref={spine} geometry={spineGeo} position={[0, 0, 0.02]} visible={false}>
          <meshStandardMaterial
            color="#f4f6f8"
            metalness={1}
            roughness={0.07}
            envMapIntensity={1.9}
            transparent
            opacity={0}
          />
        </mesh>
      </group>

      <spotLight
        ref={sweep}
        position={[-7, 1, 4]}
        angle={0.6}
        penumbra={1}
        intensity={0}
        color="#ffffff"
        distance={20}
      />
    </group>
  );
}
