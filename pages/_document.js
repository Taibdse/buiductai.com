import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import GoogleTagScript from '@/src/components/GoogleTagScript';

export default class MyDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <GoogleTagScript />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}