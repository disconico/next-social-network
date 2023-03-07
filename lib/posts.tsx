interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  fullName?: string;
}

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  likes: number;
  likedBy: User[];
  author: User;
}

interface Post {
  _id: string;
  author: User;
  content: string;
  createdAt: string;
  comments: Comment[];
  likes: number;
  likedBy: User[];
}

const clientPost = (post: Post, author: User): Post => {
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
                      profilePicture: user.profilePicture,
                      firstName: user.firstName,
                      lastName: user.lastName,
                    };
                  }),
                ],
                author: {
                  _id: comment.author._id,
                  firstName: comment.author.firstName,
                  lastName: comment.author.lastName,
                  profilePicture: comment.author.profilePicture,
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
          profilePicture: user.profilePicture,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }),
    ],
    author: {
      _id: author._id,
      firstName: author.firstName,
      lastName: author.lastName,
      fullName: `${author.firstName} ${author.lastName}`,
      profilePicture: author.profilePicture,
    },
  };
};

export { clientPost };

const checkIfLikedByUser = (likedBy: string[], userId: string) => {
  return likedBy.some((user) => user === userId);
};

export { checkIfLikedByUser };
