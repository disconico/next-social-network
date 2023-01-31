import { useSession } from 'next-auth/react';
import UserProfile from '../../components/UserProfile';
import Page from '../../components/layout/Page';
import Spinner from '../../components/ui/Spinner';

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading' || status === 'unauthenticated') {
    return <Spinner />;
  }

  if (session) {
    console.log('session', session);
  }

  return (
    <Page title={'Your Profile'}>
      <UserProfile />
    </Page>
  );
};

export default ProfilePage;
