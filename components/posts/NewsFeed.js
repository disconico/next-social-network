import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import LikeButton from './LikeButton';
import PostPreview from './PostPreview';

const NewsFeed = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery('posts', async () => {
    try {
      const res = await axios.get('/api/posts/allPosts');
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  });

  const handleNavigateToPost = (id) => {
    router.push(`/app/posts/${id}`);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {/* 
      {!isLoading && data && !error && (
        <div>
          {data.returnedPosts
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((post, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded-md p-4 my-4'
              >
                <h2 className='text-2xl font-bold'>{post.title}</h2>
                <p className='text-gray-500'>{post.content}</p>
                <p className='text-gray-500'> Likes: {post.likes}</p>
                <button onClick={() => handleNavigateToPost(post._id)}>
                  Show post details
                </button>
                <>
                  {' '}
                  <LikeButton
                    postId={post._id}
                    likedBy={post.likedBy}
                    session={session}
                    status={status}
                  />
                </>
              </div>
            ))}
        </div>
      )} */}

      {!isLoading && data && !error && (
        <div>
          {data.returnedPosts
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((post, index) => (
              <PostPreview
                key={index}
                handleNavigateToPost={handleNavigateToPost}
                title={post.title}
                content={post.content}
                likes={post.likes}
                likedBy={post.likedBy}
                session={session}
                status={status}
                postId={post._id}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default NewsFeed;
