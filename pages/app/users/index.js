import Page from '../../../components/layout/Page';
import Spinner from '../../../components/ui/Spinner';
import UsersList from '../../../components/users/UsersList';
import SearchUsers from '../../../components/ui/SearchBar';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BrowseUsersPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log('search :', search);
  };

  const resetSearch = () => {
    setSearch('');
  };

  useEffect(() => {
    getSession()
      .then((session) => {
        if (!session) {
          router.replace('/');
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }, [router]);

  if (loading) {
    return <p></p>;
  }

  if (status === 'loading' || status === 'unauthenticated') {
    return <Spinner />;
  }
  return (
    <Page title={'Browse Users'}>
      <div className='max-w-screen-lg mx-auto p-2 '>
        <SearchUsers
          handleSearch={handleSearch}
          resetSearch={resetSearch}
          search={search}
          placeholder={'Search Users...'}
        />
        <UsersList search={search} />
      </div>
    </Page>
  );
};

export default BrowseUsersPage;
