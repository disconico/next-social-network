import PropTypes from 'prop-types';

const Sorter = ({ handleSort, options, sortedUsersBy }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-row items-center justify-center w-full h-14'>
        <div className='flex flex-col items-center justify-center w-1/3 h-full'>
          <select
            className=' border p-2 rounded text-sm font-light outline-primary-400 dark:bg-gray-800'
            onChange={handleSort}
            value={sortedUsersBy}
            defaultValue='newest'
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className='font-light'
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

Sorter.propTypes = {
  handleSort: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  sortedUsersBy: PropTypes.string.isRequired,
};

export default Sorter;
