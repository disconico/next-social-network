import React, { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import LoadingButton from '../ui/LoadingButton';
import { toast } from 'react-toastify';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setAuthorId(session.user.id || '');
    }
  }, [session]);

  const postPost = async () => {
    try {
      await axios
        .post('/api/posts', {
          content,
          authorId,
        })
        .then((res) => {
          console.log('creating post res:', res);
          setIsError(false);
          setErrorMessage('');
        })
        .catch((err) => {
          console.log('creating post error:', err);
          setIsError(true);
          setErrorMessage(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(postPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('posts');
      await queryClient.invalidateQueries('featuredPosts');
      await queryClient.invalidateQueries('user');
      setContent('');
    },
    onError: () => {
      setContent('');
      // throw new Error('Error creating post');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(mutation.mutateAsync(), {
      pending: 'Creating post...',
      success: 'Post created!',
      error: 'Error creating post',
    });
    // mutation.mutateAsync();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-lg max-md:w-full   max-sm:p-2'
    >
      <div className='mb-2'>
        <textarea
          id='content'
          rows={5}
          className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            isError ? 'border-red-500' : ''
          }`}
          placeholder='Write your thoughts here...'
          value={content}
          required={true}
          // minLength='1'
          maxLength={1000}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='flex justify-between'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {content.length}/1000
        </p>
        {mutation.isLoading ? (
          <LoadingButton />
        ) : (
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 '
          >
            Create Post
          </button>
        )}
      </div>

      <p className='text-sm text-red-500'>{isError && errorMessage}</p>

      {mutation.isError && <p>Error: {(mutation.error as Error).message}</p>}
    </form>
  );
};

export default PostForm;
