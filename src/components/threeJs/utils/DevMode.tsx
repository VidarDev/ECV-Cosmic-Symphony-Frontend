import useStore from '@/hooks/useStore';
import { useControls, button } from 'leva';
import { Perf } from 'r3f-perf';

const DevMode: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const updateUserSetting = useStore((state) => state.updateUserSetting);
  const resetUserSettings = useStore((state) => state.resetUserSettings);

  // GUI
  useControls({
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

  return <Perf />;
};

export default DevMode;
