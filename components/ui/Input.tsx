import React from 'react';

type Props = {
  type: string;
  name: string;
  required: boolean;
  value: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const Input = ({
  type,
  required,
  value,
  onChange,
  placeholder,
  ...props
}: Props) => {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={(event) => onChange(event)}
      placeholder={placeholder}
      {...props}
      className=' border p-2 rounded w-full text-sm font-light outline-primary-400 dark:bg-gray-800'
    />
  );
};

export default Input;
