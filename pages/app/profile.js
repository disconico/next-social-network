import UserProfile from '../../components/users/UserProfile';
import Page from '../../components/layout/Page';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProfilePage = () => {
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

  return (
    <Page title={'Your Profile'}>
      {loading && <p></p>}
      {!loading && (
        <div className='max-w-screen-lg mx-auto md:gap-2 p-2  '>
          <UserProfile />
        </div>
      )}
    </Page>
  );
};

export default ProfilePage;
