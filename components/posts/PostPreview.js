import LikeButton from './LikeButton';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

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
  const nodeRef = useRef(null);

  return (
    <div className='bg-white shadow-md rounded-md p-4 my-4'>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='text-gray-500'>{content}</p>
      {/* <Transition in={true} timeout={duration} nodeRef={nodeRef}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            ref={nodeRef}
          >
            <p className='text-gray-500'>Likes: {likes}</p>
          </div>
        )}
      </Transition> */}
      <div className='text-gray-500 flex gap-1'>
        <p>Likes :</p>
        <p key={likes} className='roll-out'>
          {likes}
        </p>
      </div>

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
