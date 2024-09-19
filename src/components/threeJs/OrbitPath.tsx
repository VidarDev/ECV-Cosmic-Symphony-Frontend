import { SOLAR_SYSTEM_SCENE } from '@/constants/scenes';
import { useEffect, useRef } from 'react';
import { BufferGeometry, Float32BufferAttribute } from 'three';

type OrbitPathProps = {
  color: number;
  radius: number;
  showOrbitPaths: boolean;
};

const OrbitPath: React.FC<OrbitPathProps> = ({
  color,
  radius,
  showOrbitPaths,
}) => {
  const orbitGeometryRef = useRef<BufferGeometry>(new BufferGeometry());

  useEffect(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    const r = (color >>> 16) / 255;
    const g = ((color >>> 8) & 0xff) / 255;
    const b = (color & 0xff) / 255;

    for (let i = 0; i <= SOLAR_SYSTEM_SCENE.VERTEX_COUNT; i++) {
      const fraction = i / SOLAR_SYSTEM_SCENE.VERTEX_COUNT;
      const step = fraction * (Math.PI * 2);

      const x = radius * Math.cos(step);
      const z = radius * Math.sin(step);
      positions.push(x, 0, z);
      colors.push(r, g, b, 1 - fraction);
    }

    orbitGeometryRef.current.setAttribute(
      'position',
      new Float32BufferAttribute(positions, 3)
    );
    orbitGeometryRef.current.setAttribute(
      'color',
      new Float32BufferAttribute(colors, 4)
    );
  }, [radius]);

  return (
    <line>
      <bufferGeometry ref={orbitGeometryRef} />
      <lineBasicMaterial visible={showOrbitPaths} vertexColors transparent />
    </line>
  );
};

export default OrbitPath;
