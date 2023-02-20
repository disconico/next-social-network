import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    import('preline');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
      <ThemeProvider enableSystem={true} attribute='class'>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </ThemeProvider>
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}
