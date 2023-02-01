import PropTypes from 'prop-types';

const Post = ({ author, title, content, likes, comments }) => {
  const { name, id } = author;
  const { total: totalLikes } = likes;

  return (
    <div>
      <div>
        <span>{author}</span>
        <span>{title}</span>
      </div>
      <div>{content}</div>
      <div>
        <span>{likes} Likes</span>
        <span>{comments} Comments</span>
      </div>
    </div>
  );
};

Post.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Post;
