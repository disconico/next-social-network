import { useState } from 'react';
import PostPreview from '../posts/PostPreview';
import { Post } from '../../types';
import { Session } from 'next-auth/core/types';

type Props = {
  firstName: string;
  posts: Post[];
  postsLikedByUser: Post[];
  session: Session | null;
  type: string;
};

const UserPosts = ({
  firstName,
  posts,
  postsLikedByUser,
  session,
  type,
}: Props) => {
  const [userDisplay, setUserDisplay] = useState('posts');

  return (
    <main className='w-full flex flex-col items-center mt-2 pt-4'>
      <div className=' flex justify-evenly gap-4 mb-2'>
        <button
          className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 min-w-[140px]'
          onClick={() => setUserDisplay('posts')}
        >
          {type === 'profile' ? 'Your posts' : `${firstName}' posts`}
        </button>
        <button
          className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 min-w-[140px]'
          onClick={() => setUserDisplay('likedPosts')}
        >
          Liked Posts
        </button>
      </div>
      {userDisplay === 'posts' && (
        <>
          {posts.length === 0 ? (
            <div className='w-full flex justify-center items-center'>
              <h1 className='text-xl font-medium text-gray-800 dark:text-white'>
                {type === 'profile'
                  ? ' You do not have any post yet !'
                  : ` ${firstName} has no posts yet`}
              </h1>
            </div>
          ) : (
            posts
              .sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })
              .map((post, index) => (
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
              ))
          )}
        </>
      )}
      {userDisplay === 'likedPosts' && (
        <>
          {postsLikedByUser.length === 0 ? (
            <div className='w-full flex justify-center items-center'>
              <h1 className='text-xl font-medium text-gray-800 dark:text-white'>
                {type === 'profile'
                  ? 'No posts liked yet!'
                  : ` ${firstName} has no liked posts`}
              </h1>
            </div>
          ) : (
            postsLikedByUser
              .sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })
              .map((post, index) => (
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
              ))
          )}
        </>
      )}
    </main>
  );
};

export default UserPosts;
