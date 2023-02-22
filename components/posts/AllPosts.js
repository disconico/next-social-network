import { useQuery } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import PostPreview from './PostPreview';
import PropTypes from 'prop-types';

const AllPosts = ({ search, sortedPostsBy }) => {
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
        <>
          {data.returnedPosts

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
            .sort((a, b) => {
              if (sortedPostsBy === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
              } else if (sortedPostsBy === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
              } else if (sortedPostsBy === 'most-liked') {
                return b.likes - a.likes;
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

AllPosts.propTypes = {
  search: PropTypes.string,
  sortedPostsBy: PropTypes.string,
};

export default AllPosts;
