import { useQuery } from 'react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Spinner from '../ui/Spinner';
import AllUsersCard from './AllUsersCard';
import PropTypes from 'prop-types';

const UsersList = ({ search = '' }) => {
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
        <div className='flex flex-wrap justify-center  gap-3 '>
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
            .sort((a, b) => {
              if (a.firstName < b.firstName) {
                return -1;
              }
              if (a.firstName > b.firstName) {
                return 1;
              }
              return 0;
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
};

export default UsersList;
