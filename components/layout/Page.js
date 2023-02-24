import { Fragment } from 'react';
import Head from 'next/head';
import NavBar from './navigation/Navbar';
import BackToTopBtn from '../ui/BackToTop';
import PropTypes from 'prop-types';

const Page = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{`DiscoNetwork | ${title}`}</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0 maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width, initial-scale=1.0, viewport-fit=cover'
        />
      </Head>
      <div className=' mx-auto h-full bg-bg-light dark:bg-bg-dark'>
        <NavBar />
        <Fragment>{children}</Fragment>
        <BackToTopBtn />
      </div>
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Page;
