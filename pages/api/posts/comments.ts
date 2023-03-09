import dbConnect from '../../../lib/db/dbConnect';
// @ts-ignore
import Post from '../../../models/Post';
// @ts-ignore
import Comment from '../../../models/Comment';
// @ts-ignore
import User from '../../../models/User';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PATCH':
      return handlePatchPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const handlePatchPost = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { content, authorId, postId } = req.body;

  try {
    const [post, author] = await Promise.all([
      Post.findById(postId),
      User.findById(authorId),
    ]);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const comment = new Comment({
      content,
      author,
      post,
    });

    await comment.save();

    await Promise.all([
      Post.updateOne({ _id: post._id }, { $push: { comments: comment } }),
      User.updateOne({ _id: author._id }, { $push: { comments: comment } }),
    ]);

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.log('Post PATCH API :', (err as Error).message);
    res.status(401).json({ message: (err as Error).message });
  }
};

export default handler;
