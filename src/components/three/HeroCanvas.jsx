import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';

function FloatingRing({ radius, speed, color, tilt }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 8, 80]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function HolographicSphere({ mouse }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const outerRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1 + mouse.current.x * 0.3;
      groupRef.current.rotation.x = mouse.current.y * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2;
      innerRef.current.rotation.x = t * 0.15;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core glowing sphere */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial
            color="#00d4ff"
            emissive="#003a5c"
            emissiveIntensity={0.5}
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </Float>

      {/* Wireframe overlay */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Outer wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbiting rings */}
      <FloatingRing radius={1.9} speed={0.4} color="#00d4ff" tilt={Math.PI / 6} />
      <FloatingRing radius={2.3} speed={-0.25} color="#7c3aed" tilt={-Math.PI / 4} />
      <FloatingRing radius={2.7} speed={0.15} color="#06b6d4" tilt={Math.PI / 3} />
    </group>
  );
}

function particleSeed(i, salt) {
  const x = Math.sin((i + salt) * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const PARTICLE_COUNT = 200;
const particlePositions = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3] = (particleSeed(i, 1) - 0.5) * 12;
    arr[i * 3 + 1] = (particleSeed(i, 2) - 0.5) * 12;
    arr[i * 3 + 2] = (particleSeed(i, 3) - 0.5) * 8;
  }
  return arr;
})();

function ParticleField() {
  const count = PARTICLE_COUNT;
  const positions = particlePositions;

  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00d4ff" size={0.04} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

export default function HeroCanvas({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#06b6d4" />

      <Stars radius={80} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <ParticleField />
      <HolographicSphere mouse={mouse} />
    </Canvas>
  );
}
