import axios from 'axios';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Page from '../../../components/layout/Page';
import Spinner from '../../../components/ui/Spinner';

const UserPage = () => {
  const { status } = useSession();
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

  const {
    isLoading,
    isError,
    data: {
      data: {
        returnedUserDetails: {
          _id,
          profilePicture,
          firstName,
          lastName,
          email,
          posts,
          postsLikedByUser,
          followers,
          following,
        } = {},
      } = {},
    } = {},
    // data,
    error,
  } = useQuery(['singleUser', router.query.id], async () => {
    try {
      return await axios.get(`/api/user/${router.query.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error('Post not found');
      }
      console.log(error);
      throw new Error('Bug in ClientFetch');
    }
  });

  if (loading) {
    return <p></p>;
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return <Spinner />;
  }

  return (
    <Page title={'View Porfile'}>
      <div className='max-w-screen-lg mx-auto md:gap-2 p-2  '>
        {/* <UserProfile /> */}
      </div>
    </Page>
  );
};

export default UserPage;
