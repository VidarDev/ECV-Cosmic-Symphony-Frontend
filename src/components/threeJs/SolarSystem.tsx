import { useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import PostProcessingEffects from './utils/PostProcessingEffects';
import Controls from './utils/Controls';
import useStore from '../../hooks/useStore';
import { SOLAR_SYSTEM_SCENE } from '../../constants/scenes';
import { PerspectiveCameraProps, useFrame } from '@react-three/fiber';
import CelestialObject from './CelestialObject';
import { Perf } from 'r3f-perf';

const SolarSystem: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const appSettings = useStore((state) => state.appSettings);
  const updateAppSetting = useStore((state) => state.updateAppSetting);

  // Refs
  const cameraRef = useRef<PerspectiveCameraProps>(null!);
  const controlsRef = useRef<OrbitControlsImpl>(null!);

  useFrame(() => {
    if (appSettings.timeStepModifier !== userSettings.timeSpeedModifier) {
      updateAppSetting('timeStepModifier', userSettings.timeSpeedModifier);
      updateAppSetting(
        'timeStep',
        Math.exp(userSettings.timeSpeedModifier * 20) * 0.00001
      );
    }

    const cameraDistance = controlsRef.current.getDistance();
    if (cameraDistance !== appSettings.cameraDistance) {
      updateAppSetting('cameraDistance', cameraDistance);
    }
  });

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera
        ref={cameraRef}
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
      <CelestialObject
        {...appSettings.solarSystemData}
        cameraRef={cameraRef}
        controlsRef={controlsRef}
      />
      {/* Utils */}
      {userSettings.showDebugMode && <Perf />}
      <Controls />
      <PostProcessingEffects />
    </>
  );
};

export default SolarSystem;
