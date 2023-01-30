import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import 'flowbite';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}
