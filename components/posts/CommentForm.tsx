import React, { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import LoadingButton from '../ui/LoadingButton';
import { Session } from 'next-auth';
import { QueryFilters } from 'react-query/types/core/utils';

type Props = {
  postId: string;
  session: Session | null;
};

type CustomQueryFilters = QueryFilters & {
  singleUser?: { id: string };
};

const CommentForm = ({ postId, session }: Props) => {
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (session) {
      setAuthorId(session.user.id || '');
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
  const filters: CustomQueryFilters = {
    singleUser: { id: authorId },
  };

  const mutation = useMutation(postComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('posts');
      await queryClient.invalidateQueries('featuredPosts');
      await queryClient.invalidateQueries('user');
      await queryClient.invalidateQueries('singleUser', filters);
    },
    onSettled: () => {
      setContent('');

      const commentsDiv = document.getElementById(
        `hs-unstyled-collapse-heading-${postId}`
      );
      if (commentsDiv !== null) {
        commentsDiv.classList.remove('hidden');
        commentsDiv.classList.add('open');
      }

      const commentFormDiv = document.getElementById(
        `hs-unstyled-collapse-heading-comment-${postId}`
      );
      if (commentFormDiv !== null) {
        // @ts-ignore
        window.HSCollapse.hide(commentFormDiv);
      }
    },
    onError: () => {
      console.log('Error in CommentForm.js');
      console.log(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-screen-lg max-md:w-full p-2'>
      <div className='mb-2'>
        <textarea
          id='content'
          rows={3}
          className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            isError ? 'border-red-500' : ''
          }`}
          placeholder='Write your thoughts here...'
          value={content}
          required={true}
          // minLength='1'
          maxLength={240}
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
    </form>
  );
};

export default CommentForm;
