import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Title = ({ children }: Props) => {
  return <h1 className='text-2xl pb-4'>{children}</h1>;
};

export default Title;
