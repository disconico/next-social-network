import PropTypes from 'prop-types';
import Image from 'next/image';
import formatDate from '../../lib/date';
import LikeComment from './LikeComment';
import Link from 'next/link';
import { useState } from 'react';
import { Comment as CommentT } from '../../types';
import { Session } from 'next-auth';

type Props = {
  comment: CommentT;
  session: Session | null;
  postAuthorId: string;
};

const Comment = ({ comment, session, postAuthorId }: Props) => {
  const [isLiked, setIsLiked] = useState(
    comment.likedBy.some((user) => {
      return user._id === session?.user.id;
    })
  );

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
    <div className='w-3/4 bg-gray-100 dark:bg-gray-700  p-2 pt-1 rounded flex flex-col text-xs shadow'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 '>
          <Link href={`/app/users/${comment.author._id}`}>
            <p>
              {comment.author.firstName} {comment.author.lastName}
            </p>
          </Link>
          <p className='text-gray-500 dark:text-slate-300 text-xs'>
            {formatDate(comment.createdAt)}
          </p>
        </div>
        <div className='flex items-center self-end gap-[2px]'>
          {comment.likes > 0 && (
            <p className='text-gray-500  dark:text-slate-300 text-[10px] '>
              {comment.likes}
            </p>
          )}

          <LikeComment
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            commentId={comment._id}
            likedBy={comment.likedBy}
            session={session as Session}
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
        session && comment.author._id === session.user.id && ' justify-end'
      }`}
    >
      {session && comment.author._id === session.user.id ? (
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
