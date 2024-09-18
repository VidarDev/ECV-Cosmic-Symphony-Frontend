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
import useStore from '../../hooks/useStore';
import { SOLAR_SYSTEM_SCENE } from '../../constants/scenes';

const SolarSystem: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const appSettings = useStore((state) => state.appSettings);

  // Refs
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  console.log(appSettings.solarSystemData);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={[3, 1, 3]}
        near={SOLAR_SYSTEM_SCENE.CAMERA_NEAR}
        far={SOLAR_SYSTEM_SCENE.CAMERA_FAR}
      />
      {/* OrbitControls */}
      <OrbitControls
        ref={controlsRef}
        maxDistance={SOLAR_SYSTEM_SCENE.CAMERA_MAX_DISTANCE}
      />
      {/* Background environment */}
      <Environment
        background
        files={'/textures/stars.jpg'}
        backgroundRotation={[0, SOLAR_SYSTEM_SCENE.UNIVERS_TILT, 0]}
        resolution={
          userSettings.resolutionQuality === 'High'
            ? 4096
            : userSettings.resolutionQuality === 'Medium'
              ? 2048
              : 1024
        }
      />
      {/* Light */}
      <ambientLight
        color={appSettings.solarSystemData.color}
        intensity={0.02}
      />
      {/* Celestial objects */}

      {/* Utils */}
      <DebugMode />
      <Controls />
      <PostProcessingEffects />
    </>
  );
};

export default SolarSystem;
