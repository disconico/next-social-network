import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import CommentForm from './CommentForm';

const Post = ({ author, content, likes, likedBy, session, status, postId }) => {
  const { firstName, lastName } = author;

  return (
    <div>
      <p>
        by {firstName} {lastName}
      </p>
      <p>{content}</p>
      <div className='text-gray-500 flex gap-1'>
        <p>Likes :</p>
        <p key={likes}>{likes}</p>
      </div>
      <LikeButton
        session={session}
        status={status}
        postId={postId}
        likedBy={likedBy}
      />
      <CommentForm postId={postId} session={session} />
    </div>
  );
};

Post.propTypes = {
  author: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  likedBy: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default Post;
