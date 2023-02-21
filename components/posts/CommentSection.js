import PropTypes from 'prop-types';
import Image from 'next/image';
import formatDate from '../../lib/date';
import LikeComment from './LikeComment';
import Link from 'next/link';

const Comment = ({ comment, session, postAuthorId }) => {
  const imageDiv = (
    <Link href={`/app/users/${comment.author._id}`}>
      <Image
        src={comment.author.profilePicture.imageUrl}
        width={200}
        height={200}
        className='rounded-full h-7 w-7'
        alt='author image'
      />
    </Link>
  );

  const commentDiv = (
    <div className='w-3/4 bg-gray-100 p-2 pt-1 rounded flex flex-col text-xs'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 '>
          <Link href={`/app/users/${comment.author._id}`}>
            <p>
              {comment.author.firstName} {comment.author.lastName}
            </p>
          </Link>
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
            postAuthorId={postAuthorId}
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
  postAuthorId: PropTypes.string.isRequired,
};

export default Comment;
