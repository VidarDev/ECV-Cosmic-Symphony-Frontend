import { Environment, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Planet from './Objects/Planet';
import Sun from './Objects/Sun';

const Scene = () => {
  return (
    <>
      <Perf />
      <axesHelper args={[5]} />
      <OrbitControls minDistance={5} maxDistance={50} />
      <Environment
        background
        backgroundBlurriness={0.01} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
        backgroundIntensity={0.5}
        backgroundRotation={[0, Math.PI / 2, 0]}
        files={[
          'front.png',
          'back.png',
          'top.png',
          'bottom.png',
          'right.png',
          'left.png',
        ]}
        path="/textures/skybox/"
      />
      <color attach="background" args={['#000011']} />
      <ambientLight intensity={5} />
      <pointLight position={[10, 10, 10]} />
      <Sun />
      <Planet speed={2} />
      <Planet speed={-3} orbitRadius={7.5} />
      <Planet speed={4} orbitRadius={10} />
      <Planet speed={-5} orbitRadius={12.5} />
      <Planet speed={6} orbitRadius={15} />
      <Planet speed={-7} orbitRadius={17.5} />
      <Planet speed={8} orbitRadius={20} />
      <Planet speed={-9} orbitRadius={22.5} />
    </>
  );
};

export default Scene;
