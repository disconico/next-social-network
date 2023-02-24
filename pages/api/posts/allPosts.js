import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment';
import { getToken } from 'next-auth/jwt';
import { clientPost } from '../../../lib/posts';

const handleGetPost = async (req, res) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const posts = await Post.find()
      .populate('author')
      .populate('likedBy')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
      })
      .lean();

    const returnedPosts = posts.map((post) => {
      return clientPost(post, post.author);
    });

    res.status(200).json({ returnedPosts });
  } catch (err) {
    console.log('AllPost GET API :', err.message);
    res.status(500).json({ message: err.message });
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
