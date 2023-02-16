import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import PostPreview from '../posts/PostPreview';

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
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <header className='w-full flex flex-col items-center'>
        Welcome back, {data.returnedUserDetails.firstName}!
      </header>

      {!isLoading && data && !error && (
        <main className='w-full flex flex-col items-center'>
          <div>
            <button onClick={() => setUserDisplay('posts')}>My Posts</button>
            <button onClick={() => setUserDisplay('likedPosts')}>
              Liked Posts
            </button>
          </div>
          {userDisplay === 'posts' && (
            <>
              {data.returnedUserDetails.posts
                .sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                })
                .map((post, index) => (
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
                .sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                })
                .map((post, index) => (
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
