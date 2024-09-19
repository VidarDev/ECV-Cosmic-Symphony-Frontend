/* eslint-disable react-hooks/rules-of-hooks */
import { PerspectiveCameraProps, useFrame } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
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
import OrbitPath from './OrbitPath';
import { celestialObject } from '../../types/celestialObject';
import useStore from '../../hooks/useStore';

type Props = {
  cameraRef: MutableRefObject<PerspectiveCameraProps>;
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
  const updateComponentRef = useStore(
    (state) => state.updateComponentRefSetting
  );

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

  const focusObject = () => {
    if (userSettings.focusedObject !== props.name) {
      updateUserSetting('focusedObject', props.name);
      updateAppSetting('focusingObject', true);
    }
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
  }, [props.isStar, updateComponentRef]);

  useEffect(() => {
    updateAppSetting('focusingObject', true);
  }, [updateAppSetting, userSettings.realisticScale]);

  useEffect(() => {
    bodyFocusVectorRef.current.set(
      props.radius * 4,
      props.radius * 1.25,
      props.radius * 4
    );
  }, [props.radius]);

  useEffect(() => {
    if (ringTexture) {
      const uvs = ringGeometryRef.current.attributes.uv
        .array as unknown as number[];
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
      pointLightRef.current.shadow.camera.far = 1500000; // approximately the farthest toon orbit radius
    }

    if (directionalLightRef.current) {
      directionalLightRef.current.shadow.camera.far = 6000000000; // approximately the farthest real orbit radius
    }
  }, [userSettings.realisticScale, pointLightRef, directionalLightRef]);

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

        // Prevent the camera from being inside the bodies.
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
        <OrbitPath color={props.orbit.color} radius={props.orbit.radius} />
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
                  visible={!userSettings.realisticScale}
                  color={props.color}
                  intensity={2}
                  castShadow
                />
              </>
            )}
            {userSettings.showLabels && (
              <Html
                position={[0, props.radius * 1.8, 0]}
                center
                wrapperClass="canvas-object"
              >
                <p style={{ color: 'white' }} onClick={focusObject}>
                  {props.name}
                </p>
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
                  <axesHelper args={[props.radius * 1.6]} />
                )}
                <mesh
                  ref={bodyMeshRef}
                  castShadow={!props.isStar}
                  receiveShadow={!props.isStar}
                  onClick={focusObject}
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
