"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import LoaderV from "./LoaderV";
import Dust from "./Dust";

/** The 3D canvas for the loading scene only. */
export default function LoaderStage({
  reduced,
  exiting,
}: {
  reduced: boolean;
  exiting: boolean;
}) {
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
        <LoaderV reduced={reduced} exiting={exiting} />
        <Dust reduced={reduced} />
        <Environment preset="studio" environmentIntensity={0.9} />
        {!reduced && (
          <EffectComposer>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.72}
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
