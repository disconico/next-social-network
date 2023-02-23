import { useQuery } from 'react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Spinner from '../ui/Spinner';
import AllUsersCard from './AllUsersCard';
import PropTypes from 'prop-types';

const UsersList = ({ search = '', sortedUsersBy }) => {
  const { data: session } = useSession();
  const { isLoading, isError, data, error } = useQuery(
    'usersList',
    async () => {
      try {
        const res = await axios.get('/api/user/allUsers');
        return res.data;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {!isLoading && data && !error && (
        <div className='flex flex-wrap justify-center  gap-3 max-md:mr-4 max-md:ml-2 '>
          {data.returnedUsers
            .filter((user) => {
              if (search === '') {
                return user;
              } else if (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase())
              ) {
                return user;
              }
              return null;
            })
            // sort users depending of the sortedUsersBy state, it can be sort by newest, oldest, or most followed user first.

            .sort((a, b) => {
              if (sortedUsersBy === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
              } else if (sortedUsersBy === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
              } else if (sortedUsersBy === 'most-followers') {
                return b.followers.length - a.followers.length;
              }
              return null;
            })

            .map((user, index) => (
              <AllUsersCard key={index} user={user} session={session} />
            ))}
        </div>
      )}
    </>
  );
};

UsersList.propTypes = {
  search: PropTypes.string.isRequired,
  sortedUsersBy: PropTypes.string.isRequired,
};

export default UsersList;
