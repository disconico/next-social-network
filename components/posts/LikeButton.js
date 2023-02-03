import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const LikeButton = ({ session, status, postId, likedBy }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      try {
        return await axios.patch('/api/posts/likePost', {
          postId,
        });
      } catch (error) {
        console.log(error);
        throw new Error('Bug in ClientFetch');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('singlePost', router.query.id);
        queryClient.invalidateQueries('posts');
      },
    }
  );

  const handleLikePost = () => {
    if (!session || !session.user || status === 'loading') {
      return;
    }
    mutation.mutate();
  };

  return (
    <button onClick={handleLikePost}>
      {likedBy.some((user) => user._id === session.user.id) ? 'Unlike' : 'Like'}
    </button>
  );
};

LikeButton.propTypes = {
  session: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  likedBy: PropTypes.array.isRequired,
};

export default LikeButton;
