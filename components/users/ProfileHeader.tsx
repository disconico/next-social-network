type Props = {
  firstName: string;
};

const ProfileHeader = ({ firstName }: Props) => {
  return (
    // I want to return a profile header, welcoming the user and i also want a way to go to the profile settings. Add style with tailwind.
    <div className='flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Welcome {firstName}</h1>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Profile Settings
      </button>
    </div>
  );
};

export default ProfileHeader;
