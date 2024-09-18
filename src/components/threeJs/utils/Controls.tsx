import { useControls, button } from 'leva';
import useStore from '../../../hooks/useStore';

const Controls: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const updateUserSetting = useStore((state) => state.updateUserSetting);
  const resetUserSettings = useStore((state) => state.resetUserSettings);

  // GUI
  useControls({
    quality: {
      value: userSettings.resolutionQuality,
      options: {
        Low: 'Low',
        Medium: 'Medium',
        High: 'High',
      },
      onChange: (value) => updateUserSetting('resolutionQuality', value),
    },
    debugMode: {
      value: userSettings.showDebugMode,
      onChange: (value) => updateUserSetting('showDebugMode', value),
    },
    reset: button(() => {
      resetUserSettings();
    }),
  });

  useControls('Celestials Objects', {
    reset: button(() => {
      console.log('Sun');
    }),
  });

  return null;
};

export default Controls;
