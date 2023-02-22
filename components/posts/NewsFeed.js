import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';
import Link from 'next/link';

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
          <h1 className='text-xl  max-w-lg pt-4'>
            No featured posts yet! Follow some users to see their posts here 🥷
          </h1>
          <Link href='/app/users'>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32  mt-4'>
              Discover Users
            </button>
          </Link>
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
