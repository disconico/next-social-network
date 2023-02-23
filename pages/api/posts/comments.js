import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      return handlePatchPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const handlePatchPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { content, authorId, postId } = req.body;

  try {
    await dbConnect();
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
    console.log('Post PATCH API :', err.message);
    res.status(401).json({ message: err.message });
  }
};

export default handler;
