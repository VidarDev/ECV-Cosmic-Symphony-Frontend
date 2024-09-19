import { useEffect, useRef } from 'react';
import {
  Float32BufferAttribute,
  Uint8BufferAttribute,
  BufferGeometry,
} from 'three';
import useStore from '../../hooks/useStore';
import { SOLAR_SYSTEM_SCENE } from '../../constants/scenes';

type OrbitPathProps = {
  color: number;
  radius: number;
};

const OrbitPath: React.FC<OrbitPathProps> = ({ color, radius }) => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);

  // Refs
  const orbitGeometryRef = useRef<BufferGeometry>(null!);

  useEffect(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    // extract rgb from hex color
    const r = (color >>> 16) & 0xff;
    const g = (color >>> 8) & 0xff;
    const b = (color >>> 0) & 0xff;

    for (let i = 0; i < SOLAR_SYSTEM_SCENE.VERTEX_COUNT + 1; i++) {
      const fraction = i / SOLAR_SYSTEM_SCENE.VERTEX_COUNT;
      const step = fraction * (Math.PI * 2);

      const x = radius * Math.cos(step);
      const z = radius * Math.sin(step);
      positions.push(x, 0, z);
      colors.push(r, g, b, (1 - fraction) * 255);
    }

    orbitGeometryRef.current.setAttribute(
      'position',
      new Float32BufferAttribute(positions, 3)
    );
    orbitGeometryRef.current.setAttribute(
      'color',
      new Uint8BufferAttribute(colors, 4, true)
    );
  }, [color, radius]);

  return (
    <line>
      <bufferGeometry ref={orbitGeometryRef} />
      <lineBasicMaterial
        visible={userSettings.showOrbitPaths}
        vertexColors
        transparent
      />
    </line>
  );
};

export default OrbitPath;
