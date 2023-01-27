import PropTypes from 'prop-types';

const Input = ({ type, required, value, onChange, placeholder, ...props }) => {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
      className=' border p-2 rounded w-full text-sm font-light outline-primary-400 dark:bg-gray-800'
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
