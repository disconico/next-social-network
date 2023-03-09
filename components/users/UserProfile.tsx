import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import PostPreview from '../posts/PostPreview';
import FollowDialog from './FollowDialog';
import { Post } from '../../types';

const UserProfile = () => {
  const { data: session, status } = useSession();
  const { isLoading, isError, data, error } = useQuery('user', async () => {
    try {
      const res = await axios.get('/api/user');
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  });

  const [userDisplay, setUserDisplay] = useState('posts');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <header className='w-full flex flex-col items-center'>
        Welcome back, {data.returnedUserDetails.firstName}!
      </header>

      {!isLoading && data && !error && (
        <main className='w-full flex flex-col items-center'>
          <div className='flex gap-2'>
            <button onClick={() => setUserDisplay('posts')}>My Posts</button>
            <button onClick={() => setUserDisplay('likedPosts')}>
              Liked Posts
            </button>
            <FollowDialog
              type={'following'}
              followArray={data.returnedUserDetails.following}
            />
            <FollowDialog
              type={'followers'}
              followArray={data.returnedUserDetails.followers}
            />
          </div>
          {userDisplay === 'posts' && (
            <>
              {data.returnedUserDetails.posts
                .sort((a: Post, b: Post) => {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                })
                .map((post: Post, index: number) => (
                  <PostPreview
                    key={index}
                    content={post.content}
                    createdAt={post.createdAt}
                    likes={post.likes}
                    likedBy={post.likedBy}
                    comments={post.comments}
                    author={post.author}
                    session={session}
                    status={status}
                    postId={post._id}
                  />
                ))}
            </>
          )}
          {userDisplay === 'likedPosts' && (
            <>
              {data.returnedUserDetails.postsLikedByUser
                .sort((a: Post, b: Post) => {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                })
                .map((post: Post, index: number) => (
                  <PostPreview
                    key={index}
                    content={post.content}
                    createdAt={post.createdAt}
                    likes={post.likes}
                    likedBy={post.likedBy}
                    comments={post.comments}
                    author={post.author}
                    session={session}
                    status={status}
                    postId={post._id}
                  />
                ))}
            </>
          )}
        </main>
      )}
    </>
  );
};

export default UserProfile;
