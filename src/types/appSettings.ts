import { celestialObject } from '@/types/celestialObject';

export type appSettings = {
  timeStepModifier: number;
  timeStep: number;
  focusingObject: boolean;
  cameraDistance: number;
  solarSystemData: celestialObject;
};
