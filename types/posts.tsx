import Author from './author';
import Users from './users';
import Comment from './comment';

type Post = {
  _id: string;
  content: string;
  createdAt: string;
  likes: number;
  likedBy: Users[];
  comments: Comment[];
  author: Author;
};

export default Post;
