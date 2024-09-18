import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <>{children}</>;
};

export default Providers;
