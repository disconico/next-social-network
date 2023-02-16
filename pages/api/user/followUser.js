import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';

const handlePatchUser = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    await dbConnect();
    const userDetails = await User.findById(session.user.id);
    const followedUser = await User.findById(req.body.id);

    if (userDetails.following.includes(req.body.id)) {
      return res.status(412).json({ message: 'You already follow this user' });
    } else {
      await userDetails.following.push(req.body.id);
      await userDetails.save();
      await followedUser.followers.push(session.user.id);
      await followedUser.save();
      res.status(200).json({ message: 'Success' });
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
