import { PropTypes } from 'prop-types';

const H1 = ({ children }) => {
  return (
    <h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
      {children}
    </h1>
  );
};

H1.propTypes = {
  children: PropTypes.node.isRequired,
};

export default H1;
