import Footer from './footer'
import TopBar from './topbar'
import '../../styles/index.scss'


export default (props) => (
  <>
    <TopBar />
    {props.children}
    <Footer />
  </>
)
