import { useControls, button } from 'leva';
import useStore from '../../../hooks/useStore';

const Controls: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const updateAppSetting = useStore((state) => state.updateAppSetting);
  const updateUserSetting = useStore((state) => state.updateUserSetting);
  const resetUserSettings = useStore((state) => state.resetUserSettings);

  const handleFocus = (object: string) => {
    updateUserSetting('focusedObject', object);
    updateAppSetting('focusingObject', true);
  };

  // GUI
  useControls({
    'Resolution quality': {
      value: userSettings.resolutionQuality,
      options: {
        Low: 'Low',
        Medium: 'Medium',
        High: 'High',
      },
      onChange: (value) => updateUserSetting('resolutionQuality', value),
    },
    'Debug mode': {
      value: userSettings.showDebugMode,
      onChange: (value) => updateUserSetting('showDebugMode', value),
    },
    'Show labels': {
      value: userSettings.showLabels,
      onChange: (value) => updateUserSetting('showLabels', value),
    },
    'Show orbits': {
      value: userSettings.showOrbitPaths,
      onChange: (value) => updateUserSetting('showOrbitPaths', value),
    },
    'Simulation speed': {
      value: userSettings.timeSpeedModifier * 1000,
      min: 0,
      max: 750,
      onChange: (value) => updateUserSetting('timeSpeedModifier', value / 1000),
    },
    Reset: button(() => {
      resetUserSettings();
    }),
  });

  useControls('Celestial Objects', {
    Sun: button(() => handleFocus('Sun')),
    Mercury: button(() => handleFocus('Mercury')),
    Venus: button(() => handleFocus('Venus')),
    Earth: button(() => handleFocus('Earth')),
    Mars: button(() => handleFocus('Mars')),
    Jupiter: button(() => handleFocus('Jupiter')),
    Saturn: button(() => handleFocus('Saturn')),
    Uranus: button(() => handleFocus('Uranus')),
    Neptune: button(() => handleFocus('Neptune')),
  });

  return null;
};

export default Controls;
