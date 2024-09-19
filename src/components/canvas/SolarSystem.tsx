import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SpaceBackground from './SpaceBackground';
import DebugMode from './DebugMode';
import PostProcessingEffects from './PostProcessingEffects';
import Controls from './Controls';

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  emissive?: string;
}

const Planet: React.FC<PlanetProps> = ({ position, size, color, orbitRadius, orbitSpeed, emissive }) => {
  const ref = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * orbitSpeed;
    ref.current.position.x = Math.cos(t) * orbitRadius;
    ref.current.position.z = Math.sin(t) * orbitRadius;
  });

  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={emissive || color} 
        emissiveIntensity={0.2}
        roughness={0.7}
        metalness={0.3}
      />
    </mesh>
  );
};

const OrbitRing: React.FC<{ radius: number }> = ({ radius }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.1, 64]} />
      <meshBasicMaterial color="white" transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  );
};

const SolarSystem: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null!);
  const sunLightRef = useRef<THREE.PointLight>(null!);

  useHelper(sunLightRef, THREE.PointLightHelper, 5);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 100, 150]} far={10000} />
      <OrbitControls ref={controlsRef} maxDistance={1000} />
      <SpaceBackground />
      
      <ambientLight intensity={2} />
      <pointLight ref={sunLightRef} position={[0, 0, 0]} intensity={50} distance={1000} decay={2} castShadow />

      <DebugMode />
      <Controls />
      
      <mesh>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="yellow" />
      </mesh>

    
      <Planet position={[20, 0, 0]} size={0.8} color="#A9A9A9" orbitRadius={20} orbitSpeed={4.7} emissive="#555555" />
      <Planet position={[30, 0, 0]} size={1.5} color="#FFA500" orbitRadius={30} orbitSpeed={3.5} emissive="#804000" />
      <Planet position={[40, 0, 0]} size={1.6} color="#4169E1" orbitRadius={40} orbitSpeed={3} emissive="#1034A6" />
      <Planet position={[50, 0, 0]} size={1} color="#FF4500" orbitRadius={50} orbitSpeed={2.4} emissive="#8B0000" />
      <Planet position={[70, 0, 0]} size={4} color="#DEB887" orbitRadius={70} orbitSpeed={1.3} emissive="#8B4513" />
      <Planet position={[90, 0, 0]} size={3.5} color="#F4A460" orbitRadius={90} orbitSpeed={0.9} emissive="#D2691E" />
      <Planet position={[110, 0, 0]} size={2.5} color="#87CEEB" orbitRadius={110} orbitSpeed={0.7} emissive="#4682B4" />


      <OrbitRing radius={20} />
      <OrbitRing radius={30} />
      <OrbitRing radius={40} />
      <OrbitRing radius={50} />
      <OrbitRing radius={70} />
      <OrbitRing radius={90} />
      <OrbitRing radius={110} />

      <PostProcessingEffects />
    </>
  );
};

export default SolarSystem;