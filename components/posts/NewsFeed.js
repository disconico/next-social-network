import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const NewsFeed = ({ search }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery(
    'featuredPosts',
    async () => {
      try {
        const res = await axios.get('/api/posts/featuredPosts');
        return res.data;
      } catch (error) {
        console.log(error);
        throw new Error('Something went wrong!');
      }
    }
  );

  const handleNavigateToPost = (id) => {
    router.push(`/app/posts/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {!isLoading && data && !error && data.returnedPosts.length === 0 && (
        <>
          <h1 className='text-xl font-bold text-gray-700 max-w-lg'>
            No featured posts yet! Follow some users to see their posts here 🥷
          </h1>
        </>
      )}
      {!isLoading && data && !error && (
        <>
          {data.returnedPosts
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .filter((post) => {
              if (search === '') {
                return post;
              } else if (
                post.content.toLowerCase().includes(search.toLowerCase()) ||
                post.author.firstName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                post.author.lastName
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                post.author.fullName
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                return post;
              }
              return null;
            })
            .map((post, index) => (
              <PostPreview
                key={index}
                handleNavigateToPost={handleNavigateToPost}
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
    </>
  );
};

NewsFeed.propTypes = {
  search: PropTypes.string,
};

export default NewsFeed;
