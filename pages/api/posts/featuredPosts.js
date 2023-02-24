import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import { getToken } from 'next-auth/jwt';
import { clientPost } from '../../../lib/posts';

const handleGetFeaturedPost = async (req, res) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  if (!userId) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  try {
    await dbConnect();
    const user = await User.findById(userId);

    const posts = await Post.find({
      $or: [{ author: { $in: user.following } }, { author: userId }],
    })
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
    console.log('Featured posts GET API :', err.message);
    res.status(500).json({ message: err.message });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetFeaturedPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
