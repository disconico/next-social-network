import Page from '../../../components/layout/Page';
import UsersList from '../../../components/users/UsersList';
import SearchUsers from '../../../components/ui/SearchBar';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BrowseUsersPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const resetSearch = () => {
    setSearch('');
  };

  return (
    <Page title={'Browse Users'}>
      {loading && <p></p>}
      {!loading && (
        <div className='max-w-screen-lg mx-auto p-2 '>
          <SearchUsers
            handleSearch={handleSearch}
            resetSearch={resetSearch}
            search={search}
            placeholder={'Search Users...'}
          />
          <UsersList search={search} />
        </div>
      )}
    </Page>
  );
};

export default BrowseUsersPage;
