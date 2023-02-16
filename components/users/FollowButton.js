import axios from 'axios';
import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from 'react-query';

const FollowButton = ({ id, followers, session }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async () => {
      try {
        await axios
          .patch('/api/user/followUser', { id })
          .then((res) => {
            console.log(res);
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
        await queryClient.invalidateQueries('discoverNewUsers');
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
        <button onClick={handleFollow}>Follow</button>
      )}
    </>
  );
};

FollowButton.propTypes = {
  id: PropTypes.string.isRequired,
  followers: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
};

export default FollowButton;
