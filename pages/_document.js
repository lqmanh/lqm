import Document, { Head, Html, Main, NextScript } from 'next/document'

const analyticsMarkup = {
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-133189175-1');
  `,
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='vi' prefix='og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#'>
        <Head>
          <link rel='shortcut icon' type='image/svg+xml' href='/static/logo-iconic-square-colorful.svg' />
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/default.min.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script type='module' src='https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js' />
          <script src='//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min.js' />
          <script src='https://www.googletagmanager.com/gtag/js?id=UA-133189175-1' />
          <script dangerouslySetInnerHTML={analyticsMarkup} />
        </body>
      </Html>
    )
  }
}
