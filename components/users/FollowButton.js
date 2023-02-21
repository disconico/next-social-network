import axios from 'axios';
import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const FollowButton = ({
  id,
  followers,
  session,
  firstName,
  isFollowed = false,
}) => {
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const notify = () => {
    toast.success(<ToastText firstName={firstName} id={id} />, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme === 'dark' ? 'colored' : 'light',
    });
  };

  const mutation = useMutation(
    async () => {
      try {
        await axios
          .patch('/api/user/followUser', { id })
          .then((res) => {
            console.log(res.data.message);
            res.data.message === 'User followed' && notify();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('user');
        await queryClient.invalidateQueries('singleUser', {
          id,
        });
        await queryClient.invalidateQueries('discoverNewUsers');
        await queryClient.invalidateQueries('usersList');
        await queryClient.invalidateQueries('featuredPosts');
        // await queryClient.invalidateQueries('posts');
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate();
  };

  return (
    <>
      {mutation.isLoading && <button>Loading...</button>}
      {!mutation.isLoading && !followers.includes(session.user.id) && (
        <button onClick={handleFollow}>
          {isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </>
  );
};

FollowButton.propTypes = {
  id: PropTypes.string.isRequired,
  followers: PropTypes.array.isRequired,
  firstName: PropTypes.string.isRequired,
  isFollowed: PropTypes.bool,
  session: PropTypes.object.isRequired,
};

export default FollowButton;

const ToastText = ({ id, firstName, closeToast }) => {
  return (
    <div>
      <h3>Thanks for following {firstName} 🥳</h3>
      <Link href={`/app/users/${id}`} className='text-sm' onClick={closeToast}>
        Visit {firstName}&apos;s profile 👈
      </Link>
    </div>
  );
};

ToastText.propTypes = {
  id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  closeToast: PropTypes.func,
};
