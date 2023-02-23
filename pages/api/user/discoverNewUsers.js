import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';
import { clientUser } from '../../../lib/user';
import Comment from '../../../models/Comment';

const handleGetNewUsers = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    await dbConnect();
    const userFollowing = await User.findById(session.user.id).populate(
      'following'
    );

    const newUsers = await User.find({
      _id: { $nin: [...userFollowing.following, session.user.id] },
    })
      .limit(10)
      .populate('posts');

    const returnedUsers = newUsers.map((user) => {
      return clientUser(user);
    });

    res.status(200).json({ message: 'Success', returnedUsers });
  } catch (error) {
    console.log('newUsers GET API :', error.message);
    res.status(500).json({ message: error.message });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetNewUsers(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
