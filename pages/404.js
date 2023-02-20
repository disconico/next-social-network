import Page from '../components/layout/Page';
import Link from 'next/link';

const FourOhFour = () => {
  return (
    <Page title='404 - Page Not Found'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-9xl'>404</h1>
        <h2 className='text-6xl mb-14'>Page Not Found</h2>
        <Link href='/app' className='px-4 py-2 bg-blue-500 text-white rounded'>
          Go Back Home
        </Link>
      </div>
    </Page>
  );
};

export default FourOhFour;
