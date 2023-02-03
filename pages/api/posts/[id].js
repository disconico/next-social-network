import Post from '../../../models/Post';
import dbConnect from '../../../lib/db/dbConnect';
import { getSession } from 'next-auth/react';
import { clientPost } from '../../../lib/posts';

const handleGetPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { id } = req.query;

  try {
    await dbConnect();
    const post = await Post.findById(id).populate('author');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const returnedPost = clientPost(post, post.author);
    res.status(200).json({ returnedPost });
  } catch (err) {
    console.log('Post GET API :', err.message);
    res.status(401).end();
  }
};

const handlePatchPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { id } = req.query;
  console.log('_id: ', id);
  try {
    await dbConnect();
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes++;
    await post.save();
    res.status(200).json({ post });
  } catch (err) {
    console.log('Post PATCH API :', err.message);
    res.status(401).end();
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    //   case 'POST':
    //     return handlePostPost(req, res);
    case 'GET':
      return handleGetPost(req, res);
    case 'PATCH':
      return handlePatchPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
