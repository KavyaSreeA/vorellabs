"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { BOOT } from "@/lib/boot";
import { smoothstep } from "./geometry";

const N = 340;

/** Barely-there floating dust — depth and life without visual noise. */
export default function Dust({ reduced }: { reduced: boolean }) {
  const points = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const speeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
      speeds[i] = 0.01 + Math.random() * 0.03;
    }
    return { positions, speeds };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (mat.current) {
      const appear = reduced ? 1 : smoothstep(BOOT.ambient, BOOT.ambient + 1.2, t);
      mat.current.opacity = appear * 0.5;
    }
    const geo = points.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * (reduced ? 0 : 1);
      arr[i * 3] += Math.sin(t * 0.2 + i) * 0.0006;
      if (arr[i * 3 + 1] > 4.6) arr[i * 3 + 1] = -4.6;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={N}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.018}
        color="#4a4a50"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
