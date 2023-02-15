import axios from 'axios';
import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from 'react-query';

const LikeComment = ({ commentId, session, likedBy }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      try {
        await axios.patch('/api/posts/likeComment', {
          commentId,
          userId: session.user.id,
        });
      } catch (err) {
        console.log(err);
        throw new Error('Bug in ClientFetch');
      }
    },
    {
      onSuccess: async () => {
        // queryClient.invalidateQueries(['singlePost', postId]);
        await queryClient.invalidateQueries('posts');
        await queryClient.invalidateQueries('user');
      },
    }
  );

  const handleLikeComment = () => {
    if (!session || !session.user || status === 'loading') {
      return;
    }
    mutation.mutate();
  };

  return (
    <>
      <div
        className='w-6 h-6 hover:bg-gray-300 flex justify-center items-center rounded-full hover:[&>svg]:scale-110 cursor-pointer'
        onClick={handleLikeComment}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill={
            likedBy.some((user) => user._id === session.user.id)
              ? 'red'
              : 'white'
          }
          viewBox='0 0 24 24'
          strokeWidth={1}
          stroke='red'
          className='w-4 h-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
          />
        </svg>
      </div>
    </>
  );
};

LikeComment.propTypes = {
  commentId: PropTypes.string.isRequired,
  likedBy: PropTypes.array.isRequired,
  //   postId: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  //   status: PropTypes.string.isRequired,
};

export default LikeComment;
