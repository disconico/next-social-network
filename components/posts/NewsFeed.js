import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
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
                content={post.content}
                likes={post.likes}
                likedBy={post.likedBy}
                comments={post.comments}
                author={post.author}
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
