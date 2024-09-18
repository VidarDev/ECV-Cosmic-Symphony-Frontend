import { Perf } from 'r3f-perf';
import useStore from '../../../hooks/useStore';
import { SOLAR_SYSTEM_SCENE } from '../../../constants/scenes';

const DebugMode: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);

  if (userSettings.showDebugMode) {
    return (
      <>
        <Perf />
        <axesHelper args={[SOLAR_SYSTEM_SCENE.CAMERA_MAX_DISTANCE]} />
      </>
    );
  }

  return null;
};

export default DebugMode;
