import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingButton from '../ui/LoadingButton';

const Awesome = ({ isAwesome }) => {
  const [isAwesomeNewValue, setIsAwesomeNewValue] = useState(isAwesome);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setIsAwesomeNewValue(e.target.checked);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      await toast
        .promise(
          axios.patch('/api/user', {
            isAwesome: isAwesomeNewValue,
            type: 'awesome',
          }),
          {
            loading: 'Updating...',
            success: 'Updated!',
            error: 'Error',
          }
        )
        .then((res) => console.log(res));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center'
      >
        <div className='flex gap-2 mb-2 items-center'>
          <label htmlFor='isAwesome'>I confirm being awesome :</label>
          <input
            type='checkbox'
            name='isAwesome'
            value={isAwesomeNewValue}
            onChange={handleChange}
            checked={isAwesomeNewValue}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-32 '
          >
            Confirm
          </button>
        )}
      </form>
    </div>
  );
};

Awesome.propTypes = {
  isAwesome: PropTypes.bool,
};

export default Awesome;
