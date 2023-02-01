import Page from '../../components/layout/Page';
import PostForm from '../../components/posts/PostForm';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const AppHomePage = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery('posts', async () => {
    try {
      return await axios.get('/api/posts');
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  });

  console.log('data', data);

  return (
    <Page title='Next Social Media'>
      <div className='max-w-screen-lg mx-auto p-2'>
        <PostForm />
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}

      {!isLoading && data && !error && (
        <div className='max-w-screen-lg mx-auto p-2'>
          {data.data.returnedPosts.map((post, index) => (
            <div key={index} className='bg-white shadow-md rounded-md p-4 my-4'>
              <h2 className='text-2xl font-bold'>{post.title}</h2>
              <p className='text-gray-500'>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
};

export default AppHomePage;
