import { SolarSytemData } from '@/data/CelestialsData';
import { appSettings } from '@/types/appSettings';
import { userSettings } from '@/types/userSettings';

export const APP_SETTINGS_DEFAULT: appSettings = {
  timeStepModifier: 0,
  timeStep: 0,
  focusingObject: false,
  cameraDistance: 1,
  solarSystemData: SolarSytemData,
};

export const USER_SETTINGS_DEFAULT: userSettings = {
  showLabels: true,
  showOrbitPaths: true,
  showDebugMode: false,
  realisticScale: true,
  resolutionQuality: 'Medium',
  timeSpeedModifier: 0.5,
  focusedObject: 'Sun',
  focusedColor: 0xffffff,
};
