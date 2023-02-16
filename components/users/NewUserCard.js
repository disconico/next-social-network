import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import FollowButton from './FollowButton';

const NewUserCard = ({ user, session }) => {
  const { firstName, lastName, profilePicture, _id: id, followers } = user;

  return (
    <div className='bg-white shadow-md rounded-md p-4 my-4 max-w-lg text-sm w-full'>
      <div className='flex items-center'>
        <Link href={`/app/users/${id}`}>
          <Image
            src={profilePicture.imageUrl}
            width={200}
            height={200}
            className='rounded-full h-8 w-8'
            alt='user image'
          />
          <p>
            {firstName} {lastName}
          </p>
        </Link>
      </div>
      <FollowButton id={id} followers={followers} session={session} />
    </div>
  );
};

NewUserCard.propTypes = {
  user: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

export default NewUserCard;
