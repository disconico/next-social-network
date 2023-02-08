import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';
import { clientPost } from '../../../lib/posts';

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
  console.log('postId: ', postId);
  console.log('authorId: ', authorId);
  try {
    await dbConnect();
    const post = await Post.findById(postId);
    if (!post) {
      console.log('Post not found');
      return res.status(404).json({ message: 'Post not found' });
    }

    const author = await User.findById(authorId);
    if (!author) {
      console.log('Author not found');
      return res.status(404).json({ message: 'Author not found' });
    }

    const comment = new Comment({
      content,
      author,
      post,
    });

    await comment.save();
    await post.comments.push(comment);
    await post.populate('comments');
    await post.save();

    const returnedPost = clientPost(post, post.author);

    res.status(200).json({ returnedPost });
  } catch (err) {
    console.log('Post PATCH API :', err.message);
    res.status(401).json({ message: err.message });
  }
};

export default handler;
