import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';

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

  const handleLikePost = async (e) => {
    if (!session || !session.user || status === 'loading') {
      return;
    }
    mutation.mutate();
    const button = e.target.closest('button');
    button.classList.toggle('liked');
    if (button.classList.contains('liked')) {
      gsap.fromTo(
        button,
        {
          '--hand-rotate': 8,
        },
        {
          ease: 'none',
          keyframes: [
            {
              '--hand-rotate': -45,
              duration: 0.16,
              ease: 'none',
            },
            {
              '--hand-rotate': 15,
              duration: 0.12,
              ease: 'none',
            },
            {
              '--hand-rotate': 0,
              duration: 0.2,
              ease: 'none',
              clearProps: true,
            },
          ],
        }
      );
    }
  };

  return (
    <>
      {' '}
      {/* <button
        onClick={handleLikePost}
        className={`${
          likedBy.some((user) => user._id === session.user.id)
            ? 'liked'
            : 'like'
        }`}
      >
        {likedBy.some((user) => user._id === session.user.id)
          ? 'Liked'
          : 'Like'}
      </button> */}
      <button
        onClick={handleLikePost}
        className={`button ${
          likedBy.some((user) => user._id === session.user.id) ? 'liked' : ''
        }`}
      >
        <div className='hand'>
          <div className='thumb'></div>
        </div>
        <span>
          Like<span>d</span>
        </span>
      </button>
    </>
  );
};

LikeButton.propTypes = {
  session: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  likedBy: PropTypes.array.isRequired,
};

export default LikeButton;
