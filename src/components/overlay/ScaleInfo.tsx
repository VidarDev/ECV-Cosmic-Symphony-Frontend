import useStore from '@/hooks/useStore';
import { Badge } from '@/components/ui/badge';
import AudioVisualizer from '@/components/overlay/AudioVisualizer';

const Header: React.FC = () => {
  // Stores
  const appSettings = useStore((state) => state.appSettings);

  const distance = appSettings.cameraDistance.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });

  return (
    <div className="z-10 fixed bottom-0 right-0 flex items-center justify-center gap-4 flex-col p-4 lg:p-6 pointer-events-none">
      <AudioVisualizer isPlaying={true} />
      <Badge>{distance} km</Badge>
    </div>
  );
};

export default Header;
