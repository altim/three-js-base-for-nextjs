"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function SmokeExperience() {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null);

  // Update shader uniforms each frame
  useFrame((state) => {
    if (!shaderMaterialRef.current) return;

    // Update time uniform for constant animation
    shaderMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          ref={shaderMaterialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
          }}
          transparent={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      <PerspectiveCamera position={[0, 0, 2]} makeDefault />
      <OrbitControls />
    </>
  );
}
