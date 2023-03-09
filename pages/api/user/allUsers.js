import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';
import { getToken } from 'next-auth/jwt';

const returnedFollow = (user) => {
  return {
    _id: user._id,
    profilePicture: user.profilePicture,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

const handleGetUsers = async (req, res) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  try {
    const users = await User.find().populate('posts');

    const returnedUsers = users
      .filter((user) => user._id.toString() !== userId)
      .map((user) => {
        return {
          _id: user._id,
          profilePicture: user.profilePicture,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          email: user.email,
          posts: user.posts,
          following: user.following.map(returnedFollow),
          followers: user.followers.map(returnedFollow),
          isFollowed: user.followers.includes(userId),
          isAwesome: user.isAwesome,
          isAdmin: user.isAdmin,
        };
      });

    res.status(200).json({ returnedUsers });
  } catch (err) {
    console.log('allUsers GET API :', err.message);
    res.status(500).json({ message: err.message });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetUsers(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
