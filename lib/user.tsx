interface User {
  _id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  posts: string[];
  postsLikedByUser: string[];
  following: string[];
  followers: string[];
  isAwesome: boolean;
  isFollowed: boolean;
  isAdmin: boolean;
}

const clientUser = (user: User) => {
  return {
    _id: user._id,
    profilePicture: user.profilePicture,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    posts: user.posts,
    postsLikedByUser: user.postsLikedByUser,
    following: user.following,
    followers: user.followers,
    isAwesome: user.isAwesome,
    isFollowed: user.isFollowed,
    isAdmin: user.isAdmin,
  };
};

export { clientUser };
