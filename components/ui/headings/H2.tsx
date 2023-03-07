import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const H2 = ({ children }: Props) => {
  return (
    <h1 className='mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white'>
      {children}
    </h1>
  );
};

export default H2;
