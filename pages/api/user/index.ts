import dbConnect from '../../../lib/db/dbConnect';
// @ts-ignore
import Post from '../../../models/Post';
// @ts-ignore
import Comment from '../../../models/Comment';
// @ts-ignore
import User from '../../../models/User';
import { getToken } from 'next-auth/jwt';
import { clientPost } from '../../../lib/posts';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { NextApiRequest, NextApiResponse } from 'next';

const handleGetUserDetails = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  try {
    const [userDetails, postsLikedByUser] = await Promise.all([
      User.findById(userId)
        .populate('posts')
        .populate({
          path: 'posts',
          populate: {
            path: 'comments',
            model: 'Comment',
          },
        })
        .populate({
          path: 'posts',
          populate: {
            path: 'likedBy',
            model: 'User',
          },
        })
        .populate({
          path: 'posts',
          populate: {
            path: 'author',
            model: 'User',
          },
        })
        .populate({
          path: 'posts',
          populate: {
            path: 'comments',
            populate: {
              path: 'author',
              model: 'User',
            },
          },
        })
        .populate('following')
        .populate('followers')
        .lean(),

      Post.find({
        likedBy: userId,
      })
        .populate('author')
        .populate('likedBy')
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'User',
          },
        })
        .lean(),
    ]);

    const returnedPostsLikedByUser = postsLikedByUser.map((post: Post) => {
      return clientPost(post, post.author);
    });

    const returnedPosts = userDetails.posts.map((post: Post) => {
      return clientPost(post, post.author);
    });

    const returnedUserDetails = {
      _id: userDetails._id,
      profilePicture: userDetails.profilePicture,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      posts: returnedPosts,
      postsLikedByUser: returnedPostsLikedByUser,
      following: userDetails.following,
      followers: userDetails.followers,
      isAwesome: userDetails.isAwesome,
      isAdmin: userDetails.isAdmin,
    };

    res.status(200).json({ returnedUserDetails });
  } catch (err) {
    console.log('userDetails GET API :', (err as Error).message);
    res.status(500).json({ message: (err as Error).message });
  }
};

const handleUpdateUserPassword = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  const { oldPassword, newPassword } = req.body;

  if (
    !newPassword ||
    newPassword.trim().length < 8 ||
    newPassword.trim().length > 20
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be between 7 and 20 characters.',
    });
    return;
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const currentPassword = user.password;
    const passwordsMatch = await verifyPassword(oldPassword, currentPassword);

    if (!passwordsMatch) {
      res.status(403).json({ message: 'Invalid credentials' });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated' });
  } catch (err) {
    console.log('userDetails PATCH API :', (err as Error).message);
    res.status(500).json({ message: (err as Error).message });
  }
};

const handleUpdateUserAwesome = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isAwesomeNewValue = req.body.isAwesome;
    user.isAwesome = isAwesomeNewValue;
    await user.save();
    res.status(200).json({ message: 'User isAwesome updated' });
  } catch (err) {
    console.log('userDetails PATCH API :', (err as Error).message);
    res.status(500).json({ message: (err as Error).message });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGetUserDetails(req, res);
    case 'PATCH':
      console.log('req.body :', req.body);
      if (req.body.type === 'awesome') {
        return handleUpdateUserAwesome(req, res);
      } else {
        return handleUpdateUserPassword(req, res);
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
