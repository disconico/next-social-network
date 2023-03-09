import { useQuery } from 'react-query';
import axios from 'axios';
import PostPreview from './PostPreview';
import Link from 'next/link';
import { Session } from 'next-auth';
import { Post } from '../../types';

type Props = {
  search: string;
  session: Session;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};

const NewsFeed = ({ search, session }: Props) => {
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

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
            .sort((a: Post, b: Post) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
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

export default NewsFeed;
