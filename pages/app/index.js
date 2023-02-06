import Page from '../../components/layout/Page';
import PostForm from '../../components/posts/PostForm';
import NewsFeed from '../../components/posts/NewsFeed';
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

  if (loading) {
    return <p></p>;
  }

  return (
    <Page title='Next Social Media'>
      <div className='max-w-screen-lg mx-auto p-2 flex justify-center'>
        <PostForm />
      </div>
      <div className='flex justify-center'>
        <main className='max-w-screen-lg w-3/5 max-md:w-full p-2'>
          <NewsFeed />
        </main>
        <aside className='max-md:hidden'>
          <h1>New Users</h1>
          <div>
            <p>Some new users</p>
          </div>
        </aside>
      </div>
    </Page>
  );
};

export default AppHomePage;
