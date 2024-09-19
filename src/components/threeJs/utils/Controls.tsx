import { useControls, button } from 'leva';
import useStore from '../../../hooks/useStore';

const Controls: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const updateAppSetting = useStore((state) => state.updateAppSetting);
  const updateUserSetting = useStore((state) => state.updateUserSetting);
  const resetUserSettings = useStore((state) => state.resetUserSettings);

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
    'Simulation speed': {
      value: userSettings.timeSpeedModifier * 1000,
      min: 0,
      max: 1000,
      onChange: (value) => updateUserSetting('timeSpeedModifier', value / 1000),
    },
    Reset: button(() => {
      resetUserSettings();
    }),
  });

  useControls('Celestials Objects', {
    Sun: button(() => {
      updateUserSetting('focusedObject', 'Sun');
      updateAppSetting('focusingObject', true);
    }),
    Earth: button(() => {
      updateUserSetting('focusedObject', 'Earth');
      updateAppSetting('focusingObject', true);
    }),
  });

  return null;
};

export default Controls;
