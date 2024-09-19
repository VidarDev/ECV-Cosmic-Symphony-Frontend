import { degToRad } from '@/utils/normalizer';

export const SOLAR_SYSTEM_SCENE = {
  UNIVERS_TILT: degToRad(64),
  CAMERA_MAX_DISTANCE: 2200000000,
  CAMERA_FAR: 2200000000 * 2,
  CAMERA_NEAR: 1000,
  VERTEX_COUNT: 256,
};
