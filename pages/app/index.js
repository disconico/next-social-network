import Page from '../../components/layout/Page';
import PostForm from '../../components/posts/PostForm';
import NewsFeed from '../../components/posts/NewsFeed';
import ImageUploader from '../../components/posts/ImageUploader';
import DiscoverNewUsers from '../../components/users/DiscoverNewUsers';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AppHomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
      {!loading && (
        <div className='max-w-screen-lg mx-auto md:gap-2 p-2 flex md:grid md:grid-cols-[1fr_250px]  '>
          <div className='w-full flex flex-col items-end max-md:items-center'>
            <PostForm />
            <ImageUploader />
            <main className='w-full flex flex-col items-end max-md:items-center md:mr-6'>
              <NewsFeed search={''} />
            </main>
          </div>
          <aside className='max-md:hidden p-2 pt-4 shadow-md rounded-md'>
            <h1 className='text-l font-medium'>🚀 Discover More Users ⬇️</h1>

            <DiscoverNewUsers />
          </aside>
        </div>
      )}
    </Page>
  );
};

export default AppHomePage;
