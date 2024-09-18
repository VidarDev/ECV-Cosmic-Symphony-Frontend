import { useTexture } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

const kmToUnits = (km) => km / 1000;

interface PlanetProps {
  meanRadius?: number;
}

const Sun: React.FC<PlanetProps> = ({ meanRadius = 5 }) => {
  // Refs
  const sunRef = useRef<THREE.Mesh>(null);

  const [texture, normalMap] = useTexture([
    '/textures/earth.jpg',
    '/normalMaps/earth.jpg',
  ]);

  // Normalizer
  const constants = useMemo(
    () => ({
      SUN_RADIUS: kmToUnits(meanRadius),
    }),
    [meanRadius]
  );

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0, 32, 32]} />
      <meshPhysicalMaterial
        color={'gold'}
        roughness={0.2}
        metalness={0.5}
        emissiveMap={texture}
        normalMap={normalMap}
        emissive={'white'}
        emissiveIntensity={1}
      />
    </mesh>
  );
};

export default Sun;
