import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import Page from '../../../components/layout/Page';

const SinglePostPage = () => {
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery(
    ['singlePost', router.query.id],
    async () => {
      try {
        console.log('router.query.id:', router.query.id);
        return await axios.get(`/api/posts/${router.query.id}`);
      } catch (error) {
        if (error.response.status === 404) {
          throw new Error('Post not found');
        }
        console.log(error);
        throw new Error('Bug in ClientFetch');
      }
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      try {
        return await axios.patch(`/api/posts/${router.query.id}`);
      } catch (error) {
        console.log(error);
        throw new Error('Bug in ClientFetch');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('singlePost', router.query.id);
      },
    }
  );

  const handleLikePost = () => {
    mutation.mutate();
  };

  return (
    <Page title={'Post detail'}>
      <>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}

        {!isLoading && data && !error && (
          <div>
            <h1>{data.data.returnedPost.title}</h1>
            <p>{data.data.returnedPost.content}</p>

            <p>Likes : {data.data.returnedPost.likes}</p>
            <button onClick={handleLikePost}>Like Post</button>
          </div>
        )}
      </>
    </Page>
  );
};

export default SinglePostPage;
