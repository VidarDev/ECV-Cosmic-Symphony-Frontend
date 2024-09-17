import { Canvas } from '@react-three/fiber';
import Scene from '../components/Scene';
import { Suspense } from 'react';

const Index = () => {
  return (
    <>
      <header id="header">
        <h1>Systeme solaire</h1>
      </header>
      <div id="canvas-scene">
        <Canvas camera={{ position: [0, 2.5, 5], fov: 35 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default Index;
