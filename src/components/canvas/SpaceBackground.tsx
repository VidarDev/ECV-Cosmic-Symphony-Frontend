import { Environment, useTexture } from '@react-three/drei';
import useStore from '../../hooks/useStore';
import { BackSide } from 'three';

const galacticTilt = 60.19; // degrees
const galacticTiltRadians = (galacticTilt * Math.PI) / 180;

const SpaceBackground: React.FC = () => {
  const quality = useStore((state) => state.userSettings.quality);
  const texture = useTexture('/textures/stars.jpeg');

  return (
    <Environment
      background
      near={1}
      far={100}
      resolution={
        quality === 'High' ? 4096 : quality === 'Medium' ? 2048 : 1024
      }
    >
      <mesh scale={10} rotation={[galacticTiltRadians, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>
    </Environment>
  );
};

export default SpaceBackground;
