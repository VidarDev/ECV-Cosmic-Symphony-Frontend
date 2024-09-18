import { Canvas } from '@react-three/fiber';
import SolarSystem from './components/threeJs/SolarSystem';
import { Suspense } from 'react';
import useStore from './hooks/useStore';

const App = () => {
  // Stores
  const quality = useStore((state) => state.userSettings.quality);
  const showDebugMode = useStore((state) => state.userSettings.showDebugMode);

  // Pixel ratio
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
          {quality}, {showDebugMode.toString()},
        </h1>
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
