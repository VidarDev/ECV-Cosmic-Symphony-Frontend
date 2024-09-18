import { useControls, button } from 'leva';
import useStore from '../../../hooks/useStore';

const Controls: React.FC = () => {
  // Stores
  const quality = useStore((state) => state.userSettings.quality);
  const showDebugMode = useStore((state) => state.userSettings.showDebugMode);
  const updateUserSetting = useStore((state) => state.updateUserSetting);

  // GUI
  useControls({
    quality: {
      value: quality,
      options: {
        Low: 'Low',
        Medium: 'Medium',
        High: 'High',
      },
      onChange: (value) => updateUserSetting('quality', value),
    },
    debug: {
      value: showDebugMode,
      onChange: (value) => updateUserSetting('showDebugMode', value),
    },
    reset: button(() => {
      console.log('hello');
    }),
  });

  useControls('Planet', {
    Sun: button(() => {
      console.log('Sun');
    }),
  });

  return null;
};

export default Controls;
