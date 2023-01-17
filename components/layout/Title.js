import PropTypes from 'prop-types';

const Title = ({ children }) => {
  return <h1 className='text-2xl pb-4'>{children}</h1>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
