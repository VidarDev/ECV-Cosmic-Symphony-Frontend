import { useFrame, useLoader } from '@react-three/fiber';
import { Line, Sphere, Icosahedron, Tube } from '@react-three/drei';
import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

interface PlanetProps {
  orbitRadius?: number;
  planetRadius?: number;
  segments?: number;
  speed?: number;
  planetSize?: number;
  origin?: [number, number, number];
  highlightColor?: string;
  hitboxRadius?: number;
  rotationSpeed?: number;
  textureImage?: string;
}

const Planet: React.FC<PlanetProps> = ({
  orbitRadius = 5,
  planetRadius = 0.5,
  segments = 128,
  speed = 0.2,
  rotationSpeed = 0.15,
  origin = [0, 0, 0],
  highlightColor = 'lightblue',
  textureImage = '/textures/earth.jpg',
}) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Line>(null);

  const [isHovered, setIsHovered] = useState(false);

  const texture = useLoader(THREE.TextureLoader, textureImage);

  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * orbitRadius,
          0,
          Math.sin(angle) * orbitRadius
        )
      );
    }
    return points;
  }, [orbitRadius, segments]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (planetRef.current) {
      const angle = time * speed;
      const tX = Math.cos(angle) * orbitRadius;
      const tZ = Math.sin(angle) * orbitRadius;
      planetRef.current.position.set(tX, 0, tZ);
      planetRef.current.rotation.y += rotationSpeed;
    }

    if (auraRef.current) {
      auraRef.current.position.copy(planetRef.current.position);
      auraRef.current.material.opacity = isHovered ? 0.2 : 0;
    }
  });

  return (
    <group position={origin}>
      <Line
        ref={orbitRef}
        points={orbitPoints}
        color={isHovered ? highlightColor : 'lightgray'}
        lineWidth={0.5}
      />
      <Sphere
        ref={planetRef}
        args={[planetRadius, 32, 32]}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <meshStandardMaterial map={texture} />
      </Sphere>
      <Sphere ref={auraRef} args={[planetRadius * 1.2, 32, 32]}>
        <meshBasicMaterial color="white" transparent={true} opacity={0} />
      </Sphere>
    </group>
  );
};

export default Planet;
