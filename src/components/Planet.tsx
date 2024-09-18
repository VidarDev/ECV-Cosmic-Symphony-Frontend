import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

const kmToUnits = (km) => km / 1000;

interface PlanetProps {
  meanRadius?: number;
  semimajorAxis?: number;
  axialTilt?: number;
  inclination?: number;
  sideralOrbit?: number;
  sideralRotation?: number;
  origin?: [number, number, number];
}

const Planet: React.FC<PlanetProps> = ({
  meanRadius = 5,
  semimajorAxis = 0.5,
  inclination = 0,
  sideralOrbit = 0.2,
  sideralRotation = 0.15,
  origin = [0, 0, 0],
}) => {
  // Refs
  const planetRef = useRef<THREE.Mesh>(null);

  const [texture, normalMap] = useTexture([
    '/textures/earth.jpg',
    '/normalMaps/earth.jpg',
  ]);

  // Normalizer
  const constants = useMemo(
    () => ({
      PLANET_RADIUS: kmToUnits(meanRadius) * 2000,
      PLANET_ORBIT_RADIUS: kmToUnits(semimajorAxis),
      PLANET_YEAR: sideralOrbit,
      PLANET_DAY: sideralRotation / 24,
      PLANET_INCLINATION: inclination * (Math.PI / 180),
    }),
    [meanRadius, semimajorAxis, sideralOrbit, sideralRotation, inclination]
  );

  useFrame((state) => {
    const { PLANET_ORBIT_RADIUS, PLANET_YEAR, PLANET_DAY } = constants;

    const elapsedTime = state.clock.getElapsedTime();
    const angle = (elapsedTime / PLANET_YEAR) * Math.PI * 2;

    if (planetRef.current) {
      planetRef.current.position.x = Math.cos(angle) * PLANET_ORBIT_RADIUS;
      planetRef.current.position.z = Math.sin(angle) * PLANET_ORBIT_RADIUS;

      planetRef.current.rotation.y = elapsedTime / PLANET_DAY;
    }
  });

  return (
    <group position={origin} rotation={[constants.PLANET_INCLINATION, 0, 0]}>
      <mesh ref={planetRef} castShadow receiveShadow>
        <sphereGeometry args={[constants.PLANET_RADIUS, 32, 32]} />
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
    </group>
  );
};

export default Planet;
