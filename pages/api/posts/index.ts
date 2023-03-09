import dbConnect from '../../../lib/db/dbConnect';
// @ts-ignore
import Post from '../../../models/Post';
// @ts-ignore
import User from '../../../models/User';
// @ts-ignore
import Comment from '../../../models/Comment';
import { getToken } from 'next-auth/jwt';
import { clientPost } from '../../../lib/posts';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    switch (req.method) {
      case 'POST': {
        const { content, authorId } = req.body;

        if (!content) {
          return res.status(400).json({ message: 'Content is required' });
        }

        const author = await User.findById(authorId);

        // Don't over populate the database with post's author details
        const post = await Post.create({
          content,
          author: author._id,
        });
        console.log('post: ', post);
        await author.posts.push(post._id);
        await author.save();

        // Still return some author details for the client
        const returnedPost = clientPost(post, author);
        res.status(201).json({ returnedPost });
        break;
      }

      case 'GET': {
        const { _id } = req.query;
        console.log('_id: ', _id);
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
        break;
      }

      case 'DELETE': {
        const { postId, userId, authorId } = req.body;

        if (!postId) {
          return res.status(400).json({ message: 'Post ID is required' });
        }

        if (userId !== authorId) {
          return res
            .status(400)
            .json({ message: 'You are not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(postId);
        console.log('Ok deleted');
        res.status(200).json({ message: 'Post deleted' });
        break;
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.log('Error:', (err as Error).message);
    res.status(401).json({ message: 'Error occurred' });
  }
}
