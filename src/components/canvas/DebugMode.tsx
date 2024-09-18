import { Perf } from 'r3f-perf';
import useStore from '../../hooks/useStore';

const DebugMode: React.FC = () => {
  const showDebugMode = useStore((state) => state.userSettings.showDebugMode);

  if (showDebugMode) {
    return (
      <>
        <Perf />
        <axesHelper args={[5]} />
      </>
    );
  }

  return null;
};

export default DebugMode;
