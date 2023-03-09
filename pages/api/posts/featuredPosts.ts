import dbConnect from '../../../lib/db/dbConnect';
// @ts-ignore
import Post from '../../../models/Post';
// @ts-ignore
import User from '../../../models/User';
// @ts-ignore
import Comment from '../../../models/Comment';
import { getToken } from 'next-auth/jwt';
import { clientPost } from '../../../lib/posts';
import { NextApiRequest, NextApiResponse } from 'next';

const handleGetFeaturedPost = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  if (!userId) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  try {
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

    const returnedPosts = posts.map((post: Post) => {
      return clientPost(post, post.author);
    });

    res.status(200).json({ returnedPosts });
  } catch (err) {
    console.log('Featured posts GET API :', (err as Error).message);
    res.status(500).json({ message: (err as Error).message });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGetFeaturedPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
