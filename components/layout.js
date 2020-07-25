import dynamic from 'next/dynamic'

const DynamicPageButtons = dynamic(() => import('../components/page-buttons'), { ssr: true })

const Footer = () => (
  <footer className='footer'>
    <div className='content has-text-centered'>
      <p>
        Copyright &copy; 2018&ndash;2020 Lương Quang Mạnh. All rights reserved.
        <br />
        The source code is licensed under&nbsp;
        <a href='https://opensource.org/licenses/MIT'>MIT</a>. The website content is licensed under&nbsp;
        <a href='https://creativecommons.org/licenses/by-nc-nd/4.0/'>CC BY&ndash;NC&ndash;ND 4.0</a>.
      </p>
      <a href='https://bulma.io'>
        <img src='/static/made-with-bulma--black.png' alt='Made with Bulma' width='128' height='24' />
      </a>
    </div>
  </footer>
)

const Layout = (props) => (
  <>
    <DynamicPageButtons />
    {props.top}
    <div className='columns'>
      {props.left && <div className='column is-4-tablet is-3-widescreen sidebar'>{props.left}</div>}
      <div className='column'>{props.children}</div>
    </div>
    <Footer />
    <style jsx>{`
      .columns {
        margin-bottom: 0;
      }
    `}</style>
  </>
)

export default Layout
