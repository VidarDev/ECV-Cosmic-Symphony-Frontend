import { Button } from '@/components/ui/button';
import { Bug, BugOff, Orbit } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useEffect, useState } from 'react';
import useStore from '@/hooks/useStore';
import RandomMelodyPlayer from '@/components/tones/MusicMaker';

const ActionsPanels: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const updateAppSetting = useStore((state) => state.updateAppSetting);
  const updateUserSetting = useStore((state) => state.updateUserSetting);

  // State
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Constants
  type FetchedData = {
    tempo: number;
    musicRange: string[];
    synthToUse: string;
  };

  const planets = [
    'Sun',
    'Mercury',
    'Venus',
    'Earth',
    'Mars',
    'Jupiter',
    'Saturn',
    'Uranus',
    'Neptune',
  ];

  const handleFocus = (object: string) => {
    updateUserSetting('focusedObject', object);
    updateAppSetting('focusingObject', true);
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const fullUrl = `${apiUrl}/space/get/${userSettings.focusedObject.toLowerCase()}`;
  console.log('fullUrl:', fullUrl);
  console.log('apiUrl:', apiUrl);

  const fetchCelestialData = () => {
    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data);
      })
      .catch((error) => {
        console.error(
          `Error fetching data for ${userSettings.focusedObject}:`,
          error
        );
      });
  };

  const toggleMusic = () => {
    setIsPlayingMusic(!isPlayingMusic);
  };

  useEffect(() => {
    if (userSettings.focusedObject) {
      fetchCelestialData();
    } else {
      setIsPlayingMusic(false);
    }
  }, [userSettings.focusedObject]);

  return (
    <div className="z-10 fixed bottom-0 left-0 flex items-center gap-2 p-4 lg:p-6 max-w-[33vw] flex-wrap">
      <Button
        onClick={() =>
          updateUserSetting('showDebugMode', !userSettings.showDebugMode)
        }
        size={'icon'}
      >
        {userSettings.showDebugMode ? <Bug /> : <BugOff />}
      </Button>
      <Drawer>
        <DrawerTrigger asChild>
          <Button size={'icon'}>
            <Orbit />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center text-xl">
              Solar system
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Visit the celestial objects
            </DrawerDescription>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center gap-2 flex-col lg:flex-row flex-wrap">
                {planets.map((planet) => (
                  <Button
                    key={planet}
                    className={[
                      'w-full max-w-56 lg:max-w-32',
                      planet === 'Sun' && 'bg-yellow-500',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleFocus(planet)}
                  >
                    {planet}
                  </Button>
                ))}
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Button onClick={toggleMusic}>
        {isPlayingMusic ? 'Stop Music' : 'Play Music'}
      </Button>
      {fetchedData && (
        <RandomMelodyPlayer
          tempo={fetchedData.tempo}
          synthToUse={fetchedData.synthToUse}
          musicRange={fetchedData.musicRange}
          isPlaying={isPlayingMusic}
        />
      )}
    </div>
  );
};

export default ActionsPanels;
