import Link from 'next/link';
import { FcApproval, FcBusinessman } from 'react-icons/fc';
import { IconContext } from 'react-icons';
import svg from '../public/assets/svg/svg';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';

const Onboarding = () => {
  const { chevronRight, arrowRight, linkedin } = svg;
  const router = useRouter();

  const signUserAsGuest = async () => {
    try {
      const status: { error?: string } | undefined = await signIn(
        'credentials',
        {
          redirect: false,
          email: 'guestuser@test.com',
          password: 'test1234',
        }
      );
      if (!status?.error) {
        router.push('/app');
      } else if (status.error) {
        console.log(status.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className=' mx-auto text-center h-full flex justify-center'>
      <main className='max-w-screen-lg h-full flex flex-col justify-center items-center gap-2 py-4'>
        <Link
          href='/auth/sign-up'
          className='inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
          role='alert'
        >
          <span className='text-xs bg-primary-500 rounded-full text-white px-4 py-1.5 mr-3'>
            New
          </span>
          <span className='text-sm font-medium'>
            DiscoNetwork is out ! See what&apos;s new !
          </span>
          {chevronRight}
        </Link>
        <div className='flex flex-col items-center pb-4 mb-2 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
          <div className='flex gap-2'>
            <p>Meet and </p>
            <Typewriter
              options={{
                strings: ['connect', 'laugh', 'share'],
                autoStart: true,
                loop: true,
                skipAddStyles: true,
                wrapperClassName:
                  'animate-text bg-gradient-to-r from-yellow-400 via-purple-500 to-primary-700 bg-clip-text text-transparent  font-black w-auto',
              }}
              // skipAddStyles={true}
              // strings={['connect', 'laugh', 'share']}
              // typeSpeed={200}
              // backSpeed={100}
              // loop={true}
            />
          </div>
          <p> with people around you</p>
        </div>

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
            <span className='mr-2'>Sign up for free</span>
            {arrowRight}
          </Link>
          <button
            onClick={signUserAsGuest}
            className='inline-flex min-w-[180px]  justify-center gap-2 items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
          >
            <IconContext.Provider value={{ size: '1.5rem' }}>
              <FcBusinessman />
            </IconContext.Provider>
            Test as guest
          </button>
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
                <div className='ml-2 w-10 h-10'>{linkedin}</div>

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
                <div className='ml-2 w-10 h-10'>
                  <svg
                    width='40'
                    height='40'
                    viewBox='0 0 15 15'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z'
                      fill='currentColor'
                      fillRule='evenodd'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </div>
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
