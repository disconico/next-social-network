import PropTypes from 'prop-types';

const Input = ({ type, required, value, onChange, ...props }) => {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      {...props}
      className='border px-4 py-1 rounded w-80'
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
