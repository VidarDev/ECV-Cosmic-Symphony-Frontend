import { degToRad } from '../utils/normalizer';

export const SOLAR_SYSTEM_SCENE = {
  UNIVERS_TILT: degToRad(64),
  CAMERA_MAX_DISTANCE: 1000000000,
  CAMERA_FAR: 1000000000 * 2,
  CAMERA_NEAR: 50,
  VERTEX_COUNT: 128,
};
