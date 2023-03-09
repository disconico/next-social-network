import Page from '../../components/layout/Page';
import PostForm from '../../components/posts/PostForm';
import NewsFeed from '../../components/posts/NewsFeed';
import DiscoverNewUsers from '../../components/users/DiscoverNewUsers';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AppHomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

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

  return (
    <Page title='Next Social Media'>
      {loading && <p></p>}
      {!loading && session && (
        <div className='max-w-screen-lg mx-auto md:gap-2 p-2 flex md:grid md:grid-cols-[1fr_260px]  '>
          <div className='w-full flex flex-col items-center max-md:items-center'>
            <PostForm />
            <main className='w-full flex flex-col items-center max-md:items-center '>
              <NewsFeed search={''} session={session} status={status} />
            </main>
          </div>
          <aside className='max-md:hidden p-2 mr-4 pt-4 shadow-md rounded-md bg-white min-h-fit dark:bg-slate-800 dark:border-gray-600 dark:text-white'>
            <h1 className='text-xl font-medium pl-2 mb-4'>Suggestions</h1>

            <DiscoverNewUsers />
          </aside>
        </div>
      )}
    </Page>
  );
};

export default AppHomePage;
