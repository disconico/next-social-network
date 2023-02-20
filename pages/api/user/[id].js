import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';
import { clientPost } from '../../../lib/posts';

const returnedFollow = (user) => {
  return {
    _id: user._id,
    profilePicture: user.profilePicture,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

const handleGetUserDetails = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = session.user.id;

  try {
    await dbConnect();

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
      likedBy: session.user.id,
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

    const returnedPostsLikedByUser = postsLikedByUser.map((post) => {
      return clientPost(post, post.author);
    });

    const returnedPosts = userDetails.posts.map((post) => {
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
        (follower) => follower._id.toString() === userId
      ),
      isAwesome: userDetails.isAwesome,
    };

    res.status(200).json({ returnedUserDetails });
  } catch (err) {
    console.log('userDetails GET API :', err.message);
    res.status(500).json({ message: err.message });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetUserDetails(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
