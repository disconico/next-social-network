import Page from '../../components/layout/Page';
import PostForm from '../../components/posts/PostForm';
import NewsFeed from '../../components/posts/NewsFeed';
import ImageUploader from '../../components/posts/ImageUploader';
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
      <div className='max-w-screen-lg mx-auto md:gap-2 p-2 flex md:grid md:grid-cols-[1fr_250px]  '>
        <div className='w-full flex flex-col items-end max-md:items-center'>
          <PostForm />
          <ImageUploader />
          <main className='w-full flex flex-col items-end max-md:items-center md:mr-6'>
            <NewsFeed />
          </main>
        </div>
        <aside className='max-md:hidden p-2 pt-4'>
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
