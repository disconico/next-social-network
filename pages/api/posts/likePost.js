import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import { getSession } from 'next-auth/react';
import { checkIfLikedByUser, clientPost } from '../../../lib/posts';

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
  const userId = session.user.id;
  const { postId } = req.body;

  try {
    await dbConnect();

    const post = await Post.findOne({ _id: postId }).select('likes likedBy');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likedByArray = post.likedBy.map((user) => user._id.toString());
    const isLiked = checkIfLikedByUser(likedByArray, userId);

    if (isLiked) {
      post.likes--;
      post.likedBy = post.likedBy.filter(
        (user) => user._id.toString() !== userId
      );
    } else {
      post.likes++;
      post.likedBy.push(userId);
      await post.populate('likedBy');
    }

    await post.save();

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.log('Post PATCH API :', err.message);
    res.status(401).json({ message: 'Error liking post' });
  }
};

export default handler;
