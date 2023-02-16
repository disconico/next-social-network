const clientUser = (user) => {
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
  };
};

export { clientUser };
