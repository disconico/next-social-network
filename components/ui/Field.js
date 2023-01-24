import PropTypes from 'prop-types';

const Field = ({ label, children }) => {
  return (
    <label className='block my-2'>
      <span className='block text-sm text-gray-700'>{label}</span>
      {children}
    </label>
  );
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Field;
