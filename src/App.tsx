import { Canvas } from '@react-three/fiber';
import SolarSystem from './components/threeJs/SolarSystem';
import { Suspense } from 'react';
import useStore from './hooks/useStore';

const App = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const appSettings = useStore((state) => state.appSettings);

  // Pixel ratio
  const dpr =
    userSettings.resolutionQuality === 'High'
      ? window.devicePixelRatio
      : userSettings.resolutionQuality === 'Medium'
        ? window.devicePixelRatio / 1.5
        : window.devicePixelRatio / 2.5;

  const distance = appSettings.cameraDistance.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });

  return (
    <>
      <header id="header">
        <h1>
          {userSettings.resolutionQuality},{' '}
          {userSettings.showDebugMode.toString()}, {userSettings.focusedObject},{' '}
          {distance} km
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
