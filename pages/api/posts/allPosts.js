import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment';
import { getSession } from 'next-auth/react';
import { clientPost } from '../../../lib/posts';

const handleGetPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    await dbConnect();
    const posts = await Post.find()
      .populate('author')
      .populate('likedBy')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
      });

    console.log('posts: ', posts);
    const returnedPosts = posts.map((post) => {
      return clientPost(post, post.author);
    });

    console.log('returnedPosts: ', returnedPosts);
    console.log('returnedPosts[0].comments: ', returnedPosts[0].comments);

    res.status(200).json({ returnedPosts });
  } catch (err) {
    console.log('AllPost GET API :', err.message);
    res.status(401).json({ message: err.message });
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
