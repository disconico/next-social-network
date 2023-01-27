import PropTypes from 'prop-types';

const Checkbox = ({ value, onChange, ...props }) => {
  return <input type='checkbox' value={value} onChange={onChange} {...props} />;
};

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
