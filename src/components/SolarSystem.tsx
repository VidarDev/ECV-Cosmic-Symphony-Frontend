import { Environment, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

const SolarSystem = () => {
  return (
    <>
      <Perf />
      <axesHelper args={[5]} />
      <OrbitControls minDistance={10000} maxDistance={1000000} />
      <Environment
        background
        backgroundBlurriness={0.01}
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
        path="/skybox/"
      />
    </>
  );
};

export default SolarSystem;
