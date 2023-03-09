import dbConnect from '../../../lib/db/dbConnect';
// @ts-ignore
import User from '../../../models/User';
// @ts-ignore
import Comment from '../../../models/Comment';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';

const returnedFollow = (user: User) => {
  return {
    _id: user._id,
    profilePicture: user.profilePicture,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

const handleGetUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  try {
    const users = await User.find().populate('posts');

    const returnedUsers = users
      .filter((user: User) => user._id.toString() !== userId)
      .map((user: User) => {
        return {
          _id: user._id,
          profilePicture: user.profilePicture,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`,
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
    console.log('allUsers GET API :', (err as Error).message);
    res.status(500).json({ message: (err as Error).message });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGetUsers(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
