import Link from 'next/link';
import Image from 'next/image';
import FollowButton from './FollowButton';
import { MdVerified } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Users as UserType } from '../../types';
import { Session } from 'next-auth';

type Props = {
  user: UserType;
  session: Session | null;
};

const NewUserCard = ({ user, session }: Props) => {
  const {
    firstName,
    lastName,
    profilePicture,
    _id: id,
    followers,
    isAwesome,
    isAdmin,
  } = user;

  return (
    <div className=' mt-2 p-1  max-w-lg text-xs w-full flex justify-between'>
      <div className='flex items-center gap-2'>
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
        {isAwesome && !isAdmin && (
          <IconContext.Provider value={{ size: '1rem', color: 'green' }}>
            <MdVerified />
          </IconContext.Provider>
        )}
        {isAwesome && isAdmin && (
          <IconContext.Provider value={{ size: '1rem', color: 'gold' }}>
            <MdVerified />
          </IconContext.Provider>
        )}
      </div>

      <FollowButton
        id={id}
        followers={followers}
        session={session}
        firstName={firstName}
        className='text-xs rounded-md hover:bg-slate-100 hover:font-medium p-1 hover:text-slate-800 w-12'
      />
    </div>
  );
};

export default NewUserCard;
