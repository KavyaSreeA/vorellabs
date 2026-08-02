"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import HeroV from "./HeroV";

/** The 3D canvas that sits behind the hero typography. */
export default function HeroStage({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: 3,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.22} />
        <directionalLight position={[5, 6, 4]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[-6, -3, -5]} intensity={1.0} color="#7f858c" />
        <HeroV reduced={reduced} />
        <Environment preset="studio" environmentIntensity={0.9} />
        {!reduced && (
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.74}
              luminanceSmoothing={0.5}
              mipmapBlur
              radius={0.7}
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
