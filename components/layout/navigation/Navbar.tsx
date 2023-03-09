import React, { Fragment } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
// import Image from 'next/image';
import useWindowSize from '../../../hooks/useWindowSize';
import ThemeSwitcher from '../../ui/ThemeSwitcher';

const NavBar = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const { width } = useWindowSize();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className='border-b sticky top-0 z-50 bg-gray-100 dark:bg-[#111827] '>
      <nav className='max-w-screen-lg mx-auto flex justify-between items-center p-2 h-13 '>
        <div>
          <Link href='/app'>
            <p className='font-TiltWrap text-3xl cursor-pointer md:ml-4 bg-gradient-to-r from-yellow-400 via-purple-500 to-primary-700 bg-clip-text text-transparent '>
              DiscoNetwork.
            </p>
          </Link>
        </div>
        <div className='flex items-center gap-4 mr-2 text-sm '>
          {width && width > 768 && (
            <>
              <Link
                href={'/app'}
                className={`cursor-pointer hover:mb-1  ${
                  router.pathname.match(/app$/) ? 'underline-magical' : ''
                }`}
              >
                News Feed
              </Link>
              <Link
                href={'/app/users'}
                className={`cursor-pointer hover:mb-1 ${
                  router.pathname.includes('users') ? 'underline-magical' : ''
                }`}
              >
                Browse Users
              </Link>
              <Link
                href={'/app/posts'}
                className={`cursor-pointer  hover:mb-1  ${
                  router.pathname.includes('posts') ? 'underline-magical' : ''
                }`}
              >
                See All Posts
              </Link>
            </>
          )}

          <div className=' w-auto text-right'>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='inline-flex w-full justify-center items-center hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                  <p
                    className={`cursor-pointer  hover:mb-1  ${
                      router.pathname.includes('profile')
                        ? 'underline-magical'
                        : ''
                    }`}
                  >
                    {session && !loading ? session.user?.name : 'Profile'}
                  </p>
                  {/* {session && !loading && (
                    <Image
                      src={session.user.image}
                      width={100}
                      height={100}
                      className='rounded-full h-7 w-7 select-none'
                      alt='user profile picture'
                      draggable='false'
                    />
                  )} */}

                  <ChevronDownIcon
                    className='ml-2 -mr-1 mt-[2px] h-5 w-5 hover:bg-slate-100 rounded-full '
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y  bg-white  divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-600 dark:bg-gray-800 focus:outline-none dark:divide-gray-600'>
                  {width && width <= 768 && (
                    <div className='px-1 py-1 '>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href='/app/users'>
                            <button
                              className={`${
                                active && 'bg-primary-500 text-white'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <UsersIcon
                                className='mr-3 h-4 w-4'
                                aria-hidden='true'
                              />
                              Browse Users
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href='/app/posts'>
                            <button
                              className={`${
                                active && 'bg-primary-500 text-white'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <PostsIcon
                                className='mr-3 h-4 w-4'
                                aria-hidden='true'
                              />
                              See All Posts
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  )}
                  <div className='px-1 py-1 '>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/app/profile'>
                          <button
                            className={`${
                              active && 'bg-primary-500 text-white'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <ProfileIcon
                              className='mr-3 h-4 w-4'
                              aria-hidden='true'
                            />
                            Profile
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/app/profile/settings'>
                          <button
                            className={`${
                              active && 'bg-primary-500 text-white'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <SettingsIcon
                              className='mr-3 h-4 w-4'
                              aria-hidden='true'
                            />
                            Settings
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='px-1 py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active && 'bg-primary-500 text-white'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={handleLogout}
                        >
                          <LogOutIcon
                            className='mr-3 h-4 w-4'
                            aria-hidden='true'
                          />
                          Log Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
};

function ProfileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
      />
    </svg>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  );
}

function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5.636 5.636a9 9 0 1012.728 0M12 3v9'
      />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
      />
    </svg>
  );
}

function PostsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
      />
    </svg>
  );
}

export default NavBar;
