import dbConnect from '../../../lib/db/dbConnect';
import Comment from '../../../models/Comment';
import { getToken } from 'next-auth/jwt';
import { checkIfLikedByUser } from '../../../lib/posts';

const handler = async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      return handlePatchComment(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const handlePatchComment = async (req, res) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  const { commentId } = req.body;

  try {
    await dbConnect();

    const comment = await Comment.findOne({ _id: commentId }).select(
      'likes likedBy'
    );
    if (!comment) {
      console.log('Comment not found');
      return res.status(404).json({ message: 'Comment not found' });
    }

    const likedByArray = comment.likedBy.map((user) => user._id.toString());

    const isLiked = checkIfLikedByUser(likedByArray, userId);

    if (isLiked) {
      comment.likes--;
      comment.likedBy = comment.likedBy.filter(
        (user) => user._id.toString() !== userId
      );
    } else {
      comment.likes++;
      comment.likedBy.push(userId);
    }

    await comment.save();

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.log('Comment PATCH API :', err.message);
    res.status(401).json({ message: err.message });
  }
};

export default handler;
