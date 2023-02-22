import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Page from '../../../components/layout/Page';
import SearchBar from '../../../components/ui/SearchBar';
import AllPosts from '../../../components/posts/AllPosts';
import Sorter from '../../../components/ui/Sorter';

const AllPostsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortedPostsBy, setSortedPostsBy] = useState('newest');

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

  const handleSort = (e) => {
    setSortedPostsBy(e.target.value);
  };

  return (
    <Page title={'Posts'}>
      {loading && <p></p>}
      {!loading && (
        <div className='max-w-screen-lg mx-auto p-2 '>
          <div className='flex justify-center w-full gap-2'>
            <SearchBar
              handleSearch={handleSearch}
              resetSearch={resetSearch}
              search={search}
              placeholder={'Search Posts...'}
            />
            <Sorter
              handleSort={handleSort}
              sortedBy={sortedPostsBy}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'oldest', label: 'Oldest' },
                { value: 'most-liked', label: 'Most Liked' },
              ]}
            />
          </div>
          <main className='w-full flex flex-col items-center max-md:items-center'>
            <AllPosts search={search} sortedPostsBy={sortedPostsBy} />
          </main>
        </div>
      )}
    </Page>
  );
};

export default AllPostsPage;
