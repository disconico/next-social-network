import Page from '../../../components/layout/Page';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from 'axios';
import UserHero from '../../../components/users/UserHero';
import UserPosts from '../../../components/users/UserPosts';

const ProfilePage = () => {
  const { data: session } = useSession();
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
    <Page title={'Your Profile'}>
      {loading && <p></p>}
      {!loading && !isLoading && !isError && !error && (
        <div className=' mx-auto md:gap-2 flex flex-col items-center '>
          <UserHero
            _id={data.returnedUserDetails._id}
            profilePicture={data.returnedUserDetails.profilePicture}
            firstName={data.returnedUserDetails.firstName}
            lastName={data.returnedUserDetails.lastName}
            email={data.returnedUserDetails.email}
            posts={data.returnedUserDetails.posts}
            postsLikedByUser={data.returnedUserDetails.postsLikedByUser}
            followers={data.returnedUserDetails.followers}
            following={data.returnedUserDetails.following}
            isAwesome={data.returnedUserDetails.isAwesome}
            isAdmin={data.returnedUserDetails.isAdmin}
            isFollowed={data.returnedUserDetails.isFollowed}
            createdAt={data.returnedUserDetails.createdAt}
            session={session}
            type='profile'
          />
          <UserPosts
            posts={data.returnedUserDetails.posts}
            postsLikedByUser={data.returnedUserDetails.postsLikedByUser}
            firstName={data.returnedUserDetails.firstName}
            session={session}
            type='profile'
          />
        </div>
      )}
    </Page>
  );
};

export default ProfilePage;
