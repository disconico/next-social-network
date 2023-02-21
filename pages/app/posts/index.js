import Page from '../../../components/layout/Page';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../../components/ui/SearchBar';
import AllPosts from '../../../components/posts/AllPosts';

const AllPostsPage = () => {
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
    <Page title={'Posts'}>
      {loading && <p></p>}
      {!loading && (
        <div className='max-w-screen-lg mx-auto p-2 '>
          <SearchBar
            handleSearch={handleSearch}
            resetSearch={resetSearch}
            search={search}
            placeholder={'Search Posts...'}
          />
          <main className='w-full flex flex-col items-center max-md:items-center'>
            <AllPosts search={search} />
          </main>
        </div>
      )}
    </Page>
  );
};

export default AllPostsPage;
