import Post from '../../../models/Post';
import dbConnect from '../../../lib/db/dbConnect';
import { getSession } from 'next-auth/react';
import { clientPost } from '../../../lib/posts';

const handleGetPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    await dbConnect();
    const posts = await Post.find().populate('author');
    const returnedPosts = posts.map((post) => {
      return clientPost(post, post.author);
    });

    res.status(200).json({ returnedPosts });
  } catch (err) {
    console.log('Post GET API :', err.message);
    res.status(401).end();
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
