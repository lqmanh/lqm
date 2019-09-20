import Document, { Html, Head, Main, NextScript } from 'next/document'

const analyticsMarkup = {
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-133189175-1');
  `
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='vi' prefix='og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#'>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
          <script src='https://unpkg.com/ionicons@4.6.3/dist/ionicons.js' />
          <script src='https://www.googletagmanager.com/gtag/js?id=UA-133189175-1' />
          <script dangerouslySetInnerHTML={analyticsMarkup} />
        </body>
      </Html>
    )
  }
}
