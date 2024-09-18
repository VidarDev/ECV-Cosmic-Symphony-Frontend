import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import SpaceBackground from './SpaceBackground';
import { useRef } from 'react';
import DebugMode from './DebugMode';
import PostProcessingEffects from './PostProcessingEffects';
import Controls from './Controls';

const SolarSystem: React.FC = () => {
  // Stores

  // Refs
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  return (
    <>
      <PerspectiveCamera makeDefault position={[3, 0, 0]} far={500} />
      <OrbitControls ref={controlsRef} maxDistance={500} />
      <SpaceBackground />
      <ambientLight color={'white'} intensity={0.02} />
      <DebugMode />
      <Controls />
      <mesh>
        <sphereGeometry args={[30, 32, 32]} />
        <meshPhysicalMaterial
          color={'gold'}
          roughness={0.2}
          metalness={0.5}
          emissive={'white'}
          emissiveIntensity={1}
        />
      </mesh>
      <PostProcessingEffects />
    </>
  );
};

export default SolarSystem;
