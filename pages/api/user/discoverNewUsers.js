import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';
import { getToken } from 'next-auth/jwt';
import { clientUser } from '../../../lib/user';
import Comment from '../../../models/Comment';

const handleGetNewUsers = async (req, res) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;
  try {
    const userFollowing = await User.findById(userId).populate('following');

    const newUsersQuery = User.find({
      _id: { $nin: [...userFollowing.following, userId] },
    })
      .limit(10)
      .lean();

    const countQuery = User.countDocuments({
      _id: { $nin: [...userFollowing.following, userId] },
    });

    const [newUsers, count] = await Promise.all([
      newUsersQuery.exec(),
      countQuery.exec(),
    ]);

    const returnedUsers = newUsers.map((user) => {
      return clientUser(user);
    });

    res.status(200).json({ message: 'Success', returnedUsers, count });
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
