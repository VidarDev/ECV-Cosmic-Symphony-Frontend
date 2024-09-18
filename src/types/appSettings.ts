import { celestialObject } from './celestialObject';

export type appSettings = {
  timeStepModifier: number;
  timeStep: number;
  focusingObject: boolean;
  cameraDistance: number;
  solarSystemData: celestialObject;
};
