import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';

const FollowDialog = ({ followArray, type, className, name }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <button
          type='button'
          onClick={openModal}
          className={className}
          disabled={followArray.length === 0}
        >
          {name}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 pl-4'
                  >
                    {type === 'following' ? 'Following :' : 'Followers :'}
                  </Dialog.Title>
                  <div className='p-4 overflow-y-auto'>
                    {followArray.map((user, index) => (
                      <div key={index} className='flex items-center gap-3 py-2'>
                        <Link
                          href={`/app/users/${user._id}`}
                          className='flex items-center gap-3'
                          onClick={closeModal}
                        >
                          <div className='flex-shrink-0'>
                            <Image
                              src={user.profilePicture.imageUrl}
                              width={200}
                              height={200}
                              className='rounded-full h-8 w-8'
                              alt='like author image'
                            />
                          </div>
                          <div className='flex'>
                            <h4 className='font-medium text-gray-800 dark:text-white'>
                              {user.firstName} {user.lastName}
                            </h4>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

FollowDialog.propTypes = {
  followArray: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default FollowDialog;
