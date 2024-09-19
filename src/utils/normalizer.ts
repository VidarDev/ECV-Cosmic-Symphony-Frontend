import { celestialObject } from '@/types/celestialObject';

export const degToRad = (deg: number) => deg * (Math.PI / 180);
export const radToDeg = (rad: number) => rad * (180 / Math.PI);
export const kmtoUnit = (km: number) => km * 1000;
export const unitToKm = (unit: number) => unit / 1000;

export const getNormalizedCelestialObject = (
  object: celestialObject
): celestialObject => {
  const normalizedObject: celestialObject = {
    ...object,
    radius: object.radius / 2,
    rotationPeriod: object.rotationPeriod
      ? 24 / object.rotationPeriod
      : object.rotationPeriod,
    obliquity: (object.obliquity * Math.PI) / 180,
    orbit: {
      ...object.orbit,
      radius: object.orbit.radius / 2,
      rotationPeriod: object.orbit.rotationPeriod
        ? 1 / object.orbit.rotationPeriod
        : 0,
      inclination: (object.orbit.inclination * Math.PI) / 180,
    },
    albedo: object.albedo * 100,
    satellites: object.satellites.map(getNormalizedCelestialObject),
  };

  return normalizedObject;
};
