import { useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import DebugMode from './utils/DebugMode';
import PostProcessingEffects from './utils/PostProcessingEffects';
import Controls from './utils/Controls';
import { SOLAR_SYSTEM_DEFAULT } from '../../constants/solarSystem';
import useStore from '../../hooks/useStore';

const SolarSystem: React.FC = () => {
  // Stores
  const quality = useStore((state) => state.userSettings.quality);

  // Refs
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[3, 0, 0]} far={500} />
      {/* OrbitControls */}
      <OrbitControls ref={controlsRef} maxDistance={500} />
      {/* Background environment */}
      <Environment
        background
        files={'/textures/stars.jpg'}
        backgroundRotation={[0, SOLAR_SYSTEM_DEFAULT.universTilt, 0]}
        resolution={
          quality === 'High' ? 4096 : quality === 'Medium' ? 2048 : 1024
        }
      />
      {/* Light */}
      <ambientLight color={'white'} intensity={0.02} />
      {/* Celestial objects */}
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
      {/* Utils */}
      <DebugMode />
      <Controls />
      <PostProcessingEffects />
    </>
  );
};

export default SolarSystem;
