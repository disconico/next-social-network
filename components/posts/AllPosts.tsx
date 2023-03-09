import { useQuery } from 'react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import PostPreview from './PostPreview';
import { Post } from '../../types';

type Props = {
  search: string;
  sortedPostsBy: string;
};

const AllPosts = ({ search, sortedPostsBy }: Props) => {
  const { data: session } = useSession();
  const { isLoading, isError, data, error } = useQuery('posts', async () => {
    try {
      const res = await axios.get('/api/posts/allPosts');
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong!');
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      {!isLoading && data && !error && (
        <>
          {data.returnedPosts

            .filter((post: Post) => {
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
            .sort((a: Post, b: Post) => {
              if (sortedPostsBy === 'newest') {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              } else if (sortedPostsBy === 'oldest') {
                return (
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
                );
              } else if (sortedPostsBy === 'most-liked') {
                return b.likes - a.likes;
              }
              return 0;
            })
            .map((post: Post, index: number) => (
              <PostPreview
                key={index}
                content={post.content}
                createdAt={post.createdAt}
                likes={post.likes}
                likedBy={post.likedBy}
                comments={post.comments}
                author={post.author}
                session={session}
                postId={post._id}
              />
            ))}
        </>
      )}
    </>
  );
};

export default AllPosts;
