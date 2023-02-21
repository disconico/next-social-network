import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Page from '../../../components/layout/Page';
import Settings from '../../../components/users/Settings';
import axios from 'axios';
import { useQuery } from 'react-query';

const SettingsPage = () => {
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

  const { isLoading, isError, data, error } = useQuery('user', async () => {
    try {
      const res = await axios.get('/api/user');
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  });

  return (
    <Page title={'Settings'}>
      {loading && <p></p>}
      {!loading && !isLoading && !isError && !error && (
        <div className='max-w-screen-lg mx-auto md:gap-2 flex flex-col items-center '>
          <Settings data={data.returnedUserDetails} />
        </div>
      )}
    </Page>
  );
};

export default SettingsPage;
