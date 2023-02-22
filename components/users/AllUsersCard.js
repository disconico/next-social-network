import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import FollowButton from './FollowButton';
import { MdVerified } from 'react-icons/md';
import { IconContext } from 'react-icons';

const AllUsersCard = ({ user, session }) => {
  const {
    firstName,
    lastName,
    profilePicture,
    createdAt,
    _id: id,
    followers,
    isFollowed,
    isAdmin,
  } = user;

  return (
    <div className='bg-white dark:bg-slate-800 shadow-md rounded-md p-4 my-4 sm:w-80 w-full'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-3'>
          <Link href={`/app/users/${id}`}>
            <Image
              src={profilePicture.imageUrl}
              width={200}
              height={200}
              className='rounded-full h-8 w-8'
              alt='user image'
            />
          </Link>
          <Link href={`/app/users/${id}`}>
            <p>
              {firstName} {lastName}
            </p>
          </Link>
        </div>
        {user.isAwesome && !isAdmin && (
          <IconContext.Provider value={{ size: '1.5rem', color: 'green' }}>
            <MdVerified />
          </IconContext.Provider>
        )}
        {user.isAwesome && isAdmin && (
          <IconContext.Provider value={{ size: '1.5rem', color: 'gold' }}>
            <MdVerified />
          </IconContext.Provider>
        )}
      </div>
      <div className='mb-2'>
        <p className='text-sm text-gray-500  dark:text-slate-300'>
          Member since{' '}
          {
            // Format the date to be more readable
            new Date(createdAt).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })
          }
        </p>
        <p className='text-sm text-gray-500  dark:text-slate-300'>
          {followers.length} {followers.length === 1 ? 'follower' : 'followers'}
        </p>
        <p className='text-sm text-gray-500  dark:text-slate-300'>
          {user.following.length}{' '}
          {user.following.length === 1 ? 'following' : 'followings'}
        </p>
        <p className='text-sm text-gray-500  dark:text-slate-300'>
          {user.posts.length} {user.posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>
      <div className=' flex justify-between'>
        <FollowButton
          id={id}
          followers={followers}
          session={session}
          firstName={firstName}
          isFollowed={isFollowed}
        />
        <Link href={`/app/users/${id}`}>Visit profile 👈</Link>
      </div>
    </div>
  );
};

AllUsersCard.propTypes = {
  user: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

export default AllUsersCard;