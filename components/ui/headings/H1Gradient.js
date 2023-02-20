import { PropTypes } from 'prop-types';

const H1Gradient = ({ children }) => {
  return (
    <h1 className='animate-text bg-gradient-to-r from-yellow-400 via-purple-500 to-primary-700 bg-clip-text text-transparent text-4xl font-black font-bungee mb-4 text-center'>
      {children}
    </h1>
  );
};

H1Gradient.propTypes = {
  children: PropTypes.node.isRequired,
};

export default H1Gradient;
