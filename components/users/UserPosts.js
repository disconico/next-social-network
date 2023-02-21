import PropTypes from 'prop-types';
import { useState } from 'react';
import PostPreview from '../posts/PostPreview';

const UserPosts = ({ firstName, posts, postsLikedByUser, session }) => {
  const [userDisplay, setUserDisplay] = useState('posts');

  return (
    <main className='w-full flex flex-col items-center mt-2 pt-4'>
      <div className=' flex justify-evenly gap-4 mb-2'>
        <button
          className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 min-w-[140px]'
          onClick={() => setUserDisplay('posts')}
        >
          {`${firstName}' posts`}
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
                {`${firstName} has no posts`}
              </h1>
            </div>
          ) : (
            posts
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
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
                  status={status}
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
                {`${firstName} has no liked posts`}
              </h1>
            </div>
          ) : (
            postsLikedByUser
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
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
                  status={status}
                  postId={post._id}
                />
              ))
          )}
        </>
      )}
    </main>
  );
};

UserPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  firstName: PropTypes.string.isRequired,
  postsLikedByUser: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
};

export default UserPosts;
