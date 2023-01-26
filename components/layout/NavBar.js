import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Button from '../ui/Button';
import ThemeSwitcher from '../ui/ThemeSwitcher';

const NavBar = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className='p-4'>
      <ul>
        <li className='text-lg font-extrabold'>
          <Link href='/'>Home</Link>
        </li>
        {!session && !loading && (
          <li className='text-lg font-extrabold'>
            <Link href='/auth/sign-in'>Sign In</Link>
          </li>
        )}
        {session && !loading && (
          <li className='text-lg font-extrabold'>
            <Link href='/app/profile'>Profile</Link>
          </li>
        )}
        {session && !loading && (
          <Button type='' onClick={handleLogout}>
            Log Out
          </Button>
        )}

        <li className='text-lg font-extrabold'>
          <Link href='/auth/sign-up'>sign-up</Link>
        </li>
      </ul>
      <ThemeSwitcher />
    </nav>
  );
};

export default NavBar;
