import Head from 'next/head'

import Footer from './footer'
import TopBar from './topbar'
import '../../styles/index.scss'

const adsenseMarkup = {
  __html: `
    (adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-4344567375162528",
      enable_page_level_ads: true
    });
  `
}
const analyticsMarkup = {
  __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-133189175-1');
  `
}

export default (props) => (
  <>
    <Head>
      <script async src='https://www.googletagmanager.com/gtag/js?id=UA-133189175-1' />
      <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' />
      <script dangerouslySetInnerHTML={analyticsMarkup} />
      <script dangerouslySetInnerHTML={adsenseMarkup} />
    </Head>
    <TopBar />
    {props.children}
    <Footer />
  </>
)
