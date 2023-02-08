import PropTypes from 'prop-types';
import Image from 'next/image';
import pp from '../../public/assets/images/pp.png';
import formatDate from '../../lib/date';

const Comment = ({ comment, session }) => {
  const imageDiv = (
    <div>
      <Image
        src={pp}
        width={26}
        height={26}
        className='rounded-full'
        alt='author image'
      />
    </div>
  );

  const commentDiv = (
    <div className='w-full bg-gray-100 p-2 rounded'>
      <div className='flex items-baseline gap-2 pb-1'>
        <p>
          {comment.author.firstName} {comment.author.lastName}
        </p>
        <p className='text-gray-500 text-xs'>{formatDate(comment.createdAt)}</p>
      </div>
      <p>{comment.content}</p>
      <p>{comment.likes}</p>
    </div>
  );

  return (
    <div className='flex gap-2 my-2'>
      {comment.author._id === session.user.id ? (
        <>
          {commentDiv}
          {imageDiv}
        </>
      ) : (
        <>
          {imageDiv}
          {commentDiv}
        </>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

export default Comment;
