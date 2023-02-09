import dbConnect from '../../../lib/db/dbConnect';
import Comment from '../../../models/Comment';
import { getSession } from 'next-auth/react';
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
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { commentId } = req.body;

  try {
    await dbConnect();

    const comment = await Comment.findById(commentId);
    if (!comment) {
      console.log('Comment not found');
      return res.status(404).json({ message: 'Comment not found' });
    }

    const likedByArray = comment.likedBy.map((user) => user._id.toString());

    const isLiked = checkIfLikedByUser(likedByArray, session.user.id);

    if (isLiked) {
      comment.likes--;
      comment.likedBy = comment.likedBy.filter(
        (user) => user._id.toString() !== session.user.id
      );
    } else {
      comment.likes++;
      comment.likedBy.push(session.user.id);
      await comment.populate('likedBy');
    }

    await comment.save();

    res.status(200).json({ comment });
  } catch (err) {
    console.log('Comment PATCH API :', err.message);
    res.status(401).json({ message: err.message });
  }
};

export default handler;
