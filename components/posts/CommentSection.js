import PropTypes from 'prop-types';
import Image from 'next/image';
import pp from '../../public/assets/images/pp.png';
import formatDate from '../../lib/date';
import LikeComment from './LikeComment';

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
    <div className='w-3/4 bg-gray-100 p-2 rounded flex flex-col text-xs'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 '>
          <p>
            {comment.author.firstName} {comment.author.lastName}
          </p>
          <p className='text-gray-500 text-xs'>
            {formatDate(comment.createdAt)}
          </p>
        </div>
        <div className='flex items-center self-end gap-[2px]'>
          {comment.likes > 0 && (
            <p className='text-gray-500  text-[10px] '>{comment.likes}</p>
          )}

          <LikeComment
            commentId={comment._id}
            likedBy={comment.likedBy}
            session={session}
          />
        </div>
      </div>
      <p>{comment.content}</p>
    </div>
  );

  return (
    <div
      className={`flex gap-2 my-2 ${
        comment.author._id === session.user.id && ' justify-end'
      }`}
    >
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
