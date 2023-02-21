import PropTypes from 'prop-types';
import Image from 'next/image';
import FollowButton from './FollowButton';
import FollowDialog from './FollowDialog';
import { MdVerified } from 'react-icons/md';
import { IconContext } from 'react-icons';

const UserHero = ({
  _id: id,
  firstName,
  lastName,
  profilePicture,
  isAwesome,
  isFollowed,
  followers,
  following,
  session,
}) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-80 bg-gray-100'>
      <div className='flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gray-200'>
        <Image
          src={profilePicture.imageUrl}
          width={200}
          height={200}
          className='rounded-full h-[200px] w-[200px]'
          alt='author image'
        />
      </div>
      <div className='flex flex-col items-center justify-center w-full h-40'>
        <div className='flex flex-col items-center justify-center w-full h-16'>
          <p className='text-2xl font-bold'>
            {firstName} {lastName}
          </p>
          <div className='text-sm text-gray-500'>
            {isAwesome ? (
              <div className='flex align-middle justify-center gap-1'>
                Awesome
                <IconContext.Provider
                  value={{ size: '1.2rem', color: 'green' }}
                >
                  <MdVerified />
                </IconContext.Provider>
              </div>
            ) : (
              'Not Awesome'
            )}
          </div>
        </div>
        <div className='flex flex-row items-center justify-center w-full h-14'>
          <div className='flex flex-col items-center justify-center w-1/3 h-full'>
            <p className='text-sm font-bold'>{followers.length}</p>
            <FollowDialog
              className='text-sm text-gray-500'
              type={'followers'}
              followArray={followers}
              name={'Followers'}
            />
          </div>
          <div className='flex flex-col items-center justify-center w-1/3 h-full'>
            <p className='text-sm font-bold'>{following.length}</p>
            <FollowDialog
              className='text-sm text-gray-500'
              type={'following'}
              followArray={following}
              name={'Following'}
            />
          </div>
          <div className='flex flex-col items-center justify-center w-1/3 h-full'>
            <p className='text-sm font-bold'>
              <FollowButton
                id={id}
                followers={followers}
                session={session}
                firstName={firstName}
                isFollowed={isFollowed}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

UserHero.propTypes = {
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profilePicture: PropTypes.object.isRequired,
  isAwesome: PropTypes.bool.isRequired,
  isFollowed: PropTypes.bool.isRequired,
  followers: PropTypes.array.isRequired,
  following: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
};

export default UserHero;
