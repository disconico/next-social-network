import dbConnect from '../../../lib/db/dbConnect';
// @ts-ignore
import Post from '../../../models/Post';
// @ts-ignore
import Comment from '../../../models/Comment';
// @ts-ignore
import User from '../../../models/User';
import { getToken } from 'next-auth/jwt';
import { clientPost } from '../../../lib/posts';
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
    const userDetails = await User.findById(req.query.id)
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
      .populate('followers');

    const postsLikedByUser = await Post.find({
      likedBy: req.query.id,
    })
      .populate('author')
      .populate('likedBy')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
      });

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
      following: userDetails.following.map(returnedFollow),
      followers: userDetails.followers.map(returnedFollow),
      isFollowed: userDetails.followers.some(
        (follower: User) => follower._id.toString() === userId
      ),
      isAwesome: userDetails.isAwesome,
      isAdmin: userDetails.isAdmin,
      createdAt: userDetails.createdAt,
    };

    res.status(200).json({ returnedUserDetails });
  } catch (err) {
    console.log('userDetails GET API :', (err as Error).message);
    res.status(500).json({ message: (err as Error).message });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return handleGetUserDetails(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
