import { ReactNode } from 'react';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick?: () => void;
};

const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      className='inline-flex min-w-[180px] justify-center items-center py-3 px-5 text-base font-medium mt-1 text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
