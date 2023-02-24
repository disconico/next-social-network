import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import { checkIfLikedByUser } from '../../../lib/posts';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      return handlePatchPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const handlePatchPost = async (req, res) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { postId, userId } = req.body;

  try {
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
    console.log('Post Like API :', err.message);
    res.status(401).json({ message: 'Error liking post' });
  }
};

export default handler;
