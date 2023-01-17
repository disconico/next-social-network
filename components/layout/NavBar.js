import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='p-4'>
      <ul>
        <li className='text-lg font-extrabold'>
          <Link href='/'>Home</Link>
        </li>
        <li className='text-lg font-extrabold'>
          <Link href='/auth/sign-up'>sign-up</Link>
        </li>
        <li className='text-lg font-extrabold'>
          <Link href='/auth/sign-in'>sign-in</Link>
        </li>
        {/* <li role='separator' className='flex-1' />
				{user ? (
					<>
						<li>{userData.name}</li>
						<li>
							<Link href='/cart'>Cart</Link>
						</li>
						<li>
							<button onClick={handleSignOut}>Sign Out</button>
						</li>
					</>
				) : (
					<li>
						<Link href='/sign-in'>Sign In</Link>
					</li>
				)} */}
      </ul>
    </nav>
  );
};

export default NavBar;
