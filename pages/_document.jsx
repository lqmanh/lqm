import Document, { Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="https://unpkg.com/ionicons@4.5.0/dist/ionicons.js" />
        </body>
      </html>
    )
  }
}
