import LikeButton from './LikeButton';
import PropTypes from 'prop-types';
import Image from 'next/image';
import formatDate from '../../lib/date';
import Comment from './CommentSection';
import CommentForm from './CommentForm';
import Modal from './Modal';
import pp from '../../public/assets/images/pp.png';

const PostPreview = ({
  handleNavigateToPost,
  content,
  createdAt,
  likes,
  comments,
  author,
  likedBy,
  session,
  status,
  postId,
}) => {
  return (
    <div className='bg-white shadow-md rounded-md p-4 my-4 max-w-lg text-sm w-full'>
      <div className='flex gap-2 items-center h-9 pb-1'>
        <Image
          src={pp}
          width={26}
          height={26}
          className='rounded-full'
          alt='author image'
        />
        <p>
          {author.firstName} {author.lastName}
        </p>
        <p className='text-gray-500 text-xs'>{formatDate(createdAt)}</p>
      </div>
      <hr />
      <p className=' break-words py-4'>{content}</p>
      <hr />
      <div className='flex justify-between py-2'>
        <button
          className={`text-gray-500 text-xs ${!likes && 'cursor-default'} ${
            likes &&
            'cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-primary-400 hover:decoration-2'
          }`}
          data-hs-overlay={`#hs-vertically-centered-scrollable-modal-${postId} `}
        >
          {likes} {likes === 1 ? 'like' : 'likes'}
        </button>
        <button
          className={`text-gray-500 text-xs  ${
            !comments.length && 'cursor-default'
          }
          ${
            comments.length &&
            'cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-primary-400 hover:decoration-2'
          }
          `}
          id='hs-unstyled-collapse'
          data-hs-collapse={`#hs-unstyled-collapse-heading-${postId}`}
        >
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </button>
      </div>
      <Modal likes={likes} likedBy={likedBy} postId={postId} />

      <div
        className='hs-collapse hidden w-full overflow-hidden transition-[height] duration-300 '
        id={`hs-unstyled-collapse-heading-${postId}`}
      >
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} session={session} />
        ))}
      </div>

      {/* <button onClick={() => handleNavigateToPost(postId)}>
        Show post details
      </button> */}
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <LikeButton
            postId={postId}
            likedBy={likedBy}
            session={session}
            status={status}
          />
          {likedBy.some((like) => like._id === session.user.id) && (
            <p className='text-gray-500 text-xs ml-2'>You liked this post</p>
          )}
        </div>
        <div className='flex items-center'>
          <button
            className='text-gray-500 text-xs'
            data-hs-collapse={`#hs-unstyled-collapse-heading-comment-${postId}`}
          >
            Comment this post
          </button>
        </div>
      </div>
      <div
        className='hs-collapse hidden w-full overflow-hidden transition-[height] duration-300 '
        id={`hs-unstyled-collapse-heading-comment-${postId}`}
      >
        <CommentForm postId={postId} session={session} />
      </div>
    </div>
  );
};

PostPreview.propTypes = {
  handleNavigateToPost: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  likedBy: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
};

export default PostPreview;
