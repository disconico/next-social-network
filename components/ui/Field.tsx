import { ReactNode } from 'react';

type Props = {
  label: string;
  children: ReactNode;
};

const Field = ({ label, children }: Props) => {
  return (
    <label className='form-input mb-3 flex flex-col gap-1'>
      <span>{label}</span>
      {children}
    </label>
  );
};

export default Field;
