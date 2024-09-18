export type userSettingsProps = {
  showLabels: boolean;
  showOrbitPaths: boolean;
  showDebugMode: boolean;
  enableMusic: boolean;
  actualScale: boolean;
  quality: 'Low' | 'Medium' | 'High';
  timeSpeedModifier: number;
  focusedBody: string;
};

export const USER_SETTINGS_DEFAULT: userSettingsProps = {
  showLabels: true,
  showOrbitPaths: true,
  showDebugMode: false,
  enableMusic: false,
  actualScale: false,
  quality: 'Medium',
  timeSpeedModifier: 1,
  focusedBody: 'Sun',
};
