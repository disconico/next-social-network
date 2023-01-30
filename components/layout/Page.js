import { Fragment } from 'react';
import Head from 'next/head';
import NavBar from './navigation/Navbar';
import PropTypes from 'prop-types';

const Page = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className=' mx-auto h-full'>
        <NavBar />
        <Fragment>{children}</Fragment>
      </div>
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
