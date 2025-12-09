import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';
import { SlideType } from '../types';

// Add type shim for React Three Fiber intrinsic elements
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      fog: any;
    }
  }
}

interface Background3DProps {
  currentSlide: SlideType;
}

const NetworkField = ({ currentSlide }: { currentSlide: SlideType }) => {
  const ref = useRef<THREE.Points>(null!);

  // Create a structured but organic "Data Cloud"
  const particles = useMemo(() => {
    const count = 1500; // Fewer points, higher elegance
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Flattened cylinder distribution (like a galaxy or dataset plane)
      const theta = Math.random() * 2 * Math.PI;
      const r = 5 + Math.random() * 5;
      const y = (Math.random() - 0.5) * 2; // Thin vertical spread

      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return { positions };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Very slow, deliberate rotation (Academic stability)
    ref.current.rotation.y += delta / 40;

    // Subtle breathing
    const time = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(time * 0.1) * 0.1;

    // Target Colors - Monochrome with slight tint
    let rT = 0.5, gT = 0.5, bT = 0.5; // Default Grey

    switch (currentSlide) {
      case SlideType.INTRO: // Deep Blue tint
        rT = 0.2; gT = 0.4; bT = 0.6;
        break;
      case SlideType.PROBLEM: // Subtle warmth (not bright red)
        rT = 0.6; gT = 0.3; bT = 0.3;
        break;
      case SlideType.BACKGROUND: // Tech Purple
        rT = 0.5; gT = 0.2; bT = 0.6;
        break;
      case SlideType.SOLUTION: // Teal/Cyan
        rT = 0.1; gT = 0.5; bT = 0.6;
        break;
      case SlideType.RESULTS: // Clean White/Silver
        rT = 0.8; gT = 0.8; bT = 0.9;
        break;
      case SlideType.CONCLUSION: // Indigo
        rT = 0.3; gT = 0.3; bT = 0.7;
        break;
      case SlideType.REFERENCES: // Jirai Pink
        rT = 1.0; gT = 0.2; bT = 0.5;
        break;
    }

    const material = ref.current.material as THREE.PointsMaterial;
    material.color.lerp(new THREE.Color(rT, gT, bT), delta);
  });

  return (
    <group rotation={[0.2, 0, 0]}>
      <Points ref={ref} positions={particles.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#888888"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

export const Background3D: React.FC<Background3DProps> = ({ currentSlide }) => {
  return (
    <div className="absolute inset-0 -z-10 bg-[#000000]">
      <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
        {/* Subtle fog for depth - distinctively "void" like */}
        <fog attach="fog" args={['#000000', 8, 20]} />
        <NetworkField currentSlide={currentSlide} />
      </Canvas>
      {/* Cinematic grain overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
    </div>
  );
};