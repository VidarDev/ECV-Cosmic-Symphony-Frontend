const Sun = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[1, 0, 0]} scale={0.3}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
};

export default Sun;
