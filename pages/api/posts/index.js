import Post from '../../../models/Post';
import User from '../../../models/User';
import dbConnect from '../../../lib/db/dbConnect';
import { getSession } from 'next-auth/react';

const clientPost = (post, author) => {
  return {
    _id: post._id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    author: {
      _id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
    },
  };
};

const handlePostPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { title, content, authorId } = req.body;
  console.log('req.body: ', req.body);
  try {
    await dbConnect();
    const author = await User.findById(authorId);

    // Don't over populate the database with post's author details
    const post = await Post.create({
      title,
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

  try {
    const posts = await Post.find().populate('author');
    const returnedPosts = posts.map((post) => {
      return clientPost(post, post.author);
    });

    res.status(200).json({ returnedPosts });
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
