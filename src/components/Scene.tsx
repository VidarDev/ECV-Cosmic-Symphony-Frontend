import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, CameraControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

const Scene = () => {
  const [active, setActive] = useState(false);

  return (
    <div id="canvas-scene">
      <Canvas camera={{ position: [0, 2.5, 5], fov: 35 }}>
        <Perf />
        <CameraControls />
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
          path="/public/textures/skybox/"
        />
        <color attach="background" args={['#000011']} />
        <mesh position={[0, 0, 0]} rotation={[1, 0, 0]} scale={0.3}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="orange" wireframe />
        </mesh>
        <mesh
          position={[1, 0, 0]}
          rotation={[1, 0, 0]}
          scale={active ? 0.5 : 0.1}
          onClick={(event) => setActive(!active)}
        >
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color={active ? 'white' : 'red'} wireframe />
        </mesh>
        <mesh position={[2, 0, 0]} rotation={[1, 0, 0]} scale={0.16}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="white" wireframe />
        </mesh>
        <mesh position={[3, 0, 0]} rotation={[1, 0, 0]} scale={0.12}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="white" wireframe />
        </mesh>
        <mesh position={[4, 0, 0]} rotation={[1, 0, 0]} scale={0.1}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="white" wireframe />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Scene;
