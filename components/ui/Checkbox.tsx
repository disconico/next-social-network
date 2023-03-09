import React from 'react';

type Props = {
  value: boolean;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ value, onChange, ...props }: Props) => {
  return (
    <input type='checkbox' checked={value} onChange={onChange} {...props} />
  );
};

export default Checkbox;
