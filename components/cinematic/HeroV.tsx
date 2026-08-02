"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { makeShardGeometry, makeVGeometry } from "./geometry";

const SCALE = 1.92;

/**
 * The hero's metallic V — mounts only after the loader is gone, and eases in
 * from its assembled orientation so the fade-through-black reads as continuous.
 * Slow rotation + subtle pointer tilt.
 */
export default function HeroV({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const vGeo = useMemo(() => makeVGeometry(), []);
  const spineGeo = useMemo(() => makeShardGeometry(), []);
  const { pointer } = useThree();
  const entered = useRef(0);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // ease in scale on first mount
    entered.current = Math.min(1, entered.current + delta * 1.4);
    const e = 1 - Math.pow(1 - entered.current, 3);
    g.scale.setScalar(SCALE * (0.92 + 0.08 * e));

    g.rotation.y += reduced ? 0 : delta * 0.16;
    g.rotation.x += (pointer.y * 0.16 - g.rotation.x) * 0.05;
    g.rotation.z += (pointer.x * 0.08 - g.rotation.z) * 0.04;
  });

  return (
    <group ref={group} scale={SCALE}>
      <mesh geometry={vGeo}>
        <meshStandardMaterial
          color="#d3d8dd"
          metalness={1}
          roughness={0.16}
          envMapIntensity={1.6}
        />
      </mesh>
      <mesh geometry={spineGeo} position={[0, 0, 0.02]}>
        <meshStandardMaterial
          color="#f4f6f8"
          metalness={1}
          roughness={0.07}
          envMapIntensity={1.9}
        />
      </mesh>
    </group>
  );
}
