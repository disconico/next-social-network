import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0 maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width, initial-scale=1.0, viewport-fit=cover'
        />
      </Head>

      <body className='dark:bg-gray-900  dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
