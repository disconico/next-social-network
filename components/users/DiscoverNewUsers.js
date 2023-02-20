import { useQuery } from 'react-query';
import axios from 'axios';
import NewUserCard from './NewUserCard';
import { useSession } from 'next-auth/react';

const NewUsers = () => {
  const { data: session } = useSession();
  const { isLoading, isError, data, error } = useQuery(
    'discoverNewUsers',
    async () => {
      try {
        const res = await axios.get('/api/user/discoverNewUsers');
        return res.data;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {!isLoading && data && !error && (
        <>
          {data.returnedUsers.map((user, index) => (
            <NewUserCard key={index} user={user} session={session} />
          ))}
        </>
      )}
      {data.returnedUsers.length === 0 && (
        <p className='text-sm m-2'>
          There are no new users to discover at this time.
        </p>
      )}
    </>
  );
};

export default NewUsers;
