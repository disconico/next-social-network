import LikeButton from './LikeButton';
import PropTypes from 'prop-types';

const PostPreview = ({
  handleNavigateToPost,
  content,
  likes,
  comments,
  author,
  likedBy,
  session,
  status,
  postId,
}) => {
  return (
    <div className='bg-white shadow-md rounded-md p-4 my-4'>
      <p className='text-gray-500'>{content}</p>
      <div className='text-gray-500 flex gap-1'>
        <p>Likes :</p>
        <p>{likes}</p>
      </div>
      <div className='text-gray-500 flex gap-1'>
        <p>Comments :</p>
        <p>{comments.length}</p>
      </div>

      <button onClick={() => handleNavigateToPost(postId)}>
        Show post details
      </button>
      <>
        <LikeButton
          postId={postId}
          likedBy={likedBy}
          session={session}
          status={status}
        />
      </>
    </div>
  );
};

PostPreview.propTypes = {
  handleNavigateToPost: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  likedBy: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
};

export default PostPreview;
