import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import { getSession } from 'next-auth/react';
import { clientPost } from '../../../lib/posts';

const handlePostPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { content, authorId } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    await dbConnect();
    const author = await User.findById(authorId);

    // Don't over populate the database with post's author details
    const post = await Post.create({
      content,
      author: author._id,
    });
    console.log('post: ', post);

    // Still return some author details for the client
    const returnedPost = clientPost(post, author);
    res.status(201).json({ returnedPost });
  } catch (err) {
    console.log('Post POST API :', err.message);
    res.status(401).end();
  }
};

const handleGetPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { _id } = req.query;
  console.log('_id: ', _id);
  try {
    await dbConnect();
    const post = await Post.findById(_id)
      .populate('author')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
      });
    const returnedPost = clientPost(post, post.author);
    res.status(200).json({ returnedPost });
  } catch (err) {
    console.log('Post GET API :', err.message);
    res.status(401).end();
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return handlePostPost(req, res);
    case 'GET':
      return handleGetPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
