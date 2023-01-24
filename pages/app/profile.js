import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import UserProfile from '../../components/UserProfile';
import Page from '../../components/layout/Page';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    console.log('session', session);
  }, [session]);

  useEffect(() => {
    if (!loading && !session) {
      router.push('/');
    }
  }, [loading, session, router]);

  if (loading || status === 'unauthenticated') {
    return <p />;
  }

  if (session) {
    console.log('session', session);
  }

  console.log('session', session);
  return (
    <Page title={'Your Profile'}>
      <UserProfile />
    </Page>
  );
};

export default ProfilePage;
