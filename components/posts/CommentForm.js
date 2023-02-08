import { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import PropTypes from 'prop-types';
import axios from 'axios';
import LoadingButton from '../ui/LoadingButton';

const CommentForm = ({ postId, session }) => {
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openComments = () => {
    const commentsDiv = document.getElementById(
      `hs-unstyled-collapse-heading-${postId}`
    );
    window.HSCollapse.show(commentsDiv);
  };

  const closeCommentForm = () => {
    const commentFormDiv = document.getElementById(
      `hs-unstyled-collapse-heading-comment-${postId}`
    );
    window.HSCollapse.hide(commentFormDiv);
  };

  useEffect(() => {
    if (session) {
      setAuthorId(session.user.id);
    }
  }, [session]);

  const postComment = async () => {
    try {
      await axios
        .patch('/api/posts/comments', {
          content,
          authorId,
          postId,
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

  const mutation = useMutation(postComment, {
    onSuccess: () => {
      openComments();
      closeCommentForm();
      queryClient.invalidateQueries('singlePost', postId);
      queryClient.invalidateQueries('posts');
      setContent('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-screen-lg max-md:w-full p-2'>
      <div className='mb-2'>
        <textarea
          id='content'
          rows='3'
          className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            isError ? 'border-red-500' : ''
          }`}
          placeholder='Write your thoughts here...'
          value={content}
          required={true}
          // minLength='1'
          maxLength='240'
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='flex justify-between'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {content.length}/240
        </p>
        {mutation.isLoading ? (
          <LoadingButton />
        ) : (
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 '
            // data-hs-collapse={`#hs-unstyled-collapse-heading-comment-${postId}`}
          >
            Add comment
          </button>
        )}
      </div>

      <p className='text-sm text-red-500'>{isError && errorMessage}</p>

      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </form>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
};

export default CommentForm;
