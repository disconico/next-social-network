import Users from './users';
import Author from './author';

type Comment = {
  _id: string;
  content: string;
  createdAt: string;
  likes: number;
  likedBy: Users[];
  author: Author;
};

export default Comment;
