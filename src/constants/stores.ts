import { appSettings } from '../types/appSettings';
import { userSettings } from '../types/userSettings';

export const APP_SETTINGS_DEFAULT: appSettings = {
  timeStepModifier: 1,
};

export const USER_SETTINGS_DEFAULT: userSettings = {
  showLabels: true,
  showOrbitPaths: true,
  showDebugMode: false,
  enableMusic: false,
  actualScale: false,
  quality: 'Medium',
  timeSpeedModifier: 1,
  focusedObject: 'Sun',
};
