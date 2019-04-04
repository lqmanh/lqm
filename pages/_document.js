import Document, { Head, Main, NextScript } from 'next/document'

const analyticsMarkup = {
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-133189175-1');
  `
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang='vi' prefix='og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#'>
        <Head>
          <script async src='https://www.googletagmanager.com/gtag/js?id=UA-133189175-1' />
          <script dangerouslySetInnerHTML={analyticsMarkup} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src='https://unpkg.com/ionicons@4.5.5/dist/ionicons.js' />
        </body>
      </html>
    )
  }
}
