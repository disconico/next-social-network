import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import useWindowSize from '../../../hooks/useWindowSize';
import ThemeSwitcher from '../../ui/ThemeSwitcher';
import LargeNavbar from './LargeNavbar';

const NavBar = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const { width } = useWindowSize();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header>
      <nav className='max-w-screen-lg mx-auto flex justify-between items-center px-2'>
        <div>
          <Link href='/app'> DiscoNetwork</Link>
        </div>

        <LargeNavbar
          session={session}
          loading={loading}
          handleLogout={handleLogout}
        />

        {/* {width <= 768 && <ThemeSwitcher />} */}
      </nav>
    </header>
  );
};

export default NavBar;
