import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

const NewsFeed = () => {
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery('posts', async () => {
    try {
      return await axios.get('/api/posts/allPosts');
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

      {!isLoading && data && !error && (
        <div>
          {data.data.returnedPosts
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
                <button onClick={() => handleNavigateToPost(post._id)}>
                  Show post details
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default NewsFeed;
