import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';
import Comment from '../../../models/Comment';
import { getToken } from 'next-auth/jwt';

const handlePatchUser = async (req, res) => {
  await dbConnect();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = token.uid;

  try {
    const [userDetails, followedUser] = await Promise.all([
      User.findById(userId).select('following'),
      User.findById(req.body.id).select('followers'),
    ]);

    if (userDetails.following.includes(req.body.id)) {
      const index = userDetails.following.indexOf(req.body.id);
      if (index > -1) {
        userDetails.following.splice(index, 1);
      }
      await userDetails.save();

      const index2 = followedUser.followers.indexOf(userId);
      if (index2 > -1) {
        followedUser.followers.splice(index2, 1);
      }
      await followedUser.save();

      // return res.status(412).json({ message: 'You already follow this user' });
      res.status(200).json({ message: 'User unfollowed' });
    } else {
      await userDetails.following.push(req.body.id);
      await userDetails.save();
      await followedUser.followers.push(userId);
      await followedUser.save();
      res.status(200).json({ message: 'User followed' });
    }
  } catch (error) {
    console.log('Patch follow API :', error.message);
    res.status(500).json({ message: error.message });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      return handlePatchUser(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
