import axios from 'axios';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Page from '../../../components/layout/Page';
import UserHero from '../../../components/users/UserHero';
import UserPosts from '../../../components/users/UserPosts';

const UserPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession()
      .then((session) => {
        if (!session) {
          router.replace('/');
        }
        if (session && session.user.id === router.query.id) {
          router.replace('/app/profile');
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
          isAwesome,
          isFollowed,
          createdAt,
        } = {},
      } = {},
    } = {},
    // data,
    // error,
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

  return (
    <Page title={'View Profile'}>
      {loading && <p></p>}
      {!loading && !isLoading && !isError && (
        <div className=' mx-auto md:gap-2 flex flex-col items-center '>
          <UserHero
            _id={_id}
            profilePicture={profilePicture}
            firstName={firstName}
            lastName={lastName}
            email={email}
            posts={posts}
            postsLikedByUser={postsLikedByUser}
            followers={followers}
            following={following}
            isAwesome={isAwesome}
            createdAt={createdAt}
            isFollowed={isFollowed}
            session={session}
            type={'otherUser'}
          />
          <UserPosts
            posts={posts}
            postsLikedByUser={postsLikedByUser}
            firstName={firstName}
            session={session}
          />
        </div>
      )}
    </Page>
  );
};

export default UserPage;
