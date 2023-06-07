import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'sweetalert2/src/sweetalert2.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
