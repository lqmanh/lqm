import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang='vi' prefix='og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#'>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script async src='https://unpkg.com/ionicons@4.5.5/dist/ionicons.js' />
        </body>
      </html>
    )
  }
}
