import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Session } from 'next-auth';
import { QueryFilters } from 'react-query/types/core/utils';

type Props = {
  id: string;
  followers: string[];
  session: Session | null;
  firstName: string;
  isFollowed?: boolean;
  className?: string;
};

type CustomQueryFilters = QueryFilters & {
  singleUser: { id: string };
};

const FollowButton = ({
  id,
  followers,
  session,
  firstName,
  isFollowed = false,
  className,
}: Props) => {
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const filters: CustomQueryFilters = {
    singleUser: { id },
  };

  const notify = () => {
    toast.success(<ToastText firstName={firstName} id={id} />, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: theme === 'dark' ? 'colored' : 'light',
    });
  };

  const mutation = useMutation(
    async () => {
      try {
        await axios
          .patch('/api/user/followUser', { id })
          .then((res) => {
            console.log(res.data.message);
            res.data.message === 'User followed' && notify();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
        throw new Error((err as Error).message);
      }
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('user');
        await queryClient.invalidateQueries('singleUser', filters);
        await queryClient.invalidateQueries('discoverNewUsers');
        await queryClient.invalidateQueries('usersList');
        await queryClient.invalidateQueries('featuredPosts');
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate();
  };

  return (
    <>
      {mutation.isLoading && <button className={className}>...</button>}
      {!mutation.isLoading &&
        session?.user?.id &&
        !followers.includes(session.user.id) && (
          <button onClick={handleFollow} className={className}>
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button>
        )}
    </>
  );
};

export default FollowButton;

type ToastTextProps = {
  id: string;
  firstName: string;
  closeToast?: () => void;
};

const ToastText = ({ id, firstName, closeToast }: ToastTextProps) => {
  return (
    <div>
      <h3>Thanks for following {firstName} 🥳</h3>
      <Link href={`/app/users/${id}`} className='text-sm' onClick={closeToast}>
        Visit {firstName}&apos;s profile 👈
      </Link>
    </div>
  );
};
