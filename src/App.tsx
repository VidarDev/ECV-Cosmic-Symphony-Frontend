import { Canvas } from '@react-three/fiber';
import SolarSystem from './components/SolarSystem';
import { Suspense } from 'react';
import Providers from './Providers';

const App = () => {
  return (
    <Providers>
      <header id="header">
        <h1>Systeme solaire</h1>
      </header>
      <div id="canvas-scene">
        <Canvas>
          <Suspense fallback={null}>
            <SolarSystem />
          </Suspense>
        </Canvas>
      </div>
    </Providers>
  );
};

export default App;
