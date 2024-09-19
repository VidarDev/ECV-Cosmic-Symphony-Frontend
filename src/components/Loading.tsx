import Logo from '/favicon.svg';

const Loading: React.FC = () => {
  return (
    <div className="z-50 fixed top-0 left-0 min-h-screen w-screen flex justify-center items-center">
      <img src={Logo} className="animate-load w-[20vw] h-[20vw]" alt="" />
    </div>
  );
};

export default Loading;
