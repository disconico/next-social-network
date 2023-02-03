import LikeButton from './LikeButton';
import PropTypes from 'prop-types';

const PostPreview = ({
  handleNavigateToPost,
  title,
  content,
  likes,
  likedBy,
  session,
  status,
  postId,
}) => {
  return (
    <div className='bg-white shadow-md rounded-md p-4 my-4'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='text-gray-500'>{content}</p>
      <p className='text-gray-500'> Likes: {likes}</p>
      <button onClick={() => handleNavigateToPost(postId)}>
        Show post details
      </button>
      <>
        {' '}
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
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  likedBy: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default PostPreview;
