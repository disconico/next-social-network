import LikeButton from './LikeButton';
import Link from 'next/link';
import Image from 'next/image';
import formatDate from '../../lib/date';
import Comment from './CommentSection';
import CommentForm from './CommentForm';
import Modal from './LikesModal';
import DeletePostModal from './DeletePostModal';
import { useState } from 'react';
import { Session } from 'next-auth';
import { Author, Users, Comment as CommentType } from '../../types';

type Props = {
  content: string;
  createdAt: string;
  likes: number;
  likedBy: Users[];
  comments: CommentType[];
  author: Author;
  session: Session | null;
  postId: string;
};

const PostPreview = ({
  content,
  createdAt,
  likes,
  comments,
  author,
  likedBy,
  session,
  postId,
}: Props) => {
  const [isLiked, setIsLiked] = useState(
    likedBy.some((user) => {
      return user._id === session?.user.id;
    })
  );

  return (
    <div className=' shadow-md rounded-md p-4 my-4 max-w-lg text-sm w-full bg-gray-50 dark:bg-slate-800 dark:border-gray-600 dark:text-white '>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center h-12 pb-3'>
          <Link href={`/app/users/${author._id}`}>
            <Image
              src={author.profilePicture.imageUrl}
              width={200}
              height={200}
              className='rounded-full h-8 w-8'
              alt='author image'
            />
          </Link>
          <Link href={`/app/users/${author._id}`}>
            <p>
              {author.firstName} {author.lastName}
            </p>
          </Link>

          <p className='text-gray-500 dark:text-slate-300 text-xs pt-[2px]'>
            {formatDate(createdAt)}
          </p>
        </div>
        <div>
          {' '}
          {session && session.user.id === author._id && (
            <button
              data-hs-overlay={`#hs-vertically-centered-scrollable-modal-delete-${postId} `}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-4 h-4 hover:scale-105'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <DeletePostModal
        session={session as Session}
        author={author}
        postId={postId}
      />

      <hr />
      <p className=' break-words py-6'>{content}</p>
      <hr />
      <div className='flex justify-between py-2'>
        <button
          className={`text-gray-500 dark:text-slate-300 text-xs ${
            !likes && 'cursor-default'
          } ${
            likes &&
            'cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-primary-400 hover:decoration-2'
          }`}
          data-hs-overlay={`#hs-vertically-centered-scrollable-modal-${postId} `}
        >
          {likes} {likes === 1 ? 'like' : 'likes'}
        </button>
        <button
          className={`text-gray-500 dark:text-slate-300 text-xs  ${
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
          <Comment
            key={comment._id}
            comment={comment}
            session={session as Session}
            postAuthorId={author._id}
          />
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <LikeButton
            postId={postId}
            likedBy={likedBy}
            session={session as Session}
            authorId={author._id}
            setIsLiked={setIsLiked}
            isLiked={isLiked}
          />
          {isLiked && (
            <p className='text-gray-500 dark:text-slate-300 text-xs ml-2'>
              You liked this post
            </p>
          )}
        </div>
        <div className='flex items-center'>
          <button
            className='text-gray-500 dark:text-slate-300 text-xs'
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
        <CommentForm postId={postId} session={session as Session} />
      </div>
    </div>
  );
};

export default PostPreview;
