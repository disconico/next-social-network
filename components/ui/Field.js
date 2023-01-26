import PropTypes from 'prop-types';

const Field = ({ label, children }) => {
  return (
    <label className='form-input  mb-3 flex flex-col gap-1'>
      <span>{label}</span>
      {children}
    </label>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Field;
