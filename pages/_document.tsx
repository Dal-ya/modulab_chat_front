import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head />
      <body>
        <div id="portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
