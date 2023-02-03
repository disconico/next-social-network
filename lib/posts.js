const clientPost = (post, author) => {
  return {
    _id: post._id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    likes: post.likes,
    likedBy: [
      ...post.likedBy.map((user) => {
        return {
          _id: user._id,
          firstName: author.firstName,
          lastName: author.lastName,
        };
      }),
    ],
    author: {
      _id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
    },
  };
};

export { clientPost };

const checkIfLikedByUser = (likedBy, userId) => {
  return likedBy.some((user) => user === userId);
};

export { checkIfLikedByUser };
