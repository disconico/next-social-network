// import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

const ThemeSwitcher = () => {
  // const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (currentTheme === 'dark') {
    return (
      <SunIcon
        className='w-5 h-5 text-yellow-400 '
        role='button'
        onClick={() => setTheme('light')}
      />
    );
  } else {
    return (
      <MoonIcon
        className='w-5 h-5 text-gray-700 '
        role='button'
        onClick={() => setTheme('dark')}
      />
    );
  }
};

export default ThemeSwitcher;
