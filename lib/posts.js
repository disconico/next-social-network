const clientPost = (post, author) => {
  return {
    _id: post._id,
    content: post.content,
    createdAt: post.createdAt,
    comments:
      post.comments && post.comments.length > 0
        ? [
            ...post.comments.map((comment) => {
              return {
                _id: comment._id,
                content: comment.content,
                createdAt: comment.createdAt,
                likes: comment.likes,
                likedBy: [
                  ...comment.likedBy.map((user) => {
                    return {
                      _id: user._id,
                      image:
                        user.image ||
                        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                      firstName: author.firstName,
                      lastName: author.lastName,
                    };
                  }),
                ],
                author: {
                  _id: comment.author._id,
                  firstName: comment.author.firstName,
                  lastName: comment.author.lastName,
                  image:
                    comment.author.image ||
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                },
              };
            }),
          ]
        : post.comments,
    likes: post.likes,
    likedBy: [
      ...post.likedBy.map((user) => {
        return {
          _id: user._id,
          image:
            user.image ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          firstName: author.firstName,
          lastName: author.lastName,
        };
      }),
    ],
    author: {
      _id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
      image:
        author.image ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
  };
};

export { clientPost };

const checkIfLikedByUser = (likedBy, userId) => {
  return likedBy.some((user) => user === userId);
};

export { checkIfLikedByUser };
