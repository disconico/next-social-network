import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const H1 = ({ children }: Props) => {
  return (
    <h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
      {children}
    </h1>
  );
};

export default H1;
