import TopBar from './topbar'
import Footer from './footer'
import '../../styles/index.scss'

export default (props) => (
  <>
    {props.withTopBar ? <TopBar /> : null}
    <div className='columns'>
      {props.left ? (
        <>
          <div className='column is-4-tablet is-3-widescreen sidebar'>{props.left}</div>
          <div className='column is-8-tablet is-9-widescreen'>{props.children}</div>
        </>
      ) : (
        <div className='column reading-mode'>{props.children}</div>
      )}
    </div>
    <Footer />
    <style jsx>{`
      .columns {
        margin-bottom: 0;
      }
    `}</style>
  </>
)
