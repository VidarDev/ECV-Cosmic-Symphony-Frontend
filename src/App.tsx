import HomePage from '@/components/HomePage';
import Loading from '@/components/Loading';
import { Canvas } from '@react-three/fiber';
import SolarSystem from '@/components/threeJs/SolarSystem';
import { Suspense, useEffect, useState } from 'react';
import useStore from '@/hooks/useStore';
import Header from './components/overlay/Header';

const App = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);

  // States
  const [isAppOpened, setIsAppOpened] = useState(false);
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  // Pixel ratio
  const dpr =
    userSettings.resolutionQuality === 'High'
      ? window.devicePixelRatio
      : userSettings.resolutionQuality === 'Medium'
        ? window.devicePixelRatio / 1.5
        : window.devicePixelRatio / 2.5;

  const openApp = () => {
    setIsAppOpened(true);
  };

  useEffect(() => {
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return (
      <div className="z-0 fixed top-0 left-0 w-full h-full overflow-hidden">
        <Loading />
      </div>
    );
  }

  if (!isAppOpened) {
    return <HomePage onAction={openApp} />;
  }

  return (
    <>
      <div
        id="canvas-scene"
        className="z-0 fixed top-0 left-0 w-full h-full overflow-hidden"
      >
        <Suspense fallback={<Loading />}>
          <Header />
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
            <SolarSystem />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
};

export default App;
