import { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setAuthorId(session.user.id);
    }
  }, [session]);

  const postPost = async () => {
    try {
      await axios
        .post('/api/posts', {
          title,
          content,
          authorId,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(postPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className='sm:max-w-lg max-w-full w-96 p-4'>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type='submit'>Create Post</button>
      {mutation.isLoading && <p>Loading...</p>}
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
    </form>
  );
};

export default PostForm;
