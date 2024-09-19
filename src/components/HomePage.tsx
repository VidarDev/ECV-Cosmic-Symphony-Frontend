import Logo from '/favicon.svg';
import { Button } from '@/components/ui/button';

type HomePageProps = {
  onAction: () => void;
};

const HomePage: React.FC<HomePageProps> = ({ onAction }) => {
  return (
    <div className="z-50 fixed top-0 left-0 min-h-screen w-screen flex justify-center items-center gap-4 flex-col p-4">
      <img
        src={Logo}
        className="w-[20vw] h-[20vw] lg:w-[15vw] lg:h-[15vw]"
        alt="Logo"
      />
      <h1 className="text-3xl lg:text-4xl text-center text-white mb-4 lg:mb-8">
        Welcome to the Solar System
      </h1>
      <Button onClick={onAction}>Start</Button>
    </div>
  );
};

export default HomePage;
