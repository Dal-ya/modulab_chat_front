import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'sweetalert2/src/sweetalert2.scss';
import { SessionProvider } from 'next-auth/react';
import { NextPage } from 'next';

const App: NextPage<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
