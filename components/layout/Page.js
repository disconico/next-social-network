import Title from './Title.js';
import Head from 'next/head';
import NavBar from './NavBar';
import PropTypes from 'prop-types';

const Page = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className='p-4'>
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
