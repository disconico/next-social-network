import dbConnect from '../../../lib/db/dbConnect';
import Post from '../../../models/Post';
import Comment from '../../../models/Comment';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';
import { clientPost } from '../../../lib/posts';

const handleGetPost = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    await dbConnect();
    const userDetails = await User.findById(session.user.id)
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
      });

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
    };

    res.status(200).json({ returnedUserDetails });
  } catch (err) {
    console.log('userDetails GET API :', err.message);
    res.status(401).json({ message: err.message });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetPost(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
