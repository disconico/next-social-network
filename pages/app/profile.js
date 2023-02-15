import UserProfile from '../../components/UserProfile';
import Page from '../../components/layout/Page';
import Spinner from '../../components/ui/Spinner';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
    return <p></p>;
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return <Spinner />;
  }

  return (
    <Page title={'Your Profile'}>
      <div className='max-w-screen-lg mx-auto md:gap-2 p-2  '>
        <UserProfile />
      </div>
    </Page>
  );
};

export default ProfilePage;
