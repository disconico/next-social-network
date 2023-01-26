import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  if (currentTheme === 'dark') {
    return (
      <SunIcon
        className='w-10 h-10 text-yellow-500 '
        role='button'
        onClick={() => setTheme('light')}
      />
    );
  } else {
    return (
      <MoonIcon
        className='w-10 h-10 text-gray-900 '
        role='button'
        onClick={() => setTheme('dark')}
      />
    );
  }
};

export default ThemeSwitcher;
