export type userSettings = {
  showLabels: boolean;
  showOrbitPaths: boolean;
  showDebugMode: boolean;
  realisticScale: boolean;
  resolutionQuality: 'Low' | 'Medium' | 'High';
  timeSpeedModifier: number;
  focusedObject: string;
  focusedColor: number;
};
