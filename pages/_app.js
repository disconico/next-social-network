import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider enableSystem={true} attribute='class'>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
