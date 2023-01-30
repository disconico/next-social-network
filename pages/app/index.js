import Page from '../../components/layout/Page';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '../../components/ui/Spinner';

const AppHomePage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession()
      .then((session) => {
        if (!session) {
          router.replace('/');
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
      <Page title='Next Social Media'>
        <main>TBD - AppHomePage</main>
      </Page>
    </>
  );
};

export default AppHomePage;
