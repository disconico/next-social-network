import Page from '../../../components/layout/Page';
import UsersList from '../../../components/users/UsersList';
import SearchUsers from '../../../components/ui/SearchBar';
import Sorter from '../../../components/ui/Sorter';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BrowseUsersPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortedUsersBy, setSortedUsersBy] = useState('newest');

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortedUsersBy(e.target.value);
  };

  return (
    <Page title={'Browse Users'}>
      {loading && <p></p>}
      {!loading && (
        <div className='max-w-screen-lg mx-auto p-2 '>
          <div className='flex justify-center w-full gap-2'>
            <SearchUsers
              handleSearch={handleSearch}
              search={search}
              placeholder={'Search Users...'}
            />
            <Sorter
              handleSort={handleSort}
              sortedBy={sortedUsersBy}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'oldest', label: 'Oldest' },
                { value: 'most-followers', label: 'Most Followers' },
              ]}
            />
          </div>
          <UsersList search={search} sortedUsersBy={sortedUsersBy} />
        </div>
      )}
    </Page>
  );
};

export default BrowseUsersPage;
