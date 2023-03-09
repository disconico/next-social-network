import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import { Session } from 'next-auth/core/types';

type AppProps = {
  Component: React.ComponentType;
  pageProps: {
    session: Session;
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    import('preline');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
      <ThemeProvider enableSystem={true} attribute='class'>
        <SessionProvider session={session}>
          <Head>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0 maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width, initial-scale=1.0, viewport-fit=cover'
            />
          </Head>
          <Component {...pageProps} />
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </ThemeProvider>
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}
