import { Canvas } from '@react-three/fiber';
import SolarSystem from './components/canvas/SolarSystem';
import { Suspense } from 'react';
import useStore from './hooks/useStore';

const App = () => {
  const quality = useStore((state) => state.userSettings.quality);
  const showDebugMode = useStore((state) => state.userSettings.showDebugMode);
  const updateUserSetting = useStore((state) => state.updateUserSetting);

  const dpr =
    quality === 'High'
      ? window.devicePixelRatio
      : quality === 'Medium'
        ? window.devicePixelRatio / 1.5
        : window.devicePixelRatio / 2.5;

  return (
    <>
      <header id="header">
        <h1>
          Quality {quality}, Debug {showDebugMode ? 'On' : 'Off'}
        </h1>
        <button onClick={() => updateUserSetting('quality', 'Low')}>
          Low Quality
        </button>
        <button onClick={() => updateUserSetting('quality', 'Medium')}>
          Medium Quality
        </button>
        <button onClick={() => updateUserSetting('quality', 'High')}>
          High Quality
        </button>
        <button
          onClick={() => updateUserSetting('showDebugMode', !showDebugMode)}
        >
          Button
        </button>
      </header>
      <div id="canvas-scene">
        <Canvas
          shadows={false}
          dpr={dpr}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#030302',
          }}
        >
          <Suspense fallback={null}>
            <SolarSystem />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default App;
