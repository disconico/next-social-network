import PropTypes from 'prop-types';
import { ImCross } from 'react-icons/im';
import { IconContext } from 'react-icons';

const SearchBar = ({ handleSearch, resetSearch, search, placeholder }) => {
  return (
    <div className='flex items-center justify-center gap-4'>
      <input
        type='text'
        name='search'
        placeholder={placeholder}
        autoComplete='off'
        value={search}
        onChange={handleSearch}
        className=' border p-2 rounded w-3/4 max-w-xl text-sm font-light outline-primary-400 dark:bg-gray-800'
      />
      {search && (
        <button type='button' onClick={resetSearch} className='ml-[-40px]'>
          <IconContext.Provider value={{ size: '12px', color: 'red' }}>
            <ImCross />
          </IconContext.Provider>
        </button>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchBar;
