import { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import LoadingButton from '../ui/LoadingButton';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setAuthorId(session.user.id);
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
          console.log(res);
          setIsError(false);
          setErrorMessage('');
        })
        .catch((err) => {
          console.log(err);
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
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setContent('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-screen-lg w-3/5 max-md:w-full p-2'
    >
      <div className='mb-2'>
        <textarea
          id='content'
          rows='5'
          className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            isError ? 'border-red-500' : ''
          }`}
          placeholder='Write your thoughts here...'
          value={content}
          required={true}
          // minLength='1'
          maxLength='1000'
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

      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </form>
  );
};

export default PostForm;