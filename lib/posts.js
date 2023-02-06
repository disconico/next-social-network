const clientPost = (post, author) => {
  return {
    _id: post._id,
    content: post.content,
    createdAt: post.createdAt,
    comments: [
      ...post.comments.map((comment) => {
        return {
          _id: comment._id,
          content: comment.content,
          createdAt: comment.createdAt,
          likes: comment.likes,
          likedBy: comment.likedBy,
          author: {
            _id: comment.author._id,
            firstName: comment.author.firstName,
            lastName: comment.author.lastName,
          },
        };
      }),
    ],
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
