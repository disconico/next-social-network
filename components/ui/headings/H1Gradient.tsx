import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const H1Gradient = ({ children }: Props) => {
  return (
    <h1 className='animate-text bg-gradient-to-r from-yellow-400 via-purple-500 to-primary-700 bg-clip-text text-transparent text-4xl font-black font-bungee mb-4 text-center'>
      {children}
    </h1>
  );
};

export default H1Gradient;
