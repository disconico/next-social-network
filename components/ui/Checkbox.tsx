type Props = {
  value: boolean;
  onChange: () => void;
};

const Checkbox = ({ value, onChange, ...props }: Props) => {
  return (
    <input type='checkbox' checked={value} onChange={onChange} {...props} />
  );
};

export default Checkbox;
