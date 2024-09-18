import { Perf } from 'r3f-perf';
import useStore from '../../../hooks/useStore';

const DebugMode: React.FC = () => {
  // Stores
  const showDebugMode = useStore((state) => state.userSettings.showDebugMode);

  if (showDebugMode) {
    return (
      <>
        <Perf />
        <axesHelper args={[100]} />
      </>
    );
  }

  return null;
};

export default DebugMode;
