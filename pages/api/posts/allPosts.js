import Post from '../../../models/Post';
// import User from '../../../models/User';
import dbConnect from '../../../lib/db/dbConnect';
import { getSession } from 'next-auth/react';

const clientPost = (post, author) => {
  return {
    _id: post._id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    author: {
      _id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
    },
  };
};

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
    //   case 'POST':
    //     return handlePostPost(req, res);
    case 'GET':
      return handleGetPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
