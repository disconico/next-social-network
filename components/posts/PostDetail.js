import PropTypes from 'prop-types';
import LikeButton from './LikeButton';

const Post = ({
  author,
  title,
  content,
  likes,
  likedBy,
  session,
  status,
  postId,
}) => {
  const { _id, firstName, lastName } = author;

  return (
    <div>
      <h1 className='text-xg font-bold'>{title}</h1>
      <p>
        by {firstName} {lastName}
      </p>
      <p>{content}</p>

      <p>Likes : {likes}</p>
      <LikeButton
        session={session}
        status={status}
        postId={postId}
        likedBy={likedBy}
      />
    </div>
  );
};

Post.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  likedBy: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default Post;
