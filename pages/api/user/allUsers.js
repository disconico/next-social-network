import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import { getSession } from 'next-auth/react';

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
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = session.user.id;

  try {
    await dbConnect();

    const users = await User.find(
      { _id: { $ne: userId } },
      {
        firstName: 1,
        lastName: 1,
        profilePicture: 1,
        email: 1,
        createdAt: 1,
        followers: 1,
        following: 1,
        isAdmin: 1,
        isAwesome: 1,
        posts: 1,
      }
    );
    // .lean()

    const returnedUsers = users.map((user) => ({
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
    }));
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
