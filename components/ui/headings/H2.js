import { PropTypes } from 'prop-types';

const H2 = ({ children }) => {
  return (
    <h1 className='mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white'>
      {children}
    </h1>
  );
};

H2.propTypes = {
  children: PropTypes.node.isRequired,
};

export default H2;
