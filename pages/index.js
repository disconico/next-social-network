import Head from 'next/head';
import Onboarding from '../components/Onboarding';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '../components/ui/Spinner';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession()
      .then((session) => {
        if (session) {
          router.replace('/app');
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [router]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>{'DiscoNetwork'}</title>
      </Head>
      <Onboarding />
    </>
  );
};

export default HomePage;
