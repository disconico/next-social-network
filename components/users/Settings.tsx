import ImageUploader from '../ui/ImageUploader';
import PasswordForm from './PasswordForm';
import Awesome from './Awesome';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';
import classNames from 'classnames';

type Props = {
  data: {
    isAwesome: boolean;
  };
};

const Settings = ({ data }: Props) => {
  return (
    <div className='w-full flex flex-col items-center p-2 gap-4 my-4'>
      <h1 className='text-2xl font-bold'>Settings</h1>
      <Accordion.Root
        className=' bg-white dark:bg-[#111827] w-full p-2 rounded-md shadow-[0_2px_10px] shadow-black/5 mx-8'
        type='single'
        // defaultValue='item-1'
        collapsible
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>Change your profile picture</AccordionTrigger>
          <AccordionContent>
            <ImageUploader />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-2'>
          <AccordionTrigger>Change your password</AccordionTrigger>
          <AccordionContent>
            <PasswordForm />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3'>
          <AccordionTrigger>Are you awesome ?</AccordionTrigger>
          <AccordionContent>
            <Awesome isAwesome={data.isAwesome} />
          </AccordionContent>
        </AccordionItem>
      </Accordion.Root>
    </div>
  );
};

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }: AccordionItemProps, forwardedRef) => (
    <Accordion.Item
      className={classNames(
        'focus-within:shadow-gray-500 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }: AccordionTriggerProps, forwardedRef) => (
  <Accordion.Header className='flex'>
    <Accordion.Trigger
      className={classNames(
        ' hover:bg-gray-100 dark:hover:bg-slate-800 group flex h-[45px] flex-1 cursor-default items-center justify-between e px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className='ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180'
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      ' bg-gray-white dark:bg-slate-800  data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px] ',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className='py-[15px] mx-5 '>{children}</div>
  </Accordion.Content>
));

AccordionContent.displayName = 'AccordionContent';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionItem.displayName = 'AccordionItem';

export default Settings;
