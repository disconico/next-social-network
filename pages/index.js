import Head from 'next/head';
import Onboarding from '../components/Onboarding';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const session = await getSession();
        if (session) {
          router.replace('/app');
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getSessionData();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
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
