import Link from 'next/link';
import { FcApproval, FcBusinessman } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import ThemeSwitcher from './layout/ThemeSwitcher';
import Typed from 'react-typed';
import svg from '../public/assets/svg/svg';

const Onboarding = () => {
  const { chevronRight, arrowRight, linkedin, github } = svg;

  return (
    <section className=' mx-auto text-center h-full bg-white dark:bg-gray-900 flex justify-center'>
      <main className='max-w-screen-lg h-full flex flex-col justify-center items-center gap-2 max-sm:pt-4'>
        <ThemeSwitcher />
        <Link
          href='/auth/sign-up'
          className='inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
          role='alert'
        >
          <span className='text-xs bg-primary-500 rounded-full text-white px-4 py-1.5 mr-3'>
            New
          </span>{' '}
          <span className='text-sm font-medium'>
            DiscoNetwork is out ! See what&apos;s new !
          </span>
          {chevronRight}
        </Link>
        <h1 className='mb-4 mx-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
          <span>Meet and </span>
          <Typed
            strings={['connect', 'laugh', 'share']}
            typeSpeed={200}
            backSpeed={100}
            loop={false}
          />
          <span> with people around you</span>
        </h1>
        <p className='mb-8 text-lg font-normal mx-2 text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
          Unlock your potential with DiscoNetwork: Dance to the beat of tech
          innovation and financial growth, and join a community of like-minded
          peers!
        </p>
        <div className='flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4'>
          <Link
            href='/auth/sign-up'
            className='inline-flex min-w-[180px] justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
          >
            Sign up for free
            {arrowRight}
          </Link>
          <Link
            href='#'
            className='inline-flex min-w-[180px]  justify-center gap-2 items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          >
            <IconContext.Provider value={{ size: '1.5rem' }}>
              <FcBusinessman />
            </IconContext.Provider>
            Test as guest
          </Link>
          <Link
            href='/auth/sign-in'
            className='inline-flex min-w-[180px]  justify-center gap-3 items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          >
            <IconContext.Provider value={{ size: '1.5rem' }}>
              <FcApproval />
            </IconContext.Provider>
            Log in !
          </Link>
        </div>
        <div className='px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36'>
          <span className='font-semibold text-gray-400 uppercase'>
            FEATURED IN
          </span>
          <div className='flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between'>
            <Link
              href='https://www.linkedin.com/in/nicolas-gu%C3%A9rin-7a2983b6/'
              target='_blank'
              rel='noreferrer'
              className='mr-5 mb-5 lg:mb-0  hover:text-gray-800 dark:hover:text-gray-400 '
            >
              <div className='flex justify-center min-w-[180px] gap-4 '>
                <div className='transition-transform duration-250 ease-in-out hover:transform-rotate-360 hover:scale-130'>
                  {linkedin}
                </div>
                <h3 className='text-2xl font-semibold align-baseline pt-1'>
                  Linkedin
                </h3>
              </div>
            </Link>
            <Link
              href='https://github.com/disconico'
              target='_blank'
              rel='noreferrer'
              className='mr-5 mb-5 lg:mb-0  hover:text-gray-800 dark:hover:text-gray-400'
            >
              <div className='flex justify-center min-w-[180px] gap-4 '>
                <div>{github}</div>
                <h3 className='text-2xl font-semibold align-baseline pt-1'>
                  GitHub
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Onboarding;
