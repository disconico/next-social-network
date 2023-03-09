import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import React, { useEffect } from 'react';
import { Users } from '../../types';
import { Session } from 'next-auth';
import { QueryFilters } from 'react-query/types/core/utils';

type Props = {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  postId: string;
  likedBy: Users[];
  authorId: string;
  isLiked: boolean;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
};

type CustomQueryFilters = QueryFilters & {
  singleUser?: { id: string };
  posts?: { postId: string };
  featuredPosts?: { postId: string };
};

const LikeButton = ({
  session,
  status,
  postId,
  likedBy,
  authorId,
  setIsLiked,
  isLiked,
}: Props) => {
  const queryClient = useQueryClient();
  const postsFilters: CustomQueryFilters = {
    posts: { postId },
  };
  const featuredPostsFilters: CustomQueryFilters = {
    featuredPosts: { postId },
  };
  const singleUserFilters: CustomQueryFilters = {
    singleUser: { id: authorId },
  };

  const userId = session && session.user.id;

  const mutation = useMutation(
    async () => {
      try {
        await axios.patch('/api/posts/likePost', {
          postId,
          userId,
        });
      } catch (error) {
        console.log(error);
        throw new Error('Bug in ClientFetch');
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('posts', postsFilters);
        await queryClient.invalidateQueries(
          'featuredPosts',
          featuredPostsFilters
        );
        await queryClient.invalidateQueries('user');
        await queryClient.invalidateQueries('singleUser', singleUserFilters);
      },
    }
  );

  const handleLikePost = () => {
    if (
      !session ||
      !session.user ||
      status === 'loading' ||
      mutation.isLoading
    ) {
      return;
    }
    setIsLiked(!isLiked);
    mutation.mutate();
  };

  useEffect(() => {
    if (likedBy.some((user) => user._id === session?.user.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [likedBy, session?.user.id, setIsLiked]);

  return (
    <>
      <div
        className='w-7 h-7 hover:bg-gray-300 flex justify-center items-center rounded-full hover:[&>svg]:scale-110 cursor-pointer'
        onClick={handleLikePost}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill={isLiked ? 'red' : 'white'}
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='red'
          className='w-5 h-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
          />
        </svg>
      </div>
    </>
  );
};

export default LikeButton;
