import React from 'react';

type Props = {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  placeholder: string;
};

const SearchBar = ({ handleSearch, search, placeholder }: Props) => {
  return (
    <div className='flex items-center justify-center gap-4 '>
      <input
        type='text'
        name='search'
        placeholder={placeholder}
        autoComplete='off'
        value={search}
        onChange={handleSearch}
        className=' border p-2 rounded w-[400px] max-w-xl text-sm font-light outline-primary-400 dark:bg-gray-800 max-sm:w-auto'
      />
    </div>
  );
};

export default SearchBar;
