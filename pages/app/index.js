import Page from '../../components/layout/Page';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AppHomePage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const session = await getSession();
        if (!session) {
          router.replace('/');
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
      <Page title='Next Social Media'>
        <main>TBD - AppHomePage</main>
      </Page>
    </>
  );
};

export default AppHomePage;
