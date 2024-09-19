import useStore from '@/hooks/useStore';

const Header: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);

  return (
    <header
      id="header"
      className="z-10 lg:w-fit w-full fixed top-0 left-0 flex items-center justify-center gap-4 flex-col p-4 lg:p-6 pt-8 lg:pt-6 pointer-events-none"
    >
      <h1 className="text-white lg:text-7xl text-5xl font-semibold">
        {userSettings.focusedObject}
      </h1>
    </header>
  );
};

export default Header;
