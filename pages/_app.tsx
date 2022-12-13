import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Idea Board</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
