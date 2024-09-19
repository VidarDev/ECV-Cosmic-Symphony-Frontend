import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import {
  Mesh,
  Object3D,
  Vector3,
  PointLight,
  DoubleSide,
  DirectionalLight,
  RingGeometry,
} from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import OrbitPath from '@/components/threeJs/OrbitPath';
import { celestialObject } from '@/types/celestialObject';
import useStore from '@/hooks/useStore';
import * as THREE from 'three';
import RandomMelodyPlayer from '../tone/MusicMaker';

type Props = {
  cameraRef: MutableRefObject<THREE.PerspectiveCamera>;
  controlsRef: MutableRefObject<OrbitControlsImpl>;
} & celestialObject;

const CelestialObject: React.FC<Props> = ({
  cameraRef,
  controlsRef,
  ...props
}) => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const appSettings = useStore((state) => state.appSettings);
  const updateUserSetting = useStore((state) => state.updateUserSetting);
  const updateAppSetting = useStore((state) => state.updateAppSetting);
  const updateComponentRef = useStore((state) => state.updateComponentRefSetting);

  // Constants
  const divisionQuality = userSettings.resolutionQuality === 'High' ? 32 : 16;

  // Refs
  const bodyOrbitRef = useRef<Object3D>(null!);
  const bodyPositionRef = useRef<Object3D>(null!);
  const bodyRef = useRef<Object3D>(null!);
  const bodyMeshRef = useRef<Mesh>(null!);
  const ringGeometryRef = useRef<RingGeometry>(null!);
  const pointLightRef = useRef<PointLight>(null!);
  const directionalLightRef = useRef<DirectionalLight>(null!);
  const bodyTexture = props.texturePath ? useTexture(props.texturePath) : null;
  const ringTexture = props.ring?.texturePath
    ? useTexture(props.ring.texturePath)
    : null;

  const currentBodyPositionVectorRef = useRef<Vector3>(new Vector3());
  const nextBodyPositionVectorRef = useRef<Vector3>(new Vector3());
  const bodyFocusVectorRef = useRef<Vector3>(new Vector3());

  // State
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const focusObject = () => {
    if (userSettings.focusedObject !== props.name) {
      updateUserSetting('focusedObject', props.name);
      updateAppSetting('focusingObject', true);
      fetchCelestialData();
    }
  };

  const fetchCelestialData = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/space/get/${props.name.toLowerCase()}`)
      .then(response => response.json())
      .then(data => {
        console.log(`Fetched data for ${props.name}:`, data);
        setFetchedData(data);
      })
      .catch(error => {
        console.error(`Error fetching data for ${props.name}:`, error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  useEffect(() => {
    const randomAngleAlongOrbit = Math.floor(Math.random() * Math.PI * 2);
    bodyOrbitRef.current.rotation.y += randomAngleAlongOrbit;
    bodyPositionRef.current.rotation.y -= randomAngleAlongOrbit;

    if (props.name === 'Moon') {
      bodyRef.current.rotation.y += randomAngleAlongOrbit + Math.PI;
    }
  }, []);

  useEffect(() => {
    updateComponentRef('lightSourceMeshRef', bodyMeshRef);
  }, [props.isStar]);

  useEffect(() => {
    updateAppSetting('focusingObject', true);
  }, [userSettings.realisticScale]);

  useEffect(() => {
    bodyFocusVectorRef.current.set(
      props.radius * 4,
      props.radius * 1.25,
      props.radius * 4
    );
  }, [props.radius]);

  useEffect(() => {
    if (ringTexture) {
      const uvs = ringGeometryRef.current.attributes.uv.array as unknown as number[];
      const phiSegments = ringGeometryRef.current.parameters.phiSegments;
      const thetaSegments = ringGeometryRef.current.parameters.thetaSegments;

      for (let c = 0, j = 0; j <= phiSegments; j++) {
        for (let i = 0; i <= thetaSegments; i++) {
          uvs[c++] = j / phiSegments;
          uvs[c++] = i / thetaSegments;
        }
      }
    }
  }, [divisionQuality, userSettings.realisticScale, ringTexture]);

  useEffect(() => {
    if (pointLightRef.current) {
      pointLightRef.current.shadow.camera.far = 1500000;
    }

    if (directionalLightRef.current) {
      directionalLightRef.current.shadow.camera.far = 6000000000;
    }
  }, [userSettings.realisticScale]);

  useEffect(() => {
    if (userSettings.focusedObject === props.name) {
      fetchCelestialData();
    } else {
      setIsPlayingMusic(false);
    }
  }, [userSettings.focusedObject, props.name]);

  useFrame(() => {
    bodyRef.current.getWorldPosition(currentBodyPositionVectorRef.current);

    if (userSettings.timeSpeedModifier > 0) {
      bodyOrbitRef.current.rotation.y +=
        props.orbit.rotationPeriod * appSettings.timeStep;
      bodyPositionRef.current.rotation.y -=
        props.orbit.rotationPeriod * appSettings.timeStep;
      bodyRef.current.rotation.y += props.rotationPeriod * appSettings.timeStep;
    }

    if (userSettings.focusedObject === props.name) {
      const cameraPosition = cameraRef.current.position as Vector3;
      bodyRef.current.getWorldPosition(nextBodyPositionVectorRef.current);
      controlsRef.current.target = nextBodyPositionVectorRef.current;

      if (appSettings.focusingObject) {
        cameraPosition.x =
          nextBodyPositionVectorRef.current.x - bodyFocusVectorRef.current.x;
        cameraPosition.y =
          nextBodyPositionVectorRef.current.y + bodyFocusVectorRef.current.y;
        cameraPosition.z =
          nextBodyPositionVectorRef.current.z + bodyFocusVectorRef.current.z;

        controlsRef.current.minDistance =
          props.radius + cameraRef.current.near!;

        updateAppSetting('focusingObject', false);
      } else {
        cameraPosition.x +=
          nextBodyPositionVectorRef.current.x -
          currentBodyPositionVectorRef.current.x;
        cameraPosition.y +=
          nextBodyPositionVectorRef.current.y -
          currentBodyPositionVectorRef.current.y;
        cameraPosition.z +=
          nextBodyPositionVectorRef.current.z -
          currentBodyPositionVectorRef.current.z;
      }
    }

    if (props.isStar && userSettings.realisticScale) {
      directionalLightRef.current.position.x = -controlsRef.current.target.x;
      directionalLightRef.current.position.y = -controlsRef.current.target.y;
      directionalLightRef.current.position.z = -controlsRef.current.target.z;
    }
  });

  return (
    <object3D rotation={[0, 0, props.orbit.inclination]}>
      <object3D ref={bodyOrbitRef}>
        <OrbitPath
          color={props.orbit.color}
          radius={props.orbit.radius}
          showOrbitPaths={userSettings.showOrbitPaths}
        />
        <object3D position={[props.orbit.radius, 0, 0]}>
          <object3D
            ref={bodyPositionRef}
            rotation={[0, 0, -props.orbit.inclination]}
          >
            {props.isStar && (
              <>
                <pointLight
                  ref={pointLightRef}
                  visible={!userSettings.realisticScale}
                  color={props.color}
                  intensity={2}
                  distance={0}
                  castShadow
                />
                <directionalLight
                  ref={directionalLightRef}
                  visible={userSettings.realisticScale}
                  color={0xffffff}
                  intensity={2}
                  castShadow
                />
              </>
            )}
            {userSettings.showLabels && (
              <Html
                position={[0, props.radius * 1.5, 0]}
                center
                wrapperClass="canvas-object"
              >
                <p style={{ color: 'white' }} onClick={focusObject}>
                  {props.name}
                </p>
                {isLoading && <p style={{ color: 'white' }}>Loading...</p>}
                {fetchedData && !isLoading && (
                  <div style={{ color: 'white', fontSize: '0.8em' }}>
                    <p>Tempo: {fetchedData.tempo} BPM</p>
                    <p>Scale: {fetchedData.musicRange.join(', ')}</p>
                    <button onClick={toggleMusic} style={{ marginTop: '5px' }}>
                      {isPlayingMusic ? 'Stop Music' : 'Play Music'}
                    </button>
                    {userSettings.focusedObject === props.name && (
                      <RandomMelodyPlayer
                      tempo={fetchedData.tempo}
                      synthToUse={fetchedData.synthToUse}
                      musicRange={fetchedData.musicRange}
                        isPlaying={isPlayingMusic}
                      />
                    )}
                  </div>
                )}
              </Html>
            )}
            <object3D
              rotation={[0, 0, props.orbit.inclination + props.obliquity]}
            >
              <object3D
                ref={bodyRef}
                onPointerEnter={() => {
                  document.body.style.cursor = 'pointer';
                }}
                onPointerLeave={() => {
                  document.body.style.cursor = 'auto';
                }}
              >
                {userSettings.showDebugMode && (
                  <axesHelper args={[props.radius * 2]} />
                )}
                <mesh
                  ref={bodyMeshRef}
                  castShadow={!props.isStar}
                  receiveShadow={!props.isStar}
                  onClick={focusObject}
                  frustumCulled={true}
                >
                  <sphereGeometry
                    args={[props.radius, divisionQuality * 2, divisionQuality]}
                  />
                  <meshPhongMaterial
                    color={bodyTexture ? undefined : props.color}
                    map={bodyTexture}
                    emissive={props.isStar ? props.color : 0x000000}
                    shininess={props.albedo}
                  />
                </mesh>
                {props.ring && (
                  <mesh
                    rotation={[Math.PI / 2, 0, 0]}
                    castShadow={!props.isStar}
                    receiveShadow={!props.isStar}
                    onClick={focusObject}
                  >
                    <ringGeometry
                      ref={ringGeometryRef}
                      args={[
                        props.ring.innerRadius * 2,
                        props.ring.outerRadius * 2,
                        divisionQuality * 4,
                      ]}
                    />
                    <meshPhongMaterial
                      transparent
                      side={DoubleSide}
                      color={ringTexture ? undefined : props.color}
                      map={ringTexture}
                      shininess={props.albedo}
                    />
                  </mesh>
                )}
              </object3D>
            </object3D>
            {props.satellites.map((satellite, index) => (
              <CelestialObject
                key={index}
                {...satellite}
                cameraRef={cameraRef}
                controlsRef={controlsRef}
              />
            ))}
          </object3D>
        </object3D>
      </object3D>
    </object3D>
  );
};

export default CelestialObject;