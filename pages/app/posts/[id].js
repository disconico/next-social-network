import axios from 'axios';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Page from '../../../components/layout/Page';
import Post from '../../../components/posts/PostDetail';

const SinglePostPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    isLoading,
    isError,
    data: {
      data: {
        returnedPost: { author, comments, title, content, likes, likedBy } = {},
      } = {},
    } = {},
    error,
  } = useQuery(['singlePost', router.query.id], async () => {
    try {
      return await axios.get(`/api/posts/${router.query.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error('Post not found');
      }
      console.log(error);
      throw new Error('Bug in ClientFetch');
    }
  });

  return (
    <Page title={'Post detail'}>
      <>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        {!isLoading && !error && (
          <Post
            author={author}
            title={title}
            comments={comments}
            content={content}
            likes={likes}
            likedBy={likedBy}
            session={session}
            status={status}
            postId={router.query.id}
          />
        )}
      </>
    </Page>
  );
};

export default SinglePostPage;
