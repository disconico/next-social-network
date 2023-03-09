import Post from './posts';

type Users = {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: {
    imageUrl: string;
    public_url: string;
    imageSignature: string;
  };
  createdAt: string;
  followers: string[];
  following: Users[];
  isFollowed: boolean;
  isAdmin: boolean;
  isAwesome: boolean;
  posts: Post[];
};

export default Users;
